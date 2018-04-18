import React, { Component } from 'react';

import Header from './Header';
import Signin from './Signin';
// import Signup from './Signup';
// import Lobby from './Lobby';

import './App.scss';
// import ChessboardComponent from './Chessboard/ChessboardComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ChessboardComponent/>
        {/* <Signin /> */}
        {/* <Lobby /> */}
        {/* <Signup /> */}
      </div>
    );
  }
}

export default App;
