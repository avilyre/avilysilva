---
title: Não Use Margin em Componentes
summary: Um dos maiores problemas ao criar componentes reutilizáveis, é cria-lo pensando apenas num único contexto de uso.
cover: /images/posts/nao-use-margin-em-componentes/cover.jpg
date: "2024-11-28:10:55:00"
isDraft: false
---

## O problema da margem

Para entender o grande motivo pelo qual deveriamos evitar o uso da propriedade `margin` do CSS em componentes, tanto em React quanto em qualquer outra ferramenta é pela seguinte razão; _"TODO componente que for reutilizável, ele deve ser capaz de se encaixar em qualquer lugar para o qual ele foi proposto, para que ele seja reutilizável, manutenível e seu estilo não afete ou cause anomalias ao layout."_ Claro que isso não se aplica a componentes que podem e devem usar `margin`, como por exemplo componentes de template.

Vamos ver um exemplo desse problema: Temos uma interface composta por `aside`, `footer`, `link` (config) e por fim `button` (verde) que é o nosso componente reutilizável. Esse botão tem uma margem em laranja na direita adicionando um espaço entre ele e o `link`:

![botão com margem na lateral direita](/images/posts/nao-use-margin-em-componentes/example-01.png)

Até ai tudo bem, agora vamos adicionar esse nosso componente ao nosso `footer` e `aside`:

![botão com margem na lateral direita](/images/posts/nao-use-margin-em-componentes/example-02.png)

Perceba que os problemas aparecem quando o botão é adicionado em outro contexto. Fiz alguns traçados em braco nos containers onde ele foi adicionado, mostrando a grande diferença que causa no espaçamento desse container, ficando um espaçamento maior ao lado que tem a margem, causando um desconforto visual por conta do desalinhamento.

Pra resolver isso basta tirar o `margin` do nosso botão certo ? Sim e não, se fizermos isso o nosso botão ficara da forma correta, ocupando 100% do espaço de um lado para o outro (no caso da aside), porém ele também ficará colado com o `link`. NUNCA esqueça que, o que adiciona espaço entre elementos e componentes NÃO é `margin` ou `padding` e sim o container por volta deles! pode acontecer exceções ? pode, mas a grande maioria é isso, principalmente quando falamos de componentes reutilizáveis.

## Seja reutilizável

Lembra da frase que mencionei antes ? _"... deve se encaixar em QUALQUER lugar ..."_ e pra isso acontecer, vamos remover a `margin` desse botão e adicionar por volta do `button` e `link` um outro elemento, pode ser uma `div`por exemplo.

Com isso feito, agora podemos utilizar o próprio Flexbox ou até mesmo GridLayout pra aplicar esse espaçamento:

OBS: Vou usar css inline pra ficar mais fácil de entender

```jsx
<body>
{/* resto do conteúdo */}

  <div {/* div responsável pelo espaçamento */}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}
  >
    <ButtonComponent type="button">
      botão
    </ButtonComponent>

    <a href="#">
      config
    </a>
  </div>

{/* resto do conteúdo */}
</body>
```

Pronto! o problema agora foi resolvido, removemos a `margin` do nosso componente, permitindo que ele se encaixe em qualquer lugar e adicionamos um container por volta dos elementos que precisam ter esse espaço entre sí, e esse é o resultado:

![botão com margem na lateral direita](/images/posts/nao-use-margin-em-componentes/example-03.png)
