<template>
  <div class="modal-content">
    <p style="font-size: 24px;">灯杆名称：{{lampInfoPoles.name?lampInfoPoles.name:'未知'}}</p>
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
          焦距：
          <Button @click="zoomInOut(true)" type="primary" size="small">加</Button>
          <Button @click="zoomInOut(false)" type="primary" size="small">减</Button>
        </div>
        <div class="item">
          预置点：
          <Select v-model="prsetName" style="width:60px" size="small" placeholder="">
            <Option v-for="item in points" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button type="primary" @click="prsetPoint" size="small" :disabled="!prsetName">Go</Button>
        </div>
        <div class="item">
          <span class="item-label">路灯状态：</span>
          <span v-if="devInfo.status === 0"><Tag color="blue">关闭</Tag></span>
          <span v-else-if="devInfo.status === 1"><Tag color="green">开启</Tag></span>
          <span v-else-if="devInfo.status === 10"><Tag color="yellow">故障</Tag></span>
          <span v-else-if="devInfo.status === 20"><Tag color="red">失联</Tag></span>
          <span v-else><Tag color="red">无</Tag></span>
          <i-switch v-if="devInfo.status === 0 || devInfo.status === 1"
          style="display: inline-block"
           :value="devInfo.status"
              :true-value="1"
              :false-value="0"
              @on-change="toggleLightStatus($event)"
              :disabled="toggleLight && (devInfo.status === 10 || devInfo.status === 20)">
              <span slot="open">开</span>
              <span slot="close">关</span>
          </i-switch>
        </div>
        <div class="item">
          <span class="item-label">充电桩：</span>
          <span v-if="devInfo.power === 0"><Tag color="blue">待机</Tag></span>
          <span v-else-if="devInfo.power === 1"><Tag color="green">充电</Tag></span>
          <span v-else-if="devInfo.power === 3"><Tag color="yellow">充满</Tag></span>
          <span v-else-if="devInfo.power === 5"><Tag color="red">预约</Tag></span>
          <span v-else-if="devInfo.power === 10"><Tag color="red">故障</Tag></span>
          <span v-else-if="devInfo.power === 20"><Tag color="red">离线</Tag></span>
          <span v-else><Tag color="red">无</Tag></span>
        </div>
        <div class="item"><span class="item-label">Pm10：</span>{{devInfo.pm10?devInfo.pm10: '-'}}</div>
        <div class="item"><span class="item-label">Pm25： </span>{{devInfo.pm25?devInfo.pm25: '-'}}</div>
        <div class="item"><span class="item-label">广播状态：</span>
          <span v-if="devInfo.broadcastStatus === 1"><Tag color="blue">在线</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 2"><Tag color="green">运行中</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 3"><Tag color="yellow">锁定</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 4"><Tag color="red">离线</Tag></span>
          <span v-else-if="devInfo.broadcastStatus === 5"><Tag color="blue">下载</Tag></span>
          <span v-else><Tag color="red">无</Tag></span>
        </div>
        <div class="item"><span class="item-label" :title="devInfo.broadcastCurrentPlan?devInfo.broadcastCurrentPlan:'无'">当前播报计划：</span><br><Tag color="blue">{{devInfo.broadcastCurrentPlan?devInfo.broadcastCurrentPlan:'无'}}</Tag></div>
      </div>
    </div>
  </div>
</template>

