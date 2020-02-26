import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarrinhoVazio from './CarrinhoVazio';

class ItemCarrinho extends Component {
  render() {
    const { itensCarrinho, carrinhoVazio } = this.props;
    if (itensCarrinho.quant === 'undefined') {
      return itensCarrinho.quant === 1;
    }
    console.log(itensCarrinho.quant);
    if (carrinhoVazio) return <CarrinhoVazio />;
    return (
      <div>
        {itensCarrinho.map((list) => (
          <div className="itemBusca" key={list.id}>
            {list.title}
            <div>
              <img className="itemImage" src={list.thumbnail} alt={list.title} />
            </div>
            <hr />
            <p>
              Quantidade:&nbsp;
              {list.quant}
            </p>
            <p>
              R$&nbsp;
              {list.price}
            </p>
          </div>
        ))}
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
