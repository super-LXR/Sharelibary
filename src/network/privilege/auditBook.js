import {request} from '../request.js'

export function auditBook(bookId){
	return request({
		url:'/bookBaseControl/auditBookSource',
		method:'get',
		params:{
			"sourceId":bookId
		}
	})
}

// 放在这里有何用?
export function getSourceBook(){
	return request({
		url:'/bookBaseControl/getSourceBook?sourceId=35',
		method:'get',
	})
}

export function getBookDontAudit(){
	return request({
		url:'/bookBaseControl/getBookDontAudit',
		method:'get',
	})
}