import React, { Component } from "react";
import axios from "axios";
import bgRight from "./assets/bgRight.png";

export default class Right extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thing: +localStorage.getItem("gridCenterWarnNum") || 8,
    };
  }
  componentWillUnmount() {
    this.requestTimer && clearInterval(this.requestTimer);
    this.timer && clearInterval(this.timer);
  }
  componentDidMount() {
    let { police, thing } = this.state;
    // eslint-disable-next-line no-unused-vars
    this.updateAlarmCount();
    this.timer = setInterval(() => {
      this.updateAlarmCount();
    }, 60 * 1000);
  }

  updateAlarmCount() {
    var token_HESHENG = localStorage.getItem("token");
    axios
      .get(
        "http://bigdata.cn.gov:8080/visdata/rest/sign/signservice/FindEmergencyCount",
        {
          headers: {
            Token: token_HESHENG
          }
        }
      )
      .then(d => {
        this.setState({
          thing: d.data.result
        });
      })
      .catch(error => {
        console.error("error!:", error.response);
      });
  }

  render() {
    let { thing } = this.state;
    return (
      <div
        style={{
          minHeight: 1010,
          fontFamily: "微软雅黑",
          // textAlign: 'center',
          position: "absolute",
          top: 0,
          right: 0,
          width: 650,
          padding: "70px 0 0",
          background: `url(${bgRight})no-repeat center center`,
          backgroundSize: "cover",
          transition: " all .5s cubic-bezier(.33,-0.12,.25,2)",
          WebkitTransition:
            'transition:" all .5s cubic-bezier(.33,-0.12,.25,2)"'
        }}
      >
        <div
          // 当日突发事件总数
          style={{
            zIndex: 999,
            width: 588,
            height: 300,
            position: "absolute",
            top: 105,
            left: 60
          }}
        >
          <span
            style={{
              float: "left",
              color: "#fefdfb",
              fontSize: "32px",
              lineHeight: "32px"
            }}
          >
            当日紧急情况总数
          </span>
          <span
            style={{
              position: "absolute",
              top: 51,
              fontSize: 48,
              color: "#fff",
              left: 10,
              lineHeight: "48px"
            }}
            onClick={e => {
              console.log("CLICK");
              if (e.shiftKey) {
                this.setState({ thing: +this.state.thing + 1 });
              }
              if (e.ctrlKey && this.state.thing > 0) {
                this.setState({
                  thing: this.state.thing - 1
                });
              }
              localStorage.setItem("gridCenterWarnNum", this.state.thing);
            }}
          >
            {thing}
          </span>
          <span
            style={{
              position: "absolute",
              top: 115,
              left: 10,
              fontSize: "20px",
              color: "#fff"
            }}
          >
            响应率：
            <span
              style={{ fontSize: "18px", fontFamily: "FranklinGothic-Medium" }}
            >
              100%
            </span>
          </span>
        </div>
      </div>
    );
  }
}
