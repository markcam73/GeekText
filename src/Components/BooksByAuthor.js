import React, { Component } from 'react';
import BookList from './bookList';
import Shopcart from './shopcart';

class BookpageByAuthor extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <BookList author={this.props.params.author}/>
                    </div>
                    <div className="col-md-2">
                        <Shopcart />
                    </div>
                </div>
            </div>
        );
    }
}
export default BookpageByAuthor;
