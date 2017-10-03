import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class BookDetailed extends Component {
  constructor(supplied) {
      super(supplied);
      this.state={
        book:{}
      }
  }
  componentWillMount(){
    var bookID = this.props.params.id;
    console.log(bookID);
    var _this = this;
    fetch('http://localhost:5000/books/' + bookID).then((resp) => resp.json()).then(function(data){
      _this.setState({book:data});
    })
  }
  render() {
    return (
      <div style={styles.divStyle}>
        <h1>{this.state.book.title}</h1>
        <img style={styles.imgStyle}src={this.state.book.imageSrc}/>
        <p>Author: {this.state.book.author}</p>
        <p>Genre: {this.state.book.genre}</p>
        <p>Price: {this.state.book.price}</p>
        <p>Rating: <StarRatingComponent
                    name="rate1"
                    editing={false}
                    starCount={5}
                    value={this.state.book.rating}
                    /></p>
        <p>Release date: {this.state.book.releaseDate}</p>
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
export default BookDetailed;
