import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Components/main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-Title">Face coordinates app (in develyopment)</span>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
