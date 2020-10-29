import request from '../utils/request'
import API from '../config/api'
import { compile } from 'path-to-regexp';

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

/**
 * 生成訂單號
 * @export
 * @param {*} params
 * @returns
 */
export function addOrder(params) {
  return request(API.USER.ADD_ORDER, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

/**
 * 獲取用戶全部訂單列表
 * @export
 * @param {*} params
 * @returns
 */
export function getOrderItemList(params) {
  return request(API.USER.GET_ORDER_ITEM_LIST, {
    method: 'GET',
    body: JSON.stringify(params)
  })
}

/**
 * 根據訂單號生成二維碼
 * @export
 * @param {*} params
 * @returns
 */
export function createNative(params) {
  const pattern = compile(API.USER.CREATE_NATIVE);
  const url = pattern({ orderNo: params.orderNo });
  return request(url, {
    method: 'GET'
  })
}

/**
 * 根據訂單號獲取訂單支付情況
 * @export
 * @param {*} params
 * @returns
 */
export function queryPayStatus(params) {
  const pattern = compile(API.USER.QUERY_PAY_STATUS);
  const url = pattern({ orderNo: params.orderNo });
  return request(url, {
    method: 'GET'
  })
}