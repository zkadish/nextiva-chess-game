import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Signin from './Signin';
import Signup from './Signup';
import Lobby from './Lobby';

// import './App.scss';
import ChessboardComponent from './Chessboard/ChessboardComponent';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate(){
    this.renderCurrentComponent();
  }

  renderCurrentComponent() {
    switch (this.props.component) {
      case 'signup':
        return (
          <Signup/>
        );
      case 'lobby':
        return (
          <Lobby />
        );
      case 'chessboard':
        return (
          <ChessboardComponent/>
        )
      default: 
        return (
          <Signin />
        )
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        { this.renderCurrentComponent() }
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({ component: state.route.component });

export default connect(mapStateToProps)(App);