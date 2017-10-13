import React, { Component } from 'react';
import BookList from './bookList';
import Shopcart from './shopcart';

class Bookpage extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <BookList />
                    </div>
                    <div className="col-md-4">
                        <Shopcart />
                    </div>
                </div>
            </div>
        );
    }
}
export default Bookpage;
