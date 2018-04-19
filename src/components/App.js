import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Signin from './Signin';
import Signup from './Signup';
import Lobby from './Lobby';
import route from '../redux/actions/route';
import login from '../redux/actions/login';
import { USER } from '../redux/constants/user';

// import './App.scss';
import Game from './Game';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    if (USER) {
      this.props.login(USER);
      this.props.route('lobby');
    }
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
          <Game/>
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
const mapDispatchToProps = ( dispatch ) => ({ 
  route: (payload) => route(dispatch, payload),
  login: (payload) => login(dispatch, payload)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);