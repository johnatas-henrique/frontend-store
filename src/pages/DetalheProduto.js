import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetalheProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quant: 0,
      comment: '',
    }

    this.ContainerBig = this.ContainerBig.bind(this);

    this.ContainerQuant = this.ContainerQuant.bind(this);

    this.increment = this.increment.bind(this);

    this.decrement = this.decrement.bind(this);

  }

  ContainerBig() {
    return (
      <div className="container-big">
        <div className="containerEsquerda">
          {/* <h1>{Nome do Produto}: {preço do produto}</h1> */}
          {/* <img src={imagem do produto} alt={NomedoProduto} /> */}
        </div>
        <div className="containerDireita">
          <ul>Características do Produto:
            <li>Característica01</li>
            <li>Característica02</li>
            <li>Característica03</li>
          </ul>
        </div>
      </div>
    );
  }

  increment() {
    this.setState(state => ({
      quant: state.quant + 1,
    }))
  }

  decrement() {
    this.setState(state => ({
      quant: state.quant - 1,
    }))
  }

  ContainerQuant() {
    const { quant } = this.state;
    return (
      <div className="container-big">
        <div className="Quant">
          <h2>Quantidade:</h2>
          <button className="dec" onClick={quant === 0 ? {quant: 0} : this.decrement}>-</button>
          <h2>{this.state.quant}</h2>
          <button className="inc" onClick={this.increment}>+</button>
        </div>
       <button>Adicionar ao Carrinho</button>
      </div>
    );
  }

  render() {
    return (
      <div className="DetalheProduto">
        {this.ContainerBig()}
        {this.ContainerQuant()}
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default DetalheProduto;
