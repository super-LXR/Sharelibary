import {request} from '../request.js'

export function updatePassword(changePasswordForm){
	return request({
		url:'/usersControl/updatePassword',
		method:'post',
		params:{
			Password:changePasswordForm.password,
			confrimPassword:changePasswordForm.confrimPassword,
		}
	})
}
