<template>
  <div class="modal-content">
    <p style="font-size: 24px;">灯杆名称：{{lampInfoPoles.name}}（#{{lampInfoPoles.id}}）</p>
    <p style="color:#878383">灯杆状态：
      <span v-if="lampInfoPoles.status === 0"><Tag color="red">失联</Tag></span>
      <span v-else-if="lampInfoPoles.status === 1"><Tag color="blue">关闭</Tag></span>
      <span v-else-if="lampInfoPoles.status === 2"><Tag color="green">开启</Tag></span>
      <span v-else-if="lampInfoPoles.status === -1"><Tag color="yellow">损坏</Tag></span>
    </p>
    <div class="content">
      <div id="player" style="width:640px; height:480px;"></div>
      <div class="status">
        <div class="item direction" style="padding: 10px 20px">
          <div class="top">
            <Button type="primary" @click="moveIpc(3)"><Icon :disabled="loading" type="chevron-up"></Icon></Button>
          </div>
          <div class="middle">
            <Button type="primary" @click="moveIpc(1)"><Icon :disabled="loading" type="chevron-left"></Icon></Button>
            <Button type="primary" @click="moveIpc(2)"><Icon :disabled="loading" type="chevron-right"></Icon></Button>
          </div>
          <div class="bottom">
            <Button type="primary" @click="moveIpc(4)"><Icon :disabled="loading" type="chevron-down"></Icon></Button>
          </div>
        </div>
        <div class="item">
          <span class="item-label">路灯状态：</span>
          <span v-if="devInfo.status === 0"><Tag color="blue">关闭</Tag></span>
          <span v-else-if="devInfo.status === 1"><Tag color="green">开启</Tag></span>
          <span v-else-if="devInfo.status === 10"><Tag color="yellow">故障</Tag></span>
          <span v-else-if="devInfo.status === 20"><Tag color="red">失联</Tag></span>
        </div>
        <div class="item">
          <span class="item-label">充电桩：</span>
          <span v-if="devInfo.power === 0"><Tag color="blue">关闭</Tag></span>
          <span v-else-if="devInfo.power === 1"><Tag color="green">开启</Tag></span>
          <span v-else-if="devInfo.power === 10"><Tag color="yellow">故障</Tag></span>
          <span v-else-if="devInfo.power === 20"><Tag color="red">失联</Tag></span>
        </div>
        <div class="item"><span class="item-label">Pm10：</span>{{devInfo.pm10}}</div>
        <div class="item"><span class="item-label">Pm25： </span>{{devInfo.pm25}}</div>
        <div class="item"><span class="item-label">广播状态：</span>
          <span v-if="devInfo.broadcastStatus === 0"><Tag color="blue">关闭</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 1"><Tag color="green">开启</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 10"><Tag color="yellow">故障</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 20"><Tag color="red">失联</Tag></span>
        </div>
        <div class="item"><span class="item-label">当前播报计划：</span><br><Tag color="blue">{{devInfo.broadcastCurrentPlan}}</Tag></div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/common/http'
export default {
  name: 'model',
  props: {
    lampInfo: {
      type: Object,
      // required: true,
      default: function () {
        return {
          'poles': {
            'modifyId': null,
            'modifyTime': null,
            'id': 1,
            'streetId': 1,
            'poleSn': '0',
            'name': 'XX灯杆',
            'latitude': '',
            'longitude': '',
            'status': 0
          },
          'deviceDataDTOList': [
            {
              'id': 1,
              'sn': '33333',
              'name': '灯控1',
              'status': 1,
              'typ': 0,
              'url': null
            },
            {
              'id': 2,
              'sn': '44444',
              'name': '空气检测',
              'status': 1,
              'typ': 1,
              'url': null,
              'hd': null,
              'tp': null,
              'pm10': 100,
              'pm25': 200,
              'rawpm25': null
            },
            {
              'id': 3,
              'sn': '5555',
              'name': '广播',
              'status': 1,
              'typ': 2,
              'url': null,
              'currentPlan': '当前播报的这个计划哦'
            },
            {
              'id': 4,
              'sn': '666',
              'name': '摄像头',
              'status': 1,
              'typ': 3,
              'url': 'rtmp://192.168.2.132/hyipc/livestream'
            },
            {
              'id': 5,
              'sn': '666',
              'name': '充电桩',
              'status': 1,
              'typ': 4,
              'url': ''
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      lampInfoPoles: {},      // 路灯基础信息
      lampDevInfo: [],         // 路灯上设备数据
      devInfo: {},             // 路灯设备数据处理后 供页面展示使用
      cameraSn: null          // 保存摄像头编号
    }
  },
  created () {
    this.lampInfoPoles = this.lampInfo.poles
    this.lampDevInfo = this.lampInfo.deviceDataDTOList
  },
  methods: {
    moveIpc (direction) {
      console.log('emitMoveIpc')
      http({ url: 'index/ipcMove', method: 'POST', data: { direction, id: this.lampInfoPoles.id } })
        .then(res => {
          console.log('index/ipcMove')
          if (res.code === 200) {
            this.$Message.success('操作成功')
          }
        })
    }
  },
  mounted () {
    this.devInfo = []
    this.lampDevInfo.map(item => {
      if (item.typ === 3) {   // 摄像头
        this.devInfo.url = item.url
        this.cameraSn = item.sn
      } else if (item.typ === 0) {  // 灯控
        this.devInfo.status = item.status
      } else if (item.typ === 1) {    // 空气检测
        this.devInfo.pm10 = item.pm10
        this.devInfo.pm25 = item.pm25
      } else if (item.typ === 2) {    // 广播
        this.devInfo.broadcastStatus = item.status
        this.devInfo.broadcastCurrentPlan = item.currentPlan
      } else if (item.typ === 4) {      // 充电桩
        this.devInfo.power = item.status
      }
    })
    /* eslint-disable */
    var player = new TcPlayer('player', {
      'rtmp': this.devInfo.url,
      'autoplay': true,
      // 'coverpic': 'http://www.test.com/myimage.jpg',
      'width': '640',
      'height': '480'
    })
  }
}
</script>

<style scoped>
.modal-content {
  padding: 20px;
  font-size: 16px;
}
.content {
  display: flex;
  justify-content: flex-start;
}
#player {
  flex: 1 0 640px;
}
.status {
  flex: 1 0 200px;
  padding: 0 10px;
}
.direction {
  border: 1px solid #ece6e6;
  display: flex;
  padding: 20px;
  flex-direction: column;
}
.top,
.bottom {
  text-align: center;
}
.middle {
  display: flex;
  justify-content: space-between;
}
.item {
  padding: 10px;
  background: #f7f3f3;
  margin-bottom: 10px;
  border-radius: 5px;
}
.item-label {
  font-size: 14px;
}
</style>

