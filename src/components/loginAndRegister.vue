<template>
  <div class="loginAndRegister">
  <el-dialog title="登 录" :visible.sync="dialogFormVisible" @close="closeDialog" :show-close="true" center custom-class="dialog-login">
    <!-- 将注册模块当作一个dialog嵌入到登录模块中 -->
    <el-dialog width="50%" height="90%" title="注 册" :visible.sync="innerVisible" append-to-body center custom-class="diglog-register">
      <div class="loginAndRegister-register">
        <el-form status-icon label-width="100px" :model="registerForm" :rules="registerFormRules" ref="registerFormRef">
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="registerForm.userName" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" autocomplete="off" v-model="registerForm.password" prefix-icon="iconfont icon-lock_fill" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" autocomplete="off" v-model="registerForm.confirmPassword" prefix-icon="iconfont icon-lock_fill" show-password></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input type="text" v-model="registerForm.studentId"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber">
            <el-input type="text" v-model="registerForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号" prop="dormitoryNumber">
            <el-input type="text" v-model="registerForm.dormitoryNumber"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verifyCode">
            <el-input type="text" v-model="registerForm.verifyCode"></el-input>
          </el-form-item>
          <el-tooltip class="item" effect="light" content="点击刷新" placement="right-end">
            <el-image class="verifyCodeImage" :src="VerifyCodeSrc" fit="contain" @click="refreshVerifyCode"></el-image>
          </el-tooltip>
          <el-form-item style="float: right; position: relative; bottom:20px;">
            <el-button @click="resetRegisterForm">重置</el-button>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <div class="loginAndRegister-login">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="loginForm.userName" autocomplete="off" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="loginForm.password" autocomplete="off" type='password' prefix-icon="iconfont icon-lock_fill" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="VerifyCode">
          <el-input v-model="loginForm.VerifyCode" autocomplete="off" @keyup.enter.native="login"></el-input>
        </el-form-item>
      </el-form>
      <el-tooltip class="item" effect="light" content="点击刷新" placement="right-end">
        <el-image class="verifyCodeImage" :src="VerifyCodeSrc" fit="scale-down" @click="refreshVerifyCode"></el-image>
      </el-tooltip>
      <div slot="footer" class="dialog-footer">
        <el-button @click='resetLoginForm'>重 置</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
      <a href="javascript:;" @click="innerVisible = true">还没有账号?点击立即注册</a>
    </div>


  </el-dialog>
</div>

</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    login,
    getVerifyCode,
    register
  } from '../network/loginAndRegister.js'

  export default {
    // 注入依赖
    inject: ['reload'],
    props: {
      loginAndRegisterVisible: Boolean,
    },
    data() {
      return {
        VerifyCodeSrc: '',
        dialogFormVisible: false,
        innerVisible: false,
        // 这是登录表单的数据绑定对象
        loginForm: {
          userName: '',
          password: '',
          VerifyCode: ''
        },
        formLabelWidth: '120px',
        //这里定义登录表单的验证规则
        loginFormRules: {
          //定义验证用户名的规则
          userName: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 15,
              message: '长度为 1 到 15 个字符',
              trigger: 'blur'
            },
          ],
          //定义验证密码的规则
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 16,
              message: '长度为 8 到 16 个字符',
              trigger: 'blur'
            },
          ],

          //定义验证验证码的规则
          verifyCode: [{
              required: false,
              message: '请输入验证码,区分大小写',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 4,
              message: '验证码长度为4个字符',
              trigger: 'blur'
            },
          ]
        },

        /**
         * 下面是注册界面所需要的数据
         */
        registerForm: {
          userName: '',
          password: '',
          confirmPassword: '',
          studentId: '',
          phoneNumber: '',
          dormitoryNumber: '',
          verifyCode: ''
        },
        // 这里定义注册界面表单验证规则
        registerFormRules: {
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
          //定义验证密码的规则
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
          confirmPassword: [{
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
          phoneNumber: [{
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
          dormitoryNumber: [{
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
          //定义验证验证码的规则
          verifyCode: [{
              required: true,
              message: '请输入验证码,区分大小写',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 4,
              message: '验证码长度为4个字符',
              trigger: 'blur'
            },
          ]
        }
      }
    },

    created() {
      this.getVerifyCode()
    },

    watch: {
      loginAndRegisterVisible(newValue, oldValue) {
        this.dialogFormVisible = newValue
      }
    },
    computed: {
      ...mapState({
        // 注意模块化后...mapState的写法
        token: state => state.loginAndRegister.token
      })
    },
    methods: {
      ...mapMutations({
        setToken: 'loginAndRegister/setToken'
      }),
      // 获取验证码 并将验证码从二进制流文件转化为图片格式
      getVerifyCode() {
        getVerifyCode()
          .then(res => {
            return (
              'data:image/png;base64,' +
              btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )
            )
          })
          .then(data => {
            this.VerifyCodeSrc = data
          })
          .catch(ex => {
            console.error(ex)
          })
      },
      // 实现点击验证码后刷新验证码
      refreshVerifyCode() {
        this.getVerifyCode()
      },
      login() {
        // 登陆时先进行表单的预验证
        this.$refs.loginFormRef.validate(valid => {
          if (!valid) {
            this.$message.error("填写数据不合法，请核对！")
          } else {
            login(this.loginForm.userName, this.loginForm.password, this.loginForm.VerifyCode)
              .then(res => {
                let data = res.data
                this.setToken(data.data)
                if (this.token) {
                  this.$message.success(res.data.msg)
                  this.dialogFormVisible = false
                } else {
                  this.$message.error(res.data.msg)
                  this.dialogFormVisible = true
                }
              })
              .catch(error => {
                this.$message.error('登录出错')
              })
          }
        })
      },

      // 点击重置按钮重置表单
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields();
      },

      closeDialog() {
        this.$emit('close-dialogStatus')
        this.dialogFormVisible = false
        this.reload()
      },

      /**
       * 下面实现注册界面的方法
       */
      resetRegisterForm() {
        this.$refs.registerFormRef.resetFields();
      },

      register() {
        this.$refs.registerFormRef.validate(valid => {
          if (!valid) {
            this.$message.error("填写的数据不合法 请核对！")
          } else {
            register(this.registerForm.userName, this.registerForm.password, this.registerForm.confirmPassword,
              this.registerForm.studentId, this.registerForm
              .phoneNumber, this.registerForm.dormitoryNumber, this.registerForm.verifyCode
            ).then(res => {
              if (res.data.msg === "操作成功") {
                this.$message.success("注册成功 请登录！")
                this.innerVisible = false
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(error => {
              this.$message.error('注册失败！');
            })
          }
        })
      }
    }
  }
</script>

<style>
  .verifyCodeImage {
    display: block;
    width: 200px;
    height: 85px;
    margin-left: 150px;
    border-radius: 20%;
    box-shadow: 12px 10px 5px #888888;
  }

  .dialog-footer {
    float: right;
  }

  .el-form-item {
    margin-bottom: 25px;
  }

  a {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    position: relative;
    bottom: -20px;
  }
</style>
