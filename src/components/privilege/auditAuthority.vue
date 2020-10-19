<template>
  <div class="auditBook">
    <el-card>
      <!-- 页头面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>特权界面</el-breadcrumb-item>
        <el-breadcrumb-item>审核权限</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="table">
        <el-table :data="tableData" style="width: 100%" empty-text="系统中暂无需要授权的用户哦!">
          <el-table-column type="index" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="申请人" width="100" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提交申请时间" :formatter="dateFormat" width="280" align="center">
          </el-table-column>
          <el-table-column prop="rid" label="当前身份" width="200" align="center">
          </el-table-column>
          <el-table-column prop="tid" label="申请身份" width="200" align="center">
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleRequest(scope.$index, scope.row, tableData, true)">接受申请</el-button>
              <el-button type="text" @click="handleRequest(scope.$index, scope.row, tableData, false)">驳回请求</el-button>
              <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)" type="text" size="small">
                删除订单
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    getDontAudientRole,
    updateOrDelete
  } from '@/network/privilege/auditAuthority.js'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.getDontAudientRole()
    },
    methods: {
      // 格式化时间
      dateFormat: function(row, column) {
        var date = row.date;
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY年MM月DD日HH时");
      },
      // 处理请求
      handleRequest(index, row, rows, flag) {
        updateOrDelete(row.id, flag).then(res => {
          if (res.data.code == 0) {
            this.$message.success(res.data.msg)
            rows.splice(index, 1)
          }else{
            this.$message.info(res.data.msg)
          }
        }).catch(erro => {
          this.$message.error("更改用户身份失败！")
        })
      },
      // 获取待审核数据
      getDontAudientRole() {
        getDontAudientRole().then(res => {
          var data = res.data.data
          data.forEach(object => {
            if (object.rid === 1) object.rid = "普通用户"
            if (object.rid === 2) object.rid = "管理员"
            if (object.rid === 3) object.rid = "配送员"
            if (object.rid === 4) object.rid = "超级管理员"
            if (object.tid === 1) object.tid = "普通用户"
            if (object.tid === 2) object.tid = "管理员"
            if (object.tid === 3) object.tid = "配送员"
            if (object.tid === 4) object.tid = "超级管理员"
          })
          this.tableData = data
        }).catch(erro => {
          this.$message("获取待审核列表失败！")
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
    margin-top: 30px;
  }
</style>
