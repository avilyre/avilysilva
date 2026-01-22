---
title: Não pense React, Pense JavaScript
summary: Entenda como o React funciona por baixo dos panos e a pensar de forma fragmentada, não se limitando apenas ao escopo do componente.
cover: /images/posts/nao-pense-react-pense-javascript/cover.jpg
date: "2024-12-23:14:15:00"
isDraft: false
---

## O começo

Todos nós desenvolvedores, independente do nível de conhecimento técnico, começamos aprender de fontes parecidas, sendo: cursos, tutoriais no youtube e até a própria documentação da ferramenta. Certamente isso não é um problema, por que todos os conteúdos que consumimos para aprender alguma coisa, já foi "mastigado" pra que eu e você possamos entender de uma maneira mais simples, concorda ? e isso as vezes pode fazer com que a nossa maneira de pensar sobre algo seja limitada apenas aquilo que aprendemos e não tenhamos um pensamento crítico e analítico sobre o assunto.

## A receita

Ao entrar no mundo da programação e temos um objetivo traçado, como por exemplo "quero ser um desenvolvedor front-end", existe aquela velha receita que funciona muito bem e que recomendo: aprenda sobre o Navegador, os conceitos por trás da WEB e então comece a aprender algumas linguagens, sendo elas HTML, CSS e JavaScript (iniciando exatamente nesse ponto seu aprendizado sobre lógica de programação) pra dai então, depois de ter uma base sólida você decidir qual pokem... 😅 ferramenta vai focar seja React, Angular ou Vue.

## Pense React

Já ao iniciar no React, a primeira coisa aprendemos é que "React é uma biblioteca JavaScript para construção de interface reativa, que utiliza o conceito de jsx, componentes" e assim vai... porém, focamos tanto em componentes, hooks e outros conceitos, que no fim não paramos pra pensar que tudo se resume a funções e variáveis/constantes. Se eu te perguntar "O que é um componente React ?" provavelmente o que vem na sua cabeça são os estados, o retorno visual do componente, propriedades etc.

Agora eu quero te convidar a analisar o seguinte código:

```jsx
function criarBotao() {
  const conteiner = document.body;

  const botao = document.createElement("button");
  const titulo = document.createTextNode("Titulo bacana");

  botao.setAttribute("onclick", () => {
    /* ação */
  });
  botao.appendChild(tituloElemento);

  conteiner.appendChild(botao);
}
```

Esse código é uma função que quando executada, ela cria e coloca um botão com um título no `body` do html, apenas isso! Veja como tudo se resume a `const` e a função de um objeto sendo executada (`objeto.funcao()`). Nós temos as seguintes caracteristicas nessa função:

- `createElement` - Cria o nosso botão (o tipo `button`, indica que elemento está criando)
- `setAttribute` - Adiciona o atributo `onclick` ao nosso botão.
- `createTextNode` - Cria um texto, que pode ser anexado a um elemento
- `botao.appendChild` - Anexa o título como child do botão.
- `conteiner` - Conteiner onde o botão vai ser inserido.
- `conteiner.appendChild` - Anexa o botão ao HTML.

Beleza mas talvez você se pergunte "qual a relação disso com o React ?" Ótima pergunta! vamos criar o mesmo exemplo com React:

```jsx
import React from "react";
import ReactDOM from "react-dom";

const container = document.getElementById("root");

function criarBotao() {
  const botao = React.createElement(
    "button", // Tipo do elemento
    {
      onClick: () => {
        /* açao */
      },
    },
    "Titulo bacana", // Título que será exibido no botão
  );

  return botao;
}

// Renderiza o componente dentro do container 'root'
ReactDOM.render(React.createElement(criarBotao), container);
```

Se você nunca viu esssa sintaxe no React, provavelmente sua cabeça deu um nó 😵‍💫 Pois é, você usa isso o tempo todo e não sabia! o `JSX` é uma forma mais "limpa" de usarmos essa função que cria os elementos/Componentes dentro do React. Exemplo com `JSX`:

```jsx
import React from "react";
import ReactDOM from "react-dom";

const container = document.getElementById("root");

function criarBotao() {
  return (
    <button
      onClick={() => {
        /* ação */
      }}
    >
      Titulo Bacana
    </button>
  );
}

ReactDOM.render(React.createElement(criarBotao), container);
```

Agora sim ficou próximo do que usamos no dia a dia... 😮‍💨

Quando nós escrevemos o HTML, o React faz esse processo por baixo dos panos, o que eu quero dizer com tudo isso é que você não precisa se limitar apenas ao espaço que você tem dentro do componente, veja ele como uma função composta por variáveis, constantes, funções que executam dentro de funções (`closures`), onde tudo pode ser removido, movido para outro arquivo, criar padrões enxergando muito além do que estamos acostumados a ver. Perceba que conseguimos criar a mesma coisa com e sem React, é dai que surgem as arquiteturas de projetos e padrões... é você ver, organizar e pensar muito além do que você tem.

Por hoje é só! se você gostou desse conteúdo, não esquece de compartilhar 👍🏻 isso me ajuda a trazer cada vez mais!
