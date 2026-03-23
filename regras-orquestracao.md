# Regras de Orquestração — Refúgio da Pele

## Hierarquia dos Agentes

```
ORQUESTRADOR: Claude (você está lendo isso)
├── WF2 — Claude API — gera PDF semanal (conteúdo profundo)
├── WF8 — GPT-4o — gera posts Instagram/Facebook + scripts influencer
├── WF_SUMMARY — Claude — consolida semana + envia WhatsApp ao dono
└── Tudo passa pelo orquestrador antes de ir para o usuário
```

## Calendário Semanal Automático

| Horário | Workflow | Ação |
|---------|----------|------|
| Sáb 22h | WF5 | Elege temas da semana seguinte |
| Dom 06h | WF2 | Gera PDF + upload Google Drive |
| Dom 09h | WF6 | Influencer envia mensagem semanal via Z-API |
| Dom 17h | WF_SUMMARY | Claude envia resumo semanal ao dono via WhatsApp |
| Seg 08h | WF4 | Ciclo de vida (aniversários, inatividade, FIZ18) |
| Seg 08h | WF8 | GPT gera conteúdo redes sociais + scripts influencer |

## Regra de Aprovação Semanal

1. Dom 17h — dono recebe no WhatsApp: PDF + métricas + conteúdo para revisar
2. Responde **APROVAR** → publicação automática na segunda
3. Responde **CANCELAR** → nada é publicado, aguarda instrução
4. Sem resposta até Dom 20h → aprovação automática

## Resumo Semanal (Dom 17h) inclui:
- Link do PDF para revisão
- Novos leads da semana
- Total de assinantes ativos
- Posts Instagram/Facebook gerados pelo GPT (para revisão)
- Scripts da influencer da semana

## Contato do Dono
- WhatsApp: +351926856955

---

## Regras — Google Trends (WF5)

- **Tema central fixo:** SKINCARE (saúde da pele)
- **Objetivo:** identificar 3 sub-temas dentro de skincare mais pesquisados em períodos distintos
- **Períodos e critério de seleção:**
  - **Tema Semana:** sub-tema mais pesquisado nos últimos 7 dias (date=now 7-d)
  - **Tema Mês:** sub-tema mais pesquisado no último mês (date=today 1-m)
  - **Tema Trimestre:** sub-tema mais pesquisado nos últimos 3 meses (date=today 3-m)
- **Termos base para variação no SerpAPI Trends:** retinol, niacinamida, argila, ácido hialurônico, peptídeos, óleo de melaleuca, vitamina C, protetor solar, barreira cutânea, rotina noturna
- **Geo:** BR (Brasil)
- **Fonte salva no Sheets como:** "Trends Semana", "Trends Mês", "Trends Trimestre"
- Esses 3 temas alimentam o WF2 junto com os temas votados pelas clientes

---

## Regras — PDF Semanal (WF2)

### Pesquisa
- **SerpAPI:** busca Google com `[tema] cuidados pele` (10 resultados)
- **Tavily:** busca profunda `[tema] skincare international traditions` (5 resultados)
- **Google Trends (via WF5):** 3 sub-temas de skincare (semana, mês, trimestre)

### Estrutura do PDF (gerado pelo Claude API)

**7 Temas Diários (segunda a domingo):**
- Título do dia relacionado ao tema semanal
- 2–3 parágrafos de conteúdo
- 3–5 dicas práticas de skincare
- **1 dica/subtema comparativo:** como outra região do mundo ou método diferente aborda aquilo que foi falado no dia (ex: "Na Coreia do Sul, essa etapa é feita assim... / Na medicina ayurvédica, usa-se...")

**Seção Curiosidade (rotativa — não repetir o mesmo formato toda semana):**
- Semana 1: comparativo cultural (como 3 países diferentes cuidam da pele)
- Semana 2: linha do tempo / história de um ingrediente ou ritual
- Semana 3: mito vs verdade (3–5 mitos comuns sobre skincare, com explicação científica acessível)
- Semana 4: perfil de ingrediente (deep dive em 1 ingrediente: origem, ciência, como usar)
- A partir da semana 5: retomar ciclo ou criar nova abordagem, sempre dentro do tema central saúde da pele
- Registrar qual formato foi usado para não repetir na semana seguinte

### Tom e Restrições
- Linguagem: acessível, empático, com profundidade científica quando necessário
- Tom clínico é permitido quando o contexto exigir clareza técnica
- Citar pessoas reais é permitido esporadicamente (ex: dermatologistas, personalidades conhecidas por cuidar bem da pele)
- Proibido: tom negativo, julgamento, comparação corporal depreciativa
- Escopo: "pele = corpo inteiro" (não só rosto)

---

## Regras — PDF Gratuito (WF1)

- **O que é:** substrato/teaser do PDF semanal pago — a cliente deve sentir o "gostinho" do conteúdo completo e querer mais
- **Conteúdo:** extrato do PDF da semana corrente (link buscado do Supabase: pdf_url_atual)
  - Inclui: 2 dos 7 temas diários (os mais atraentes/completos)
  - Inclui: 1 dica comparativa (deixa clara a existência de mais)
  - NÃO inclui: a seção curiosidade completa (citar que existe, mas não entregar)
- **Gatilhos de interesse e desejo:**
  - Frases que remetam ao que ficou de fora: "Há mais 5 temas nesta semana..."
  - Destaque para a rotatividade do conteúdo: "Todo domingo um novo PDF completamente diferente"
  - Referência ao conteúdo exclusivo dos assinantes
- **Última página — Gatilhos de Marketing:**
  - Apresentação dos 3 planos com descrição breve:
    - **A Semente — R$9,90/mês:** PDF semanal completo + receitas naturais + dicas curadas toda semana
    - **O Encontro — R$14,90/mês:** Tudo do plano anterior + vídeos exclusivos da influencer + rotinas personalizadas. Alguém que cuida da sua pele com você.
    - **Experiência Completa — R$19,90/mês:** Tudo dos dois planos + guia completo sempre atualizado + acesso em primeira mão + materiais mensais exclusivos
  - CTA final: link direto para assinatura R$9,90

### Regra para Menores (13–17)
- PDF gratuito entregue normalmente
- Email de boas-vindas enviado com:
  - Sem oferta de compra ou menção a planos pagos
  - Conteúdo: curiosidades educativas sobre pele jovem, com foco em:
    - Como a barreira cutânea funciona e por que protegê-la cedo
    - Mitos vs verdades sobre pele na adolescência
    - Ingredientes naturais seguros para pele jovem
  - Tom: leve, educativo, sem julgamento sobre acne ou imperfeições
- WhatsApp comercial NÃO enviado para menor
- Checkout com nome + email do responsável + checkbox LGPD

---

## Regras Gerais dos Agentes
- Nenhum agente publica ou envia conteúdo para clientes sem passar pelo WF_SUMMARY
- GPT (WF8) é responsável exclusivo por redes sociais e scripts da influencer
- Claude API (WF2) é responsável exclusivo pelo PDF semanal
- Dados sensíveis (chaves de API) nunca vão para o repo público
- Auto-save no git a cada ~5 min durante sessões ativas (cron configurado em 23/03/2026)
