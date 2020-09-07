import React, { Component } from 'react';
import Busca from './Busca';
import './Categorias.css';

class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      catID: '',
    };
    this.listaCategorias = this.listaCategorias.bind(this);
    this.pegaCategoriaEscolhida = this.pegaCategoriaEscolhida.bind(this);
  }

  componentDidMount() {
    this.listaCategorias();
  }

  listaCategorias() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    fetch(proxyurl + url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'https://johnatas-henrique.github.io',
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ categorias: data }));
  }

  pegaCategoriaEscolhida(value) {
    this.setState(() => ({ catID: value }));
  }

  categoriaVazia() {
    return (
      <li className="categoriaLi">
        <label htmlFor="teste">
          <input
            className="categoriaInput"
            name="categorias"
            value=""
            id="teste"
            type="radio"
            onClick={() => this.pegaCategoriaEscolhida('')}
          />
          Sem Categoria
        </label>
      </li>
    );
  }

  render() {
    const { categorias, catID } = this.state;
    return (
      <div className="flexCategorias">
        <aside className="categoriasBlock">
          <h2 className="categoriaTitle">Categorias</h2>
          <ul>
            {this.categoriaVazia()}
            {categorias.map((categoria) => (
              <li className="categoriaLi" key={categoria.id}>
                <label htmlFor={categoria.id}>
                  <input
                    className="categoriaInput"
                    name="categorias"
                    value={categoria.name}
                    id={categoria.id}
                    type="radio"
                    onClick={() => this.pegaCategoriaEscolhida(categoria.id)}
                  />
                  {categoria.name}
                </label>
              </li>
            ))}
          </ul>
        </aside>
        <Busca catID={catID} />
      </div>
    );
  }
}

export default Categorias;
