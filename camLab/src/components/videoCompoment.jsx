import React, { Component } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";
export default class AlertInfo extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      Hls_url: "",
    };
  }
  componentWillUnmount() {
    console.log("disposed");
    this.player && this.player.dispose();
  }
  componentDidMount() {
    this.getData(this.props.videoId);
  }
  componentDidUpdate() {
    this.getData(this.props.videoId);
  }

  shouldComponentUpdate(next) {
    return this.props.videoId !== next.videoId;
  }

  getData(id) {
    let getData = [
      {
        distrcit: "13",
        town: "",
        url: "",
        type: "application/x-mpegURL",
        code: id,
      },
    ];
    // axios.post('http://127.0.0.1:9000/hls?id='+this.props.attr.indexCode).then( (response)=> {
    axios
      .post(
        "http://bigdata.cn.gov:8080/visdata/rest/sign/signservice/body/data",
        getData 
      )
      .then((response) => {
        console.log(response);
        this.setState({
          // Hls_url:response.data.data
          Hls_url: JSON.parse(JSON.parse(response.data.result).result)
            .playrealUrl,
        });
        if (!this.player) {
          console.log("mounted");
          let player = videojs(this.props.code);
          player.on("ready", function () {
            console.log("video", "ready", this);
            this.play();
          });
          // player.width = 800;
          // player.height = 600;
          this.player = player;
          console.log(player);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <video
        data-vjs-player
        width="300px"
        height="200px"
        id={this.props.code}
        className="video-js"
        preload="auto"
        controls={false}
        autoPlay
        data-setup="{}"
      >
        <source src={this.state.Hls_url} type="application/x-mpegURL"></source>
      </video>
    );
  }
}
