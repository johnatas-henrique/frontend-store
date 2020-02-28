import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImgCarrinho from '../images/carrinho.png';
import SetaVoltarCarrinho from '../images/seta-voltar.png';

class HeaderCarrinho extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img className="setaVoltarCarrinho" src={SetaVoltarCarrinho} alt="" />
        </Link>
        <div className="flexCarrinhoTitulo">
          <img className="imgCarrinhoTitulo" src={ImgCarrinho} alt="" />
          <h1 className="tituloCarrinho">Carrinho de Compras</h1>
        </div>
      </div>
    );
  }
}

export default HeaderCarrinho;
