import React, { Component } from "react";
import "./Cameras.css";
import Videojs from "./videoCompoment";
export default class Cameras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picked: -1,
      urls: [0, 1, 2],
    };
  }

  refresh() {
    const c = this.state.urls.length;
    let result = [];
    let { data } = this.props;
    let { urls } = this.state;
    for (let i = 0; i < c; i++) {
      result.push((urls[i] + c) % data.length);
    }
    this.setState({ urls: result });
  }

  render() {
    let { data } = this.props;
    const c = this.state.urls.length;
    return (
      <div className="cameras_main">
        <div className="cameras_count">
          全部视频{this.state.urls[c - 1] + 1}/{data.length}个
        </div>
        <button
          className="cameras_refresh"
          onClick={() => {
            this.refresh();
          }}
        >
          刷新
        </button>
        {this.state.urls.map((index, i) => {
          let { sbbh } = data[index];
          return (
            <Videojs videoId={sbbh} key={i} code={"video" + sbbh}></Videojs>
          );
        })}
      </div>
    );
  }
}
