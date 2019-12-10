/*
 * @Author: shallwe
 * @Date: 2019-12-10 16:35:48
 * @LastEditTime: 2019-12-10 16:51:10
 * @LastEditors: shallwe
 */
import request from '../utils/request'

export function getBlogList(params) {
    return request({
        url: `/blog/list`,
        method: 'get',
        params
    })
}

export function getBlogDetail(params) {
    params = params || {}
    return request({
        url: `/blog/get/${params.blogId}`,
        method: 'get',
        params
    })
}
