import React, { Component } from "react";
import Camera from "./Cameras";
export default class App extends Component {
  render() {
    const { dataProvider } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Camera data={dataProvider}></Camera>
      </div>
    );
  }
}
