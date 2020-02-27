import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  }

  componentDidMount() {
    const { quant } = this.state;
    this.setState(() => ({
      quant: this.props.quant,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { quant } = this.state;
    if (quant !== prevState.quant) {
      this.setState((state) => ({
        newPrice: state.quant * this.props.price,
      }));
      this.salvaNovaQuant();
    }
  }

  salvaNovaQuant() {
    const { id } = this.props;
    const { quant } = this.state;
    let guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const itemExistente = (guardar.find((item) => item.id === id));
    if (itemExistente) {
      itemExistente.quant = quant;
      guardar = guardar.filter((item) => item.id !== id);
      guardar.push(itemExistente);
      localStorage.setItem('Produtos', JSON.stringify(guardar));
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

  render() {
    const { title, image, price, carrinhoVazio } = this.props;
    const { quant, disabled, newPrice, shown } = this.state;
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
          <button type="button" className="dec" onClick={this.decrement} disabled={disabled}>-</button>
          <h2>
            Quantidade:&nbsp;
            {quant}
          </h2>
          <button type="button" className="inc" onClick={this.increment}>+</button>
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
  carrinhoVazio: PropTypes.bool.isRequired,
  itensCarrinho: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    attributes: PropTypes.array,
  })).isRequired,
};


export default ItemCarrinho;
