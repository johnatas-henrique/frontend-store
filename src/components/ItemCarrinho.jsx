import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import salvaLocal from './salvaLocal';
import './ItemCarrinho.css';

class ItemCarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quant: 1,
      newPrice: this.props.price,
      shown: false,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.salvaNovaQuant = this.salvaNovaQuant.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.atualizaPreco = this.atualizaPreco.bind(this);
    this.initDisable = this.initDisable.bind(this);
  }

  componentDidMount() {
    const { quant } = this.props;
    this.changeQuant(quant);
    this.initDisable(quant);
  }

  componentDidUpdate(prevProps, prevState) {
    const { quant } = this.state;
    if (quant !== prevState.quant) {
      this.atualizaPreco(quant);
    }
  }

  initDisable(parametro) {
    if (parametro === 1) {
      this.setState(() => ({
        disabled: true,
      }));
    }
  }

  changeQuant(parametro) {
    this.setState(() => ({
      quant: parametro,
    }));
  }

  atualizaPreco(parametro) {
    this.setState(({
      newPrice: parametro * this.props.price,
    }));
    this.salvaNovaQuant();
  }

  salvaNovaQuant() {
    const { id } = this.props;
    const { quant } = this.state;
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const itemExistente = (guardar.find((item) => item.id === id));
    if (itemExistente) {
      salvaLocal(itemExistente, guardar, quant, id, false);
      this.props.callbackSomaTotal(quant, id);
    }
  }

  removeProduct() {
    const { id } = this.props;
    const { quant } = this.state;
    let guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const itemExistente = (guardar.find((item) => item.id === id));
    if (itemExistente) {
      itemExistente.quant = quant;
      guardar = guardar.filter((item) => item.id !== id);
      localStorage.setItem('Produtos', JSON.stringify(guardar));
      this.setState(() => ({
        quant: 0,
        shown: true,
      }));
      this.props.callbackCarrinhoVazio();
    }
  }

  increment() {
    this.setState((state) => ({
      quant: state.quant + 1,
      disabled: false,
    }));
  }

  decrement() {
    const { quant } = this.state;
    if (quant <= 2) {
      this.setState((state) => ({
        quant: 1,
        disabled: !state.disabled,
      }));
    } else {
      this.setState((state) => ({
        quant: state.quant - 1,
      }));
    }
  }

  buttons() {
    const { quant, disabled } = this.state;
    return (
      <Fragment>
        <button
          type="button"
          className="botaoCarrinhoQtde"
          onClick={this.decrement}
          disabled={disabled}
        >
          -
        </button>
        <p className="itemCarrinhoQtde">{quant}</p>
        <button type="button" className="botaoCarrinhoQtde" onClick={this.increment}>+</button>
      </Fragment>
    );
  }

  render() {
    const { title, image } = this.props;
    const { newPrice, shown } = this.state;
    return (
      <div hidden={shown}>
        <div className="itemCarrinho">
          <button className="botaoCarrinhoX" onClick={this.removeProduct} type="button">x</button>
          <div className="containerImageCarrinho">
            <img className="imagemCarrinho" src={image} alt={title} />
          </div>
          <p className="descricaoItemCarrinho">{title}</p>
          {this.buttons()}
          <p>
            {new Intl.NumberFormat('pt-BR',
              { style: 'currency', currency: 'BRL' }).format(newPrice)}
          </p>
        </div>
      </div>
    );
  }
}

ItemCarrinho.propTypes = {
  callbackCarrinhoVazio: PropTypes.func.isRequired,
  callbackSomaTotal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quant: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};


export default ItemCarrinho;
