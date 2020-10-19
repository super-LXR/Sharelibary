import {request} from '../request.js'

export function selectBookByKeyWord(keyWord){
	return request({
		url:'/bookBaseControl/getBookByKey',
		method:'get',
		params:{
			key:keyWord,
		}
	})
}
export function selectBookByName(name){
	return request({
		url:'/bookBaseControl/selectBook',
		method:'get',
		params:{
			bName :name,
		}
	})
}
export function selectBookByPublish(publish){
	return request({
		url:'/bookBaseControl/selectBook',
		method:'get',
		params:{
			bPublish :publish,
		}
	})
}
export function selectBookByIntroduction(introduction ){
	return request({
		url:'/bookBaseControl/selectBook',
		method:'get',
		params:{
			introduction :introduction ,
		}
	})
}
export function selectBookByWriter(writer){
	return request({
		url:'/bookBaseControl/selectBook',
		method:'get',
		params:{
			writer :writer,
		}
	})
}
export function selectBookByOtherImportantPath(otherImportantPath){
	return request({
		url:'/bookBaseControl/selectBook',
		method:'get',
		params:{
			bookOtherImportantPath :otherImportantPath,
		}
	})
}
