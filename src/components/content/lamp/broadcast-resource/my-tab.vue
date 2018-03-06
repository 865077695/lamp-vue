<template>
  <div>
    <!-- 搜索 -->
    <Form ref="queryMediaParams" :model="queryMediaParams" :label-width="80" inline>
        <FormItem label="资源名称" prop="name">
            <Input v-model="queryMediaParams.name" placeholder="资源名称"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="query('queryMediaParams')">查询</Button>
            <Button type="primary" @click="add">添加</Button>
        </FormItem>
    </Form>

    <Modal v-model="modal" width="400">
      <p slot="header">
          <span>添加资源</span>
      </p>
      <div style="min-height: 100px;max-height: 500px;overflow: auto">
        <Form ref="addMediaParams" :model="addMediaParams" :rules="addRule" :label-width="80" inline>
            <FormItem label="资源名称" prop="name">
                <Input v-model="addMediaParams.name" placeholder="输入资源名称"></Input>
            </FormItem>
            <FormItem label="资源" prop="file_name" v-if="templist.length !== 0">
                <RadioGroup v-model="addMediaParams.file_name">
                    <Radio class="radio-item" v-for="item in templist" :key="item.fileName" :label="item.fileName"></Radio>
                </RadioGroup>
            </FormItem>
            <p style="padding-left: 80px;" v-if="templist.length === 0">请先通过FTP上传媒体资源</p>
        </Form>
      </div>
      <div slot="footer">
          <Button type="primary" size="large" :loading="adding" @click="ok('addMediaParams')">提交</Button>
          <Button type="default" size="large" @click="cancel">取消</Button>
      </div>
    </Modal>
    <Table class="table" :loading="tableLoading" border :columns="columns" :data="mediaList"></Table>
    <my-page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="queryMediaParams.currentPage"></my-page>
  </div>
</template>

<script>
import bus from '@/eventBus'
import http from '@/common/http'
import MyPage from '@/template/page'
export default {
  name: 'Tab',
  components: { MyPage },
  props: {
  },
  data () {
    return {
      tableLoading: false,
      modal: false,
      adding: false,
      typ: 1,
      currentPage: 1,
      totalPage: 1,
      queryMediaParams: { // 查询列表参数
        typ: null,
        name: null,
        currentPage: 1
      },
      addMediaParams: {   // 新增媒体资源参数
        name: null,
        typ: null,
        file_name: null
      },
      updateMediaParams: {    // 修改媒体资源参数
        id: null,
        name: null
      },
      mediaList: [],           // 媒体资源列表
      templist: [],            // 媒体资源临时文件列表
      mediaInfo: null,             // 媒体资源详细信息
      columns: [
        { title: '资源id', key: 'id' },
        { title: '文件名称', key: 'name' },
        // { title: '文件url', key: 'url' },
        { title: '创建人', key: 'user_name' },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要删除这条数据吗?',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.deleteMedia(params.row.id)
                  }
                }
              }, [h('Button', {
                style: {
                  margin: '0 10px'
                },
                props: {
                  type: 'error',
                  placement: 'top',
                  size: 'small'
                }
              }, '删除')])
            ])
          }
        }
      ],
      addRule: {
        name: [
          { required: true, message: '该项为必填项', trigger: 'blur' }
        ],
        file_name: [
          { required: true, message: '该项为必填项', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getMediaList()
    this.getTempList()
    bus.$on('toggleTab', (param) => {   // 监听面板切换事件
      this.typ = Number(param)
      this.getMediaList({ currentPage: 1 })
    })
  },
  methods: {
    query () {      // 查询
      this.getMediaList({ typ: this.typ, currentPage: 1 })
    },
    add () {
      this.modal = true
      this.addMediaParams = {}
      this.getTempList()
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addMedia()
        } else {
          this.$Message.error('参数格式错误！')
        }
      })
    },
    cancel () {
      this.modal = false
    },
    pageChange () {
      this.getMediaList()
    },
    getMediaList (params = { currentPage: 1 }) {     // 获取媒体列表数据
      this.tableLoading = true
      let data = {
        typ: this.typ,
        currentPage: this.queryMediaParams.currentPage,
        name: this.queryMediaParams.name
      }
      http({ url: 'media/list', method: 'POST', data: { ...params, ...data } })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.mediaList = res.data.content
            this.totalPage = res.data.totalPage
          } else if (res.code === 400) {
            this.mediaList = null
          }
        })
    },
    addMedia () {         // 新增媒体资源
      this.adding = true
      let data = { ...this.addMediaParams, typ: this.typ }
      http({ url: 'media/add', method: 'POST', data })
        .then(res => {
          this.adding = false
          if (res.code === 200) {
            this.modal = false
            this.$Message.success('新增完成')
            this.getMediaList()
          } else {
            this.$Message.error('失败，请重试')
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
            this.getMediaList({ currentPage: 1 })
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
  }
}
</script>

<style scoped>
.radio-item {
  display: block;
}
</style>

