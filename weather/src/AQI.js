import React, { Component } from "react";
import main from "./main";
import "./AQI.css";
export default class AQI extends main {
  constructor(props) {
    super(props);
    this.path = "/getcountyreal.do";
    this.state = {
      aqiData: {
        group_AQI: "71",
        PM25_AQI: "28",
        item_param: "PM10",
        group_value: "71.0",
        group_quality: "良",
        update_time: "2019-11-12 16:39:45",
        data_end_time: "2019-11-12 16:00:00"
      }
    };
    this.raw = [
      {
        item_id: "100",
        group_AQI: "71",
        item_param: "PM10",
        group_value: "71.0",
        group_quality: "良",
        update_time: "2019-11-12 16:39:45",
        data_end_time: "2019-11-12 16:00:00"
      },
      {
        item_id: "101",
        group_AQI: "28",
        item_param: "PM2.5",
        group_value: "19.0",
        group_quality: "优",
        update_time: "2019-11-12 16:39:45",
        data_end_time: "2019-11-12 16:00:00"
      }
    ];
  }
  componentDidMount() {
    super.componentDidMount();
  }

  dataTransfer(data) {
    let aqidata = data || this.raw;
    data = { 100: "", 101: "" };
    aqidata.forEach(e => {
      data[e.item_id] = e;
    });
    aqidata = data[100];
    aqidata["PM25_AQI"] = parseInt(data[101].group_value || this.state.aqiData.group_value);

    aqidata = this.setState({ aqiData: aqidata });
  }

  render() {
    let { aqiData } = this.state;

    let color25 = "",
      color10 = "",
      qualitySize = "";
    if (aqiData.PM25_AQI <= 50) {
      color25 = "AQI_best";
    } else if (aqiData.PM25_AQI <= 100) {
      color25 = "AQI_better";
    } else {
      color25 = "AQI_bad";
    }
    if (aqiData.group_quality === "优") {
      color10 = "AQI_best";
    } else if (aqiData.group_quality === "良") {
      color10 = "AQI_better";
    } else {
      color10 = "AQI_bad";
      qualitySize = "AQI_qualiy_bad";
    }
    return (
      <div
        className="AQI_main"
        // 空气质量AQI
      >
        <div
          className="AQI_title"
          onClick={() => {
            this.props.showIF("http://10.207.239.66:8008/home.html?siteType=air", 1);
          }}
        >
          空气质量AQI
        </div>
        <div>
          <div className="AQI_subBoard">
            <div className="AQI_subtitle">PM2.5</div>
            <div className={` AQI_valueBoard ${color25}`}>{aqiData.PM25_AQI}</div>
          </div>

          <div className="AQI_subBoard">
            <div className="AQI_subtitle">空气质量等级</div>
            <div className={` AQI_valueBoard ${color10} ${qualitySize}`}>{aqiData.group_quality}</div>
          </div>

          <div className="AQI_subBoard">
            <div className="AQI_subtitle">AQI指数</div>
            <div className={` AQI_valueBoard ${color10}`}>{aqiData.group_AQI}</div>
          </div>

          <div className="AQI_subBoard">
            <div className="AQI_subtitle">首要污染物</div>
            <div className="AQI_valueBoard">{aqiData.PM25_AQI < 50 ? "无" : aqiData.item_param}</div>
          </div>
        </div>
        {aqiData.PM25_AQI <= 100 ? <div className="AQI_ps"> 提示：空气质量令人满意，基本无空气污染</div> : ""}
      </div>
    );
  }
}
