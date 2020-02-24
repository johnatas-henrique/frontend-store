import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BotaoQtdECarrinho from './BotaoQtdECarrinho';
import './Busca.css';
/* import BotaoCarrinho from './BotaoCarrinho';
import ImgCarrinho from '../images/carrinho.png'; */

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listagem: [],
      pesquisa: '',
      primeiraBusca: true,
      itensNoCarrinho: 0,
    };
    this.valorPesquisa = this.valorPesquisa.bind(this);
    this.trataCarac = this.trataCarac.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    const linkML = 'https://api.mercadolibre.com/sites/MLB/search';
    if (this.props.catID !== prevProps.catID || this.state.pesquisa !== prevState.pesquisa) {
      fetch(`${linkML}?category=${this.props.catID}&q=${this.state.pesquisa}`,
        { method: 'GET' })
        .then((response) => response.json())
        .then((data) => this.setState(() => ({
          listagem: data.results,
          primeiraBusca: false,
        })));
    }
  }

  trataCarac(param) {
    return param.map((item) => `${item.name}: ${item.value_name}`);
  }

  valorPesquisa(event) {
    const { value } = event.target;
    this.setState({
      pesquisa: value,
    });
  }

  salvaItem(produto) {
    const {
      id, title, price, thumbnail,
    } = produto;
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    guardar.push({
      id,
      title,
      price: parseFloat(price),
      thumbnail,
    });
    localStorage.setItem('Produtos', JSON.stringify(guardar));
    this.setState({
      itensNoCarrinho: guardar.length,
    });
  }


  render() {
    const { listagem, pesquisa, primeiraBusca } = this.state;
    if (primeiraBusca) {
      return (
        <div className="main-block">
          <div className="flexy">
            <input
              className="caixaBusca"
              type="text"
              value={pesquisa}
              onChange={(event) => this.valorPesquisa(event)}
            />
            <BotaoQtdECarrinho itensNoCarrinho={this.state.itensNoCarrinho} />
          </div>
          <p className="buscaZerada">Você ainda não realizou uma busca</p>
        </div>
      );
    }
    return (
      <div className="main-block">
        <div className="flexy">
          <input
            className="caixaBusca"
            type="text"
            value={pesquisa}
            onChange={(event) => this.valorPesquisa(event)}
          />
          <BotaoQtdECarrinho itensNoCarrinho={this.state.itensNoCarrinho} />
        </div>
        <div className="busca">
          {listagem.map((item) => (
            <div className="itemBusca" key={item.id}>
              <Link
                to={{
                  pathname: `/${item.id}`,
                  state: {
                    id: `${item.id}`,
                    title: `${item.title}`,
                    price: `${item.price}`,
                    thumbnail: `${item.thumbnail}`,
                    attributes: `${this.trataCarac(item.attributes)}`,
                  },
                }}
              >
                <h2 className="titulo" title={item.title}>{item.title}</h2>
              </Link>
              <p>
                R$
                {item.price}
              </p>
              <img className="itemImage" src={item.thumbnail} alt={item.title} />
              <button
                type="button"
                onClick={() => this.salvaItem(item)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Busca.propTypes = {
  catID: PropTypes.string.isRequired,
};

export default Busca;
