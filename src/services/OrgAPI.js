import request from '../utils/request'
import API from '../config/api'
import { compile } from 'path-to-regexp'

/**
 * 获取所有机构列表
 * @export
 * @returns
 */
export function getOrgList() {
  return request(API.ORG.GET_ORG_LIST, {
    method: 'GET'
  })
}

/**
 * 根据 oid 获取机构详细描述
 * @export
 * @param {*} params
 * @returns
 */
export function getOrgDescribe(params) {
  const pattern = compile(API.ORG.GET_ORG_DESCRIBE);
  const url = pattern({ oid: params.oid });
  return request(url, {
    method: 'GET',
  })
}