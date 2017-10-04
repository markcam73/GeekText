import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {hashHistory} from 'react-router';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <button onClick={()=>hashHistory.push({pathname: ("/home/"), state: {}}, "/home/", {})}>Home</button>
        <button onClick={()=>hashHistory.push({pathname: ("/books/"), state: {}}, "/books/", {})}>Books</button>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
