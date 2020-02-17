import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListaProdutos extends Component {
  render() {
    return (
      <div className="Carrinho">
        <h1>Lista Produtos</h1>
        <Link to="/carrinho">Carrinho</Link>
      </div>

      // criar campo input via COMPONENTE. Nele, Após o usuário dar ENTER ou no clique de um botão, será renderizada uma DIV dentro de carrinho que conterá as informações dos comentários dos ususários.
    );
  }
}

export default ListaProdutos;
