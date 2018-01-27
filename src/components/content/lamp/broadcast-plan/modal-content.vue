<template>
  <Form ref="planInfo" :modal="planInfo" :label-width="80">
      <FormItem label="计划名称" prop="name">
          <Input v-model="planInfo.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="计划描述" prop="notes">
          <Input v-model="planInfo.notes"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="开始日期" prop="startDate">
          <DatePicker type="date" placeholder="开始日期" format="yyyy-MM-dd" :value="planInfo.startDate"></DatePicker>
      </FormItem>
        <FormItem label="结束日期" prop="endDate">
            <!-- <DatePicker type="date" placeholder="结束日期" format="yyyy-MM-dd" v-model="planInfo.endDate"></DatePicker> -->
            <DatePicker :value="planInfo.endDate" type="date" format="yyyy-MM-dd HH:mm" placeholder="结束日期"></DatePicker>
        </FormItem>
      <FormItem label="开始时间" prop="playBegin">
          <TimePicker type="time" placeholder="开始时间" format="HH:mm" v-model="planInfo.time"></TimePicker>
      </FormItem>
      <FormItem label="结束时间" prop="playEnd">
          <TimePicker type="time" placeholder="结束时间" format="HH:mm" v-model="planInfo.time"></TimePicker>
      </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'ModalContent',
  props: {
    planInfo: Object
  },
  data () {
    return {
      mediaType: 1,
      searchMedia: null
    }
  },
  methods: {
    mediaTypeChange ($event) {
    }
  },
  created () {
  }
}
</script>