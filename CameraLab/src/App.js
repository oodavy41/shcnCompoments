import React, { Component } from "react";
import CamLab from "./components/Cameras";
import defaultData from "./default.json"
export default class App extends Component {
  render() {
    let { dataProvider } = this.props;
    dataProvider = dataProvider || defaultData;
    dataProvider = dataProvider.filter((v) => v.type.indexOf("视频") >= 0);
    if (!dataProvider.length) {
      dataProvider = defaultData;
    }
    console.log("inData:", dataProvider);

    return (
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <CamLab
          keys={[
            {
              keyword: "视频",
              value: "全部视频",
              raw: dataProvider,
            },
          ]}
        ></CamLab>
      </div>
    );
  }
}
