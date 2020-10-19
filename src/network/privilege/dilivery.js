import {request} from '../request.js'

// 查看当前用户需要配送的订单
export function getDeliveryList(){
	return request({
		url:'/orderControl/selectAllOrder',
		method:'get'
	})
}

// 取消订单
export function cancelOrder(id){
	return request({
		url:'orderControl/cancelOrder',
		method:'get',
    params:{
      id:id
    }
	})
}