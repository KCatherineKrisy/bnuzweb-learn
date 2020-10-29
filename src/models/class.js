import * as classService from '../services/ClassAPI'
import * as userService from '../services/UserAPI'
import { Modal } from 'antd'

export default {
  namespace: 'class',

  state: {
    searchClassList: [], // 查詢课程結果
    searchOrgList: [], // 查询机构结果
    total: 0, // 結果數量
    type: 'class', // class, organization
    keywords: '', // 關鍵詞
    pageNo: 1, //  當前頁數
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
    // 获取课程搜索的标签、类型、的确
    *getSearchOpinion({}, { call, put }) { 
      const data = yield call(classService.getSearchOpinion);
      if(data.data.success === true) {
        yield put({
          type: 'updateSearchOpinion',
          payload: {
            data: data.data.data,
          }
        })
      }
    },

    // 按照關鍵詞搜索課程
    *searchClassItem({ payload: value }, { call, put, select }) {
      let keywords = yield select(state => state.class.keywords);
      // 关键词不为空且和现有的关键词不同，则重置页数为 1
      if(!value.keywords || value.keywords !== keywords || value.searchFuc === 'click') {
        yield put({ type: 'resetData'})
      }
      yield put({
        type: 'updateSearchKeywords',
        payload: { 
          keywords: value.keywords,
          type: value.type, 
        }
      })
      let pageNo = yield select(state => state.class.pageNo);
      value.pageNo = pageNo;
      const data = yield call(classService.searchClassItem, value);
      if(data.data.success === true && data.data.data.total > 0) {
        yield put({
          type: 'updateSearchList',
          payload: {
            total: data.data.data.total,
            searchClassList: data.data.data.rows,
            pageNo: pageNo + 1
          }
        })
      } else if (data.data.success === true && data.data.data.total === 0) {
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
      if(data.data.success === true) {
        yield put({
          type: 'updateClassDetail',
          payload: {
            classDetail: data.data.data,
          }
        })
      }
    },

    // 添加評論到指定活動 id
    *addComment({ payload: value }, { call, put, select }) {
      const data = yield call(classService.addComment, value);
      const activityId = yield select(state => state.classDetail.item.id);
      if(data.data.code === 20000) {
        const newData = yield call(classService.getClassDetailId, activityId);
        if(newData.data.success === true) {
          yield put({
            type: 'updateClassComments',
            payload: {
              comments: newData.data.data.comments,
            }
          })
        } else {
          Modal.error({
            title: '评论失败',
            content: '评论失败，请重试哦！'
          })
        }
      } else if (data.data.code === 20003) {
        Modal.error({
          title: '评论失败',
          content: '报名参加课程后才能评论哦，快来报名吧！'
        })
      }
    },

    // 獲取用戶信息用於評論
    *getUserInfo({ payload: value }, { call, put, select }) {
      const data = yield call(userService.getUserInfo);
      if(data.data.success === true) {
        yield put({
          type: 'updateUserInfo',
          payload: {
            user: data.data.data.userDetail
          }
        })
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
        searchClassList: action.payload.searchClassList, 
        total: action.payload.total,
        pageNo: action.payload.pageNo
      }
    },

    // 修改顯示框上的關鍵詞
    updateSearchKeywords(state, action) {
      return { ...state, keywords: action.payload.keywords }
    },

    // 重置页数
    resetData(state, action) {
      return { ...state, pageNo: 1, searchClassList: [], searchOrgList: [], total: 0 }
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