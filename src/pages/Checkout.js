import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrinhoVazio: true,
      itensCarrinho: [],
    };
  }

  render() {
    return (
      <div className="Carrinho">
        <h1>Pagina Checkout</h1>
        <Link to="/">Continuar comprando</Link>
      </div>
    );
  }
}

export default Checkout;
