import React, { Component } from 'react';

import Header from './Header';
// import Signin from './Signin';
// import Signup from './Signup';
import Lobby from './Lobby';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <Signup /> */}
        {/* <Signin /> */}
        <Lobby />
      </div>
    );
  }
}

export default App;
