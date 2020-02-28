import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CaixaJpg from '../images/caixa-vazia.png';
import ImgCarrinho from '../images/carrinho.png';
import SetaVoltarCarrinho from '../images/seta-voltar.png';
import './CarrinhoVazio.css';

class CarrinhoVazio extends Component {
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
        <div className="centralizaFigura">
          <img
            className="caixaVazia"
            src={CaixaJpg}
            alt="Caixa Vazia"
          />
          <h2>Seu carrinho está vazio</h2>
        </div>
      </div>
    );
  }
}

export default CarrinhoVazio;
