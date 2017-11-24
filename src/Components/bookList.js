import React, { Component } from 'react';
import Book from './Book.js';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import API from '../API'
const pageSize=9;

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state={books: [],filteredBooks:[],sort:"title",order:1,currentPage:1,pageSize:9}
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  componentDidMount(){
    if(this.props.pageSize){
      this.setState({pageSize:this.props.pageSize});
    }
    var _this = this
    if(this.props.author){
      API.getRequest('/books/author/' + this.props.author).then(function(data){
        if(_this.props.skipID!==null){
          data = _this.skipID(data, _this.props.skipID);
        }
        _this.setState({books:data,filteredBooks:sortByKey(data,"title",1)});
      })
    }else if(this.props.genre){
      API.getRequest('/books/genre/' + this.props.genre).then(function(data){
        if(_this.props.skipID !==null){
          data = _this.skipID(data, _this.props.skipID);
        }
        _this.setState({books:data,filteredBooks:sortByKey(data,"title",1)});
      })
    }else{
      API.getRequest('/books').then(function(data){
        if(_this.props.skipID!==null){
          data = _this.skipID(data, _this.props.skipID);
        }
        _this.setState({books:data,filteredBooks:sortByKey(data,"title",1)});
      })
    }

  }
  componentWillReceiveProps(newProps){
    if(newProps.pageSize){
      this.setState({pageSize:newProps.pageSize});
    }
    console.log(newProps);
    var _this = this
    if(newProps.author){
      API.getRequest('/books/author/' + newProps.author).then(function(data){
        if(newProps.skipID!==null){
          data = _this.skipID(data, newProps.skipID);
        }
        _this.setState({books:data,filteredBooks:sortByKey(data,"title",1)});
      })
    }else if(newProps.genre){
      API.getRequest('/books/genre/' + newProps.genre).then(function(data){
        if(newProps.skipID !==null){
          data = _this.skipID(data, newProps.skipID);
        }
        _this.setState({books:data,filteredBooks:sortByKey(data,"title",1)});
      })
    }else{
      API.getRequest('/books').then(function(data){
        if(newProps.skipID!==null){
          data = _this.skipID(data, newProps.skipID);
        }
        _this.setState({books:data,filteredBooks:sortByKey(data,"title",1)});
      })
    }
  }

  skipID(arr, id){
      //It will warn to change this to !== DONT CHANGE
      return arr.filter((e)=>e.id != id);
  }
  handleSortChange(event) {
    this.setState({sort: event.target.value,filteredBooks: sortByKey(this.state.filteredBooks,event.target.value, this.state.order)});
  }
  handleGenreChange(event) {
    this.setState({currentPage: 1, genre: event.target.value,filteredBooks: sortByKey(filterByGenre(this.state.books,event.target.value),this.state.sort,this.state.order)});
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
        {this.props.hideSort !== true?
        <div style={styles.sortDivStyle}>
          <p style={styles.selectLabelStyle}> Genre</p>
          <select style={styles.selectStyle} defaultValue={this.state.genre} onChange={this.handleGenreChange}>
            <option value="All">All</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
            <option value="Mystery, Thriller & Suspense">Mystery, Thriller & Suspense</option>
            <option value="Literature & Fiction">Literature & Fiction</option>
            <option value="Humor & Satire">Humor & Satire</option>
          </select>
          <p style={styles.selectLabelStyle}> Sort by</p>
          <select style={styles.selectStyle} defaultValue={this.state.sort} onChange={this.handleSortChange}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="releaseDate">Release Date</option>
          </select>
          <p style={styles.selectLabelStyle}>Order</p>
          <select style={styles.selectStyle} defaultValue={this.state.order} onChange={this.handleOrderChange}>
            <option value={1}>Ascending</option>
            <option value={-1}>Descending</option>
          </select>
        </div> : null}
        <div style={styles.booksStyle}>
          {this.state.filteredBooks.map((book,i)=>
            (i<this.state.currentPage*this.state.pageSize && i>=(this.state.currentPage-1)*this.state.pageSize?
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
                  minimal ={this.props.minimal}
                  /> : null)
          )}

        </div>
        {this.props.hidePage !==true?
        <Pagination onChange={this.onChangePage}
                    current={this.state.currentPage}
                    total={this.state.filteredBooks.length}
                    pageSize={this.state.pageSize}
                    showTitle={false}/> :null}
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
    height:"1.8em",
  },
  selectLabelStyle:{
    marginTop:"auto",
    marginBottom:"auto"
  }
}
export default BookList;
