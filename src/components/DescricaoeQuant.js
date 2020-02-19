import React from 'react';

class DescricaoeQuant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quant: 0
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState((state) => ({
      quant: state.quant + 1,
    }));
  }

  decrement() {
    this.setState((state) => ({
      quant: state.quant - 1,
    }));
  }

  containerQuant() {
    const { quant } = this.state;
    return (
      <div className="container-big">
        <div className="Quant">
          <h2>Quantidade:</h2>
          <button className="dec" onClick={quant === 0 ? { quant: 0 } : this.decrement}>-</button>
          <h2>{this.state.quant}</h2>
          <button className="inc" onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-big">
        <div className="box-Esquerda">
          {/* <h1>{Nome do Produto}: {preço do produto}</h1> */}
          {/* <img src={imagem do produto} alt={NomedoProduto} /> */}
        </div>
        <div className="box-Direita">
          <ul>Características do Produto:</ul>
        </div>
        {this.containerQuant()}
      </div>
    )
  }
}

export default DescricaoeQuant
