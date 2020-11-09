const API = {
  USER: {
    LOGIN: '/userservice/user-member/login',
    REGISTER: '/userservice/user-member/register',
    GET_USER_DETAIL: '/userservice/user-detail/getUserDetail',
    UPDATE_USER_MOBILE: '/userservice/user-detail/updateMobile',
    UPDATE_USER_DETAIL: '/userservice/user-detail/updateUserDetail',
    ADD_NOTE: '/userservice/acl-notes/addNote',
    DELETE_NOTE: '/userservice/acl-notes/deleteNote',
    GET_NOTE_LIST: '/userservice/acl-notes/getNoteList',
    UPTADE_NOTE: '/userservice/acl-notes/updateNote',
    GET_NOTE_BY_ID: '/userservice/acl-notes/getNote/:aid',
    GET_ALL_ORDER: '/userservice/yx-order/getAllOrder',
    GET_ORDER_DETAIL: '/userservice/yx-order/getOrder/:id',
    GET_ORDER_ITEM_LIST: '/userservice/yx-order/getOrderItemList',
    GET_COLLECTION_LIST: '/userservice/acl-collection/getCollectionList/:type',
    DELETE_COLLECTION: '/userservice/acl-collection/deleteCollection/:collectionId',
    GET_MESSAGE: '/portalservice/user-message/getMessage/:mid',
    GET_MESSAGE_LIST: '/portalservice/user-message/getMessageList',
    ADD_COMMENT: '/userservice/yx-comment/addComment',
  },
  CLASS: {
    SEARCH_CLASS_ITEM: '/portalservice/serarch/searchItem',
    GET_SEARCH_OPINION: '/portalservice/serarch/getSearchOpinion',
    GET_ACTIVITY: '/portalservice/front/getActivity/:id',
    GET_COMMENT_BY_ACTIVITY: '/userservice/yx-comment/getCommentByActivity/:id',
    CREATE_NATIVE: '/userservice/yx-pay-log/createNative/:orderNo',
    QUERY_PAY_STATUS: '/userservice/yx-pay-log/queryPayStatus/:orderNo',
    ADD_ORDER: '/userservice/yx-order/addOrder',
    ADD_COLLECTION: '/userservice/acl-collection/addCollection'
  },
  ORG: {
    GET_ORG_LIST: '/portalservice/org-describe/getOrgList',
    GET_ORG_DESCRIBE: '/portalservice/org-describe/getOrgDescribe/:oid',
    GET_NEWS_DETAIL: '/portalservice/org-describe/getNews/:nid',
  },
  APP: {
    GET_LABEL_LIST: '/portalservice/propell/getLabelList/:num',
    GET_NEWS: '/portalservice/propell/getNews/:num',
    GET_LOGIN_INFO: '/userservice/user-member/auth/getLoginInfo'
  }
}

export default API;