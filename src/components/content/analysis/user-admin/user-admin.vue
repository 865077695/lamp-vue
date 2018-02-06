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
    return {
      addModal: false,
      adding: false,
      tableLoading: false,
      userSearchItem,
      totalPage: null,
      adminUserFromRule,
      modalTitle: '新增',
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
        password: null,
        confirmPassword: null,
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
          width: 160,
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
                    this.modalTitle = '编辑'
                    this.adminUserAddData = params.row
                    this.addModal = true
                  }
                }
              }, '编辑'),
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
    doValida (formName) { // 触发对应formName的子组件进行表单验证，验证成功之后会调用@valida绑定的函数
      this.$refs[formName].handleValida()
    },
    search () {
      this.searchParams.currentPage = 1
      this.update()
    },
    add () {
      this.modalTitle = '新建'
      this.addModal = true
      this.adminUserAddData = {}
    },
    ok () {
      this.adding = true
      let data = {
        name: this.adminUserAddData.name,
        mobile: this.adminUserAddData.mobile,
        address: this.adminUserAddData.address,
        password: md5(this.adminUserAddData.password),
        confirmPassword: md5(this.adminUserAddData.confirmPassword),
        typ: this.adminUserAddData.typ
      }
      if (this.modalTitle === '新建') {
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
      } else if (this.modalTitle === '编辑') {
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
