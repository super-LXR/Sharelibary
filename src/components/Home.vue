<template>
<div  class="home-container-div">
  <el-container  class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <el-menu background-color="#494353" :default-active="activeIndex" text-color="#fff" active-text-color="#ffd04b"
        class="el-menu" mode="horizontal" :router="true">
        <el-menu-item index="/home/addBook">捐赠书籍</el-menu-item>
        <el-menu-item index="/home/borrowbook">借阅书籍</el-menu-item>
        <el-menu-item index="/home/bookshelf">我的书架</el-menu-item>
        <el-submenu index="2" v-if="this.userRoleStr.indexOf('管理员') != -2 || this.userRoleStr.indexOf('配送员') != -2">
          <template slot="title">特权界面</template>
          <el-menu-item index="/home/privilege/auditBook" v-if="this.userRoleStr.indexOf('管理员') != -2">审核书籍</el-menu-item>
          <el-menu-item index="/home/privilege/dilivery" v-if="this.userRoleStr.indexOf('配送员') != -2">配送书籍</el-menu-item>
          <el-menu-item index="/home/privilege/auditAuthority" v-if="this.userRoleStr.indexOf('管理员') != -2">权限提升</el-menu-item>
          <el-menu-item index="/home/privilege/editBook" v-if="this.userRoleStr.indexOf('管理员') != -2">修改图书</el-menu-item>
        </el-submenu>

        <el-submenu index="3" v-if="this.userRoleStr.indexOf('超级管理员') != -2">
          <template slot="title">开发者模式</template>
          <!-- <el-menu-item index="" @click="testToken">测试token</el-menu-item> -->
          <el-menu-item index="/home/developerMode/booklist">书籍列表</el-menu-item>
          <el-menu-item index="/home/developerMode/selectbook">查询书籍</el-menu-item>
          <el-menu-item index="/home/developerMode/myContribution">个人贡献</el-menu-item>
          <el-menu-item index="/home/developerMode/changePersonalInformation">修改个人信息</el-menu-item>
          <el-menu-item index="/home/developerMode/changePassword">修改密码</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="login">
        <el-button type="primary" @click="Open_Dialog" v-show="showLoginButton">登录</el-button>
        <el-button type="info" @click="Open_Drawer" v-show="!showPersonalCenterButton">个人中心</el-button>
        <loginAndRegister :loginAndRegisterVisible="loginAndRegisterVisible" @close-dialogStatus="Close_dialog"></loginAndRegister>
        <personalCenter :drawerVisible="drawerVisible" @close_drawer="close_drawer"></personalCenter>
      </div>
    </el-header>
    <!-- 内容主体 -->
    <el-main>
      <router-view></router-view>
      <Orders></Orders>
      <vue-particles color="#9acd32" :particleOpacity="0.7" :particlesNumber="50" shapeType="star" :particleSize="4"
        linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2"
        :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="repulse" class="lizi">
      </vue-particles>
    </el-main>
    <!-- 底部区域 -->
    <!-- <el-footer height="120px">
      <div class="footer">
        <div class="left">
          <div class="QRcodeImg">
            <el-image class="QRcodeImg" :src="QRcodeSrc" :lazy='true' fit="cover"></el-image>
          </div>
          <div class="copyright">
            <p class="copyright_p">
              版权：西南石油大学乐橙软件开发实验室
              <br>
              All Rights Reserved
            </p>
          </div>
        </div>
        <div class="right">
          <div class="link">
            <h3>友 情 链 接</h3>
            <el-link href="https://www.swpu.edu.cn/" target="_blank">西南石油大学</el-link>
            <el-link href="https://www.swpu.edu.cn/nc/" target="_blank">西南石油大学南充校区</el-link>
            <el-link href="https://www.swpu.edu.cn/" target="_blank">西南石油大学图书馆</el-link>
          </div>
        </div>
      </div>
    </el-footer> -->
  </el-container>
</div>
</template>


