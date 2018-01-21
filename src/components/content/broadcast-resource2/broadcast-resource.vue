// 播报设备列表 增删改查 可对单个设备选择播报计划
<template>
  <div>
     <Tabs type="card" @on-click="toggleTab">
        <TabPane label="音频" name="audio" icon="music-note">
          <resource-list
           :resourceList="resourceList" 
           :searchParams="searchParams" 
           @search="search" 
           @ok="ok"
           @cancel="cancel"
           @clickAdd="clickAdd"
           :tab="tab"
           :resourceAddData="resourceAddData"
           :tableLoading="tableLoading"
           :adding="adding"
           :addModal="addModal"
           :columns="columns"
           ></resource-list>
        </TabPane>
        <TabPane label="视频" name="video" icon="videocamera">
          <resource-list
           :resourceList="resourceList" 
           :searchParams="searchParams" 
           @search="search" 
           @ok="ok"
           @cancel="cancel"
           @clickAdd="clickAdd"
           :tab="tab"
           :resourceAddData="resourceAddData"
           :tableLoading="tableLoading"
           :adding="adding"
           :addModal="addModal"
           :columns="columns"
           ></resource-list>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ResourceList from './resource-list'
import http from '@/common/http'
export default {
  name: 'BroadcastResource',
  components: { ResourceList },
  data () {
    return {
      tableLoading: false,
      addModal: false,
      adding: false,
      resourceList: [],
      searchParams: {
        currentPage: 1,
        typ: 1
      },
      tab: 'audio',
      resourceAddData: {},
      columns: [
        { title: '资源id', key: 'id', width: 100 },
        { title: '资源名称', key: 'name', width: 200 },
        { title: '资源地址', key: 'url', width: 300 },
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
                    this.addModal = true
                    this.resourceAddData = params.row
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.tableLoading = true
                    http({ url: '/media/delete', params: { id: params.row.id, url: params.row.url } })
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
    toggleTab (name) {
      this.tab = name
      this.searchParams = {   // 切换tab时，初始化搜索条件
        currentPage: 1,
        typ: (function () {
          if (name === 'audio') {   // 音频
            return 1
          } else {                  // 视频
            return 2
          }
        })()
      }
      this.updateData()
    },
    search () {
      console.log(this.searchParams)
      this.updateData()
    },
    clickAdd () {
      this.addModal = true
    },
    ok () {
      this.adding = true
      http({ url: '/media/add', params: this.resourceAddData })
        .then(data => {
          if (data.code === 200) {
            this.adding = false
            this.addModal = false
            this.$Message.success('新增成功')
            this.resourceAddData = {}
          }
        })
    },
    cancel () {
      this.addModal = false
      this.resourceAddData = {}
      this.$Message.info('取消新增')
    },
    doEdit () {
      console.log(222)
    },
    updateData () {
      this.tableLoading = true
      http({ url: '/media/list', params: this.searchParams })
        .then(data => {
          this.tableLoading = false
          this.resourceList = data.data.content
          this.totalPage = data.data.totalPage
        })
    }
  },
  created () {
    console.log(this.columns)
    this.updateData()
  }
}
</script>
