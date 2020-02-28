import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      CPF: '',
      email: '',
      telephone: '',
      CEP: '',
      address: '',
      info: '',
      number: '',
      city: '',
      state: '',
      payment: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState(() => {
      this.setState({ [name]: value });
    });
  }

  generateform(array) {
    return (
      array.map((item, index) => (
        <input
          type="text"
          className="form-checkout"
          name={item}
          placeholder={item}
          value={item.value}
          onChange={this.handleChange}
        />
      )));
  }

  render() {
    const customerInfo = ['fullName', 'CPF', 'email', 'telephone', 'CEP', 'address', 'info', 'number', 'city', 'state'];
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
            <img src={item.thumbnail} alt={item.title} />
          </div>
        ))}
        <form className="pay-form">
          {this.generateform(customerInfo)}
        </form>
        <Link to="/">Continuar comprando</Link>
      </div>
    );
  }
}

export default Checkout;
