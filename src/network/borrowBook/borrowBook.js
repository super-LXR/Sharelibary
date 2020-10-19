import {request} from '../request.js'

export function BorrowBook(bid){
	return request({
		url:'/orderControl/addOrder',
		method:'get',
    params:{
    	bId:bid,
    	bookAccount:1,
    }
	})
}
