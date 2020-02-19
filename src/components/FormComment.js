import React from 'react';
import CommentList from './CommentList';

class FormComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        rating: 0,
        comment: ""
    }
    this.emailChange = this.emailChange.bind(this);

    this.ratingChange = this.ratingChange.bind(this);

    this.commentChange = this.commentChange.bind(this);
  };

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
          E-mail (opcional):
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
  
  render() {
    const { comment } = this.state;
    return (
      <div>
        {this.CaixaEmail()}
        <label htmlFor="comment">
          Adicione um comentário:<br/>
          <textarea value={comment} onChange={this.commentChange} />
        </label><br />
        <button>Enviar comentário</button>
        <CommentList/>
      </div>
    );
  }
}

export default FormComment
