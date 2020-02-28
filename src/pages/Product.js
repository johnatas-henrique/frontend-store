import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BotaoQtdECarrinho from '../components/BotaoQtdECarrinho';
import DescricaoeQuant from '../components/DescricaoeQuant';
import FormComment from '../components/FormComment';
import SetaVoltarProduct from '../images/seta-voltar.png';
import './Product.css';
// import CommentList from '../components/CommentList';
// utilizar este componente aqui ou no FormComment.

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtoAtual: {},
      itensNoCarrinho: 0,
    };
    this.salvaQtdItem = this.salvaQtdItem.bind(this);
  }

  componentDidMount() {
    this.funcaoProCCMount();
  }

  funcaoProCCMount() {
    const { match } = this.props;
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    const produtoAtual = guardar.find((item) => item.id === match.params.id);
    this.setState({
      produtoAtual,
    });
  }

  salvaQtdItem() {
    const guardar = JSON.parse(localStorage.getItem('Produtos') || '[]');
    this.setState({
      itensNoCarrinho: guardar
        .reduce((acum, curr) => parseInt(acum, 10) + parseInt(curr.quant, 10), 0),
    });
  }

  render() {
    const { itensNoCarrinho } = this.state;
    return (
      <div>
        <div className="flexProduct">
          <Link to="/">
            <img className="setaVoltarProduct" src={SetaVoltarProduct} alt="" />
          </Link>
          <BotaoQtdECarrinho itensNoCarrinho={itensNoCarrinho} />
        </div>
        <DescricaoeQuant
          produtoAtual={this.props.location.state}
          callbackItem={this.salvaQtdItem}
        />
        <FormComment id={this.props.location.state.id} />
      </div>
    );
  }
}

Product.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;
