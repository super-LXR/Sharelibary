<template>
  <div class="change_personalInformation">
    <slot name="ChangePersonalInformation">
      <el-form status-icon label-width="100px" :model="tempPersonalInformationData" ref="personalInformationFormRef"
        :rules="formRules">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="tempPersonalInformationData.userName" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentId">
          <el-input type="text" v-model="tempPersonalInformationData.studentId"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="wechatNumber">
          <el-input type="text" v-model="tempPersonalInformationData.wechatNumber"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dirmitoryNumber">
          <el-input type="text" v-model="tempPersonalInformationData.dirmitoryNumber" @keyup.enter.native="updateUser"></el-input>
        </el-form-item>
        <br>
        <el-form-item style="float: right; position: relative; bottom:8px;">
          <el-button @click="resetPersonalInformationForm">重置</el-button>
          <el-button type="primary" @click="updateUser">更新</el-button>
        </el-form-item>
      </el-form>
    </slot>
  </div>
</template>

<script>
  import {
    updateUser
  } from '@/network/personalCenter/changePersonalInformation.js'
  import {
    mapMutations,
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        tempPersonalInformationData: {},
        // 这里定义修改个人信息界面表单验证规则
        formRules: {
          //定义验证用户名的规则
          userName: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 15,
              message: '长度在 1 到 15 个字符',
              trigger: 'blur'
            },
          ],
          //定义验证学号的规则
          studentId: [{
              required: true,
              message: '请输入学号',
              trigger: 'blur'
            },
            {
              min: 12,
              max: 12,
              message: '标准学号长度为12位',
              trigger: 'blur'
            },
          ],
          //定义验证手机号的规则
          wechatNumber: [{
              required: true,
              message: '请输入电话号码',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '标准手机号长度为11位',
              trigger: 'blur'
            },
          ],
          //定义验证寝室号的规则
          dirmitoryNumber: [{
              required: true,
              message: '请输入宿舍号',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 8,
              message: '宿舍号长度在4到8个字符之间，楼栋与寝室号之间通过"-"隔开，例如："3-324"',
              trigger: 'blur'
            },
          ],
        }
      }
    },
    computed: {
      ...mapGetters({
        personalInformationData: 'userInformation/getUserInformation'
      })
    },
    created() {
      this.handleData()
    },
    methods: {
      resetPersonalInformationForm() {
        this.$refs.personalInformationFormRef.resetFields()
      },
      // 转换个人信息的函数，防止修改用户名时上面欢迎界面跟着一起修改
      handleData() {
        this.tempPersonalInformationData = JSON.parse(JSON.stringify(this.personalInformationData))
      },
      // 更新用户信息
      updateUser() {
        this.$refs.personalInformationFormRef.validate(valid => {
          if (!valid) {
            this.$message.error("填写的数据不合法 请核对！")
          } else {
            updateUser(this.tempPersonalInformationData).then(res => {
              this.$message.info(res.data.msg)
            }).catch(error => {
              this.$message.error("更新个人信息失败！")
            })
          }
        })
      },
    }
  }
</script>

<style>
</style>
