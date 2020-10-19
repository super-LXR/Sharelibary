<template>
  <div class="BorrowBook">
    <!-- 页头面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借阅书籍</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 借阅书籍卡片 -->
    <el-card>
      <div>
        <div class="BookList">
          <!-- 显示查询书籍组件 -->
          <selectBook></selectBook>
          <!-- 显示书籍列表 -->
          <!-- 自定义函数BorrowBook来接收子组件传过来的参数，注意：貌似在插槽中无法实现 -->
          <BookList @btnClick="BorrowBook">
            <el-button type="primary" slot="reserveBook" size="mini" round>加入书架</el-button>
          </BookList>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
  const BookList = () => import('./bookList.vue')
  const selectBook = () => import('./selectBook.vue')
  import {
    BorrowBook,
  } from '@/network/borrowBook/borrowBook.js'
  import {
    getBookList
  } from '@/network/borrowBook/bookList.js'

  export default {
    components: {
      BookList,
      selectBook
    },
    data() {
      return {
        bid: 32,
        bookAccount: '',
        distrbutionId: '',
      }
    },

    methods: {
      // 借阅书籍
      BorrowBook(bid) {
        // 先判断有没有登录
        var token = window.sessionStorage.getItem('token')
        if (!token || token == 'null') {
          this.$alert('登录后才能借阅书籍哦', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          BorrowBook(bid.bid).then(res => {
            this.$message.info(res.data.msg)
            console.log(res.data)
          }).catch(erro => {
            this.$message.error("借阅书籍失败")
          })
        }
      },
    }
  }
</script>

<style scoped="scoped">
</style>
