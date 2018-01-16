<template>
  <div class="map-view">
    <ECharts style='width:100%;height:100%' :options='pole' :auto-resize="true" @click="handleClick"></ECharts>
    <Row class="notice" :gutter="16">
      <Col span="6">
        <Select v-model="city" style="width:100%" size="large">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="5">
        <Input v-model="searchParam" size="large" placeholder="搜索路灯关键词"></Input>
      </Col>
      <Col span="2">
        <Button type="primary" size="large">搜索</Button>
      </Col>
    </Row>
    <Box></Box>
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

import { cityList } from '../../../data/cityList'
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
    }
  },
  data () {
    return {
      bmap: bmap,
      cityList,
      city: '',
      searchParam: '',
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
        // tooltip: {
        //   hideDelay: 1000,
        //   trigger: 'item',
        //   enterable: true,
        //   showContent: true,
        //   extraCssText: 'border-radius: 1px;background:red;padding:10px 10px;'
        // },
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
          // markPoint: { // 数据全是markPoint
          //   symbol: 'rect',
          //   symbolSize: 20,
          //   symbolOffset: ['100%', '0'],
          //   itemStyle: {
          //     normal: {
          //       borderWidth: 1,    // 标注边线线宽,默认为1
          //       color: 'green',
          //       label: {
          //         show: false
          //       }
          //     },
          //     emphasis: {
          //       borderColor: '#1e90ff',
          //       borderWidth: 5,
          //       label: {
          //         show: false
          //       }
          //     }
          //   },
          //   effect: {
          //     show: true,
          //     shadowBlur: 0
          //   },
          //   data: [
          //     { coord: ['113.614435', '22.756782'], value: 1 },
          //     { coord: ['113.614274', '22.753782'] }
          //   ]
          // },
          data: [   // 数组前两项为经纬度，最后一项为状态标识，第三项为id
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
          ],                       // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
          symbolSize: 20
        }]
      }
    }
  },
  created () {
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
</style>
