// 播报计划，首屏为计划列表，增删改查计划。可为每个计划设置该计划包含的灯杆
<template>
  <div>
    <div class="_search">
      <my-form class="_form" :formItem="planSearchItem" :formData="searchParams"></my-form>
      <Button type="primary" @click="search" :disabled="tableLoading" style="height: 32px">查找</Button>
      <Button type="success" @click="addModal = true" style="margin-left: 20px; height: 32px" :disabled="tableLoading">新增</Button>
    </div>
    <Modal v-model="addModal" width="600">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>新增</span>
        </p>
        <div style="text-align:center">
          <my-form class="_form" :formItem="planAddItem" :formData="planAddData" style="height: 360px;"></my-form>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="primary" size="large" :loading="adding" @click="ok">确认</Button>
          <Button size="large" @click="cancel">取消</Button>
        </div>
    </Modal>

    <Table class="table" :loading="tableLoading" border :columns="columns" :data="planList"></Table>
    <Page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="searchParams.currentPage"></Page>
  </div>
</template>

<script>
import MyForm from '@/template/form'
import Page from '@/template/page'
import { planSearchItem, planAddItem } from '@/data/formItems'
import http from '@/common/http'
export default {
  name: 'Broadcastplan',
  components: { Page, MyForm },
  data () {
    return {
      adding: false,        // 添加中
      addModal: false,      // 模态框显示状态
      tableLoading: false,  // 表格加载
      totalPage: 10,        // 默认总页数
      planSearchItem,   // 查询设备参数内容，用来生成请求form
      searchParams: {                 // 存放请求参数
        currentPage: 1
      },
      planAddItem,         // 新增设备参数内容，用来生成form
      planAddData: {},                 // 存放新增设备的参数
      planList: [],       // 存放设备列表
      columns: [            // 行
        { title: '资源id', key: 'id' },
        { title: '资源名称', key: 'name' },
        { title: '资源地址', key: 'url' },
        { title: '创建人', key: 'modifyId' },
        { title: '创建人姓名', key: 'user_name' },
        { title: '创建时间', key: 'modifyTime' },
        // {
        //   title: '资源类型',
        //   key: 'typ',
        //   render: (h, params) => {
        //     return h('div', getStatusText(params.row.typ, dev.typeOptions))
        //   }
        // },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/plan-info', query: { row: JSON.stringify(params.row) } })
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.tableLoading = true
                    http({ url: '/plan/delete', data: { id: params.row.id, url: params.row.url } })
                      .then(res => {
                        if (res.code === 200) {
                          this.$Message.success('删除资源成功')
                          this.updateData()
                        } else {
                          this.$Message.warning('删除失败')
                        }
                      })
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    search () {           // 点击搜索时更新数据
      this.searchParams.currentPage = 1
      this.updateData()
    },
    pageChange () {  // 页码修改时更新数据
      this.updateData()
    },
    ok () {
      this.adding = true
      http({ url: '/plan/add', method: 'POST', data: this.planAddData })
        .then(data => {
          this.adding = false
          this.addModal = false
          if (data.code === 200) {
            this.$Message.success('添加资源成功')
          } else {
            this.$Message.warning('添加失败')
          }
          this.updateData()
        })
    },
    cancel () {
      this.planAddData = {}
      this.addModal = false
    },
    updateData () {
      this.tableLoading = true
      http({ url: '/plan/list', method: 'POST', data: this.searchParams })
        .then(data => {
          this.tableLoading = false
          this.planList = data.data.content
          this.totalPage = data.data.totalPage
        })
    }
  },
  created () {
    this.updateData()
  },
  mounted () {
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
._search {
  display: flex;
  justify-content: flex-start;
}
._form {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: space-between;
}
</style>

