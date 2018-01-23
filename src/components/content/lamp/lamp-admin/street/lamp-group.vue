// 灯杆分组
<template>
  <div>
    街道：{{$route.query.id}}
    <!-- 搜索 -->
    <div class="search">
      <my-form
      class="searchForm"
        ref="searchForm"
        :formItems="lampGroupSearchItem"
        :formData="lampGroupSearchParams" 
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
            :formItems="addLampGroupItem"
            :formData="addLampGroupData"
            :formRule="addLampGroupFormRule"
            @validaok="addOk"
          ></my-form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" :loading="adding" @click="doValida('addForm')">提交</Button>
            <Button type="default" size="large" @click="cancel">取消</Button>
        </div>
      </Modal>

      <Table class="table" :loading="tableLoading" border :columns="columns" :data="lightGroupList"></Table>
      <my-page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="lampGroupSearchParams.currentPage"></my-page>
  </div>
</template>

<script>
import MyForm from '@/template/my-form'
import MyPage from '@/template/page'
import { lampStatus } from '@/data/options'
import { getStatusText } from '@/common/_func'
import { lampGroupSearchItem, addLampGroupItem, addLampGroupFormRule } from '@/data/formItems'
import http from '@/common/http'
import bus from '@/eventBus'
export default {
  name: 'LampGroup',
  components: { MyForm, MyPage },
  data () {
    return {
      tableLoading: false,
      addModal: false,
      adding: false,
      lampGroupSearchItem,
      addLampGroupItem,
      addLampGroupFormRule,
      totalPage: null,
      addText: '新增',
      lampGroupSearchParams: {
        currentPage: 1,
        streetId: this.$route.query.id   // 灯杆id
      },
      addLampGroupData: {
        streetId: this.$route.query.id,
        poles: [],
        notes: null,
        timeOn: null,
        timeOff: null,
        name: null
      },
      lightGroupList: [],
      columns: [
        { title: '灯杆Id', key: 'id' },
        { title: '灯杆编号', key: 'poleSn' },
        { title: '灯杆名称', key: 'name' },
        { title: '经度', key: 'longitude' },
        { title: '纬度', key: 'latitude' },
        {
          title: '灯杆状态',
          key: 'status',
          render: (h, params) => {
            let text = getStatusText(params.row.status, lampStatus)
            return text
          }
        },
        { title: '修改人', key: 'modifyId' },
        { title: '修改时间', key: 'modifyTime' },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.addText = '修改'
                    console.log(params.row)
                    this.addLampGroupData = params.row
                    this.add()
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
                    console.log(params.row)
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
    this.getlampsList()
    http({
      url: '/pole/polesList',
      method: 'POST',
      data: {
        currentPage: 1,
        streetId: this.$route.query.id   // 灯杆id
      }
    })
      .then(res => {
        if (res.code === 200) {
          let options = []
          res.data.polesList.map(item => {
            options.push({ label: item.name, value: item.id })
          })
          this.addLampGroupItem[3].options = options
          bus.$emit('setPolesListOptions1', this.addLampGroupItem[3].options)
          console.log(this.addLampGroupItem)
        } else {
          this.$router.push({ path: '/sign' })
        }
      })
  },
  methods: {
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    searchOk () { // 搜索数据格式验证通过
      this.lampGroupSearchParams.currentPage = 1 // 搜索时重置页码为1
      this.getlampsList()
    },
    addOk () {  // 添加数据格式验证通过
      console.log(this.addLampGroupData)
      this.adding = true
      let url = ''
      let data = {}
      if (this.addText === '新增') {
        url = 'poleGroup/poleGroupsAdd'
        data = this.addLampGroupData
      } else if (this.addText === '修改') {
        url = 'poleGroup/poleGroupsEdit'
        data.name = this.addLampGroupData.name
        data.id = this.addLampGroupData.id
        data.timeOn = this.addLampGroupData.timeOn
        data.timeOff = this.addLampGroupData.timeOff
        data.notes = this.addLampGroupData.notes
        data.streetId = this.addLampGroupData.streetId
        data.poles = this.addLampGroupData.poles
      }
      http({ url, method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.adding = false
            this.addModal = false
            this.$Message.success('添加成功')
            this.addLampGroupData = {
              currentPage: 1,
              streetId: this.$route.query.id   // 灯杆id
            }
            this.getlampsList()
          }
        })
    },
    add () {  // 点击添加按钮
      this.addModal = true
    },
    cancel () { // 取消添加
      this.addLampGroupData = {
        currentPage: 1,
        streetId: this.$route.query.id   // 灯杆id
      }
      this.addModal = false
    },
    pageChange () {
      this.getlampsList()
    },
    getlampsList () { // 获取分组设置列表
      this.tableLoading = true
      http({ url: 'poleGroup/poleGroupsList', method: 'POST', data: this.lampGroupSearchParams })
        .then(res => {
          this.tableLoading = false
          console.log(res)
          if (res.code === 200) {
            this.lightGroupList = res.data.polesList
            this.totalPage = res.data.totalPage
          } else {
            this.$router.push({ path: '/sign' })
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
