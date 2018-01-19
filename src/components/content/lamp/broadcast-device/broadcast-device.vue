// 播报设备列表 增删改查 可对单个设备选择播报计划
<template>
  <div>
    <Search :searchContent="searchContent" @search="search" @add="add"></Search>
    <Table class="table" :loading="tableLoading" border :columns="columns" :data="deviceList"></Table>
    <Page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="searchParams.currentPage"></Page>
  </div>
</template>

<script>
import Search from '@/template/search'
import Page from '@/template/page'
import { dev } from '@/data/options'
import { getStatusText } from '@/common/_func'
import http from '@/common/http'
export default {
  name: 'BroadcastDevice',
  components: { Search, Page },
  data () {
    return {
      tableLoading: false,  // 表格加载
      totalPage: 10,        // 默认总页数
      searchParams: {       // 请求参数
        currentPage: 1
      },
      searchContent: [      // 请求参数内容（用来生成input）
        { label: '灯杆Id', key: 'pole_id', width: '100px', placeholder: '灯杆Id' },
        { label: '设备Id', key: 'id', width: '100px', placeholder: '设备Id' },
        { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: dev.typeOptions },
        { label: '设备名称', key: 'name', width: '100px', placeholder: '设备名称' }
      ],
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
                    this.show(params.index)
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
                    this.remove(params.index)
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
    search (params) {           // 点击搜索时更新数据
      this.searchParams = params
      this.searchParams.currentPage = 1
      this.updateData()
    },
    pageChange () {  // 页码修改时更新数据
      this.updateData()
    },
    add () {
      console.log('add')
    },
    updateData () {
      this.tableLoading = true
      http({ url: '/devices/list', params: this.searchParams })
        .then(data => {
          this.tableLoading = false
          this.deviceList = data.content
          this.totalPage = data.totalPage
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
</style>

