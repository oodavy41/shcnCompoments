import axios from "axios";
// import qs from "qs";

const serivce = axios.create({
  // baseURL: "",  // api的base_url 可写在process.env.BASE_URL中
  timeout: 50000 // 请求超时时间
});
let isRetryRequest = false;
let visdataConfig = {
  url: "http://bigdata.cn.gov:8080/visdata/rest/auth/login",
  method: "post",
  data: {
    username: "dituapi@dituapi.com",
    password: "dituapi",
    captchaSwitch: false
  },
  transformRequest: [
    function(data) {
      // Do whatever you want to transform the data
      let ret = "";
      for (let it in data) {
        ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
      }
      return ret;
    }
  ],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
let getTokenPromise = axios(visdataConfig);

serivce.interceptors.request.use(
  // 请求拦截
  config => {
    let token = localStorage.getItem("token111");
    return new Promise(resolve => {
      if (isRetryRequest === true) {
        getTokenPromise.then(d => {
          console.log("token had gotted", config);
          isRetryRequest = false;
          config.headers["token"] = d["data"]["result"]["access_token"];
          resolve(config);
        });
      } else {
        if (token == null) {
          console.log("token requesting");
          isRetryRequest = true;
          getTokenPromise
            .then(d => {
              var token_HESHENG = d["data"]["result"]["access_token"];
              localStorage.setItem("token111", token_HESHENG);
              token = token_HESHENG;
              config.headers["token"] = token;
              resolve(config);
            })
            .catch(error => {
              console.log("error!:" + error);
            });
        } else {
          console.log("token exists");
          config.headers["token"] = token;
          resolve(config);
        }
      }
    });
  },
  error => {
    return Promise.reject(error);
  }
);
serivce.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error.response);
    if (error.response) {
      // console.log('上次接口错误config',error.response.config)
      if (error.response.status == 401 && isRetryRequest == true) {
        console.log("401 , retry");
        let token = localStorage.getItem("token");
        let config = error.response.config;
        config.headers["token"] = token;
        return axios(config);
      } else {
        let getTokenPromise = axios(visdataConfig);
        return getTokenPromise.then(d => {
          console.log(d);
          var token_HESHENG = d["data"]["result"]["access_token"];
          localStorage.setItem("token111", token_HESHENG);
          let config = error.response.config;
          config.headers["token"] = token_HESHENG;
          console.log("token request error, retry");
          return axios(config);
        });
      }
    } else {
      console.log("未知错误！");
      return Promise.reject(error);
    }
  }
);
export default serivce;
