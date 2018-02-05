// 能耗统计
<template>
  <div>
      <!-- 搜索 -->
      <Form class="form" ref="powerSearchParams" :model="powerSearchParams" :label-width="80">
          <FormItem class="form-item" label="街道" prop="streetid">
              <Select v-model="powerSearchParams.streetid" @on-change="streetOnChange($event)" placeholder="选择街道" style="width: 200px;">
                <Option v-for="option in streetList" :key="option.id" :value="option.id">{{option.name}}</Option>
              </Select>
          </FormItem>
          <FormItem class="form-item" label="时间">
              <FormItem prop="month">
                  <DatePicker :value="powerSearchParams.month" @on-change="dateOnChange($event)" format="yyyy-MM"></DatePicker>
              </FormItem>
          </FormItem>
      </Form>
      <div>
        <ECharts style='width:100%;height:500px' :options='polar' :auto-resize="true"></ECharts>
      </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

import MyForm from '@/template/my-form'
import http from '@/common/http'
export default {
  name: 'Power',
  components: { MyForm, ECharts },
  data () {
    return {
      powerSearchParams: {
        streetid: null,
        month: null
      },
      streetList: [],
      powerData: [],
      polar: {
        title: {
          text: `能耗曲线图`,
          left: 'center',
          textStyle: {
            color: 'darkred'
          }
        },
        tooltip: {
          show: true,
          formatter: '{b}日:节能{c}w'
        },
        xAxis: {
          boundaryGap: false,
          type: 'category',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0],
          type: 'line',
          smooth: true
        }]
      }
    }
  },
  created () {
    this.powerSearchParams.month = this.getLastMonth()   // 初始化时间
    this.getStreetList()    // 获取街道列表
  },
  methods: {
    streetOnChange ($event) {
      this.getpowerData()
    },
    dateOnChange ($event) {
      this.powerSearchParams.month = $event
      this.getpowerData()
    },
    getpowerData () { // 获取能耗数据
      this.tableLoading = true
      http({ url: 'devices/monthPower', params: this.powerSearchParams })
        .then(res => {
          if (res.code === 200) {
            this.powerData = res.data
            this.polar.xAxis.data = this.setxAxis(this.powerData.length)
            this.polar.series[0].data = this.powerData.map(item => {
              return item.light_energy
            })
          }
        })
    },
    getStreetList () {    // 获取街道列表
      http({ url: 'index/streetsList' })
        .then(res => {
          if (res.code === 200) {
            this.streetList = res.data.streetsList
            this.powerSearchParams.streetid = this.streetList[0].id // 默认第一个
          }
        })
    },
    getLastMonth () {   // 初始化月份为上个月
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth()
      if (month === 0) {
        year = year - 1
        month = 12
      }
      return `${year}-${month}`
    },
    setxAxis (length) {
      let xAxis = []
      for (var i = 0; i < length; i++) {
        xAxis.push(i + 1)
      }
      return xAxis
    }
  }
}
</script>


<style scoped>
.table {
  margin-top: 20px;
}
.form {
  display: flex;
  justify-content: flex-start;
}
</style>
