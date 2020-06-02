import React, { Component } from "react";
import Arcgis from "./page";

const PICKPOINT = "PICKPOINT";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";

export default class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      popupInfo: null,
    };
    this.frame = null;
    this.postData = (data) => {
      console.log(data);
      let { loading } = this.state;
      if (!loading && this.frame && data) {
        let posted = {
          data: data,
          type: POSTDATA,
          flag: GRIDFLAG,
        };
        this.frame.contentWindow.postMessage(posted, "*");
      }
    };
    window.addEventListener("message", (event) => {
      if (event.data.flag && event.data.flag === GRIDFLAG) {
        console.log("frame get message", event);
      }
      if (
        event.origin === "http://bigdata.cn.gov:8070" ||
        event.origin === "http://bigdata.cn.gov:8060" ||
        event.origin === "http://localhost:7000" ||
        event.origin === "http://localhost:8000"
      ) {
        if (event.data.type === PICKPOINT && event.data.flag === GRIDFLAG) {
          const data = event.data;
          this.setState({ popupInfo: data.point });
        }
      }
    });
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    let { data } = this.props;
    console.log(data);
    return <Arcgis data={data}></Arcgis>;
  }
}
