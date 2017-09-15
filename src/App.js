import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './Components/Book.js';

class App extends Component {
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
        {arr.map((book,i)=>
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

var arr=[
          {title:"Mark's book",
          author:"Mark",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:"100%",
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book",
          author:"Mark",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:"100%",
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book",
          author:"Mark",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:"100%",
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book",
          author:"Mark",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:"100%",
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book",
          author:"Mark",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:"100%",
          price:"$10",
          releaseDate:"9/15/17"},
          {title:"Mark's book",
          author:"Mark",
          imageSrc:"https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57",
          genre:"good",
          rating:"100%",
          price:"$10",
          releaseDate:"9/15/17"}
]

export default App;
