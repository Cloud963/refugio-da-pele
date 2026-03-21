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
| Sáb 22h | WF5 | Pesquisa clima + elege temas da semana seguinte |
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

## Regra dos 7 Dias de Antecedência (Influencer)

O conteúdo da influencer deve ser preparado com **1 semana de antecedência**:

- WF8 gera scripts da influencer toda **segunda** para a semana *seguinte*
- Exemplo: segunda 21/04 → gera scripts para 28/04–04/05
- Scripts ficam no Google Sheets ("Conteúdo da Semana") aguardando revisão
- Dona aprova no domingo antes da publicação
- Isso garante tempo para gravar, editar e agendar antes do prazo

### Fluxo de Produção da Influencer
```
Seg 08h — WF8 gera scripts da semana seguinte
Dom 17h — Dona revisa no resumo semanal
Dom 20h — Deadline para APROVAR ou CANCELAR
Seg 08h (semana seguinte) — Conteúdo publicado/enviado
```

---

## Regra do Clima (WF5 — obrigatório)

O WF5 deve sempre combinar **3 elementos** para compor o tema semanal:

1. **Tema principal** — escolhido com base no calendário, histórico e perfil das assinantes
2. **Curiosidade** — dado ou fato surpreendente sobre skincare relacionado ao tema
3. **Clima da semana** — previsão do tempo pesquisada via SerpAPI/Tavily para o Brasil (região principal da base)

O clima **deve ter coerência** com o tema escolhido:
- Semana fria/seca → hidratação profunda, óleos, rotina noturna intensa
- Semana quente/úmida → leveza, oil control, protetor solar, pele sensível ao calor
- Transição de estação → adaptação da rotina, ingredientes de transição

O tema final salvo no Supabase (`tema_semana_atual`) deve incluir o contexto climático para que WF2 (Claude PDF) e WF8 (GPT social) produzam conteúdo coerente com a realidade da cliente naquela semana.

---

## Escopo Temático — "Pele" é o corpo inteiro

Não limitar conteúdo ao rosto. Qualquer parte do corpo é válida:
cotovelos, joelhos, calcanhares, mãos, colo, couro cabeludo, virilha, etc.
Isso garante volume de conteúdo e relevância o ano todo.

---

## Estrutura Obrigatória do PDF Semanal (WF2)

Todo PDF deve conter, além do conteúdo do tema:
- **1 a 3 receitas/remédios naturais** — ingredientes caseiros e acessíveis
- **3 a 4 produtos gerais** — de prateleira, relacionados ao tema da semana

---

## Tom e Voz — Regras Absolutas

### Obrigatório em todo conteúdo:
- **Leveza** — nunca pesado ou denso
- **Simpatia e carisma** — voz de amiga que entende de pele
- **Transparência** — honesta sobre o que funciona
- **Afeto genuíno** — nunca forçado
- **Sátiras curtas com licença poética** — humor que abraça, arrancar sorrisos sem perder elegância

### Proibido em todo conteúdo:
- Mencionar gênero ("mulheres fazem X", "homens Y")
- Mencionar pessoas reais ou celebridades
- Comparações envolvendo animais
- Abordagem negativa (especialmente no início)
- Tom clínico ou técnico demais

### Público: mulheres — acolhedor, empoderador, feminino, natural.

---

## Papel do Claude como Orquestrador

Claude é o **braço direito** do dono e filtro final de qualidade:
- Supervisiona WF5 (temas), WF2 (PDF) e WF8 (social/influencer)
- Rejeita conteúdo fora do tom ou do escopo
- Garante coerência: clima + tema + curiosidade + voz da marca
- Aplica licença poética com inteligência

---

## Regras Gerais dos Agentes
- Nenhum agente publica ou envia conteúdo para clientes sem passar pelo WF_SUMMARY
- GPT (WF8) é responsável exclusivo por redes sociais e scripts da influencer
- Claude API (WF2) é responsável exclusivo pelo PDF semanal
- Dados sensíveis (chaves de API) nunca vão para o repo público
- Auto-save no git a cada ~15 min durante sessões ativas
- Scripts da influencer sempre gerados com 7 dias de antecedência (ver regra acima)
