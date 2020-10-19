import {request} from '../request.js'

export function editBook(book){
	return request({
		url:'/bookBaseControl/updateBook',
		method:'post',
    params:{
      bId:book.bId,
      bName:book.bName,
      bPublish:book.bpublish,
      introduction:book.introduction,
      writer:book.writer,
      bookAccount:book.bookAccount,
      bookPrice:book.bookPrice,
    }
	})
}
