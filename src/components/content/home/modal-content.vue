<template>
  <div class="modal-content">
    <p style="font-size: 24px;">灯杆名称：{{lamp.name}}（#{{lamp.id}}）</p>
    <p>设备状态：
      <span v-if="lamp.status === 0">失联</span>
      <span v-else-if="lamp.status === 1">关闭</span>
      <span v-else-if="lamp.status === 2">开启</span>
      <span v-else-if="lamp.status === -1">损坏</span>
    </p>
    <Row :gutter="8">
        <div id="player" style="width:720px; height:480px;"></div>
        <div>
          <i-col span="3">云台控制：</i-col>
          <i-col class="turnCamera" span="8">
            <div class="row">
              <i-button><Icon type="chevron-up"></Icon></i-button>
            </div>
            <div class="row">
              <i-button><Icon type="chevron-left"></Icon></i-button>
              <i-button><Icon type="chevron-right"></Icon></i-button>
            </div>
            <div class="row">
              <i-button><Icon type="chevron-down"></Icon></i-button>
            </div>
          </i-col>
          <i-col class="status" span="11" offset="2">
            <div class="left">
              <p>路灯开关</p>
              <p>
                <span style="color:#0e77d0;margin-left: 20px">
                  当前：
                </span>
              </p>
            </div>
            <div class="right">
              <div v-for="item in lampData" :key="item.id">
                {{item.name}}：<span style="color:#0e77d0; ">{{item.status}}</span>
              </div>
            </div>
          </i-col>
        </div>
        <!-- <img src="@/assets/img/screen.png" height="400" alt=""> -->
        <div style="padding: 20px 0 0 10px">
          <div>当前视频</div>
          <div style="color: #0e77d0">拳霸天下(我行我素).MP4</div>
        </div>
        <div style="padding: 20px 0 0 10px">
          <div>当前音频</div>
          <div style="color: #0e77d0">太阳西下.MP3</div>
        </div>
    </Row>
  </div>
</template>

<script>
import { lampData } from './modalData'    // TODO ： 这个文件删除。数据根据lamp的id获取。
export default {
  name: 'model',
  props: {
    lamp: {
      type: Object,
      required: true,
      default: function () {
        return {
          name: '',
          id: '',
          status: ''
        }
      }
    }
  },
  data () {
    return {
      lampData
    }
  },
  created () {
    console.log(this.lamp)
  },
  mounted () {
    /* eslint-disable */
    var player = new TcPlayer('player', {
      'rtmp': 'rtmp://192.168.2.132/hyipc/livestream',
      // 'm3u8': 'http://2157.liveplay.myqcloud.com/2157_358535a.m3u8',
      // 'flv': 'http://2157.liveplay.myqcloud.com/live/2157_358535a.flv', // 增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
      'autoplay': true,
      // 'coverpic': 'http://www.test.com/myimage.jpg',
      'width': '720',
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
.turnCamera {
  height: 140px;
  display: flex;
  flex-direction: column;
}
.row {
  flex-basis: 100%;
  display: flex;
}
.row:nth-child(1) {
  justify-content: center;
}
.row:nth-child(2) {
  justify-content: space-between;
}
.row:nth-child(3) {
  justify-content: center;
}
.row button {
  width: 80px;
}
.status {
  border: 1px solid rgb(216, 213, 213);
  height: 140px;
  border-radius: 5px;
  display: flex;
  background: #f7f4f0;
}
.status .left,
.status .right {
  width: 50%;
}
.left,
.right {
  display: flex;
  padding: 20px;
  justify-content: center;
  flex-direction: column;
  line-height: 25px;
  font-size: 16px;
}
.left {
  border-right: 1px solid rgb(216, 213, 213);
}
</style>

