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
  // 获取用户信息
  get_user_info(params) {
    return axios.get(`/webapp/user/get_user_info`, { params });
  }
}

module.exports = user;
