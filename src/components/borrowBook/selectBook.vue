<template>
  <div class="selectBook">
    <!-- 2020年1月2日书写，还有问题，id设置、数据绑定等有问题 -->
    <el-row :gutter='10'>
      <el-form :model="selectBookForm1" :rules="selectBookRules1" ref="selectBookRef1" @submit.native.prevent>
        <el-col :span="4" :offset="1">
          <!-- 关键字搜索界面 -->
          <el-form-item prop="keyWord">
            <el-input type="text" v-model="selectBookForm1.keyWord" placeholder="请输入书籍关键字" @keyup.enter.native="submit1()"
              clearable @clear="getBookList">
              <el-button slot="append" icon="el-icon-search" @click="submit1()"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>


      <!-- 按照类型查询图书 -->
      <el-form :model="selectBookForm2" :rules="selectBookRules2" ref="selectBookRef2" @submit.native.prevent>
        <el-col :span="4" :offset="11">
          <el-form-item prop="content">
            <el-input type="text" v-model="selectBookForm2.param" placeholder="请输入内容" @keyup.enter.native="submit2()"
              clearable @clear="getBookList()">
              <el-button slot="append" icon="el-icon-search" @click="submit2()"></el-button>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-select v-model="selectBookForm2.value" clearable placeholder="选择查询类型" style='width: 150px;'>
            <el-option v-for="item in selectBookForm2.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import {
    selectBookByKeyWord,
    selectBookByName,
    selectBookByPublish,
    selectBookByIntroduction,
    selectBookByWriter,
    selectBookByOtherImportantPath
  } from '@/network/borrowBook/selectBook.js'
  import {
    getBookList
  } from '@/network/borrowBook/bookList.js'
  import {
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    components: {},
    data() {
      // 自定义按照类型查询的验证规则
      var validateContent = (rule, value, callback) => {
        if (!this.selectBookForm2.value) {
          callback(new Error('请先选择查询类型'));
        }
        callback();
      };
      return {
        selectBookForm1: {
          keyWord: '',
        },
        selectBookForm2: {
          options: [{
            value: 'name',
            label: '按书名查找'
          }, {
            value: 'publish',
            label: '按出版社查找'
          }, {
            value: 'writer',
            label: '按作者查找'
          }, {
            value: 'introduction',
            label: '按简介查找'
          }],
          value: '',
          param: '',
        },

        input: '',
        bName: '',
        tableData: [],
        bIdList: [],
        flag: false,
        selectBookRules1: {
          keyWord: [{
              required: true,
              message: '请输入关键字',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 15,
              message: '长度在 1 到 15个字符',
              trigger: 'blur'
            },
          ],
        },
        selectBookRules2: {
          content: [{
            validator: validateContent,
            message: '请先选择查询类型',
            trigger: 'blur'
          }, ],
        }
      }
    },
    methods: {
      ...mapMutations({
        setBookList: 'bookList/setBookList'
      }),
      // 按关键字查询
      submit1() {
        this.$refs.selectBookRef1.validate(valid => {
          if (!valid) {
            this.$message.error("填写数据不合法，请核对！")
          } else {
            selectBookByKeyWord(this.selectBookForm1.keyWord).then(res => {
              if (res.data.code === 0) {
                var newTableData = res.data.data
                newTableData.forEach(item => {
                  this.tableData.push(item)
                })
                this.setBookList(this.tableData)
                this.tableData = []
              }else{
                this.$message.info(res.data.msg)
              }
            }).catch(erro => {
              console.log("关键字查询失败！")
            })
          }
        })
      },

      // 当输入框清空后重新获取所有书籍的列表
      getBookList() {
        getBookList().then(res => {
          this.tableData = res.data.data
          this.setBookList(this.tableData)
          this.tableData = []
        }).catch(erro => {
          this.$message.erro('获取书籍列表失败！')
        })
      },
      // 按条件查询
      submit2() {
        this.$refs.selectBookRef2.validate(valid => {
          if (!valid) {
            this.$message.error("数据不合法")
          } else {
            // 为何将this.$store.commit('getBookList', this.tableData)写在switch循环外就不行了？
            switch (this.selectBookForm2.value) {
              case "name":
                selectBookByName(this.selectBookForm2.param).then(res => {
                  this.tableData = res.data.data
                  this.setBookList(this.tableData)
                })
                break;
              case "publish":
                selectBookByPublish(this.selectBookForm2.param).then(res => {
                  this.tableData = res.data.data
                  console.log("按出版社查询有问题")
                  this.setBookList(this.tableData)
                })
                break;
              case "introduction":
                selectBookByIntroduction(this.selectBookForm2.param).then(res => {
                  this.tableData = res.data.data
                  this.setBookList(this.tableData)
                })
                break;
              case "writer":
                selectBookByWriter(this.selectBookForm2.param).then(res => {
                  this.tableData = res.data.data
                  this.setBookList(this.tableData)
                })
                break;
              default:
                this.$message.erro("按类型查询失败！")
                break;
            }
            this.tableData = []
          }
        })
      }
    },
  }
</script>

<style scoped="scoped">

</style>
