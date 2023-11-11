let config = require('../config/config');
let axios = require('../utils/request').default;
let store = require('../store');

let message = {
  send_message(params) {
    return axios.post(`/webapp/message/send_message`, params, {
      timeout: 1000 * 60 * 5,
    });
  }
}

module.exports = message;
