// 面包屑导航配置
export default {
  '首页': [],
  '街道管理': [
    { label: '街道管理', path: '/lamp/street-admin' }
  ],
  '街道信息编辑': [
    { label: '街道管理', path: '/lamp/street-admin' },
    { label: '街道信息编辑', path: 'street-edit' }
  ],
  '灯杆管理': [
    { label: '街道管理', path: '/lamp/street-admin' },
    { label: '灯杆管理', path: '/lamp-admin' }
  ],
  '分组设置': [
    { label: '街道管理', path: '/lamp/street-admin' },
    { label: '分组设置', path: '/lamp-group' }
  ],
  '设备管理': [
    { label: '街道管理', path: '/lamp/street-admin' },
    { label: '灯杆管理', path: '/lamp-admin' },
    { label: '设备管理', path: '/device-admin' }
  ],
  '播报资源管理': [
    { label: '播报资源管理', path: '/lamp/broadcast-resource' }
  ],
  '播报计划管理': [
    { label: '播报计划管理', path: '/lamp/broadcast-plan' }
  ],
  '计划详情': [
    { label: '播报计划管理', path: '/lamp/broadcast-plan' },
    { label: '计划编辑', path: '/plan-info' }
  ],
  '能耗统计': [
    { label: '能耗统计', path: '/user-analysis/power' }
  ],
  '日志统计': [
    { label: '日志统计', path: '/user-analysis/log' }
  ],
  '报警消息': [
    { label: '报警消息', path: '/user-analysis/alert-notice' }
  ],
  '人员管理': [
    { label: '人员管理', path: '/user-analysis/user-admin' }
  ]
}
