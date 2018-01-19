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
 * 向上传递事件search，事件参数为表单值
 */
<template>
  <div>
      <div v-for="(item, index) in formItem" :key="item.label" class="g-item">
        <div class="g-label">
          {{item.label}}：
        </div>
        <div class="g-ipt">
          <template v-if="item.options">
            <Select v-model="formData[item.key]" :style="'width:' + item.width">
                <Option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="formData[item.key]" :placeholder="item.placeholder" :style="'width:' + item.width"></Input>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    formItem: Array,
    formData: Object
  }
}
</script>

<style scoped>
.g-item {
  display: flex;
  justify-content: flex-start;
}
.g-label {
  width: 100px;
  line-height: 32px;
}
.g-ipt {
  margin-right: 30px;
}
</style>