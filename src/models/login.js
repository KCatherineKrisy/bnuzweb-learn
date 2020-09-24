import * as userService from '../services/UserAPI'
import { Modal } from 'antd'
import React from 'react'

export default {
  // 当前 model 的名称
  namespace: 'login',

  // 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
  state: {
    loginModalVisible: false, // 显示登录弹窗
    registerModalVisible: false, // 显示注册弹窗
    isLogin: false, // 是否已经登录
  },

  // 订阅器，管理所有组件
  subscriptions: {

  },

  // Action 处理器，处理异步动作
  effects: {
    *login({ payload: value }, { call, put }) {
      const data = yield call(userService.login, value);
      if(data.data.success === true) {
        const token = data.data.data.token;
        localStorage.setItem('bsyx-user-token', token);
        yield put({
          type: 'closeLoginModal'
        })
      } else {
        Modal.error({
          title: '登录失败',
          content: '用户名或密码错误，请重试！'
        })
      }
    },

    *register({ payload: value}, { call }) {
      console.log('调用注册函数')
      const data = yield call(userService.login, value);
      
    }
  },

  // Action 处理器，处理同步动作，用来算出最新的 State
  reducers: {
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