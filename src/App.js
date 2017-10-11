import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {hashHistory} from 'react-router';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <button onClick={()=>hashHistory.push({pathname: ("/home/"), state: {username:this.props.location.state.username}}, "/home/", {})}>Home</button>
        <button onClick={()=>hashHistory.push({pathname: ("/books/"), state: {username:this.props.location.state.username}}, "/books/", {})}>Books</button>
        <button onClick={()=>hashHistory.push({pathname: ("/profile/"+ this.props.location.state.username), state: {username:this.props.location.state.username}}, "/profile/" + this.props.location.state.username, {})}>Profile</button>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
