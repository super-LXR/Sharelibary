import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../components/Home.vue')
const addBook = () => import('../components/addBook.vue')
const bookshelf = () => import('../components/bookshelf.vue')
const selectBook = () => import('../components/borrowBook/selectBook.vue')
const borrowBook = () => import('../components/borrowBook/borrowBook.vue')
const bookList = () => import('../components/borrowBook/bookList.vue')
const auditBook = () => import('../components/privilege/auditBook.vue')
const dilivery = () => import('../components/privilege/dilivery.vue')
const auditAuthority = () => import('../components/privilege/auditAuthority.vue')
const editBook = () => import('../components/privilege/editBook.vue')
const changePassword = () => import('../components/personalCenter/changePassword.vue')
const changePersonalInformation = () => import('../components/personalCenter/changePersonalInformation.vue')
const myContribution = () => import('../components/personalCenter/myContribution.vue')

import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home/borrowbook' /* 重定向,当没指定路径的时候默认显示home,且会在浏览器上显示/home */
  },
  {
    path: '/',
    // 通过redirect关键字将用户访问的根路径重定向为home组件
    redirect: '/home/borrowbook'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [{
        path: 'addBook',
        component: addBook
      },
      {
        path: 'borrowbook',
        component: borrowBook
      },
      {
        path: 'bookshelf',
        component: bookshelf
      },
      // 特权界面
      {
        path: 'privilege/auditBook',
        compoxnent: auditBook
      },
      {
        path: 'privilege/dilivery',
        component: dilivery
      },
      {
        path: 'privilege/auditAuthority',
        component: auditAuthority
      },
      {
        path: 'privilege/editBook',
        component: editBook
      },
      // 开发者界面
      {
        path: 'developerMode/selectbook',
        component: selectBook
      },
      {
        path: 'developerMode/booklist',
        component: bookList
      },
      {
        path: 'developerMode/myContribution',
        component: myContribution
      },
      {
        path: 'developerMode/changePersonalInformation',
        component: changePersonalInformation
      },
      {
        path: 'developerMode/changePassword',
        component: changePassword
      },
    ],
  },
]
const router = new VueRouter({
  //mode: 'history', /* 将浏览器显示模式从hash改为history */
  // base: '/',
  routes
})

// 导航守卫控制页面访问权限,后面补充!
// router.beforeEach((to, from, next) => {
//   var token = window.sessionStorage.getItem("token")
//   if (token) return next()
//   else {
//     if (to.path === '/home/borrowbook') next()
//     else {
//       alert('请登陆后再访问该页面')
//       next('/home/borrowbook')
//     }
//   }
// })

export default router
