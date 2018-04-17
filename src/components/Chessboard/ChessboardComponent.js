import React from "react";
import Chess from "chess.js";
import { connect } from "react-redux";

import Tile from "./Tile";
import './chessboard.scss';
import { INIT_START } from "../../redux/constants/ActionTypes";
import { initializeBoard } from "../../redux/actions/BoardActions";

//TODO: need to create start config for table

class ChessboardComp extends React.Component {
  constructor(props) {
    super(props);
    this.chess = new Chess();
    this.state = {
      isInited: false
    };

  }

  //Making request to get default chessboard state with figures
  componentWillMount() {
    if (this.state.isInited === false) {
      this.props.initializeBoard();
    }

  }

  tileHandler = (name) => {
    console.log("any parent action", this);
    console.log(name);
  }


  initTiles(value) {
    let tiles = []
    this.chess.load(value);
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
  render() {
    return (
      <div className="chessboard">
        {this.initTiles(this.props.fen)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fen: state.fen
  };
};

const mapDispatchToProps = dispatch => {
  //TODO: move dispatch to another class
  return {
    initializeBoard: () => {
      dispatch({ type: INIT_START });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessboardComp);
