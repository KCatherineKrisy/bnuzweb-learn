const API = {
  USER: {
    LOGIN: '/userservice/user-member/login',
    REGISTER: '/userservice/user-member/register',
    GET_USER_DETAIL: '/userservice/user-detail/getUserDetail',
    UPDATE_USER_MOBILE: '/userservice/user-detail/updateMobile',
    UPDATE_USER_DETAIL: '/userservice/user-detail/updateUserDetail',
    ADD_ORDER: '/userservice/yx-order/addOrder',
    GET_ORDER_ITEM_LIST: '/userservice/yx-order/getOrderItemList',
    CREATE_NATIVE: '/userservice/yx-pay-log/createNative/:orderNo',
    QUERY_PAY_STATUS: '/userservice/yx-pay-log/queryPayStatus/:orderNo',
  },
  CLASS: {
    SEARCH_CLASS_ITEM: '/portalservice/serarch/searchItem',
    GET_SEARCH_OPINION: '/portalservice/serarch/getSearchOpinion',
    GET_ACTIVITY: '/portalservice/front/getActivity/:id',
    ADD_COMMENT: '/userservice/yx-comment/addComment',
    GET_COMMENT_BY_ACTIVITY: '/userservice/yx-comment/getCommentByActivity/:id'
  },
  ORG: {
    GET_ORG_LIST: '/portalservice/org-describe/getOrgList',
    GET_ORG_DESCRIBE: '/portalservice/org-describe/getOrgDescribe/:oid'
  }
}

export default API;