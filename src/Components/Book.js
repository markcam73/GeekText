import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './book.css';
import API from '../API';

class Book extends Component {
  render() {
    return (
      <div style={styles.divStyle}>
        <div onClick={()=>API.changePath("/books/" + this.props.id,{})}>
            <h1>{this.props.title}</h1>
            <img style={styles.imgStyle}src={this.props.imageSrc} alt="cover" className="book_cover"/>
            <p>Author: {this.props.author}</p>
            <p>Genre: {this.props.genre}</p>
            <p>Price: {this.props.price}</p>
            <p>Release date: {this.props.releaseDate}</p>
            <div style={styles.ratingDiv}>
              <p>Rating: </p>
              <StarRatingComponent
                        name="rate1"
                        editing={false}
                        starCount={5}
                        value={this.props.rating}
                        />
            </div>
        </div>
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
    cursor: "hand"
  },
  imgStyle:{
    width:"100%"
  },
  ratingDiv:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height:"19px"
  }
}
export default Book;
