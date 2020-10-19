<template>
  <div class="personalCenter">
    <el-drawer title="个人中心" :visible.sync="thisDrawerVisible" direction=rtl @close="closeDrawer" size='30%' :modal="true">
      <div class="container">
        <div class="welcome">
          <el-upload class="avatar-uploader" action="/article/upload/avatar" :headers=myheader :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
            <el-tooltip v-else effect="light" content="点击选择头像" placement="right">
              <i class="el-icon-upload"></i>
            </el-tooltip>
          </el-upload>
          <div v-if="userInformation.userName">
            <span v-text="userInformation.userName+':   '"></span>
          </div>
          <span>西柚图书共享平台欢迎您！</span>
        </div>
        <div class="container">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="修 改 个 人 信 息" name="1">
              <div style="text-align: center;">
                <div class="changePersonalInformation">
                  <ChangePersonalInformation slot="ChangePersonalInformation">
                  </ChangePersonalInformation>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="修 改 密 码" name="2">
              <div class="changePassword" style="margin: 0 auto;">
                <ChangePassword slot="changePassword">
                </ChangePassword>
              </div>
            </el-collapse-item>
            <el-collapse-item title="更 改 身 份" name="3">
              <div class="improveController" style="margin: 0 auto;" ref="radioRef">
                <!-- 利用join函数将数组拼接为字符串 -->
                <h2>您当前的身份：{{userRoleNameStr}}</h2>
                <br>
                <div class="radio">
                  <h3>选择欲申请身份：</h3>
                  <el-radio-group v-model="radio" size="small" @change="improveContorller">
                    <el-radio label='2管理员' name="2" border>管 理 员</el-radio>
                    <el-radio label='3配送员' name="3" border>配 送 员</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="我 的 订 单" name="4">
              <div class="order">
                <el-badge :value="this.number.allOrdersNM" class="order-badge">
                  <el-button type="text" class="order-button" @click="Open_dialog('allOrders')">全部订单</el-button>
                </el-badge>
                <el-badge :value="this.number.unreceivedNM" class="order-badge">
                  <el-button type="text" class="order-button" @click="Open_dialog('unreceived')">待收货订单</el-button>
                </el-badge>
                <el-badge :value="this.number.unevaluatedNM" class="order-badge">
                  <el-button type="text" class="order-button" @click="Open_dialog('unevaluated')">待评价订单</el-button>
                </el-badge>
                <el-badge :value="this.number.unrestoredNM" class="order-badge">
                  <el-button type="text" class="order-button" @click="Open_dialog('unrestored')">待归还订单</el-button>
                </el-badge>
              </div>
            </el-collapse-item>
            <el-collapse-item title="我 的 贡 献" name="5">
              <MyContribution></MyContribution>
            </el-collapse-item>
          </el-collapse>
          <el-button type="warning" class="button_exit" @click="loginOut">退出当前账号</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  var token = sessionStorage.getItem('token')
  const ChangePersonalInformation = () => import('./changePersonalInformation.vue')
  const ChangePassword = () => import('./changePassword.vue')
  const MyContribution = () => import('./myContribution.vue')
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    improveController
  } from '@/network/personalCenter/personalCenter.js'
  export default {
    // 注入依赖，实现退出登录后刷新界面
    inject: ['reload'],
    props: {
      drawerVisible: Boolean
    },
    components: {
      ChangePersonalInformation,
      ChangePassword,
      MyContribution
    },
    data() {
      return {
        myheader: {
          jwt: token
        },
        imageUrl: '',
        activeName: '0',
        radio: '',
        thisDrawerVisible: false,
        userName: ''
      };
    },
    computed: {
      ...mapGetters({
        userInformation: 'userInformation/getUserInformation',
        number: 'orders/getNumber',
        userRoleNameStr: 'userInformation/getUserRoleNameStr',
        avatarUrl: 'userInformation/getAvatarUrl',
        userRoleId:'userInformation/getUserRoleId'
      }),
    },
    watch: {
      drawerVisible(newValue, oldValue) {
        this.thisDrawerVisible = newValue
      }
    },
    methods: {
      ...mapMutations({
        setOrdersVisible: 'orders/setOrdersVisible',
        setStatus: 'orders/setStatus',
        setAvatarUrl: 'userInformation/setAvatarUrl'
      }),
      // 以下为用户头像上传js
      handleAvatarSuccess(res, file) {
        console.log(res)
        if (res.code == 0) {
          this.setAvatarUrl(res.data)
          this.$message.success('头像上传成功')
        } else {
          this.$message.error('头像上传失败')
        }
      },
      beforeAvatarUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.$message.error('上传头像大小不能超过 1MB!');
        }
        return isLt1M;
      },
      // ***********************

      // 关闭个人中心
      closeDrawer() {
        this.$emit('close_drawer')
        // 关闭个人中心抽屉后刷新界面更新数据
        this.reload()
        this.thisDrawerVisible = false
      },
      // 退出登录
      loginOut() {
        window.sessionStorage.clear('token')
        const token = window.sessionStorage.getItem('token')
        if (!token) {
          this.$message.success('成功退出登录')
          this.$router.push({
            path: '/home/borrowbook'
          })
          // 成功退出登录后刷新界面：
          this.reload()
        } else {
          this.$message.erro('未能成功退出登录')
        }
      },
      // 请求提升权限
      improveContorller(label) {
        this.$alert('确定申请 ' + label.slice(1) + ' 权限？', '提示', {
          type: 'info ',
          center: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              improveController(this.userRoleId, label.slice(0, 1)).then(res => {
                if (res.data.code === 0) {
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                    this.$message.success("操作成功，等待管理员审核！")
                    done();
                  }, 500);
                } else {
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                    this.$message.warning(res.data.msg)
                    done();
                  }, 500);
                }
              }).catch(error => {
                this.$message.error("更新权限失败")
              })
            } else {
              // done用于关闭message
              done();
            }
          }
        })
      },
      // 打开订单中心
      Open_dialog(status) {
        // 在methods中调用mapMutations中的方法时也要加关键字this
        this.setOrdersVisible(true)
        this.setStatus(status)
      },
    }
  };
