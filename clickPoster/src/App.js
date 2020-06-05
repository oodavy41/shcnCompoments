import React, { Component } from "react";

const GRIDFLAG = "GRIDFLAG";
const SHOWNSTATE = "SHOWNSTATE";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  check(type) {
    let data = {
      type: SHOWNSTATE,
      pinType: type,
      flag: GRIDFLAG,
    };
    window.postMessage(data, "*");
    console.log("POST", data);
  }
  render() {
    let { dataProvider } = this.props;
    dataProvider = dataProvider || [""];
    let type = dataProvider[0];
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        onClick={() => {
          this.check(type);
        }}
      ></div>
    );
  }
}
