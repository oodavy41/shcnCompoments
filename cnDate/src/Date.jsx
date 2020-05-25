import React, { Component } from "react";
import "./Date.css";

export default class CityProper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateYdm: "",
      date: ""
    };
  }
  updateDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    let str = "";
    const week = new Date().getDay();
    if (week === 0) {
      str = "星期日";
    } else if (week === 1) {
      str = "星期一";
    } else if (week === 2) {
      str = "星期二";
    } else if (week === 3) {
      str = "星期三";
    } else if (week === 4) {
      str = "星期四";
    } else if (week === 5) {
      str = "星期五";
    } else if (week === 6) {
      str = "星期六";
    }
    this.setState({
      dateYdm: `${year}年${month + 1}月${day}日 ${str} `,
      date: `${hour}:${minute < 10 ? `0${minute}` : minute}:${
        second < 10 ? `0${second}` : second
      }`
    });
  }
  componentDidMount() {
    this.timer = setInterval(() => this.updateDate(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  render() {
    return (
      <div className="date_detail">
        <div>
          <span className="date_texts">{this.state.dateYdm}</span>
          <span className="date_hms">{this.state.date}</span>
        </div>
      </div>
    );
  }
}
