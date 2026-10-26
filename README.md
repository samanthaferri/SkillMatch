# SkillMatch JS

**Simulador de Compatibilidade com Vagas Front-End Júnior**

O SkillMatch JS é um mini-projeto desenvolvido em JavaScript que compara as habilidades de candidatos com os requisitos de vagas fictícias de desenvolvimento front-end.

O objetivo é identificar quais vagas combinam mais com cada perfil, quais habilidades ainda faltam e o que seria interessante estudar para melhorar a compatibilidade.

O projeto foi desenvolvido como atividade avaliativa do curso Desenvolvedor(a) Front-End React — SCTEC.

## Funcionalidades

O sistema permite:

- Carregar candidatos e vagas fictícias com uma simulação de busca de dados.
- Exibir informações de candidatos e vagas presenciais e remotas.
- Calcular e classificar a compatibilidade entre cada candidato e vaga.
- Identificar requisitos atendidos e habilidades faltantes.
- Encontrar a vaga mais compatível com cada candidato, incluindo empates.
- Gerar recomendações de estudo personalizadas.
- Contar quantas comparações foram realizadas.
- Exibir os resultados em relatórios no terminal.

## Tecnologias utilizadas

- **JavaScript:** linguagem utilizada no desenvolvimento.
- **Node.js:** ambiente utilizado para executar o programa.
- **Visual Studio Code:** editor de código.
- **Git e GitHub:** versionamento do projeto.
- **Trello:** organização das tarefas no Kanban.

O programa utiliza JavaScript puro, sem bibliotecas externas.

## Como executar

É necessário ter o Node.js instalado.

1. Baixe ou clone o repositório:

   ```bash
   git clone https://github.com/samanthaferri/SkillMatch.git
   ```

2. Acesse a pasta do projeto e depois a pasta `src`:

   ```bash
   cd SkillMatch
   cd src
   ```

3. Execute o arquivo principal:

   ```bash
   node skillmatch.js
   ```

Os resultados serão exibidos no terminal. Não é necessário configurar um banco de dados ou conectar o programa à internet.

## Como funciona a compatibilidade

O cálculo utiliza a quantidade de requisitos que o candidato atende em relação ao total exigido pela vaga.

**Fórmula:**

Compatibilidade (%) = (requisitos atendidos / total de requisitos) × 100

Por exemplo, se uma vaga exige 5 habilidades e o candidato possui 4 delas:

(4 / 5) × 100 = **80% de compatibilidade**

O resultado é arredondado para um número inteiro.

A comparação das habilidades ignora diferenças entre letras maiúsculas e minúsculas.

### Classificação

| Percentual | Classificação         |
| ---------- | --------------------- |
| 0% a 49%   | Baixa compatibilidade |
| 50% a 79%  | Média compatibilidade |
| 80% a 100% | Alta compatibilidade  |

Quando uma vaga não possui requisitos cadastrados, ela é considerada **não avaliável**, evitando uma divisão por zero. Essas vagas não participam da seleção das mais compatíveis.

## Como a melhor vaga é escolhida

Para cada candidato, o sistema procura o maior percentual de compatibilidade entre as vagas avaliáveis.

A busca utiliza um `while`, que pode terminar antecipadamente quando encontra uma compatibilidade de 100%.

Depois, um `filter()` identifica todas as vagas que possuem o maior percentual encontrado. Dessa forma, se houver empate, todas as melhores vagas serão apresentadas.

## Como funcionam as recomendações de estudo

As recomendações são geradas a partir das habilidades que faltam para o candidato atender aos requisitos das vagas.

Primeiro, o sistema reúne essas habilidades, evitando recomendações duplicadas. Cada habilidade também fica associada às vagas que a exigem.

A prioridade é definida por dois critérios:

1. **Maior compatibilidade:** habilidades exigidas por vagas mais compatíveis recebem prioridade.
2. **Quantidade de vagas:** quando duas habilidades possuem a mesma compatibilidade máxima, a prioridade é da habilidade exigida em mais vagas.

As recomendações são separadas em três faixas:

| Compatibilidade da vaga relacionada | Prioridade   |
| ----------------------------------- | ------------ |
| 80% ou mais                         | Alta         |
| 50% a 79%                           | Média        |
| Abaixo de 50%                       | Complementar |

Na apresentação, os grupos aparecem como **🎯 Foco principal**, **📖 Próximos passos** e **🌱 Para ir além**.

Os grupos vazios não são exibidos. Os títulos representam a ordem das recomendações disponíveis: o primeiro grupo com habilidades é apresentado como Foco principal, mesmo que pertença originalmente à faixa média ou complementar.

