import React, { Component } from "react";
import { get, post } from "./tools/http";
import main from "./main";
import "./dusts.css";
export default class Dusts extends main {
  constructor(props) {
    super(props);
    this.path = "/getrealdust.do";
    this.state = {
      builder: [0, 0, 20],
      road: [0, 0, 20]
    };
    this.raw = {
      road: {
        list: [
          { countNum: 1, evalName: "差" },
          { countNum: 1, evalName: "中" },
          { countNum: 18, evalName: "好" },
          { countNum: 20, evalName: "总" }
        ]
      },
      builder: {
        list: [
          { countNum: 1, evalName: "差" },
          { countNum: 1, evalName: "中" },
          { countNum: 18, evalName: "好" },
          { countNum: 20, evalName: "总" }
        ]
      }
    };
  }

  componentDidMount() {
    super.componentDidMount();
  }
  updateData(url) {
    this.dataTransfer(null, "builder");
    this.dataTransfer(null, "road");
    get(url, { projectType: 1 })
      .then(d => {
        var v = d.data;
        console.log(this.path, v);
        this.dataTransfer(v, "builder");
      })
      .catch(e => {
        console.log(e);
      });
    get(url, { projectType: 2 })
      .then(d => {
        var v = d.data;
        console.log(this.path, v);
        this.dataTransfer(v, "road");
      })
      .catch(e => {
        console.log(e);
      });
  }

  dataTransfer(data, flag) {
    data = data || this.raw[flag];
    let ret = [0, 0, 0, 0];
    let map = { 好: 0, 中: 1, 差: 2, 总: 3 };
    data.list.forEach(e => {
      ret[map[e.evalName]] = e.countNum;
    });
    this.setState({ [flag]: ret });
  }

  render() {
    let { builder, road } = this.state;

    return (
      <div className="dust_main">
        <div className="dust_board">
          <div className="dust_subtitle">工地</div>
          <div>
            <div className="dust_value dust_good">{builder[0]}</div>
            <div className="dust_value dust_normal">{builder[1]}</div>
            <div className="dust_value dust_bad">{builder[2]}</div>
          </div>
        </div>
        <div
          className="dust_title"
          onClick={() => {
            this.props.showIF("http://10.207.239.66:8008/home.html?siteType=dust", 1);
          }}
        >
          扬尘监测
        </div>
        <div className="dust_board">
          <div className="dust_subtitle">道路</div>
          <div>
            <div className="dust_value dust_good">{road[0]}</div>
            <div className="dust_value dust_normal">{road[1]}</div>
            <div className="dust_value dust_bad">{road[2]}</div>
          </div>
        </div>
      </div>
    );
  }
}
