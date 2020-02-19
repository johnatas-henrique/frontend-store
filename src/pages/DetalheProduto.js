import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

// class MostraEmails extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <li>{this.props.children}</li>
//       </div>
//     )
//   }
// }


class DetalheProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quant: 0,
      comment: '',
      email: '',
      rating: 0,
      emailsubmit: '',
    };

    this.ContainerBig = this.ContainerBig.bind(this);

    this.ContainerQuant = this.ContainerQuant.bind(this);

    this.increment = this.increment.bind(this);

    this.decrement = this.decrement.bind(this);

    this.CaixaComment = this.CaixaComment.bind(this);

    this.CaixaEmail = this.CaixaEmail.bind(this);

    this.emailChange = this.emailChange.bind(this);

    this.ratingChange = this.ratingChange.bind(this);

    this.commentChange = this.commentChange.bind(this);

  }

  ContainerBig() {
    return (
      <div className="container-big">
        <div className="box-Esquerda">
          {/* <h1>{Nome do Produto}: {preço do produto}</h1> */}
          {/* <img src={imagem do produto} alt={NomedoProduto} /> */}
        </div>
        <div className="box-Direita">
          <ul>Características do Produto:
            <li>Característica01</li>
            <li>Característica02</li>
            <li>Característica03</li>
          </ul>
        </div>
      </div>
    );
  }

  increment() {
    this.setState((state) => ({
      quant: state.quant + 1,
    }));
  }

  decrement() {
    this.setState((state) => ({
      quant: state.quant - 1,
    }));
  }

  ContainerQuant() {
    const { quant } = this.state;
    return (
      <div className="container-big">
        <div className="Quant">
          <h2>Quantidade:</h2>
          <button className="dec" onClick={quant === 0 ? { quant: 0 } : this.decrement}>-</button>
          <h2>{this.state.quant}</h2>
          <button className="inc" onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  ratingChange(event) {
    this.setState({ rating: parseFloat(event.target.value) });
  }

  commentChange(event) {
    this.setState({ comment: event.target.value });
  }

  CaixaEmail() {
    const { email, rating } = this.state;
    return (
      <div>
        <h2>Avaliações</h2>
        <label htmlFor="email">
          E-mail:
            <input type="text" value={email} onChange={this.emailChange} />
        </label>
        <label htmlFor="rating">
          Avaliação:
            <input
            type="number"
            value={rating}
            onChange={(event) => this.ratingChange(event)}
            min="0"
            max="5"
          />
        </label>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      emailsubmit: this.state.email
    });
  }

  CaixaComment() {
    const { comment } = this.state;
    return (
      <div>
        <label htmlFor="comment">
          Adicione um comentário:
            <textarea value={comment} onChange={this.commentChange} />
        </label>
      </div>
    );
  }

  render() {
    return (
      <div className="DetalheProduto">
        {this.ContainerBig()}
        {this.ContainerQuant()}
        <button>Adicionar ao Carrinho</button>
        <div className="container-comment">
          <form>
            {this.CaixaEmail()}
            {this.CaixaComment()}
            <button type="button" onClick={(e) => this.handleSubmit(e)}>Adicionar comentário</button>
          </form>
        </div>
        {/* <MostraEmails>
          {this.state.emailsubmit}
        </MostraEmails> */}
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

// DetalheProduto.propTypes = {
//   email: PropTypes.string.isRequired,
//   comment: PropTypes.string,
//   rating: PropTypes.number.isRequired,

// }

export default DetalheProduto;
