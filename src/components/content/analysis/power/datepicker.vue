<template>
  <div>
    <Cascader :data="data" v-model="value1" @on-change="change"></Cascader>    
  </div>
</template>

<script>
import bus from '@/eventBus'
import { powerDate } from '@/common/_func'
export default {
  name: 'YM',
  methods: {
    change ($event) {
      if($event.length === 0){      // 为空时，能耗为0
        $event = ['2000','01']
      }
      let data = this.formatterDate($event)
      bus.$emit('powerDataChange', data)
    },
    formatterDate (date) {
      return date[0] + '-' + date[1]
    }
  },
  created () {
    this.value1 = ['2018', '02']
    let data = this.formatterDate(this.value1)
    bus.$emit('powerDataChange', data)
  },
  data () {
    return {
      value1: null,
      data: powerDate()
    }
  }
}
</script>

<style scoped>

</style>

