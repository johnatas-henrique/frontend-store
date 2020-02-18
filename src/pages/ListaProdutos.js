import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Busca from '../components/Busca';
import Categorias from '../components/Categorias';

class ListaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = { listagem: [] };
    this.testeRequisicao = this.testeRequisicao.bind(this)
  }

  testeRequisicao(event) {
    if (event.key === 'Enter'){
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${event.target.value}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => this.setState((state) => ({listagem: data.results})))
  }}

  render() {
    const { listagem } = this.state;
    console.log(listagem);
    return (
      <div className="Carrinho">
        <h1>Lista Produtos</h1>
        <input type="text" onKeyPress={this.testeRequisicao} />
        <Categorias />
        <Busca>
          {listagem.map((item) => 
          <div key={item.id}>
            Produto: {item.title}
            <img src={item.thumbnail} alt={item.title}/>
            R${item.price}
          </div>)}
        </Busca>
        <Link to="/carrinho">Carrinho</Link>
      </div>

      // criar campo input via COMPONENTE. Nele, Após o usuário dar ENTER ou no clique de um botão, será renderizada uma DIV dentro de carrinho que conterá as informações dos comentários dos ususários.
    );
  }
}

export default ListaProdutos;
