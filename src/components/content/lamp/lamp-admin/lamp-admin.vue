<template>
<div>aaaaaaaaaaaaa
  <div style="display: flex;justify-content: flex-start">
    <div style="line-height: 36px;width: 50px;margin-right:20px;">名称：</div>
    <div style="width: 250px;margin-right:20px;"><Input v-model="streetName" size="large" placeholder="街道名称"></Input></div>
    <div style="line-height: 36px;width:80px;margin-right:20px;">控制类型：</div>
    <div style="width: 200px;margin-right:20px;">
      <Select v-model="controlType" style="width:200px" size="large">
          <Option v-for="item in controlTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Button @click="doSearch" size="large" type="success" style="width: 100px">查询</Button>
  </div>
  <Table class="table" border :loading="dataLoading" :columns="columns" :data="lampStreetList"></Table>
  <my-page @pageChange="pageChange" :_totalPage="totalPage"></my-page>
</div>
</template>

<script>
import MyPage from '../../../../template/page'
import { controlTypes } from './controlTypes'
export default {
  name: 'lamp-admin',
  components: { MyPage },
  data () {
    return {
      dataLoading: false,
      streetName: '',
      controlType: 'all',
      controlTypes,
      columns: [
        {
          title: '街道名称',
          key: 'streetName',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('strong', params.row.streetName)
            ])
          }
        },
        {
          title: '地址',
          key: 'address',
          width: 130,
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.address)
          }
        },
        {
          title: '控制类型',
          key: 'controlType',
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.controlType)
          }
        },
        {
          title: '当前模式',
          key: 'currentMode',
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.currentMode)
          }
        },
        {
          title: '灯控数',
          key: 'lampCount',
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.lampCount)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 400,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/street-edit', query: { id: params.row.streetId } })
                  }
                }
              }, '街道编辑'),
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/denggan-admin', query: { id: params.row.streetId } })
                  }
                }
              }, '灯杆管理'),
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/light-set', query: { id: params.row.streetName } })
                  }
                }
              }, '照明设置')
            ])
          }
        }
      ],
      lampStreetList: [
        { streetId: 1, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 2, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 3, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 4, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 5, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 6, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 7, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 8, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 9, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' },
        { streetId: 10, streetName: '天府大道南二段12号', address: '江苏扬州统治区', controlType: '单灯控制', currentMode: '手动模式', lampCount: '887' }
      ]
    }
  },
  activated () {
    console.log(1)
  },
  methods: {
    doSearch () {
    },
    show (index) {
    },
    pageChange (page) {
      this.dataLoading = true
      // 发送http请求刷新数据
      setTimeout(() => {
        this.dataLoading = false
      }, 1000)
    }
  },
  created () {
    // 初始化lampStreet数据，获取到总页数
    this.totalPage = 100
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.table {
  margin-top: 20px;
}
</style>
