import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemCarrinho from '../components/ItemCarrinho';
import ImgCarrinho from '../images/carrinho.png';
import SetaVoltarCarrinho from '../images/seta-voltar.png';
import './Carrinho.css';

class Carrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrinhoVazio: true,
      itensCarrinho: [],
    };
  }

  componentDidMount() {
    this.funcaoProCCMount();
  }

  funcaoProCCMount() {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    if (guardar.length > 0) {
      this.setState({
        itensCarrinho: guardar,
        carrinhoVazio: false,
      });
    }
  }

  render() {
    const { itensCarrinho, carrinhoVazio } = this.state;
    return (
      <div className="Carrinho">
        <Link to="/">
          <img className="setaVoltarCarrinho" src={SetaVoltarCarrinho} alt="" />
        </Link>
        <div className="flexCarrinhoTitulo">
          <img className="imgCarrinhoTitulo" src={ImgCarrinho} alt="" />
          <h1 className="tituloCarrinho">
            Carrinho de Compras
          </h1>
        </div>
        <ItemCarrinho
          itensCarrinho={itensCarrinho}
          carrinhoVazio={carrinhoVazio}
        />
        <div className="links">
          <Link to="/">Voltar</Link>
          <Link to="/carrinho/checkout">Checkout</Link>
        </div>
      </div>
    );
  }
}

export default Carrinho;
