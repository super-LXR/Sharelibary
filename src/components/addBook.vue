<template>
  <div class="addbook">
    <div class="addbook-header">
      <!-- 页头面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>捐赠书籍</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addbook-from">
      <el-card class="box-card">
        <div class="addbook_div">
          <el-form custom-class="addbook_form" action="" :model="book" :rules="addbookFormRules" ref="addbookFormRef">
            <el-form-item label="书籍名称" prop="bName">
              <el-input v-model="book.bName" placeholder="请输入书名" clearable></el-input>
            </el-form-item>
            <el-form-item label="作者名" prop="writer">
              <el-input v-model="book.writer" placeholder="请输入作者名" clearable></el-input>
            </el-form-item>
            <el-form-item label="书籍出版社" prop="bPublish">
              <el-input v-model="book.bPublish" placeholder="请输入出版社" clearable></el-input>
            </el-form-item>
            <el-form-item label="书籍简介" prop="introduction">
              <el-input type="textarea" :rows="2" placeholder="请输入200字以内的书籍简介" v-model="book.introduction" clearable></el-input>
            </el-form-item>
            <el-form-item>
              捐赠数量
              <pre></pre>
              <el-input-number size="small" v-model="book.account" :min="1" :max="1000" label="增减图书"></el-input-number>
            </el-form-item>
            <br>
            <el-form-item label="书籍图片" prop="otherImportantPath">
              <el-tooltip class="item" effect="dark" content="点击上传一张书籍图片" placement="bottom-start">
                <el-upload action="/article/upload/book" :headers=myheader :on-exceed="handleExceed" list-type="picture-card"
                  :before-upload="beforeAvatarUpload" :limit="1" :on-success='fileUpSuccess' :on-error='fileUpErro'>
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-tooltip>
            </el-form-item>
            <el-form-item class="button">
              <el-button type="primary" @click="submitForm">确认捐献</el-button>
              <el-button @click='resetAddbookForm'>重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  var token = sessionStorage.getItem('token')
  import {
    submitForm
  } from '../network/addBook.js'
  export default {
    data() {
      return {
        myheader: {
          jwt: token
        },
        book: {
          bName: '',
          writer: '',
          introduction: '',
          account: 1,
          addBook: '',
          bPublish: '',
          otherImportantPath: ''
        },
        addbookFormRules: {
          bName: [{
              required: true,
              message: '书名是必填项',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '书名长度在 1 到 20 个字符',
              trigger: 'blur'
            },
          ],
          bPublish: [{
              required: true,
              message: '出版社是必填项',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '出版社长度在 1 到 20 个字符',
              trigger: 'blur'
            },
          ],
          writer: [{
              required: true,
              message: '作者是必填项',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '作者长度在 1 到 10 个字符',
              trigger: 'blur'
            },
          ],
          introduction: [{
              required: true,
              message: '书籍简介是必填项',
              trigger: 'blur'
            },
            {
              min: 10,
              max: 200,
              message: '简介长度在 10 到 200 个字符',
              trigger: 'blur'
            },
          ],
        },
      }
    },
    methods: {
      submitForm() {
        this.$refs.addbookFormRef.validate(valid => {
          if (!valid) {
            this.$message.error("填写数据不合法，请核对！")
          } else {
            if (!this.book.otherImportantPath) {
              this.$message.error("请上传一张书籍图片！")
            } else {
              submitForm(this.book.bName, this.book.bPublish, this.book.introduction, this.book.writer, this.book.otherImportantPath,
                  this.book.account)
                .then(res => {
                  this.$message.success(res.data.msg)
                }).catch(error => {
                  this.$message.error("书籍添加失败！")
                })
            }
          }
        })
      },
      resetAddbookForm() {
        this.book.account = 1;
        this.$refs.addbookFormRef.resetFields();
      },

      // 下面是文件上传的方法

      // handlePictureCardPreview(file) {
      //   this.dialogImageUrl = file.url;
      //   this.dialogVisible = true;
      // },
      handleExceed(files, fileList) {
        this.$message.warning(`只能上传一本书籍图片哦！`);
      },
      beforeAvatarUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.$message.error('书籍图片大小不能超过 1MB!');
        }
        return isLt1M;
      },
      fileUpSuccess(files, fileList) {
        console.log(files)
        this.book.otherImportantPath = files.data
        this.$message.success(files.msg)
      },
      fileUpErro(files, fileList) {
        this.$message.error('上传出错')
      },
    }
  }
</script>

<style>
  .addbook_div {
    background-color: #FFF;
    opacity: 0.9;
    padding-left: 25px;
    padding-bottom: 30px;
    padding-right: 15px;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .addbook {
    /* height: 50%; */
    /* z-index: 999 */
      /* max-height: 1080px; */
  }

  .addbook-from {
    z-index: 999;
    display: flex;
    direction: row;
    justify-content: center;
    max-height: 850px;
  }

  .box-card {
    width: 100%;
    padding-left: 30px;
    padding-right: 70px;
  }

  .breadcrumb {
    margin-bottom: 3px;
    font-size: 10px;
    background-color: white;
  }
</style>
