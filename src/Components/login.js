import React, { Component } from 'react';
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
          
          <h1>GeekText <img src="favicon.ico" alt="icon" style={{width: '32px', height: '32px'}}></img></h1>
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
        <a href="#/signup" onClick={()=>API.changePath("/signup")}>Sign up</a>
      </div>
    );
  }
}
var styles={
  containerStyle:{
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"

  },
  title:{
  backgroundColor: "#222",
  padding: "8px",
  color: "white",
  textAlign: "center",
  lineHeight: "1px",
  position: "fixed",
  width:"100%",
  }
}
export default Login;
