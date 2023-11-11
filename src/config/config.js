let isProEnv = process.env.NODE_ENV === 'production';
let config = {
  url: {
    adminBaseUrl: isProEnv ? 'http://192.168.2.115:3020' : 'http://192.168.2.115:3020',
  },
  designWidth: 375, // 设计稿的宽度 写了这个后，就能使用 px(375)表示屏幕宽度了，就能按照设计稿的尺寸来写样式了
}
module.exports = config;
