---
name: Refúgio da Pele — Contexto do Projeto
description: Projeto de automação de marketing e sistema de clientes para a marca Refúgio da Pele (skincare íntimo feminino)
type: project
---

Projeto de automação completa para marca de skincare íntimo feminino chamada **Refúgio da Pele** (refugiodapele.com.br).
contato@refugiodapele.com.br

**Why:** Construir funil de leads + ciclo de vida de clientes com segmentação por idade, faixa materna, e regras legais para menores.
**How to apply:** Decisões de implementação devem respeitar LGPD, segurança de dados, e as regras de negócio definidas abaixo.

---

## Stack
- **n8n** — automação e workflows (cloud: refugiodapele.app.n8n.cloud)
- **Supabase** — banco de dados, autenticação, API REST
- **Stripe** — pagamentos + webhook → n8n → entrega PDF
- **Google Sheets** — abas: Leads, Feedback, Temas da Semana, Cupons, Cancelamentos
- **Z-API** — WhatsApp Business (instância 3F06247099D391366D735EC66E320A44)
- **Email HTML** — compatível com Gmail, Outlook, Apple Mail

---

## Credenciais n8n
- instanceId: b3f36ad4b8a579dd86116dc9449ee81a2e4c05ad27fc75bf5538fe5592ed48cb
- SMTP: id "LQzuLvKBJ7VqTETa", name "SMTP account"
- Z-API instance: 3F06247099D391366D735EC66E320A44
- Z-API token: 9FEB7A24EE74CDCBC327832A
- Z-API Client-Token: F212a72ec09cb4f14b062257d320f4573S
- Google Sheets: id "DzhWrB0cOwGmCaUD", name "Google Sheets account"
- Planilha ID: 1RJREELqinbpue4-jkIXkb-Bi_pWMot3oI_Sk4GVQc7o
- Supabase credencial n8n: "Refugio da Pele — Supabase"

---

## Supabase
- URL: https://aftrvqwazdiumibdfjjy.supabase.co
- Tabelas criadas: clientes, cupons, cancelamentos, config, interacoes
- Schema em: docs/supabase-schema.sql
- config: armazena pdf_url_atual (usado pelo WF3)

---

## Stripe
- Webhook signing secret: whsec_c0yOstL504LZgfhain0mAIeJ8OqBOWHM
- Webhook endpoint: https://refugiodapele.app.n8n.cloud/webhook/stripe-pagamento
- Produto ativo: R$9,90/mês (assinatura recorrente) — link: https://buy.stripe.com/bJe7sM2sma0c7Cmbb26wE03
- Produto arquivado: R$17,90 (era valor fixo, não recorrente — arquivado)
- **PENDENTE: criar produto R$14,90/mês recorrente** para o plano "Com Presença" (influencer)

---

## Segmentação por Faixa Etária
- 13–17: conteúdo educativo, SEM oferta de compra, requer autorização de responsável
- 20–29, 30–39, 40–49, 50+ (menopausa), 60+
- Maternidade sobrescreve segmentação etária (grávida / pós-parto / amamentando)

---

## Regras para Menores (13–17)
- PDF gratuito liberado normalmente
- Email: link do PDF + 1 curiosidade educativa + teaser do próximo PDF — SEM oferta
- WhatsApp comercial NÃO enviado para menor
- Checkout: campo para nome + email do responsável + checkbox LGPD
- CPF no checkout para verificar maioridade (API: Serpro DataValid / BigDataCorp) — não armazenado

---

## Sistema de Cupons
- Gerados pelo n8n, salvos na aba "Cupons" da planilha
- Estrutura: código, CPF vinculado, desconto, validade, usado (sim/não)
- Vinculado ao CPF — uso único, não transferível

---

## Ofertas de Aniversário
- **Nova cliente:** 50% OFF, cupom ANIV[Nome][Ano], válido no mês
- **Recorrente:** desconto = idade em %, válido no mês, uso único/ano
- Anti-burla: CPF vinculado ao cadastro Supabase, carência 12 meses

---

