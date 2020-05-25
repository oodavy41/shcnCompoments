import React, { Component } from "react";
import "../PanelBoard.css";

import serviceCN from "../assets/service.png";

export default class PanelBoard extends Component {
  render() {
    return (
      <div
        className={`contentBoard`}
        style={{
          backgroundImage: `url(${serviceCN})`
        }}
      >
      </div>
    );
  }
}
