<template>
  <div id="a">
    <Tag checkable color="green" style="margin-bottom: 10px;">{{title}}</Tag>
    <div v-if="$route.query.id !== null">
      <!-- 计划id: {{$route.query.id}} -->
    </div>
    <Row :gutter="8">
      <Form ref="planInfo" :model="planInfo" :rules="ruleValidate" :label-width="80">
      <Col :span="8">
        <Card style="height:600px;">
            <p slot="title">
              <Icon type="information-circled"></Icon>
              基本信息
          </p>
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
        </Card>
      </Col>
      <Col :span="8">
        <Card style="height:600px;">
            <p slot="title">
              <Icon type="information-circled"></Icon>
              播报资源
          </p>
          <!-- <p>已选资源：{{}}</p> -->
            <RadioGroup v-model="typ" @on-change="mediaTypeChange">
              <Radio :label="1">音频</Radio>
              <Radio :label="2">视频</Radio>
            </RadioGroup>
            <Card style="margin-top: 20px;max-height: 400px;overflow:auto">
              <p slot="title">
                <Icon type="ios-folder-outline"></Icon>
                资源列表
              </p>
              <div>
                <div v-if="sourceList.length === 0">请先在上方选择资源类型</div>
                <template v-if="sourceList.length>0">
                  <FormItem prop="mediaids" label="媒体资源">
                    <RadioGroup v-model="mediaids">
                      <Radio :label="item.id" v-for="item in sourceList" :key="item.id">{{item.name}}</Radio>
                    </RadioGroup>
                  </FormItem>
                </template>
                <template v-if="typ && sourceList.length === 0">
                  <div>
                    无资源，请先通过FTP上传资源
                  </div>
                </template>
              </div>
              
            </Card>
        </Card>
      </Col>
      <Col :span="8">
        <Card style="height:600px;">
            <p slot="title">
              <Icon type="information-circled"></Icon>
              播报设备
          </p>
          <div v-if="deviceList.length === 0"></div>
          <template>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;overflow:auto;max-height:450px;">
                <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup class="allevList" v-model="planInfo.deviceids" @on-change="checkAllGroupChange">
                <Checkbox v-for="item in allDevices" :key="item.id" :label="item.id" style="display: block">{{item.name}}</Checkbox>
            </CheckboxGroup>
          </template>

        </Card>
      </Col>
      <Col :offset="18" :span="6" style="text-align: right;margin-top: 20px">
          <FormItem>
              <Button type="primary" :loading="submiting" @click="handleSubmit('planInfo')">提交</Button>
              <Button type="ghost" @click="handleReset('planInfo')" style="margin-left: 8px">取消</Button>
          </FormItem>
      </Col>
    </Form>
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
      typ: null,          // 资源类型
      mediaList: [],      // 已选媒体资源
      deviceList: [],     // 已选设备
      allDevices: [],     // 所有设备(接收后台数据，包含各种字段)
      sourceList: [],     // 所有资源（两种类型都存在此字段内）
      mediaids: null,
      videoBackup: null,  // 备份音频选中项
      audioBackup: null,  // 备份视频选中项
      planInfo: {
        id: null,
        name: null,
        iscycle: 0,
        startDate: null,
        endDate: null,
        playBegin: null,
        playEnd: null,
        status: 0,
        typ: null,
        notes: null,
        mediaids: null,
        deviceids: []
      },
      indeterminate: false,
      checkAll: false,
      ruleValidate: {
        name: [
          { required: true, message: '该项为必填项', trigger: 'blur' }
        ],
        startDate: [
          { required: true, type: 'date', message: '该项为必填项', trigger: 'change' }
        ],
        endDate: [
          { required: true, type: 'date', message: '该项为必填项', trigger: 'change' }
        ],
        typ: [
          {
            required: true,
            trigger: 'change',
            validator (rule, value, callback) {
              var errors = []
              if (value === '') {
                // eslint-disable-next-line
                callback('该项为必填项')
              }
              callback(errors)
            }
          }
        ],
        mediaids: [
          {
            required: true,
            trigger: 'change',
            validator (rule, value, callback) {
              var errors = []
              if (value === '') {
                // eslint-disable-next-line
                callback('该项为必填项')
              }
              callback(errors)
            }
          }
        ],
        deviceids: [
          {
            required: true,
            trigger: 'change',
            validator (rule, value, callback) {
              var errors = []
              if (value === '') {
                // eslint-disable-next-line
                callback('该项为必填项')
              }
              callback(errors)
            }
          }
        ],
        playBegin: [
          { required: true, type: 'date', message: '该项为必填项', trigger: 'change' }
        ],
        playEnd: [
          { required: true, type: 'date', message: '该项为必填项', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.id !== null) {
      this.getPlanInfo()        // 获取计划详情
      this.getMediaList()       // 获取计划已选媒体资源列表
      this.getDeviceList()      // 获取计划已选设备列表
    }
    this.getAllDevices()      // 获取全部设备
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addPlanBySource()
        } else {
          this.$Message.error('参数格式有误!')
        }
      })
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.planInfo.deviceids = this._allDevices
      } else {
        this.planInfo.deviceids = []
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this._allDevices.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    handleReset (name) {
      this.$router.push({path: '/lamp/broadcast-plan'})
    },
    dateChange ($event, key) {    // 格式化日期时间
      this.planInfo[key] = $event
    },
    mediaTypeChange () {            // 修改/添加资源时切换资源类型
      if (this.typ === 1) { // 音频
        this.videoBackup = this.mediaids
        this.mediaids = this.audioBackup
      } else if (this.typ === 2) {
        this.audioBackup = this.mediaids
        this.mediaids = this.videoBackup
      }
      // this.mediaids = null
      this.getSourceList(this.typ)
    },
    getPlanInfo () {    // 获取计划详情
      http({ url: 'plan/info', method: 'POST', data: { id: this.id } })
        .then(res => {
          if (res.code === 200) {
            this.planInfo = res.data
          }
        })
    },
    getMediaList () {   // 获取计划已选媒体资源列表
      http({ url: 'plan/medialist', method: 'POST', data: { id: this.id } })
        .then(res => {
          if (res.code === 200) {
            this.mediaids = res.data[0].id
            if (res.data[0].typ === 1) {  // 选中的是音频,备份一下
              this.audioBackup = res.data[0].id
            } else {
              this.videoBackup = res.data[0].id
            }
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
            this.sourceList = res.data.content
          }
        })
    },
    getAllDevices () {    // 获取所有设备列表
      http({ url: 'devices/list', method: 'POST', data: { is_page: 1, typ: 2 } })
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
    addPlanBySource () {     // 提交基本信息修改
      this.submiting = true
      let data = {
        name: this.planInfo.name,
        iscycle: this.planInfo.iscycle,
        startDate: formmatDate(this.planInfo.startDate),
        endDate: formmatDate(this.planInfo.endDate),
        playBegin: formmatTime(this.planInfo.playBegin),
        playEnd: formmatTime(this.planInfo.playEnd),
        status: this.planInfo.status,
        typ: this.planInfo.typ,
        notes: this.planInfo.notes,
        mediaids: String(this.mediaids),
        deviceids: String(this.planInfo.deviceids)
      }
      if (this.$route.query.id !== null) {      // 如果不是新增,
        data.id = this.id
      }
      http({ url: 'plan/addplanbysource', method: 'POST', data })
        .then(res => {
          this.submiting = false
          if (res.code === 200) {   // 提交成功将backupInfo重置
            this.$Message.success('完成!')
            this.backupInfo = JSON.parse(JSON.stringify(this.planInfo))
            this.$router.push({ path: '/lamp/broadcast-plan' })
          } else if (res.code === 400) {
            this.$Message.error('参数填写不完整')
          }
        })
    }
  },
  computed: {
    _allDevices () {
      return this.allDevices.map(item => {
        return item.id
      })
    },
    title () {
      if (this.$route.query.id !== null) {
        return '播报计划修改'
      } else {
        return '播报计划新增'
      }
    }
  }
}
</script>

<style>
.allevList {
  max-height: 454px;
  overflow: auto;
}
</style>
