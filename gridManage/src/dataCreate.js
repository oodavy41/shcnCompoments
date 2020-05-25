import echarts from "echarts/lib/echarts";

const CreateOption = {
  netWorkOpt: (data, val) => {
    const charts = {
      unit: "Kbps",
      names: data[0],
      lineX: data[1],
      value: data[2]
    };
    const color = ["rgba(123,221,245", "rgba(183,112,225", "rgba(186,223,147", "rgba(252,165,71"];
    const lineY = [];

    for (let i = 0; i < charts.names.length; i++) {
      let x = i;
      if (x > color.length - 1) {
        x = color.length - 1;
      }
      const data = {
        name: charts.names[i],
        type: "line",
        color: color[x] + ")",
        smooth: false,
        symbol: "circle",
        symbolSize: 5,
        data: charts.value[i]
      };
      lineY.push(data);
    }
    return {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: charts.names,
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
        right: "4%"
      },
      grid: {
        top: 50,
        left: 20,
        right: 30,
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: charts.lineX,
        axisLine: {
          lineStyle: {
            color: "#abb4b8"
          }
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontSize: 10
          },
          formatter: function(params) {
            return params;
          }
        }
      },
      yAxis: {
        // name: charts.unit,
        type: "value",
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#fff",
            fontSize: 10
          }
        },
        splitLine: {
          lineStyle: {
            color: "#0b2c3a"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#889093"
          }
        }
      },
      series: lineY
    };
  }
};
export default CreateOption;
