import React, { Component } from 'react';
import PropTypes from 'prop-types';
import salvaLocal from './salvaLocal';
import CarrinhoVazio from './CarrinhoVazio';

class ItemCarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quant: 1,
      disabled: true,
      newPrice: this.props.price,
      shown: false,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.salvaNovaQuant = this.salvaNovaQuant.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.atualizaPreco = this.atualizaPreco.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({
      quant: this.props.quant,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { quant } = this.state;
    if (quant !== prevState.quant) {
      this.atualizaPreco(quant);
    }
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
    let guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const itemExistente = (guardar.find((item) => item.id === id));
    if (itemExistente) {
      salvaLocal(itemExistente, guardar, quant, id);
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
      <div>
        <button
          type="button"
          className="dec"
          onClick={this.decrement}
          disabled={disabled}
        >
          -
        </button>
        <h2>
          Quantidade:&nbsp;
          {quant}
        </h2>
        <button type="button" className="inc" onClick={this.increment}>+</button>
      </div>
    );
  }

  render() {
    const { title, image, price, carrinhoVazio } = this.props;
    const { newPrice, shown } = this.state;
    if (carrinhoVazio) return <CarrinhoVazio />;
    return (
      <div>
        <div className="itemBusca" hidden={shown}>
          <button onClick={this.removeProduct} type="button">X</button>
          {title}
          <div>
            <img className="itemImage" src={image} alt={title} />
          </div>
          <hr />
          {this.buttons()}
          <p>
            R$&nbsp;
            {price} - {newPrice}
          </p>
        </div>
      </div>
    );
  }
}

ItemCarrinho.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quant: PropTypes.number.isRequired,
  carrinhoVazio: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  newPrice: PropTypes.number.isRequired,
};


export default ItemCarrinho;
