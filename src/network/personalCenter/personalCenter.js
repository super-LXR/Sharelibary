import {
  request
  } from '../request.js'

export function improveController(roleId,labelId){
	return request({
		url:'/roleImproveController/upToIncreaseRole',
		method: 'post',
		params: {
		  id: roleId,
      tId:labelId
		}
	})
}
// 获取当前用户个人信息
export function getCurrentUser(){
	return request({
		url:'/usersControl/getCurrentUser',
	})
}