import * as orgService from '../services/OrgAPI'
import { Modal } from 'antd'

export default {
  namespace: 'org',

  state: {
    orgList: [], // 机构列表
    orgDetail: {}, // 单个机构信息
    newsDetail: {}, // 新闻详情
  },

  subscriptions: {},

  effects: {
    // 获取机构列表
    *getOrgList({}, { call, put }) {
      const data = yield call(orgService.getOrgList);
      if(data.data.success === true) {
        yield put({
          type: 'updateOrgList',
          payload: {
            orgList: data.data.data.orgList
          }
        })
      } else {
        Modal.error({
          title: '信息获取失败',
          content: '网络出错，请刷新重试！'
        })
      }
    },

    // 获取机构详情
    *getOrgDescribe({payload: value}, { call, put }) {
      const data = yield call(orgService.getOrgDescribe, value);
      if(data.data.success === true) {
        yield put({
          type: 'updateOrgDetail',
          payload: {
            orgDetail: data.data.data
          }
        })
      } else {
        Modal.error({
          title: '信息获取失败',
          content: '网络出错，请刷新重试！'
        })
      }
    },

    // 获取新闻详情
    *getNewsDetail({ payload: value}, { call, put }) {
      const data = yield call(orgService.getNewsDetail, value);
      if(data.data.code === 20000) {
        yield put({
          type: 'updateNewsDetail',
          payload: {
            newsDetail: data.data.data.news
          }
        })
      }
    }
  },

  reducers: {
    // 将获取的机构列表更新
    updateOrgList(state, action) {
      return { ...state, orgList: action.payload.orgList }
    },

    // 更新机构信息
    updateOrgDetail(state, action) {
      return { ...state, orgDetail: action.payload.orgDetail }
    },

    // 更新新闻详情
    updateNewsDetail(state, action) {
      return { ...state, newsDetail: action.payload.newsDetail }
    }
  },
}