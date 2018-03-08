// 灯杆分组
<template>
  <div>
    <p style="line-height: 38px;font-size: 16px;">街道：{{$route.query.name}}</p>
    <!-- 搜索 -->
    <div class="search">
      <Button @click="add" type="success" style="height: 32px; margin-left: 10px">添加分组</Button>
    </div>
    
      <Modal v-model="addModal" width="720">
        <p slot="header">
            <span>{{addText}}</span>
        </p>
        <div style="min-height: 300px;overflow: auto;">
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
      addText: '添加分组',
      lampGroupSearchParams: {
        currentPage: 1,
        streetId: this.$route.query.id   // 灯杆id
      },
      addLampGroupData: {
        streetId: this.$route.query.id,
        poles: [],
        notes: '',
        timeOn: null,
        timeOff: null,
        name: null
      },
      lightGroupList: [],
      columns: [
        { title: '分组名称', key: 'name' },
        { title: '开灯时间', key: 'timeOn' },
        { title: '关灯时间', key: 'timeOff' },
        { title: '备注', key: 'notes' },
        { title: '修改人', key: 'modifyName' },
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
                    this.addText = '编辑分组'
                    http({ url: 'poleGroup/poleGroupsInfo', params: { id: params.row.id } })
                      .then(res => {
                        if (res.code === 200) {
                          this.addLampGroupData = res.data.lightGroups
                          this.addLampGroupData.poles = this.addLampGroupData.poles.map(item => {
                            return item.id
                          })
                          this.addModal = true
                        }
                      })
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
                    this.delete(params.row.id)
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
    this.getlampGroupsList()
  },
  created () {
    this.getlampGroupsList()
    http({      // 获取该街道所有灯杆
      url: '/pole/polesList',
      method: 'POST',
      data: {
        currentPage: 1,
        pageSize: 111111,
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
        }
      })
  },
  methods: {
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    searchOk () { // 搜索数据格式验证通过
      this.lampGroupSearchParams.currentPage = 1 // 搜索时重置页码为1
      this.getlampGroupsList()
    },
    addOk () {  // 添加数据格式验证通过
      this.adding = true
      this.addText = '添加分组'
      let url = ''
      let data = {}
      if (this.addText === '添加分组') {
        url = 'poleGroup/poleGroupsAdd'
        this.addLampGroupData.poles = this.addLampGroupData.poles.map(item => {
          return { id: item }
        })
        data = this.addLampGroupData
      } else if (this.addText === '编辑分组') {
        url = 'poleGroup/poleGroupsEdit'
        data.name = this.addLampGroupData.name
        data.id = this.addLampGroupData.id
        data.timeOn = this.addLampGroupData.timeOn
        data.timeOff = this.addLampGroupData.timeOff
        data.notes = this.addLampGroupData.notes
        data.streetId = this.addLampGroupData.streetId
        data.poles = this.addLampGroupData.poles.map(item => {
          return { id: item }
        })
      }
      http({ url, method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.adding = false
            this.addModal = false
            this.$Message.success('成功')
            this.addLampGroupData = {
              streetId: this.$route.query.id   // 灯杆id
            }
            this.getlampGroupsList()
          }
        })
    },
    add () {  // 点击添加按钮
      this.addModal = true
      this.addLampGroupData = {
        streetId: this.$route.query.id,
        poles: [],
        notes: '',
        timeOn: null,
        timeOff: null,
        name: null
      }
    },
    cancel () { // 取消添加
      this.addLampGroupData = {
        streetId: this.$route.query.id   // 灯杆id
      }
      this.addModal = false
    },
    pageChange () {
      this.getlampGroupsList()
    },
    getlampGroupsList () { // 获取分组设置列表
      this.tableLoading = true
      http({ url: 'poleGroup/poleGroupsList', method: 'POST', data: this.lampGroupSearchParams })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.lightGroupList = res.data.lightGroupList
            this.totalPage = res.data.totalPage
          }
        })
    },
    getlampGroupInfo () {   // 获取某个分组详情
      // http({ url: 'poleGroup/poleGroupsInfo' ,params: })
    },
    delete (id) {   // TODO
      http({ url: 'poleGroup/delete', method: 'POST', data: { id } })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('删除成功')
            this.getlampGroupsList()
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
