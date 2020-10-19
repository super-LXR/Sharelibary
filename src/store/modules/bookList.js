const state = {
  bookList: []
}

const actions = {

}

const mutations = {
  setBookList(state, bookList) {
    state.bookList = bookList
  },
}
const getters = {
  getBookList(state){
    return state.bookList
  }
}
export default {
  // 如果两个模块有同名的方法或数据就可以用模块名来区分
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
