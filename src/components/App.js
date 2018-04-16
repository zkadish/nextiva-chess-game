import React, { Component } from 'react';

import Header from './Header';
// import Signin from './Signin';
// import Signup from './Signup';
import Lobby from './Lobby';

import './App.scss';
import Chessboard from './Chessboard/Chessboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <Signup /> */}
        {/* <Signin /> */}
        <Chessboard/>
        {/* <Lobby /> */}
      </div>
    );
  }
}

export default App;
