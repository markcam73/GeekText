import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to GeekText</h2>
        </div>
        <p className="App-intro">
          We have books.
        </p>
        {this.props.children}
      </div>
    );
  }
}
export default App;
