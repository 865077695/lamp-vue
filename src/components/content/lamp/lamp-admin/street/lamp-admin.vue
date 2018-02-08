// 灯杆列表
<template>
  <div>
    <p style="line-height: 38px;font-size: 16px;">{{$route.query.name}}</p>
    <!-- 搜索 -->
    <div class="search">
      <my-form
      class="searchForm"
        ref="searchForm"
        :formItems="lampListSearchItem"
        :formData="lampSearchParams" 
        @validaok="searchOk"
        ></my-form>
      <Button @click="doValida('searchForm')" type="primary" style="height: 32px;">搜索</Button>
      <Button @click="add" type="success" style="height: 32px; margin-left: 10px">添加</Button>
    </div>
    
      <Modal v-model="addModal" width="360">
        <p slot="header">
            <span>{{addText}}</span>
        </p>
        <div style="height: 200px;">
          <my-form 
            ref="addForm"
            :formItems="addLampItem"
            :formData="addLampData"
            :formRule="addLampFormRule"
            @validaok="addOk"
          ></my-form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" :loading="adding" @click="doValida('addForm')">提交</Button>
            <Button type="default" size="large" @click="cancel">取消</Button>
        </div>
      </Modal>

      <Table class="table" :loading="tableLoading" border :columns="columns" :data="lampsList"></Table>
      <my-page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="lampSearchParams.currentPage"></my-page>
  </div>
</template>

<script>
import MyForm from '@/template/my-form'
import MyPage from '@/template/page'
import { polesOptions } from '@/data/options'
import { getStatusText } from '@/common/_func'
import { lampListSearchItem, addLampItem, addLampFormRule } from '@/data/formItems'
import http from '@/common/http'
export default {
  name: 'StreetAdmin',
  components: { MyForm, MyPage },
  data () {
    return {
      tableLoading: false,
      addModal: false,
      adding: false,
      lampListSearchItem,
      addLampItem,
      addLampFormRule,
      totalPage: null,
      addText: '新增',
      lampSearchParams: {
        name: null,
        currentPage: 1,
        streetId: this.$route.query.id,   // 灯杆id
        status: null,
        poleSn: null
      },
      addLampData: {
        streetId: this.$route.query.id,
        poleSn: null,
        name: null,
        latitude: null,
        status: 1,
        longitude: null
      },
      lampsList: [],
      columns: [
        { title: '灯杆编号', key: 'poleSn' },
        { title: '灯杆名称', key: 'name' },
        { title: '经度', key: 'longitude', width: 100 },
        { title: '纬度', key: 'latitude', width: 100 },
        {
          title: '灯杆状态',
          key: 'status',
          render: (h, params) => {
            let text = getStatusText(params.row.status, polesOptions)
            return text
          }
        },
        { title: '修改人', key: 'modifyName' },
        { title: '修改时间', key: 'modifyTime', width: 160 },
        {
          title: '操作',
          key: 'action',
          width: 230,
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
                    this.addLampData = params.row
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
                    this.$router.push({ path: '/device-admin', query: { ...params.row, streetName: this.$route.query.name } })
                  }
                }
              }, '设备管理'),
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
  created () {
    this.getlampsList()
  },
  methods: {
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    searchOk () { // 搜索数据格式验证通过
      this.lampSearchParams.currentPage = 1 // 搜索时重置页码为1
      this.getlampsList()
    },
    addOk () {  // 添加数据格式验证通过
      this.adding = true
      let url = ''
      let data = {}
      if (this.addText === '新增') {
        url = 'pole/polesAdd'
        data = this.addLampData
      } else if (this.addText === '修改') {
        url = 'pole/polesEdit'
        data.streetId = this.addLampData.streetId
        data.id = this.addLampData.id
        data.poleSn = this.addLampData.poleSn
        data.name = this.addLampData.name
        data.latitude = this.addLampData.latitude
        data.status = this.addLampData.status
        data.longitude = this.addLampData.longitude
      }
      http({ url, method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.adding = false
            this.addModal = false
            this.$Message.success('成功')
            this.addLampData = {  // 初始化添加项
              streetId: this.$route.query.id,
              poleSn: null,
              name: null,
              latitude: null,
              status: null,
              longitude: null
            }
            this.getlampsList()
          }
        })
    },
    add () {  // 点击添加按钮
      this.addModal = true
    },
    cancel () { // 取消添加
      this.addLampData = {  // 初始化添加项
        streetId: this.$route.query.id,
        poleSn: null,
        name: null,
        latitude: null,
        status: null,
        longitude: null
      }
      this.addModal = false
    },
    pageChange () {
      this.getlampsList()
    },
    getlampsList () { // 获取街道列表
      this.tableLoading = true
      http({ url: '/pole/polesList', method: 'POST', data: this.lampSearchParams })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.lampsList = res.data.polesList
            this.totalPage = res.data.totalPage
          }
        })
    },
    delete (id) {   // TODO
      http({ url: 'pole/delete', method: 'POST', data: { id } })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('删除成功')
            this.getlampsList()
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
