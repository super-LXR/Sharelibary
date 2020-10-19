const state = {
  ordersVisible: false,
  orders: [],
  status: '',
  number: '',
  
}

const actions = {

}

const mutations = {
  setOrdersVisible(state, newOrdersVisible) {
    state.ordersVisible = newOrdersVisible
  },
  setOrders(state, newOrders) {
    state.orders = newOrders
  },
  setStatus(state, newStatus) {
    state.status = newStatus
  },
  setNumber(state, newNumber) {
    state.number = newNumber
  },
  
}
const getters = {
  getOrdersVisible(state) {
    return state.ordersVisible
  },
  getOrders(state) {
    return state.orders
  },
  getStatus(state) {
    return state.status
  },
  getNumber(state) {
    return state.number
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
