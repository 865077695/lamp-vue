<template>
  <div>
    <p style="line-height: 36px;font-size: 16px;">{{lamp}}</p>
    <Table border :columns="columns" :data="deviceList"></Table>

    <Modal v-model="modal" width="360">
        <p slot="header" style="color:#aaa;text-align:center">
            <Icon type="edit"></Icon>
            <span>设备编辑</span>
        </p>
        <div>
            <div>
              <span>设备类型</span>
            </div>
            <div>
              <span>设备编号</span>
            </div>
            <div>
              <span>设备名字</span>
            </div>
            <div>
              <span>当前版本</span>
            </div>
            <div>
              <span>音量</span>
            </div>
        </div>
        <div slot="footer" style="text-align: center;">
            <Button type="success" size="large" :loading="modal_loading" @click="sub">提交</Button>
            <Button type="text" size="large" @click="cancel">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'deviceAdmin',
  data () {
    return {
      modal: false,
      modal_loading: false,
      lamp: '中关村南大街001号灯杆',
      deviceTypeOptions: [
        { label: '空气检测器', value: 'air' },
        { label: '充电桩', value: 'power' },
        { label: '广播', value: 'broadCast' },
        { label: '灯', value: 'light' },
        { label: '湿度检测仪', value: 'shidu' }
      ],
      deviceList: [
        { deviceType: '空气检测器', deviceIndex: '001', deviceName: '空气检测器小A', currentVersion: '1.0', vol: 30 },
        { deviceType: '充电桩', deviceIndex: '001', deviceName: '充电桩', currentVersion: '1.0', vol: 30 },
        { deviceType: '广播', deviceIndex: '001', deviceName: '广播喇叭', currentVersion: '1.0', vol: 30 },
        { deviceType: '灯', deviceIndex: '001', deviceName: '路灯', currentVersion: '1.0', vol: 30 },
        { deviceType: '湿度检测仪', deviceIndex: '001', deviceName: '湿度检测', currentVersion: '1.0', vol: 30 }
      ],
      columns: [
        { title: '设备类型', key: 'deviceType' },
        { title: '设备编号', key: 'deviceIndex' },
        { title: '设备名称', key: 'deviceName' },
        { title: '当前版本', key: 'currentVersion' },
        { title: '音量', key: 'vol' },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal = true
                    console.log(params.row)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ]
    }
  },
  methods: {
    sub () {
      this.modal_loading = true
      // 提交修改/新增
      setTimeout(() => {
        // 提交...
        this.modal_loading = false
        this.modal = false
      }, 1000)
    },
    cancel () {
      this.modal = false
    }
  },
  computed: {
    id: function () {   // 获取路由传入的灯杆id，根据id请求到所属街道及所有设备(deviceList)
      return this.$route.query.id
    }
  }
}
</script>
