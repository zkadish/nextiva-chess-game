import React from "react";
import Chess from "chess.js";
import { connect } from "react-redux";

import Tile from "./Tile";
import "./chessboard.scss";

import { createRoom, joinRoom, watchRoom } from "../../redux/actions/entranceActions";
import { initializeBoard, makeMove } from "../../redux/actions/BoardActions";

class ChessboardComp extends React.Component {
  constructor(props) {
    super(props);

    this.chess = new Chess();
    this.chess.clear();

    this.state = {
      isInited: false
    };
  }

  tileHandler = name => {
    console.log(name);
  };

  initTiles(value) {
    let tiles = [];

    this.chess.load(value);
    console.log(this.chess.ascii());

    this.chess.SQUARES.forEach((element, index) => {
      tiles.push(
        <Tile
          key={element}
          name={element}
          className={this.chess.square_color(element)}
          handleClick={this.tileHandler}
          piece={this.chess.get(element)}
        />
      );
    });
    return tiles;
  }

  //Temporary functional. Mock for server resp
  createRoom = name => {this.props.createRoom();};
  joinRoom = name => {this.props.joinRoom();};
  watchRoom = name => {this.props.watchRoom();};
  makeMove(param) {this.props.makeMove(param);}

tryToInit() {
  if(this.props.player1 && !this.state.isInited) {
    this.setState({isInited:true})
    return  this.props.initializeBoard()
  } 
  return
}
  render() {
    return (
      <div>
        {/* buttons and methods for them just for debugging */}
        <button onClick={this.createRoom} a="asd">Create Room</button>
        <button onClick={this.joinRoom}>Join Room</button>
        <button onClick={this.watchRoom}>As Watcher</button>
        <button onClick={this.makeMove.bind(this, 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3')}>MakeMove</button>
        
        <div className="chessboard">
          {/* temporarty validation for nondefault FEN */}
          {this.tryToInit()}

          {/* TODO: propose: remove initTiles to updateTiles */}
          {this.initTiles(this.props.fen)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //current figure on board potion (including, which turn, turn count, etc) in simple string
    fen: state.fen,
    //player1 in this case always means white
    player1: state.playstate.player1,
    //player on the black side of board
    player2: state.playstate.player2,
    //array of watchers (simply for names displaying / chat / etc)
    watchers: state.playstate.watchers,
    //TODO: not sure, we need it
    entranceType: state.playstate.entranceType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //TODO: unimplemented yet
    createRoom: () => dispatch(createRoom()),
    //runs, when user enter in previously created room. should recieve player1, player2 - strings, watchers - array of strings
    joinRoom: () => dispatch(joinRoom()),
    //currently same as previous
    watchRoom: () => dispatch(watchRoom()),

    //create basic figure set on start position (runs one time)
    initializeBoard: () => dispatch(initializeBoard()),
    //sends to store move, which was confirmed by player by pressing the button
    makeMove: (param) => dispatch(makeMove(param))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessboardComp);