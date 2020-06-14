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
    this.sbbh = id;

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
        this.setState({
          Hls_url: url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { loading, Hls_url } = this.state;
    return (
      <div style={{ width: 275, height: 180 }}>
        <video
          ref={(n) => (this.playerNode = n)}
          width="270px"
          height="180px"
          className="video-js"
          preload="auto"
          controls={false}
          autoPlay
          style={{ margin: "2px auto" }}
        >
          <source
            src={this.state.Hls_url}
            type="application/x-mpegURL"
          ></source>
        </video>
        <p
          style={{
            position: "relative",
            bottom: 170,
          }}
        >
          {this.props.videoId}
        </p>
        {loading ? <Loading></Loading> : ""}
      </div>
    );
  }
}
