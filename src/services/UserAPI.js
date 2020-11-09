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
 * 删除笔记
 * @export
 * @param {*} params
 * @returns
 */
export function deleteNote(params) {
  const url = API.USER.DELETE_NOTE + '/' + params.note_id;
  return request(url, {
    method: 'DELETE',
  })
}

/**
 * 根据用户 id获取笔记
 * @export
 * @returns
 */
export function getNoteList() {
  return request(API.USER.GET_NOTE_LIST, {
    method: 'GET'
  })
}

/**
 * 更新笔记
 * @export
 * @param {*} params
 * @returns
 */
export function updateNote(params) {
  return request(API.USER.UPTADE_NOTE, {
    method: 'PUT',
    body: JSON.stringify(params)
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
 * 通过笔记id 获取详情内容
 * @export
 * @param {*} params
 * @returns
 */
export function getNoteById(params) {
  const pattern = compile(API.USER.GET_NOTE_BY_ID);
  const url = pattern({ aid: params.aid });
  return request(url, {
    method: 'GET'
  })
}

/**
 * 获取用户全部订单列表
 * @export
 * @param {*} params
 * @returns
 */
export function getAllOrder() {
  return request(API.USER.GET_ALL_ORDER, {
    method: 'GET'
  })
}

/**
 * 根据订单 ID 获取订单详情
 * @export
 * @param {*} params
 * @returns
 */
export function getOrderDetail(params) {
  const pattern = compile(API.USER.GET_ORDER_DETAIL);
  const url = pattern({ id: params.id });
  return request(url, {
    method: 'GET'
  })
}

/**
 * 获取用户全部收藏列表
 * @export
 * @returns
 */
export function getCollectionList(params) {
  const pattern = compile(API.USER.GET_COLLECTION_LIST);
  const url = pattern({ type: params.type })
  return request(url, {
    method: 'GET'
  })
}

/**
 * 根据收藏 id 删除收藏
 * @export
 * @param {*} params
 * @returns
 */
export function delectCollection(params) {
  const pattern = compile(API.USER.DELETE_COLLECTION);
  const url = pattern({ collectionId: params.collectionId });
  return request(url, {
    method: 'DELETE'
  })
}

/**
 * 获取用户消息列表
 * @export
 * @returns
 */
export function getMessageList() {
  return request(API.USER.GET_MESSAGE_LIST, {
    method: 'GET'
  })
}

/**
 * 获取消息详情
 * @export
 * @param {*} params
 * @returns
 */
export function getMessageDetail(params) {
  const pattern = compile(API.USER.GET_MESSAGE);
  const url = pattern({ mid: params.mid });
  return request(url, {
    method: 'GET'
  })
}

/**
 * 添加評論到指定活動 id
 * @export
 * @param {*} params
 * @returns
 */
export function addComment(params) {
  return request(API.USER.ADD_COMMENT, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}