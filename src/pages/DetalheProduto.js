import React from 'react';
import { Link } from 'react-router-dom';
import DescricaoeQuant from '../components/DescricaoeQuant';
import FormComment from '../components/FormComment'
import CommentList from '../components/CommentList';

class DetalheProduto extends React.Component {

  handleSubmit(campos) {
    console.log("informações do form: ", campos)
  }

  render() {
    return (
      <div>
        <DescricaoeQuant />
        <FormComment />          
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default DetalheProduto;
