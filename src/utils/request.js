/*
 * @Author: shallwe
 * @Date: 2019-10-27 17:01:56
 * @LastEditTime : 2019-12-24 15:24:09
 * @LastEditors  : shallwe
 */
import axios from 'axios'
import { Message } from 'element-ui'

const isPrd = process.env.NODE_ENV === 'production'
const service = axios.create({
    // baseURL: `http://localhost:3000/${isPrd ? 'manage/' : ''}api`, // url = base url + request url
    baseURL: isPrd
        ? 'https://www.supervv.cn/manage/api'
        : 'http://localhost:3000/api',
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // console.log(111, csrfToken, csrfHeader)
        config.headers['fromClient'] = true
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        // if the custom code is not 0, it is judged as an error.
        if (res.code !== 0) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            // return Promise.reject(new Error(res.message || 'network Error'))
            return Promise.resolve(res)
        } else {
            return res
        }
    },
    error => {
        // const resp = error.response || {}
        // console.log('err------->', resp) // for debug
        Message({
            message: error.message || '网络错误~',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
