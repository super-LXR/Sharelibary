import {
  request
} from '../request.js'

// 获取全部订单
export function getOrders() {
  return request({
    url: 'orderControl/getOrder',
    method: 'get',
  })
}

// 获取待收货订单
export function getUnreceivedOrders() {
  return request({
    url: 'orderControl/waitToReceive',
    method: 'get',
  })
}

// 获取待评价订单
export function getUnevaluatedOrders() {
  return request({
    url: 'orderControl/waitToRemark',
    method: 'get',
  })
}

// 获取待归还订单
export function getUnrestoredOrders() {
  return request({
    url: 'orderControl/waitToReturn',
    method: 'get',
  })
}

// 取消订单
export function cancelOrder(id) {
  return request({
    url: 'orderControl/cancelOrder',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 归还订单
export function returnBook(id) {
  return request({
    url: 'orderControl/returnBook',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 确认收货
export function confirmReceipt(id) {
  return request({
    url: 'orderControl/auditOrder',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 书籍评价
export function evaluateToBook(evaluate) {
  return request({
    url: '/remarkController/addToBookRemarkToBook',
    method: 'post',
    params: {
      remarkToBookContent: evaluate.evaluateToBook,
      orderId: evaluate.id
    }
  })
}

// 配送员评价
export function evaluateToDeliveryman(evaluate) {
  return request({
    url: '/remarkController/addToDeveliverRemark',
    method: 'post',
    params: {
      gradeClass: evaluate.evaluateToDeliveryman,
      orderId: evaluate.id
    }
  })
}


