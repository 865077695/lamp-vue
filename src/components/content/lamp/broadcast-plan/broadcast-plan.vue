// 计划列表
<template>
  <div>
    街道：{{$route.query.id}}
    <!-- 搜索 -->
    <div class="search">
      <my-form
      class="searchForm"
        ref="searchForm"
        :formItems="planListSearchItem"
        :formData="planSearchParams" 
        @validaok="searchOk"
        ></my-form>
      <Button @click="doValida('searchForm')" type="primary" style="height: 32px;">搜索</Button>
      <Button @click="add" type="success" style="height: 32px; margin-left: 10px">添加</Button>
    </div>
    
      <Modal v-model="addModal" width="360">
        <p slot="header">
            <span>{{addText}}</span>
        </p>
        <div style="height: 400px;">
          <my-form 
            ref="addForm"
            :formItems="addPlanItem"
            :formData="addPlanData"
            :formRule="addPlanFormRule"
            @validaok="addOk"
          ></my-form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" :loading="adding" @click="doValida('addForm')">提交</Button>
            <Button type="default" size="large" @click="cancel">取消</Button>
        </div>
      </Modal>

      <Table class="table" :loading="tableLoading" border :columns="columns" :data="planList"></Table>
      <my-page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="planSearchParams.currentPage"></my-page>
  </div>
</template>

<script>
import MyForm from '@/template/my-form'
import MyPage from '@/template/page'
import { broadcastPlan } from '@/data/options'
import { getStatusText } from '@/common/_func'
import { planListSearchItem, addPlanItem, addPlanFormRule } from '@/data/formItems'
import http from '@/common/http'
export default {
  name: 'StreetAdmin',
  components: { MyForm, MyPage },
  data () {
    return {
      tableLoading: false,
      addModal: false,
      adding: false,
      planListSearchItem,
      addPlanItem,
      addPlanFormRule,
      totalPage: null,
      addText: '新增',
      planSearchParams: {
        name: null,
        currentPage: 1,
        startDate: null,
        endDate: null,
        playBegin: null,
        playEnd: null,
        typ: null,
        iscycle: null,
        status: null
      },
      addPlanData: {
        name: null,
        startDate: null,
        endDate: null,
        playBegin: null,
        playEnd: null,
        typ: null,
        iscycle: null,
        status: null
      },
      planList: [],
      columns: [
        { title: '计划id', key: 'id' },
        { title: '计划名称', key: 'name' },
        { title: '开始日期', key: 'startDate' },
        { title: '结束日期', key: 'endDate' },
        { title: '开始时间', key: 'playBegin' },
        { title: '结束时间', key: 'playEnd' },
        { title: '描述', key: 'notes' },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            let text = getStatusText(params.row.status, broadcastPlan.status)
            return text
          }
        },
        {
          title: '循环',
          key: 'iscycle',
          render: (h, params) => {
            let text = getStatusText(params.row.iscycle, broadcastPlan.iscycle)
            return text
          }
        },
        {
          title: '播报类型',
          key: 'typ',
          render: (h, params) => {
            let text = getStatusText(params.row.typ, broadcastPlan.resourceType)
            return text
          }
        },
        { title: '修改人', key: 'modifyId' },
        { title: '修改时间', key: 'modifyTime' },
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
                    this.$router.push({ path: '/plan-info', query: { id: params.row.id } })   // 传递计划id
                  }
                }
              }, '编辑'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要删除这条数据吗?',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.deletePlan(params.row.id)
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
      ]
    }
  },
  created () {
    this.getplanList()
  },
  methods: {
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    searchOk () { // 搜索数据格式验证通过
      this.planSearchParams.currentPage = 1 // 搜索时重置页码为1
      this.getplanList()
    },
    addOk () {  // 添加数据格式验证通过
      this.adding = true
      let url = ''
      let data = {}
      if (this.addText === '新增') {
        url = 'plan/add'
        data = this.addPlanData
      } else if (this.addText === '修改') {
        url = 'pole/update'
        data.streetId = this.addPlanData.streetId
        data.id = this.addPlanData.id
        data.poleSn = this.addPlanData.poleSn
        data.name = this.addPlanData.name
        data.latitude = this.addPlanData.latitude
        data.status = this.addPlanData.status
        data.longitude = this.addPlanData.longitude
      }
      http({ url, method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.adding = false
            this.addModal = false
            this.$Message.success('成功')
            this.addPlanData = {    // 初始化添加选项数据
              name: null,
              startDate: null,
              endDate: null,
              playBegin: null,
              playEnd: null,
              typ: null,
              iscycle: null,
              status: null
            }
            this.getplanList()
          }
        })
    },
    add () {  // 点击添加按钮
      // this.addModal = true
      this.$router.push({ path: '/plan-info', query: { id: null } })
    },
    cancel () { // 取消添加
      this.addPlanData = {  // 初始化添加选项数据
        name: null,
        startDate: null,
        endDate: null,
        playBegin: null,
        playEnd: null,
        typ: null,
        iscycle: null,
        status: null
      }
      this.addModal = false
    },
    pageChange () {
      this.getplanList()
    },
    getplanList () { // 获取街道列表
      this.tableLoading = true
      http({ url: '/plan/list', method: 'POST', data: this.planSearchParams })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.planList = res.data.content
            this.totalPage = res.data.totalPage
          } else {
            this.$router.push({ path: '/plan-info/, query: {id: nullsign' })
          }
        })
    },
    deletePlan (id) {
      http({ url: 'plan/delete', method: 'POST', data: { id } })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('删除成功')
            this.getplanList()
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
