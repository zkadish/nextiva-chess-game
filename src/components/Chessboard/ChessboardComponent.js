import React from "react";
import Chess from "chess.js";
import { connect } from "react-redux";

import Tile from "./Tile";
import "./chessboard.scss";

import { createRoom, joinRoom, watchRoom } from "../../redux/actions/entranceActions";
import { initializeBoard, makeMove, giveUp } from "../../redux/actions/BoardActions";
import { Button } from '@nextiva/next-ui';


class ChessboardComp extends React.Component {
  constructor(props) {
    super(props);

    this.chess = new Chess();
    this.chess.clear();

    this.state = {
      isInited: false,
      selectedTileID: '',
      notConfirmedFEN: ''
    };
  }

  // componentWillMount() {
  //   if (this.state.isInited === false) {
  //     this.props.initializeBoard();
  //   }

  // }


  getSimpleMoves(tileID) {
    let movesSet = new Set();
    this.chess.moves({ square: tileID, verbose: true }).forEach((element) => { movesSet.add(element.to) });
    return movesSet;
  }



  initTiles(value) {
    let tiles = [];

    this.chess.load(value);
    let movesSet = this.getSimpleMoves(this.state.selectedTileID);
    this.chess.SQUARES.forEach((element, index) => {
      tiles.push(
        <Tile
          key={element}
          name={element}
          className={this.chess.square_color(element)}
          handleClick={this.tileHandler}
          piece={this.chess.get(element)}
          move={movesSet.has(element)}
          selected={this.state.selectedTileID == element}
        />
      );
    });

    return tiles;
  }

  //Temporary functional. Mock for server resp
  createRoom = name => { this.props.createRoom(); };
  joinRoom = name => { this.props.joinRoom(); };
  watchRoom = name => { this.props.watchRoom(); };
  makeMove(param) { this.props.makeMove(param); }

  tryToInit() {
    if (this.props.player1 && !this.state.isInited) {
      this.setState({ isInited: true })
      return this.props.initializeBoard()
    }
    return
  }
  tileHandler = (name) => {
    console.log(name);

    if (!this.state.selectedTileID && this.chess.get(name)) {
      let moves = this.getSimpleMoves(name);
      if (moves.size > 0) {
        this.selectTile(name);
        console.log("selectedTileID", name);
      }
    }
    else if (this.state.selectedTileID) {
      let moves = this.getSimpleMoves(this.state.selectedTileID);
      if (moves.size > 0 && moves.has(name)) {

        this.chess.move({ from: this.state.selectedTileID, to: name });
        this.setNotConfirmedFEN(this.chess.fen());
        this.selectTile();
      } else {
        this.selectTile();
      }
    }
  }
  setNotConfirmedFEN(FEN) {
    this.setState({ notConfirmedFEN: FEN });
  }
  selectTile(ID) {
    this.setState({ selectedTileID: ID });
  }
  onCancelClick = () => {
    this.selectTile();
    this.setNotConfirmedFEN();
  }

  onConfirmClick = () => {
    if (this.state.notConfirmedFEN) {
      this.setNotConfirmedFEN();
      this.props.makeMove(this.state.notConfirmedFEN);
    }
  }
  render() {
    /* temporarty validation for nondefault FEN */
    this.tryToInit()
    return (

      <div>
        {/* buttons and methods for them just for debugging */}
        <button onClick={this.createRoom} a="asd">Create Room</button>
        <button onClick={this.joinRoom}>Join Room</button>
        <button onClick={this.watchRoom}>As Watcher</button>
        <button onClick={this.makeMove.bind(this, 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3')}>MakeMove</button>


        <div className="chessboard_container">
          <div className="chessboard_board">
            {this.initTiles(this.state.notConfirmedFEN ? this.state.notConfirmedFEN : this.props.fen)}
          </div>
          <div className="chessboard_buttons">
            <Button kind='warning' onClick={this.onCancelClick}>Cancel</Button>
            <Button kind='success' onClick={this.onConfirmClick}>Confirm</Button>
          </div>
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
    makeMove: (param) => dispatch(makeMove(param)),
    //TODO: unimplemented yet
    giveUp: () => dispatch(giveUp())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessboardComp);