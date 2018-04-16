import React, { Component } from 'react';

import Header from './Header';
import Login from './Login';
// import Lobby from './Lobby';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Login />
        {/* <Lobby /> */}
      </div>
    );
  }
}

export default App;
