import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {

  render() {
    const products = JSON.parse(localStorage.getItem('Produtos'));
    console.log(products);
    return (
      <div>
        <h1>Confira os produtos!</h1>
        {products.map((item) => (
          <div className="product-checkout">
            <p>{item.title}</p>
            <p>{item.quant}</p>
            <p>{item.quant * item.price}</p>
            <img src={item.thumbnail} alt={item.title}/>
          </div>
        ))}
        <Link to="/">Continuar comprando</Link>
      </div>
    );
  }
}

export default Checkout;
