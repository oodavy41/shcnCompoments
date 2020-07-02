import React, { Component } from "react";
import "./Cameras.css";
import Videojs from "./videoCompoment";
import Selector from "./selector";
import Pagination from "./pagination";

const WIN = 3;
const FULLSCREEN = "FULLSCREEN";
const POSTDATA = "POSTDATA";
const GRIDFLAG = "GRIDFLAG";
const SHOWNSTATE = "SHOWNSTATE";
export default class Cameras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      selectedKey: 0,
    };
  }
  refresh(num) {
    let { keys } = this.props;
    let { offset, selectedKey } = this.state;
    let { raw: data } = keys[selectedKey];
    this.setOffset((offset + num + data.length) % data.length);
  }

  setOffset(offset) {
    this.setState({ offset });
  }
  setSelectedKey(selectedKey) {
    this.setState({ selectedKey });
  }

  render() {
    let { keys } = this.props;
    let { offset, selectedKey } = this.state;
    let { raw: data } = keys[selectedKey];
    let offsets = [];
    for (let i = 0; i < WIN; i++) {
      offsets.push((offset + i) % data.length);
    }
    return (
      <div className="cameras_main">
        <div className="cameras_head">
          <Selector
            data={keys}
            selectKey={(v) => this.setSelectedKey(v)}
            selectedKey={selectedKey}
          ></Selector>
          <Pagination
            count={data.length}
            paginate={(v) => this.refresh(v)}
            offset={offset}
            WIN={WIN}
          ></Pagination>
        </div>
        {offsets.map((index, i) => {
          let { sbbh } = data[index];
          console.log(i, sbbh);
          return (
            <Videojs
              videoId={sbbh}
              key={sbbh}
              index={i}
              code={"video" + sbbh}
              fullScreen={() => {
                const data = {
                  data: { sbbh },
                  type: FULLSCREEN,
                  flag: GRIDFLAG,
                };
                window.postMessage(data);
              }}
            ></Videojs>
          );
        })}
      </div>
    );
  }
}
