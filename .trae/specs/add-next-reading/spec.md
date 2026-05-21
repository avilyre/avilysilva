# Bloco de Próxima Leitura no Artigo Spec

## Why
Ao concluir a leitura de um artigo, o leitor chega ao fim da página sem uma orientação clara do que consumir a seguir, aumentando a chance de saída do site.

## What Changes
- Exibir um bloco de “Próxima leitura” ao final de qualquer artigo do blog, com até 3 recomendações.
- Recomendações serão os conteúdos mais recentes do blog, ordenados do mais recente para o menos recente.
- O artigo atual (o que o leitor acabou de ler) nunca deve aparecer na lista.
- Cada item exibirá apenas: título e resumo; o item será clicável e levará para o respectivo artigo.
- O bloco não deve ser exibido quando não existir nenhum outro conteúdo disponível além do atual.
- Se houver menos de 3 conteúdos disponíveis (excluindo o atual), exibir somente os disponíveis, sem placeholders.

## Impact
- Affected specs: navegação/continuidade de leitura no domínio de blog
- Affected code:
  - `src/pages/blog/[...slug].astro` (inclusão do bloco no template e preparação dos dados)
  - `src/features/blog/components/*` (novo componente de UI para “Próxima leitura”)

## ADDED Requirements
### Requirement: Recomendações de próxima leitura
O sistema SHALL exibir, ao final de qualquer artigo do blog, um bloco de “Próxima leitura” com até 3 itens recomendados, ordenados por data do mais recente para o menos recente, excluindo o artigo atual.

#### Scenario: Exibição com 3 itens
- **WHEN** o leitor chega ao final de um artigo e existem pelo menos 3 outros conteúdos publicados
- **THEN** o bloco é exibido com exatamente 3 itens, ordenados do mais recente para o menos recente
- **AND** cada item exibe apenas título e resumo
- **AND** cada item é clicável e direciona para `/blog/<slug>`
- **AND** o artigo atual não aparece na lista

#### Scenario: Exibição com 1 ou 2 itens
- **WHEN** o leitor chega ao final de um artigo e existem apenas 1 ou 2 outros conteúdos (excluindo o atual)
- **THEN** o bloco é exibido com 1 ou 2 itens, respectivamente
- **AND** não existem itens vazios/placeholder para completar 3

#### Scenario: Não exibir sem alternativas
- **WHEN** o leitor chega ao final de um artigo e não existe nenhum outro conteúdo disponível além do atual
- **THEN** o bloco de “Próxima leitura” não é exibido

## MODIFIED Requirements
### Requirement: Renderização de página de artigo do blog
O sistema SHALL manter a renderização do artigo em `/blog/[...slug]` e adicionar, no final do conteúdo do artigo, o bloco de “Próxima leitura” conforme os requisitos adicionados.

## REMOVED Requirements
### Requirement: Personalização/curadoria de recomendações
**Reason**: Fora de escopo.
**Migration**: N/A.
