import React from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div>
        {this.props.emailComentado}
      </div>
    );
  }
}

export default Comment;