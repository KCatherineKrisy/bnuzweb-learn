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

/**
 * 获取个人信息页
 * @export
 * @param {*} params
 * @returns
 */
export function getUserInfo(params) {
  return request(API.USER.GET_USER_DETAIL, {
    method: 'GET'
  })
}

/**
 *  更新个人信息
 * @export
 * @param {*} params
 * @returns
 */
export function updateUserInfo(params) {
  return request(API.USER.UPDATE_USER_DETAIL, {
    method: 'PUT',
    body: JSON.stringify(params)
  });
}