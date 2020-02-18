import React, { Component } from 'react';

class Categorias extends Component {

  constructor(props) {
    super(props);
    this.state = { categorias: [], catID: '' };
    this.listaCategorias = this.listaCategorias.bind(this);
    this.filtraCat = this.filtraCat.bind(this);
  }

  listaCategorias() {
    fetch('https://api.mercadolibre.com/sites/MLB/categories', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => this.setState({ categorias: data }))
  }

  filtraCat(value) {
    this.setState((state) => ({ catID: value}));
    fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${this.state.catID}`, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => console.log(data))
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
            {categorias.map(categoria => <label htmlFor={categoria.id}><input name="categorias" value={categoria.name} id={categoria.id} type="radio" onChange={() => this.filtraCat(categoria.id)}/> {categoria.name}<br/></label>)}
        </ul>
      </aside>
    );
  }
}

export default Categorias;
