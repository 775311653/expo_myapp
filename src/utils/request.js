import axios from 'axios'

import store from '../store'

let config = require('../config/config');
let baseUrl = config.url.adminBaseUrl;
// 创建一个axios实例
const service = axios.create({
    baseURL: baseUrl, // url =基本url +请求url
    // 凭据:true，当跨域请求时发送cookie
    timeout: 20000 // 对超时
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么

        if (store.persist.token) {
            // 让每个请求携带令牌
            // ['X-Token']是一个自定义头键
            // 请根据实际情况修改
            config.headers['X-Token'] = store.persist.token;
        }
        return config
    },
    error => {
        // 处理请求错误
        // message.error(error.message);
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    /**
     * 如果您想获得http信息，例如头信息或状态信息
     * 请返回response => response
     */

    /**
     * 通过自定义代码确定请求状态
     * 这里只是一个例子
     * 您还可以通过HTTP状态代码来判断状态
     */
    response => {
        if (response.status !== 200) {
            // message.error(response.status)
        }
        const res = response.data
        // 50008:非法令牌;50012:其他客户登录;50014:令牌过期;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            // message.error('Please log in again');
            store.persist.token = '';
            window.location.reload();
        } else if (res.code !== 0 || res.code === 60000) {
            // 如果自定义代码不是10000，则判断为错误
            // message.error(res.msg,5);
        }
        return res

    },
    // error => {
    //     console.log(error.response.status)
    //     console.log('err:' + error.message) // for debug
    //
    //     if (error.message.includes('timeout')) {
    //         message.error('network connect time out')
    //     } else if (error.message.includes('Network Error')) {
    //         message.error('network connect error')
    //     } else {
    //         message.error('other network connect error');
    //     }
    //
    //     return Promise.reject(error)
    // }
)

export default service
