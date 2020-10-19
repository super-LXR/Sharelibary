import {request} from './request.js'

export function login(userName,password,VerifyCode){
	return request({
		url:'/usersControl/login',
    method:'post',
		params:{
			username:userName,
			password:password,
			preVerifyCode:VerifyCode
		}
	})
}
export function getVerifyCode(){
	return request({
		url:'/usersControl/getVerifyCodeBySession',
		responseType: 'arraybuffer'
	})
}

export function register(userName,password,confirmPassword,studentId,phoneNumber,dormitoryNumber,verifyCode){
	return request({
		url:'/usersControl/register',
		method:'post',
		params:{
			userName:userName,
			password:password,
			configName:confirmPassword,
			wechatNumber:phoneNumber,
			studentId:studentId,
			dirmitoryNumber:dormitoryNumber,
			preVerifyCode:verifyCode,
		}
	})
}
