/* eslint-disable react/no-deprecated */
import React, { Component } from "react";
import R from "ramda";
import axios from "axios";

import bgLeft from "./assets/bgLeft.png";

import cloudy from "./assets/weather/cloudy.png";
import fog from "./assets/weather/fog.png";
import iccefall from "./assets/weather/iccefall.png";
import overcast from "./assets/weather/overcast.png";
import rain from "./assets/weather/rain.png";
import sandstorm from "./assets/weather/sandstorm.png";
import snow from "./assets/weather/snow.png";
import sunny from "./assets/weather/sunny.png";
import thunder from "./assets/weather/thunder.png";

import wet from "./assets/wet.png";
import windSpeed from "./assets/windSpeed.png";
import windDirection from "./assets/windDirection.png";

let weatherIconMap = {
  yun: cloudy,
  wu: fog,
  bingbao: iccefall,
  yin: overcast,
  yu: rain,
  shachen: sandstorm,
  xue: snow,
  qing: sunny,

  lei: thunder
};
export default class Left extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherArr: [
        {
          weather: "多云",
          minTemp: 5,
          maxTemp: 16,
          wind: "南风3级"
        }
      ],
      weatherIcon: "yun",
      wet: 38, // 湿度
      windDirection: "南 311.0", // 风向
      windSpeed: "6km/h" // 风速
    };
  }
  componentWillUnmount() {
    this.requestTimer && clearInterval(this.requestTimer);
    this.aqiTimer && clearInterval(this.aqiTimer);
  }
  componentDidMount() {
    this.getWeatherData();
    this.aqiTimer = setInterval(() => {
      this.getWeatherData();
    }, 60 * 1000);
  }

  getWeatherData() {
    var token_HESHENG = localStorage.getItem("token");
    // if(this.a==1){
    //   console.log('this.a')
    //   token_HESHENG=localStorage.getItem('token')+1;
    //   this.a+=1;
    // }
    axios
      .get(
        "http://bigdata.cn.gov:8080/visdata/rest/pagemanage/dataset/weather/result",
        {
          headers: {
            Token: token_HESHENG
          }
        }
      )
      .then(d => {
        let data = JSON.parse(d.data.result.dataResult);
        let weatherData = {};
        data[0].forEach((e, i) => {
          weatherData[e] = data[1][i];
        });

        this.setState({
          weatherIcon: weatherData.weather_img,
          weatherArr: [
            {
              weather: weatherData.weather,
              minTemp: weatherData.temperature_low,
              maxTemp: weatherData.temperature_high,
              wind: weatherData.wind_direction[0]
            }
          ],
          wet: weatherData.humidity, // 湿度
          windDirection: JSON.parse(weatherData.wind_direction)[0], // 风向
          windSpeed: weatherData.wind_speed // 风速 })
        });
      })
      .catch(error => {
        console.log("error!:", error.response);
      });
  }
  render() {
    let weatherDate = this.state.weatherArr[0];
    return (
      <div
        style={{
          position: "relative",
          color: "#ffffff",
          fontFamily: "微软雅黑",
          position: "absolute",
          top: 0,
          left: 0,
          width: 650,
          height: 1010,
          padding: "70px 0 0",
          background: `url(${bgLeft})no-repeat center center`,
          backgroundSize: "cover",
          transition: " all .5s cubic-bezier(.33,-0.12,.25,2)",
        }}
      >
        {/* <div
          style={{
            minHeight: 1010,
            width: "100%",
            background: `url(${leftSketch})no-repeat center center`
          }}
        ></div> */}
        <div
          // 天气状况
          style={{
            width: 561,
            height: 158,
            position: "absolute",
            top: 65,
            left: 18
          }}
        >
          <img
            style={{ marginTop: 12, marginLeft: 100, height: 50 }}
            src={weatherIconMap[this.state.weatherIcon]}
            alt=""
          />
          <span
            style={{ fontSize: 30, position: "absolute", top: 64, left: 77 }}
          >
            {weatherDate.minTemp}~{weatherDate.maxTemp}°
          </span>
          <div
            // 湿度---风向---风速
            style={{
              position: "absolute",
              top: 29,
              left: 258,
              display: "flex",
              justifyContent: "space-between",
              width: 194
            }}
          >
            <img src={wet} alt="" />
            <img src={windDirection} alt="" />
            <img src={windSpeed} alt="" />
          </div>
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "space-between",
              width: 200,
              left: 254,
              fontSize: 16,
              top: 60
            }}
          >
            <span>湿度</span>
            <span>风向</span>
            <span>风速</span>
          </div>
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "space-between",
              width: 200,
              left: 255,
              top: 85,
              fontSize: 14
            }}
          >
            <span>{this.state.wet}%</span>
            <span>{this.state.windDirection}</span>
            <span>{this.state.windSpeed}</span>
          </div>
        </div>
      </div>
    );
  }
}
