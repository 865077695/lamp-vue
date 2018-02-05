<template>
  <div class="map-view">
    <h3 class="title">路灯实时状态监测</h3>
    <ECharts style='width:100%;height:100%' :options='polar' :auto-resize="true" @click="handleClick"></ECharts>
    <div class="notice" style="width:300px">
        <Select v-model="street" @on-change="streetChange" style="width:100%" size="large">
          <Option v-for="item in streetList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
    </div>
    <Box class="chart"  
    :polesCountsList="polesCountsList"
    ></Box>
    <Modal
      v-model="modal"
      width="920"
      class-name="vertical-center-modal"
      @on-cancel="closeModal">
      <ModalContent 
      ></ModalContent>
      <div class="footer" slot="footer"></div>
      <Spin size="large" fix v-if="loadingPoleInfo"></Spin>
    </Modal>
  </div>
</template>

<script>
import bmap from 'echarts/extension/bmap/bmap'    // 引入地图扩展插件
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/markPoint'

import http from '@/common/http'
import bus from '@/eventBus'
import Box from './chart'
import ModalContent from './modal-content'
export default {
  name: 'home',
  components: { ECharts, Box, ModalContent },
  methods: {
    handleClick (a) {
      this.modal = true
      this.loadingPoleInfo = true
      let lampId = a.data[2].id
      this.getPoleInfo(lampId)
      this.s1 = setInterval(() => {
        this.getPoleInfo(lampId)
      }, 180000)
    },
    closeModal () {
      bus.$emit('destoryPlayer')
      clearInterval(this.s1)
    },
    streetChange (street) { // 街道切换时，重新获取该街道的灯杆列表和数据统计
      if (this.s) {
        clearInterval(this.s)
      }
      this.getPolesList(street)
      this.getPolesCount(street)
      this.s = setInterval(() => {
        this.getPolesList(street)
        this.getPolesCount(street)
      }, 180000)
    },
    getPolesList (streetId = 1) { // 获取灯杆列表
      let seletctedStreet = this.streetList.filter(item => {
        return streetId === item.id
      })
      http({ url: '/index/polesList', params: { streetId } })
        .then(res => {
          let poleList = []
          if (res.code === 200) {
            res.data.polesList.map(item => {    // 将灯杆列表数据拼接为地图展示所需要的数据格式
              let pole = [item.longitude, item.latitude, item, item.status]
              poleList.push(pole)
            })
            this.polar.series[0].data = poleList  // 更新地图显示信息
            this.polar.bmap.center = [seletctedStreet[0].longitude, seletctedStreet[0].latitude]
          }
        })
    },
    getPoleInfo (lampId) {                // 获取灯杆详细信息
      http({ url: '/index/poleInfo', params: { id: lampId } })
        .then(res => {
          if (res.code === 200) {         // 成功关闭加载中动画
            this.loadingPoleInfo = false
            this.lampInfo = res.data.poleAndDevicesData
            bus.$emit('getPoleInfoEnd', this.lampInfo)
          } else {
            this.modal = false            // 失败关闭modal
          }
        })
    },
    getPolesCount (streetId = 1) {          // 获取街道灯杆统计数据
      http({ url: 'pole/polesCount', params: { streetId } })
        .then(res => {
          if (res.code === 200) {
            this.polesCountsList = res.data.polesCountsList
            bus.$emit('setChart', this.polesCountsList) // 统计数据获取完成之后，通知组件开始渲染
          }
        })
      http({ url: '/device/queryMessageList', method: 'POST', data: { streetId, pageSize: 4 } })
        .then(res => {
          if (res.code === 200) {
            this.noticeList = res.data.result || []
            bus.$emit('setNotice', this.noticeList)
          }
        })
    }
  },
  data () {
    return {
      loadingPoleInfo: false, // modal数据加载动画
      s: null,        // 定时器
      s1: null,       // modal框数据定时器
      bmap: bmap,
      streetList: [], // 街道列表
      street: '',     // 当前所选街道
      modal: false,
      lampInfo: {     // 灯杆详情信息
        poles: {},
        deviceDataDTOList: []
      },
      polesCountsList: [],  // 路灯统计数据列表
      polar: {
        action: {
        },
        tooltip: {
          trigger: 'item'
        },
        formatter: function (params) {
          let name = params.data[2].name
          if (params.data[3] === 10) {
            return `${name}：损坏`
          } else if (params.data[3] === 20) {
            return `${name}：失联`
          } else if (params.data[3] === 0) {
            return `${name}：关闭`
          } else if (params.data[3] === 1) {
            return `${name}:开启`
          }
        },
        // 对不同状态路灯设置不同图标样式
        visualMap: {
          type: 'piecewise',  // 定义为分段型
          pieces: [
            { value: 10, label: '损坏', color: '#da932c' },     // 10 损坏
            { value: 20, label: '失联', color: '#d65b4a' },     // 20 失联
            { value: 0, label: '关闭', color: '#0e77d0' },     // 0 关闭
            { value: 1, label: '开启', color: '#19be6b' }     // 1 开启
          ],
          calculable: true,
          textStyle: {
            color: '#000'
          }
        },
        bmap: {
          center: [113.617966, 22.755533],   // 百度地图中心经纬度
          zoom: 24,                         // 百度地图缩放
          roam: true
        },
        series: [{
          name: '路灯',
          type: 'scatter',                  // 散点图
          coordinateSystem: 'bmap',         // 使用百度地图坐标系
          data: [],              // 灯杆列表数据
          symbolSize: 16
        }]
      }
    }
  },
  created () {
    http({ url: '/index/streetsList' }) // 获取街道列表
      .then(res => {
        if (res.code === 200) {
          this.streetList = res.data.streetsList
          this.street = this.streetList[0].id     // 默认为第一个街道
        }
      })
  },
  beforeDestroy () {
    clearInterval(this.s)
    clearInterval(this.s1)
  }
}
</script>

<style>
.map-view {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  z-index: 999;
}
.title {
  text-align: center;
  color: brown;
  font-size: 16px;
}
.notice {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  padding: 50px 0 0 50px;
}
.ivu-modal-footer {
  border-top: 0;
}
.chart {
  display: flex;
  position: absolute;
  padding-top: 30px;
  margin-right: 30px;
  right: 0;
  top: 0;
  width: 240px;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
