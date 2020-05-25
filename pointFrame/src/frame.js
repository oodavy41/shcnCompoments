import React, { Component } from "react";
import CamLab from "./components/Cameras";

const PICKPOINT = "PICKPOINT";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";


export default class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      labCamera: [],
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

  freshLabCams() {
    let data = this.props.data;
    data = data.filter((e) => e.type === "视频点位").map((e) => e.sbbh);
    let shown = [];
    for (let i = 0; i < 4; i++) {
      shown.push(data[Math.floor(Math.random() * data.length)]);
    }
    this.setState({ labCamera: shown });
  }
  componentDidMount() {
    this.freshLabCams();
  }

  componentDidUpdate() {
    this.postData(this.props.data);
  }

  render() {
    return (
      <>
        <CamLab
          data={this.state.labCamera}
          count={
            this.props.data.length
          }
          refresh={() => {
            this.freshLabCams();
          }}
        ></CamLab>
        <iframe
          ref={(m) => (this.frame = m)}
          height="1080"
          width="3840"
          // src="http://bigdata.cn.gov:8060/cn/#/pointDisplay"
          src="http://localhost:8000/cn/#/pointDisplay"
          onLoad={() => {
            this.setState({ loading: false });
          }}
        ></iframe>
      </>
    );
  }
}
