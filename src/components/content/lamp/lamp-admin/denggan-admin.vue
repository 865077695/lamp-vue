<template>
  <div class="denggan">
    <div class="denggan-chart">
      <div v-for="item in chartData" :key="item.name">
        <div class="box" :style="'background: url(/static/img/'+item.bgImg+'.png) top center/100% 100%'">
          <p style="color: #e9eaec">{{item.name}}</p>
          <p style="color: #fff;font-size: 26px;letter-spacing: 2px">{{item.count}}</p>
        </div>
      </div>
    </div>
    <Modal v-model="editModal" width="720">
        <p slot="header">
            <Icon type="edit"></Icon>
            <span>灯杆信息编辑</span>
        </p>
        <div style="padding: 0 50px;">
          <edit-lamp :lampData="lampData"></edit-lamp>
        </div>
        <div slot="footer" style="text-align: center;">
            <Button type="primary" size="large" :loading="editModal_loading" @click="sub">提交</Button>
            <Button type="primary" size="large" @click="cancel">取消</Button>
        </div>
    </Modal>
    <div style="display: flex;justify-content: flex-start;margin-bottom: 20px;">
      <div style="line-height: 36px;width: 60px;margin-right:20px;">灯控编号：</div>
      <div style="width: 200px;margin-right:20px;"><Input v-model="searchData.lampIndex" size="large" placeholder="输入编号"></Input></div>
      <div style="line-height: 36px;width: 60px;margin-right:20px;">灯杆名称：</div>
      <div style="width: 200px;margin-right:20px;"><Input v-model="searchData.lampName" size="large" placeholder="输入灯杆名称"></Input></div>
      <div style="line-height: 36px;width:60px;margin-right:20px;">选择类型：</div>
      <div style="width: 200px;margin-right:20px;">
        <Select v-model="searchData.lampControlType" style="width:200px" size="large">
          <Option v-for="item in controlTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <Button @click="doSearch" size="large" type="success" style="width: 100px">查询</Button>&nbsp;
      <Button size="large" type="success" style="width: 100px" @click="editModal = true">添加</Button>
    </div>
    <Table class="table" border :loading="dataLoading" :columns="columns" :data="lampStreetList"></Table>
    <my-page @pageChange="pageChange" :_totalPage="totalPage"></my-page>
  </div>
</template>

<script>
import { chartData } from '../../home/chartdata'
import { controlTypes } from './controlTypes'
import MyPage from '../../../../template/page'
import EditLamp from './template/edit-lamp'
export default {
  name: 'dengganAdmin',
  components: { MyPage, EditLamp },
  data () {
    return {
      lampData: {},
      editModal: false,
      editModal_loading: false,
      dataLoading: false,
      totalPage: 10,
      chartData,
      controlTypes,
      searchData: {
        lampIndex: '',
        lampName: '',
        lampControlType: ''
      },
      columns: [
        {
          title: '灯杆编号',
          key: 'lampIndex',
          width: 150
        },
        {
          title: '灯控编号',
          key: 'lampControlIndex',
          width: 130,
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.lampControlIndex)
          }
        },
        {
          title: '灯杆名称',
          key: 'lampName',
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.lampName)
          }
        },
        {
          title: '类型',
          key: 'controlType',
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.controlType)
          }
        },
        {
          title: '总路数',
          key: 'lushu',
          render: (h, params) => {
            return h('div', {
              class: 'darkColor'
            }, params.row.lushu)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    let lampId = this.lampStreetList[params.index].lampIndex
                    // 根据lampId获取需要编辑的灯杆信息
                    setTimeout(() => {
                      this.lampData = { lampIndex: lampId }
                      this.editModal = true
                    }, 1000)
                  }
                }
              }, '灯杆编辑'),
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    let lampId = this.lampStreetList[params.index].lampIndex
                    // 根据lampId获取灯杆详情
                    setTimeout(() => {
                      this.lampData = { lampIndex: lampId }
                      this.editModal = true
                    }, 1000)
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    let lampId = this.lampStreetList[params.index].lampIndex
                    // 根据lampId获取灯杆详情
                    this.$router.push({ path: '/device-admin', query: { id: lampId } })
                  }
                }
              }, '设备管理')
            ])
          }
        }
      ],
      lampStreetList: [
        { lampIndex: 1, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 2, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 3, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 4, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 5, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 6, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 7, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 8, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 9, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' },
        { lampIndex: 10, lampControlIndex: 1, lampName: '马路边008', controlType: '单灯控制', lushu: 3, huiluName: '1回路 1失联 2回路 2失联', lampCount: '887' }
      ]
    }
  },
  methods: {
    doSearch () {
      console.log(this.searchData)
    },
    show (index) {
      console.log(index)
    },
    pageChange (page) {
      console.log(page)
      this.dataLoading = true
      // 发送http请求刷新数据
      setTimeout(() => {
        this.dataLoading = false
      }, 1000)
    },
    sub () {
      this.editModal_loading = true
      // 提交修改/新增
      setTimeout(() => {
        // 提交...
        this.editModal_loading = false
        this.editModal = false
      }, 1000)
    },
    cancel () {
      this.editModal = false
    }
  },
  created () {
    console.log(this.$route)
    // 初始化lampStreet数据，获取到总页数
    this.totalPage = 100
  }
}
</script>

<style scoped>
.denggan-chart {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.box {
  height: 100px;
  width: 200px;
  border-radius: 5px;
  padding-top: 20px;
  padding-left: 20px;
}
</style>
