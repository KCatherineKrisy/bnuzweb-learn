import request from '../utils/request'
import API from '../config/api'
import { compile } from 'path-to-regexp';

/**
 * 根据关键词搜索课程
 * @export
 * @param {*} params
 * @returns
 */
export function searchClassItem(params) {
  return request(API.CLASS.SEARCH_CLASS_ITEM, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

/**
 * 返回搜索可用的标签、类型、地点
 * @export
 * @returns
 */
export function getSearchOpinion() {
  return request(API.CLASS.GET_SEARCH_OPINION, {
    method: 'GET',
  })
}

/**
 * 根據活動 id 獲取活動數據
 * @export
 * @param {*} params
 */
export function getClassDetailId(params) {
  const pattern = compile(API.CLASS.GET_ACTIVITY);
  const url = pattern({ id: params.id });
  return request(url, {
    method: 'GET',
  })
}

/**
 * 根據活動 id 獲取評論，用於評論後局部刷新
 * @export
 * @param {*} params
 * @returns
 */
export function getCommentByActivity(params) {
  const pattern = compile(API.CLASS.GET_COMMENT_BY_ACTIVITY);
  const url = pattern({ id: params.id });
  return request(url, {
    method: 'GET'
  })
}

/**
 * 生成訂單號
 * @export
 * @param {*} params
 * @returns
 */
export function addOrder(params) {
  return request(API.CLASS.ADD_ORDER, {
    method: 'POST',
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
  const pattern = compile(API.CLASS.CREATE_NATIVE);
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
  const pattern = compile(API.CLASS.QUERY_PAY_STATUS);
  const url = pattern({ orderNo: params.orderNo });
  return request(url, {
    method: 'GET'
  })
}

/**
 * 添加笔记
 * @export
 * @param {*} params
 * @returns
 */
export function addNote(params) {
  return request(API.USER.ADD_NOTE, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

/**
 * 收藏课程
 * @export
 * @param {*} params
 * @returns
 */
export function addCollection(params) {
  return request(API.CLASS.ADD_COLLECTION, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}