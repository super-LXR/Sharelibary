const state = {
  userInformation:{},
  userRoleNameStr:'超级管理员',
  avatarUrl:'',
  userRoleId:''
}

const actions = {

}

const mutations = {
  setUserInformation(state, userInformation) {
    state.userInformation = userInformation
  },
  setUserRoleNameStr(state, userRoleNameStr) {
    state.userRoleNameStr = userRoleNameStr
  },
  setUserRoleId(state, userRoleId) {
    state.userRoleId = userRoleId
  },
  setAvatarUrl(state, avatarUrl) {
    state.avatarUrl = avatarUrl
  },
}
const getters = {
  getUserInformation(state) {
    return state.userInformation
  },
  getUserRoleNameStr(state) {
    return state.userRoleNameStr
  },
  getUserRoleId(state) {
    return state.userRoleId
  },
  getAvatarUrl(state) {
    return state.avatarUrl
  },
}
export default {
  // 如果两个模块有同名的方法或数据就可以用模块名来区分
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
