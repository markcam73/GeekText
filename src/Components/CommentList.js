import React, { Component } from 'react';
import Comment from './comment';

class CommentList extends Component {
  render() {
    var commentNodes = this.props.comments.map(function(comment,i) {
      return (
        <Comment author={comment.userID} key={i}>
          {comment.comment}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
};
export default CommentList;
