<template>
  <div class="BookList">
    <el-table :data="bookList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <!-- 通过指定type="index" 添加索引列 -->
      <el-table-column type="index"></el-table-column>
        <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="简介">
              <span>{{ props.row.introduction }}</span>
            </el-form-item>
            <el-form-item label="书籍数量">
              <span>{{ props.row.bookAccount }}</span>
            </el-form-item>
            <el-form-item label="书籍图片">
              <span>
                <el-image style="width: 30%; height: 30%" :src="props.row.bookOtherImportantPath" fit="cover"></el-image>
              </span>
            </el-form-item>
            <el-form-item label="">
              <!-- 书籍评价 -->
              <el-button type="text" @click="bookEvaluation(props.row);dialogVisible=true" center>书籍评价</el-button>
              <el-dialog :title="'《'+props.row.bname+'》 书评'" :visible.sync="dialogVisible" width="30%">
                <div style="height:200px;overflow: auto;">
                  <ul style="list-style: none;">
                    <li v-for="(item,index) in bookEvaluations" :key="index">
                      <el-card>
                        <div class="bookEvaluation-Card">
                          <div class="evaluations">
                            {{item.remarkToBookContent}}
                          </div>
                          <div class="user">
                            — {{item.userName}}
                          </div>
                        </div>
                      </el-card>
                    </li>
                  </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
                </span>
              </el-dialog>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="书名" prop="bname">
      </el-table-column>
      <el-table-column label="作者" prop="writer">
      </el-table-column>
      <el-table-column label="出版社" prop="bpublish">
      </el-table-column>
      <el-table-column label="所需积分" prop="bookPrice">
      </el-table-column>
      <el-table-column label="操作" @click="handleClick()">
        <!--设置slot-scope="scope"后可以通过scope.row拿到当前行的数据 -->
        <template slot-scope="scope">
          <div @click="handleClick(scope.row)">
            <slot name="reserveBook"></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部的分页功能 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[8, 15, 30]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="this.bookList.length">
    </el-pagination>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    getBookList,
    getBookEvaluation
  } from '@/network/borrowBook/bookList.js'
  export default {
    data() {
      return {
        count: 0,
        height: '',
        dialogVisible: true,
        bookEvaluations: [],
        // 注意：后台返回值是一个对象数组的时候，data中一定也要用一个对象数组来存放返回数据
        tableData: [],
        currentPage: 1, //初始页
        pagesize: 8, //默认每页的数据
        bId: '',
      }
    },
    computed: {
      ...mapGetters({
        // 注意：引用模块中的getters需要加上模块名
        bookList: 'bookList/getBookList',
      }),
    },
    methods: {
      ...mapMutations({
        setBookList: 'bookList/setBookList'
      }),
      load() {
        this.count += 2
      },
      handleSizeChange: function(size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },
      handleClick(row) {
        this.$emit('btnClick', {
          bid: row.bid
        })
      },
      // 书籍评价
      bookEvaluation(row) {
        getBookEvaluation(row.bid).then(res => {
          this.bookEvaluations = res.data.data
          console.log(this.bookEvaluations)
        }).catch(error => {
          this.$message.error("获取书籍评价失败")
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-pagination {
    margin-top: 15px;
  }

  .bookEvaluation-Card .user {
    float: right;
  }
</style>
