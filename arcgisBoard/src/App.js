import React, { Component } from "react";
import "./location";
import Frame from "./frame";

import defaultData from "./default.json";
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
