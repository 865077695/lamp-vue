<template>
  <div class="street-edit">
    <div class="item">
      <div id="allmap"></div>
      <Input id="address-search" v-model="address" @keyup.enter.native="search" placeholder="输入地址" style="width: 300px">
        <Button slot="append" icon="ios-search" @click="search"></Button>
      </Input>
    </div>
    <div class="item">
      <div class="label">街道名称：</div>
      <Input v-model="streetInfo.name" placeholder="街道名称" style="width: 200px;"></Input><br>
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
      <Tooltip content="点击地图选择街道中心点" placement="right">
        <div class="label">
              <label>经纬度：</label>
        </div>
      </Tooltip><br>
      经度：<Input v-model="streetInfo.longitude" placeholder="经度" style="width: 100px;"></Input>
      &nbsp;纬度：<Input v-model="streetInfo.latitude" placeholder="纬度" style="width: 100px;"></Input>
    </div>
    <div class="item">
      <Button type="primary" @click="submit" style="width: 100px">提交</Button>
    </div>
  </div>
</template>

<script>
import http from '@/common/http'
export default {
  name: 'StreetEdit',
  data () {
    return {
      streetInfo: null,
      address: null,
      map: null     // 保存地图实例
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
    },
    search () {
      this.setPlace(this.address)
    },
    setPlace (value) {
      let local = null
      let point = null
      let marker = null
      /* eslint-disable */
      local = new BMap.LocalSearch(this.map, { //智能搜索
        onSearchComplete: () => {
          if (local.getResults() != undefined) {
            this.map.clearOverlays() //清除地图上所有覆盖物
            if (local.getResults().getPoi(0)) {
              point = local.getResults().getPoi(0).point //获取第一个智能搜索的结果
              this.map.centerAndZoom(point, 18)
              /* eslint-disable */
              marker = new BMap.Marker(point) // 创建标注
              this.map.addOverlay(marker) // 将标注添加到地图中
              marker.enableDragging() // 可拖拽
              this.$Message.success('查找成功！')
            } else {
              this.$Message.error('未匹配到地点!可拖动地图上的红色图标到精确位置')
            }
          } else {
            this.$Message.error('未找到搜索结果')
          }
        }
      })
      local.search(value)
    }
  },
  mounted () {
    /* eslint-disable */
    this.map = new BMap.Map('allmap')
    this.map.centerAndZoom(new BMap.Point(this.streetInfo.longitude || 116.404, this.streetInfo.latitude || 39.915), 20)  // 初始化地图,设置中心点坐标和地图级别
    this.map.enableScrollWheelZoom(true)
    this.map.addEventListener('click', (e) => {
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
.street-edit {
  position: relative;
}
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
#address-search {
  position: absolute;
  top: 10px;
  left: 20px;
}
</style>
