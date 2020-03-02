import React from 'react';
import PropTypes from 'prop-types';
import './FormComment.css';

class FormComment extends React.Component {
  static checkstate(param) {
    const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return re.test(param);
  }

  constructor(props) {
    super(props);
    this.state = {
      listaVazia: true,
      userEmail: '',
      review: '',
      rating: 0,
      result: [],
      starSymbol: '☆',
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

  ratingChange(param) {
    const { rating } = this.state;
    if (param !== rating) {
      this.setState({
        rating: param,
      });
    }
  }

  handleFormSubmit() {
    const { userEmail, rating } = this.state;
    if (!FormComment.checkstate(userEmail)) {
      alert('por favor, informe um e-mail válido');
    } else if (rating === '') {
      alert('por favor, dê uma nota ao produto');
    } else {
      this.setState((state) => ({
        result: [...state.result, {
          userEmailSubmit: state.userEmail,
          reviewSubmit: state.review,
          ratingSubmit: state.rating,
        }],
        listaVazia: false,
      }));
    }
  }

  inputEmail() {
    const { userEmail } = this.state;
    return (
      <input
        type="text"
        className="userEmail"
        name="userEmail"
        placeholder="E-mail (obrigatório)"
        value={userEmail}
        onChange={this.handleChange}
        required
      />
    );
  }

  StarRating() {
    const { starSymbol } = this.state;
    return (
      <div>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label htmlFor="Stars" key={`${star}-${ratingValue}`}>
              <input className="Stars" type="radio" name="rating" value={ratingValue} required />
              <h2 className="star" index={index} onClick={() => this.ratingChange(ratingValue)}>{starSymbol}</h2>
            </label>
          );
        })}
      </div>
    );
  }

  generateReview() {
    const { result, listaVazia } = this.state;
    const Nota = '★';
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
            <p>
              <strong>{resultado.userEmailSubmit}</strong>
              {Nota.repeat(`${resultado.ratingSubmit}`)}
            </p>
            <p>
              {resultado.reviewSubmit}
            </p>
          </div>
        ))}
      </div>
    );
  }

  review() {
    const { review } = this.state;
    return (
      <div className="reviewBox">
        <form onSubmit={this.handleFormSubmit}>
          {this.inputEmail()}
          <label htmlFor="rating">
            {this.StarRating()}
          </label>
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
        <button type="submit" className="reviewButton" onClick={() => this.handleFormSubmit()}>
          Avaliar
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Avaliações</h2>
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