</script>

<style>
  .el-drawer {
    background-image: url(../../assets/img/yinghua.gif);
    min-width: 360px;
    min-height: 980px;
  }

  /* 以下为用户头像上传css */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .el-icon-upload {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }

  /* *********************** */
  /* css属性选择器，为title设置样式*/
  [role=heading] {
    color: #0086B3;
    text-align: center;
    font-size: 30px;
  }

  .orders {
    margin-right: 200px;
  }

  .container {
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    /* align-items: center; */
    text-align: center;
  }

  .el-collapse-item__header {
    font-size: 25px;
    color: #404040;
    font-family: "微软雅黑";
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 20px;
  }

  .el-collapse-item__wrap {
    margin-left: 15px;
    margin-right: 15px;
  }

  .welcome {
    text-align: center;
    margin-bottom: 40px;
  }

  .el-collapse-item {
    margin-top: 35px;
  }

  .el-collapse-item .changePersonalInformation {
    width: 80%;
    margin-top: 15px;
    margin-left: 30px;
  }

  .el-collapse-item .changePassword {
    width: 80%;
    margin-top: 15px;
    margin-left: 30px;
  }

  .order {
    display: flex;
    direction: row;
    /* justify-content决定元素在主轴上对齐的方式 */
    justify-content: center;
    /* 控制一排排不下的时候如何换行 */
    flex-wrap: wrap;
    /* align-items决定元素在交叉轴上对齐的方式 */
    align-items: center;
  }

  .order-badge {
    margin-top: 25px;
    margin-right: 30px;
  }

  .order-button {
    display: block;
    font-size: 20px;
  }

  .button_exit {
    display: inline-block;
    line-height: 30px;
    font-size: 20px;
    margin-top: 80px;
    text-align: center;
  }
</style>
