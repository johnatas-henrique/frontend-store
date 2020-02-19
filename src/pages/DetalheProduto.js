import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetalheProduto extends Component {
  render() {
    return (
      <div className="DetalheProduto">
        <h1>Detalhes do Produto:</h1>
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default DetalheProduto;
