import React, { Component } from 'react';
import BookList from './bookList';
import API from '../API'

class BookpageByAuthor extends Component{
  constructor(supplied) {
      super(supplied);
      this.state={
        authorBio:""
      }
  }
  componentWillMount(){
    var _this = this;
    API.getRequest("/author/" + this.props.params.author).then((jsonRes)=>{
      _this.setState({authorBio:jsonRes.authorBio})
    })
  }
    render(){
        return(

            <div>
            <h1><center>Learn more about <b>{this.props.params.author}</b></center></h1>
            <h2><small><center>{this.state.authorBio}</center></small></h2>
                <h2><center><b><u>Featured work</u></b></center></h2>
                <BookList author={this.props.params.author}
                          pageSize={9}
                          hideSort={true}/>
            </div>
        );
    }
}
export default BookpageByAuthor;
