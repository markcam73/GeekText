import React, { Component } from 'react';

class Book extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <img src={this.props.imageSrc}/>
        <p>{this.props.author}</p>
        <p>{this.props.genre}</p>
        <p>{this.props.price}</p>
        <p>{this.props.rating}</p>
        <p>{this.props.releaseDate}</p>
      </div>
    );
  }
}

export default Book;
