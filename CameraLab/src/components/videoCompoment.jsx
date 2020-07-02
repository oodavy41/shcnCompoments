import React, { Component } from "react";
import Loading from "./loading";
import videojs from "video.js";
import "videojs-contrib-hls";
import "video.js/dist/video-js.css";
import axios from "axios";
export default class AlertInfo extends Component {
  constructor(props) {
    super(props);
    this.playerNode = null;
    this.player = null;
    this.sbbh = "";
    this.state = {
      Hls_url: "",
      loading: true,
      fullScreen: false,
    };
    this.ready = false;
  }
  componentWillUnmount() {
    console.log("disposed");
    this.player && this.player.dispose();
  }
  componentDidMount() {
    console.log("mounted");
    let player;
    player = videojs(
      this.playerNode,
      {
        language: "zh-CN",

        preload: "auto",
        // controls: false,
        controlBar: {
          children: [{ name: "playToggle" }],
        },
      },
      () => {
        console.log("video", "ready", this);
        this.setState({ loading: false });
        this.ready = true;
      }
    );
    player.on("error", () => {
      console.log("video error");
      if (!this.state.Hls_url) {
        this.setState({ loading: true });
      }
      player.errorDisplay.close();
    });

    // player.width = 800;
    // player.height = 600;
    this.player = player;
    this.getData(this.props.videoId);
  }
  componentDidUpdate() {
    this.getData(this.props.videoId);
  }

  getData(id) {
    console.log(this.sbbh, "|", id);
    if (this.sbbh === id) {
      return;
    }

    let getData = [
      {
        distrcit: "05",
        town: "",
        url: "",
        type: "application/x-mpegURL",
        code: id,
      },
    ];

    axios
      .post(
        "http://bigdata.cn.gov:8080/visdata/rest/sign/signservice/body/data",
        getData
      )
      .then((response) => {
        const { url } = JSON.parse(response.data.result)[0];
        console.log(response, url);
        console.log(this.player, this.ready);

        if (this.player && url) {
          this.player.src(url);
          console.log("result url", url);
        }
        this.sbbh = id;
        this.setState({
          Hls_url: "url",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { loading, Hls_url, fullScreen } = this.state;
    let width = 705,
      height = 365,
      containerStyle = {
        position: "relative",
        width: width,
        height: height,
        padding: "5px 0",
      };
    if (this.player) {
      this.player.width = width;
      this.player.height = height;
    }
    return (
      <div style={containerStyle} onDoubleClick={() => this.props.fullScreen()}>
        <div
        // style={{ width: containerStyle.width, height: containerStyle.height }}
        >
          <video
            ref={(n) => (this.playerNode = n)}
            id={this.props.key + "camlab"}
            width={width}
            height={height}
            className="video-js"
            style={{ padding: "5px 0" }}
            autoPlay
          >
            <source src={Hls_url} type="application/x-mpegURL"></source>
          </video>
        </div>
        <div
          style={{
            position: "absolute",
            fontSize: "2em",

            bottom: 10,
            left: width / 15,
          }}
        >
          {this.props.videoId}
        </div>
        {loading ? <Loading containerSize={containerStyle}></Loading> : ""}
      </div>
    );
  }
}
