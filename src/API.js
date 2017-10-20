import 'whatwg-fetch';//important for getting it to work on safari.
import {hashHistory} from 'react-router';
var BASE_URL="http://localhost:5000"

var API={
  postRequest(payload, route) {
    return new Promise((res, rej) => {
      var data = JSON.stringify(payload)
      fetch(BASE_URL + route, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
      }).then((resp) => {
        resp.json()
        .then((json) => res(json))
        .catch((err) => rej(err))
      })
      .catch((err) => rej(err))
    });
  },
  getRequest(route){
    return new Promise((res, rej) => {
      fetch(BASE_URL + route).then((resp) => {
        resp.json()
        .then((json) => res(json))
        .catch((err) => rej(err))
      })
      .catch((err) => rej(err))
    });
  },
  changePath: function(pathname, state){
      hashHistory.push({pathname: (pathname), state: state}, pathname,{});
  },
}

export default API;
