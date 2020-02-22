import React from 'react';
import { Link } from 'react-router-dom';
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
    const { match } = this.props;
    let guardar = JSON.parse(localStorage.getItem("Produtos") || "[]");
    let produtoAtual = guardar.find((item) => item.id === match.params.id);
    this.setState({
      produtoAtual: produtoAtual,
    });
  }

  render() {
    return (
      <div>
        <DescricaoeQuant produtoAtual={this.props.location.state}/>
        <FormComment />
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default DetalheProduto;
