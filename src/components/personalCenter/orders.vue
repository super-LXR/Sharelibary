<template>
  <div class="order">
    <!-- 注意：在dialogVisible前不能加this！！ -->
    <el-dialog title="我的订单" :visible.sync="dialogVisible" width="45%" @close="Close_dialog" :show-close="true"
      :highlight-current-row="true">
      <!-- 全部订单 -->
      <div class="allOrders">
        <el-table :data="allOrders.data" style="width: 800%" max-height="300" v-show="status === 'allOrders'"
          empty-text="您没有任何订单!">
          <el-table-column prop="orderTime" :formatter="dateFormat" label="下单日期" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bname" label="书名" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.writer" label="作者" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bpublish" label="出版社" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bookPrice" label="花费积分" show-overflow-tooltip align="center">
          </el-table-column>
        </el-table>
      </div>
      <!-- 待收货订单 -->
      <div class="unreceived">
        <el-table :data="unreceivedOrders.data" style="width: 100%" max-height="380" v-show="status === 'unreceived'"
          empty-text="没有待收货订单!">
          <el-table-column prop="orderTime" :formatter="dateFormat" label="下单日期" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bname" label="书名" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.writer" label="作者" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bpublish" label="出版社" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bookPrice" label="花费积分" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="" label="操作" fixed="right" align="center" width=200>
            <template slot-scope="scope">
              <div class="unreceived-operate">
                <el-button type="text" @click="confirmReceipt(scope.$index,scope.row,unreceivedOrders.data)">确认收货</el-button>
                <el-button type="text" @click="cancelOrder(scope.$index,scope.row,unreceivedOrders.data)">取消订单</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 待评价订单 -->
      <div class="unevaluated" :append-to-body="true">
        <el-table :data="unevaluatedOrders.data" style="width: 100%" max-height="350" v-show="status === 'unevaluated'"
          empty-text="您的订单都被您评价过了哦!">
          <el-table-column prop="orderTime" :formatter="dateFormat" label="下单日期" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bname" label="书名" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.writer" label="作者" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bpublish" label="出版社" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bookPrice" label="花费积分" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="" label="操作" show-overflow-tooltip fixed="right" align="center">
            <template slot-scope="scope">
              <el-button @click="edialogVisible = true; getRowData(scope.$index,scope.row,unevaluatedOrders.data)" type="text">去评价</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 待归还订单 -->
      <div class="unrestored" v-show="status === 'unrestored'">
        <el-table :data="this.unrestoredOrders.data" style="width: 100%" max-height="350" empty-text="您所有的订单都如期归还! 做得很棒!!">
          <el-table-column prop="orderTime" :formatter="dateFormat" label="下单日期" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bname" label="书名" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.writer" label="作者" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bpublish" label="出版社" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="book.bookPrice" label="花费积分" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="" label="操作" show-overflow-tooltip align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click="retrunBook(scope.$index,scope.row,unrestoredOrders.data)" type="text">去归还</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 评价界面dialog -->
      <div class="evaluate">
        <el-dialog title="评价" :visible.sync="edialogVisible" width="30%" append-to-body custom-class="evaluate-dialog"
          :before-close="handleEvaluateDialogClose" :show-close=false>
          <el-card>
            <div class="toBook">
              <p class="evaluateFont">书籍评价</p>
              <el-input type="textarea" :rows="2" placeholder="请填写对书籍的主观评价 上限50字" v-model="evaluateData.evaluateToBook"
                maxlength="50" show-word-limit>
              </el-input>
              <el-button type="primary" style="float: right; margin-bottom: 20px; margin-top:20px" @click="evaluateToBook">提交</el-button>
            </div>
          </el-card>
          <el-card>
            <div class="toDeliveryman">
              <p class="evaluateFont">配送员评价</p>
              <el-rate v-model="evaluateData.evaluateToDeliveryman" show-text>
              </el-rate>
              <el-button type="primary" style="float: right;margin-bottom: 20px; margin-top:20px" @click="evaluateToDeliveryman">提交</el-button>
            </div>
          </el-card>
          <span slot="footer" class="dialog-footer">
            <el-button @click="edialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    getOrders,
    confirmReceipt,
    cancelOrder,
    evaluateToBook,
    evaluateToDeliveryman,
    getUnreceivedOrders,
    getUnevaluatedOrders,
    getUnrestoredOrders,
    returnBook,
  } from '@/network/personalCenter/orders.js'
  export default {
    data() {
      return {
        edialogVisible: false,
        dialogVisible: false,
        number: {
          allOrdersNM: 0,
          unreceivedNM: 0,
          unevaluatedNM: 0,
          unrestoredNM: 0
        },
        allOrders: [],
        unreceivedOrders: [],
        unevaluatedOrders: [],
        unrestoredOrders: [],
        evaluateData: {
          id: 0,
          evaluateToBook: '',
          evaluateToDeliveryman: ''
        },
        rowData: '',
        personalInformationData: '',
        // index代表评价书籍当前选中行的索引，用于删除数据
        index: 0,
        // flag控制是否允许评论dialog关闭
        flag: Boolean
      }
    },
    computed: {
      ...mapGetters({
        ordersVisible: 'orders/getOrdersVisible',
        // status用于标识当前打开什么dialog
        status: 'orders/getStatus'
      }),
    },
    created() {
      this.getOrders()
      this.getUnreceivedOrders()
      this.getUnevaluatedOrders()
      this.getUnrestoredOrders()
    },
    beforeMount() {
      this.handleNum()
    },
    watch: {
      ordersVisible(newValue, oldValue) {
        this.dialogVisible = newValue
      },
    },
    methods: {
      ...mapMutations({
        setOrdersVisible: 'orders/setOrdersVisible',
        setOrders: 'orders/setOrders',
        setNumber: 'orders/setNumber',
      }),
      dateFormat: function(row, column) {
        var date = row.orderTime;
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      Close_dialog() {
        this.dialogVisible = false
        this.setOrdersVisible(this.dialogVisible)
      },
      // 获取全部订单
      getOrders() {
        getOrders().then(res => {
          this.allOrders = res.data
          this.number.allOrdersNM = this.allOrders.data.length
          console.log(this.allOrders)
        })
      },
      // 获取待收货订单
      getUnreceivedOrders() {
        getUnreceivedOrders().then(res => {
          this.unreceivedOrders = res.data
          this.number.unreceivedNM = this.unreceivedOrders.data.length
        })
      },
      // 获取待评论订单
      getUnevaluatedOrders() {
        getUnevaluatedOrders().then(res => {
          this.unevaluatedOrders = res.data
          this.number.unevaluatedNM = this.unevaluatedOrders.data.length
        })
      },
      // 获取待归还订单
      getUnrestoredOrders() {
        getUnrestoredOrders().then(res => {
          this.unrestoredOrders = res.data
          this.number.unrestoredNM = this.unrestoredOrders.data.length
        })
      },
      // 用于计算每类型订单的数量
      handleNum() {
        this.setNumber(this.number)
      },
      // 归还书籍
      retrunBook(index, row, rows) {
        returnBook(row.id).then(res => {
          if (res.data.code === 0) {
            rows.splice(index, 1);
            this.number.unrestoredNM--
            this.setNumber(this.number)
            this.$message.success("还书成功")
          } else {
            this.$message.info(res.data.msg)
          }
        }).catch(error => {
          this.$message.error("还书失败！")
        })
      },
      // 确认收货
      confirmReceipt(index, row, rows) {
        confirmReceipt(row.id).then(res => {
          if (res.data.code === 0) {
            rows.splice(index, 1);
            // 确认收货后相应的订单个数减一
            this.number.unreceivedNM--
            this.setNumber(this.number)
            this.$message.success("确认收货成功")
          } else {
            this.$message.info(res.data.msg)
          }
        }).catch(error => {
          this.$message.error("确认失败！")
        })
      },
      // 取消订单
      cancelOrder(index, row, rows) {
        cancelOrder(row.id).then(res => {
          if (res.data.code === 0) {
            rows.splice(index, 1);
            // 确认收货后相应的订单个数减一
            this.number.unreceivedNM--
            this.$message.success("取消订单成功")
          } else {
            this.$message.info(res.data.msg)
          }
        }).catch(error => {
          this.$message.error("取消失败！")
        })
      },
      // 获取当前行的数据
      getRowData(index, row, rows) {
        this.rowData = row
        this.evaluateData.id = row.id
      },
      // 对书籍评价
      evaluateToBook() {
        evaluateToBook(this.evaluateData).then(res => {
          this.flag = res.data.flag
          if (res.data.flag == true) {
            this.$message.info("书籍评论成功 快去下面评论配送员吧！")
          }
          if (res.data.flag == false) {
            // 评论成功后修改数据
            this.unevaluatedOrders.data.splice(this.index, 1)
            this.number.unevaluatedNM--
            this.$message.success("该订单评论完成！")
            // 关闭当前评论界面前将评论数据刷新
            this.evaluateData.evaluateToDeliveryman = 0
            this.evaluateData.evaluateToBook = ''
            // 订单评论完成后关闭评论界面
            this.edialogVisible = false
          }
          this.$message.info(res.data.msg)
          console.log(res.data)
        }).catch(error => {
          // this.$message.error("书籍评论失败！")
        })
      },
      // 对配送员评价
      evaluateToDeliveryman() {
        evaluateToDeliveryman(this.evaluateData).then(res => {
          this.flag = res.data.flag
          if (res.data.flag == true) {
            this.$message.info("配送员评论成功 快去上面评论订单吧！")
          }
          if (res.data.flag == false) {
            // 评论成功后修改数据
            this.unevaluatedOrders.data.splice(this.index, 1)
            this.number.unevaluatedNM--
            this.$message.success("该订单评论完成！")
            // 关闭当前评论界面前将评论数据刷新
            this.evaluateData.evaluateToDeliveryman = 0
            this.evaluateData.evaluateToBook = ''
            // 订单评论完成后关闭评论界面
            this.edialogVisible = false
          }
          this.$message.info(res.data.msg)
          console.log(res.data)
        }).catch(error => {
          // this.$message.error("对配送员评价失败！")
        })
      },
      // 评价界面关闭前的回调
      handleEvaluateDialogClose() {
        if (this.flag == true) {
          this.$alert('评论未完成别想跑！', '警告', {
            type: 'warning',
            confirmButtonText: '知道了'
          })
        }else{

          done()
        }
      }
    },
  }
</script>

<style>
  .evaluate-dialog .el-dialog__body {
    padding-top: 10px;
  }

  .toDeliveryman {
    margin-top: 20px;
  }

  .evaluateFont {
    font-size: 15px;
    font-family: "微软雅黑";
    font-weight: bold;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
