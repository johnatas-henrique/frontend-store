import React, { Component } from 'react';
import './Categorias.css';
import Busca from './Busca';

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

  render() {
    const { categorias } = this.state;
    return (
      <div className="flexy">
        <aside className="categoria">
          <h2>Categorias</h2>
          <ul>
            <li><label htmlFor="teste">
              <input
                name="categorias" value="" id="teste" type="radio"
                onClick={() => this.pegaCategoriaEscolhida('')}
              />
              Todas as Categorias
                </label></li>
            {categorias.map((categoria) =>
              <li key={categoria.id}>
                <label htmlFor={categoria.id}>
                  <input
                    name="categorias" value={categoria.name} id={categoria.id} type="radio"
                    onClick={() => this.pegaCategoriaEscolhida(categoria.id)}
                  />
                  {categoria.name}
                </label>
              </li>,
            )}
          </ul>
        </aside>
        <main className="busca">
          <Busca catID={this.state.catID} />
        </main>
      </div>
    );
  }
}

export default Categorias;
