<template>
  <div>
    设备详情
    设备id： {{devInfo.id}}<br>
    设备名字： {{devInfo.name}}<br>
    网络类型： {{devInfo.net_type}}<br>
    灯杆Id {{devInfo.pole_id}}<br>
    灯杆名字： {{devInfo.pole_name}}<br>
    灯杆编号： {{devInfo.pole_sn}}<br>
    设备编号： {{devInfo.sn}}<br>
    设备状态： {{devInfo.status}}<br>
    设备类型： {{devInfo.typ}}<br>
    当前版本： {{devInfo.version}}<br>
    音量： {{devInfo.volume}}<br>
    <br>
    <br>
    <br>
    播报计划：
    <div v-for="plan in planList" :key="plan.id">
      计划名字： {{plan.name}}
      计划描述： {{plan.note}}
      开始日期： {{plan.startDate}}
      结束日期： {{plan.endDate}}
      每日开始时间： {{plan.planBegin}}
      每日结束时间： {{plan.planEnd}}
      是否循环： {{plan.iscycle}}
    </div>

  </div>
</template>

<script>
import { dev } from '@/data/options'
import http from '@/common/http'
export default {
  name: 'DeviceInfo',
  data () {
    return {
      devInfo: JSON.parse(this.$route.query.row),
      typeOptions: dev.typeOptions,
      netTypeOptions: dev.netTypeOptions,
      statusOptions: dev.statusOptions,
      planList: []              // 存放播报计划列表
    }
  },
  created () {
    http({ url: 'devices/plan' })
      .then(res => {
        this.planList = res.data
      })
  }
}
</script>