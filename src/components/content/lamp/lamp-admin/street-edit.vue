<template>
  <div class="street-edit">
    <div class="item">
      <div class="label">街道名称：</div>
      <Input v-model="street.name" placeholder="街道名称" style="width: 500px;"></Input><br>
    </div>
    <div class="item">
      <div class="label">心跳间隔：</div>
      <Input v-model="street.beatInterval" placeholder="心跳间隔" style="width: 400px;"></Input>（单位：秒）
    </div>
    <div class="item">
      <div class="label">能耗上报时间：</div>
      <TimePicker :value="street.time" @on-change="timeChange" confirm placeholder="Select time" style="width: 168px" format="HH:mm"></TimePicker>
    </div>
    <div class="item">
      <div class="label">控制类型：</div>
      <Select v-model="street.controlType" style="width:400px" size="large">
          <Option v-for="item in controlTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="item">
      <div class="label">定损功率：</div>
      <Input v-model="street.power" placeholder="定损功率" style="width: 400px;"></Input>（单位：瓦）
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
import { controlTypes } from './controlTypes'
export default {
  name: 'StreetEdit',
  data () {
    return {
      controlTypes,
      street: {
        name: '',
        beatInterval: '',
        time: '123',
        power: '',
        controlType: ''
      }
    }
  },
  created () {
    /* eslint-disable */
    setTimeout(() => {
      var map = new BMap.Map("allmap")    // 创建Map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 18)  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true)     //开启鼠标滚轮缩放
    })
  },
  methods: {
    submit(){
      console.log(this.street)
    },
    timeChange($event){
      console.log($event)
      this.street.time = $event
    }
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
