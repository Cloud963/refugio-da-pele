# Checklist de Lançamento — Refúgio da Pele

> Marque cada item conforme for concluído. Este documento é para uso interno da dona da marca.

---

## Fase 1 — Infraestrutura Técnica

### Domínio e Hospedagem
- [x] Domínio `refugiodapele.com.br` configurado
- [x] GitHub Pages ativo (site publicado)
- [x] CNAME configurado para domínio personalizado
- [ ] Email `contato@refugiodapele.com.br` criado na Hostinger
- [ ] SMTP configurado no n8n (usar credenciais Hostinger)

### Banco de Dados (Supabase)
- [x] Projeto Supabase criado (`aftrvqwazdiumibdfjjy`)
- [x] Tabela `clientes` criada com todos os campos
- [x] Tabela `config` criada
- [x] Tabela `interacoes` criada
- [x] Chave `pdf_url_atual` inserida na tabela `config`
- [ ] RLS (Row Level Security) configurado
- [ ] Serviço de backup automático ativado no Supabase

### Pagamentos (Stripe)
- [x] Conta Stripe criada
- [x] Produto R$9,90/mês criado (recorrente)
- [x] Link de checkout gerado
- [x] Branding do Stripe configurado (logo, cores)
- [ ] Produto R$14,90/mês criado (para quando a influencer lançar)
- [ ] Webhook Stripe configurado em n8n (endpoint WF7)
- [ ] Modo ao vivo ativado (saiu do modo teste)
- [ ] Portal do cliente Stripe configurado

### WhatsApp (Z-API)
- [ ] Plano Z-API contratado
- [ ] Instância Z-API conectada ao número da marca
- [ ] Número da dona (+351926856955) associado à Z-API
- [ ] Webhooks Z-API configurados

---

## Fase 2 — Workflows n8n

### Importação
- [x] WF1 — Envio PDF Grátis (importado)
- [x] WF2 — Geração PDF Semanal (importado)
- [x] WF3 — Atualização Link PDF (importado)
- [x] WF4 — Ciclo de Vida (importado)
- [x] WF5 — Eleição de Temas (importado)
- [x] WF6 — Influencer Domingo (importado)
- [x] WF7 — Stripe Pagamento (importado)
- [x] WF8 — GPT Social Media (importado)
- [x] WF_SUMMARY — Resumo Semanal (importado)

### Configuração de Credenciais no n8n
- [ ] SMTP (email contato@refugiodapele.com.br)
- [ ] Supabase Service Key (todas as chaves substituídas)
- [ ] Stripe Webhook Secret (`whsec_c0yOstL504LZgfhain0mAIeJ8OqBOWHM`)
- [ ] Z-API Token e Instance ID
- [ ] Google Sheets OAuth2
- [ ] Google Drive OAuth2
- [ ] Claude API Key
- [ ] GPT-4o API Key (`sk-svcacct-kd1GCR...`)
- [ ] SerpAPI Key
- [ ] Tavily API Key
- [ ] PDFShift API Key

### Ativação dos Workflows (nesta ordem)
1. [ ] WF3 — Atualização Link PDF (sempre ativo)
2. [ ] WF1 — Envio PDF Grátis
3. [ ] WF7 — Stripe Pagamento
4. [ ] WF4 — Ciclo de Vida
5. [ ] WF5 — Eleição de Temas
6. [ ] WF2 — Geração PDF Semanal
7. [ ] WF6 — Influencer Domingo
8. [ ] WF8 — GPT Social Media
9. [ ] WF_SUMMARY — Resumo Semanal

---

## Fase 3 — Conteúdo

### PDF Gratuito
- [ ] PDF gratuito (protocolo de boas-vindas) criado
- [ ] PDF hospedado no Google Drive com link público
- [ ] Link do PDF inserido na tabela `config` (chave `pdf_url_atual`)

### Primeiro PDF Semanal
- [ ] Tema da primeira semana definido
- [ ] PDF gerado manualmente (ou via WF2)
- [ ] Upload no Google Drive
- [ ] Link atualizado no Supabase (`pdf_url_atual`)

### Instagram
- [ ] Bio do Instagram atualizada
- [ ] Link do site na bio
- [ ] 9 posts de grade criados (feed de lançamento)
- [ ] Stories de lançamento preparados
- [ ] Primeiro post publicado

### Facebook
- [ ] Página do Facebook criada/atualizada
- [ ] Bio e informações atualizadas
- [ ] Primeiros posts publicados

---

## Fase 4 — Influencer

- [ ] Influencer contratada/confirmada
- [ ] Briefing da influencer entregue
- [ ] Scripts da primeira semana aprovados
- [ ] Conta da influencer conectada ao sistema de agendamento
- [ ] Produto R$14,90/mês criado no Stripe para o plano da influencer
- [ ] Card do plano R$14,90 ativado no site

---

## Fase 5 — Testes Finais

### End-to-End
- [ ] Formulário de cadastro testado (lead gratuito)
- [ ] Email de boas-vindas recebido (lead gratuito)
- [ ] WhatsApp de confirmação recebido
- [ ] Enquete D+3 testada
- [ ] Checkout Stripe testado (modo teste)
- [ ] Email de boas-vindas assinante recebido
- [ ] WhatsApp de boas-vindas assinante recebido
- [ ] Ciclo de vida testado (WF4)

### Aprovação Semanal
- [ ] WF_SUMMARY testado (resumo chegou no WhatsApp)
- [ ] Fluxo APROVAR testado
- [ ] Fluxo CANCELAR testado

---

## Fase 6 — Lançamento

- [ ] Data de lançamento definida
- [ ] Anúncio no Instagram preparado
- [ ] Stories de lançamento prontos
- [ ] Email para lista de espera preparado (se houver)
- [ ] Monitoramento ativo nas primeiras 24h
- [ ] Primeiro resumo semanal revisado

---

## Pós-Lançamento (Semana 1)

- [ ] Primeiros leads registrados no Supabase
- [ ] Primeiras assinantes confirmadas
- [ ] WF4 rodou corretamente na segunda-feira
- [ ] PDF semanal entregue a todas as assinantes
- [ ] Posts do Instagram publicados
- [ ] Resumo de domingo revisado e aprovado

---

## Contatos de Suporte

| Serviço | Suporte |
|---------|---------|
| n8n | n8n.io/support |
| Supabase | supabase.com/support |
| Stripe | stripe.com/support |
| Z-API | z-api.io |
| Hostinger | hostinger.com.br/suporte |
| GitHub Pages | github.com/support |
