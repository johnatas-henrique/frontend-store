import React from 'react';
import CommentList from './CommentList';

class FormComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      rating: 0,
      comment: '',
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

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    const { comment, submit } = this.state;
    return (
      <form>
        {this.CaixaEmail()}
        <label htmlFor="comment">
          Adicione um comentário: <br />
          <textarea name="comment" value={comment} onChange={(event) => this.formChange(event)} />
        </label><br />
        <button
          type="button"
          onClick={this.handleSubmit()}
        >
          Adicionar comentário
        </button>
        <CommentList
          Comentario={submit}
        />
      </form>
    );
  }
}

export default FormComment;
