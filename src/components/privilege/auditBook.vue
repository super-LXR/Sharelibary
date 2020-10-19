<template>
  <div class="auditBook">
    <el-card>
      <!-- 页头面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>特权界面</el-breadcrumb-item>
        <el-breadcrumb-item>审核书籍</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tableData" empty-text="系统中暂无需要审核的书籍哦!">
        <el-table-column type="index" :index="indexMethod" align="center">
        </el-table-column>
        <el-table-column prop="sourceTime" :formatter="dateFormat" label="捐赠时间" align="center" width=200>
        </el-table-column>
        <el-table-column prop="userName" label="捐赠者" align="center" width=100>
        </el-table-column>
        <el-table-column prop="wechatNumber" label="捐赠者联系方式" align="center" width=150>
        </el-table-column>
        <el-table-column prop="dirmitoryNumber" label="捐赠者宿舍" align="center" width=100>
        </el-table-column>
        <el-table-column prop="book.bname" label="书名" align="center" width=100>
        </el-table-column>
        <el-table-column prop="book.writer" label="作者" align="center" width=100>
        </el-table-column>
        <el-table-column prop="book.bpublish" label="出版社" align="center width=100">
        </el-table-column>
        <el-table-column prop="book.introduction" label="简介" align="center" width=400>
        </el-table-column>
        <el-table-column prop="book.introduction" label="操作" align="center" width=150>
          <template slot-scope="scope">
            <el-button @click="auditBook(scope.$index,scope.row,tableData)" type="text" size="small">
              确认审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import {
    auditBook,
    getSourceBook,
    getBookDontAudit
  } from '@/network/privilege/auditBook.js'
  export default {
    data() {
      return {
        bookId: '',
        tableData: []
      }
    },
    created() {
      this.getBookDontAudit()
    },
    methods: {
      // 格式化时间
      dateFormat: function(row, column) {
        var date = row.sourceTime;
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      indexMethod(index) {
        return index;
      },
      auditBook(index, row, rows) {
        auditBook(row.id).then(res => {
          if (res.data.code === 0) {
            this.$message.success("审核成功")
            rows.splice(index, 1)
          } else {
            this.$message.info(res.data.msg)
          }
        }).catch(erro => {
          this.$message.error("审核书籍失败！")
        })
      },
      getBookDontAudit() {
        getBookDontAudit().then(res => {
          this.tableData = res.data.data
        }).catch(erro => {
          alert("查看书籍源失败")
        })
      },

    },

  }
</script>

<style scoped="scoped">
  .auditBook {
    display: flex;
    direction: row;
    justify-content: center;
  }

  .el-card {
    display: flex;
    justify-content: center;
    /* width: 90%; */
    margin-top: 30px;
  }
</style>
