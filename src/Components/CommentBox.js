import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import API from '../API';

class CommentBox extends Component {

  constructor(props) {
    super(props)
    this.state= {comments: []};
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }
  loadCommentsFromServer(bookID) {
	  //old ajax

	  var _this = this;
	  API.getRequest('/books/' + bookID + '/comments').then((jsonRes)=>{
		  //jsonRes.status will contain a success 200
		  //jsonRes.comments will be an array of comment objects
		  _this.setState({comments: jsonRes.comments});//
		  })


  }
  handleCommentSubmit(comment) {
    var comments = this.state.comments;

    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});
	//old ajax



  }
  componentDidMount() {
    this.loadCommentsFromServer(this.props.bookID);
    setInterval(()=>this.loadCommentsFromServer(this.props.bookID), this.props.pollInterval);
  }
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}
export default CommentBox;
