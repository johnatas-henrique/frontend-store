import React, { Component } from 'react';

class Categorias extends Component {

  constructor(props) {
    super(props);
    this.state = { categorias: [] };
    this.listaCategorias = this.listaCategorias.bind(this);
  }

  listaCategorias() {
    fetch('https://api.mercadolibre.com/sites/MLB/categories', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => this.setState({ categorias: data }))
  }

  componentDidMount() {
    this.listaCategorias();
  }

  render() {
      const { categorias } = this.state;
 //     const { id, name } = categorias;
    return (
      <aside>
        <h2>Categorias</h2>
        <ul>
            {categorias.map(categoria => <label htmlFor={categoria.id}>  <input name="categorias" value={categoria.id} id={categoria.id} type="radio" /> {categoria.name} <br /> </label>)}
        </ul>
      </aside>
    );
  }
}

export default Categorias;
