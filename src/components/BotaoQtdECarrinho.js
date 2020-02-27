import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import imgCarrinho from '../images/carrinho-aberto-120px.png';

class BotaoQtdECarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtdeNoCarrinho: 0,
    };
  }

  componentDidMount() {
    console.log('montou');
    this.funcaoProCCMount();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itensNoCarrinho !== prevProps.itensNoCarrinho) {
      this.funcaoproCCUpdate();
    }
  }

  funcaoProCCMount() {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    console.log(guardar);
    this.setState({
      qtdeNoCarrinho: guardar.reduce((acc, item) => item.quant + acc, 0),
    });
  }

  funcaoproCCUpdate() {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    console.log(guardar);
    const sumQuant = guardar.reduce((acc, item) => item.quant + acc, 0);
    this.setState({
      qtdeNoCarrinho: sumQuant,
    });
  }

  render() {
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

BotaoQtdECarrinho.propTypes = {
  itensNoCarrinho: PropTypes.number.isRequired,
};

export default BotaoQtdECarrinho;
