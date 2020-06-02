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
    this.getData(this.props.videoId);
  }
  componentDidUpdate() {
    this.getData(this.props.videoId);
  }

  getData(id) {
    if (this.id === id) {
      return;
    }
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
        const { url } = JSON.parse(response.data.result)[0];
        console.log(response, url);

        if (!this.player) {
          console.log("mounted");
          let player = videojs(this.props.code);
          player.on("ready", function () {
            console.log("video", "ready", this);
            this.play();
            this.setState({ loading: false });
          });
          player.on("error", () => {
            player.errorDisplay.close();
          });
          // player.width = 800;
          // player.height = 600;
          this.player = player;
          player.src(url);
          player.load(url);
          this.setState({
            Hls_url: url,
            loading: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { loading } = this.state;
    return (
      <div style={{ width: 300, height: 200 }}>
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
          style={{ margin: "10px auto" }}
        >
          <source
            // src={this.state.Hls_url}
            type="application/x-mpegURL"
          ></source>
        </video>
        <p style={{ 
          position: "relative", bottom: 190 }}>{this.props.videoId}</p>
        {loading ? <Loading></Loading> : ""}
      </div>
    );
  }
}
