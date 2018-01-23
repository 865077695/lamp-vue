<template>
  <div class="street-edit">
    <div class="item">
      <div class="label">街道名称：</div>
      <Input v-model="streetInfo.name" placeholder="街道名称" style="width: 500px;"></Input><br>
    </div>
    <div class="item">
      <div class="label">心跳间隔：</div>
      <Input v-model="streetInfo.heartbeat" placeholder="心跳间隔" style="width: 100px;"></Input>（秒）
    </div>
    <div class="item">
      <div class="label">能耗上报时间：</div>
      <TimePicker :value="streetInfo.reporttime" @on-change="timeChange" placeholder="Select time" style="width: 100px" format="HH:mm:ss"></TimePicker>（时：分：秒）
    </div>
    <div class="item">
      <div class="label">定损功率：</div>
      <Input v-model="streetInfo.power" placeholder="定损功率" style="width: 100px;"></Input>（瓦）
    </div>
    <div class="item">
      <div class="label">经纬度</div>
      经度：<Input v-model="streetInfo.longitude" placeholder="经度" style="width: 100px;"></Input>
      &nbsp;纬度：<Input v-model="streetInfo.latitude" placeholder="纬度" style="width: 100px;"></Input>
    </div>
    <div class="item">
      <div id="allmap"></div>
    </div>
    <div class="item">
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import http from '@/common/http'
export default {
  name: 'StreetEdit',
  data () {
    return {
      streetInfo: null
    }
  },
  methods: {
    submit () {
      let data = {
        id: this.streetInfo.id,
        name: this.streetInfo.name,
        heartbeat: this.streetInfo.heartbeat,
        latitude: this.streetInfo.latitude,
        longitude: this.streetInfo.longitude,
        reporttime: this.streetInfo.reporttime,
        typ: this.streetInfo.typ,
        power: this.streetInfo.power
      }
      http({ url: 'street/streetsEdit', method: 'POST', data: data })
        .then(res => {
          if (res.code === 200) {
            this.$router.push({ path: '/lamp/street-admin' })
          }
        })
    },
    timeChange ($event) {
      this.streetInfo.reporttime = $event
    }
  },
  mounted () {
    /* eslint-disable */
    let map = new BMap.Map('allmap')
    map.centerAndZoom(new BMap.Point(this.streetInfo.longitude || 116.404, this.streetInfo.latitude || 39.915), 18)  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true)
    map.addEventListener('click', (e) => {
      this.streetInfo.longitude = e.point.lng
      this.streetInfo.latitude = e.point.lat
    })
  },
  created () {
    this.streetInfo = this.$route.query
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 20px;
  line-height: 24px;
}
.item .label {
  color: rgb(150, 144, 144);
}
#allmap {
  height: 400px;
}
</style>
