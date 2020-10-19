import {request} from '../request.js'
export function updateUser(personalInformationData){
	return request({
		url:'/usersControl/updateUser',
		method:'post',
		params:{
			userName:personalInformationData.userName,
			wechatNumber:personalInformationData.wechatNumber,
			studentId:personalInformationData.studentId,
			dirmitoryNumber:personalInformationData.dirmitoryNumber,
			password:personalInformationData.password
		}
	})
}

