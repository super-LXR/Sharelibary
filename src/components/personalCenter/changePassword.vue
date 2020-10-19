<template>
  <div class="changePassword">
    <slot name="changePassword">
      <el-form status-icon label-width="100px" :model="changePasswordForm" ref="changePasswordRef" :rules="passwordRules">
        <el-form-item label="新密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="changePasswordForm.password" prefix-icon="iconfont icon-lock_fill"
            show-password></el-input>
        </el-form-item>
        <br>
        <el-form-item label="确认密码" prop="confrimPassword" @keyup.enter.native="updatePassword">
          <el-input type="password" autocomplete="off" v-model="changePasswordForm.confrimPassword" prefix-icon="iconfont icon-lock_fill"
            show-password></el-input>
        </el-form-item>
        <br>
        <el-form-item prop="" style="float: right; position: relative; bottom:8px;">
          <el-button @click="resetChangePasswordForm">重 置</el-button>
          <el-button type="primary" @click="updatePassword">更 新</el-button>
        </el-form-item>
      </el-form>
    </slot>
  </div>
</template>

<script>
  import {
    updatePassword
  } from '@/network/personalCenter/changePassword.js'
  export default {
    inject:['reload'],
    data() {
      return {
        changePasswordForm: {
          password: '',
          confrimPassword: '',
        },
        // 定义修改密码的规则
        passwordRules: {
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 8,
              max: 16,
              message: '长度为 8 到 16 个字符',
              trigger: 'blur'
            },
          ],
          //定义验证二次输入密码的规则
          confrimPassword: [{
              required: true,
              message: '请再次输入密码',
              trigger: 'blur'
            },
            {
              min: 8,
              max: 16,
              message: '长度为 8 到 16 个字符',
              trigger: 'blur'
            },
          ],
        }
      }
    },
    methods: {
      resetChangePasswordForm() {
        this.$refs.changePasswordRef.resetFields()
      },
      // 更新密码
      updatePassword() {
        this.$refs.changePasswordRef.validate(valid => {
          if (!valid) {
            this.$message.error("填写的数据不合法 请核对！")
          } else {
            updatePassword(this.changePasswordForm).then(res => {
              if (res.data.code == 0) {
                this.$message.success("修改密码成功 请重新登录！")
                window.sessionStorage.clear('token')
                this.reload()
              }else{
                this.$message.info(res.data.msg)
              }
            }).catch(error => {
              this.$message.error("更新密码失败！")
            })
          }
        })
      }
    },
  }
</script>

<style scoped="scoped">
</style>
