<template>
  <div class="sign">
    <h2 style="text-align: center;line-height: 50px;">登录您的主页</h2>
    <Form ref="userData" :model="userData" :rules="ruleInline">
        <FormItem prop="name">
            <Input type="text" v-model="userData.name" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="userData.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('userData')" long>登录</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import http from '@/common/http'
import md5 from 'blueimp-md5'
export default {
  name: 'sign',
  data () {
    return {
      userData: {
        name: '',
        password: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.userData))
          data.password = md5(data.password)
          http({ url: '/users/login', method: 'POST', data })
            .then(res => {
              if (res.code === 200) {   // 登录成功，跳转至首页
                this.$router.push({ path: '/' })
              } else {
              }
            })
        } else {
          this.$Message.error('失败!')
        }
      })
    }
  }
}
</script>

<style scoped>
.sign {
  width: 300px;
  margin: 0 auto;
  padding: 300px 0;
}
</style>
