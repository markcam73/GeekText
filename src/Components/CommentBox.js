import React, { Component } from 'react';

class CommentBox extends Component {
  loadCommentsFromServer() {
	  //old ajax 
	  
	  var _this = this;
	  API.getRequest('/books'/ + this.state.book.id + '/comments').then((jsonRes)=>{
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
  getInitialState() {
    return {comments: []};
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
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
};
export default CommentBox