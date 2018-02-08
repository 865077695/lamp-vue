export const streetLampContrTypeOptions = [
  { label: '单灯控制', value: 'single' },
  { label: '其他控制', value: 'other' },
  { label: '全部', value: 'all' }
]

export const polesOptions = [
  { label: '无效', value: 0 },
  { label: '有效', value: 1 }
]

// 设备相关
export const dev = {
  typeOptions: [    // 设备类型
    { label: '灯控', value: 0 },
    { label: '空气检测', value: 1 },
    { label: '广播', value: 2 },
    { label: '摄像头', value: 3 },
    { label: '充电桩', value: 4 }
  ],
  netTypeOptions: [ // 网络类型
    { label: '有线', value: 1 },
    { label: '无线', value: 2 }
  ],
  statusOptions: [  // 设备状态
    { label: '关闭', value: 0 },
    { label: '开启', value: 1 },
    { label: '故障', value: 10 },
    { label: '失联', value: 20 }
  ],
  powerStatus: [    // 充电桩状态
    { label: '待机', value: 0 },
    { label: '充电', value: 1 },
    { label: '充满', value: 3 },
    { label: '预约', value: 5 },
    { label: '故障', value: 10 },
    { label: '离线', value: 20 }
  ],
  lampStatus: [     // 灯控状态
    { label: '关闭', value: 0 },
    { label: '开启', value: 1 },
    { label: '故障', value: 10 },
    { label: '失联', value: 20 }
  ],
  broadcastStatus: [    // 广播状态
    { label: '在线', value: 1 },
    { label: '运行中', value: 2 },
    { label: '锁定', value: 3 },
    { label: '离线', value: 4 },
    { label: '下载', value: 5 }
  ]
}

export const broadcastPlan = {    // 播报计划相关
  resourceType: [  // 播报类型
    { label: '音频', value: 1 },
    { label: '视频', value: 2 },
    { label: '文字', value: 3 }
  ],
  iscycle: [ // 是否循环
    { label: '是', value: 1 },
    { label: '否', value: 2 }
  ],
  status: [ // 计划状态
    { label: '开启', value: 1 },
    { label: '关闭', value: 0 }
  ]
}

export const adminType = [
  { label: '管理员', value: 1 },
  { label: '普通用户', value: 2 }
]

export const adminTyp = [
  { label: '超级管理员', value: 0 },
  { label: '管理员', value: 1 },
  { label: '普通用户', value: 2 }
]

// 分割线 //
// 灯杆状态配置
export const lampStatus = [
  { label: '未使用', value: 0 },
  { label: '正常', value: 1 },
  { label: '故障', value: 10 },
  { label: '失联', value: 20 }
]

// 首页灯杆状态统计配置
export const chartData = [
  { count: 0, name: '路灯总数', bgImg: 'box01', bg: '#1c2438', status: 100 },
  { count: 0, name: '路灯开启数', bgImg: 'box03', bg: '#0e77d0', status: 1 },
  { count: 0, name: '路灯关闭数', bgImg: 'box02', bg: '#19be6b', status: 0 },
  { count: 0, name: '路灯损坏数', bgImg: 'box04', bg: '#da932c', status: 10 },
  { count: 0, name: '路灯失联数', bgImg: 'box05', bg: '#d65b4a', status: 20 }
]

// 消息类型
export const msgStatus = [
  { label: '已看', value: 1 },
  { label: '未看', value: 0 }
]

// 消息类型
export const msgTyp = [
  { label: '入网', value: 0 },
  { label: '失联', value: 1 },
  { label: '故障', value: 2 },
  { label: '开灯', value: 3 },
  { label: '关灯', value: 4 },
  { label: '功率', value: 5 }
]
