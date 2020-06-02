import React, { Component } from "react";
import redPin from "../images/redPin.png";
import orangePin from "../images/orangePin.png";
import yellowPin from "../images/yellowPin.png";
import greenPin from "../images/greenPin.png";
import cameraPin from "../images/cam.svg";
import ReactDOM from "react-dom";

// import AlertPopups from './AlertPopups'
import Polymerization from "../components/Polymerization";

const PICKPOINT = "PICKPOINT";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";
export default class ArcGISMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: 1,
      arcgisParam: [],
    };
    this.map = null;
    this.token = null;
    this.addClusters = null;
    this.parent = null;

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
          if (event.data.type === POSTDATA && event.data.flag === GRIDFLAG) {
            this.parent = event.source;
            let data = event.data.data;
            this.getData(data);
          }
        }
      },
      false
    );
  }

  // {"A":"延安站","B":"定西路999号","C":"121.423556","D":"31.210045999999998","E":"-4597.8876357034396","F":"-2610.5844911409799"}
  componentDidMount() {}

  componentDidUpdate() {}

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  getData(data) {
    if (!data) {
      return;
    }
    let pointsData = data.map((v) => {
      return { ...v, x: v.X, y: v.Y };
    });
    let typedData = [
      {
        data: pointsData
          .filter((v) => v.type.indexOf("长宁") >= 0)
          .map((v) => ({ ...v, type: "default" })),
        type: "default",
        marks: redPin,
      },
      {
        data: pointsData
          .filter((v) => v.type.indexOf("附近") >= 0)
          .map((v) => ({ ...v, type: "default" })),
        type: "default",
        marks: orangePin,
      },
      {
        data: pointsData
          .filter((v) => v.type.indexOf("企业") >= 0)
          .map((v) => ({ ...v, type: "default" })),
        type: "default",
        marks: greenPin,
      },
      {
        data: pointsData
          .filter((v) => v.type.indexOf("社区") >= 0)
          .map((v) => ({ ...v, type: "default" })),
        type: "default",
        marks: yellowPin,
      },
      {
        data: pointsData
          .filter((v) => v.type.indexOf("视频") >= 0)
          .map((v) => ({ ...v, type: "camera" })),
        type: "camera",
        marks: cameraPin,
        markSize: 1,
      },
    ];
    let ret = typedData.map((v) => ({
      points: v.data,
      type: v.type,
      marks: v.marks,
      popup: (e) => {
        this.postPoints(e);
      },
    }));
    this.setState({ arcgisParam: ret });
    return ret;
  }

  postPoints(evt) {
    console.log("postedMEssage");
    console.log(this.parent);
    let data = { point: evt, type: PICKPOINT, flag: GRIDFLAG };
    this.parent.postMessage(data, "*");
  }

  closePoints() {
    this.popup && ReactDOM.unmountComponentAtNode(this.popup);
  }

  componentWillUnmount() {
    this.popup && ReactDOM.unmountComponentAtNode(this.popup);
    this.popupBuild && ReactDOM.unmountComponentAtNode(this.popupBuild);
    this.popupGongdi && ReactDOM.unmountComponentAtNode(this.popupGongdi);
  }

  render() {
    const style = {
      overflow: "hidden",
      position: "absolute",
      left: "0px",
      width: "3840px",
      height: "1080px",
      zIndex: "0",
    };
    console.log("input Data:", this.state.arcgisParam);
    return (
      <div className="road" style={style}>
        <Polymerization datas={this.getData(this.props.data)} style={style} />
      </div>
    );
  }
}
