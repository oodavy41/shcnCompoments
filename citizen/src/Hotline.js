import React, { Component } from "react";
import { get, post } from "./tools/http";
import Chart from "./Chart";
import CreateOption from "./dataCreate";

const dataSetMain = "wanggeshijian_daleifenbu/result";
const dataSetSub = "wanggeshuju_xiaolei/dataresult";
const dataCountMain = "wanggedata_sourceTotal/result";
function url(setName) {
  const address = "http://bigdata.cn.gov:8080/";
  const path = `visdata/rest/pagemanage/dataset/${setName}`;
  return address + path;
}

export default class Hotline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCount: 120345,
      subCount: 503,
      pieChartDataLeft: [
        { value: 17, name: "其他" },
        { value: 22, name: "意见建议" },
        { value: 39, name: "督察" },
        { value: 63, name: "求助" },
        { value: 82, name: "投诉举报" }
      ]
    };
  }
  updateData(requrl, infobc) {
    get(requrl)
      .then(d => {
        let data = JSON.parse(d.data.result.dataResult);
        this.dataTransfer(data, infobc ? "right" : "left");
      })
      .catch(e => {
        console.log(e);
      });
    get(url(dataCountMain))
      .then(d => {
        let data = JSON.parse(d.data.result.dataResult);
      })
      .catch(e => {
        console.log(e);
      });
  }
  dataTransfer(data, flag) {
    let stateData = [];
    data = data.splice(2);
    data = data.sort((aa, bb) => {
      let a = aa[1],
        b = bb[1];
      if (a > b) {
        // 按某种排序标准进行比较, a 小于 b
        return -1;
      }
      if (a < b) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    let data6 = data.splice(5);
    data.push(["其他", 0, 0]);
    data6.forEach((e, i) => {
      data[5][1] += e[1];
      data[5][2] += e[2];
    });
    let sum = 0;
    data.forEach(e => {
      sum += e[1];
    });
    this.setState({ mainCount: sum });
    data.forEach((e, i) => {
      if (e[0] !== "") {
        stateData.push({ value: e[1], name: e[0], precent: e[2] });
      }
    });
    console.log(JSON.stringify(stateData));
    if (flag === "left") {
      this.setState({ pieChartDataLeft: stateData });
    } else {
      this.setState({ pieChartDataRight: stateData });
    }
  }

  componentDidMount() {
    this.updateData(url(dataSetMain));
    this.interval = setInterval(
      this.updateData(url(dataSetMain)),
      1000 * 60 * 10
    );
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          color: "#2ebaf0",
          display: "flex",
          width: "100%",
          justifyContent: "space-around"
        }}
      >
        <div>
          <span
            style={{
              fontSize: 24,
              lineHeight: "24px",
              color: "#fff"
            }}
          >
            <a
              href="http://10.231.3.7/dpzs/SrceenCn/srceen/rx.aspx"
              style={{ color: "#fff" }}
            >
              市民热线(12345)
            </a>
          </span>
          <div
            style={{
              marginTop: 25,
              width: 500,
              textAlign: "center"
            }}
          >
            <span
              style={{
                fontSize: 18,
                lineHeight: "18px",
                fontFamily: "AdobeHeitiStd-Regular, sans-serif"
              }}
            >
              大类统计
              <br />({(this.state.mainCount / 10000).toFixed(1)}万件)
            </span>
          </div>

          <Chart
            style={{ width: 600, height: 212, marginTop: 0 }}
            option={CreateOption.peopleHotLineOpt(this.state.pieChartDataLeft)}
            handleClick={param => {
              console.log(param.name);
              this.updateData(url(dataSetSub), param.name);
            }}
          />
        </div>
      </div>
    );
  }
}