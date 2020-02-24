import React, { Component } from 'react';

class BotaoCarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSalvo: [],
    };
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.salvaItem}
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}

export default BotaoCarrinho;
