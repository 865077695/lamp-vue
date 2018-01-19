/**
 * 多数页面需要用到的搜索条
 * 接收一个prop格式如下：
 * [
 *  { label: '设备类型', key: 'typ', width: '100px', placeholder: '请选择', options: devTypeOptions },
 * ]
 * 参数说明：label为标签名，key为最终存放值得键名，width为ipt宽度，若属性包含options，则为下拉框。
 * 向上传递事件search，事件参数为表单值
 */
<template>
  <div>
    <div class="g-search">
      <div v-for="(item, index) in searchContent" :key="item.label" class="g-item">
        <div class="g-label">
          {{item.label}}：
        </div>
        <div class="g-ipt">
          <template v-if="item.options">
            <Select v-model="item.value" style="width:200px">
                <Option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</Option>
            </Select>
          </template>
          <template v-else>
            <Input v-model="item.value" :placeholder="item.placeholder" :style="'width:' + item.width"></Input>
          </template>
        </div>
      </div>
      <!-- <my-form  :searchContent="searchContent"></my-form> -->
      <Button type="primary" @click="search">查找</Button>
      <Button type="success" @click="addModal = true" style="margin-left: 20px;">新增</Button>

      <Modal v-model="addModal" width="360">
          <p slot="header">
              <Icon type="information-circled"></Icon>
              <span>新增</span>
          </p>
          <div style="text-align:center">
              <!-- <my-form></my-form> -->
          </div>
          <div slot="footer" style="text-align: center">
              <Button type="primary" size="large" :loading="modal_loading" @click="ok">确认</Button>
              <Button size="large" :loading="modal_loading" @click="cancel">取消</Button>
          </div>
      </Modal>
    </div>
  </div>
</template>

<script>
// import MyForm from '@/template/form';
export default {
  name: 'BroadcastDevice',
  // components: { MyForm },
  props: {
    searchContent: {
      type: Array,
      default: function () {
        return [
          { label: '', key: '', width: '', placeholder: '' },
          { label: '', key: '', width: '', placeholder: '' },
          { label: '', key: '', width: '', placeholder: '' },
          { label: '', key: '', width: '', placeholder: '' }
        ]
      }
    }
  },
  data () {
    return {
      addModal: false,
      modal_loading: false
    }
  },
  methods: {
    search () {
      const params = {}
      this.searchContent.map((item) => {
        params[item.key] = item.value
      })
      console.log(params)
      // 向上传递事件
      this.$emit('search', params)
    },
    ok () {
      this.$emit('add')
      this.addModal = false
    },
    cancel () {
      this.addModal = false
    }
  }
}
</script>

<style scoped>
.g-search {
  display: flex;
  justify-content: flex-start;
}
.g-item {
  display: flex;
  justify-content: flex-start;
}
.g-label {
  line-height: 32px;
}
.g-ipt {
  margin-right: 30px;
}
</style>
