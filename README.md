# Crescitec – Algoritmo de Interesse e Feed Personalizado

Este repositório reúne o workflow n8n e o backend TypeScript utilizados para alimentar e consultar o algoritmo de personalização do feed da plataforma Crescitec.

---

## 🛠️ O que faz

- **Workflow n8n:** Roda diariamente (ou no intervalo desejado), calcula os “pesos de interesse” dos usuários por categoria (baseado em respostas, curtidas, tópicos), usando score ponderado por ação e decaimento temporal. Atualiza a tabela `interesse_usuario` via upsert em lote no Supabase, mantendo o algoritmo de recomendação sempre atualizado.
- **Backend TypeScript:** Permite atualizar os interesses dos usuários em tempo real (a cada ação relevante do usuário: curtir, responder, criar tópico), e gera o feed personalizado de acordo com os dados calculados no Supabase.

---

## ⚙️ Como usar

### **Workflow n8n**
1. Importe o arquivo `.json` deste repositório no painel do n8n.
2. Configure a credencial do banco Postgres/Supabase (usando o mesmo nome da credencial no workflow).
3. Ative o workflow.
4. Pronto! O algoritmo roda automaticamente no horário programado.

### **Backend TypeScript**
1. Clone este repositório e navegue até a pasta do projeto.
2. Instale as dependências:
npm install

markdown
Copiar
Editar
3. Crie um arquivo `.env.local` na raiz, contendo:
SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_SERVICE_KEY=eyJ...(sua chave)

yaml
Copiar
Editar
4. Os arquivos em `/lib` já fazem a conexão, atualização instantânea de interesses e geração do feed personalizado.
5. Importe e utilize as funções `atualizarInteresseUsuario` e `getPersonalizedFeed` nos endpoints do seu backend conforme necessidade.

---

## 🔒 Segurança

- **Nenhuma senha, API key ou segredo está nos arquivos do workflow n8n ou no backend do repositório!**
- Apenas o “nome da credencial” usada no seu n8n é exportado.
- O arquivo `.env.local` (com suas chaves) nunca deve ser incluído no repositório.
- Nunca inclua arquivos de configuração sensíveis (ex: `.env`, settings do n8n, chaves privadas) no GitHub.

---

## 📄 Estrutura do repositório

/lib
feed.ts
interesse.ts
supabaseClient.ts
package.json
package-lock.json
tsconfig.json
.gitignore
.env.local (não subir para o GitHub!)
workflows/
[workflow-n8n].json
README.md

yaml
Copiar
Editar

- **Node 1 (n8n):** Cron (agendamento diário)
- **Node 2 (n8n):** Executa query SQL de cálculo e upsert em lote (sem loops/processamento linha-a-linha)
- **Backend:** Funções TypeScript para atualização instantânea e montagem do feed personalizado

---

## ✨ Sugestões

- Para logs, adicione node “E-mail” ou “Telegram” no workflow n8n em caso de erro.
- Se mudar nomes de tabelas/colunas, ajuste a query SQL e as funções do backend.
- Siga boas práticas de versionamento e nunca suba segredos!

---
