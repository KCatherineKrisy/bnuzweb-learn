import request from '../utils/request'
import API from '../config/api'

/**
 * 用户登录函数
 * @export
 * @param {*} params
 * @returns
 */
export function login(params) {
  return request(API.USER.LOGIN, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

/**
 * 用户注册函数
 * @export
 * @param {*} params
 * @returns
 */
export function register(params) {
  return request(API.USER.REGISTER, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

