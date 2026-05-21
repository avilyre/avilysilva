# Tasks
- [x] Task 1: Preparar lista de recomendações no artigo do blog
  - [x] Buscar todos os posts via `getCollection("posts")` na rota do artigo.
  - [x] Ordenar por `data.date` (descendente) e excluir o post atual pelo `id/slug`.
  - [x] Selecionar até 3 itens para exibição, preservando a ordenação.
  - [x] Garantir que a lista possa ser vazia (para controlar não renderização do bloco).

- [x] Task 2: Criar componente de UI “Próxima leitura”
  - [x] Criar componente Astro no domínio de blog para renderizar: título do bloco + lista de itens.
  - [x] Definir `type Props` com a lista de itens recomendados (slug, title, summary).
  - [x] Renderizar somente `title` e `summary` e link para `/blog/<slug>`.
  - [x] Não renderizar o componente quando a lista estiver vazia.

- [x] Task 3: Integrar o componente na página do artigo
  - [x] Inserir o componente ao final do artigo em `src/pages/blog/[...slug].astro` (após o conteúdo do post).
  - [x] Confirmar que o artigo atual nunca é exibido como recomendado.

- [x] Task 4: Validação local e regressão
  - [x] Verificar manualmente os casos: 0, 1, 2 e 3+ posts disponíveis (excluindo o atual).
  - [x] Rodar `pnpm lint` e corrigir eventuais warnings/erros.
  - [x] Rodar `pnpm build` para validar geração estática do blog.

# Task Dependencies
- Task 2 depende de Task 1 (contrato de dados para a lista).
- Task 3 depende de Task 2.
- Task 4 depende de Tasks 1–3.
