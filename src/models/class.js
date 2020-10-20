import * as classService from '../services/ClassAPI'
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
      if(!value.keywords || value.keywords !== keywords || value.searchFuc === 'click') {
        yield put({ type: 'resetPageNo'})
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
    resetPageNo(state, action) {
      return { ...state, pageNo: 1 }
    },

    // 更新活動信息
    updateClassDetail(state, action) {
      let classDetail = action.payload.classDetail;
      classDetail.items.map((item, index) => {
        item.key = index + 1
      })
      return {
        ...state,
        classDetail: classDetail,
      }
    }
  }
}