import React, { Component } from "react";
import video from "./videoCompoment";

const PICKPOINT = "PICKPOINT";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";

const rawPoint = {
  type: "视频点位",
  sbbh: "31010511001321053016",
  name: "番禺路209弄2HG",
  state: "番禺路209弄2",
  address: "番禺路209弄2",
  lng: "121.42461210000000000000",
  lant: "31.20858144000000000000",
  X: "-4493.978069089208",
  Y: "-2771.0449905520627",
};

export default class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupInfo: rawPoint,
    };
    window.addEventListener("message", (event) => {
      if (event.data.flag && event.data.flag === GRIDFLAG) {
        console.log("frame get message", event);
      }id
      if (
        event.origin === "http://bigdata.cn.gov:8070" ||
        event.origin === "http://bigdata.cn.gov:8060" ||
        event.origin === "http://localhost:7000" ||
        event.origin === "http://localhost:8000"
      ) {
        if (event.data.type === PICKPOINT && event.data.flag === GRIDFLAG) {
          const data = event.data;
          this.setState({ popupInfo: data.point });
        }
      }
    });
  }

  render() {
    const { sbbh }=this.state.popupInfo 
    return (
      <div>
        <video videoId={sbbh} key={Math.random()} code={"video" + sbbh}></video>
      </div>
    );
  }
}
