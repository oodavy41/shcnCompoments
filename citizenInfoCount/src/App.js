import React, { Component } from "react";
import "./App.css";
export default class App extends Component {
  render() {
    console.log("citizen infos", this.props.data);
    let data = this.props.data || {
      house: 335042,
      population: 948081,
      crop: 40230,
    };
    let { house, population, crop } = data;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            fontSize: 24,
            lineHeight: "24px",
            letterSpacing: "1px",
            color: "#fff",
          }}
        >
          <span>实有人口</span>
          <span>实有企业</span>
          <span>实有房屋</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 127,
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            lineHeight: "127px",
          }}
        >
          <span className="threeCircle">
            {(population/10000).toFixed(1)}
            <span style={{ fontSize: 18 }}>万</span>
          </span>
          <span className="threeCircle">
            {(crop/10000).toFixed(2)}<span style={{ fontSize: 18 }}>万</span>
          </span>
          <span className="threeCircle">
            {(house/10000).toFixed(1)}<span style={{ fontSize: 18 }}>万</span>
          </span>
        </div>
      </div>
    );
  }
}
