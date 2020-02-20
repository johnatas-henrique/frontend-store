import React from 'react';
import Comment from './Comment'

class CommentList extends React.Component {
  render() {
    const { Comentario } = this.props
    console.log(Comentario)
    return (
      <div>
        {Comentario}
      </div>
    );
  }
}

export default CommentList;
