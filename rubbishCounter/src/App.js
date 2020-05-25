import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    const { dataProvicer: dp } = props;
    console.log(dp)
    this.state = {
      lajiNum1: dp ? dp[0] : 412,
      lajiNum2: dp ? dp[1] : 691,
      lajiNum3: dp ? dp[2] : 1032,
      lajiNum4: dp ? dp[3] : 222,
      lajiNum5: 0.3
    };
  }
  rubbishColor(num) {
    if (num < 300) return "numNormal";
    else if (num < 600) return "numWarn";
    else return "numAlert";
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            width: 174,
            height: 504
          }}
        >
          <span
            style={{
              marginLeft: 32,
              marginTop: 4,
              color: "#fff",
              fontSize: 22,
              lineHeight: "24px",
              letterSpacing: "1px"
            }}
          >
            处置量
            <span style={{ fontSize: 18 }}> (吨/天)</span>
          </span>
          <div
            style={{
              height: 460,
              width: 114,
              display: "flex",
              flexFlow: "row wrap",
              alignContent: "space-between",
              marginTop: 22,
              marginLeft: 47
            }}
          >
            <div className="fourCircle">
              <span
                className={`circleNum ${this.rubbishColor(
                  this.state.lajiNum1
                )}`}
              >
                {this.state.lajiNum1}
              </span>
              <span className="circleText">干垃圾</span>
            </div>
            <div className="fourCircle">
              <span
                className={`circleNum ${this.rubbishColor(
                  600 - this.state.lajiNum2
                )}`}
              >
                {this.state.lajiNum2}
              </span>
              <span className="circleText">湿垃圾</span>
            </div>
            <div className="fourCircle">
              <span
                className={`circleNum ${this.rubbishColor(
                  this.state.lajiNum3
                )}`}
              >
                {this.state.lajiNum3}
              </span>
              <span className="circleText">建筑垃圾</span>
            </div>
            <div className="fourCircle">
              <span
                className={`circleNum ${this.rubbishColor(
                  this.state.lajiNum4
                )}`}
              >
                {this.state.lajiNum4}
              </span>
              <span className="circleText">可回收垃圾</span>
            </div>
            <div className="fourCircle">
              <span
                className={`circleNum ${this.rubbishColor(
                  this.state.lajiNum5
                )}`}
              >
                {this.state.lajiNum5}
              </span>
              <span className="circleText">有害垃圾</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
