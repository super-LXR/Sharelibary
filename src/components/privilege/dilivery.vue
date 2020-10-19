<template>
  <div class="dilivery">
    <el-card>
      <!-- 页头面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>特权界面</el-breadcrumb-item>
        <el-breadcrumb-item>书籍配送</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="deliveryList" style="width: 100%" border stripe>
        <el-table-column type="index" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="orderTime" :formatter="dateFormat" label="订单时间" width="200" align="center">
        </el-table-column>
        <!-- <el-table-column prop="user.userName" label="收货人姓名" width="120"  align="center">
        </el-table-column> -->
        <el-table-column prop="user.dirmitoryNumber" label="收货人地址" width="140" align="center">
        </el-table-column>
        <el-table-column prop="user.wechatNumber" label="收货人联系方式" width="180" align="center">
        </el-table-column>
        <el-table-column prop="id" label="订单编号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="book.bname" label="书籍名称" width="180" align="center">
        </el-table-column>
        <!-- <el-table-column prop="book.bookAccount" label="书籍数量" width="180" align="center">
        </el-table-column> -->
        <el-table-column prop="" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="取消该订单" placement="bottom">
              <el-button type="primary" icon="el-icon-delete" @click="deleteRow(scope.$index, deliveryList,scope.row)"
                size="small" style="margin-right: 20px;"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>
  import {
    getDeliveryList,
    cancelOrder
  } from '@/network/privilege/dilivery.js'
  export default {
    data() {
      return {
        deliveryList: [],
        checked: true
      }
    },
    created() {
      this.getDeliveryList()
    },
    methods: {
      dateFormat: function(row, column) {
        var date = row.orderTime;
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      indexMethod(index) {
        return index;
      },
      //查看订单列表
      getDeliveryList() {
        getDeliveryList().then(res => {
          this.deliveryList = res.data.data
          console.log(this.deliveryList)
        }).catch(error => {
          this.$message.error("查询需要配送的订单出错")
        })
      },

      // 删除订单（当前行）
      deleteRow(index, rows, row) {
        // 这里的rows是模板代码自带的，row代表当前行的数据
        cancelOrder(row.id).then(res => {
          this.$message.info(res.data.msg)
        }).catch(error => {
          this.$message.error("取消订单失败")
        })
        rows.splice(index, 1);
      }

      //获取全部配送员
      // getSendOrder() {
      //   getSendOrder().then(res => {
      //     console.log(res.data)
      //   }).catch(erro => {
      //     alert("获取全部配送员失败")
      //   })
      // },
    }
  }
</script>

<style scoped="scoped">
  .dilivery {
    display: flex;
    justify-content: center;
  }

/* .el-card {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  } */
</style>
