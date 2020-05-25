import React, { Component } from "react";
import { get, post } from "./tools/http";
import Chart from "./Chart";
import CreateOption from "./dataCreate";

const setNames = ["区级督查", "监督员上报", "创全工作", "12345上报"];
const dataSetMain = "wanggesourcegroup/result";
const dataSetSub = "wanggeguanlizhexian/dataresult";
function url(setName) {
  const address = "http://bigdata.cn.gov:8080/";
  const path = `visdata/rest/pagemanage/dataset/${setName}`;
  return address + path;
}

export default class GridChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NetWorkChart: [
        setNames,
        ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"],
        [
          [10, 20, 13, 23, 19, 8, 17, 28, 19, 15, 23, 19, 43, 24, 15, 23, 27, 28, 19, 30],
          [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98],
          [80, 108, 143, 134, 195, 136, 117, 228, 259, 251, 331, 392, 353, 524, 165, 236, 527, 328, 129, 530],
          [20, 14, 17, 29, 29, 18, 27, 18, 29, 25, 13, 29, 33, 14, 25, 13, 27, 18, 29, 20]
        ]
      ]
    };
  }
  updateData(url, names) {
    Promise.all(
      names.map(name =>
        post(url, [{ name: "INFOSOURCENAME", value: name }]).then(result => {
          return { ...result, name };
        })
      )
    )
      .then(results => {
        results = results.map(r => {
          return { data: JSON.parse(r.data.result.dataResult), name: r.name };
        });
        result && result[0] && this.dataTransfer(results);
      })
      .catch(e => {
        console.log(e);
      });
  }
  dataTransfer(data) {
    let values = data.map(obj => {
      return obj.data.reduce((p, c, i, arr) => {
        if (i > 0) {
          p.push(c[0]);
        }
        return p;
      }, []);
    });
    let names = data.map(obj => obj.name);
    let dates = data[0].data.reduce((p, c, i, arr) => {
      if (i > 0) {
        p.push(c[1]);
      }
      return p;
    }, []);
    console.log([names, dates, values]);
    this.setState({ NetWorkChart: [names, dates, values] });
  }

  componentDidMount() {
    this.updateData(url(dataSetSub), setNames);
    this.interval = setInterval(this.updateData(url(dataSetSub), setNames), 1000 * 60 * 10);
  }
  render() {
    return (
      <div style={{ width: 585 }}>
        <span style={{ fontSize: 24, lineHeight: "24px", color: "#fff" }}>
          <a href="http://10.231.3.7/dpzs/cn/index.aspx" style={{ color: "#fff" }}>
            网格化管理
          </a>
        </span>
        <Chart
          style={{ width: 585, height: 229 }}
          option={CreateOption.netWorkOpt(this.state.NetWorkChart)}
          handleClick={param => {
            console.log(param.name);
            window.location.href = "http://10.231.3.7/dpzs/cn/index.aspx";
          }}
        />
      </div>
    );
  }
}
