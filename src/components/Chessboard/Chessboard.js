import React from "react";

import Chess from "chess.js";

import Figure from "./Figure";
import Field from "./Field";

/*
export  ({name}) => {
  
  return (
    <div>Hello, this is chessboard</div>
  )
};

*/
class Chessboard extends React.Component {
  constructor(props) {
    //--------------------
    super(props);

    //TODO: need to create more sophisticated store style

    this.state = {
      selected: false,
      turn: "w",

      white: {
        figures: [{ pawn: "a2" }, { pawn: "a3" }]
      },
      black: {}
    };
  }

  parentHander(e) {
    e.preventDefault();
    console.log("any parent action", this);
    console.log(e.target);
  }

  fieldHandler(e) {
    e.preventDefault();
    console.log("field click", this);
  }

  //TODO: need to create figures factory
  //TODO: need to create start config for table

  init() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    let finalArray = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        finalArray.push((letters[i] + numbers[j]).toString());
      }
    }
    return finalArray;
  }

  render() {
    return (
      <div>
        <div>this is chessboard</div>

        <Figure
          handler={this.parentHander}
          color="white"
          name="pawn"
          location={this.state.white.figures[0].pawn}
        />
        <Figure
          handler={this.parentHander}
          color="white"
          name="pawn"
          location={this.state.white.figures[1].pawn}
        />

        {
          <div>

            {this.init().map(function(name, index) {
              // console.log(name, index);

              let simple = <b key={index}>[{name}]</b>;
              let nonSimple = <b key={index}>[{name}]</b>;

              if (index % 8 === 0) {
                return nonSimple;
              }
              return simple;
            })}
            
          </div>
        }

        <br />

        <Field handler={this.fieldHandler} location="a2" />
      </div>
    );
  }
}

export default Chessboard;

/*
    let chess = new Chess();

    chess.header("White", "Morphy", "Black", "Anderssen", "Date", "1858-12-01");

    chess.move("e2-e4", { sloppy: true });
    // console.log('!', chess.ascii())

    chess.move("e7-e5", { sloppy: true });
    // console.log('!', chess.ascii())

    chess.move("Pf2-f4", { sloppy: true });
    console.log("!", chess.ascii());
    console.log("chess moves for e5:", chess.moves({ square: "e5" }));
    console.log("chess moves for e4:", chess.moves({ square: "e4" }));

    chess.move("Pe5xf4", { sloppy: true }); //Pe5xf4
    console.log("!", chess.ascii());

    console.log(
      "HEADER: black:",
      chess.header().Black,
      "white:",
      chess.header().White
    );
    console.log(chess.turn());
    */
