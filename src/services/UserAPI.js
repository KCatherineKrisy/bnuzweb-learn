import request from '../utils/request'
import API from '../config/api'

export function login(params) {
  return request(API.USER.LOGIN, {
    mode: 'no-cors',
    method: 'POST',
    body: JSON.stringify(params)
  });
}