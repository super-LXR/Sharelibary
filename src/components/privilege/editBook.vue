<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>特权界面</el-breadcrumb-item>
        <el-breadcrumb-item>修改图书</el-breadcrumb-item>
      </el-breadcrumb>
      <vxe-table border resizable row-key highlight-hover-row ref="xTable" height="500" :data="bookList"
        @cell-dblclick="cellDBLClickEvent">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="bname" title="书名" align="center"></vxe-table-column>
        <vxe-table-column field="writer" title="作者" align="center"></vxe-table-column>
        <vxe-table-column field="bpublish" title="出版社" align="center"></vxe-table-column>
        <vxe-table-column field="bookAccount" title="库存" align="center"></vxe-table-column>
        <vxe-table-column field="bookPrice" title="单价" align="center"></vxe-table-column>
        <vxe-table-column title="操作" width="100" show-overflow align="center">
          <template v-slot="{ row }">
            <vxe-button type="text" icon="vxe-icon--edit-outline" @click="editEvent(row)"></vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>

      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" :loading="submitLoading" resize
        destroy-on-close>
        <vxe-form :data="formData" :rules="formRules" ref="formDataRef" :items="formItems" title-align="right"
          title-width="100" @submit="submitEvent"></vxe-form>
      </vxe-modal>
    </el-card>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    editBook
  } from '@/network/privilege/editBook.js'
  export default {
    inject: ['reload'],
    data() {
      return {
        submitLoading: false,
        selectRow: null,
        showEdit: false,
        formData: {
          bId: null,
          bName: null,
          writer: null,
          bpublish: null,
          bookPrice: null,
          bookAccount: null,
          introduction: null,
        },
        formItems: [{
            title: '书 籍 信 息',
            span: 24,
            titleAlign: 'left',
            titleWidth: 200,
            titlePrefix: {
              icon: 'vxe-icon--info'
            }
          },
          {
            field: 'bName',
            title: '书名',
            span: 12,
            itemRender: {
              name: '$input',
              props: {
                placeholder: '请输入书籍名称'
              }
            }
          },
          {
            field: 'writer',
            title: '作者',
            span: 12,
            itemRender: {
              name: '$input',
              props: {
                placeholder: '请输入书籍作者'
              }
            }
          },
          {
            field: 'bpublish',
            title: '出版社',
            span: 12,
            itemRender: {
              name: '$input',
              props: {
                placeholder: '请输入书籍出版社'
              }
            }
          },
          {
            field: 'bookPrice',
            title: '单价',
            span: 12,
            itemRender: {
              name: '$input',
              props: {
                placeholder: '请输入书籍单价'
              }
            }
          },
          {
            field: 'bookAccount',
            title: '库存',
            span: 12,
            itemRender: {
              name: '$input',
              props: {
                placeholder: '请输入书籍库存'
              }
            }
          },
          {
            field: 'introduction',
            title: '书籍简介',
            span: 24,
            itemRender: {
              name: '$textarea',
              props: {
                placeholder: '请输入书籍简介'
              }
            }
          },
          {
            align: 'center',
            span: 24,
            titleAlign: 'left',
            itemRender: {
              name: '$buttons',
              children: [{
                props: {
                  type: 'submit',
                  content: '提交',
                  status: 'primary'
                }
              }, {
                props: {
                  type: 'reset',
                  content: '重置'
                }
              }]
            }
          }
        ],
        formRules: {
          bName: [{
              required: true,
              message: '书名是必填项',
            },
            {
              min: 1,
              max: 20,
              message: '书名长度在 1 到 20 个字符',
            },
          ],
          bpublish: [{
              required: true,
              message: '出版社是必填项',
            },
            {
              min: 1,
              max: 20,
              message: '出版社长度在 1 到 20 个字符',
            },
          ],
          writer: [{
              required: true,
              message: '作者是必填项',
            },
            {
              min: 1,
              max: 10,
              message: '作者长度在 1 到 10 个字符',
            },
          ],
          introduction: [{
              required: true,
              message: '书籍简介是必填项',
            },
            {
              min: 10,
              max: 200,
              message: '简介长度在 10 到 200 个字符',
            },
          ],
          bookAccount: [{
            required: true,
            message: '库存是必填项',
          }],
          bookPrice: [{
            required: true,
            message: '单价是必填项',
          }],
        },
      }
    },
    mounted() {
      this.formatBookList()
    },
    mounted() {
      window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    },
    destroyed() {
      window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
    },
    computed: {
      ...mapGetters({
        bookList: 'bookList/getBookList'
      }),
    },
    methods: {
      cellDBLClickEvent({
        row
      }) {
        this.editEvent(row)
      },
      beforeunloadFn(e) {
        this.reload()
      },
      editEvent(row) {
        this.formData = {
          bId: row.bid,
          bName: row.bname,
          writer: row.writer,
          bpublish: row.bpublish,
          bookPrice: row.bookPrice,
          bookAccount: row.bookAccount,
          introduction: row.introduction,
        }
        this.selectRow = row
        this.showEdit = true
      },
      submitEvent() {
        this.submitLoading = true
        editBook(this.formData).then(res => {
          this.showEdit = false
          if (res.data.code == 0) {
            this.$message.success(res.data.msg)
            this.submitLoading = false
            Object.assign(this.selectRow, this.formData)
            this.reload()
          } else {
            this.$message.info(res.data.msg)
            this.submitLoading = false
          }
        }).catch(error => {
          this.submitLoading = false
          this.$message.error("系统好像出了点什么问题")
        })
      }
    }
  }
</script>

<style>
</style>
