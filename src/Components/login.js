import React, { Component } from 'react';
import {hashHistory} from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

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
    var successfulLogin = this.state.username!=="";
    if(successfulLogin){
      hashHistory.push({pathname: ("/home/"), state:{username:this.state.username}}, "/home/", {})
    }
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
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <input type="submit" value="Submit" />
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
