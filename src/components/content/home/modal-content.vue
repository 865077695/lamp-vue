<template>
  <div class="modal-content">
    <p style="font-size: 24px;">灯杆名称：{{lampInfoPoles.name?lampInfoPoles.name:'-'}}（#{{lampInfoPoles.id?lampInfoPoles.id:'-'}}）</p>
    <div class="content">
      <div id="player-container">
        <div id="player" v-if="hasLive"></div>
        <span class="message" v-if="!hasLive" style="color:#fff;">{{playerContent}}</span>
      </div>
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
          <span v-else><Tag color="red">未知</Tag></span>
        </div>
        <div class="item">
          <span class="item-label">充电桩：</span>
          <span v-if="devInfo.power === 1"><Tag color="blue">待机</Tag></span>
          <span v-else-if="devInfo.power === 2"><Tag color="green">充电</Tag></span>
          <span v-else-if="devInfo.power === 3"><Tag color="yellow">充满</Tag></span>
          <span v-else-if="devInfo.power === 4"><Tag color="red">故障</Tag></span>
          <span v-else-if="devInfo.power === 5"><Tag color="red">预约</Tag></span>
          <span v-else-if="devInfo.power === 6"><Tag color="red">离线</Tag></span>
          <span v-else><Tag color="red">未知</Tag></span>
        </div>
        <div class="item"><span class="item-label">Pm10：</span>{{devInfo.pm10?devInfo.pm10: '-'}}</div>
        <div class="item"><span class="item-label">Pm25： </span>{{devInfo.pm25?devInfo.pm25: '-'}}</div>
        <div class="item"><span class="item-label">广播状态：</span>
          <span v-if="devInfo.broadcastStatus === 0"><Tag color="blue">关闭</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 1"><Tag color="green">开启</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 10"><Tag color="yellow">故障</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 20"><Tag color="red">失联</Tag></span>
          <span v-else><Tag color="red">未知</Tag></span>
        </div>
        <div class="item"><span class="item-label">当前播报计划：</span><br><Tag color="blue">{{devInfo.broadcastCurrentPlan?devInfo.broadcastCurrentPlan:'无'}}</Tag></div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/common/http'
import bus from '@/eventBus'
export default {
  name: 'model',
  data () {
    return {
      loading: false,
      hasLive: false,
      playerContent: '接入中...',
      lampInfoPoles: {},      // 路灯基础信息
      lampDevInfo: [],         // 路灯上设备数据
      lampInfo: {},           // 保存lampInfo数据
      devInfo: {},            // 保存状态数据
      aliPlayer: null,
      cameraId: null,         // 摄像头id
      s: null                 // 存放定时器
    }
  },
  created () {
    bus.$on('getPoleInfoEnd', lampInfo => {
      this.lampInfo = lampInfo
      this.lampInfoPoles = this.lampInfo.poles
      this.lampDevInfo = this.lampInfo.deviceDataDTOList
      this.playerContent = '此灯杆无监控视频'
      this.devInfo = this.setDevInfo(this.lampDevInfo)
    })
    bus.$on('destoryPlayer', () => {
      this.destoryPlayer()
    })
  },
  methods: {
    moveIpc (direction) { // 移动ipc
      http({ url: 'index/ipcMove', method: 'POST', data: { direction, id: this.cameraId } })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('操作成功')
          }
        })
    },
    setDevInfo (info) {   // 保存状态数据
      let devInfo = {}
      info.map(item => {
        if (item.typ === 0) {  // 灯控
          devInfo.status = item.status
        } else if (item.typ === 1) {    // 空气检测
          devInfo.pm10 = item.pm10
          devInfo.pm25 = item.pm25
        } else if (item.typ === 2) {    // 广播
          devInfo.broadcastStatus = item.status
          devInfo.broadcastCurrentPlan = item.currentPlan
        } else if (item.typ === 3 && this.aliPlayer === null) {   // 摄像头
          this.hasLive = true
          this.cameraId = item.id
          devInfo.url = item.url
          this.s = setTimeout(() => {
            this.setPlayer(devInfo.url)   // 调播放器
          }, 0)
        } else if (item.typ === 4) {      // 充电桩
          devInfo.power = item.status
        }
      })
      return devInfo
    },
    setPlayer (url) {    // 调用播放器
      // eslint-disable-next-line
      this.aliPlayer = new Aliplayer({
        id: 'player',
        width: '640',
        height: '480',
        source: url
        // skinRes: 'http://127.0.0.1:5500/lib/aliplayer/defaultSkin' // 使用自己服务器的皮肤
      })
    },
    destoryPlayer () {    // 销毁播放器
      clearTimeout(this.s)
      // eslint-disable-next-line
      if (this.aliPlayer !== null) {
        this.hasLive = false
        document.getElementById('player').innerHTML = null
      }
      this.aliPlayer = null
      setTimeout(() => {    // modal关闭后将文本初始化为接入中...
        this.playerContent = '接入中...'
      }, 500)
    }
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
#player-container {
  position: relative;
  flex: 1 0 640px;
  background: #495060;
  display: flex;
  justify-content: center;
  align-items: center;
}
#player {
  width: 100%;
  height: 100%;
  background: #495060;
}
#player .message {
  position: absolute;
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

