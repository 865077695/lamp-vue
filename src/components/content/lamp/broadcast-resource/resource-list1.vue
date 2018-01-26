<template>
  <div>
    <div class="_search">
      <my-form class="_form" :formItem="resourceSearchItem" :formData="searchParams"></my-form>
      <Button type="primary" @click="search" :disabled="tableLoading">查找</Button>
      <Button type="success" @click="clickAdd" style="margin-left: 20px;" :disabled="tableLoading">新增</Button>

      <Modal v-model="addModal" width="600">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>新增</span>
        </p>
        <div style="text-align:center">
          <my-form class="_form" :formItem="devResourceAddItem" :formData="resourceAddData" style="height: 100px;"></my-form>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="primary" size="large" :loading="adding" @click="ok">确认</Button>
          <Button size="large" @click="cancel">取消</Button>
        </div>
      </Modal>
    </div>
    <Table class="table" width="752" :loading="tableLoading" border :columns="columns" :data="resourceList"></Table>
  </div>
</template>

<script>
import bus from '@/eventBus'
import http from '@/common/http'
import MyForm from '@/template/form'
import Page from '@/template/page'
import { resourceSearchItem, devResourceAddItem } from '@/data/formItems'
export default {
  name: 'ResourceList1',
  props: {
    searchParams: Object,
    resourceList: Array,
    resourceAddData: Object,
    tableLoading: Boolean,
    columns: Array,
    adding: Boolean,
    addModal: Boolean
  },
  components: { Page, MyForm },
  data () {
    return {
      resourceSearchItem,
      devResourceAddItem
    }
  },
  methods: {
    clickAdd () {
      this.$emit('clickAdd')
    },
    search () {
      this.$emit('search')
    },
    ok () {
      this.$emit('ok')
    },
    cancel () {
      this.$emit('cancel')
    },
    getResourceList (typ) {    // 获取待添加资源列表作为options
      console.log(typ)
      http({ url: '/media/list', methods: 'POST', data: { typ: typ } })
        .then(data => {
          this.devResourceAddItem[1].options = data.data.resourceList
        })
    }
  },
  created () {
    console.log('信息')
    this.getResourceList(this.searchParams.typ)
    bus.$on('toggleTab', (typ) => {
      this.getResourceList(typ)
    })
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



getMediaList (params = {}) {     // 获取媒体列表数据
      let data = {
        typ: this.typ,
        currentPage: this.currentPage,
        name: this.queryMediaParams.name
      }
      http({ url: 'media/list', method: 'POST', data: { ...data, ...params } })
        .then(res => {
          if (res.code === 200) {
            console.log(res.data)
            this.mediaList = res.data.content
            this.totalPage = res.data.totalPage
          } else if (res.code === 400) {
            this.mediaList = null
          }
        })
    },
    addMedia () {         // 新增媒体资源
      let data = this.addMediaParams
      http({ url: 'media/add', method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('新增完成')
          }
        })
    },
    updateMedia () {      // 修改媒体资源
      let data = this.updateMediaParams
      http({ url: 'media/update', method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('修改完成')
          }
        })
    },
    deleteMedia (ids) {      // 删除媒体资源
      http({ url: 'media/delete', method: 'POST', data: { ids } })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('删除成功')
          }
        })
    },
    getTempList () {      // 获取临时媒体资源列表
      http({ url: 'media/templist', method: 'GET' })
        .then(res => {
          if (res.code === 200) {
            this.templist = res.data
          }
        })
    },
    getMediaInfo (ids) {     // 获取媒体资源详情信息
      http({ url: 'media/info', method: 'POST', data: { ids } })
        .then(res => {
          if (res.code === 200) {
            this.mediaInfo = res.data
          }
        })
    }
