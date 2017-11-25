import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './book.css';
import API from '../API';

class Book extends Component {
  render() {
    return (
      <div style={styles.divStyle}>
        <div onClick={()=>API.changePath("/books/" + this.props.id,{})}>
            <h1 style={styles.headerStyle} >{this.props.title}</h1>
            <img style={styles.imgStyle}src={this.props.imageSrc} alt="cover" className="book_cover"/>
           
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
  },
  headerStyle: {
    fontSize:"4vmin"
  }
}
export default Book;
