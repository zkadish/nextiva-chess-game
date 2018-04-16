import React from "react";

class Figure extends React.Component {
  constructor(props) {
    super(props);
    this.state = { _st: "this is default state prop" };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("handler Chilren click", this.props);
    this.props.handler(e);
  }

  render() {
    return <button onClick={this.handleClick}>[P (pawn)]</button>;
  }
}

export default Figure;
