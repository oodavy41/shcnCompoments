import esriLoader from "esri-loader";
import React, { Component } from "react";

import ArcgisCore from "./core";
import roadOcc from "./assets/images/pin.png";

export default class Polymerization extends ArcgisCore {
  constructor(props) {
    super(props);
  }

  mapDidMount() {}

  mapDidUpdate(data) {
    cluster(data);
  }

  /**
   *
   * @param {[ { points:[{x:number,y:number}],popup:function(index):void,marks:{type:string,url:image,width:string,height:string} }]} datas
   */

  cluster(datas) {
    console.log("clusting", this.state.mapReady);
    if (!this.state.mapReady) {
      return;
    }
    function defaultMarks() {
      var mark1 = {
        type: "picture-marker",
        url: roadOcc,
        width: "33.6px",
        height: "44.8px"
      };
      var mark11 = {
        type: "picture-marker",
        url: roadOcc,
        width: "42px",
        height: "56px"
      };
      var mark111 = {
        type: "picture-marker",
        url: roadOcc,
        width: "50.4px",
        height: "67.2px"
      };

      return [mark1, mark11, mark111];
    }

    let drawCluster = (grids, icon, popup) => {
      var marks = defaultMarks();
      marks = marks.map(e => {
        return { ...e, url: icon };
      });
      var points = [];
      grids.forEach(e => {
        var mark;
        if (e.clusterCount <= 0) {
          return;
        } else if (e.clusterCount < 5) {
          mark = marks[0];
        } else if (e.clusterCount < 50) {
          mark = marks[1];
        } else {
          mark = marks[2];
        }
        let p = new this.ArcGisGraphic({
          attributes: { ...e.attributes, popup: popup, count: e.clusterCount },
          geometry: {
            type: "point",
            x: e.x,
            y: e.y,
            spatialReference: this.spatialReferencevalue
          },
          symbol: mark
        });
        points.push(p);
      });
      console.log(points, "points");
      this.view.graphics.addMany(points);
      return points;
    };

    let clustPoints = (grids, pointsData) => {
      var webExtent = this.view.extent;
      pointsData.forEach((e, i) => {
        if (e.x <= webExtent.xmin || e.x > webExtent.xmax || e.y <= webExtent.ymin || e.y > webExtent.ymax) {
          return;
        }
        var xVal = e.x,
          yVal = e.y;
        for (var j = 0, jLen = grids.length; j < jLen; j++) {
          var cl = grids[j];
          if (e.x <= cl.extent.xmin || e.x > cl.extent.xmax || e.y <= cl.extent.ymin || e.y > cl.extent.ymax) {
            continue;
          }
          cl.x = cl.clusterCount > 0 ? (xVal + cl.x * cl.clusterCount) / (cl.clusterCount + 1) : xVal;
          cl.y = cl.clusterCount > 0 ? (yVal + cl.y * cl.clusterCount) / (cl.clusterCount + 1) : yVal;
          cl.attributes = e;
          cl.points.push([xVal, yVal, e]);
          cl.clusterCount++;

          break;
        }
      });
      return grids;
    };

    let generateGrid = () => {
      var xCount = Math.round(this.view.width / this.gridRatio);
      var yCount = Math.round(this.view.height / this.gridRatio);
      var xw = (this.view.extent.xmax - this.view.extent.xmin) / xCount;
      var yh = (this.view.extent.ymax - this.view.extent.ymin) / yCount;
      var gsxmin, gsxmax, gsymin, gsymax;
      var grids = [];
      for (var i = 0; i < xCount; i++) {
        gsxmin = this.view.extent.xmin + xw * i;
        gsxmax = gsxmin + xw;
        for (var j = 0; j < yCount; j++) {
          gsymin = this.view.extent.ymin + yh * j;
          gsymax = gsymin + yh;
          var ext = {
            xmin: gsxmin,
            xmax: gsxmax,
            ymin: gsymin,
            ymax: gsymax
          };
          grids.push({
            extent: ext,
            clusterCount: 0,
            subTypeCounts: [],
            singles: [],
            points: [],
            x: 0,
            y: 0
          });
        }
      }
      return grids;
    };

    console.log(datas);
    datas.forEach(e => {
      e.points = e.points.map(p => {
        return { ...p, x: +p.x, y: +p.y };
      });
    });

    this.view.graphics.removeMany(this.pointsObj);
    this.pointsObj = [];
    for (let i = 0; i < datas.length; i++) {
      let e = datas[i];
      let grids = generateGrid();
      grids = clustPoints(grids, e.points);
      this.pointsObj = this.pointsObj.concat(drawCluster(grids, e.marks, e.popup));
    }
  }
}
