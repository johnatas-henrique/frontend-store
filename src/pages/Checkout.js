import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ['Nome Completo']: '',
      CPF: '',
      Email: '',
      Telefone: '',
      CEP: '',
      Endereço: '',
      Complemento: '',
      Número: '',
      Cidade: '',
      Estado: '',
      Pagamento: '',
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
      array.map((item) => (
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
    const customerInfo = ['Nome Completo', 'CPF', 'Email', 'Telefone', 'CEP', 'Endereço', 'Complemento', 'Número', 'Cidade'];
    const estados = ['Estado', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RO', 'RS', 'RR', 'SC', 'SE', 'SP', 'TO'];
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
          <h2>Informações do comprador</h2>
          {this.generateform(customerInfo)}
          <select name="Estado" onChange={this.handleChange}>
            {estados.map((name) => (
              <option name="Estado" value={name}>{name}</option>
            ))}
          </select>
        </form>
        <Link to="/">Continuar comprando</Link>
        <button type="button" onClick={this.confirmBuy}>
          Finalizar Compra
        </button>
      </div>
    );
  }
}

export default Checkout;
