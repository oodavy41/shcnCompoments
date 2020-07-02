import React, { useEffect } from "react";

import "./loading.css";

export default function Loading(props) {
  const { width, height } = props.containerSize;
  return (
    <div className="cn_camLab_loadingMain" style={{ }}>
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
      <p className="cn_camLab_loadingText">视频无法加载</p>
    </div>
  );
}
