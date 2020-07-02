import React, { Component } from "react";
import Videojs from "./videoCompoment";

const FULLSCREEN = "FULLSCREEN";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";
const SHOWNSTATE = "SHOWNSTATE";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        sbbh: "31010511001181001005",
      },
      hide: true,
    };
    console.log(process);

    window.addEventListener(
      "message",
      (event) => {
        if (event.data.flag && event.data.flag === GRIDFLAG) {
          console.log("frame get message", event);
        }
        if (
          event.origin === "http://bigdata.cn.gov:8070" ||
          event.origin === "http://bigdata.cn.gov:8060" ||
          event.origin === "http://localhost:7000" ||
          event.origin === "http://localhost:7001" ||
          event.origin === "http://localhost:8000"
        ) {
          if (event.data.type === FULLSCREEN && event.data.flag === GRIDFLAG) {
            this.parent = event.source;
            let data = event.data.data;
            this.setState({ data, hide: false });
          }
        }
      },
      false
    );
  }

  render() {
    const { data, hide } = this.state;
    if (data && data.sbbh && !hide) {
      return (
        <Videojs
          videoId={data.sbbh}
          code={"video" + data.sbbh}
          hider={() => this.setState({ hide: true })}
        ></Videojs>
      );
    } else return <></>;
  }
}
