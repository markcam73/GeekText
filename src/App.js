import React, { Component } from 'react';
import './App.css';
import {hashHistory} from 'react-router';


class App extends Component {
  constructor(props){
    super(props)
    if(this.props.location.state){
      this.state={username:this.props.location.state.username}
    }else if(window.sessionStorage.token) {
      var payload = {
          token: window.sessionStorage.token
      };

      var data = JSON.stringify( payload );
      var _this = this;
      fetch("http://localhost:5000/profile/mine", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: data
      }).then((res) => {
          res.json().then(function(jsonRes){
            if (jsonRes.status===200){
              _this.setState({username: jsonRes.username})
            }else{

            }
          });
      })
    }else{
      hashHistory.push({pathname: ("/"), state: {}}, "/", {})
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <button onClick={()=>hashHistory.push({pathname: ("/home/"), state: {username:this.state.username}}, "/home/", {})}>Home</button>
        <button onClick={()=>hashHistory.push({pathname: ("/books/"), state: {username:this.state.username}}, "/books/", {})}>Books</button>
        <button onClick={()=>hashHistory.push({pathname: ("/profile/"+ this.state.username), state: {username:this.state.username}}, "/profile/" + this.state.username, {})}>Profile</button>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
