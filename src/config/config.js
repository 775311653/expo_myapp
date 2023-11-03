let isProEnv = process.env.NODE_ENV === 'production';
let config = {
  url: {
    adminBaseUrl: isProEnv ? 'http://192.168.2.115:3020' : 'http://192.168.2.115:3020',
  },
}
module.exports = config;
