import { dev, broadcastPlan } from './options'
export const devSearchItem = [  // 播报设备列表查询条件项
  { label: '灯杆Id', key: 'pole_id', width: '100px', placeholder: '灯杆Id' },
  { label: '设备Id', key: 'id', width: '100px', placeholder: '设备Id' },
  { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: dev.typeOptions },
  { label: '网络类型', key: 'net_type', width: '100px', placeholder: '请选择', options: dev.netTypeOptions },
  { label: '设备状态', key: 'status', width: '100px', placeholder: '请选择', options: dev.statusOptions },
  { label: '设备名称', key: 'name', width: '100px', placeholder: '设备名称' }
]

export const devAddItem = [ // 添加设备表单项
  { label: '灯杆Id', key: 'pole_id', width: '100px' },
  { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: dev.typeOptions },
  { label: '设备名称', key: 'name', width: '100px', placeholder: '设备名称' },
  { label: '网络类型', key: 'net_type', width: '100px', placeholder: '请选择', options: dev.netTypeOptions },
  { label: '设备状态', key: 'name', width: '100px', placeholder: '请选择', options: dev.statusOptions },
  { label: '设备编号', key: 'sn', width: '100px', placeholder: '设备编号' },
  { label: '音量大小', key: 'volume', width: '100px', placeholder: '音量大小' },
  { label: '设备版本', key: 'version', width: '100px', placeholder: '设备版本' }
]

export const resourceSearchItem = [ // 资源列表查询条件项
  { label: '资源名称', key: 'name', width: '100px' }
]

export const devResourceAddItem = [  // 新增资源表单项
  { label: '资源名称', key: 'name', width: '300px' },
  { label: '资源列表', key: 'resource', width: '300px', options: broadcastPlan.resourceType }
]

export const planSearchItem = [ // 播报计划列表查询项

]

export const planAddItem = [  // 新增播报计划表单项

]
