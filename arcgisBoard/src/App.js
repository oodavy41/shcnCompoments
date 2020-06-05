import React, { Component } from "react";
import "./location";
import Frame from "./frame";

const defaultData = [
  {
    type: "视频点位",
    sbbh: "31010511001321053016",
    name: "番禺路209弄2HG",
    state: "番禺路209弄2",
    address: "番禺路209弄2",
    lng: "121.42461210000000000000",
    lant: "31.20858144000000000000",
    X: "-4493.978069089208",
    Y: "-2771.0449905520627",
  },
  {
    type: "视频点位",
    sbbh: "31010511001321053020",
    name: "新华路派出所HG",
    state: "新华路派出所",
    address: "新华路派出所",
    lng: "121.42155290000000000000",
    lant: "31.20671357000000000000",
    X: "-4789.109458834911",
    Y: "-2979.318477577132",
  },
  {
    type: "视频点位",
    sbbh: "31010512001321052013",
    name: "江苏路2号线轻轨出口1HG",
    state: "江苏路2号线轻轨出口1",
    address: "江苏路2号线轻轨出口1",
    lng: "121.42672058640000000000",
    lant: "31.22164188550000000000",
    X: "-4296.273444610386",
    Y: "-1326.4728702815207",
  },
  {
    type: "视频点位",
    sbbh: "31010513001321052099",
    name: "定西路硅酸盐研究所1HG",
    state: "定西路硅酸盐研究所1",
    address: "定西路硅酸盐研究所1",
    lng: "121.41749484520000000000",
    lant: "31.21831431200000000000",
    X: "-5173.849387145319",
    Y: "-1693.306876656609",
  },
  {
    type: "视频点位",
    sbbh: "31010513001321053009",
    name: "上海书城(长宁路)3HG",
    state: "上海书城(长宁路)3",
    address: "上海书城(长宁路)3",
    lng: "121.41196415440000000000",
    lant: "31.21971027020000000000",
    X: "-5702.44916828613",
    Y: "-1541.3744786987525",
  },
  {
    X: "-4596.09563573754",
    Y: "-2611.4374911187533",
    address: "定西路999号",
    lant: "31.210046",
    lng: "121.423556",
    name: "长宁消防站",
    sbbh: "",
    state: "延安站",
    type: "消防站",
  },
  {
    type: "视频点位",
    sbbh: "31010521001321050010",
    name: "万都3H",
    state: "万都3",
    address: "万都3",
    lng: "121.40088910860000000000",
    lant: "31.20666049770000000000",
    X: "-6755.6155330201655",
    Y: "-2986.371199333458",
  },
  {
    type: "视频点位",
    sbbh: "31010515001321052013",
    name: "天山路700弄H",
    state: "天山路700弄H",
    address: "天山路700弄",
    lng: "121.39527913470000000000",
    lant: "31.21360517300000000000",
    X: "-7293.219276680322",
    Y: "-2216.1986267709353",
  },
  {
    type: "视频点位",
    sbbh: "31010512001321051073",
    name: "愚园/安西1HG",
    state: "愚园/安西1",
    address: "愚园/安西1",
    lng: "121.42089474910000000000",
    lant: "31.22081161380000000000",
    X: "-4848.496799197909",
    Y: "-1416.31834063048",
  },
];
export default class App extends Component {
  render() {
    const { dataProvider } = this.props;
    console.log(this.props);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <link
          rel="stylesheet"
          href="http://bigdata.cn.gov:9070/arcgis_js_v410_sdk/arcgis_js_api/library/4.10/esri/css/main.css"
        />
        <link
          rel="stylesheet"
          href="http://bigdata.cn.gov:9070/arcgis_js_v410_sdk/arcgis_js_api/library/4.10/esri/css/view.css"
        />
        <Frame data={dataProvider || defaultData}></Frame>
      </div>
    );
  }
}
