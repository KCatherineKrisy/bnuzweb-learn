export default {
  // 当前 model 的名称
  namespace: 'app',

  // 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
  state: {
    name: '這是 app 的 model',
    loginModalVisible: false,
    registerModalVisible: false
  },

  // 订阅器，管理所有组件
  subscriptions: {

  },

  // Action 处理器，处理异步动作
  effects: {

  },

  // Action 处理器，处理同步动作，用来算出最新的 State
  reducers: {

  },
}