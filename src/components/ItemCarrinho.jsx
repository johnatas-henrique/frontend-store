import React, { Component } from 'react';
import CarrinhoVazio from './CarrinhoVazio';

class ItemCarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.itemsId,
      teste: ['laranjas', 'bananas', 'abacates'],
    };
  }

  render () {
    const { items, teste } = this.state;
    if (items === '1') return <CarrinhoVazio />;
    return (
      { teste.map(((item, index) => <p key={item}>{index} - {item} do teste</p>)) }
    )
  }
}

export default ItemCarrinho;
