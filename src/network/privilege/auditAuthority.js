import {request} from '../request.js'

export function getDontAudientRole(){
	return request({
		url:'/roleImproveController/getDontAudientRole',
		method:'get',
	})
}

export function updateOrDelete(id,flag){
	return request({
		url:'/roleImproveController/updateOrDelete',
		method:'post',
		params:{
      id: id,
      flag: flag
		}
	})
}

