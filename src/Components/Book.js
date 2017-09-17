import React, { Component } from 'react';

class Book extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <img src={this.props.imageSrc}/>
        <p>Author: {this.props.author}</p>
        <p>Genre: {this.props.genre}</p>
        <p>Price: {this.props.price}</p>
        <p>Rating: {this.props.rating}</p>
        <p>Release date:{this.props.releaseDate}</p>
      </div>
    );
  }
}

export default Book;
