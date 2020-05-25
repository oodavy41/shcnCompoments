import React, { Component } from "react";
import DashBoardCharts from "./DashBoardCharts";
import videoMeetingICON from "./assets/videomeeting.svg";
import { get } from "./tools/http";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashBroadNum1: [100, 98], // 仪表盘数字
      dashBroadNum2: [100, 89]
    };
  }
  componentDidMount() {
    this.getSaftyNum();
  }
  getSaftyNum() {
    get("http://bigdata.cn.gov:8080/visdata/rest/sign/gridservice/getPazs").then(e => {
      // let value = JSON.parse(e.data.result).data;
      // value = Math.round(value);
      this.setState({ dashBroadNum1: [100, 98] });
    });
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "space-around" }}>
        <div
          className="twoDashBroad"
          onClick={() => {
            this.props.showIMG(saftyChart);
          }}
        >
          <DashBoardCharts style={{ height: "160px", width: "160px", position: "relative" }} value={this.state.dashBroadNum1} />
          <span className="dashBroadText">平安指数</span>
        </div>
        <div className="twoDashBroad">
          <div
            style={{
              backgroundImage: `url(${videoMeetingICON})`,
              backgroundSize: "50% 50%",
              backgroundPosition: "40px 20px",
              backgroundRepeat: "no-repeat",
              opacity: 0.7,
              height: "160px",
              width: "160px"
            }}
          />
          <span className="dashBroadText">视频会议</span>
        </div>

        <div className="twoDashBroad">
          <DashBoardCharts style={{ height: "160px", width: "160px", position: "relative" }} value={this.state.dashBroadNum2} />
          <span className="dashBroadText">文明指数</span>
        </div>
      </div>
    );
  }
}
