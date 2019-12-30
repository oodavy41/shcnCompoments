import esriLoader from "esri-loader";
import React, { Component } from "react";

import fly from "./assets/images/flys.png";

export default class Polymerization extends Component {
  constructor(props) {
    super(props);
    this.spatialReferencevalue = `PROJCS["shanghaicity",GEOGCS["GCS_Beijing_1954",DATUM["D_Beijing_1954",SPHEROID["Krasovsky_1940",6378245.0,298.3]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",-3457147.81],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",121.2751921],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]`;
    this.url = "http://bigdata.cn.gov:9070/arcgis_js_v410_sdk/arcgis_js_api/library/4.10/dojo/dojo.js";
    this.ArcGisGraphic = null;
    this.gridRatio = 100;
    this.view = null;
    this.cameraModifyed = false;
    this.state = {
      datas: [],
      mapReady: false
    };
    this.pointsObj = [];
  }

  mapDidMount() {}

  mapDidUpdate() {}
  componentDidUpdate() {
    this.mapDidUpdate(this.props.datas);
  }

  componentDidMount() {
    console.log("didmount", this.view);
    window.getToken();

    esriLoader
      .loadModules(
        [
          "esri/config",
          "esri/views/MapView",
          "esri/Map",
          "esri/core/watchUtils",
          "esri/symbols/TextSymbol",
          "esri/geometry/Circle",
          "esri/identity/IdentityManager",
          "esri/geometry/SpatialReference",
          "esri/layers/FeatureLayer",
          "esri/layers/TileLayer",
          "esri/layers/MapImageLayer",
          "esri/geometry/Extent",
          "esri/geometry/Point",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/PictureMarkerSymbol",
          "esri/Graphic",
          "esri/PopupTemplate",
          "esri/renderers/ClassBreaksRenderer",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleLineSymbol",
          "esri/symbols/SimpleFillSymbol",
          "esri/Color",
          "esri/renderers/SimpleRenderer",
          "esri/views/2d/draw/Draw",
          "dojo",
          "esri/geometry/geometryEngine"
        ],
        { url: this.url }
      )
      .then(
        ([
          esriConfig,
          MapView,
          Map,
          watchUtils,
          TextSymbol,
          Circle,
          IdentityManager,
          SpatialReference,
          FeatureLayer,
          ArcGISTiledMapServiceLayer,
          ArcGISDynamicMapServiceLayer,
          Extent,
          Point,
          SimpleMarkerSymbol,
          PictureMarkerSymbol,
          Graphic,
          PopupTemplate,
          ClassBreaksRenderer,
          GraphicsLayer,
          SimpleLineSymbol,
          SimpleFillSymbol,
          Color,
          SimpleRenderer,
          Draw,
          dojo,
          geometryEngine
        ]) => {
          this.ArcGisGraphic = Graphic;
          let spatialReferencevalue = this.spatialReferencevalue;
          esriConfig.fontsUrl = "http://bigdata.cn.gov:9070/arcgisapi-master/fonts/arial-unicode-ms";
          // 定义地图
          this.map = new Map({});
          this.view = new MapView({
            container: "mapDiv",
            map: this.map,
            showLabels: true,
            center: [121.41802145766225, 31.21819924364435],
            extent: new Extent({
              type: "extent",
              xmax: 2116.0772399670277,
              xmin: -18203.963400114255,
              ymax: -16.55708170044818,
              ymin: -5731.568511723309,
              spatialReference: {
                wkt: spatialReferencevalue
              }
            }),
            sliderPosition: "bottom-right",
            sliderOrientation: "horizontal",
            // sliderStyle:'small',
            zoom: 4
          });
          //地图缩放结束事件
          this.map.on("zoom-end", function() {
            //弹出当前地图缩放比例值
            alert(this.map.getZoom());
          });

          var token = document.getElementById("txtToken").value;
          IdentityManager.registerToken({
            server: "http://map.cn.gov/OneMapServer/rest/services",
            token
          });
          var tiledLayer = new ArcGISTiledMapServiceLayer({
            url: "http://map.cn.gov/OneMapServer/rest/services/DARK_MAP2/MapServer",
            id: "baseMap"
          });

          /**
           * 高架桥
           */
          const glRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-line", // autocasts as new SimpleLineSymbol()
              width: 8,
              color: [45, 155, 163, 0.6]
            }
          };

          const labelClass = {
            // autocasts as new LabelClass()
            symbol: {
              type: "text", // autocasts as new TextSymbol()
              color: "green",
              haloColor: "black",
              font: {
                // autocast as new Font()
                size: 12,
                family: "microsoft-yahei",
                weight: "normal"
              }
            }
          };
          var GongLu = new FeatureLayer({
            url: "http://map.cn.gov/OneMapServer/rest/services/ROAD_FCLASS/FeatureServer/0",
            renderer: glRenderer,
            id: "states",
            outFields: ["*"],
            labelingInfo: [labelClass],
            mode: FeatureLayer.MARKER_ACTIVITY
          });

          /**
           * 地铁
           */
          const dtRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-line", // autocasts as new SimpleLineSymbol()
              width: 2,
              color: [41, 182, 246, 0.4]
            }
          };
          var DiTie = new FeatureLayer({
            url: "http://map.cn.gov/OneMapServer/rest/services/JTSS_FCLASS/FeatureServer/3",
            renderer: dtRenderer,
            outFields: ["*"],
            labelingInfo: [labelClass]
          });

          /**
           * 标志性建筑物机场  JiChang
           */
          const jcRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: [3, 33, 56, 0.8],
              outline: {
                color: [255, 255, 255, 0.3],
                width: 0.5
              }
            }
          };
          var JiChang = new FeatureLayer({
            url: "http://map.cn.gov/OneMapServer/rest/services/JTSS_FCLASS/FeatureServer/6",
            renderer: jcRenderer
          });

          /**
           * 区界图层设置  QUJIE
           */
          const hwyRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-line", // autocasts as new SimpleLineSymbol()
              width: 2,
              color: [237, 231, 246, 1],
              style: "dash"
            }
          };
          // eslint-disable-next-line no-redeclare
          var QUJIE = new FeatureLayer({
            url: "http://map.cn.gov/OneMapServer/rest/services/BOUNDARY/FeatureServer/0",
            renderer: hwyRenderer,
            minScale: 0,
            maxScale: 0,
            title: "区界"
          });

          // var QUJIE = new ArcGISDynamicMapServiceLayer({
          //   url: "http://map.cn.gov/OneMapServer/rest/services/BOUNDARY/MapServer",
          //   id: "QUJIE"
          // });

          // var CN_STREET = new FeatureLayer({
          //   url: "http://map.cn.gov/OneMapServer/rest/services/CN_STREET/MapServer/layers/0"
          //   // renderer: jdRenderer
          // });
          // this.map.add(CN_STREET);
          // console.log(this.map.geometry);

          this.map.add(tiledLayer);
          this.map.add(GongLu);
          this.map.add(DiTie);
          this.map.add(JiChang);
          this.map.add(QUJIE);

          let pointFly = [];

          this.view.ui.components = [];

          /**
           * 飞机
           */
          var flyData = [
            {
              x: -12647.14,
              y: -3899.07,
              NAME: "上海虹桥国际机场"
            }
          ];
          var flyImg = {
            type: "picture-marker",
            url: fly,
            width: "116px",
            height: "86px"
          };

          for (var i = 0; i < flyData.length; i++) {
            pointFly.push(
              new Graphic({
                attributes: flyData[i],
                geometry: {
                  type: "point",
                  x: flyData[i].x,
                  y: flyData[i].y,
                  spatialReference: spatialReferencevalue
                },
                symbol: flyImg
              })
            );
          }
          this.view.graphics.addMany(pointFly);

          console.log("DID INITED");

          this.view.when(() => {
            this.mapDidUpdate(this.props.datas);
            ["drag", "mouse-whell", "double-click"].forEach(e => {
              this.view.on(e, event => {
                this.cameraModifyed = true;
              });
            });
            watchUtils.whenTrue(this.view, "stationary", () => {
              if (this.cameraModifyed) {
                this.cameraModifyed = false;
                this.mapDidUpdate(this.props.datas);
              }
            });

            this.view.popup.autoOpenEnabled = false;
            this.view.on("click", e => {
              this.view.hitTest(e).then(result => {
                console.log(result);
                let objGraphic = result.results[0].graphic;
                var popup = objGraphic.attributes.popup;
                var indexCode = objGraphic.attributes;
                let all = objGraphic.attributes;
                if (
                  all.NAME === "上海虹桥国际机场" ||
                  all === null ||
                  all.name === "外环高速公路" ||
                  all.name === "北新泾-青浦公路" ||
                  all.name === "上海-聂拉木公路" ||
                  all.name === "虹中路" ||
                  all.name === "金沙江西路" ||
                  all.BUSTYPE === "轨道交通" ||
                  all.objectid === 1
                ) {
                  return false;
                } else if (result.results.length > 0) {
                  var mapPoint = result.results[0].mapPoint;
                  this.view.popup.open({
                    location: mapPoint,
                    content: popup(indexCode)
                  });
                }
              });
            });

            this.view.ui.components = [];
            this.mapDidMount();
            this.setState({ mapReady: true });
          });
        }
      );
  }

  render() {
    return <div id="mapDiv" style={{ width: "100%", height: "100%" }} {...this.props} />;
  }
}
