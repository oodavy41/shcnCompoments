import React, { Component } from "react";
import Chart from "./Chart";

let AQIChangeOpt = (data, val) => {
  // AQI变化趋势图表
  return {
    color: ["#4a93d1"],
    tooltip: {
      trigger: "axis"
    },
    grid: {
      top: 50,
      bottom: "6%",
      left: "3%",
      right: "8%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      name: "",
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          type: "solid",
          color: "#fff" //F3F3F3
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#fff"
      },
      data: data
    },
    yAxis: {
      type: "value",
      name: "",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#fff"
      },
      splitNumber: 3,
      splitLine: {
        lineStyle: {
          type: "solid",
          color: "#fff" //F3F3F3
        }
      }
    },
    series: [
      {
        smooth: true,
        name: "(AQI)变化趋势",
        type: "line",
        symbol: "semicircle.png",
        data: val
      }
    ]
  };
};

export default class AqiChart extends Component {
  constructor(props) {
    super(props);
    this.raw = [
      {
        group_AQI: "127",
        data_end_time: " 18日15时"
      },
      {
        group_AQI: "137",
        data_end_time: " 18日19时"
      },
      {
        group_AQI: "117",
        data_end_time: " 18日23时"
      },
      {
        group_AQI: "97",
        data_end_time: " 19日03时"
      },
      {
        group_AQI: "87",
        data_end_time: " 20日07时"
      },
      {
        group_AQI: "77",
        data_end_time: " 20日08时"
      },
      {
        group_AQI: "81",
        data_end_time: " 20日09时"
      }
    ];
  }

  render() {
    let data = this.props.data;
    data = data || this.raw;
    function dataTransfer(data) {
      if (data && data !== {}) {
        let aqi = [],
          time = [];
        data.forEach(e => {
          aqi.push(e.group_AQI);
          time.push(e.data_end_time);
        });
        return AQIChangeOpt(time, aqi);
      }
    }
    let aqidata = dataTransfer(data);
    return (
      <div
        // AQI变化趋势
        style={{
          position: "absolute",
          width: 572,
          height: 208
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 5,
            left: 23,
            fontSize: "24px",
            letterSpacing: "1px",
            color: "#fff"
          }}
          onClick={() => {
            this.props.showIF(
              "http://10.207.239.66:8008/kwlogin.html?siteType=air",
              1
            );
          }}
        >
          24小时空气质量
        </span>
        <Chart
          style={{ width: 602, height: 220, margin: 10 }}
          option={aqidata}
        />
      </div>
    );
  }
}
