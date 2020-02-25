import React from 'react';
import PropTypes from 'prop-types';

class FormComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaVazia: true,
      userEmail: '',
      review: '',
      rating: '',
      result: [],
    };
    this.review = this.review.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setaOState = this.setaOState.bind(this);
  }

  componentDidMount() {
    const commSalvos = JSON.parse(localStorage.getItem(`Comentários_${this.props.id}`) || '[]');
    if (commSalvos.length > 0) {
      this.setaOState(commSalvos);
    }
  }

  componentWillUnmount() {
    const { result } = this.state;
    localStorage.setItem(`Comentários_${this.props.id}`, JSON.stringify(result));
  }

  setaOState(parametro) {
    this.setState({
      listaVazia: false,
      result: parametro,
    });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState(() => {
      this.setState({ [name]: value });
    });
  }

  ratingChange(event) {
    this.setState({ rating: parseFloat(event.target.value) });
  }

  handleFormSubmit() {
    this.setState((state) => ({
      result: [...state.result, {
        userEmailSubmit: state.userEmail,
        reviewSubmit: state.review,
        ratingSubmit: state.rating,
      }],
      listaVazia: false,
    }));
  }

  inputEmail() {
    const { userEmail } = this.state;
    return (
      <input
        type="text"
        className="userEmail"
        name="userEmail"
        placeholder="E-mail"
        value={userEmail}
        onChange={this.handleChange}
      />
    );
  }

  generateReview() {
    const { result, listaVazia } = this.state;
    if (listaVazia) {
      return (
        <div>
          <p>Seja o primeiro a comentar!</p>
        </div>
      );
    }
    return (
      <div>
        {result.map((resultado) => (
          <div key={`${resultado.userEmailSubmit} ${resultado.ratingSubmit} ${resultado.reviewSubmit}`}>
            <p><strong>{resultado.userEmailSubmit}</strong> Nota: {resultado.ratingSubmit}</p>
            <p>{resultado.reviewSubmit} </p>
          </div>
        ))}
      </div>
    );
  }

  review() {
    const { rating, review } = this.state;
    return (
      <div className="reviewBox">
        <form onSubmit={this.handleFormSubmit}>
          {this.inputEmail()}
          <label htmlFor="rating">
            Avaliação:
            <input
              type="number"
              value={rating}
              onChange={(event) => this.ratingChange(event)}
              min="0"
              max="5"
            />
          </label><br />
          <textarea
            type="text"
            className="review"
            name="review"
            placeholder="Mensagem (opcional)"
            value={review}
            maxLength="1000"
            onChange={this.handleChange}
          />
        </form>
        <button type="submit" className="reviewButton" onClick={this.handleFormSubmit}>
          Avaliar
      </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.review()}
        {this.generateReview()}
      </div>
    );
  }
}

FormComment.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormComment;
