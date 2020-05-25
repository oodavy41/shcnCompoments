import React, { Component } from "react";
import getToken from "./utils/getApiToken";
import Left from "./Left";

getToken();
export default class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Left></Left>
      </div>
    );
  }
}