## Email FIZ18
- Disparado no dia exato dos 18 anos
- Conteúdo: parabéns + PDF completo + cupom FIZ18 (50% OFF, 30 dias, uso único por CPF)
- Badge visual: fundo dourado (#c9a84c → #f0d080)

---

## Reativação de Inativas
- 14 dias: email de saudade + PDF (reactivation_1)
- 17 dias: WhatsApp sutil (reactivation_2) — sem email
- Regra de 45 dias removida

---

## Planos
- R$9,90/mês — "Seu Ritual" — ATIVO, centro, único com link Stripe
- R$14,90/mês — "Com Presença" — Em breve, plano da influencer, silhueta misteriosa
- R$19,90/mês — "Experiência Completa" — Em breve

---

## Workflows (todos em: workflows/)
- WF1 "Envio PDF GRATIS" — ATIVO — Webhook → Organizar → Supabase upsert → Sheets → Z-API + Email → Wait 3d → Enquete
- WF2 wf2-pdf-semanal.json — INATIVO (aguarda chaves SerpAPI/Tavily/Claude/PDFShift)
- WF3 wf3-atualizacao-link.json — INATIVO (acionado pelo WF2)
- WF4 wf4-ciclo-de-vida.json — ATIVO — Schedule diário 08h → aniversário/FIZ18/inatividade/cancelamento
- WF5 wf5-eleicao-temas.json — INATIVO (aguarda abas planilha)
- WF6 wf6-influencer-domingo.json — INATIVO (aguarda influencer)
- WF7 wf7-stripe-pagamento.json — INATIVO (aguarda SMTP + substituir SUPABASE_SERVICE_KEY)

---

## Assets
- assets/refugio-da-pele-logo-transparente.png — logo PNG transparente (usar no Stripe e site)
- assets/favicon-512.png — ícone gota (usar no Stripe campo Ícone)
- assets/refugio-da-pele-perfil-facebook.png — imagem de perfil Facebook/Instagram

## Stripe Branding
- Cor da marca: #2c1f18
- Cor de destaque: #c0513a
- Logo: assets/refugio-da-pele-logo-transparente.png

---

## Influencer Virtual
- 1 influencer principal + 1 para faixa 50+, criadas no Freepik
- Vídeos 15–40s via Seedance/Hailuo, distribuição Z-API
- Estrutura semanal: Segunda(reset) Terça(educação) Quarta(conexão) Quinta(ajuste) Sexta(progresso) Sábado(autocuidado) Domingo(emocional)
- Modos: leve(1x/dia) / acompanhamento(2x/dia) / intensivo(3x/dia)

---

## Pendências (atualizado em 21/03/2026)
CONCLUÍDO:
- [x] Comprar domínio de email profissional (Hostinger)
- [x] Criar conta Supabase e tabelas (clientes, cupons, cancelamentos, config, interacoes)
- [x] Fork MiroFish + repo cloud963-tools
- [x] Reformular seção de planos no index.html
- [x] Adicionar campos novos no formulário (idade, preocupação, fase materna)
- [x] WF1 atualizado (novos campos + Supabase upsert + enquete 3 dias)
- [x] WF4 ativo e conectado
- [x] WF2, WF3, WF5, WF6 importados no n8n
- [x] WF7 criado (Stripe webhook)
- [x] Stripe branding configurado (logo, cores)
- [x] Produto R$17,90 arquivado no Stripe (era valor fixo)

PENDENTE:
- [ ] Configurar SMTP no n8n (criar email no Hostinger)
- [ ] Substituir SUPABASE_SERVICE_KEY no WF7 (service role key já disponível)
- [ ] Criar produto R$14,90/mês recorrente no Stripe (plano influencer "Com Presença")
- [ ] Ativar WF7 após configurar SMTP
- [ ] Adicionar chaves SerpAPI + Tavily + Claude API + PDFShift ao n8n
- [ ] Criar influencer no Freepik (aparência fixa)
- [ ] Criar imagens estáticas da influencer para o site
- [ ] Configurar Z-API (pagar plano + configurar webhooks de entrada)
- [ ] Melhorar layout seção de planos no index.html (Claude Desktop)
- [ ] Testar WF1 end-to-end completo
- [ ] Integrar WF7 com produto R$14,90 quando lançar influencer
