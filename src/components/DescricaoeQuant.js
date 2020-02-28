import React from 'react';
import PropTypes from 'prop-types';
import salvaLocal from './salvaLocal';
import './DescricaoeQuant.css';

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
    const {
      id, price, thumbnail, title,
    } = this.props.produtoAtual;
    const { quant } = this.state;
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const itemExistente = (guardar.find((item) => item.id === id));
    if (itemExistente) {
      salvaLocal(itemExistente, guardar, quant, id);
    } else {
      guardar.push({
        id,
        title,
        price: parseFloat(price),
        thumbnail,
        quant: this.state.quant,
      });
    }
    localStorage.setItem('Produtos', JSON.stringify(guardar));
  }

  containerQuant() {
    const { disabled, quant } = this.state;
    return (
      <div className="containerQuant">
        <h2 className="tituloQuant">Quantidade</h2>
        <div className="flexQuant">
          <button type="button" className="btnQuant" onClick={this.decrement} disabled={disabled}>
            -
          </button>
          <h2 className="textQuant">{quant}</h2>
          <button type="button" className="btnQuant" onClick={this.increment}>
            +
          </button>
          <button type="button" className="quantProdutoAdd" onClick={() => {
            this.salvaItem();
            this.props.callbackItem();
          }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }

  render() {
    const {
      price, thumbnail, title, attributes,
    } = this.props.produtoAtual;
    return (
      <div className="containerDescricao">
        <h1 className="tituloDesc">
          {title}
          {' - '}
          {new Intl.NumberFormat('pt-BR',
            { style: 'currency', currency: 'BRL' }).format(price)}
        </h1>
        <div className="flexDescricao">
          <div className="boxEsquerda">
            <img className="imgDesc" src={thumbnail} alt={title} />
          </div>
          <div className="boxDireita">
            <h2 className="tituloBoxDireita">Especificações técnicas</h2>
            <ul>{attributes.map((item) => <li className="liDesc" key={item}>{item}</li>)}</ul>
          </div>
        </div>
        {this.containerQuant()}
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
