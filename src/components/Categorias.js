import React, { Component } from 'react';
import Busca from './Busca';
import './Categorias.css';

class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      catID: '',
      listagem: [],
    };
    this.listaCategorias = this.listaCategorias.bind(this);
    this.pegaCategoriaEscolhida = this.pegaCategoriaEscolhida.bind(this);
  }

  componentDidMount() {
    this.listaCategorias();
  }

  listaCategorias() {
    fetch('https://api.mercadolibre.com/sites/MLB/categories', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => this.setState({ categorias: data }));
  }

  pegaCategoriaEscolhida(value) {
    this.setState(() => ({ catID: value }));
  }

  categoriaVazia() {
    return (
      <li>
        <label htmlFor="teste">
          <input
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
    const { categorias } = this.state;
    return (
      <div className="flexy">
        <aside className="categorias-block">
          <h2>Categorias</h2>
          <ul>
            {this.categoriaVazia()}
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <label htmlFor={categoria.id}>
                  <input
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
        <Busca catID={this.state.catID} />
      </div>
    );
  }
}

export default Categorias;
