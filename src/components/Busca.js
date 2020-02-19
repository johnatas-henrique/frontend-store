import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Busca.css';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listagem: [],
      pesquisa: '',
    }
    this.valorPesquisa = this.valorPesquisa.bind(this);
  }

  valorPesquisa (event) {
    const { value } = event.target;
    this.setState({
      pesquisa: value,
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const linkML = 'https://api.mercadolibre.com/sites/MLB/search';
    if (this.props.catID !== prevProps.catID || this.state.pesquisa !== prevState.pesquisa) {
      fetch(`${linkML}?category=${this.props.catID}&q=${this.state.pesquisa}`,
        { method: 'GET' })
        .then((response) => response.json())
        .then((data) => this.setState(() => ({ listagem: data.results })))
    }
  }

  render () {
    const { listagem, pesquisa } = this.state;
    return (
      <div>
        <input type="text"
          value={pesquisa}
          onChange={(event) => this.valorPesquisa(event)}
        />
        <div> {listagem.map((item) => {
          return <div key={item.id}>
            {item.title}
            R$ {item.price}
            <img src={item.thumbnail} alt={item.title}></img>
            <div>
              <Link to={`/${item.id}`}>Página</Link>
            </div>
          </div>
        })}
        </div>
      </div>
    );
  }
}

export default Busca;
