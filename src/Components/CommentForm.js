import React, { Component } from 'react';
import API from '../API';
class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {author: '', text: ''};
  }
  componentDidMount(){
    var payload = {
        token: window.sessionStorage.token
    };
    var _this = this;
    API.postRequest(payload, '/profile/mine').then((jsonRes) => {
          if (jsonRes.status===200){
            _this.setState({userID: jsonRes.userID, firstName:jsonRes.firstName, lastName:jsonRes.lastName})
          }
    })
  }
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({userID: this.state.userID, comment: "&emsp;"+ text, firstName:this.state.firstName, lastName: this.state.lastName});
    this.setState({author: '', text: ''});
  }
  render() {
    return (
      <form className="commentForm" onSubmit={(e)=>this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={(e)=>this.handleTextChange(e)}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
};
export default CommentForm
