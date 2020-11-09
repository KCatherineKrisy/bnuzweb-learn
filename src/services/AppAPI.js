import request from '../utils/request'
import API from '../config/api'
import { compile } from 'path-to-regexp';

export function getLabelList(params) {
  const pattern = compile(API.APP.GET_LABEL_LIST);
  const url = pattern({ num: params.num });
  return request(url, {
    method: 'GET'
  })
}

export function getNews(params) {
  const pattern = compile(API.APP.GET_NEWS);
  const url = pattern({ num: params.num });
  return request(url, {
    method: 'GET'
  })
}

export function getLoginInfo() {
  return request(API.APP.GET_LOGIN_INFO, {
    method: 'GET'
  })
}