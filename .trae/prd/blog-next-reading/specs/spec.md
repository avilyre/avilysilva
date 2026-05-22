# Context
Ao finalizar um artigo do blog, o leitor não tem uma orientação clara do que consumir a seguir. Isso cria um “beco sem saída” e aumenta a chance de saída do site.

# Goal
Exibir, ao final de qualquer artigo do blog, um bloco de “próxima leitura” com recomendações automáticas de conteúdo para incentivar continuidade de leitura.

# User Story
Como leitor do blog,
quero ver sugestões de próximos conteúdos ao final do artigo,
para continuar consumindo conteúdo sem precisar voltar à listagem.

# Functional Requirements
- O bloco aparece ao final de qualquer página de artigo do blog (`/blog/[...slug]`), desde que existam posts recomendáveis.
- O bloco exibe uma lista com até 3 itens.
- Cada item exibe somente:
  - Título do conteúdo
  - Resumo do conteúdo
- Cada item é clicável e direciona para a página do conteúdo recomendado.

# Recommendation Rules
- Quantidade exibida: 3 itens (máximo).
- Critério de ordenação: do mais recente para o menos recente, com base em `post.data.date`.
- Exclusão do conteúdo atual: o post sendo lido não pode aparecer na lista.

# Edge Cases
- Se, após excluir o conteúdo atual, não houver nenhum outro conteúdo disponível, o bloco não deve ser exibido.
- Se houver menos de 3 conteúdos disponíveis, exibir apenas os disponíveis, sem placeholders.

# Out of Scope
- Personalização por categoria/tags/perfil do leitor.
- Curadoria manual/editorial.
- Exibir imagem, autor, tempo de leitura, data ou outros metadados além de título e resumo.

# UX Content
- Título do bloco: “Próxima leitura”
- Cada item:
  - `title` (obrigatório pela collection)
  - `summary` (obrigatório pela collection)

# Non-Functional Requirements
- Não introduzir dependências externas para recomendação.
- Manter o comportamento consistente em build estático (Astro) usando Content Collections.

