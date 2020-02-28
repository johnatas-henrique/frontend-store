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
    this.funcaoProCCMount();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itensNoCarrinho !== prevProps.itensNoCarrinho) {
      this.funcaoproCCUpdate();
    }
  }

  funcaoProCCMount() {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    if (guardar.length > 0) {
      this.setState({
        qtdeNoCarrinho: guardar
          .reduce((acum, curr) => parseInt(acum, 10) + parseInt(curr.quant, 10), 0),
      });
    }
  }

  funcaoproCCUpdate() {
    this.setState({
      qtdeNoCarrinho: this.props.itensNoCarrinho,
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
