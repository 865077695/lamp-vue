// 播报设备列表 增删改查 可对单个设备选择播报计划
<template>
  <div>
     <Tabs type="card" @on-click="toggleTab">
        <TabPane label="音频" name="audio" icon="music-note">
          <resource-list
           :mediaList="mediaList" 
           :resourceSearchItem="resourceSearchItem"
           :searchParams="searchParams"
           :totalPage="totalPage"
           :resourceAddData="resourceAddData"
           :devResourceAddItem="devResourceAddItem"
           @search="search"
           @pageChange="pageChange"
           @add="add"
           @ok="ok"
           ></resource-list>
        </TabPane>
        <!-- <TabPane label="视频" name="video" icon="videocamera">
        </TabPane> -->
    </Tabs>
  </div>
</template>

<script>
import bus from '@/eventBus'
import ResourceList from './resource-list'
import http from '@/common/http'
import { resourceSearchItem, devResourceAddItem } from '@/data/formItems'
export default {
  name: 'BroadcastResource',
  components: { ResourceList },
  data () {
    return {
      mediaList: [],      // 用来储存表格数据（媒体资源列表）
      totalPage: 10,      // 总页数
      resourceSearchItem, // 搜索表单项
      devResourceAddItem, // 添加表单项
      searchParams: {     // 搜索参数初始化，类型为1（音频），储存搜索表单数据
        currentPage: 1,
        typ: 1
      },
      tab: 'audio',         // 当前面板状态
      resourceAddData: {    // 储存添加资源表单数据
        typ: 1,
        url: ''
      }
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
      bus.$emit('toggleTab', this.searchParams.typ)
    },
    search () {
      this.searchParams.currentPage = 1
      this.updateData()
    },
    pageChange () {
      this.updateData()
    },
    add () {
      console.log('add')
      http({ url: '/media/templist' })
        .then(res => {
          this.devResourceAddItem[1].options = [{ fileName: 'a' }, { fileName: 'b' }]
          bus.$emit('getOptions', this.devResourceAddItem[1].options)
        })
    },
    clickAdd () {
      this.addModal = true
    },
    ok () {
      bus.$emit('addBegin')
      http({ url: '/media/add', method: 'POST', data: this.resourceAddData })
        .then(data => {
          bus.$emit('addEnd')
          if (data.code === 200) {
            this.$Message.success('新增成功')
            this.resourceAddData = {}
          }
        })
    },
    cancel () {
      this.resourceAddData = {}
      this.$Message.info('取消新增')
    },
    doEdit () {
      console.log(222)
    },
    updateData () {
      bus.$emit('updateBegin')
      console.log(this.searchParams)
      http({ url: '/media/list', method: 'POST', data: this.searchParams })
        .then(data => {
          bus.$emit('updateEnd')
          this.mediaList = data.data.content
          this.totalPage = data.data.totalPage
        })
    }
  },
  created () {
    this.updateData()
    bus.$on('edit', () => {
      // console.log()
    })
    console.log(this.devResourceAddItem)
  }
}
</script>
