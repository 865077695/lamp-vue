// 设备管理
<template>
  <div>
    灯杆：{{$route.query.streetId}}(街道)-{{$route.query.id}}(灯杆)
    <!-- 搜索 -->
    <div class="search">
      <!-- <my-form
      class="searchForm"
        ref="searchForm"
        :formItems="devSearchItem"
        :formData="devSearchParams" 
        @validaok="searchOk"
        ></my-form>
      <Button @click="doValida('searchForm')" type="primary" style="height: 32px;">搜索</Button> -->
      <Button @click="add" type="success" style="height: 32px; margin-left: 10px">添加</Button>
    </div>
    
      <Modal v-model="addModal" width="360">
        <p slot="header">
            <span>{{addText}}</span>
        </p>
        <div style="height: 400px;">
          <my-form 
            ref="addForm"
            :formItems="addDevItem"
            :formData="addDevData"
            :formRule="addDevFormRule"
            @validaok="addOk"
          ></my-form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" :loading="adding" @click="doValida('addForm')">提交</Button>
            <Button type="default" size="large" @click="cancel">取消</Button>
        </div>
      </Modal>

      <Table class="table" :loading="tableLoading" border :columns="columns" :data="devList"></Table>
  </div>
</template>

<script>
import MyForm from '@/template/my-form'
import { devSearchItem, addDevItem, addDevFormRule } from '@/data/formItems'
import { getStatusText } from '@/common/_func'
import { dev } from '@/data/options'
import http from '@/common/http'
export default {
  name: 'LampGroup',
  components: { MyForm },
  data () {
    return {
      tableLoading: false,
      addModal: false,
      adding: false,
      devSearchItem,
      addDevItem,
      addDevFormRule,
      addText: '新增',
      devSearchParams: {
        pole_id: this.$route.query.id,   // 灯杆id
        typ: null,
        name: null,
        status: null
      },
      addDevData: {
        pole_id: this.$route.query.id,
        typ: null,
        name: null,
        status: null,
        sn: null,
        volume: null,
        version: null,
        url: null
      },
      devList: [],
      columns: [
        { title: '设备id', key: 'id' },
        { title: '设备名称', key: 'name' },
        {
          title: '设备类型',
          key: 'typ',
          render: (h, params) => {
            let text = getStatusText(params.row.typ, dev.typeOptions)
            return text
          }
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            let text = getStatusText(params.row.status, dev.statusOptions)
            return text
          }
        },
        { title: '设备编号', key: 'sn' },
        { title: '音量大小', key: 'volume' },
        { title: '设备版本', key: 'version' },
        { title: '视频流', key: 'url' },
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
                    console.log(params.row)
                    this.addText = '修改'
                    this.addDevData = params.row
                    this.add()
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
                    http({ url: 'devices/delete', method: 'POST', data: { ids: params.row.id } })
                      .then(res => {
                        if (res.code === 200) {
                          this.getdevList()
                        }
                      })
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
    this.getdevList()
    console.log(this.devList)
  },
  methods: {
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    addOk () {  // 添加数据格式验证通过
      this.adding = true
      let url = ''
      let data = {}
      if (this.addText === '新增') {
        url = 'devices/add'
        console.log(this.addDevData)
        data = this.addDevData
      } else if (this.addText === '修改') {
        url = 'devices/update'
        data.pole_id = this.addDevData.pole_id
        data.typ = this.addDevData.typ
        data.name = this.addDevData.name
        data.sn = this.addDevData.sn
        data.status = this.addDevData.status
        data.url = this.addDevData.url
        data.volume = this.addDevData.volume
        data.version = this.addDevData.version
        data.id = this.addDevData.id
      }
      http({ url, method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.adding = false
            this.addModal = false
            this.$Message.success('成功')
            this.addDevData = {
              streetId: this.$route.query.id   // 灯杆id
            }
            this.getdevList()
          }
        })
    },
    add () {  // 点击添加按钮
      this.addModal = true
    },
    cancel () { // 取消添加
      this.addDevData = {
        streetId: this.$route.query.id   // 灯杆id
      }
      this.addModal = false
    },
    getdevList () { // 获取设备列表
      this.tableLoading = true
      http({ url: 'devices/list', method: 'POST', data: this.devSearchParams })
        .then(res => {
          this.tableLoading = false
          console.log(res)
          if (res.code === 200) {
            this.devList = res.data.content
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
