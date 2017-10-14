import React, { Component } from 'react';
import Book from './Book.js';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
const pageSize=9;

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state={books: [],filteredBooks:[],sort:"title",order:1,currentPage:1}
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  componentDidMount(){
    var _this = this
    fetch('http://localhost:5000/books').then((resp) => resp.json()).then(function(data){
      _this.setState({books:data,filteredBooks:sortByKey(data,"title",1)});
    })
  }

  handleSortChange(event) {
    this.setState({sort: event.target.value,filteredBooks: sortByKey(this.state.filteredBooks,event.target.value, this.state.order)});
  }
  handleGenreChange(event) {
    this.setState({genre: event.target.value,filteredBooks: sortByKey(filterByGenre(this.state.books,event.target.value),this.state.sort,this.state.order)});
  }
  handleOrderChange(event) {
    this.setState({order: event.target.value,filteredBooks: sortByKey(this.state.filteredBooks,this.state.sort, event.target.value)});
  }
  onChangePage = (page) => {
    console.log(Math.ceil(this.state.filteredBooks.length/pageSize));
    this.setState({
      currentPage: page,
    });
  }
  render() {
    return (
      <div>
        <div style={styles.sortDivStyle}>
          <p> Browse By genre:</p>
          <select style={styles.selectStyle} defaultValue={this.state.genre} onChange={this.handleGenreChange}>
            <option value="All">All</option>
            <option value="Biography">Biography</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Comic">Comic</option>
          </select>
          <p> Sort By:</p>
          <select style={styles.selectStyle} defaultValue={this.state.sort} onChange={this.handleSortChange}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="releaseDate">Release Date</option>
          </select>
          <p>Order:</p>
          <select style={styles.selectStyle} defaultValue={this.state.order} onChange={this.handleOrderChange}>
            <option value={1}>Ascending</option>
            <option value={-1}>Descending</option>
          </select>
        </div>
        <div style={styles.booksStyle}>
          {this.state.filteredBooks.map((book,i)=>
            (i<this.state.currentPage*pageSize && i>=(this.state.currentPage-1)*pageSize?
            <Book key ={i}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  imageSrc={book.imageSrc}
                  genre={book.genre}
                  rating={book.rating}
                  price={book.price}
                  releaseDate={book.releaseDate}
                  description={book.description}
                  /> : null)
          )}

        </div>
        <Pagination onChange={this.onChangePage}
                    current={this.state.currentPage}
                    total={this.state.filteredBooks.length}
                    pageSize={pageSize}
                    showTitle={false}/>
      </div>
    );
  }
}

function sortByKey(array, key,order) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if(x<y){
          return -1 * order;
        }else if(x>y){
          return 1 * order;
        }else{
          return 0
        }
    });
}

function filterByGenre(array,genre){
  return array.filter(function(book){
    return book.genre===genre || genre==="All";
  })
}
var styles={
  booksStyle:{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  sortDivStyle:{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  selectStyle:{
    marginLeft:"2px",
    marginRight: "10px",
    height:"1.25em",
  }
}
export default BookList;
