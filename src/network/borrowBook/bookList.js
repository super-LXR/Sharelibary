import {request} from '../request.js'

export function getBookList(){
	return request({
		url:'/bookBaseControl/selectBook',
		method:'get'
	})
}

export function getBookEvaluation(bId){
	return request({
		url:'/remarkController/selectRemarkToBook',
    params:{
      bId: bId
    }
	})
}
