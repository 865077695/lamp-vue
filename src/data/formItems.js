import { dev, broadcastPlan, adminType } from './options'
export const devSearchItem = [  // 播报设备列表查询条件项
  { label: '灯杆Id', key: 'pole_id', width: '100px', placeholder: '灯杆Id', typ: 'ipt' },
  { label: '设备Id', key: 'id', width: '100px', placeholder: '设备Id', typ: 'ipt' },
  { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: dev.typeOptions, typ: 'opt' },
  { label: '网络类型', key: 'net_type', width: '100px', placeholder: '请选择', options: dev.netTypeOptions, typ: 'opt' },
  { label: '设备状态', key: 'status', width: '100px', placeholder: '请选择', options: dev.statusOptions, typ: 'opt' },
  { label: '设备名称', key: 'name', width: '100px', placeholder: '设备名称', typ: 'ipt' }
]

export const devAddItem = [ // 添加设备表单项
  { label: '灯杆Id', key: 'pole_id', width: '100px', typ: 'ipt' },
  { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: dev.typeOptions, typ: 'opt' },
  { label: '设备名称', key: 'name', width: '100px', placeholder: '设备名称', typ: 'ipt' },
  { label: '网络类型', key: 'net_type', width: '100px', placeholder: '请选择', options: dev.netTypeOptions, typ: 'opt' },
  { label: '设备状态', key: 'name', width: '100px', placeholder: '请选择', options: dev.statusOptions, typ: 'opt' },
  { label: '设备编号', key: 'sn', width: '100px', placeholder: '设备编号', typ: 'ipt' },
  { label: '音量大小', key: 'volume', width: '100px', placeholder: '音量大小', typ: 'ipt' },
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

export const userSearchItem = [ // 管理员查询名下用户参数项
  { label: '账号', key: 'name', width: '100px', typ: 'ipt', placeholder: '账号' },
  { label: '手机', key: 'mobile', width: '100px', typ: 'ipt', placeholder: '手机' },
  { label: '地址', key: 'address', width: '100px', typ: 'ipt', placeholder: '地址' }
]

export const adminUserAddItem = [   // 新增管理员表单项
  { label: '用户名', key: 'name', width: '300px', typ: 'ipt', placeholder: '用户名' },
  { label: '手机号', key: 'mobile', width: '300px', typ: 'ipt', placeholder: '手机号' },
  { label: '地址', key: 'address', width: '300px', typ: 'ipt', placeholder: '地址' },
  { label: '密码', key: 'password', width: '300px', typ: 'ipt', placeholder: '密码' },
  { label: '确认密码', key: 'confirmPassword', width: '300px', typ: 'ipt', placeholder: '确认密码' },
  { label: '用户类型', key: 'typ', width: '300px', typ: 'opt', placeholder: '用户类型', options: adminType }
]
