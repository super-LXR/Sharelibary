import {
  request
} from './request.js'

// 获取未支付的订单(购物车订单)
export function getDontPay() {
  return request({
    url: 'orderControl/getDontPay',
    method: 'get',
  })
}

// 删除订单
export function cancelOrder(id) {
  return request({
    url: 'orderControl/deleteOrder',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 批量支付订单
export function payBench(payObj) {
  return request({
    url: '/orderControl/payBench',
    method: 'post',
    params: {
      list: payObj.list.join(","),
      distrubutionId: payObj.deliverymanId
    }
  })
}

// 得到当前用户的信息
export function getCurrentUser(){
	return request({
		url:'/usersControl/getCurrentUser',
	})
}

// 获取全部配送员
export function getSendOrder(){
	return request({
		url:'/bookBaseControl/getSendOrder',
	})
}
