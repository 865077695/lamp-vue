// 日志列表、搜索和列表查看
<template>
  <div>
    <div class="_search">
      <my-form
      class="searchForm"
        ref="searchForm"
        :formItems="userSearchItem"
        :formData="searchParams"
        @validaok="searchOk"
        ></my-form>
      <Button @click="doValida('searchForm')" type="primary" style="height: 32px;">搜索</Button>
      <Button @click="add" type="success" style="height: 32px; margin-left: 10px">添加</Button>
    </div>
    <div class="table">
      <Table class="table" :loading="tableLoading" border :columns="columns" :data="userList"></Table>
      <MyPage :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="searchParams.currentPage"></MyPage>
    </div>

    <Modal v-model="addModal" width="500">
      <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>{{modalTitle}}</span>
      </p>
      <div style="height:400px">
        <my-form
            :formRule="adminUserFromRule"
            ref="addForm"
            :formItems="adminUserAddItem"
            :formData="adminUserAddData"
            @validaok="addOk"
          ></my-form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" :loading="adding" @click="doValida('addForm')">提交</Button>
        <Button type="default" size="large" @click="cancel">取消</Button>
      </div>
    </Modal>

    <Modal v-model="editpsdModal" width="400">
      <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>修改密码</span>
      </p>
      <div style="height:100px">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="密码" prop="passwd">
              <Input type="password" style="width: 250px;" v-model="formCustom.passwd"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="passwdCheck">
              <Input type="password" style="width: 250px;" v-model="formCustom.passwdCheck"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" :loading="adding" @click="handleSubmit('formCustom')">提交</Button>
        <Button type="default" size="large" @click="cancelEditPsd">取消</Button>
      </div>
    </Modal>

</div>
</template>

<script>
import { userSearchItem, adminUserAddItem, adminUserFromRule } from '@/data/formItems'
import { getStatusText } from '@/common/_func'
import { adminTyp } from '@/data/options'
import MyForm from '@/template/my-form'
import MyPage from '@/template/page'
import http from '@/common/http'
import md5 from 'blueimp-md5'
export default {
  name: 'UserAdmin',
  components: { MyForm, MyPage },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      editpsdModal: false,
      addModal: false,
      adding: false,
      tableLoading: false,
      userSearchItem,
      totalPage: null,
      adminUserFromRule,
      modalTitle: '新增',
      editId: null,
      formCustom: {
        passwd: '',
        passwdCheck: ''
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      searchParams: {
        currentPage: 1,
        name: null,
        mobile: null,
        address: null
      },
      adminUserAddItem,
      userList: [],
      adminUserAddData: {
        name: null,
        mobile: null,
        address: null,
        typ: null
      },
      columns: [
        { title: '用户id', key: 'id', width: 100 },
        { title: '账号', key: 'name', width: 100 },
        { title: '手机号', key: 'mobile', width: 130 },
        { title: '地址', key: 'address' },
        {
          title: '用户类型',
          key: 'typ',
          render: (h, params) => {
            let text = getStatusText(params.row.typ, adminTyp)
            return text
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalTitle = '修改人员信息'
                    this.adminUserAddData = params.row
                    this.addModal = true
                  }
                }
              }, '修改信息'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editpsdModal = true
                    this.editId = params.row.id
                  }
                }
              }, '修改密码'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要删除这条数据吗?',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.delete(params.row.id)
                  }
                }
              }, [h('Button', {
                style: {
                  margin: '0 10px'
                },
                props: {
                  type: 'error',
                  placement: 'top',
                  size: 'small'
                }
              }, '删除')])
            ])
          }
        }
      ]
    }
  },
  created () {
    this.update()
  },
  methods: {
    searchOk () { // 搜索数据格式验证通过
      this.searchParams.currentPage = 1 // 搜索时重置页码为1
      this.update()
    },
    addOk () {
      this.ok()
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.passwordEdit()
        } else {
          this.$Message.error('参数格式有误!')
        }
      })
    },
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    search () {
      this.searchParams.currentPage = 1
      this.update()
    },
    add () {
      this.modalTitle = '添加人员'
      this.addModal = true
      this.adminUserAddData = {}
    },
    ok () {
      this.adding = true
      let data = {
        name: this.adminUserAddData.name,
        mobile: this.adminUserAddData.mobile,
        address: this.adminUserAddData.address,
        typ: this.adminUserAddData.typ
      }
      if (this.modalTitle === '添加人员') {
        http({ url: '/admin/users/usersAdd', method: 'POST', data })
          .then(res => {
            this.adding = false
            this.addModal = false
            if (res.code === 200) {
              this.$Message.success('新建成功')
            } else {
              this.$Message.warning('失败')
            }
            this.update()
          })
      } else if (this.modalTitle === '修改人员信息') {
        data.id = this.adminUserAddData.id
        http({ url: '/admin/users/usersEdit', method: 'POST', data })
          .then(res => {
            this.adding = false
            this.addModal = false
            if (res.code === 200) {
              this.$Message.success('修改成功')
            } else {
              this.$Message.warning('失败')
            }
            this.update()
          })
      }
    },
    cancel () {
      this.addModal = false
      this.formCustom = {
        passwd: null,
        passwdCheck: null
      }
    },
    cancelEditPsd () {
      this.editpsdModal = false
    },
    pageChange () {
      this.update()
    },
    update () {
      this.tableLoading = true
      const data = {
        name: this.searchParams.name,
        mobile: this.searchParams.mobile,
        address: this.searchParams.address,
        currentPage: this.searchParams.currentPage
      }
      http({ url: '/admin/users/usersList', method: 'POST', data })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.userList = res.data.result
            this.totalPage = res.data.totalPage
          }
        })
    },
    delete (id) {
      http({ url: '/admin/users/delUser', params: { userId: id } })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('删除成功')
            this.update()
          }
        })
    },
    passwordEdit () {
      const data = {
        id: this.editId,
        newPassword: md5(this.formCustom.passwd),
        confirmPassword: md5(this.formCustom.passwdCheck)
      }
      http({ url: '/admin/users/passwordEdit', method: 'POST', data })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('修改成功')
            this.editpsdModal = false
            this.formCustom = {
              passwd: null,
              passwdCheck: null
            }
          }
        })
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
._search {
  display: flex;
  justify-content: flex-start;
}
._form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-between;
}
</style>
