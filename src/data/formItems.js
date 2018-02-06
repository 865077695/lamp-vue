import { dev, broadcastPlan, adminType, msgStatus } from './options'
// , polesOptions
export const devAddItem = [ // 添加设备表单项
  { label: '灯杆Id', key: 'pole_id', width: '100px', typ: 'ipt' },
  { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: dev.typeOptions, typ: 'opt' },
  { label: '设备名称', key: 'name', width: '100px', placeholder: '设备名称', typ: 'ipt' },
  { label: '网络类型', key: 'net_type', width: '100px', placeholder: '请选择', options: dev.netTypeOptions, typ: 'opt' },
  { label: '设备状态', key: 'name', width: '100px', placeholder: '请选择', options: dev.statusOptions, typ: 'opt' },
  { label: '设备编号', key: 'sn', width: '100px', placeholder: '设备编号', typ: 'ipt' },
  { label: '音量', key: 'volume', width: '100px', placeholder: '音量', typ: 'ipt' },
  { label: '设备版本', key: 'version', width: '100px', placeholder: '设备版本', typ: 'ipt' }
]

export const resourceSearchItem = [ // 资源列表查询条件项
  { label: '资源名称', key: 'name', width: '100px', typ: 'ipt' }
]

export const devResourceAddItem = [  // 新增资源表单项
  { label: '资源名称', key: 'name', width: '300px', typ: 'ipt' },
  { label: '资源列表', key: 'file_name', width: '300px', typ: 'radio' }
]

export const planSearchItem = [ // 播报计划列表查询项
  { label: '计划名称', key: 'name', width: '100px', typ: 'ipt' },
  { label: '开始日期', key: 'startDate', width: '100px', typ: 'date' },
  { label: '结束日期', key: 'endDate', width: '100px', typ: 'date' },
  { label: '开始时间', key: 'playBegin', width: '100px', typ: 'time' },
  { label: '结束时间', key: 'playEnd', width: '100px', typ: 'time' },
  { label: '播报类型', key: 'typ', width: '100px', options: broadcastPlan.resourceType, typ: 'opt' },
  { label: '是否循环', key: 'iscycle', width: '100px', options: broadcastPlan.iscycle, typ: 'opt' },
  { label: '状态', key: 'status', width: '100px', options: broadcastPlan.status, typ: 'opt' }
]

export const planAddItem = [  // 新增播报计划表单项
  { label: '计划名称', key: 'name', width: '300px', typ: 'ipt' },
  { label: '开始日期', key: 'startDate', width: '300px', typ: 'date' },
  { label: '结束日期', key: 'endDate', width: '300px', typ: 'date' },
  { label: '开始时间', key: 'playBegin', width: '300px', typ: 'time' },
  { label: '结束时间', key: 'playEnd', width: '300px', typ: 'time' },
  { label: '播报类型', key: 'typ', width: '300px', options: broadcastPlan.resourceType, typ: 'opt' },
  { label: '是否循环', key: 'iscycle', width: '300px', options: broadcastPlan.iscycle, typ: 'opt' },
  { label: '状态', key: 'status', width: '300px', options: broadcastPlan.status, typ: 'opt' },
  { label: '描述', key: 'notes', width: '300px', typ: 'ipt' }
]

export const logSearchItem = [  // 日志列表查询参数项
  { label: '操作人员', key: 'userId', width: '100px', typ: 'ipt', placeholder: '操作人员编号' },
  { label: '开始日期', key: 'beginTime', width: '200px', typ: 'date' },
  { label: '结束日期', key: 'endTime', width: '200px', typ: 'date' }
]

// 分割线 //
// 查询街道列表查询项
export const streetListSearchItem = [
  { label: '街道名称', key: 'name', width: 100, typ: 'ipt', placeholder: '输入关键词' }
]

// 添加街道表单数据项
export const addStreetItem = [
  { label: '街道名称', key: 'name', width: 100, typ: 'ipt', placeholder: '输入街道名' },
  { label: '心跳间隔', key: 'heartbeat', width: 100, typ: 'ipt', placeholder: '单位秒' },
  { label: '纬度', key: 'latitude', width: 100, typ: 'ipt', placeholder: '纬度' },
  { label: '经度', key: 'longitude', width: 100, typ: 'ipt', placeholder: '经度' },
  { label: '能耗上报时间', key: 'reporttime', width: 100, typ: 'time', placeholder: '能耗上报时间' },
  // { label: '控制类型', key: 'typ', width: 100, typ: 'opt', placeholder: '' },
  { label: '定损功率', key: 'power', width: 100, typ: 'ipt', placeholder: '单位：瓦' }
]

// 添加街道表单验证规则
export const addStreetFormRule = {
  name: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  heartbeat: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  latitude: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  longitude: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  reporttime: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  power: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ]
}

