import React from "react";
import Chess from "chess.js";
import { connect } from "react-redux";

import Field from "./Field";
import { INIT_START } from "../../constants/ActionTypes";
import { initializeBoard } from "../../actions/BoardActions";

//TODO: need to create start config for table

class ChessboardComp extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      isInited: false
    };

    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    if (this.state.isInited === false) {
      this.props.initializeBoard();
    }
  }

  handler() {
    console.log("handler is called")
  }

  render() {
    let arr = this.props.chessboard;

    return (
      <div>
        <div>Hello, I'm a chessboard</div>

        <div>
          {arr !== "return default type"  &&
            arr.map(function(name, index) {
              if (name === "BR") return <br key={index} />
              {/* FIXME: handler is not a function */}
              return <Field
          //    handler={this.handler}
              name={name}
              key={index}
              />;
            })}
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
