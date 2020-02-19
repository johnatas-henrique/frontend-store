import React from 'react';

export function ExibeComentario(props) {
  const { name, rating, message, email } = props.comment;

  if (name === '') {
    return (
      <div className="comment-box">
        <div className="Cabecalho">
          {email} {rating}
        </div>
        <div className="texto">
          {message}
        </div>
      </div>
    )
  }

  return (
    <div className="comment-box">
      <div className="Cabecalho">
        {name} `(${email})` {rating}
      </div>
      <div className="texto">
        {message}
      </div>
    </div>
  )
}

export default ExibeComentario;
