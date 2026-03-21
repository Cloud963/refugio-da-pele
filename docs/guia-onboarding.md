# Guia de Onboarding — Refúgio da Pele

> Documento interno para a dona da marca. Descreve o fluxo completo desde o cadastro de uma nova cliente até ela estar ativa na base.

---

## 1. Jornada da Assinante Gratuita (Lead)

### Passo 1 — Cadastro no site
A cliente preenche o formulário em **refugiodapele.com.br**:
- Nome
- Email
- WhatsApp
- Idade
- Preocupação principal com a pele
- Fase materna (opcional)

**Automação acionada:** WF1 — Envio PDF Grátis

### Passo 2 — O que acontece em seguida (automático)
| Ação | Responsável | Timing |
|------|-------------|--------|
| Upsert na tabela `clientes` (Supabase) | WF1 | Imediato |
| Registro no Google Sheets (lista de leads) | WF1 | Imediato |
| Email com o PDF gratuito | WF1 | Imediato |
| Mensagem de confirmação no WhatsApp | WF1 | Imediato |
| Enquete de satisfação (3 dias depois) | WF1 | D+3 |

### Passo 3 — Enquete (D+3)
A cliente recebe uma mensagem via WhatsApp perguntando:
- Se recebeu o guia
- O que achou
- Se quer continuar recebendo conteúdo

Essa enquete é o gatilho para nutrir a relação e converter para assinante paga.

---

## 2. Jornada da Assinante Paga

### Passo 1 — Checkout Stripe
A cliente acessa o link do Stripe (plano R$9,90/mês ou R$14,90/mês quando disponível) e conclui o pagamento.

**URL do Stripe:** configurado no botão "Assinar por R$9,90" no site.

### Passo 2 — Webhook recebido (automático)
**Automação acionada:** WF7 — Stripe Pagamento

| Ação | Responsável | Timing |
|------|-------------|--------|
| Upsert na tabela `clientes` com `status = ativo` | WF7 | Imediato |
| Email de boas-vindas + PDF da semana atual | WF7 | Imediato |
| Mensagem de boas-vindas no WhatsApp | WF7 | Imediato |

### Passo 3 — Recebe conteúdo semanal
A partir do próximo domingo, a assinante recebe:
- Novo PDF semanal por email (WF2, dom 06h)
- Scripts da influencer via WhatsApp (WF6, dom 09h)

---

## 3. Ciclo de Vida das Clientes (WF4)

Roda toda segunda às 08h e verifica:

| Situação | Ação |
|----------|------|
| Aniversário hoje | Mensagem personalizada no WhatsApp |
| 30 dias sem abrir email | Mensagem de reengajamento |
| Completou 18 dias na base (FIZ18) | Mensagem especial de conquista |
| Cancelamento Stripe | Atualizar status para `inativo` |

---

## 4. Conteúdo Semanal

### Geração (domingos)
| Horário | Workflow | Conteúdo |
|---------|----------|----------|
| Dom 06h | WF2 | PDF semanal gerado pela Claude API → salvo no Google Drive |
| Dom 09h | WF6 | Influencer envia mensagem motivacional às assinantes |
| Dom 17h | WF_SUMMARY | Dona recebe resumo no WhatsApp para aprovar |

### Aprovação
1. Dona responde **APROVAR** → publicação automática na segunda
2. Dona responde **CANCELAR** → nada é publicado, aguarda instrução
3. Sem resposta até 20h → aprovação automática

### Publicação (segundas)
| Horário | Workflow | Ação |
|---------|----------|------|
| Seg 08h | WF8 | GPT-4o publica Instagram + Facebook + scripts influencer |

---

## 5. Temas Semanais

O WF5 roda todo sábado às 22h e elege os temas da semana seguinte com base em:
- Sazonalidade (estações, datas comemorativas)
- Tendências pesquisadas via SerpAPI + Tavily
- Histórico de temas anteriores (evita repetição)
- Perfil das assinantes (faixa etária, preocupações)

Os temas são salvos na tabela `config` do Supabase com a chave `tema_semana_atual`.

---

## 6. Acesso às Ferramentas

| Ferramenta | Função | Acesso |
|------------|--------|--------|
| n8n Cloud | Todos os workflows de automação | n8n.io |
| Supabase | Banco de dados das clientes | supabase.co |
| Google Sheets | Lista de leads + conteúdo semanal | drive.google.com |
| Google Drive | Armazenamento dos PDFs semanais | drive.google.com |
| Stripe | Pagamentos e assinaturas | dashboard.stripe.com |
| Z-API | Envio de mensagens WhatsApp | z-api.io |
| GitHub Pages | Site público (refugiodapele.com.br) | github.com/Cloud963 |

---

## 7. Campos da Base de Dados (Supabase)

Tabela: `clientes`

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `nome` | Nome da cliente | Ana Souza |
| `email` | Email (chave única) | ana@email.com |
| `telefone` | WhatsApp | 5511999999999 |
| `faixa_etaria` | Faixa etária | 25-34 |
| `preocupacao_pele` | Preocupação principal | acne |
| `fase_materna` | Fase materna | gestante |
| `status` | Status na base | lead / ativo / inativo |
| `origem` | Origem do cadastro | landing_page / stripe |
| `stripe_customer_id` | ID do cliente no Stripe | cus_XXXXXX |
| `criado_em` | Data de cadastro | 2026-03-21T10:00:00Z |

---

## 8. Comunicação com a Dona

Todo domingo às 17h, a dona recebe no WhatsApp (+351926856955) um resumo com:
- Link do PDF da semana para revisão
- Número de novos leads
- Total de assinantes ativas
- Posts Instagram/Facebook gerados para aprovação
- Scripts da influencer da semana

Para aprovar: responder **APROVAR**
Para cancelar: responder **CANCELAR**
