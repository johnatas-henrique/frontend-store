import React from 'react';
import CommentList from './CommentList';

class FormComment extends React.Component {
  constructor(props) {
    super(props);
    const teste = JSON.parse(localStorage.getItem('Comentários'));
    this.state = {
      userEmail: '',
      review: '',
      result: teste || [{
        userEmailSubmit: '',
        reviewSubmit: '',
      }],
    };
    this.formChange = this.formChange.bind(this);

    this.ratingChange = this.ratingChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  ratingChange(event) {
    this.setState({ rating: parseFloat(event.target.value) });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      result: [...state.result, { userEmailSubmit: state.userEmail, reviewSubmit: state.review }],
    }));
  }

  generateReview() {
    const { result } = this.state;
    return (
      <div>
        {result.map((resultado) => (
          <div>
            <p><strong>{resultado.userEmailSubmit}</strong></p>
            <p>{resultado.reviewSubmit} </p>
          </div>
        ))}
      </div>
    );
  }

  componentDidUpdate(){
    this.generateReview();
  }

  CaixaEmail() {
    const { email, rating } = this.state;
    return (
      <div>
        <h2>Avaliações</h2>
        <label htmlFor="email">
          E-mail (opcional):
          <input name="email" type="text" value={email} onChange={(e) => this.formChange(e)} />
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

  render() {
    const { comment, submit } = this.state;
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          {this.CaixaEmail()}
          <label htmlFor="comment">
            Adicione um comentário:
            <br />
            <textarea name="comment" value={comment} maxLength="1000" onChange={(event) => this.formChange(event)} />
          </label>
          <br />
          <button
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
          >
            Adicionar comentário
        </button>
        </form>
        {this.generateReview()}
      </div>
    );
  }
}

export default FormComment;
