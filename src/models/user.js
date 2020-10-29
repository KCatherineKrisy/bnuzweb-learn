import * as userService from '../services/UserAPI'
import { Modal } from 'antd'

export default {
  namespace: 'user',

  state: {
    user: {}, // 用户信息
    registerModalVisible: false, // 显示注册弹窗
    isLogin: false, // 是否已经登录
  },

  subscriptions: {},

  effects: {
    // 登錄
    *login({ payload: value }, { call, put }) {
      const data = yield call(userService.login, value);
      if(data.data.success === true) {
        yield put({
          type: 'closeLoginModal'
        })
        const token = data.data.data.token;
        localStorage.setItem('bsyx-user-token', token);
      } else {
        Modal.error({
          title: '登录失败',
          content: '用户名或密码错误，请重试！'
        })
      }
    },

    // 註冊
    *register({ payload: value}, { call }) {
      console.log('调用注册函数')
      const data = yield call(userService.login, value);
      
    },

    // 獲取個人信息
    *getUserDetail({payload: value}, { call, put }) {
      const data = yield call(userService.getUserInfo);
      if(data.data.success === true) {
        yield put({
          type: 'getUserInfo',
          payload: {
            user: data.data.data.userDetail
          }
        })
      } 
      else {
        Modal.error({
          title: '信息获取失败',
          content: '哎呀出错了，请重试！'
        })
      }
    },

    // 修改個人信息
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

    // 显示注册窗口
    showRegisterModal() {
      return { registerModalVisible: true, loginModalVisible: false } 
    },

    // 关闭注册窗口
    closeRegisterModal() {
      return { registerModalVisible: false } 
    },

    // 显示登录窗口
    showLoginModal() {
      return { loginModalVisible: true } 
    },

    // 关闭登录窗口
    closeLoginModal() {
      return { loginModalVisible: false } 
    },
  },
}