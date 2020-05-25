import axios from 'axios';
var getToken;
export default getToken=()=>{
  axios({
    url: 'http://bigdata.cn.gov:8080/visdata/rest/auth/login',
    method: 'post',
    data: {
      username: 'dituapi@dituapi.com',
      password: 'dituapi',
      captchaSwitch:false
    },
    transformRequest: [
      function(data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(d => {
      var token_HESHENG = d['data']['result']['access_token']
      console.log(token_HESHENG, 'token')
      localStorage.setItem("token",token_HESHENG);
    })
    .catch(error => {
      console.log('error!:'+ error)
    })
}

