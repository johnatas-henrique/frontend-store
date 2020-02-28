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
    this.funcaoProCCMount();
  }

  componentDidUpdate(prevProps, prevState) {
    const { qtdeItensCarrinho } = this.state;
    if ((qtdeItensCarrinho === 0) && qtdeItensCarrinho !== prevState.qtdeItensCarrinho) {
      this.carregaCarrinhoVazio();
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

  funcaoProCCMount() {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    if (guardar.length > 0) {
      this.setState({
        qtdeItensCarrinho: guardar.length,
        itensCarrinho: guardar,
        carrinhoVazio: false,
      });
    }
  }

  render() {
    const { itensCarrinho, carrinhoVazio } = this.state;

    if (carrinhoVazio) return <CarrinhoVazio />;

    return (
      <div className="Carrinho">
        <HeaderCarrinho />
        {itensCarrinho.map((item) => (
          <ItemCarrinho
            key={item.id}
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
