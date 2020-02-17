import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Carrinho extends Component {
  render() {
    return (
      <div className="Carrinho">
        <h1>Carrinho</h1>
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default Carrinho;
