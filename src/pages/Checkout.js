import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeComp: '',
      cpf: '',
      email: '',
      fone: '',
      cep: '',
      endereco: '',
      compl: '',
      num: '',
      cidade: '',
      estado: '',
      pagamento: '',
    };
    this.updateStateInput = this.updateStateInput.bind(this);
  }

  updateStateInput(e) {
    const { valor, nome } = e.target;
    this.setState(() => {
      this.setState({ [nome]: valor });
    });
  }

  generateform() {
    const custInfo = [
      { state: 'nomeComp', holder: 'Nome Completo' },
      { state: 'cpf', holder: 'CPF' },
      { state: 'email', holder: 'E-Mail' },
      { state: 'fone', holder: 'Telefone' },
      { state: 'endereco', holder: 'Endereço completo' },
      { state: 'compl', holder: 'Complemento' },
      { state: 'num', holder: 'Número' },
      { state: 'cidade', holder: 'Cidade' },
    ];

    return (
      custInfo.map((item) => (
        <input
          key={item.state}
          type="text"
          className={`checkout  -${item.state}`}
          name={item.state}
          placeholder={item.holder}
          value={item.state.value}
          onChange={this.updateStateInput}
        />
      )));
  }

  render() {
    const estados = ['Estado', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RO', 'RS', 'RR', 'SC', 'SE', 'SP', 'TO'];
    const products = JSON.parse(localStorage.getItem('Produtos'));
    return (
      <div>
        <h1>Confira os produtos!</h1>
        {products.map((item) => (
          <div key={item.id} className="product-checkout">
            <p>{item.title}</p>
            <p>{item.quant}</p>
            <p>{item.quant * item.price}</p>
            <img src={item.thumbnail} alt={item.title} />
          </div>
        ))}
        <form className="pay-form">
          <h2>Informações do comprador</h2>
          {this.generateform()}
          <select name="Estado" onChange={this.updateStateInput}>
            {estados.map((name) => (
              <option key={name} name="Estado" value={name}>{name}</option>
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
