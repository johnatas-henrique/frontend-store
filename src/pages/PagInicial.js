import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Busca from '../components/Busca';
import Categorias from '../components/Categorias';

class PagInicial extends Component {
  /* constructor(props) {
    super(props);
    this.state = { 
      listagem: [] };
    this.testeRequisicao = this.testeRequisicao.bind(this)
  } */

  render() {
    return (
      <div className="Carrinho">
        <h1>Lista Produtos</h1>
        <Categorias />
        <Link to="/carrinho">Carrinho</Link>
      </div>

      // criar campo input via COMPONENTE. Nele, Após o usuário dar ENTER ou no clique de um botão, será renderizada uma DIV dentro de carrinho que conterá as informações dos comentários dos ususários.
    );
  }
}

export default PagInicial;
