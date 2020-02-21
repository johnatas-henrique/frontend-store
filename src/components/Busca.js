import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BotaoCarrinho from './BotaoCarrinho';
import './Busca.css';
import ImgCarrinho from '../images/carrinho.png';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listagem: [],
      pesquisa: '',
      primeiraBusca: true,
    };
    this.valorPesquisa = this.valorPesquisa.bind(this);
    this.salvaitem = this.salvaitem.bind(this);
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
    console.log(this.state.listagem);
  }

  valorPesquisa(event) {
    const { value } = event.target;
    this.setState({
      pesquisa: value,
    });
  }

  salvaitem(produtoV, nomeV, precoV) {
    localStorage.setItem(`${produtoV}`, JSON.stringify({ id: produtoV, title: nomeV, price: precoV }));
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
            {/* <img className="carrinhoBusca" src={ImgCarrinho} alt="Teste"/> */}
            <p className="carrinhoBusca">Teste</p>
          </div>
          <p>Você ainda não realizou uma busca</p>
        </div>
      );
    }
    return (
      <div className="main-block">
        <input
          className="caixaBusca"
          type="text"
          value={pesquisa}
          onChange={(event) => this.valorPesquisa(event)}
        />
        <div className="busca">
          {listagem.map((item) => (
            <div className="itemBusca" key={item.id}>
              <Link to={`/${item.id}`}>
                <h2 className="titulo" title={item.title}>{item.title}</h2>
              </Link>
              <p>R$ {item.price}</p>
              <img className="itemImage" src={item.thumbnail} alt={item.title} />
              <button
                type="button"
                onClick={this.salvaitem(item.id, item.title, item.price)}
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
