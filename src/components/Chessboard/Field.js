import React from 'react';

class FieldBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = { _st: "this is default state prop"};
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handler(e);
  }

  render() {
    return <button onClick={this.handleClick}>Empty Field</button>;
  }



}

export default FieldBase;