import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaVazia: false,
    };
    this.setaListaVazia = this.setaListaVazia.bind(this);
  }

  componentDidMount() {
    const prodSalvos = JSON.parse(localStorage.getItem('Produtos'));
    if (prodSalvos.length === 0) {
      this.setaListaVazia(true);
    }
  }

  setaListaVazia(parametro) {
    this.setState({
      listaVazia: parametro,
    });
  }

  render() {
    const { listaVazia } = this.state;
    if (listaVazia) {
      return (
        <div className="Carrinho">
          <h1>Pagina Checkout</h1>
          <h2>O Carrinho está vazio</h2>
          <Link to="/">Continuar comprando</Link>
        </div>
      );
    }
    return (
      <div>
        <h1>Confira os produtos!</h1>
        <Link to="/">Continuar comprando</Link>
      </div>
    );
  }
}

export default Checkout;
