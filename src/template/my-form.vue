<template>
  <div>
    <Form ref="formData" :model="formData" :rules="formRule" :label-width="80">
      <!-- 普通输入框 -->
      <div class="formItem" v-for="item in formItems" :key="item.key" >
        <template v-if="item.typ === 'ipt'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Input v-model="formData[item.key]" :placeholder="item.placeholder" :style="`width:${item.width}px;`"></Input>
          </FormItem>
        </template>
        <!-- 下拉框 -->
        <template v-if="item.typ === 'opt'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Select v-model="formData[item.key]" :placeholder="item.placeholder" :style="`width:${item.width}px;`">
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
                <Checkbox v-for="opt in polesListOptions1" :label="opt.value" :key="opt.value"></Checkbox>
              </CheckboxGroup>
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
        <!-- 文本框 -->
        <template v-if="item.typ === 'text'">
          <FormItem 
            :label="item.label" 
            :prop="item.key"
            >
              <Input v-model="formData[item.key]" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注..."></Input>
          </FormItem>
        </template>
      </div>
     
        <!-- <FormItem :label="formItems[0].label" :prop="formItems[0].key">
          <Input v-model="formData.name" placeholder="Enter your name"></Input>
        </FormItem> -->
        <!-- <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="City" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="Date">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
        </FormItem> -->
        <!-- <Button type="primary" @click="handleSearch('formData')">搜索</Button>
        <Button type="success" @click="handleAdd('formData')">新增</Button> -->
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
      console.log(this.formData)
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
      console.log(this.formData)
    },
    radioChange ($event, key) {
      console.log($event)
      console.log(key)
      this.formData[key].push({ id: $event })
      console.log(this.formData)
    }
  }
}
</script>

<style scoped>
.formItem {
  float: left;
  margin-right: 20px;
}
</style>
