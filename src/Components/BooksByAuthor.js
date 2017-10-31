import React, { Component } from 'react';
import BookList from './bookList';

class BookpageByAuthor extends Component{
    render(){
        return(
            <div>
                <BookList author={this.props.params.author}
                          pageSize={9}/>
            </div>
        );
    }
}
export default BookpageByAuthor;