<script>
const points = [
  {
    label: "1",
    value: "1"
  },
  {
    label: "2",
    value: "2"
  },
  {
    label: "3",
    value: "3"
  },
  {
    label: "4",
    value: "4"
  },
  {
    label: "5",
    value: "5"
  },
  {
    label: "6",
    value: "6"
  },
  {
    label: "7",
    value: "7"
  },
  {
    label: "8",
    value: "8"
  }
];
import http from "@/common/http";
import bus from "@/eventBus";
export default {
  name: "HomeModel",
  data() {
    return {
      loading: false,
      hasLive: false,
      playerContent: "接入中...",
      toggleLight: true, // 路灯状态更新中
      lampInfoPoles: {}, // 路灯基础信息
      lampDevInfo: [], // 路灯上设备数据
      lampInfo: {}, // 保存lampInfo数据
      devInfo: {}, // 保存状态数据
      aliPlayer: null,
      cameraId: null, // 摄像头id
      LightId: null, // 灯控设备id
      points,
      prsetName: null,
      s: null // 存放定时器
    };
  },
  created() {
    bus.$on("getPoleInfoEnd", lampInfo => {
      this.lampInfo = lampInfo;
      this.lampInfoPoles = this.lampInfo.poles;
      this.lampDevInfo = this.lampInfo.deviceDataDTOList;
      this.playerContent = "此灯杆无监控视频";
      this.devInfo = this.setDevInfo(this.lampDevInfo);
    });
    bus.$on("destoryPlayer", () => {
      this.destoryPlayer();
    });
  },
  methods: {
    moveIpc(direction) {
      // 移动ipc
      http({
        url: "index/ipcMove",
        method: "POST",
        data: { direction, id: this.cameraId }
      }).then(res => {
        if (res.code === 200) {
          this.$Message.success("操作成功");
        }
      });
    },
    zoomInOut(val) {
      // 焦距调整
      http({
        url: "index/zoomInOut",
        params: { ipcDevId: this.cameraId, zoomIn: val }
      }).then(res => {
        if (res.code === 200) {
          this.$Message.success("操作成功");
        }
      });
    },
    prsetPoint() {
      http({
        url: "index/ipcMove2preset",
        params: { ipcDevId: this.cameraId, prsetName: this.prsetName }
      }).then(res => {
        if (res.code === 200) {
          this.$Message.success("操作成功");
        }
      });
    },
    toggleLightStatus(val) {
      http({
        url: "/devices/updateLightStatus",
        method: "POST",
        data: {
          id: this.devInfo.lightId,
          sn: this.devInfo.lightSn,
          status: val
        }
      }).then(res => {
        if (res.code === 200) {
          this.devInfo.status = val;
        }
      });
    },
    setDevInfo(info) {
      // 保存状态数据
      let devInfo = {};
      info.map(item => {
        if (item.typ === 0) {
          // 灯控
          devInfo.status = item.status;
          devInfo.lightId = item.id;
          devInfo.lightSn = item.sn;
        } else if (item.typ === 1) {
          // 空气检测
          devInfo.pm10 = item.pm10;
          devInfo.pm25 = item.pm25;
        } else if (item.typ === 2) {
          // 广播
          devInfo.broadcastStatus = item.status;
          devInfo.broadcastCurrentPlan = item.currentPlan;
        } else if (item.typ === 3 && this.aliPlayer === null) {
          // 摄像头
          this.hasLive = true;
          this.cameraId = item.id;
          devInfo.url = item.url;
          this.s = setTimeout(() => {
            this.setPlayer(devInfo.url); // 先写入播放器容器再调播放器
          }, 0);
        } else if (item.typ === 4) {
          // 充电桩
          devInfo.power = item.status;
        }
      });
      return devInfo;
    },
    setPlayer(url) {
      // 调用播放器
      // eslint-disable-next-line
      this.aliPlayer = new Aliplayer({
        id: "player",
        width: "640",
        height: "480",
        source: url
        // skinRes: 'http://127.0.0.1:5500/lib/aliplayer/defaultSkin' // 使用自己服务器的皮肤
      });
    },
    destoryPlayer() {
      // 销毁播放器
      clearTimeout(this.s);
      // eslint-disable-next-line
      if (this.aliPlayer !== null) {
        this.hasLive = false;
        document.getElementById("player").innerHTML = null;
      }
      this.aliPlayer = null;
      setTimeout(() => {
        // modal关闭后将文本初始化为接入中...
        this.playerContent = "接入中...";
      }, 500);
    }
  }
};
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
  /* height: 484px; */
  flex: 1 0 785px;
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
  flex: 1 0 230px;
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
.ivu-tag {
  cursor: default;
}
.ivu-tag:hover {
}
</style>

