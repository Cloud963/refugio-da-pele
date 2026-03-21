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
- **PENDENTE: associar ao Z-API**

## Regras Gerais dos Agentes
- Nenhum agente publica ou envia conteúdo para clientes sem passar pelo WF_SUMMARY
- GPT (WF8) é responsável exclusivo por redes sociais e scripts da influencer
- Claude API (WF2) é responsável exclusivo pelo PDF semanal
- Dados sensíveis (chaves de API) nunca vão para o repo público
- Auto-save no git a cada ~15 min durante sessões ativas
