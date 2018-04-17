import React from "react";

class FieldBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { _st: "this is default state prop" };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handler(this.props.position, this.props.title);
  }

  render() {
    return (
      <div onClick={this.handleClick} style={{ display: "inline-block" }}>
   |   {this.props.position} - {this.props.title}   |
      </div>
    );
  }
}

export default FieldBase;
