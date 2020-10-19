<template>
  <div class="myContribution">
    <h3>当前您拥有 {{userInformation.integration}} 积分</h3>
    <el-table :data="contributionData" style="width: 100%" max-height="350" empty-text="您还没有贡献过书籍呢 快去为共享图书馆的建设添砖加瓦吧!">
      <el-table-column prop="sourceTime" :formatter="dateFormat" label="贡献时间" width="120" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="book.bname" label="书名" width="140" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="book.writer" label="作者" width="120" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="book.bpublish" label="出版社" width="120" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="integral" label="收获积分" show-overflow-tooltip align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getContributions
  } from '@/network/personalCenter/myContribution.js'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        integral: 3,
        myContributionData: []
      }
    },
    computed: {
      ...mapGetters({
        userInformation: 'userInformation/getUserInformation'
      }),
      // 通过计算属性为每一条数据增加一个status 并返回
      contributionData: function() {
        var tempContributionData = this.myContributionData
        tempContributionData.forEach(item => {
          this.$set(item, 'integral', 3);
          if (item.boolPass === 0) {
            this.$set(item, 'status', '待审核');
            // 积分是前端做的假数据：
          } else if (item.boolPass === 1) {
            this.$set(item, 'status', '贡献成功');
          }
        })
        return tempContributionData
      }
    },
    created() {
      this.getContributions()
    },
    methods: {
      // 格式化时间
      dateFormat: function(row, column) {
        var date = row.sourceTime;
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD");
      },
      getContributions() {
        getContributions().then(res => {
          this.myContributionData = res.data.data
          console.log(this.myContributionData)
        }).catch(error => {
          this.$message.error("获取贡献信息失败！")
        })
      }
    }
  }
</script>

<style>

</style>
