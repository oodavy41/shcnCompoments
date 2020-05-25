import React, { Component } from "react";
import MyComponent from "./Alarm.jsx";
export default class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <MyComponent></MyComponent>
      </div>
    );
  }
}
