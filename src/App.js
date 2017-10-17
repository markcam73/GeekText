import React, { Component } from 'react';
import './App.css';
import {hashHistory} from 'react-router';
import API from './API';

class App extends Component {
  constructor(props){
    super(props)
    if(this.props.location.state){
      this.state={username:this.props.location.state.username}
    }else if(window.sessionStorage.token) {
      var payload = {
          token: window.sessionStorage.token
      };
      var _this = this;
      API.postRequest(payload, '/profile/mine').then((jsonRes) => {
            if (jsonRes.status===200){
              _this.setState({username: jsonRes.username})
            }else{

            }
      })
    }else{
      API.changePath("/",{})
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <button onClick={()=>API.changePath("/home/",{username:this.state.username})}>Home</button>
        <button onClick={()=>API.changePath("/books/",{username:this.state.username})}>Books</button>
        <button onClick={()=>API.changePath("/profile/" + this.state.username,{username:this.state.username})}>Profile</button>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
