let mobx = require('mobx');
// create State object
//持久化的数据
let data = {
    timer: 0,
    userInfo: {userName: 'xp', phone: '18659743071'},
    token: '',
    add_order: {
        formData: {
            interpret_lang_user_need: '',
            chooseLang: {},
            chooseCerts: [],
            support_service_type: {},
            subscribe_time: {},
            subscribe_time_length: 0,
        },
    },
    register: {
        user_name: '',
        user_password: '',
        email: '',
        phone_num: '',
        email_code: '',
        phone_code: '',
        invite_code: '',//邀请码
        phone_code_time: 0,//短信验证码有效时间
        email_code_time: 0,//邮件验证码有效时间
    },
    is_never_show_welcome: false,
    is_never_show_ready_dialog: false,//口译师主页的不显示准备好了的对话框
    interpret_langs: [],
    certs: [],
}
let persistState = mobx.observable(data);

// export default registerState;
module.exports = persistState;
