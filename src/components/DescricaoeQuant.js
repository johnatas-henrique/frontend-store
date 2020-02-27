import React from 'react';
import salvaLocal from './salvaLocal';
import PropTypes from 'prop-types';

class DescricaoeQuant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quant: 1,
      disabled: true,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
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

  salvaItem() {
    const { id, price, thumbnail, title } = this.props.produtoAtual;
    const { quant } = this.state;
    let guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const itemExistente = (guardar.find((item) => item.id === id));
    if (itemExistente) {
      salvaLocal(itemExistente, guardar, quant, id);
    } else {
      guardar.push({
        id,
        title,
        price: parseFloat(price),
        thumbnail,
        quantity: this.state.quant,
      });
    }
    localStorage.setItem('Produtos', JSON.stringify(guardar));
  }

  containerQuant() {
    const { disabled, quant } = this.state;
    return (
      <div className="Quant">
        <h2>Quantidade:</h2>
        <button
          type="button"
          className="dec"
          onClick={this.decrement}
          disabled={disabled}
        >
          -
        </button>
        <h2>{quant}</h2>
        <button type="button" className="inc" onClick={this.increment}>+</button>
      </div>
    );
  }

  render() {
    const {
      price, thumbnail, title, attributes,
    } = this.props.produtoAtual;
    return (
      <div className="container-big">
        <div className="box-Esquerda">
          <h1>{title}</h1>
          <h2>
            R$
            {price}
          </h2>
          <img src={thumbnail} alt={title} />
        </div>
        <div className="box-Direita">
          <ul>
            <h2>Características do Produto:</h2>
            {attributes.map((attribute) => <li key={attribute}>{attribute}</li>)}
          </ul>
        </div>
        {this.containerQuant()}
        <button
          type="button"
          onClick={() => this.salvaItem()}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

DescricaoeQuant.propTypes = {
  produtoAtual: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    attributes: PropTypes.array,
  }).isRequired,
};

export default DescricaoeQuant;
