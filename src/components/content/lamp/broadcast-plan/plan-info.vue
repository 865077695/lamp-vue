<template>
  <div id="a">
    播报计划详情
    {{$route.query.id}}
    <Row :gutter="8">
      <Col :span="8">
        <Card>
            <p slot="title">
              <Icon type="information-circled"></Icon>
              基本信息
          </p>
            <Form ref="planInfo" :model="planInfo" :rules="ruleValidate" :label-width="80">
              <FormItem label="计划名称" prop="name">
                  <Input v-model="planInfo.name" placeholder="计划名称"></Input>
              </FormItem>
              <FormItem label="开放日期">
                  <Row>
                      <Col span="11">
                          <FormItem prop="startDate">
                              <DatePicker type="date" placeholder="开始日期" v-model="planInfo.startDate" @on-change="dateChange($event,'startDate')" format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                          </FormItem>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <FormItem prop="endDate">
                              <DatePicker type="date" placeholder="结束日期" v-model="planInfo.endDate" @on-change="dateChange($event,'endDate')" format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                          </FormItem>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="开放时间">
                  <Row>
                      <Col span="11">
                          <FormItem prop="playBegin">
                              <TimePicker type="time" placeholder="开始时间" v-model="planInfo.playBegin" @on-change="dateChange($event,'planBegin')" format="HH:mm:ss"></TimePicker>
                          </FormItem>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <FormItem prop="playEnd">
                              <TimePicker type="time" placeholder="结束时间" v-model="planInfo.playEnd" @on-change="dateChange($event,'planEnd')" format="HH:mm:ss"></TimePicker>
                          </FormItem>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="循环播放" prop="iscycle">
                  <i-switch v-model="planInfo.iscycle" :true-value="1" :false-value="0">
                      <span slot="open">是</span>
                      <span slot="close">否</span>
                  </i-switch>
              </FormItem>
              <FormItem label="播报类型" prop="typ">
                  <RadioGroup v-model="planInfo.typ">
                      <Radio :label="1">音频</Radio>
                      <Radio :label="2">视频</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="状态" prop="status">
                  <i-switch v-model="planInfo.status" :true-value="1" :false-value="0">
                      <span slot="open">开</span>
                      <span slot="close">关</span>
                  </i-switch>
              </FormItem>
              <FormItem label="计划描述" prop="notes">
                  <Input v-model="planInfo.notes" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="计划描述"></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" :loading="submiting" @click="handleSubmit('planInfo')">提交</Button>
                  <Button type="ghost" @click="handleReset('planInfo')" style="margin-left: 8px">重置</Button>
              </FormItem>
          </Form>
        </Card>
      </Col>
      <Col :span="8">
        <Card>
            <p slot="title">
              <Icon type="information-circled"></Icon>
              播报资源
              <!-- <p>已选资源：{{}}</p> -->
          </p>
        </Card>
      </Col>
      <Col :span="8">
        <Card>
            <p slot="title">
              <Icon type="information-circled"></Icon>
              设备
          </p>

        </Card>
      </Col>
    </Row>
     
  </div>
</template>

<script>
import http from '@/common/http'
import { formmatDate, formmatTime } from '@/common/_func'
export default {
  name: 'PlanInfo',
  data () {
    return {
      submiting: false,
      id: this.$route.query.id,
      mediaList: [],
      deviceList: [],
      audioList: [],
      videoList: [],
      allDevices: [],
      planInfo: {
        iscycle: null,
        notes: null,
        startDate: null,
        endDate: null,
        playBegin: null,
        playEnd: null,
        name: null
      },
      backupInfo: {},
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        startDate: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        endDate: [
          { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
        ],
        playBegin: [
          { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
        ],
        playEnd: [
          { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getPlanInfo()        // 获取计划详情
    this.getMediaList()       // 获取计划已选媒体资源列表
    this.getDeviceList()      // 获取计划已选设备列表
    this.getSourceList(1)     // 获取全部音频资源列表
    this.getSourceList(2)     // 获取全部视频资源列表
    this.getAllDevices()      // 获取全部设备
  },
  methods: {
    handleSubmit (name) {
      console.log(this.planInfo)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.planUpdate()
        } else {
          this.$Message.error('参数格式有误!')
        }
      })
    },
    handleReset (name) {
      this.planInfo = JSON.parse(JSON.stringify(this.backupInfo))
    },
    dateChange ($event, key) {
      console.log($event)
      this.planInfo[key] = $event
    },
    getPlanInfo () {    // 获取计划详情
      http({ url: 'plan/info', method: 'POST', data: { id: this.id } })
        .then(res => {
          if (res.code === 200) {
            this.planInfo = res.data
            this.backupInfo = JSON.parse(JSON.stringify(this.planInfo)) // 备份数据以作重置
          }
        })
    },
    getMediaList () {   // 获取计划已选媒体资源列表
      http({ url: 'plan/medialist', method: 'POST', data: { id: this.id } })
        .then(res => {
          if (res.code === 200) {
            this.mediaList = res.data
          }
        })
    },
    getDeviceList () {  // 获取计划已选设备列表
      http({ url: 'plan/deviceslist', method: 'POST', data: { id: this.id } })
        .then(res => {
          if (res.code === 200) {
            this.deviceList = res.data
          }
        })
    },
    getSourceList (typ) { // 获取所有媒体资源列表
      http({ url: 'media/list', method: 'POST', data: { typ } })
        .then(res => {
          if (res.code === 200) {
            if (typ === 1) {
              this.audioList = res.data.content
              console.log(this.audioList)
            } else if (typ === 2) {
              this.videoList = res.data.content
              console.log(this.videoList)
            }
          }
        })
    },
    getAllDevices () {    // 获取所有设备列表
      http({ url: 'devices/list', method: 'POST' })
        .then(res => {
          if (res.code === 200) {
            this.allDevices = res.data.content
          }
        })
    },
    addordeletedevices () {   // 计划中追加或删除设备
      http({ url: 'plan/addordeletedevices', method: 'POST', data: { id: this.id, ids: [] } })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('操作成功')
          }
        })
    },
    planUpdate () {     // 提交基本信息修改
      this.submiting = true
      let data = {
        id: this.id,
        name: this.planInfo.name,
        iscycle: this.planInfo.iscycle,
        startDate: formmatDate(this.planInfo.startDate),
        endDate: formmatDate(this.planInfo.endDate),
        playBegin: formmatTime(this.planInfo.playBegin),
        playEnd: formmatTime(this.planInfo.playEnd),
        status: this.planInfo.status,
        typ: this.planInfo.typ,
        notes: this.planInfo.notes
      }
      http({ url: 'plan/update', method: 'POST', data })
        .then(res => {
          this.submiting = false
          if (res.code === 200) {   // 提交成功将backupInfo重置
            this.$Message.success('修改完成!')
            this.backupInfo = JSON.parse(JSON.stringify(this.planInfo))
          }
        })
    }
  }
}
</script>

<style>

</style>
