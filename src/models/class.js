import * as classService from '../services/ClassAPI'
import * as userService from '../services/UserAPI'
import { message, Modal } from 'antd'

export default {
  namespace: 'class',

  state: {
    searchClassList: [], // 课程查询结果
    total: 0, // 結果數量
    type: 'class', // class, organization
    keywords: '', // 關鍵詞
    pageSize: 8, // 一次返回的數量
    labelList: [], // 课程标签
    subjectList: [], // 课程类型 
    regionTree: [], // 地区列表
    classDetail: {}, // 活動詳細信息
    comments: [], // 活動評論
    user: {}, // 用戶信息
  },

  subscriptions: {},

  effects: {
    // 获取课程搜索的标签、类型、
    *getSearchOpinion({}, { call, put }) { 
      const data = yield call(classService.getSearchOpinion);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateSearchOpinion',
          payload: {
            data: data.data.data,
          }
        })
      }
    },

    // 按照關鍵詞搜索課程
    *searchClassItem({ payload: value, callback }, { call, put, select }) {
      console.log(value, 'value')
      if(value.searchFuc === 'click') {
        value.pageNo = 1;
      }
      yield put({
        type: 'updateSearchKeywords',
        payload: { 
          keywords: value.keywords,
          type: value.type, 
        }
      })
      let pageSize = yield select(state => state.class.pageSize);
      value.pageSize = pageSize;
      const data = yield call(classService.searchClassItem, value);
      if(data.data.code === 20000 && data.data.data.total > 0) {
        if(callback && typeof callback === 'function') {
          callback(data.data.data);
        }
        yield put({
          type: 'updateSearchList',
          payload: {
            total: data.data.data.total,
            searchClassList: data.data.data.rows,
          }
        })
      } else if (data.data.code === 20000 && data.data.data.total === 0) {
        Modal.info({
          title: '搜索失败',
          content: '这个关键词搜不到内容呢，要不要换个试试~'
        })
      } else {
        Modal.error({
          title: '信息获取失败',
          content: '哎呀出错了，请重试！'
        })
      }
    },

    // 根據活動 ID 獲取詳細信息
    *getClassDetailById({ payload: value }, { call, put }) {
      const data = yield call(classService.getClassDetailId, value);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateClassDetail',
          payload: {
            classDetail: data.data.data,
          }
        })
      }
    },

    // 獲取用戶信息用於評論
    *getUserInfo({ payload: value }, { call, put, select }) {
      const data = yield call(userService.getUserInfo);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateUserInfo',
          payload: {
            user: data.data.data.userDetail
          }
        })
      }
    },

    // 发送报名请求
    *addOrder({ payload: value, callback }, { call, put, select }) {
      const data = yield call(classService.addOrder, value);
      if(data.data.code === 20000) {
        if(callback && typeof callback === 'function') {
          callback(data.data.data);
        }
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

    // 发送收藏请求
    *addCollection({ payload: value }, { call, put }) {
      const data = yield call(classService.addCollection, value);
      if(data.data.code === 20000) {
        message.success('收藏成功')
      } else {
        message.error('收藏失败，请重试！')
      }
    }
  },

  reducers: {
    // 更新课程标签、类型、地区
    updateSearchOpinion(state, action) {
      return {
        ...state,
        labelList: action.payload.data.labelList,
        subjectList: action.payload.data.subjectList,
        regionTree: action.payload.data.regionTree,
      }
    },

    // 將查詢結果更新到 state 中
    updateSearchList(state, action) {
      return { 
        ...state, 
        total: action.payload.total,
        searchClassList: action.payload.searchClassList,
      }
    },

    // 修改顯示框上的關鍵詞
    updateSearchKeywords(state, action) {
      return { ...state, keywords: action.payload.keywords }
    },

    // 更新活動信息
    updateClassDetail(state, action) {
      return { ...state, classDetail: action.payload.classDetail, comments: action.payload.classDetail.comments }
    },

    // 更新活動評論列表
    updateClassComments(state, action) {
      return { ...state, comments: action.payload.comments }
    },

    // 更新用戶信息
    updateUserInfo(state, action) {
      return { ...state, user: action.payload.user }
    }
  }
}