// 查询灯杆列表查询项
export const lampListSearchItem = [
  { label: '灯杆编号', key: 'poleSn', width: 100, typ: 'ipt', placeholder: '灯杆编号' },
  { label: '灯杆名称', key: 'name', width: 100, typ: 'ipt', placeholder: '灯杆名称' }
  // { label: '灯杆状态', key: 'status', width: 100, typ: 'opt', placeholder: '灯杆状态', options: polesOptions }
]

// 添加灯杆表单数据项
export const addLampItem = [
  { label: '灯杆编号', key: 'poleSn', width: 200, typ: 'ipt', placeholder: '' },
  { label: '灯杆名称', key: 'name', width: 200, typ: 'ipt', placeholder: '' },
  { label: '纬度', key: 'latitude', width: 200, typ: 'ipt', placeholder: '' },
  { label: '经度', key: 'longitude', width: 200, typ: 'ipt', placeholder: '' }
  // { label: '状态', key: 'status', width: 100, typ: 'opt', placeholder: '', options: polesOptions }
]

// 添加灯杆表单验证数据项
export const addLampFormRule = {
  poleSn: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  latitude: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  longitude: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ]
}

// 查询灯杆分组列表查询项
export const lampGroupSearchItem = [
  { label: '', key: '', width: 100, typ: 'ipt', placeholder: '' }
]

// 添加分组设置表单数据项
export const addLampGroupItem = [
  { label: '分组名称', key: 'name', width: 539, typ: 'ipt', placeholder: '分组名称' },
  { label: '开灯时间', key: 'timeOn', width: 160, typ: 'time', placeholder: '开灯时间' },
  { label: '关灯时间', key: 'timeOff', width: 160, typ: 'time', placeholder: '关灯时间' },
  { label: '备注', key: 'notes', width: 539, typ: 'text', placeholder: '备注' },
  { label: '所控灯杆', key: 'poles', width: 100, typ: 'asynCheckbox', placeholder: '所控灯杆' }
]

// 添加分组表单验证数据项
export const addLampGroupFormRule = {
  name: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  timeOn: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  timeOff: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  poles: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback, source, options) {
        var errors = []
        if (value.length === 0) {
          // eslint-disable-next-line
          callback('请选择所控灯杆')
        }
        callback(errors)
      }
    }
  ]
}

// 查询设备列表查询项
export const devSearchItem = [
  { label: '', key: '', width: 100, typ: 'ipt', placeholder: '' }
]

// 添加设备表单项
export const addDevItem = [
  { label: '设备类型', key: 'typ', width: 200, typ: 'opt', placeholder: '设备类型', options: dev.typeOptions },
  { label: '设备名称', key: 'name', width: 200, typ: 'ipt', placeholder: '设备名称' },
  // { label: '网络类型', key: 'net_type', width: 200, typ: 'opt', placeholder: '网络类型' },
  // { label: '设备状态', key: 'status', width: 200, typ: 'opt', placeholder: '设备状态', options: dev.statusOptions },
  { label: '设备编号', key: 'sn', width: 200, typ: 'ipt', placeholder: '设备编号' },
  { label: '音量', key: 'volume', width: 200, typ: 'num', placeholder: '音量' },
  { label: '设备版本', key: 'version', width: 200, typ: 'ipt', placeholder: '设备版本' },
  { label: '扩展属性', key: 'url', width: 200, typ: 'text', placeholder: '扩展属性' }
]

// 添加设备表单验证数据项
export const addDevFormRule = {
  typ: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback, source, options) {
        var errors = []
        if (value === null) {
          // eslint-disable-next-line
          callback('该项为必填项')
        }
        callback(errors)
      }
    }
  ],
  name: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  status: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback, source, options) {
        var errors = []
        if (value.length === 0) {
          // eslint-disable-next-line
          callback('该项为必填项')
        }
        callback(errors)
      }
    }
  ],
  sn: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ]
}

// 查询消息列表查询项
export const msgListSearchItem = [
  { label: '开始时间', key: 'beginTime', width: 100, typ: 'date', placeholder: '' },
  { label: '结束时间', key: 'endTime', width: 100, typ: 'date', placeholder: '' },
  { label: '街道id', key: 'streetId', width: 100, typ: 'ipt', placeholder: '' },
  { label: '灯杆编号', key: 'poleSn', width: 100, typ: 'ipt', placeholder: '' },
  { label: '灯杆名称', key: 'poleName', width: 100, typ: 'ipt', placeholder: '' },
  { label: '消息类型', key: 'typ', width: 100, typ: 'opt', placeholder: '', options: msgStatus },
  { label: '设备类型', key: 'deviceTyp', width: 100, typ: 'opt', placeholder: '', options: dev.typeOptions },
  { label: '消息状态', key: 'status', width: 100, typ: 'ipt', placeholder: '' }
]

// 查询时间段能耗查询项
export const powerSearchItem = [
  { label: '开始时间', key: 'beginTime', width: 200, typ: 'date', placeholder: '' },
  { label: '结束时间', key: 'endTime', width: 200, typ: 'date', placeholder: '' },
  { label: '街道Id', key: 'street_id', width: 100, typ: 'opt', placeholder: '' },
  { label: '灯杆Id', key: 'pole_id', width: 100, typ: 'opt', placeholder: '' }
]

