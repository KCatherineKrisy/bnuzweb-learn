import * as userService from '../services/UserAPI' 
import * as classService from '../services/ClassAPI'
import { Modal, message } from 'antd'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'user',

  state: {
    user: {}, // 用户信息
    registerModalVisible: false, // 显示注册弹窗
    isLogin: false, // 是否已经登录
    noteList: [], //用户笔记列表
    noteDetail: {}, // 笔记详情信息
    orderList: [], // 订单列表
    orderDetail: {}, // 订单详情
    collectionList: [], // 用户收藏列表
    messageList: [], // 用户消息列表
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
    *updateUserDetail({ payload: value }, { call, put }) {
      const data = yield call(userService.updateUserInfo, value);
      if(data.data.code === 20000) {
        message.success('修改成功！');
      } else {
        Modal.error({
          title: '信息修改失败',
          content: '哎呀出错了，请重试！'
        })
      }
    },

    // 根据用户获取笔记列表
    *getNoteList({ payload: value }, { call, put }) {
      const data = yield call(userService.getNoteList);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateNoteList',
          payload: {
            noteList: data.data.data.notes
          }
        })
      }
    },

    // 删除笔记
    *deleteNote({ payload: value }, { call, put }) {
      const data = yield call(userService.deleteNote, value);
      if(data.data.code === 20000) {
        message.success('删除成功！');
        // 更新笔记列表
        yield put({
          type: 'getNoteList'
        })
      }
    },

    // 根据笔记 id 获取详情内容
    *getNoteDetailById({ payload: value }, { call, put }) {
      const data = yield call(userService.getNoteById, value);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateNoteDetail',
          payload: {
            noteDetail: data.data.data.note
          }
        })
      }
    },

    // 发布笔记
    *addNote({ payload: value }, { call, put }) {
      const data = yield call(userService.addNote, value);
      if(data.data.code === 20000) {
        message.success('发布成功');
        yield put(routerRedux.go(-1));
      } else {
        Modal.error({
          title: '发布笔记失败',
          content: '发布笔记失败，请重试！'
        })
      }
    },

    // 更新笔记
    *updateNote({ payload: value }, { call, put }) {
      const data = yield call(userService.updateNote, value);
      if(data.data.code === 20000) {
        message.success('更新成功');
        yield put(routerRedux.go(-1));
      } else {
        Modal.error({
          title: '更新笔记失败',
          content: '更新笔记失败，请重试！'
        })
      }
    },

    // 根据订单号获取支付二维码
    *createNative({ payload: value, callback }, { call, put }) {
      const data = yield call(classService.createNative, value);
      if(data.data.code === 20000) {
        if(callback && typeof callback === 'function') {
          callback(data.data.data)
        }
      } else {
        Modal.error({
          title: '网络错误',
          content: '网络出错，请重试！'
        })
      }
    },

    //根据订单号获取支付状态
    *queryPayStatus({ payload: value, callback }, { call, put }) {
      const data = yield call(classService.queryPayStatus, value);
      if(data.data.code === 25000) {
        if(callback && typeof callback === 'function') {
          callback(data.data.data)
        }
      }
    },

    // 获取全部订单
    *getAllOrder({ payload: value }, { call, put }) {
      const data = yield call(userService.getAllOrder, value);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateOrderList',
          payload: {
            orderList: data.data.data.orderList,
          }
        })
      }
    },

    // 根据订单号获取详情
    *getOrderDetail({ payload: value }, { call, put }) {
      const data = yield call(userService.getOrderDetail, value);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateOrderDetail',
          payload: {
            orderDetail: data.data.data
          }
        })
      }
    },

    // 获取用户收藏列表
    *getCollectionList({ payload: value, callback }, { call, put }) {
      const data = yield call(userService.getCollectionList, value);
      console.log(data.data.data);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateCollectionList',
          payload: {
            collectionList: data.data.data.collections
          }
        })
      }
    },

    // 获取用户消息列表
    *getMessageList({ payload: value, callback }, { call, put }) {
      const data = yield call (userService.getMessageList) 
        console.log(data.data.data);
    },

    // 添加評論到指定活動 id
    *addComment({ payload: value, callback }, { call, put, select }) {
      const data = yield call(userService.addComment, value);
      if(data.data.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(data.data.data); // 返回结果
        }
      } else {
        Modal.error({
          title: '评论失败',
          content: '评论失败，请重试哦！'
        })
      }
    },
  },

  reducers: {
    // 更新用户信息
    getUserInfo(state, action) {
      return { ...state, user: action.payload.user }
    },

    // 更新笔记列表
    updateNoteList(state, action) {
      return { ...state, noteList: action.payload.noteList }
    },

    // 更新笔记详情
    updateNoteDetail(state, action) {
      return { ...state, noteDetail: action.payload.noteDetail }
    },

    // 更新订单列表
    updateOrderList(state, action) {
      return { ...state, orderList: action.payload.orderList }
    },

    // 更新订单详情
    updateOrderDetail(state, action) {
      return { ...state, orderDetail: action.payload.orderDetail }
    },

    // 更新收藏列表
    updateCollectionList(state, action) {
      return { ...state, collectionList: action.payload.collectionList }
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