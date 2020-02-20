import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemCarrinho from '../components/ItemCarrinho';

class Carrinho extends Component {
  render() {
    return (
      <div className="Carrinho">
        <h1>Carrinho de Compras</h1>
        <ItemCarrinho itemsId='1' />
        <br />
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default Carrinho;
