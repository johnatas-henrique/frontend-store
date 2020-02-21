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
        quant: 0,
      });
    } else {
      this.setState((state) => ({
        quant: state.quant - 1,
      }));
    }
  }

  salvaItem() {
    const { id, price, thumbnail, title } = this.props.produtoAtual;
    let guardar = JSON.parse(localStorage.getItem("Produtos") || "[]");
    guardar.push({
      id: id,
      title: title,
      price: parseFloat(price),
      thumbnail: thumbnail,
      quantity: this.state.quant,
    });
    localStorage.setItem("Produtos", JSON.stringify(guardar));
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
    const { id, price, thumbnail, title } = this.props.produtoAtual;
    return (
      <div className="container-big">
        <div className="box-Esquerda">
          <h1>{title}</h1>
          <h2>R${price}</h2>
          <img src={thumbnail} alt={title} />
        </div>
        <div className="box-Direita">
          <ul>Características do Produto:</ul>
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

export default DescricaoeQuant;
