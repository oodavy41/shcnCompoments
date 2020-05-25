import React, { Component } from "react";

import { get, post } from "./tools/http";
export default class main extends Component {
  constructor(props) {
    super(props);
    this.path = "";
    this.mainurl = "http://10.207.239.66:8008/cnhbApplication/api";
  }
  componentDidMount() {
    this.updateData(this.mainurl + this.path);
    this.interval = setInterval(this.updateData(this.mainurl + this.path), 1000 * 60 * 10);
  }

  updateData(url) {
    this.dataTransfer(null);
    get(url, [])
      .then(d => {
        console.log(this.path, d);
        this.dataTransfer(d.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  dateTransfer(data) {}
}
