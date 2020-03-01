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
    };
    this.testaCarrinhoVazio = this.testaCarrinhoVazio.bind(this);
    this.carregaCarrinhoVazio = this.carregaCarrinhoVazio.bind(this);
  }

  componentDidMount() {
    this.carrinhoMount();
  }

  componentDidUpdate(prevProps, prevState) {
    const { qtdeItensCarrinho } = this.state;
    if ((qtdeItensCarrinho === 0) && qtdeItensCarrinho !== prevState.qtdeItensCarrinho) {
      this.carregaCarrinhoVazio();
    }
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


  render() {
    const { itensCarrinho, carrinhoVazio } = this.state;

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
          />
        ))}
        <Link to="/carrinho/checkout">Checkout</Link>
      </div>
    );
  }
}

export default Carrinho;
