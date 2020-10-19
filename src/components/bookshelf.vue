<template>
  <div class="bookshelf">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的书架</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="bookShelfTable">
        <div>
          <el-table ref="multipleTable" :max-height="screenHeight*0.55" :highlight-current-row="true" :data="tableData"
            tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" align="center"
            empty-text="您的书架中还没有书籍呢   快去借阅书籍板块加购喜欢的书籍吧 !">
            <el-table-column type="selection" width="70">
            </el-table-column>
            <el-table-column prop="book.bname" label="书名" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="book.writer" label="作者" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="book.bpublish" label="出版社" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="book.bookAccount" label="库存量" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="book.bookPrice" label="单价" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="" label="操作" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)" type="text" size="small">
                  删除订单
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="total" :total="tableData.length">
          </el-pagination>
        </div>
        <div style="margin-top: 20px">
          <el-button @click="clearSelection()">取消选择</el-button>
        </div>
        <div style="margin-top: 8px;margin-bottom:30px;margin-right:60px;float: right;">
          <el-button type="success" @click="dialogVisible = true">去 支 付</el-button>
        </div>
      </div>

<!-- 支付界面 -->
      <div class="goPay">
        <el-dialog title="支付中..." :visible.sync="dialogVisible" width="50%" @close="handlePayDialogClose">
          <div class="stepsAndTab">
            <div class="steps">
              <el-steps :active="active-0" finish-status="success" align-center>
                <el-step title="" description="请核对订单内容否正确">
                </el-step>
                <el-step title="" description="配送地址默认为寝室,若需修改请前往个人中心修改个人信息">
                </el-step>
                <el-step title="" description="选择自取还是配送到寝室">
                </el-step>
              </el-steps>
            </div>
            <div class="tab">
              <el-tabs v-model="active" @tab-click="compareIntegral" :tab-position="'left'" style="margin-top: 20px;">
                <el-tab-pane label="确认订单" name="0">
                  <el-card>
                    <el-table :data="multipleSelection" style="width: 100%" empty-text="你还没有选择订单哦!">
                      <el-table-column prop="book.bname" label="书名" width="180">
                      </el-table-column>
                      <el-table-column prop="book.writer" label="作者" width="180">
                      </el-table-column>
                      <el-table-column prop="book.bpublish" label="出版社">
                      </el-table-column>
                      <el-table-column prop="book.bookAccount" label="库存量">
                      </el-table-column>
                      <el-table-column prop="book.bookPrice" label="所需积分">
                      </el-table-column>
                    </el-table>
                  </el-card>
                  <div class="integral">
                    <el-tag>我的积分：{{userInformation.integration}}</el-tag>
                    <el-tag type="info">本单共需积分：{{summaryPrice}}</el-tag>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="确认个人信息" name="1">
                  <div class="userInformation">
                    <el-card>
                      <el-form :model="userInformation">
                        <el-form-item label="收货人姓名">
                          <el-input v-model="userInformation.userName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                          <el-input v-model="userInformation.wechatNumber" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="收获地址">
                          <el-input v-model="userInformation.dirmitoryNumber" :disabled="true"></el-input>
                        </el-form-item>
                      </el-form>
                    </el-card>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="是否需要配送员" name="2">
                  <div class="isNeedDeliveryman">
                    <el-card>
                      <el-table :data="sendOrderTable" style="width: 95%" max-height="310px">
                        <el-table-column prop="userName" label="姓名" width="200">
                        </el-table-column>
                        <el-table-column prop="wechatNumber" label="联系方式" width="200">
                        </el-table-column>
                        <el-table-column prop="" label="积分" width="250">
                          <template slot-scope="scope">
                            <div class="integral">
                              <el-rate v-model="scope.row.deliveManGrade" disabled show-score text-color="#ff9900">
                              </el-rate>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                          <template slot-scope="scope">
                            <div class="integral">
                              <el-button type="text" @click="selectDeliveryman(scope.row)">选Ta配送</el-button>
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <div class="confirmPayDiv">
                      <el-button v-loading="loading" type="primary" class="confirmPayButton" @click="payBench(payObj)">自取支付</el-button>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    getDontPay,
    cancelOrder,
    payBench,
    getCurrentUser,
    getSendOrder
  } from '@/network/bookshelf.js'
  export default {
    // 注入依赖
    inject: ['reload'],
    data() {
      return {
        screenHeight: window.innerHeight,
        currentPage: 1, //初始页
        pagesize: 8, //默认每页的数据
        tableData: [],
        ordersIds: [],
        multipleSelection: [],
        ordersLength: '',
        active: 0,
        dialogVisible: false,
        summaryPrice: 0,
        userInformation: [],
        sendOrderTable: [],
        deliverymanId: '',
        payObj: {
          list: [],
          deliverymanId: ''
        },
        loading: false,
      }
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          that.screenHeight = window.innerHeight
        })()
      }
    },
    watch: {
      multipleSelection() {
        this.summaryPrice = 0;
        this.multipleSelection.forEach(item => {
          this.summaryPrice = this.summaryPrice + item.book.bookPrice
        })
      }
    },
    created() {
      // 书架页面刚创建时就 请求订单数据 当前用户信息 所有配送员信息
      this.getDontPay()
      this.getCurrentUser(),
        this.getSendOrder()
    },
    methods: {
      // 分页功能
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
      },
      // 获取当前用户的信息
      getCurrentUser() {
        getCurrentUser().then(res => {
          this.userInformation = res.data.data
        }).catch(error => {
          this.$message.error("获取用户个人信息失败！")
        })
      },
      //请求当前用户的购物车
      getDontPay() {
        getDontPay().then(res => {
          var data = res.data.data
          this.tableData = data
          console.log(this.tableData)
          data.forEach(item => {
            if (item.orderStatus === true) {
              var tempData = item;
              this.tableData.push(tempData)
            }
          })
        }).catch(error => {
          this.$message.error("获取购物车数据失败！")
        })
      },
      // 取消全选
      clearSelection() {
        this.$refs.multipleTable.clearSelection();
      },
      // 删除订单
      deleteRow(index, rows, row) {
        // 这里的rows是模板代码自带的，row代表当前行的数据
        cancelOrder(row.id).then(res => {
          this.$message.info(res.data.msg)
        }).catch(error => {
          this.$message.error("删除失败")
        })
        rows.splice(index, 1);
      },

      // 监听选择框是否发生变化并获取选中行的id
      handleSelectionChange(rows) {
        this.multipleSelection = rows;
        this.ordersLength = rows.length;
        this.ordersIds = [];
        if (rows) {
          rows.forEach(row => {
            if (row) {
              this.ordersIds.push(row.id);
            }
          });
        }
        this.payObj.list = this.ordersIds;
      },
      // 批量支付
      payBench(payObj) {
        this.loading = true
        // 将数组转化成字符串
        payBench(payObj).then(res => {
          if (res.data.code == 0) {
            this.loading = false
            this.$message.success("支付成功！")
          } else {
            this.$message.warning(res.data.msg)
            this.loading = false
          }
        }).catch(error => {
          this.$message.error("支付失败 请重试!")
          this.loading = false
        })
      },
      // 控制步骤条
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      // 比较用户积分和订单所需积分
      compareIntegral() {
        if (this.userInformation.integration < this.summaryPrice) {
          this.$alert("你的积分不足以支付本订单！", "警告", {
            type: 'warning'
          })
        }
      },
      // 获取全部配送员
      getSendOrder() {
        getSendOrder().then(res => {
          this.sendOrderTable = res.data.data
        }).catch(error => {
          this.$message.error("获取配送员失败")
        })
      },
      // 选取配送员
      selectDeliveryman(row) {
        this.deliveryman = row
        this.payObj.deliverymanId = row.id
        this.$alert('订单将由 ' + this.deliveryman.userName + ' 为您配送 并收取您2积分的配送费 本次订单共消耗积分' + (this.summaryPrice + 2) + '',
          "小提示", {
            type: 'info ',
            center: true,
            confirmButtonText: '确定支付',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '支付中...';
                payBench(this.payObj).then(res => {
                  if (res.data.code === 0) {
                    this.$message.success("支付成功！")
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                      done();
                    }, 2000);
                  } else {
                    this.$message.warning(res.data.msg)
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                      done();
                    }, 2000);
                  }
                }).catch(error => {
                  this.$message.error("支付出错 请重试！")
                })
              } else {
                // done用于关闭message
                done();
              }
            }
          })
      },
      // 关闭支付dialog时刷新界面获取最新数据
      handlePayDialogClose(){
        this.reload()
      }
    }
  }
</script>

<style>
  .steps .el-step__description {
    margin-top: 5px;
  }

  .integral {
    margin-top: 25px;
    margin-left: 15px;
    width: 300px;
    display: flex;
    direction: row;
    justify-content: space-between;
  }

  .confirmPayDiv {
    text-align: center;
  }

  .confirmPayButton {
    margin-top: 25px;
  }
</style>
