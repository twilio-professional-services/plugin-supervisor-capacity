import React from 'react';

export default class TestComponent extends React.Component {
  render() {
    window.log("Test Component Rendering");

    let contents = this.props.contents || "Test Component"
    let style = {
      backgroundColor: this.props.color || "#00FF00",
      margin: "0px auto",
      padding: "5px",
      fontWeight: "bold"
    }
    return <div style={style}>{contents}</div>
  }
}