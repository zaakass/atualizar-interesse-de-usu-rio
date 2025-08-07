# Crescitec – Atualizar Interesse Usuário (Workflow n8n)

Este workflow automatiza o cálculo e a atualização dos interesses dos usuários na plataforma Crescitec, alimentando o algoritmo de personalização do feed.

## 🛠️ O que faz

- Roda diariamente (ou no intervalo desejado).
- Calcula os “pesos de interesse” de cada usuário por categoria, baseado nas ações recentes (respostas, curtidas, tópicos).
- Usa score ponderado por ação e tempo, atualizando a tabela `interesse_usuario` via upsert em lote no Supabase.
- Mantém o algoritmo de recomendação sempre atualizado para o feed personalizado.

## ⚙️ Como usar

1. **Importe o arquivo `.json` deste repositório no painel do n8n.**
2. Configure a credencial do banco Postgres/Supabase (usando o mesmo nome da credencial no workflow).
3. Ative o workflow.
4. Pronto! O algoritmo roda automaticamente no horário programado.

## 🔒 Segurança

- **Nenhuma senha, API key ou segredo está neste arquivo!**
- Apenas o “nome da credencial” usada no seu n8n é exportado.
- Nunca inclua arquivos de configuração sensíveis (ex: `.env`, settings do n8n) no repositório.

## 📄 Estrutura do workflow

- **Node 1:** Cron (agendamento diário)
- **Node 2:** Executa query SQL de cálculo e upsert em lote
- Sem loops ou processamento linha-a-linha (alta performance)
- Pode adicionar nodes de notificação/logs se desejar

## ✨ Sugestões

- Para logs, adicione node “E-mail” ou “Telegram” em caso de erro.
- Se mudar nomes de tabelas/colunas, ajuste a query SQL no workflow.

---

Qualquer dúvida, sugestão ou melhoria, abra uma Issue ou um Pull Request!

