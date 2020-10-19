import axios from 'axios'
// 导入用于做进度条的nprogress包和其对应的css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.headers.common['jwt'] = sessionStorage.getItem('token');
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/article';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function request(config) {
  const instance = axios.create({
    timeOut: 5000
  })
  // //请求拦截
  // instance.interceptors.request.use((config)=>{
  // 	// console.log(config)
  // 	//比如config中的一些信息不符合服务器要求
  // 	//比如每次发送网络请求都需要在界面上显示一个图标
  // 	//某些网络请求(比如登陆,必须携带token),必须携带一些特殊信息
  // 	return config
  // },(error)=>{
  // 	return error
  // })

  //响应拦截
  // instance.interceptors.response.use(res=>{
  // 	return res.data
  // },error=>{
  // 	return error
  // })
  // //因为instance(config)的返回值本身就是一个promise,所以不再需要promise封装
  // return instance(config)


  // 添加响应拦截器
  instance.interceptors.response.use(config => {
    // 隐藏进度条
    NProgress.done()
    return config
  });

  //添加请求拦截器
  instance.interceptors.request.use(config => {
    // 展示进度条
    NProgress.start()
    // 在发送请求之前做些什么
    //判断是否存在token，如果存在将每个页面header都添加token
    let token = sessionStorage.getItem('token')
    if (token) {
      config.headers.common['jwt'] = token
    }
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  //因为instance(config)的返回值本身就是一个promise,所以不再需要promise封装
  return instance(config)
}
