import React, { Component } from 'react';
import {hashHistory} from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', incorrect:false};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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

    var data = JSON.stringify( payload );
    var _this = this;
    fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
    }).then((res) => {
        res.json().then(function(jsonRes){
          if (jsonRes.status==200){
            window.sessionStorage.token=jsonRes.token;
            hashHistory.push({pathname: ("/home/"), state:{username:_this.state.username}}, "/home/", {})
          }else{
            _this.setState({incorrect: true});
          }
        });
    })
    // var successfulLogin = this.state.username!=="";
    // if(successfulLogin){
    //   hashHistory.push({pathname: ("/home/"), state:{username:this.state.username}}, "/home/", {})
    // }
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
