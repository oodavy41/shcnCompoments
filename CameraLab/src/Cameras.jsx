import React, { Component } from "react";
import "./Cameras.css";
import Videojs from "./videoCompoment";

let ids = [
  "31010520051321004011",
  "31010520051320008002",
  "31010520051321002003",
  "31010518001181014005",
  "31010514051321002008",
  "31010514051321002008"
];
export default class Cameras extends Component {
  constructor(props) {
    super(props);
    this.state = { picked: -1 };
  }
  componentDidMount() { }

  render() {
    let urls = this.props.data || ids;
    return (
      <div className="cameras_main">
        {urls.map((id, i) => {
          return <Videojs videoId={id} key={i} code={"video" + id}></Videojs>;
        })}
      </div>
    );
  }
}
