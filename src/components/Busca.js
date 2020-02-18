import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Busca.css';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catID: 'xD',
      listagem: [],
    }
    /* this.muda = this.muda.bind(this); */
    console.log(props.catID);
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

  componentDidUpdate (prevProps) {
    if (this.props.catID !== prevProps.catID) {
      console.log('mudou a prop');
       fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${this.props.catID}`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => this.setState((state) => ({ listagem: data.results })))
    }
  }
  /*  muda (event) {
    if (event.key === 'Enter') {
      this.setState({
        catID: this.props.catID,
      })
    } 
  } */

  render () {
    console.log(this.state.listagem);
    return (
      <div>
        <input type="text" onKeyPress={(event) => this.requisicao(event)} />
        <div> {this.state.listagem.map((item) => {
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
