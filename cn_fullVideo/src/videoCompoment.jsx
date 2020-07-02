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
    player = videojs(this.playerNode, {}, () => {
      console.log("video", "ready", this);
      this.setState({ loading: false });
      this.ready = true;
    });
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
          console.log("!!!");
        }
        this.sbbh = id;
        this.setState({
          Hls_url: url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { loading, Hls_url, hide } = this.state;
    const width = 7680,
      height = 2160;
    let containerStyle = {
      zIndex: 9,
      position: "fixed",
      top: 0,
      left: 0,
      width: width,
      height: height,
      overflow:"hidden",
      color: "#fff",
      // backgroundColor: "#000",
    };
    if (this.player) {
      this.player.width = width;
      this.player.height = height;
    }
    return (
      <div style={containerStyle} onDoubleClick={() => this.props.hider()}>
        <video
          ref={(n) => (this.playerNode = n)}
          id={this.props.key + "camPopup"}
          width={width}
          height={height}
          className="video-js"
          preload="auto"
          controls={false}
          autoPlay
          style={{
            position:"absolute",
            width: width,
            height: height * 2,
            top:-height/4
          }}
        >
          <source
            src={this.state.Hls_url}
            type="application/x-mpegURL"
          ></source>
        </video>
        <div
          style={{
            position: "absolute",
            fontSize: "5em",

            bottom: 0,
          }}
        >
          {this.props.videoId}
        </div>
        {loading ? <Loading></Loading> : ""}
      </div>
    );
  }
}
