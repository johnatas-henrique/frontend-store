import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BotaoCarrinho from './BotaoCarrinho';
import './Busca.css';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listagem: [],
      pesquisa: '',
      primeiraBusca: true,
    };
    this.valorPesquisa = this.valorPesquisa.bind(this);
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

  valorPesquisa(event) {
    const { value } = event.target;
    this.setState({
      pesquisa: value,
    });
  }

  render() {
    const { listagem, pesquisa, primeiraBusca } = this.state;
    if (primeiraBusca || listagem == []) {
      return (
        <div>
          <input
            type="text"
            value={pesquisa}
            onChange={(event) => this.valorPesquisa(event)}
          />
          <p>Busca ae!</p>
        </div>
      );
    }
    return (
      <div className="main-block">
        <input
          type="text"
          value={pesquisa}
          onChange={(event) => this.valorPesquisa(event)}
        />
        <div className="busca">
          {listagem.map((item) => (
            <div className="itemBusca" key={item.id}>
              <Link to={`/${item.id}`}>
                <h2 className="titulo">{item.title}</h2>
              </Link>
              <p>R$ {item.price}</p>
              <img class="itemImage" src={item.thumbnail} alt={item.title} />
              <BotaoCarrinho />
              <div>
              </div>
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
