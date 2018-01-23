<template>
  <div class="map-view">
    <ECharts style='width:100%;height:100%' :options='pole' :auto-resize="true" @click="handleClick"></ECharts>
    <Row class="notice" :gutter="16">
      <Col span="6">
        <Select v-model="street" @on-change="streetChange" style="width:100%" size="large">
          <Option v-for="item in streetList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
    </Row>
    <Box class="chart"></Box>
    <Modal
      v-model="modal"
      width="80%"
      class-name="vertical-center-modal">
      <ModalContent :lamp="lamp"></ModalContent>
      <div class="footer" slot="footer"></div>
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
import Box from './chart'
import ModalContent from './modal-content'
export default {
  name: 'home',
  components: { ECharts, Box, ModalContent },
  methods: {
    handleClick (a) {
      console.log(a.data[2])
      this.modal = true
      this.lamp = a.data[2]
    },
    streetChange (street) {
      this.getPolesList(street)
    },
    getPolesList (streetId = 1) {
      http({ url: '/index/polesList', data: { streetId } })
        .then(res => {
          this.poleList = []    // 重置poleList
          if (res.code === 200) {
            res.data.polesList.map(item => {
              let pole = []
              pole[0] = item.longitude
              pole[1] = item.latitude
              pole[2] = item
              pole[3] = item.status
              console.log(pole)
              this.poleList.push(pole)
            })
            console.log(this.poleList)
          } else if (res.code === 500) {
            this.$router.push({ path: '/sign' })
          }
        })
    },
    updateMap () {

    }
  },
  data () {
    return {
      bmap: bmap,
      streetList: [],
      street: '',
      poleList: [   // 数组前两项为经纬度，最后一项为状态标识，第三项为id
        ['113.614435', '22.756782', { name: '大门右侧', id: '#a', status: 0 }, 0],
        ['113.614274', '22.753782', { name: '大门左侧', id: '#b', status: 1 }, 1],
        ['113.614247', '22.754749', { name: '南街东侧', id: '#c', status: -1 }, -1],
        ['113.61519', '22.753824', { name: '南街中侧', id: '#d', status: 1 }, 1],
        ['113.616286', '22.753824', { name: '南街西侧', id: '#e', status: 2 }, 2],
        ['113.617157', '22.753891', { name: '北街东侧', id: '#f', status: 1 }, 1],
        ['113.617148', '22.755032', { name: '北街西侧', id: '#g', status: 2 }, 2],
        ['113.61722', '22.755924', { name: '北街中侧', id: '#h', status: -1 }, -1],
        ['113.617166', '22.756757', { name: '东街北侧', id: '#i', status: -1 }, -1],
        ['113.6157112', '22.756815', { name: '东街中侧', id: '#j', status: -1 }, -1]
      ],
      modal: false,
      lamp: { id: '', name: '' },
      pole: {
        title: {
          text: '路灯实时状态监测',
          left: 'center',
          textStyle: {
            color: 'darkred'
          }
        },
        action: {
          tooltip: {
            // showTip:
          }
        },
        // 对不同状态路灯设置不同图标样式
        visualMap: {
          type: 'piecewise',  // 定义为分段型
          pieces: [
            { gt: -2, lt: 0, label: '损坏', color: '#da932c' },     // -1 损坏
            { gt: -1, lt: 1, label: '失联', color: '#d65b4a' },     // 0 失联
            { gt: 0, lt: 2, label: '关闭', color: '#19be6b' },     // 1 关闭
            { gt: 1, lt: 3, label: '开启', color: '#0e77d0' }     // 2 开启
          ],
          calculable: true,
          textStyle: {
            color: '#000'
          }
        },
        bmap: {
          center: [113.615657, 22.7552],   // 百度地图中心经纬度
          zoom: 18,                         // 百度地图缩放
          roam: true,                       // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          mapStyle: {                       // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
            styleJson: [
            ]
          }
        },
        series: [{
          name: '路灯',
          type: 'scatter',                  // 散点图
          coordinateSystem: 'bmap',         // 使用百度地图坐标系
          data: this.poleList,              // 灯杆列表数据
          symbolSize: 20
        }]
      }
    }
  },
  created () {
    http({ url: '/index/streetsList' }) // 获取街道列表
      .then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.streetList = res.data.streetsList
        } else if (res.code === 500) {
          this.$router.push({ path: '/sign' })
        }
      })
  }
}
</script>

<style>
.map-view {
  position: relative;
  height: 100%;
  box-sizing: border-box;
}
.notice {
  position: absolute;
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
  padding-top: 50px;
  margin-right: 30px;
  right: 0;
  top: 0;
  width: 240px;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
