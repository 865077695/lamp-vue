<template>
  <div>
    <Row :gutter="8">
      <Col :span="2" class="label">
        <span>分组名称：</span>
      </Col>
      <Col :span="9">
        <Input v-model="group.name" placeholder="输入分组名称"></Input>
      </Col>
    </Row>
    <div class="spar"></div>
    <Row :gutter="8">
      <Col :span="2" class="label">
        <span>备注：</span>
      </Col>
      <Col :span="9">
        <Input v-model="group.bck" placeholder="输入备注信息"  type="textarea" :rows="4"></Input>
      </Col>
    </Row>
    <div class="spar"></div>
    <Row :gutter="8">
      <Col :span="2" class="label">
        <span>灯杆选择：</span>
      </Col>
      <Col :span="9">
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
          <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
        </div>
        <CheckboxGroup v-model="group.lamps" @on-change="checkAllGroupChange">
          <Checkbox v-for="option in groupOptions" :key="option.value" :label="option.label" v-model="option.value" :true-value="option.value" :false-value="''"></Checkbox>
        </CheckboxGroup>
      </Col>
    </Row>
    {{group.lamps}}
    <div class="spar"></div>
    <Row :gutter="8">
      <Col :span="22" offset="2">
        <Button type="primary" @click="save" style="width: 100px;margin-right: 50px;">保存</Button>
        <Button style="width: 100px;">取消</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'group',
  props: {
    group: {
      type: Object,
      default: () => ({
        name: '',
        bck: '',
        lamps: ['a', 'b', 'c']
      })
    }
  },
  data () {
    return {
      indeterminate: true,
      checkAll: false,
      groupOptions: [
        { label: '1号灯', value: 'a' },
        { label: '2号灯', value: 'b' },
        { label: '3号灯', value: 'c' },
        { label: '4号灯', value: 'd' },
        { label: '5号灯', value: 'e' },
        { label: '6号灯', value: 'f' }
      ]
    }
  },
  methods: {
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.group.lamps = ['a', 'b', 'c', 'd', 'e', 'f']
      } else {
        this.group.lamps = []
      }
    },
    checkAllGroupChange (data) {
      if (data.length === 3) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    save () {
    }
  }
}
</script>

<style scoped>
.label {
  line-height: 32px;
  text-align: right;
}
.spar {
  padding: 10px;
}
</style>
