# Boas vindas ao repositório do projeto de Front-End Online Store!

## Meus comentários

Este aqui foi o meu primeiro projeto em grupo, melhorei meus conhecimentos sobre `componentDidMount` e `componentDidUpdate` e entendi o conceito de `callbacks` em React. Também percebi aqui que poderia trabalhar com `APIs` e permitir ao usuário fazer suas próprias pesquisas. 

---

## Instalação do projeto localmente

Após cada um dos passos, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido, caso tenha dificuldades e o exemplo não seja suficiente, não hesite em me contatar em _johnatas.henrique@gmail.com_.

1. Abra o terminal e crie um diretório no local de sua preferência com o comando **mkdir**:
```javascript
  mkdir projetos-johnatas
```

2. Entre no diretório que acabou de criar e depois clone o projeto:
```javascript
  cd projetos-johnatas
  git clone git@github.com:johnatas-henrique/frontend-store.git
```

3. Acesse o diretório do projeto e depois utilize o comando **npm i** para instalar todas as dependências necessárias:
```javascript
  cd frontend-store
  npm i
```

4. Por último, rode o comando **npm start** e acesse o projeto via browser, no caminho `http://localhost:3000/frontend-store`.

---

## Requisitos do projeto

### 1. Criar página de listagem de produtos vazia

  A tela básica da plataforma é a tela de **listagem de produtos**, onde quem usa buscará o que quer para adicionar ao carrinho e filtrará suas buscas.

### 2. Criar página do carrinho de compras

  Quem usa o site irá adicionar produtos em seu carrinho de compras e finalizar a compra. A listagem de produtos deve ter um ícone de carrinho que, ao ser clicado, leva à página do carrinho. Inicialmente, o carrinho deverá estar vazio.

### 3. Listar as categorias de produtos disponíveis via API na página principal

  Um endpoint da API do Mercado Livre retorna as categorias de produto disponíveis para busca. Em momento posterior tais categorias serão usadas para filtrar a listagem de produtos. Por hora, elas devem ser listadas na tela da listagem, conforme protótipo.

### 4. Buscar por termos e receber uma listagem de produtos, com dados resumidos, associados a esses termos

  A alma do site é a sua lógica de busca e listagem de produtos. Após digitar seus termos na caixa de busca uma requisição deverá ser feita à API do Mercado Livre, tendo como parâmetros a frase digitada, e tais produtos deverão aparecer na tela numa exibição resumida, conforme protótipo anexo.

### 5. Selecionar uma categoria e ver somente produtos daquela categoria

  A página, agora, deve poder usar as categorias recuperadas da API para filtrar os produtos buscados. Os termos e as categorias inseridas por quem usa devem ser usados em conjunto para filtragens mais específicas.

### 6. Clicar na exibição resumida de um produto e ir para uma tela com sua exibição detalhada

  A exibição detalhada de um produto será a página para exibir tudo o que se tem acerca de um produto específico.

### 7. Adicionar uma quantidade arbitrária de um produto ao carrinho a partir de sua tela de exibição detalhada

  Poder adicionar produtos ao carrinho a partir de sua tela de exibição detalhada será um canal importante de conversões de venda.

### 8. Avaliar e comentar acerca de um produto em sua tela de exibição detalhada

  Avaliações positivas de um produto contribuem para boas vendas e nos dão insumos para, no tempo, destacarmos os produtos melhores e fazermos anúncios direcionados. Produtos ruins, de forma análoga, podem eventualmente ser penalizados por avaliações ruins.

### 9. Visualizar a lista de produtos adicionados ao carrinho em sua página e manipular sua quantidade

  São operações básicas de carrinho a alteração da quantidade de um determinado produto nele e a visualização de tudo o que foi adicionado, com a soma dos valores.

### 10. Adicionar produtos a partir da tela de listagem de produtos

  Múltiplas formas fáceis de adicionar um produto ao carrinho impactam positivamente nas taxas de conversão.

### 11. Finalizar compra, vendo um resumo dela, preenchendo os meus dados e escolhendo a forma de pagamento

  O último grande passo do fluxo do e-commerce é a finalização da compra por parte de quem usa.

### 12. Ver junto ao ícone do carrinho a quantidade de produtos dentro dele, em todas as telas em que ele aparece

  A partir de uma pesquisa com usuários e concorrentes, identificamos que existe a necessidade de uma visualização da quantidade de produtos do carrinho de uma forma dinâmica e acessível.

### 13. Navegar por um e-commerce estilizado em CSS

  Uma navegação em _wireframes_ não é uma experiência de uso agradável. Uma vez que nenhum design do produto foi especificado, no entanto, cabe a quem programa estilizar o site.
