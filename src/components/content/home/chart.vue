<template>
  <div>
    <div v-for="item in chartData" class="box" :style="'background: url(/static/img/'+item.bgImg+'.png) top center/100% 100%'" :key="item.name">
      <p style="color: #e9eaec">{{item.name}}</p>
      <p style="color: #fff;font-size: 26px;letter-spacing: 2px">{{item.count}}</p>
    </div>
    <div class="notify">
      <p v-for="item in notifyData" :key="item.id">{{ item.notifyMsg }}</p>
    </div>
  </div>
</template>

<script>
import { chartData, notifyData } from './chartdata'
export default {
  name: 'chart',
  data () {
    return {
      notifyData: notifyData
    }
  },
  computed: {
    chartData: () => {
      let _chartData = [...chartData]
      // _chartData.map(item => {
      //   if (item.count.length > 3) {
      //     item.count = item.count.split('')
      //     item.count.splice(-3, 0, ',')
      //     item.count = item.count.join('')
      //   }
      // })
      return _chartData
    }
  }
}
</script>

<style scoped>
.box {
  height: 120px;
  width: 240px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding-left: 20px;
  padding-top: 20px;
}
.notify {
  width: 240px;
  height: 240px;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}
</style>
