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
 * 添加評論到指定活動 id
 * @export
 * @param {*} params
 * @returns
 */
export function addComment(params) {
  return request(API.CLASS.ADD_COMMENT, {
    method: 'POST',
    body: JSON.stringify(params)
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