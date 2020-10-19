import {request} from './request.js'

export function submitForm(bName,bookPbulish,introduction,writer,bookOtherImportantPath,account){
	return request({
		url:'/bookBaseControl/addBook',
		method:'post',
		params:{
			"bName":bName,
			"writer":writer,
			"introduction":introduction,
			"bookAccount":account,
			"bookOtherImportantPath":bookOtherImportantPath,
			"bPublish":bookPbulish
		}
	})
}