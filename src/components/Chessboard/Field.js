import React from "react";

class FieldBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { _st: "this is default state prop" };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("child is called", this.props);
    //this.props.handler();
  }

  render() {
    return (
      <div onClick={this.handleClick} style={{ display: "inline-block" }}>
   |   {this.props.name}   |
      </div>
    );
  }
}

export default FieldBase;
