import axios from 'axios';
const cors = require("cors");

axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
  "Access-Control-Allow-Origin": "http://localhost:8080",
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const config = {
  "Access-Control-Allow-Origin": "http://localhost:8080",
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  "Access-Control-Allow-Headers": "Content-Type",
}

export default (url) => {
  axios.get(url, config)
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
};