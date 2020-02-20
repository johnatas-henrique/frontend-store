import React from 'react';

class DescricaoeQuant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quant: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState((state) => ({
      quant: state.quant + 1,
    }));
  }

  decrement() {
    const { quant } = this.state;
    if (quant === 0) {
      this.setState({
        quant: 0
      });
    } else {
      this.setState((state) => ({
        quant: state.quant - 1,
      }));
    }
  }

  containerQuant() {
    return (
      <div className="Quant">
        <h2>Quantidade:</h2>
        <button className="dec" onClick={this.decrement}>-</button>
        <h2>{this.state.quant}</h2>
        <button className="inc" onClick={this.increment}>+</button>
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
    );
  }
}

export default DescricaoeQuant;
