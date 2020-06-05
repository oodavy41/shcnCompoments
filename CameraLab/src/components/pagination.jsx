import React, { Component } from "react";

import "./Cameras.css";
import "./switcher.css";

const GRIDFLAG = "GRIDFLAG";
const SHOWNSTATE = "SHOWNSTATE";
const STATETYPE = "shipin";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  check(value) {
    let data = {
      type: SHOWNSTATE,
      pinType: STATETYPE,
      data: value,
      flag: GRIDFLAG,
    };
    window.postMessage(data, "*");
    console.log("POST", data);
  }

  render() {
    console.log("camlab pagination", this.props);
    const { paginate, count, offset, WIN } = this.props;

    return (
      <div className="cameras_pagniation">
        <button
          className="cameras_refresh"
          onClick={() => {
            paginate(-WIN);
          }}
        >
          {"<"}
        </button>
        <div className="cameras_count">
          {offset}/{count}个
        </div>
        <button
          className="cameras_refresh"
          onClick={() => {
            paginate(WIN);
          }}
        >
          {">"}
        </button>
        <div className="cameras_switch">
          <label className="switch-slide">
            <input
              type="checkbox"
              id="menu-right"
              hidden
              onChange={(e) => {
                this.check(e.target.checked);
              }}
              hidden
            />
            <label for="menu-right" className="switch-slide-label"></label>
          </label>
          <div className="cameras_switch_label">分布</div>
        </div>
      </div>
    );
  }
}
