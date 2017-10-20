import React, { Component } from 'react';
import API from '../API';
class Profile extends Component {
  constructor(supplied) {
    super(supplied);
    this.state={
      user:{}
    }
  }
  componentWillMount(){
    var username = this.props.params.username;
    console.log(username);
    var _this = this;
    API.getRequest('/profile/' + username).then(function(data){
      _this.setState({user:data});
    })
  }
  render() {
    return (
      <div style={styles.divStyle}>
        <h1>Profile</h1>
        <p>Username: {this.state.user.username}</p>
        <p>FirstName: {this.state.user.firstName}</p>
        <p>LastName: {this.state.user.lastName}</p>
        <p>Email: {this.state.user.email}</p>
        <p>Address: {this.state.user.homeAddress}</p>
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
