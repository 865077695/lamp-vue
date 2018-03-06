<template>
  <div>
    <Form ref="formData" :model="formData" :rules="formRule" :label-width="80">
      <div class="formItem" v-for="item in formItems" :key="item.key" >
      <!-- 普通输入框 -->
        <template v-if="item.typ === 'ipt'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Input v-model="formData[item.key]" :placeholder="item.placeholder" :style="`width:${item.width}px;`"></Input>
          </FormItem>
        </template>
        <!-- 密码 -->
        <template v-if="item.typ === 'psd'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Input v-model="formData[item.key]" type="password" :placeholder="item.placeholder" :style="`width:${item.width}px;`"></Input>
          </FormItem>
        </template>
        <!-- 确认密码 -->
        <template v-if="item.typ === 'confirmpsd'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Input v-model="formData[item.key]" type="password" :placeholder="item.placeholder" :style="`width:${item.width}px;`"></Input>
          </FormItem>
        </template>
        <!-- 数值 -->
        <template v-if="item.typ === 'num'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <InputNumber :max="100" :min="0" v-model="formData[item.key]" :placeholder="item.placeholder" :style="`width:${item.width}px;`"></InputNumber>
          </FormItem>
        </template>
        <!-- 下拉框 -->
        <template v-if="item.typ === 'opt'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Select v-model="formData[item.key]" clearable :placeholder="item.placeholder" @on-change="changeOpt" :style="`width:${item.width}px;`">
                <Option v-for="option in item.options" :key="option.value" :value="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
        </template>
        <!-- 异步radio-->
        <template v-if="item.typ === 'asynCheckbox'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <CheckboxGroup v-model="formData[item.key]" @on-change="radioChange($event, item.key)">
                <Checkbox v-for="opt in polesListOptions1" :label="opt.value" :key="opt.value">{{opt.label}}</Checkbox>
              </CheckboxGroup>
          </FormItem>
        </template>
         <!-- 日期选择器 -->
        <template v-if="item.typ === 'date'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <DatePicker :value="formData[item.key]" @on-change="onChange($event, item.key)" :style="`width:${item.width}px;`" :placeholder="item.placeholder" style="width: 100px" format="yyyy-MM-dd"></DatePicker>
          </FormItem>
        </template>
         <!-- 日期选择器(年月日-时分秒) -->
        <template v-if="item.typ === 'date1'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <DatePicker :value="formData[item.key]" @on-change="onChange($event, item.key)" :style="`width:${item.width}px;`" :placeholder="item.placeholder" style="width: 100px" format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </template>
        <!-- 时间选择器 -->
        <template v-if="item.typ === 'time'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <TimePicker :value="formData[item.key]" @on-change="onChange($event, item.key)" :style="`width:${item.width}px;`" :placeholder="item.placeholder" style="width: 100px" format="HH:mm"></TimePicker>（时：分）
          </FormItem>
        </template>
        <!-- 时间选择器 (时分秒)-->
        <template v-if="item.typ === 'time1'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <TimePicker :value="formData[item.key]" @on-change="onChange($event, item.key)" :style="`width:${item.width}px;`" :placeholder="item.placeholder" style="width: 100px" format="HH:mm:ss"></TimePicker>（时：分：秒）
          </FormItem>
        </template>
        <!-- 文本框 -->
        <template v-if="item.typ === 'text'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Input v-model="formData[item.key]" type="textarea" :style="`width:${item.width}px;`" :rows="4" :placeholder="item.placeholder"></Input>
          </FormItem>
        </template>
      </div>
    </Form>
  </div>
</template>

<script>
import bus from '@/eventBus'
export default {
  name: 'MyForm',
  props: {
    formItems: {
      type: Array,
      default: function () {
        return [
          { label: '名称', key: 'name', typ: 'ipt', placeholder: '输入关键词', width: 100 },
          { label: '名称', key: 'city', typ: 'opt', placeholder: '输入关键词', width: 100, options: [{ label: 'A', value: 1 }] }
        ]
      }
    },
    formData: {
      type: Object,
      default: function () {
        return {
          name: null
        }
      }
    },
    formRule: {
      type: Object,
      default: function () {
        return {
        }
      }
    }
  },
  data () {
    return {
      polesListOptions1: [],
      validatePassword: '',
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    bus.$on('setPolesListOptions1', options => {
      this.polesListOptions1 = options
    })
  },
  methods: {
    handleValida () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$emit('validaok')
        } else {
          this.$Message.error('参数格式有误')
        }
      })
    },
    handleAdd () {
      this.$emit('add')
    },
    onChange ($event, key) {
      this.formData[key] = $event
    },
    changeOpt ($event) {
    },
    radioChange ($event, key) {
    }
  }
}
</script>

<style scoped>
.formItem {
  float: left;
  margin-right: 20px;
  height: 50px;
}
</style>
