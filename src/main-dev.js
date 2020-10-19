import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局css样式表
import './assets/css/global.css'
//导入阿里字体图标库
import './assets/fonts/iconfont.css'
// 引入时间格式化插件
import moment from 'moment'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(VXETable)
Vue.config.productionTip = false

// 把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$http = axios
// 想全局使用moment插件必须要将其挂载到vue实例上
Vue.prototype.$moment = moment


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//全局过滤器  时间过滤
Vue.filter("dateFmt", (input, formatString = "YYYY-MM-DD") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString ||

  // moment(input) 把时间字符串转成时间对象
  // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
