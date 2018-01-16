<template>
  <div class="modal-content">
    <p style="font-size: 24px;">{{lamp.id}}&nbsp;&nbsp;{{lamp.name}}灯杆</p>
    <p>设备状态：
      <span v-if="lamp.status === 0">失联</span>
      <span v-else-if="lamp.status === 1">关闭</span>
      <span v-else-if="lamp.status === 2">开启</span>
      <span v-else-if="lamp.status === -1">损坏</span>
    </p>
    <Row :gutter="8">
      <i-col span="18">
        <video src="" style="height: 400px;background: #000"></video>
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
                <i-switch @on-change="change" v-model="status"></i-switch>
                <span style="color:#0e77d0;margin-left: 20px">
                  当前：
                  <span v-if="status">开启</span>
                  <span v-else>关闭</span>
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
      </i-col>
      <i-col span="6">
        <img src="@/assets/img/screen.png" height="400" alt="">
        <div style="padding: 20px 0 0 10px">
          <div>当前视频</div>
          <div style="color: #0e77d0">拳霸天下(我行我素).MP4</div>
        </div>
        <div style="padding: 20px 0 0 10px">
          <div>当前音频</div>
          <div style="color: #0e77d0">太阳西下.MP3</div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { lampData } from './modalData'
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
  methods: {
    change (status) {
      this.lamp.status = status
    }
  },
  computed: {
    status: {   // 因为报错 status not setter，所以暂时使用这种写法避免bug（应该是版本问题）
      get: function () {
        return this.lamp.status === 2
      },
      set: function (val) {

      }
    }
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

