import React, { Component } from "react";
import Cameras from "./Cameras.jsx";
import NcovTable from "./NcovTable.jsx";
import "../PanelBoard.css";

import saftyCN from "../assets/safty.png";

export default class PanelBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownNcov: false
    };        
  }
  render() {
    return (
      <div
        className={`contentBoard`}
        style={{
          backgroundImage: `url(${saftyCN})`
        }}
      >
        <Cameras />
        <div
          className="shownNcov"
          onClick={() => {
            this.setState({ shownNcov: true });
          }}
        ></div>
        {this.state.shownNcov ? (
          <NcovTable>
            <div
              className="closeNcov"
              onClick={() => {
                this.setState({ shownNcov: false });
              }}
            >
              x
            </div>
          </NcovTable>
        ) : (
          ""
        )}
      </div>
    );
  }
}
