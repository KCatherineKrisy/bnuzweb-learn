const API = {
  USER: {
    LOGIN: '/userservice/user-member/login',
    REGISTER: '/userservice/user-member/register',
    GET_USER_DETAIL: '/userservice/user-detail/getUserDetail',
    UPDATE_USER_MOBILE: '/userservice/user-detail/updateMobile',
    UPDATE_USER_DETAIL: '/userservice/user-detail/updateUserDetail',
  },
  CLASS: {
    SEARCH_CLASS_ITEM: '/portalservice/serarch/searchItem',
    GET_SEARCH_OPINION: '/portalservice/serarch/getSearchOpinion',
    GET_ACTIVITY: '/portalservice/front/getActivity/:id'
  }
}

export default API;