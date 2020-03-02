import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SetaVoltarCarrinho from '../images/seta-voltar.png';
import ImgBoleto from '../images/boleto.png';
import ImgCartao from '../images/cartao.png';
import './Checkout.css';

class Checkout extends Component {
  static setorProdutos() {
    const products = JSON.parse(localStorage.getItem('Produtos'));
    const somaTotal = JSON.parse(localStorage.getItem('SomaTotal'));
    return (
      <div className="containerSetor">
        <p className="tituloBase">Revise seus Produtos</p>
        {products.map((item) => (
          <div key={item.id} className="flexCheckout">
            <div className="containerImageCheckout">
              <img className="imageCheckout" src={item.thumbnail} alt={item.title} />
            </div>
            <p className="produtosCheckout">{item.title}</p>
            <p>
              {new Intl.NumberFormat('pt-BR',
                { style: 'currency', currency: 'BRL' }).format(item.quant * item.price)}
            </p>
          </div>
        ))}
        <span className="tituloBase">Total: </span>
        {new Intl.NumberFormat('pt-BR',
          { style: 'currency', currency: 'BRL' }).format(somaTotal)}
      </div>
    );
  }

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
    this.setorPagamento = this.setorPagamento.bind(this);
    this.radioCheckout = this.radioCheckout.bind(this);
    this.confirmBuy = this.confirmBuy.bind(this);
  }

  setorCaixas() {
    const estados = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RO', 'RS', 'RR', 'SC', 'SE', 'SP', 'TO'];
    return (
      <form className="containerSetor">
        <h2 className="tituloBase">Informações do Comprador</h2>
        <div className="flexFormCheckout">
          {this.generateform()}
          <select
            defaultValue=""
            className="estadoCheckout"
            name="Estado"
            onChange={this.updateStateInput}
          >
            <option value="" disabled>Estado</option>
            {estados.map((name) => (
              <option key={name} name="Estado" value={name}>{name}</option>
            ))}
          </select>
        </div>
      </form>
    );
  }

  setorPagamento() {
    return (
      <div className="containerSetor">
        <p className="tituloBase">Método de Pagamento</p>
        <div className="flexyTipoPagamento">
          <p className="tipoBoleto">Boleto</p>
          <p className="tipoCartao">Cartão de Crédito</p>
        </div>
        <div className="flexyPagamento">
          {this.radioCheckout('boleto', 'Boleto', '', ImgBoleto)}
          {this.radioCheckout('visa', 'Visa', 'Visa', ImgCartao)}
          {this.radioCheckout('mastercard', 'MasterCard', 'MasterCard', ImgCartao)}
          {this.radioCheckout('elo', 'Elo', 'Elo', ImgCartao)}
        </div>
      </div>
    );
  }

  updateStateInput(e) {
    const { value, name } = e.target;
    this.setState(() => {
      this.setState({ [name]: value });
    });
  }

  generateform() {
    const custInfo = [
      { state: 'nomeComp', holder: 'Nome Completo' },
      { state: 'cpf', holder: 'CPF' },
      { state: 'email', holder: 'Email' },
      { state: 'fone', holder: 'Telefone' },
      { state: 'cep', holder: 'CEP' },
      { state: 'endereco', holder: 'Endereço' },
      { state: 'compl', holder: 'Complemento' },
      { state: 'num', holder: 'Número' },
      { state: 'cidade', holder: 'Cidade' },
    ];

    return (
      custInfo.map((item) => (
        <input
          key={item.state}
          type="text"
          className={`${item.state}Check`}
          name={item.state}
          placeholder={item.holder}
          value={item.state.value}
          onChange={this.updateStateInput}
        />
      )));
  }


  radioCheckout(value, valueM, name, img) {
    return (
      <label className="labelPagamentos" htmlFor={value}>
        <div className={`${value}ImgBox`}>
          <input
            className={value}
            id={value}
            name="pagamento"
            type="radio"
            value={valueM}
            onChange={this.updateStateInput}
          />
          <p className={`${value}Name`}>{name}</p>
          <img className={`${value}ImgCheckout`} src={img} alt="" />
        </div>
      </label>
    );
  }

  confirmBuy() {
    const { nomeComp, pagamento } = this.state;
    alert(`nome: ${nomeComp}, pgto em: ${pagamento}`);
  }

  render() {
    return (
      <div>
        <Link to="/">
          <img className="setaVoltarCarrinho" src={SetaVoltarCarrinho} alt="" />
        </Link>
        {Checkout.setorProdutos()}
        {this.setorCaixas()}
        {this.setorPagamento()}
        <button className="botaoComprar" type="button" onClick={this.confirmBuy}>
          Comprar
        </button>
      </div>
    );
  }
}

export default Checkout;
