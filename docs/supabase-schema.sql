-- ============================================================
-- REFÚGIO DA PELE — Schema Supabase
-- ============================================================

-- TABELA: clientes
CREATE TABLE public.clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefone TEXT,
  data_nascimento DATE,
  faixa_etaria TEXT CHECK (faixa_etaria IN ('13-17','20-29','30-39','40-49','50+','60+')),
  fase_materna TEXT CHECK (fase_materna IN ('gravida','pos-parto','amamentando','nenhuma')),
  preocupacao_pele TEXT CHECK (preocupacao_pele IN ('ressecamento','odor-ph','menopausa','primeira-rotina','envelhecimento')),
  status TEXT DEFAULT 'ativa' CHECK (status IN ('ativa','inativa','cancelada')),
  total_compras INTEGER DEFAULT 0,
  ultima_interacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: cupons
CREATE TABLE public.cupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  cpf TEXT NOT NULL,
  desconto INTEGER NOT NULL, -- percentual (ex: 30 = 30%)
  validade TIMESTAMP WITH TIME ZONE NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  data_uso TIMESTAMP WITH TIME ZONE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: cancelamentos
CREATE TABLE public.cancelamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  motivo TEXT,
  data TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status_retorno TEXT DEFAULT 'pendente' CHECK (status_retorno IN ('pendente','retornou','nao-retornou'))
);

-- ============================================================
-- RLS — Row Level Security
-- (já habilitado automaticamente pelo trigger que você ativou)
-- Policies para o n8n acessar via service role: sem restrição
-- ============================================================

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cancelamentos ENABLE ROW LEVEL SECURITY;

-- Policy: service role tem acesso total (para o n8n)
CREATE POLICY "service role full access clientes"
  ON public.clientes FOR ALL
  USING (true);

CREATE POLICY "service role full access cupons"
  ON public.cupons FOR ALL
  USING (true);

CREATE POLICY "service role full access cancelamentos"
  ON public.cancelamentos FOR ALL
  USING (true);

-- TABELA: config (armazena configurações dinâmicas, ex: link do PDF atual)
CREATE TABLE public.config (
  key TEXT PRIMARY KEY,
  value TEXT,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir chave inicial do PDF
INSERT INTO public.config (key, value) VALUES ('pdf_url_atual', '');

ALTER TABLE public.config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role full access config"
  ON public.config FOR ALL
  USING (true);

-- TABELA: interacoes (check-ins das clientes via Z-API)
CREATE TABLE public.interacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_email TEXT REFERENCES public.clientes(email) ON DELETE CASCADE,
  tipo TEXT CHECK (tipo IN ('check-in','resposta-enquete','resposta-whatsapp','abertura-email')),
  conteudo TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.interacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role full access interacoes"
  ON public.interacoes FOR ALL
  USING (true);
