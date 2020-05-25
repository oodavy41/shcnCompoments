import React, { Component } from "react";
import "./Cameras.css";
import Videojs from "./videoCompoment";

let ids = [
  "31010511001180001001",
  "31010520051320008002",
  "31010520051321002003",
  "31010518001181014005",
];
export default class Cameras extends Component {
  constructor(props) {
    super(props);
    this.state = { picked: -1 };
  }
  componentDidMount() {}

  render() {
    let urls = this.props.data || ids;
    return (
      <div className="cameras_main">
        <div className="cameras_count">全部视频{this.props.count}个</div>
        <button className="cameras_refresh" onClick={this.props.refresh}>
          刷新
        </button>
        {urls.map((id, i) => {
          return <Videojs videoId={id} key={i} code={"video" + id}></Videojs>;
        })}
      </div>
    );
  }
}
