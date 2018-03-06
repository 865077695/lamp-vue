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
    
      <Table class="table" :loading="tableLoading" border :columns="columns" :data="planList"></Table>
      <my-page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="planSearchParams.currentPage"></my-page>
  </div>
</template>

<script>
// eslint-disable-next-line
import { formmatDate } from '@/common/_func'
import MyForm from '@/template/my-form'
import MyPage from '@/template/page'
import { broadcastPlan } from '@/data/options'
// eslint-disable-next-line
import { getStatusText } from '@/common/_func'
import { planListSearchItem, addPlanItem, addPlanFormRule } from '@/data/formItems'
import http from '@/common/http'
export default {
  name: 'BroadcastPlan',
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
        { title: '计划id', key: 'id', width: 80 },
        { title: '计划名称', key: 'name', width: 150 },
        { title: '开始日期', key: 'startDate', width: 190 },
        { title: '结束日期', key: 'endDate', width: 190 },
        { title: '开始时间', key: 'playBegin', width: 120 },
        { title: '结束时间', key: 'playEnd', width: 120 },
        {
          title: '状态',
          key: 'status',
          width: 70,
          render: (h, params) => {
            let text = getStatusText(params.row.status, broadcastPlan.status)
            return text
          }
        },
        {
          title: '循环',
          key: 'iscycle',
          width: 70,
          render: (h, params) => {
            let text = getStatusText(params.row.iscycle, broadcastPlan.iscycle)
            return text
          }
        },
        {
          title: '播报类型',
          key: 'typ',
          width: 90,
          render: (h, params) => {
            let text = getStatusText(params.row.typ, broadcastPlan.resourceType)
            return text
          }
        },
        { title: '修改时间', key: 'modifyTime', width: 170 },
        { title: '描述', key: 'notes', width: 200 },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 140,
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
  activated () {
    this.getplanList()
  },
  created () {
    this.getplanList()
  },
  methods: {
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    searchOk () { // 搜索数据格式验证通过
      if (this.planSearchParams.startDate) {
        this.planSearchParams.startDate = formmatDate(this.planSearchParams.startDate)
      }
      if (this.planSearchParams.endDate) {
        this.planSearchParams.endDate = formmatDate(this.planSearchParams.endDate)
      }
      this.planSearchParams.currentPage = 1 // 搜索时重置页码为1
      this.getplanList()
    },
    add () {  // 点击添加按钮
      this.$router.push({ path: '/add-plan', query: { id: null } })
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
