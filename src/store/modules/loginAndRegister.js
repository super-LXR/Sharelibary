const state = {
  token: '',
  dialogFormVisible: false,
}

const actions = {

}

const mutations = {
  setToken(state, token) {
    state.token = token
    // localStorage.token = token
    sessionStorage.setItem('token',token)
  },
  delToken() {
    state.token = ''
    sessionStorage.removeItem('token')
  },
}

export default {
  // 如果两个模块有同名的方法或数据就可以用模块名来区分
  namespaced: true,
  state,
  mutations,
  actions
}
