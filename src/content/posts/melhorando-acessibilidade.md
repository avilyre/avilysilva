---
title: Melhorando Acessibilidade e Usabilidade
summary: Entenda como melhorar a acessibilidade dos seus projetos e se torne um(a) profissional mais completo(a).
cover: /images/posts/melhorando-acessibilidade/cover.jpg
date: "2024-11-27:17:06:00"
isDraft: false
---

## Um mundo mais acessível

Se você não vive dentro de uma caixa, certamente você já ouviu falar de **acessibilidade** ou **a11y**, e não é atoa que esse assunto seja tão importante. Durante nossa rotina desenvolvemos os mais variádos tipos de projetos, desde uma simples landing page até plataformas completas. O ponto é; não desenvolvemos apenas para nós mesmos, devemos pensar sempre na usabilidade e também na acessibilidade para outras pessoas.

Por isso, aqui vai alguns pontos onde você pode colocar em prática e melhorar tanto a acessibilidade dos seus próximos projetos quanto a usabilidade e se tornar um(a) profissional mais completo(a):

- **Cores:** Evite usar cores fortes, sempre procure facilitar a leitura do usuário deixando um constraste mais suave na cor de fundo e da fonte. Se possível coloque a **troca de tema para dark** como opcional.

- **Não use PX:** Ao definir `font-size`, `padding` e `margin` sempre procure utilizar a unidade de medida `REM`, pois ela se ajusta de acordo com o tamanho da fonte do dispositivo; Se o usuário deixar a fonte do dispositivo maior consequentemente o seu site/app vai se ajustar a isso. Tá mas como vou decobrir qual valor em `REM` que vai se equivaler a determinado valor em `PX` ? É bem simples, imagine que você queira colocar um `margin-bottom` de `64px`, basta você dividir por `16` que é o valor base pelo valor em `PX` que deseja: `64 / 16 = 4` sendo assim `4rem` que equivale a `64px`

```css
body {
  font-size: 16px; /* ou 100% */
}

button.botao-com-texto-grande {
  font-size: 2rem; /* 32px / 16px = 2rem */
}
```

- **Botão | type | title:** É muito importante que seus botões tenham sempre a propriedade `type`. Caso o seu botão tenha apenas um icone use `title` também, assim usuário conseguirá passar o mouse e saber o que ele faz.

```html
<!-- Botão com conteúdo -->
<button type="button">conteúdo</button>
```

```jsx
{
  /* Botão apenas com icone */
}
<button type="button" title="Configurações">
  <GearIcon />
</button>;
```

- **Label:** Para elementos de formulários (ou não) sempre que possível use **labels**, para que o usuário possa tocar no título e automaticamente focar no elemento que deseja.

```html
<!-- 'for' para HTML e 'htmlFor' para React / JSX -->
<label for="username" />
<input id="username" />
```

- **Outline:** Permite que seja possível navegar no seu site/app usando o teclado, sendo possível visualizar a `outline` (linha que exibe o foco) em elementos como: botões, inputs, modais, dropdown, links etc. Você também pode estilizar a `outline` para que fique com um constraste e tamanho bacana.
  Customizando:

```css
:focus-visible {
  outline-offset: 3px;
  outline-color: red;
  outline-width: 3px;
  outline-style: solid;
}
```

- **Imagens | Peso:** Ao utilizar imagens nos seus projetos sempre faça a compressão delas, para que fiquem num peso menor, pensando que o usuário pode não estar usando uma boa conexão, tornando assim o seu site/app mais leve e carregando de forma mais rápida. Pra isso você pode utilizar o [tinypng](https://tinypng.com/) que consegue reduzir até 90% dependendo da imagem.

- **Imagens | alt:** É importante sempre definir a propriedade alt das imagens com uma breve descrição de como essa imagem é, se possível. Em caso do não carregamento dessa imagem esse texto alternativo será exibido, não quebrando totalmente a experiência, porém o melhor dos casos é ter uma tratativa no caso de ocorrer algum problema no carregamento.

```html
<img src="<imagem-de-seta>" alt="seta branca apontando para cima" />
```

- **Não duplique:** Não duplique elementos; um para desktop e outro para mobile que fazem a mesma coisa. Um exemplo muito claro disso são as **navbars**. você consegue utilizar a mesma navbar (eu faço isso) para criar o menu mobile, apenas alterando para position absolute e estilizando como deseja.

## Conclusão

Colocando esses pontos em seus projetos com certeza será um grande diferencial. Também é muito importante você mencionar que seu projeto é acessível quando fizer alguma publicação, isso mostra que você teve cuidade e se importou com os seus usuários.

_"Acessibilidade não é apenas para quem tem alguma limitação fisica; Acessibilidade é para todos!"_

Mantenha essa frase em mente sempre que criar um projeto novo.
