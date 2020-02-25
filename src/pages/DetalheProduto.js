import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DescricaoeQuant from '../components/DescricaoeQuant';
import FormComment from '../components/FormComment';
// import CommentList from '../components/CommentList';
// utilizar este componente aqui ou no FormComment.

class DetalheProduto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtoAtual: {},
    };
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

  render() {
    return (
      <div>
        <DescricaoeQuant produtoAtual={this.props.location.state} />
        <FormComment id={this.props.location.state.id} />
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

DetalheProduto.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetalheProduto;
