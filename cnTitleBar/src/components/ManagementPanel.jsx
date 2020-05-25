import React, { Component } from "react";
import "../PanelBoard.css";

import managementCN from "../assets/management.png";

let cityConsoleUrl =
  "http://10.81.71.38/chengyun/chengyun-fe/page1.html#/?code=BxTUtI2uGLhTiK0c_vG8Ju-o9iGCBQv5";

let townUrls = {
  新华路街道: "http://10.101.79.89/st/index.html?Street=0500",
  江苏路街道:
    "http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=NrC4kzKjdJu4sBO1g6iXUVRsAJSIaOqm",
  华阳路街道: "0500",
  周家桥街道: "0500",
  天山路街道: "0500",
  仙霞新村街道: "0500",
  虹桥街道: "0500",
  程家桥街道: "0500",
  北新泾街道: "0511",
  新泾镇: "0500",
  临空园区: "050"
};

export default class PanelBoard extends Component {
  render() {
    return (
      <div
        className={`contentBoard`}
        style={{
          backgroundImage: `url(${managementCN})`
        }}
      >
        <li className="townshipList">
          {["新华路街道", "江苏路街道"].map(e => (
            <ul key={e} className="townshipCell">
              <div
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  this.props.showIF(townUrls[e]);
                }}
              ></div>
            </ul>
          ))}
        </li>
        <div
          className={`cityConsole`}
          onClick={() => {
            this.props.showIF(cityConsoleUrl);
          }}
        ></div>
      </div>
    );
  }
}