// 查询媒体列表查询项
export const mediaListSearchItem = [
  { label: '名字', key: 'name', width: 100, typ: 'ipt', placeholder: '资源名称' }
]

// 查询计划列表查询项
export const planListSearchItem = [
  { label: '计划名称', key: 'name', width: 100, typ: 'ipt', placeholder: '计划名称' },
  { label: '开始日期', key: 'startDate', width: 140, typ: 'date', placeholder: '开始日期' },
  { label: '结束日期', key: 'endDate', width: 140, typ: 'date', placeholder: '结束日期' },
  { label: '开始时间', key: 'playBegin', width: 100, typ: 'time', placeholder: '开始时间' },
  { label: '结束时间', key: 'playEnd', width: 100, typ: 'time', placeholder: '结束时间' },
  { label: '播报类型', key: 'typ', width: 100, typ: 'opt', placeholder: '播报类型', options: broadcastPlan.resourceType },
  { label: '是否循环', key: 'iscycle', width: 100, typ: 'opt', placeholder: '是否循环', options: broadcastPlan.iscycle },
  { label: '状态', key: 'status', width: 100, typ: 'opt', placeholder: '状态', options: broadcastPlan.status }
]

// 新增计划表单项
export const addPlanItem = [
  { label: '计划名称', key: 'name', width: 200, typ: 'ipt', placeholder: '计划名称' },
  { label: '开始日期', key: 'startDate', width: 200, typ: 'date1', placeholder: '开始日期' },
  { label: '结束日期', key: 'endDate', width: 200, typ: 'date1', placeholder: '结束日期' },
  { label: '开始时间', key: 'playBegin', width: 200, typ: 'time1', placeholder: '开始时间' },
  { label: '结束时间', key: 'playEnd', width: 200, typ: 'time1', placeholder: '结束时间' },
  { label: '播报类型', key: 'typ', width: 200, typ: 'opt', placeholder: '播报类型', options: broadcastPlan.resourceType },
  { label: '是否循环', key: 'iscycle', width: 200, typ: 'opt', placeholder: '是否循环', options: broadcastPlan.iscycle },
  { label: '描述', key: 'notes', width: 200, typ: 'text', placeholder: '描述' },
  { label: '状态', key: 'status', width: 200, typ: 'opt', placeholder: '状态', options: broadcastPlan.status }
]

export const addPlanFormRule = {
  name: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  startDate: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  endDate: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  playBegin: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  playEnd: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  typ: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback, source, options) {
        var errors = []
        if (value.length === 0) {
          // eslint-disable-next-line
          callback('该项为必填项')
        }
        callback(errors)
      }
    }
  ],
  iscycle: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback, source, options) {
        var errors = []
        if (value.length === 0) {
          // eslint-disable-next-line
          callback('该项为必填项')
        }
        callback(errors)
      }
    }
  ],
  notes: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  status: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback, source, options) {
        var errors = []
        if (value.length === 0) {
          // eslint-disable-next-line
          callback('该项为必填项')
        }
        callback(errors)
      }
    }
  ]
}

export const userSearchItem = [ // 管理员查询名下用户参数项
  { label: '账号', key: 'name', width: '100px', typ: 'ipt', placeholder: '账号' },
  { label: '手机', key: 'mobile', width: '100px', typ: 'ipt', placeholder: '手机' },
  { label: '地址', key: 'address', width: '100px', typ: 'ipt', placeholder: '地址' }
]

export const adminUserAddItem = [   // 新增管理员表单项
  { label: '用户名', key: 'name', width: '300', typ: 'ipt', placeholder: '用户名' },
  { label: '手机号', key: 'mobile', width: '300', typ: 'ipt', placeholder: '手机号' },
  { label: '地址', key: 'address', width: '300', typ: 'ipt', placeholder: '地址' },
  { label: '密码', key: 'password', width: '300', typ: 'psd', placeholder: '密码' },
  { label: '确认密码', key: 'confirmPassword', width: '300', typ: 'confirmpsd', placeholder: '确认密码' },
  { label: '用户类型', key: 'typ', width: '300', typ: 'opt', placeholder: '用户类型', options: adminType }
]

export const adminUserFromRule = {
  name: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  mobile: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback) {
        var errors = []
        if (value === '') {
          // eslint-disable-next-line
          callback('该项为必填项')
        } else if (!(/^1[0-9]{10}$/.test(value))) {
          // eslint-disable-next-line
          callback('请填写正确的手机号')
        }
        callback(errors)
      }
    }
  ],
  address: [
    { required: true, message: '该项为必填项', trigger: 'blur' }
  ],
  typ: [
    {
      required: true,
      trigger: 'blur',
      validator (rule, value, callback, source, options) {
        var errors = []
        if (value.length === 0) {
          // eslint-disable-next-line
          callback('请选择用户类型')
        }
        callback(errors)
      }
    }
  ]
}
