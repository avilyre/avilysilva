# Title
Blog Next Reading Block (End of Article)

# Summary
Adicionar, ao final de cada artigo do blog, um bloco de “próxima leitura” que recomenda automaticamente até 3 posts mais recentes (excluindo o post atual), exibindo apenas título e resumo, com link para cada conteúdo.

# Complete
No

## Objective
Reduzir o “beco sem saída” ao final de um artigo, aumentando a continuidade de leitura e o engajamento no blog ao sugerir de forma clara o que consumir em seguida.

## Technical Objective
Implementar um componente de recomendação no domínio de blog que receba uma lista de posts e renderize um bloco no fim do artigo. A lista será montada na rota do post (`/blog/[...slug]`) a partir da collection `posts`, com ordenação por data (descendente), exclusão do slug atual e limite de 3 itens.

Exemplo de preparação de dados na página do post:

```ts
import { getCollection } from "astro:content";

const allPosts = await getCollection("posts");

const nextReadingPosts = allPosts
  .filter(otherPost => otherPost.id !== post.id)
  .sort(
    (a, b) =>
      new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  )
  .slice(0, 3);
```

Exemplo de renderização condicional (não exibe quando não houver itens):

```astro
{nextReadingPosts.length > 0 && <NextReading posts={nextReadingPosts} />}
```

O componente exibirá somente:
- Título (`post.data.title`)
- Resumo (`post.data.summary`)

Cada item será um link para `/blog/<slug>`. Nenhuma personalização por tags/perfil e nenhuma curadoria manual entram no escopo.

## References
Files to be created:
- `src/features/blog/components/next-reading.astro`

Files to be modified:
- `src/pages/blog/[...slug].astro`

