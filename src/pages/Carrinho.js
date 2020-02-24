import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemCarrinho from '../components/ItemCarrinho';

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
        <h1>Carrinho de Compras</h1>
        <ItemCarrinho 
          itensCarrinho={itensCarrinho}
          carrinhoVazio={carrinhoVazio}
        />
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default Carrinho;
