import React, { Component } from 'react';
import {hashHistory} from 'react-router';
import API from '../API';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: '', password: '', incorrect:false};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }
  componentDidMount(){
    if(window.sessionStorage.token){
      API.changePath("/home/",{})
    }
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleLogin(event) {
    var payload = {
        username: this.state.username,
        password: this.state.password
    };
    var _this = this;
    API.postRequest(payload,'/login').then((jsonRes) => {
          if (jsonRes.status===200){
            window.sessionStorage.token=jsonRes.token;
            API.changePath("/home/",{username:_this.state.username})
          }else{
            _this.setState({incorrect: true});
          }
    })
    event.preventDefault();
  }

  render() {
    return (
      <div style={styles.containerStyle} >
        <form style={styles.containerStyle} onSubmit={this.handleLogin}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <input type="submit" value="Submit" />
          {this.state.incorrect ? <p>Incorrect username or password</p> : null}
        </form>
      </div>
    );
  }
}
var styles={
  containerStyle:{
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto"
  }
}
export default Login;
