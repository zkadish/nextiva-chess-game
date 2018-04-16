import React from "react";

import Chess from "chess.js";
import Figure from "./Figure";
/*
export  ({name}) => {

  

  
  return (
    <div>Hello, this is chessboard</div>
  )
};

*/
class Chessboard extends React.Component {
  constructor(props) {
    super(props);
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

    //TODO: need to create more sophisticated store style

    this.state = {
      selected: false,

      white: {
          figures: [
            {pawn:'a2'},
            {pawn:'a3'}
          ]
      },
      black: {

      }
    }
  }
  

  parentHander(e) {
    e.preventDefault()
   console.log('any parent action', this)
  
  }

//TODO: need to create figures factory
//TODO: need to create start config for table


  render() {
    return (
      <div>
        <div>this is chessboard</div>

        <Figure handler = {this.parentHander} color="white" name="pawn" location= {this.state.white.figures[0].pawn}/>
        <Figure handler = {this.parentHander} color="white" name="pawn" location={this.state.white.figures[1].pawn}/>
        
        

      </div>
    );
  }
}

export default Chessboard;
