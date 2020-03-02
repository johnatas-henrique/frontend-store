import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import './FormComment.css';

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
    this.checkstate = this.checkstate.bind(this);
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
    this.setState({ rating: param });
  }

  checkstate(param) {
    const re = /\S+@\S+\.\S+/;
    return re.test(param);
  }

  handleFormSubmit() {
    const { userEmail, rating } = this.state;
    if (!this.checkstate(userEmail)) {
      alert('por favor, informe um e-mail válido');
    }
    if (rating === '') {
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
    const { rating } = this.state;
    return (
      <div>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label htmlFor="Stars">
              <input className="Stars" type="radio" name="rating" value={ratingValue} required />
              <FaStar className="star" color={ratingValue > rating ? 'gray' : 'black'} index={index} onClick={() => this.ratingChange(ratingValue)} />
            </label>
          );
        })}
      </div>
    );
  }

  generateReview() {
    const { result, listaVazia } = this.state;
    const Nota = [<FaStar color="black" />,
    <FaStar color="black" />,
    <FaStar color="black" />,
    <FaStar color="black" />,
    <FaStar color="black" />];
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
              {Nota.slice(0, `${resultado.ratingSubmit}`)}
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
        <button type="submit" className="reviewButton" onClick={this.handleFormSubmit}>
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