<script>
  const Orders = () => import('@/components/personalCenter/orders.vue')
  const loginAndRegister = () => import('@/components/loginAndRegister.vue')
  const personalCenter = () => import('@/components/personalCenter/personalCenter.vue')
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    getBookList,
    getBookEvaluation
  } from '@/network/borrowBook/bookList.js'
  import {
    getCurrentUser
  } from '@/network/personalCenter/personalCenter.js'
  export default {
    inject: ['reload'],
    name: 'app',
    components: {
      Orders,
      loginAndRegister,
      personalCenter
    },
    data() {
      return {
        QRcodeSrc: require('@/assets/img/QRcode.png'),
        loginAndRegisterVisible: false,
        activeIndex: '100',
        // 控制drawer是否出现
        drawerVisible: false,
        personalInformationData: {},
        // 用户权限
        userRoleStr: '超级管理员',
        userRoleArry: [],
        userRoleId: ''
      }
    },
    computed: {
      ...mapGetters({
        // userRoleStr: 'userInformation/getUserRoleStr',
      }),
      token() {
        return window.sessionStorage.getItem('token')
      },
      showPersonalCenterButton() {
        // 注意：这里的token是一个字符串，不是Boolean类型！！！！！
        if (!this.token || this.token == 'null') {
          return false
        } else {
          return true
        }
      },
      showLoginButton() {
        // 注意：这里的token是一个字符串，不是Boolean类型！！！！！
        if (!this.token || this.token == 'null') {
          return true
        } else {
          return false
        }
      }
    },
    created() {
      this.getCurrentUser()
      this.getBookList()
    },
    methods: {
      ...mapMutations({
        setBookList: 'bookList/setBookList',
        setUserInformation: 'userInformation/setUserInformation',
        setUserRoleNameStr: 'userInformation/setUserRoleNameStr',
        setAvatarUrl: 'userInformation/setAvatarUrl',
        setUserRoleId: 'userInformation/setUserRoleId'
      }),
      // 获取书籍列表
      getBookList() {
        getBookList().then(res => {
          var tableData = res.data.data
          this.setBookList(tableData)
        }).catch(res => {
          alert("获取书籍列表失败")
        })
      },
      // 测试系统中是否存在token
      testToken() {
        const token = window.sessionStorage.getItem('token')
        console.log('token')
      },
      // 登录注册对话框部分：
      Open_Dialog() {
        this.loginAndRegisterVisible = true
      },
      Close_dialog() {
        this.loginAndRegisterVisible = false
      },
      // 个人中心抽屉部分：
      Open_Drawer() {
        this.drawerVisible = true
      },
      close_drawer() {
        this.drawerVisible = false
      },
      // 获取当前用户的信息,写在这里是为了能在页面加载时就获取用户信息,以便于实现权限管理
      getCurrentUser() {
        getCurrentUser().then(res => {
          this.personalInformationData = res.data.data
          // 设置头像链接
          this.setAvatarUrl(res.data.data.headPortrait)
          // 下面代码根据得到的数据拿到用户的权限字符串
          if (this.personalInformationData) {
            this.personalInformationData.role.forEach(item => {
              this.userRoleArry.push(item.roleName)
              this.userRoleId = item.id
            })
            this.userRoleStr = this.userRoleArry.join(",")
            // 判断系统中是否存在token，如果不存在token，将userRoleStr置为空(因为当前函数放在created生命周期函数中，每次页面刷新都会执行)
            if (!this.token) {
              this.userRoleStr = ''
              this.userRoleId = ''
            }
            // 将用户权限信息保存在vuex中
            this.setUserRoleNameStr(this.userRoleStr)
            this.setUserRoleId(this.userRoleId)
          }
          // 将获取的当前用户信息存在vuex中
          this.setUserInformation(this.personalInformationData)
        }).catch(error => {
          console.log("查看当前用户信息失败！")
        })
      },
    }
  }
</script>


<style scoped="scoped">
  .home-container{
    /*background-image: url("../images/bg_login.png");*/
  height: 100%;
  }
 /* .home-container{
    margin :0 auto;
   width: 100%;
 } */
  .el-header {
    background-color: #494353;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }


  .el-main {
    /* background-color: rgba(200, 221, 214, 0.301); */
    /* background-color: rgba(110, 139, 116); */
    background: url('../assets/img/swpu.jpg');
    /* -moz-background-size: 100% 100%; */
    /* background-size: 100% 100%; */
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    /* 重点二 */
    overflow: auto;
  }

  .lizi {
    width: 80%;
    /* height: 100%; */
    height: calc(100% - 700px);
    position: absolute;
    z-index: 1;
  }

  .el-footer {
    background-color: #494353;
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .QRcodeImg {
    display: inline-block;
    vertical-align: middle;
    margin-top: 2px;
    width: 90px;
    height: 90px;
    border-right: 1px white solid;
    padding-right: 30px;
  }

  .copyright {
    display: inline-block;
    vertical-align: middle;
    margin-top: 15px;
    margin-left: 15px;
  }

  .copyright_p {
    text-align: center;
    color: whitesmoke;
    line-height: 30px;
  }

  .link {
    text-align: center;
  }

  h3 {
    color: #7a708b;
  }

  .el-link {
    text-align: center;
    color: whitesmoke;
    margin-left: 10px;
  }
</style>
