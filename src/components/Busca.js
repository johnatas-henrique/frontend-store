import React, { Component } from 'react';
import './Busca.css';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catID: props.catID,
      listagem: [],
    }
    /* this.muda = this.muda.bind(this); */
  }

  requisicao (event) {
    const { catID, listagem } = this.state;
    if (event.key === 'Enter') {
      /* if (catID === '') {
        fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${event.target.value}`, { method: 'GET' })
          .then((response) => response.json())
          .then((data) => this.setState((state) => ({ listagem: data.results })))
      } */
      fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${this.props.catID}&q=${event.target.value}`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => this.setState((state) => ({ listagem: data.results })))
    }
  }

/*   componentDidUpdate () {
    this.setState({
      catID: this.props.catID,
    })
  } */
  /*  muda (event) {
    if (event.key === 'Enter') {
      this.setState({
        catID: this.props.catID,
      })
    } 
  } */

  render () {
    return (
      <div>
        <input type="text" onKeyPress={(event) => this.requisicao(event)} />
        <div> {this.state.listagem.map((item) => {
          return <li>{item.title}</li>
        })}
        </div>
      </div>
    );
  }
}

export default Busca;
