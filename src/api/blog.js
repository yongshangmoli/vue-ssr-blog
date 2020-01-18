/*
 * @Author: shallwe
 * @Date: 2019-12-10 16:35:48
 * @LastEditTime : 2020-01-18 21:35:18
 * @LastEditors  : shallwe
 */
import request from '../utils/request'

const tls = require('tls')
tls.DEFAULT_ECDH_CURVE = 'auto'

export function getBlogList(params) {
    return request({
        url: `/blog/list`,
        method: 'get',
        params
    })
}

export function getBlogDetail(params) {
    return request({
        url: `/blog/get/${params.blogId}`,
        method: 'get',
        params
    })
}
