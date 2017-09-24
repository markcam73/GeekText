import React, { Component } from 'react';

class Book extends Component {
  render() {
    return (
      <div style={styles.divStyle}>
        <h1>{this.props.title}</h1>
        <img style={styles.imgStyle}src={this.props.imageSrc}/>
        <p>Author: {this.props.author}</p>
        <p>Genre: {this.props.genre}</p>
        <p>Price: {this.props.price}</p>
        <p>Rating: {this.props.rating}</p>
        <p>Release date:{this.props.releaseDate}</p>
      </div>
    );
  }
}
var styles ={
  divStyle:{
    display: "inline-block",
    marginBottom: "8px",
    width: "calc(25% - 4px)",
    marginRight: "8px",
  },
  imgStyle:{
    width:"100%"
  }
}
export default Book;
