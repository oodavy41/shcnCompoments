import React, { Component } from "react";
import Arcgis from "./page";

export default class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      popupInfo: null,
    };
    this.frame = null;
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    let { data } = this.props;
    console.log(data);
    return <Arcgis data={data}></Arcgis>;
  }
}
