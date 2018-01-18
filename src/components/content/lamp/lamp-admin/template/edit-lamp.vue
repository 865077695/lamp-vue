<template>
  <Row :gutter="30">
    <Col :span="12">
      <div>灯杆编号：</div>
      <div>
        <Input v-model="lampData.lampIndex" size="large" placeholder="灯杆编号"></Input>
      </div>
      <div>灯控编号：</div>
      <div>
        <Input v-model="lampData.lampIndex" size="large" placeholder="灯杆编号"></Input>
      </div>
      <div>充电桩编号：</div>
      <div>
        <Input v-model="lampData.lampIndex" size="large" placeholder="灯杆编号"></Input>
      </div>
      <div>摄像机编号：</div>
      <div>
        <Input v-model="lampData.lampIndex" size="large" placeholder="灯杆编号"></Input>
      </div>
    </Col>
    <Col :span="12">
      <div>灯杆名称：</div>
      <div>
        <Input v-model="lampData.lampIndex" size="large" placeholder="灯杆编号"></Input>
      </div>
      <div>PM2.5传感器编号：</div>
      <div>
        <Input v-model="lampData.lampIndex" size="large" placeholder="灯杆编号"></Input>
      </div>
      <div>广播显示系统编号：</div>
      <div>
        <Input v-model="lampData.lampIndex" size="large" placeholder="灯杆编号"></Input>
      </div>
    </Col>
  </Row>
</template>

<script>
export default {
  props: {
    lampData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
    }
  }
}
</script>
