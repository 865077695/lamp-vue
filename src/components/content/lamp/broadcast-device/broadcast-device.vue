// 播报设备列表 增删改查 可对单个设备选择播报计划
<template>
  <div>
    <div class="_search">
      <my-form class="_form" :formItem="devSearchItem" :formData="searchParams"></my-form>
      <Button type="primary" @click="search" :disabled="tableLoading">查找</Button>
      <Button type="success" @click="addModal = true" style="margin-left: 20px;" :disabled="tableLoading">新增</Button>
    </div>

    <Modal v-model="addModal" width="600">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>新增</span>
        </p>
        <div style="text-align:center">
          <my-form class="_form" :formItem="devAddItem" :formData="devAddData" style="height: 180px;"></my-form>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="primary" size="large" :loading="adding" @click="ok">确认</Button>
          <Button size="large" @click="devAddData={}">取消</Button>
        </div>
    </Modal>

    <Table class="table" :loading="tableLoading" border :columns="columns" :data="deviceList"></Table>
    <Page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="searchParams.currentPage"></Page>
  </div>
</template>

<script>
import MyForm from '@/template/form'
import Search from '@/template/search'
import Page from '@/template/page'
import { dev } from '@/data/options'
import { devSearchItem, devAddItem } from '@/data/formItems'
import { getStatusText } from '@/common/_func'
import http from '@/common/http'
export default {
  name: 'BroadcastDevice',
  components: { Search, Page, MyForm },
  data () {
    return {
      adding: false,        // 添加中
      addModal: false,      // 模态框显示状态
      tableLoading: false,  // 表格加载
      totalPage: 10,        // 默认总页数
      devSearchItem: devSearchItem,   // 查询设备参数内容，用来生成请求form
      searchParams: {                 // 存放请求参数
        currentPage: 1
      },
      devAddItem: devAddItem,         // 新增设备参数内容，用来生成form
      devAddData: {},                 // 存放新增设备的参数
      deviceList: [],       // 存放设备列表
      columns: [            // 行
        { title: '设备Id', key: 'id' },
        { title: '设备名称', key: 'name' },
        { title: '设备编号', key: 'sn' },
        { title: '灯杆Id', key: 'pole_id' },
        { title: '灯杆名称', key: 'pole_name' },
        { title: '灯杆编号', key: 'pole_sn' },
        {
          title: '设备类型',
          key: 'typ',
          render: (h, params) => {
            return h('div', getStatusText(params.row.typ, dev.typeOptions))
          }
        },
        { title: '当前版本', key: 'version' },
        {
          title: '网络类型',
          key: 'net_type',
          render: (h, params) => {
            return h('div', getStatusText(params.row.net_type, dev.netTypeOptions))
          }
        },
        { title: '音量大小', key: 'volume' },
        {
          title: '设备状态',
          key: 'status',
          render: (h, params) => {
            return h('div', getStatusText(params.row.status, dev.statusOptions))
          }
        }, {
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
                    this.$router.push({ path: '/device-info', query: { row: JSON.stringify(params.row) } })
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
                    http({ url: '/devices/delete', params: { id: params.row.id } })
                      .then(res => {
                        if (res.code === 200) {
                          this.$Message.success('删除设备成功')
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
      http({ url: '/devices/add', params: this.devAddData })
        .then(data => {
          this.adding = false
          this.addModal = false
          if (data.code === 200) {
            this.$Message.success('添加设备成功')
          } else {
            this.$Message.warning('添加失败')
          }
          this.updateData()
        })
    },
    updateData () {
      this.tableLoading = true
      http({ url: '/devices/list', params: this.searchParams })
        .then(data => {
          this.tableLoading = false
          this.deviceList = data.data.content
          this.totalPage = data.data.totalPage
        })
    }
  },
  created () {
    this.updateData()
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

