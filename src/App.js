import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './Components/Book.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={books: arr}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value,books: sortByKey(arr,event.target.value)});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to GeekText</h2>
        </div>
        <p className="App-intro">
          We have books.
        </p>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="releaseDate">Release Date</option>
        </select>
        {this.state.books.map((book,i)=>
          <Book key ={i}
                title={book.title}
                author={book.author}
                imageSrc={book.imageSrc}
                genre={book.genre}
                rating={book.rating}
                price={book.price}
                releaseDate={book.releaseDate}
                />
        )}
      </div>
    );
  }
}
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if(x<y){
          return -1;
        }else if(x>y){
          return 1;
        }else{
          return 0
        }
    });
}
var arr=[
          {title:"Mark's book1",
          author:"Mark5",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:10,
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book2",
          author:"Mark4",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:7,
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book3",
          author:"Mark3",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:5,
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book4",
          author:"Mark2",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:6,
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book5",
          author:"Mark1",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:3,
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book6",
          author:"Mark0",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:1,
          price:"$10",
          releaseDate:"9/15/17"}
]

export default App;
