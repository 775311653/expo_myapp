let config = require('../config/config');
let axios = require('../utils/request').default;
let store = require('../store');

let service = {
// 获取service列表
  get_services(params) {
    return axios.get(`/webapp/service/get_services`, { params });
  },
  // 获取单个service
  get_service_by_id(params) {
    return axios.get(`/webapp/service/get_service_by_id`, { params });
  }
}

module.exports = service;
