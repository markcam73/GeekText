import React, { Component } from 'react';
import BookList from './bookList';

class BookpageByAuthor extends Component{
    render(){
        return(

            <div>
            <h1><center>Learn more about <b>{this.props.params.author}</b></center></h1>
            <h2><center>{this.props.params.authorBio}</center></h2>
                <BookList author={this.props.params.author}
                          pageSize={9}
                          hideSort={true}/>
            }
            </div>
        );
    }
}
export default BookpageByAuthor;
