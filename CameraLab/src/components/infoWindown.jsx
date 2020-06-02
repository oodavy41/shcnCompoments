import React, { Component } from "react";

export default function infoWindow(props) {
  const { data } = props;
  switch (data.type) {
    case "视频点位":
      return <div>data</div>;
      break;
    default:
      return;
  }
}
