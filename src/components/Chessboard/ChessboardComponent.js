import React from "react";
import Chess from "chess.js";
import { connect } from "react-redux";

import Field from "./Field";
import { INIT_START } from "../../redux/constants/ActionTypes";
import { initializeBoard } from "../../redux/actions/BoardActions";

//TODO: need to create start config for table

class ChessboardComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInited: false
    };

    this.handler = this.handler.bind(this);
  }

  //Making request to get default chessboard state with figures
  componentDidMount() {
    if (this.state.isInited === false) {
      this.props.initializeBoard();
    }
  }

  handler(position = 'default value handler', figure = 'def') {
    console.log("handler is called", position, figure);
  }

  createChessboardTiles(val) {
    let rows = [];
    for (let i = 0; i < val.length; i++) {
      if (i % 8 === 0) {
        rows.push(<br />);
      }
      rows.push(
        <Field
          handler={this.handler}
          key={i}
          position={val[i].position}
          title={val[i].title}
          color={val[i].color}
        />
      );
    }

    return <div>{rows}</div>;
  }

  render() {
    let arr = this.props.chessboard;

    return (
      <div>
        <div>Hello, I'm a chessboard</div>
        <div>
          {arr !== "prevent default type" && this.createChessboardTiles(arr)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chessboard: state.chessboard
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
