import React, { Component } from 'react';
var Remarkable = require('remarkable');

class Comment extends Component {
	constructor(props){
		super(props)
		this.rawMarkup = this.rawMarkup.bind(this)
	}
rawMarkup() {

   var md = new Remarkable();
   var rawMarkup = md.render(this.props.children.toString());
   return { __html: rawMarkup };
 }

 render() {
   return (
     <div className="comment">
       <h5 className="commentAuthor">
         &nbsp; {this.props.author}
       </h5>
       <span dangerouslySetInnerHTML={this.rawMarkup()} />
     </div>
   );
 }
}
export default Comment
