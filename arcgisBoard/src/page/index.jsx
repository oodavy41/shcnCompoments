import React, { Component } from "react";
import redPin from "../images/redPin.png";
import orangePin from "../images/orangePin.png";
import yellowPin from "../images/yellowPin.png";
import greenPin from "../images/greenPin.png";
import cameraPin from "../images/cam.svg";
import ReactDOM from "react-dom";

// import AlertPopups from './AlertPopups'
import Polymerization from "../components/Polymerization";

const keyWords = [
  {
    filter: (v) => v.type.indexOf("消防") >= 0 && v.name.indexOf("长宁") >= 0,
    pinType: "changning",
    marks: redPin,
  },
  {
    filter: (v) => v.type.indexOf("消防栓") >= 0,
    pinType: "xiaofangshuan",
    marks: redPin,
  },
  {
    filter: (v) => v.type.indexOf("消防") >= 0 && v.name.indexOf("附近") >= 0,
    pinType: "fujin",
    marks: orangePin,
  },
  {
    filter: (v) => v.type.indexOf("消防") >= 0 && v.name.indexOf("企业") >= 0,
    pinType: "qiye",
    marks: greenPin,
  },
  {
    filter: (v) => v.type.indexOf("消防") >= 0 && v.name.indexOf("社区") >= 0,
    pinType: "shequ",
    marks: yellowPin,
  },
  {
    filter: (v) => v.type.indexOf("视频") >= 0,
    pinType: "shipin",
    marks: cameraPin,
    markSize: 1,
  },
];

const PICKPOINT = "PICKPOINT";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";
const SHOWNSTATE = "SHOWNSTATE";

const postPoints = (evt) => {
  let data = {
    data: {
      sbbh: evt.sbbh,
      name: evt.name,
      type: evt.type,
      address: evt.address,
      pinType: evt.pinType,
      state: evt.state,
    },
    type: PICKPOINT,
    flag: GRIDFLAG,
  };
  console.log("BEFORE POST", data);
  return data;
};
export default class ArcGISMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: keyWords.map(() => false),
    };
    this.updateFlag = true;
    this.map = null;
    this.token = null;
    this.addClusters = null;

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
          if (event.data.type === SHOWNSTATE && event.data.flag === GRIDFLAG) {
            let { pinType, data } = event.data;
            let index = keyWords.findIndex((e) => e.pinType === pinType);
            if (index >= 0) {
              let { flag } = this.state;
              if (data) flag[index] = data;
              else flag[index] = !flag[index];
              this.setState({ flag });
              this.updateFlag = true;
              console.log(this.state.flag);
            }
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
    return this.props.data !== nextProps.data || this.updateFlag;
  }

  getData(data) {
    if (!data) {
      return;
    }
    let pointsData = data.slice(1).map((v) => ({ ...v, x: +v.X, y: +v.Y }));
    let keyWordsFilted = [];
    keyWords.forEach((e, i) => this.state.flag[i] && keyWordsFilted.push(e));
    let typedData = keyWordsFilted.map((dataProp) => ({
      ...dataProp,
      points: pointsData
        .filter(dataProp.filter)
        .map((v) => ({ ...dataProp, ...v, filter: "" })),
    }));
    console.log(typedData);
    return typedData;
  }

  render() {
    this.update = false;
    const style = {
      overflow: "hidden",
      width: "100%",
      height: "100%",
      zIndex: "0",
    };
    return (
      <div className="road" style={style}>
        <Polymerization
          datas={this.getData(this.props.data)}
          popup={postPoints}
          style={style}
        />
      </div>
    );
  }
}
