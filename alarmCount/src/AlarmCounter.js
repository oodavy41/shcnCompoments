import React, { Component } from "react";
import "./Alarm.css";

export default class AlarmCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireWarnShow: false,
      police: [1, 0, 2]
    };
  }
  componentWillUnmount() {}
  componentDidMount() {
    let { police } = this.state;
    // eslint-disable-next-line no-unused-vars
    let timer = setInterval(() => {
      police[0] += Math.round(Math.random());
      police[1] += Math.round(Math.random());
      police[2] += Math.round(Math.random());
      if (police[0] >= 5) {
        police[0] = 1;
        police[1] = 0;
        police[2] = 2;
      }
      this.setState({
        police: [police[0], police[1], police[2]]
      });
    }, 1800000);
  }

  render() {
    let { police } = this.state;
    return (
      <div className="alarmCounterMain">
        <div
          style={{
            width: "100%",
            height: 22,
            display: "flex",
            justifyContent: "space-around",
            fontSize: 18,
            color: "#fff",
            lineHeight: "21px"
          }}
        >
          <span>110接警量</span>
          <span>119接警量</span>
          <span>120接警量</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 96,
            display: "flex",
            justifyContent: "space-around",
            fontSize: 36,
            color: "#fff"
          }}
        >
          <div
            style={{
              // border: '2px solid #14486f',
              // borderRadius: '50%',
              width: 115,
              height: 96,
              backgroundColor: "#144770",
              textAlign: "center",
              lineHeight: "96px",
              borderRadius: "2px"
            }}
          >
            {police[0]}
          </div>
          <div
            style={{
              // border: '2px solid #14486f',
              // borderRadius: '50%',
              width: 115,
              height: 96,
              backgroundColor: "#144770",
              textAlign: "center",
              lineHeight: "96px",
              borderRadius: "2px"
            }}
          >
            {police[1]}
          </div>
          <div
            style={{
              // border: '2px solid #14486f',
              // borderRadius: '50%',
              width: 115,
              height: 96,
              backgroundColor: "#144770",
              textAlign: "center",
              lineHeight: "96px",
              borderRadius: "2px"
            }}
          >
            {police[2]}
          </div>
        </div>
      </div>
    );
  }
}
