export const streetLampContrTypeOptions = [
  { label: '单灯控制', value: 'single' },
  { label: '其他控制', value: 'other' },
  { label: '全部', value: 'all' }
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
  ]
}
