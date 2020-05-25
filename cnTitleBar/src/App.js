import React, { Component } from "react";
import TitleBoard from "./PanelBoard.jsx";

import logo3 from "./assets/logo3.png";
import cityLogo from "./assets/cityLogo.png";
import roadLine from "./assets/roadLine.png";

export default class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            overflow: "hidden"
          }}
        >
          <img src={logo3} style={{ float: "left" }} alt="" />
        </div>
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 88,
            overflow: "hidden"
          }}
        >
          <img src={cityLogo} alt="" />
        </div>
        <img
          src={roadLine}
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)"
          }}
          alt=""
        />
        <TitleBoard
          CNBoard={true}
          showIF={(e, i) => {
            this.setIFshown(e, i);
          }}
        />
      </div>
    );
  }
}
