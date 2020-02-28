import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemBusca from './ItemBusca';
import BotaoQtdECarrinho from './BotaoQtdECarrinho';
import './Busca.css';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listagem: [],
      inputPesquisa: '',
      pesquisa: '',
      resultadoVazio: false,
      buscaVazia: true,
      itensNoCarrinho: 0,
    };
    this.valorPesquisa = this.valorPesquisa.bind(this);
    this.salvaItem = this.salvaItem.bind(this);
    this.fetchCategoria = this.fetchCategoria.bind(this);
    this.fetchProduto = this.fetchProduto.bind(this);
    this.fetchTotal = this.fetchTotal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const linkML = 'https://api.mercadolibre.com/sites/MLB/search';
    const { pesquisa } = this.state;
    const { catID } = this.props;
    if (pesquisa === '' && catID !== prevProps.catID) {
      this.fetchCategoria(linkML);
    }
    if (catID === '' && pesquisa !== prevState.pesquisa) {
      this.fetchProduto(linkML);
    }
    if ((catID !== '' && pesquisa !== '')
        && (pesquisa !== prevState.pesquisa || catID !== prevProps.catID)
    ) {
      this.fetchTotal(linkML);
    }
  }

  fetchCategoria(linkML) {
    fetch(`${linkML}?category=${this.props.catID}`,
      { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          this.setState(() => ({
            listagem: data.results,
            buscaVazia: false,
            resultadoVazio: true,
          }));
        } else {
          this.setState(() => ({
            listagem: data.results,
            buscaVazia: false,
            resultadoVazio: false,
          }));
        }
      });
  }

  fetchProduto(linkML) {
    fetch(`${linkML}?q=${this.state.pesquisa}`,
      { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          this.setState(() => ({
            listagem: data.results,
            buscaVazia: false,
            resultadoVazio: true,
          }));
        } else {
          this.setState(() => ({
            listagem: data.results,
            buscaVazia: false,
            resultadoVazio: false,
          }));
        }
      });
  }

  fetchTotal(linkML) {
    console.log('passei aqui');
    fetch(`${linkML}?category=${this.props.catID}&q=${this.state.pesquisa}`,
      { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          this.setState(() => ({
            listagem: data.results,
            buscaVazia: false,
            resultadoVazio: true,
          }));
        } else {
          this.setState(() => ({
            listagem: data.results,
            buscaVazia: false,
            resultadoVazio: false,
          }));
        }
      });
  }

  valorPesquisa(event) {
    const { value } = event.target;
    this.setState({
      inputPesquisa: value,
    });
  }

  passaPesquisa(event) {
    const { value } = event.target;
    if (event.key === 'Enter') {
      this.setState(() => ({
        pesquisa: value,
      }));
    }
  }

  salvaItem(produto) {
    const {
      id, title, price, thumbnail,
    } = produto;
    const quant = 1;
    let guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const itemExistente = (guardar.find((item) => item.id === id));
    if (itemExistente) {
      itemExistente.quant += 1;
      guardar = guardar.filter((item) => item.id !== id);
      guardar.push(itemExistente);
      localStorage.setItem('Produtos', JSON.stringify(guardar));
    } else {
      guardar.push({
        id, title, price: parseFloat(price), thumbnail, quant,
      });
      localStorage.setItem('Produtos', JSON.stringify(guardar));
      this.setState({
        itensNoCarrinho: guardar.length,
      });
    }
  }

  topoDoComponente() {
    const { inputPesquisa, itensNoCarrinho } = this.state;
    return (
      <div className="flexBusca">
        <input
          className="caixaBusca"
          type="text"
          value={inputPesquisa}
          onChange={(event) => this.valorPesquisa(event)}
          onKeyPress={(event) => this.passaPesquisa(event)}
        />
        <BotaoQtdECarrinho itensNoCarrinho={itensNoCarrinho} />
      </div>
    );
  }

  render() {
    const { listagem, buscaVazia, resultadoVazio } = this.state;
    if (buscaVazia) {
      return (
        <div className="main-block">
          {this.topoDoComponente()}
          <p className="buscaZerada">Você ainda não realizou uma busca</p>
        </div>
      );
    }
    if (resultadoVazio) {
      return (
        <div className="main-block">
          {this.topoDoComponente()}
          <p className="buscaZerada">Nenhum produto foi encontrado</p>
        </div>
      );
    }
    return (
      <div className="main-block">
        {this.topoDoComponente()}
        <ItemBusca
          listagem={listagem}
          callbackCarrinho={this.salvaItem}
        />
      </div>
    );
  }
}

Busca.propTypes = {
  catID: PropTypes.string.isRequired,
};

export default Busca;
