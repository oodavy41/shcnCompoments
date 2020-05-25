import React, { Component } from "react";
import Aqi from "./AQI";
export default class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%"}}>
        <Aqi></Aqi>
      </div>
    );
  }
}
