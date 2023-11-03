let config = require('../config/config');
let axios = require('../utils/request').default;
let store = require('../store');

let user = {
  login(params) {
    return axios.post(`/webapp/user/login`, params);
  },
  register(params) {
    return axios.post(`/webapp/user/register`, params);
  },
}

module.exports = user;