O sistema também informa quando o candidato já atende completamente aos requisitos de alguma vaga ou quando não há recomendações a apresentar.

## Conceitos de JavaScript aplicados

### Classes, objetos e herança

O projeto utiliza programação orientada a objetos para representar candidatos e vagas.

- `Candidato`: armazena os dados e habilidades de cada pessoa.
- `Vaga`: representa os dados comuns das vagas e realiza o cálculo de compatibilidade.
- `VagaRemota`: herda de `Vaga` e acrescenta informações sobre equipamentos e auxílio home office.
- `VagaPresencial`: herda de `Vaga` e acrescenta endereço e vale-transporte.

Os construtores inicializam os atributos, enquanto os métodos organizam os comportamentos. A palavra-chave `this` permite acessar as propriedades de cada objeto.

### Métodos de array

- `map()`: transforma os dados carregados em instâncias das classes.
- `find()`: procura habilidades do candidato e identifica recomendações já cadastradas.
- `filter()`: seleciona resultados por candidato, melhores vagas e grupos de prioridade.
- `forEach()`: percorre listas para analisar dados e exibir informações.
- `sort()`: organiza as recomendações por prioridade.

### Estruturas de repetição e decisão

O programa utiliza:

- `for`: percorre candidatos e vagas na função de análise.
- `while`: procura a maior compatibilidade, podendo encerrar ao encontrar 100%.
- `if`, `else if` e `else`: verificam condições e classificam resultados.
- Operador ternário: permite escolher mensagens e valores conforme uma condição.

Também são utilizados operadores matemáticos e lógicos, além de funções tradicionais e arrow functions.

### Callback

A função `analisarCompatibilidades()` recebe outra função como parâmetro.

Essa função, chamada callback, é executada a cada comparação para armazenar o resultado e registrar a operação realizada.

### Closure

A função `criarContadorComparacoes()` mantém uma variável interna chamada `total`.

Os métodos `registrar()` e `consultar()` continuam acessando esse valor entre chamadas, sem utilizar uma variável global.

O contador é utilizado para informar quantas comparações foram realizadas pelo sistema.

### Promise e async/await

As funções de busca simulam o carregamento dos candidatos e das vagas.

O programa utiliza `Promise` e `setTimeout()` para simular um atraso de um segundo em cada busca.

A função principal utiliza `async/await` para aguardar o carregamento dos dados antes de continuar a execução.

Os possíveis erros são tratados com `reject()` e `try/catch`.

### let, const e var

- `const`: declara variáveis que não serão reatribuídas.
- `let`: declara variáveis que podem receber novos valores.
- `var`: forma mais antiga de declarar variáveis. Dentro de uma função, seu escopo é a função inteira, mesmo quando a declaração está dentro de um bloco `{}`. Já `let` e `const` ficam limitados ao bloco em que foram declarados.

Neste projeto, foram priorizados `const` e `let`, para facilitar o controle de escopo e a leitura do código.

## Internet e arquitetura cliente-servidor

A internet conecta dispositivos por meio de redes, permitindo a troca de informações.

Em uma aplicação web, normalmente o cliente (como um navegador) envia uma requisição para um servidor. O servidor processa essa solicitação e devolve uma resposta. Protocolos como HTTP e HTTPS permitem essa comunicação.

O SkillMatch não realiza requisições reais a servidores. Ele **simula esse processo** utilizando dados locais, Promises e um atraso artificial com `setTimeout()`.

Essa abordagem permite praticar o funcionamento de operações assíncronas, semelhante ao que acontece quando uma aplicação aguarda dados de uma API.

## Ferramentas e organização

O projeto foi desenvolvido no VS Code. A extensão **Prettier** pode ser utilizada para padronizar a formatação do código.

O Trello foi utilizado para organizar o desenvolvimento em tarefas e acompanhar o andamento das funcionalidades.

O Git e o GitHub permitem registrar as alterações por meio de commits e trabalhar com branches antes de integrar as funcionalidades à versão principal.

**Repositório:** https://github.com/samanthaferri/SkillMatch

**Kanban:** https://trello.com/invite/b/6ad2a4a443275d4a15f51c74/ATTI85c3af62bea9e6849b80184ae80c0f971ED31E32/👩🏻💻-mini-projeto-samantha

## Vídeo de apresentação

**Link:** https://youtu.be/eMBz7PfqY8c

O vídeo apresenta o objetivo do SkillMatch, o funcionamento do programa, a organização do desenvolvimento e as principais decisões de implementação.
