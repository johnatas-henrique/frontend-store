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
      pesquisa: '',
      buscaVazia: true,
      itensNoCarrinho: 0,
    };
    this.valorPesquisa = this.valorPesquisa.bind(this);
    this.salvaItem = this.salvaItem.bind(this);
  }

  componentDidUpdate (prevProps, prevState) {
    const linkML = 'https://api.mercadolibre.com/sites/MLB/search';
    if (this.props.catID !== prevProps.catID || this.state.pesquisa !== prevState.pesquisa) {
      fetch(`${linkML}?category=${this.props.catID}&q=${this.state.pesquisa}`,
        { method: 'GET' })
        .then((response) => response.json())
        .then((data) => this.setState(() => ({
          listagem: data.results,
          buscaVazia: false,
        })));
    }
  }

  valorPesquisa (event) {
    const { value } = event.target;
    this.setState({
      pesquisa: value,
    });
  }

  salvaItem (produto) {
    const {
      id, title, price, thumbnail,
    } = produto;
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    guardar.push({
      id, title, price: parseFloat(price), thumbnail,
    });
    localStorage.setItem('Produtos', JSON.stringify(guardar));
    this.setState({
      itensNoCarrinho: guardar.length,
    });
  }

  topoDoComponente () {
    const { pesquisa, itensNoCarrinho } = this.state;
    return (
      <div className="flexy">
        <input
          className="caixaBusca"
          type="text"
          value={pesquisa}
          onChange={(event) => this.valorPesquisa(event)}
        />
        <BotaoQtdECarrinho itensNoCarrinho={itensNoCarrinho} />
      </div>
    );
  }

  render () {
    const { listagem, buscaVazia } = this.state;
    if (buscaVazia) {
      return (
        <div className="main-block">
          {this.topoDoComponente()}
          <p className="buscaZerada">Você ainda não realizou uma busca</p>
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
