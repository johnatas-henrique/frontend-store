import React, { Component } from 'react';
import CaixaJpg from '../images/caixa-vazia.jpg';

class CarrinhoVazio extends Component {
  render() {
    return (
      <div>
        <img
          className="caixaVazia"
          src={CaixaJpg}
          alt="Caixa Vazia"
        />
        <h2>Seu carrinho está vazio</h2>
      </div>
    );
  }
}

export default CarrinhoVazio;
