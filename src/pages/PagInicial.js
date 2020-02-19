import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from '../components/Categorias';

class PagInicial extends Component {
  render () {
    return (
      <div className="Carrinho">
        <h1>Lista Produtos</h1>
        <Categorias />
        <Link to="/carrinho">Carrinho</Link>
      </div>
    );
  }
}

export default PagInicial;
