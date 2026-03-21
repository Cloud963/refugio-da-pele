---
name: Auto-save chat no git a cada 15 minutos
description: Durante sessões do projeto Refúgio da Pele, salvar resumo + memória no git a cada ~15 minutos
type: feedback
---

Durante qualquer sessão de trabalho no projeto Refúgio da Pele, salvar automaticamente a cada ~15 minutos:
1. Atualizar `docs/resumo-sessao-[data]-parteX.txt` com o que foi feito
2. Copiar memória atualizada para `docs/memory-project.md`
3. `git add -A && git commit && git push` no repo `Cloud963/refugio-da-pele`

**Why:** O usuário quer backup contínuo do progresso para não perder contexto entre sessões.

**How to apply:** Não esperar o usuário pedir. Salvar proativamente a cada ~15 min de conversa ativa. Ao iniciar uma nova sessão, ler os docs/ do repo para retomar de onde parou.

**Regras adicionais do projeto:**
- Google Drive pasta raiz dos PDFs: https://drive.google.com/drive/folders/14PxriIGLSJTSHu0CEP-KU82XWeGuzNXm (permissão editor)
- Link público dos arquivos: https://drive.google.com/file/d/{fileId}/view?usp=sharing
- Repositório: https://github.com/Cloud963/refugio-da-pele (branch main)
