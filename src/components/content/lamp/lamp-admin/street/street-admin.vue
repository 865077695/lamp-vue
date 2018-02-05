// 路灯管理、一级入口。内容为街道列表。可通过此页面进行街道编辑、查看、删除、新增
// 可通过此页面跳转到对应街道的灯杆管理和照明管理（包括分组设置）
<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <my-form
      class="searchForm"
        ref="searchForm"
        :formItems="streetListSearchItem"
        :formData="streetSearchParams" 
        @validaok="searchOk"
        ></my-form>
      <Button @click="doValida('searchForm')" type="primary" style="height: 32px;">搜索</Button>
      <Button @click="add" type="success" style="height: 32px; margin-left: 10px">添加</Button>
    </div>
    
      <Modal v-model="addModal" width="360">
        <p slot="header">
            <span>新增</span>
        </p>
        <div style="height: 400px;">
          <my-form 
            ref="addForm"
            :formItems="addStreetItem"
            :formData="addStreetData"
            :formRule="addStreetFormRule"
            @validaok="addOk"
          ></my-form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" :loading="adding" @click="doValida('addForm')">提交</Button>
            <Button type="default" size="large" @click="cancel">取消</Button>
        </div>
      </Modal>
      <Table class="table" :loading="tableLoading" border :columns="columns" :data="streetsList"></Table>
      <my-page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="streetSearchParams.currentPage"></my-page>
  </div>
</template>

<script>
import MyForm from '@/template/my-form'
import MyPage from '@/template/page'
import { streetListSearchItem, addStreetItem, addStreetFormRule } from '@/data/formItems'
import http from '@/common/http'
export default {
  name: 'StreetAdmin',
  components: { MyForm, MyPage },
  data () {
    return {
      tableLoading: false,
      addModal: false,
      adding: false,
      streetListSearchItem,
      addStreetItem,
      addStreetFormRule,
      totalPage: null,
      streetSearchParams: {
        name: null,
        currentPage: 1
      },
      addStreetData: {
        typ: 1
      },
      streetsList: [],
      columns: [
        { title: '街道名称', key: 'name' },
        { title: '心跳间隔', key: 'heartbeat' },
        { title: '上报时间', key: 'reporttime' },
        { title: '经度', key: 'longitude' },
        { title: '纬度', key: 'latitude' },
        { title: '定损功率', key: 'power' },
        {
          title: '操作',
          key: 'action',
          width: 260,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/street-edit', query: { ...params.row } })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '20px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/lamp-admin', query: { id: params.row.id } })
                  }
                }
              }, '灯杆管理'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '20px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/lamp-group', query: { ...params.row } })
                  }
                }
              }, '分组设置')
            ])
          }
        }
      ]
    }
  },
  created () {
    this.getStreetsList()
  },
  methods: {
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    searchOk () { // 搜索数据格式验证通过
      this.streetSearchParams.currentPage = 1 // 搜索时重置页码为1
      this.getStreetsList()
    },
    addOk () {  // 添加数据格式验证通过
      this.adding = true
      http({ url: 'street/streetsAdd', method: 'POST', data: this.addStreetData })
        .then(res => {
          if (res.code === 200) {
            this.adding = false
            this.addModal = false
            this.$Message.success('成功')
            this.addStreetData = {
              typ: 1
            }
            this.getStreetsList()
          }
        })
    },
    add () {  // 点击添加按钮
      this.addModal = true
    },
    cancel () { // 取消添加
      this.addStreetData = { typ: 1 }
      this.addModal = false
    },
    pageChange () {
      this.getStreetsList()
    },
    getStreetsList () { // 获取街道列表
      this.tableLoading = true
      http({ url: 'street/streetsList', method: 'POST', data: this.streetSearchParams })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.streetsList = res.data.streetsList
            this.totalPage = res.data.totalPage
          }
        })
    }
  }
}
</script>


<style scoped>
.table {
  margin-top: 20px;
}
.search {
  display: flex;
  justify-content: flex-start;
}
</style>
