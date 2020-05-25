import React, { Component } from "react";
import "./Alarm.css";

export default class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      alarms: []
    };
    this.alert();
  }
  componentDidMount() {
    this.alarmClock = setInterval(() => {
      let r = Math.random();
      if (r > 0.6 && !this.state.alarm) {
        this.alert();
      }
    }, 30000);
  }

  alert() {
    let adds = [
      "愚园路1088弄之1-168号",
      "中山中路999号",
      "法华镇路535号",
      "遵义路100号",
      "娄山关路988号"
    ];
    let types = ["火灾", "报警", "急救"];
    let nowTime = new Date();
    console.log("nowMonth", nowTime.getMonth());
    let attr = {
      title: "突发事件",
      type: types[Math.floor(Math.random() * types.length)],
      addr: adds[Math.floor(Math.random() * adds.length)],
      time: `${nowTime.getMonth() +
        1}月${nowTime.getDate()}日 ${nowTime.getHours()}:${nowTime.getMinutes()}:${nowTime.getSeconds()}`
    };
    this.state.alarms.push(attr);
    this.setState({ alarms: this.state.alarms });
  }

  removeAlert(i) {
    this.state.alarms.splice(i, 1);
    this.setState({ alarms: this.state.alarms });
  }
  clearAlerts() {
    console.log("clear");
    this.setState({ alarms: [] });
  }

  componentWillUnmount() {
    this.alarmClock ? clearInterval(this.alarmClock) : "";
  }

  render() {
    let { alarms: arr } = this.state;
    return (
      <div
        className="alarmMain"
        onMouseLeave={() => {
          this.setState({ visiable: false });
        }}
      >
        <div
          className={`alarmTitle ${
            arr.length === 0 ? "titleZero" : "titleExist"
          }`}
          onMouseEnter={() => {
            this.setState({ visiable: true });
          }}
          onClick={() => {
            console.log("clear");
            this.clearAlerts();
          }}
        >
          告警{arr.length}条
        </div>
        <button
          className={`alarmClearBtn hidden ${
            this.state.visiable ? "shown" : ""
          }`}
          onClick={() => {
            console.log("clear");
            this.clearAlerts();
          }}
        >
          清空
        </button>
        {arr[0] ? (
          <div
            className={`alarmBoard alarmBroadcast ${
              this.state.visiable ? "hidden" : "shown"
            }`}
            onMouseEnter={() => {
              this.setState({ visiable: true });
            }}
          >
            <div className="">
              <h3>{arr[0].title}</h3>
              <ul>
                <li>类型：{arr[0].type}</li>
                <li>地址：{arr[0].addr}</li>
                <li>
                  时间：{arr[0].time}
                  <div
                    className="closeAlarm"
                    onClick={() => {
                      this.props.removeAlert(0);
                    }}
                  >
                    ×
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <ul
          className={`alarmList hidden ${this.state.visiable ? "shown" : ""}`}
        >
          {arr &&
            arr.map((e, i) => {
              return (
                <li key={i}>
                  <div className={`alarmBoard`}>
                    <div className="">
                      <h3>{e.title}</h3>
                      <ul>
                        <li>类型：{e.type}</li>
                        <li>地址：{e.addr}</li>
                        <li>
                          时间：{e.time}
                          <div
                            className="closeAlarm"
                            onClick={() => {
                              this.removeAlert(i);
                            }}
                          >
                            ×
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
