import * as appService from '../services/AppAPI'
import * as orgService from '../services/OrgAPI'

export default {
  namespace: 'app',

  state: {
    labelList: [], // 标签列表
    newsList: [], // 新闻列表
  },

  subscriptions: {},

  effects: {
    *getLabelList({ payload: value, callback }, { call, put }) {
      const data = yield call(appService.getLabelList, value);
      if(data.data.code === 20000) {
        if(callback && typeof callback === 'function') {
          callback(data.data.data)
        }
      }
    },

    *getNewsList({ payload: value, callback }, { call, put }) {
      const data = yield call(appService.getNews, value);
      if(data.data.code === 20000) {
        if(callback && typeof callback === 'function') {
          callback(data.data.data)
        }
      }
    },

    *getOrgList({ payload: value, callback }, { call, put }) {
      const data = yield call(orgService.getOrgList);
      if(data.data.code === 20000) {
        if(callback && typeof callback === 'function') {
          callback(data.data.data)
        }
      }
    },

    // 判断登录态是否过期
    *getLoginInfo({ payload: value, callback }, { call, put }) {
      const data = yield call(appService.getLoginInfo);
      if(callback && typeof callback === 'function') {
        callback(data)
      }
    }
  },

  reducers: {

  }
}