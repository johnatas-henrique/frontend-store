import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderCarrinho from '../components/HeaderCarrinho';
import ItemCarrinho from '../components/ItemCarrinho';
import CarrinhoVazio from '../components/CarrinhoVazio';
import './Carrinho.css';

class Carrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrinhoVazio: true,
      itensCarrinho: [],
      qtdeItensCarrinho: 0,
      atualizaSoma: '',
    };
    this.testaCarrinhoVazio = this.testaCarrinhoVazio.bind(this);
    this.carregaCarrinhoVazio = this.carregaCarrinhoVazio.bind(this);
    this.somaTotal = this.somaTotal.bind(this);
    this.setaValorTotal = this.setaValorTotal.bind(this);
  }

  componentDidMount() {
    this.carrinhoMount();
  }

  componentDidUpdate(prevProps, prevState) {
    const { qtdeItensCarrinho, atualizaSoma } = this.state;
    if ((qtdeItensCarrinho === 0) && qtdeItensCarrinho !== prevState.qtdeItensCarrinho) {
      this.carregaCarrinhoVazio();
    }
    if (atualizaSoma !== prevState.atualizaSoma
      || qtdeItensCarrinho !== prevState.qtdeItensCarrinho) {
      this.setaValorTotal();
    }
  }

  setaValorTotal() {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const guardarMap = guardar.map((item) => item.price * item.quant);
    const guardarReduce = guardarMap.reduce((acc, curr) => acc + curr, 0);
    this.setState(() => ({
      valorTotal: guardarReduce,
    }));
  }

  carrinhoMount() {
    const guardarX = JSON.parse(localStorage.getItem('Produtos') || '[]');
    if (guardarX.length > 0) {
      this.setState({
        qtdeItensCarrinho: guardarX.length,
        itensCarrinho: guardarX,
        carrinhoVazio: false,
      });
    }
  }

  carregaCarrinhoVazio() {
    this.setState({
      carrinhoVazio: true,
    });
  }

  testaCarrinhoVazio() {
    const { qtdeItensCarrinho } = this.state;
    this.setState(() => ({
      qtdeItensCarrinho: qtdeItensCarrinho - 1,
    }));
  }

  somaTotal(param1, param2) {
    this.setState({
      atualizaSoma: `{${param2} - ${param1}}`,
    });
  }

  render() {
    const { itensCarrinho, carrinhoVazio, valorTotal } = this.state;

    if (carrinhoVazio) return <CarrinhoVazio />;

    return (
      <div className="Carrinho">
        <HeaderCarrinho />
        {itensCarrinho.map((item) => (
          <ItemCarrinho
            key={`${item.id} ${item.quant}`}
            id={item.id}
            title={item.title}
            image={item.thumbnail}
            price={item.price}
            quant={item.quant}
            callbackCarrinhoVazio={this.testaCarrinhoVazio}
            callbackSomaTotal={this.somaTotal}
          />
        ))}
        <p>
          <span className="textoCompraTotal">Valor Total da Compra: </span>
          {new Intl.NumberFormat('pt-BR',
            { style: 'currency', currency: 'BRL' }).format(valorTotal)}
        </p>
        <Link className="botaoCheckout" to="/carrinho/checkout">Checkout</Link>
      </div>
    );
  }
}

export default Carrinho;
