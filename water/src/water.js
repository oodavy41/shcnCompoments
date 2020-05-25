import React, { Component } from "react";
import { get, post } from "./tools/http";
import main from "./main";
import "./water.css";
export default class AQI extends main {
  constructor(props) {
    super(props);
    this.path = "/getswaterrate.do";
    this.state = {
      month: 1,
      year: 1
    };
    this.raw = {
      monthMap: {
        haveData: "1",
        rate_hege: 1,
        rate_buhege: 0,
        data: [
          { name: "合格", value: "9" },
          { name: "不合格", value: "0" }
        ]
      },
      yearMap: {
        haveData: "1",
        rate_hege: 1,
        rate_buhege: 0,
        data: [
          { name: "合格", value: "9" },
          { name: "不合格", value: "0" }
        ]
      }
    };
  }
  componentDidMount() {
    super.componentDidMount();
  }

  dataTransfer(data) {
    data = data || this.raw;
    this.setState({
      month: data.monthMap.rate_hege || this.raw.monthMap.rate_hege,
      year: data.yearMap.rate_hege || this.raw.yearMap.rate_hege
    });
  }

  render() {
    let { month, year } = this.state;

    return (
      <div className="water_main">
        <div
          className="water_title"
          onClick={() => {
            this.props.showIF("http://10.207.239.66:8008/home.html?siteType=water", 1);
          }}
        >
          市考水质断面
        </div>
        <div className="water_board">
          <div className="water_subtitle">
            <p>上&emsp;月</p> <p>达标率</p>
          </div>
          <div className="water_bgvalue">
            {parseInt(month * 100) + "%"}
            <svg width="140" height="140">
              <circle cx="70" cy="70" r="60" strokeWidth="10" stroke="#D1D3D7" fill="none"></circle>
              <circle
                cx="70"
                cy="70"
                r="60"
                strokeWidth="10"
                stroke="#29bb1a"
                fill="none"
                transform="matrix(0,-1,1,0,0,140)"
                strokeDasharray={`${380 * month} 380`}
              ></circle>
            </svg>
          </div>
        </div>
        <div className="water_board">
          <div className="water_subtitle">
            <p>本&emsp;年</p> <p>达标率</p>
          </div>
          <div className="water_bgvalue">
            {parseInt(year * 100) + "%"}
            <svg width="140" height="140">
              <circle cx="70" cy="70" r="60" stroke-width="10" stroke="#D1D3D7" fill="none"></circle>
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke-width="10"
                stroke="#29bb1a"
                fill="none"
                transform="matrix(0,-1,1,0,0,140)"
                stroke-dasharray={`${380 * year} 380`}
              ></circle>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
