import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListaProdutos extends Component {
  render() {
    return (
      <div className="Carrinho">
        <h1>Lista Produtos</h1>
        <Link to="/carrinho">Carrinho</Link>
      </div>
    );
  }
}

export default ListaProdutos;
