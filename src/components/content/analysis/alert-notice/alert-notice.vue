// 设备报警消息
<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <my-form
      class="searchForm"
        ref="searchForm"
        :formItems="msgListSearchItem"
        :formData="msgSearchParams" 
        @validaok="searchOk"
        ></my-form>
      <Button @click="doValida('searchForm')" type="primary" style="height: 32px;">搜索</Button>
    </div>
    
      <Table class="table" :loading="tableLoading" border :columns="columns" :data="msgList"></Table>
      <my-page :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="msgSearchParams.currentPage"></my-page>
  </div>
</template>

<script>
import MyForm from '@/template/my-form'
import MyPage from '@/template/page'
import { dev, msgTyp } from '@/data/options'
import { getStatusText } from '@/common/_func'
import { msgListSearchItem } from '@/data/formItems'
import http from '@/common/http'
export default {
  name: 'StreetAdmin',
  components: { MyForm, MyPage },
  data () {
    return {
      tableLoading: false,
      switchDisabled: false,
      msgListSearchItem,
      totalPage: null,
      msgSearchParams: {
        beginTime: null,
        endTime: null,
        streetId: null,
        poleSn: null,
        poleName: null,
        typ: null,
        deviceTyp: null,
        status: null,
        currentPage: 1
      },
      msgList: [],
      columns: [
        { title: '消息id', key: 'id' },
        { title: '报警时间', key: 'time' },
        { title: '灯杆编号', key: 'poleSn' },
        { title: '灯杆名称', key: 'poleName' },
        {
          title: '设备类型',
          key: 'deviceTyp',
          render: (h, params) => {
            let text = getStatusText(params.row.deviceTyp, dev.typeOptions)
            return text
          }
        },
        { title: '设备编号', key: 'deviceSn' },
        {
          title: '消息内容',
          key: 'content',
          render: (h, params) => {
            let text = getStatusText(params.row.messageTyp, msgTyp)
            if (params.row.message === 5) { // 如果是能耗上报
              text += params.row.content
            }
            return text
          }

        },
        {
          title: '消息状态',
          key: 'status',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                size: 'large',
                trueValue: 0,
                falseValue: 1,
                value: params.row.status,
                disabled: this.switchDisabled
              },
              on: {
                'on-change': (status) => {
                  this.switchDisabled = true
                  http({ url: '/device/messageStatusEdit', params: { id: params.row.id, status } })
                    .then(res => {
                      if (res.code === 200) {
                        this.switchDisabled = false
                        this.$Message.success('修改成功')
                      } else {
                        this.$Message.error('修改失败')
                        if (params.row.status === 1) {
                          params.row.status = 0
                        } else {
                          params.row.status = 1
                        }
                      }
                    })
                }
              }
              // eslint-disable-next-line
            }, [h('span', {
              slot: 'open'
            }, '未看'),
            // eslint-disable-next-line
            h('span', {
              slot: 'close'
            }, '已看')])
          }
        }
      ]
    }
  },
  created () {
    this.getMsgList()
  },
  methods: {
    searchOk () { // 搜索数据格式验证通过
      this.msgSearchParams.currentPage = 1 // 搜索时重置页码为1
      this.getMsgList()
    },
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    pageChange () {
      this.getMsgList()
    },
    getMsgList () { // 获取街道列表
      this.tableLoading = true
      http({ url: '/device/queryMessageList', method: 'POST', data: this.msgSearchParams })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.msgList = res.data.result || []
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
