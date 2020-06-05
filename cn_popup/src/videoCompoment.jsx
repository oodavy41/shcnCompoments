import React, { Component } from "react";
import Loading from "./loading";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";
export default class AlertInfo extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.id = "";
    this.state = {
      Hls_url: "",
      loading: true,
    };
  }
  componentWillUnmount() {
    console.log("disposed");
    this.player && this.player.dispose();
  }
  componentDidMount() {
    console.log("mounted");
    let player = videojs(this.props.code);
    player.on("ready", function () {
      console.log("video", "ready", this);
      this.play();
      this.setState({ loading: false });
    });
    player.on("error", () => {
      console.log("video error");
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

  shouldComponentUpdate(next, nextState) {
    return (
      this.props.videoId !== next.videoId &&
      this.state.loading !== nextState.loading
    );
  }

  getData(id) {
    if (this.id === id) {
      return;
    }
    this.setState({ loading: true });

    let getData = [
      {
        distrcit: "13",
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

        if (this.player) {
          this.player.src(url);
          this.player.load(url);
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
          data-vjs-player
          width="270px"
          height="180px"
          id={this.props.code}
          className="video-js"
          preload="auto"
          controls={false}
          autoPlay
          data-setup="{}"
          style={{ margin: "2px auto" }}
        >
          <source
            // src={this.state.Hls_url}
            type="application/x-mpegURL"
          ></source>
        </video>
        <p
          style={{
            position: "relative",
            bottom: 170,
            left: 40,
          }}
        >
          {this.props.videoId}
        </p>
        {loading ? <Loading></Loading> : ""}
      </div>
    );
  }
}
