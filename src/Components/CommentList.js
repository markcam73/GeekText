import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  render() {
    var commentNodes = this.props.comments.map(function(comment,i) {
      return (
        <Comment author={comment.firstName + " " + comment.lastName} key={i}>
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
