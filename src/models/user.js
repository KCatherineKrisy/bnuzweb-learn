import * as userService from '../services/UserAPI'
import { Modal } from 'antd'

export default {
  namespace: 'user',

  state: {
    user: {}, // 用户信息
  },

  subscriptions: {},

  effects: {
    *getUserDetail({payload: value}, { call, put }) {
      const data = yield call(userService.getUserInfo);
      if(data.data.success === true) {
        yield put({
          type: 'getUserInfo',
          payload: {
            user: data.data.data.userDetail
          }
        })
      } else {
        Modal.error({
          title: '信息获取失败',
          content: '哎呀出错了，请重试！'
        })
      }
    },

    *updateUserDetail({payload: value}, { call, put }) {
       const data = yield call(userService.updateUserInfo, value);
       console.log(data,'updateUserInfo');
    },
  },

  reducers: {
    // 更新用户信息
    getUserInfo(state, action) {
      return { ...state, user: action.payload.user }
    },
  },
}