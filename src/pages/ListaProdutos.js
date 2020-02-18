import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Busca from '../components/Busca';
import Categorias from '../components/Categorias';

class ListaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = { listagem: 'Você ainda não realizou uma busca' };
  }

  testeRequisicao() {
    fetch('https://api.mercadolibre.com/sites/MLB/categories', { method: 'GET' })
     // .then((response) => response.json())
      .then((data) => console.log(data))
  }

  render() {
    return (
      <div className="Carrinho">
        <h1>Lista Produtos</h1>
        <input type="text" onChange={this.testeRequisicao} />
        <Busca>
          {this.state.listagem}
        </Busca>
        <Categorias />
        <Link to="/carrinho">Carrinho</Link>
      </div>

      // criar campo input via COMPONENTE. Nele, Após o usuário dar ENTER ou no clique de um botão, será renderizada uma DIV dentro de carrinho que conterá as informações dos comentários dos ususários.
    );
  }
}

export default ListaProdutos;
