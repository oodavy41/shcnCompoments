/* eslint-disable react/no-deprecated */
import React, { Component } from "react";
import "./PanelBoard.css";

import ManagementPanel from "./components/ManagementPanel.jsx";
import SaftyPanel from "./components/SaftyPanel.jsx";
import ServicePanel from "./components/ServicePanel.jsx";

import saftyTitle from "./assets/saftyTitle.png";
import managementTitle from "./assets/managementTitle.png";
import serviceTitle from "./assets/serviceTitle.png";

export default class PanelBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picked: -1
    };
  }

  render() {
    const panelMap = [
      <ManagementPanel showIF={this.props.showIF}></ManagementPanel>,
      <SaftyPanel showIF={this.props.showIF}></SaftyPanel>,
      <ServicePanel showIF={this.props.showIF}></ServicePanel>
    ];

    return (
      <div
        className={`titleBottons ${this.props.CNBoard ? "CNBoard" : ""}`}
        style={{
          zIndex: 9000
        }}
      >
        <div
          className={`titleCells ${
            this.state.picked === 1 ? "pickedCell" : ""
          }`}
          style={{
            float: "left",
            backgroundImage: `url(${managementTitle})`
          }}
          onClick={() => {
            if (this.props.CNBoard) {
              if (this.state.picked === 1) {
                this.setState({ picked: -1 });
              } else {
                this.setState({ picked: 1 });
              }
            }
          }}
        />
        <div
          className={`titleCells ${
            this.state.picked === 2 ? "pickedCell" : ""
          }`}
          style={{
            float: "left",
            backgroundImage: `url(${saftyTitle})`
          }}
          onClick={() => {
            if (this.state.picked === 2) {
              this.setState({ picked: -1 });
            } else {
              this.setState({ picked: 2 });
            }
          }}
        />
        <div
          className={`titleCells ${
            this.state.picked === 3 ? "pickedCell" : ""
          }`}
          style={{
            float: "right",
            backgroundImage: `url(${serviceTitle})`
          }}
          onClick={() => {
            if (this.state.picked === 3) {
              this.setState({ picked: -1 });
            } else {
              this.setState({ picked: 3 });
            }
          }}
        />
        {this.state.picked !== -1 ? panelMap[this.state.picked - 1] : ''}
      </div>
    );
  }
}
