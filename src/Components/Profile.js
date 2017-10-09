import React, { Component } from 'react';
import {hashHistory} from 'react-router';


class Profile extends Component {
  render() {
    return (
      <div onClick={()=>{hashHistory.push({pathname: ("/profile/" + this.props.id), state: {}}, "/profile/" + this.props.id,{})}}>
        <h1>{this.props.FirstName} + " " + {this.props.LastName} + " Profile"</h1>
        <p>Username: {this.props.username}</p>
        <p>Email: {this.props.Email}</p>
        <p>Address: {this.props.HomeAddress}</p>
      </div>
    );
  }
}
var styles ={
  divStyle:{
    display: "inline-block",
    marginBottom: "8px",
    width: "calc(25% - 4px)",
    marginRight: "8px",
    cursor: "hand"
  },
  imgStyle:{
    width:"100%"
  },
  ratingDiv:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height:"19px"
  }
}
export default Profile;
