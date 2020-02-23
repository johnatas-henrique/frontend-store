import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imgCarrinho from '../images/carrinho-aberto-120px.png';

class BotaoQtdECarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtdeNoCarrinho: 0,
    };
  }

  componentDidMount () {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    this.setState({
      qtdeNoCarrinho: guardar.length,
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.itensNoCarrinho !== prevProps.itensNoCarrinho) {
      this.setState({
        qtdeNoCarrinho: this.props.itensNoCarrinho,
      });
    }
  }

  render () {
    const { qtdeNoCarrinho } = this.state;
    return (
      <Link to="/carrinho" className="carrinhoBusca">
          <img className="imgCarrinho" src={imgCarrinho} alt="Carrinho de Compras" />
          <span className="valorCarrinho">
            {qtdeNoCarrinho}
          </span>
      </Link>
    );
  }
}

export default BotaoQtdECarrinho;
