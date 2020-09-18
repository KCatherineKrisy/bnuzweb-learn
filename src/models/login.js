import * as userService from '../services/UserAPI'

export default {
  // 当前 model 的名称
  namespace: 'login',

  // 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
  state: {
    loginModalVisible: false,
    registerModalVisible: false,
  },

  // 订阅器，管理所有组件
  subscriptions: {

  },

  // Action 处理器，处理异步动作
  effects: {
    *login({ payload: value }, { call }) {
      console.log('调用登录函数')
      const data = yield call(userService.login, value);
      console.log('data:', data);
    }
  },

  // Action 处理器，处理同步动作，用来算出最新的 State
  reducers: {
    // 显示注册窗口
    showLoginModal(state, action) {
      return { ...state, ...action.payload }
    }
  },
}