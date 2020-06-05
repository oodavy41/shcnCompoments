import React, { Component } from "react";
import Videojs from "./videoCompoment";

import "./App.css";

const PICKPOINT = "PICKPOINT";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";
const SHOWNSTATE = "SHOWNSTATE";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: "视频点位",
        pinType: "shipin",
        sbbh: "31010511001321053016",
        name: "番禺路209弄2HG",
        state: "番禺路209弄2",
        address: "番禺路209弄2"
      },
      hide: true,
    };

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
          event.origin === "http://localhost:8000"
        ) {
          if (event.data.type === PICKPOINT && event.data.flag === GRIDFLAG) {
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
    return (
      <div className={`cn_popup_main ${hide ? "cn_popup_hide" : ""}`}>
        <button
          className="cn_popup_close"
          onClick={() => this.setState({ hide: true })}
        >
          ⨯
        </button>
        {data && data.sbbh ? (
          <Videojs videoId={data.sbbh} code={"video" + data.sbbh}></Videojs>
        ) : (
          ""
        )}
        <div className="cn_popup_text">类型: {data.type}</div>

        <div className="cn_popup_text">地址: {data.address}</div>
      </div>
    );
  }
}
