import React, { Component } from "react";
import Compoment from "./AqiChart";
export default class App extends Component {
  render() {
    const { dataProvider } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Compoment data={dataProvider}> </Compoment>
      </div>
    );
  }
}
