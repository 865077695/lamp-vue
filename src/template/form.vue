/**
 * 多数页面需要用到的表单组件
 * 接收两个prop格式如下：
 * 1.用来生成表单项
 * [
 *  { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: devTypeOptions },
 * ]
 * 2.用来存储表单数据
 * formData: Object
 * 参数说明：label为标签名，key为最终存放值的键名，width为ipt宽度，若属性包含options，则为下拉框。
 */
<template>
  <div>
      <div v-for="(item, index) in formItem" :key="item.label" class="g-item">
        <div class="g-label">
          {{item.label}}：
        </div>
        <div class="g-ipt">
          <template v-if="item.typ === 'opt'">
            <Select v-model="formData[item.key]" :style="'width:' + item.width" clearable>
                <Option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</Option>
            </Select>
          </template>
          <template v-else-if="item.typ==='ipt'">
            <Input v-model="formData[item.key]" :placeholder="item.placeholder" :style="'width:' + item.width"></Input>
          </template>
          <template v-else-if="item.typ === 'date'">
            <DatePicker v-model="formData['_'+item.key]" type="datetime" @on-change="dateChange($event,item.key)" format="yyyy-MM-dd" :placeholder="item.placeholder" :style="'width:' + item.width"></DatePicker>
          </template>
          <template v-else-if="item.typ === 'time'">
            <TimePicker v-model="formData[item.key]" format="HH:mm:ss" :placeholder="item.placeholder" :style="'width:' + item.width"></TimePicker>
          </template>
          <template v-else-if="item.typ === 'radio'">
            <RadioGroup v-model="formData[item.key]" :style="'line-height: 32px;width:' + item.width">
              <Radio :label="opt.fileName" v-for="opt in options" :key="opt.fileName"></Radio>
            </RadioGroup>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import bus from '@/eventBus'
export default {
  name: 'Form',
  props: {
    formItem: Array,
    formData: Object
  },
  data () {
    return {
      options: null
    }
  },
  created () {
    bus.$on('getOptions', options => {
      this.options = options
    })
  },
  methods: {
    dateChange ($event, key) {
      this.formData[key] = $event
    }
  }
}
</script>

<style scoped>
.g-item {
  display: flex;
}
.g-label {
  width: 60px;
  line-height: 32px;
}
.g-ipt {
  margin-right: 30px;
}
</style>