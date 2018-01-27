// 日志列表、搜索和列表查看
<template>
  <div>
    <div class="_search">
      <my-form class="_form" :formItem="userSearchItem" :formData="searchParams"></my-form>
      <Button type="primary" @click="search" :disabled="tableLoading" style="height: 32px">查找</Button>
      <Button type="success" @click="add" :disabled="tableLoading" style="height: 32px;margin-left: 20px">新建</Button>
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
      <div>
        <my-form class="_form" :formItem="adminUserAddItem" :formData="adminUserAddData" style="height: 230px;"></my-form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" :loading="adding" @click="ok">确认</Button>
        <Button size="large" @click="cancel">取消</Button>
      </div>
    </Modal>


</div>
</template>

<script>
import { userSearchItem, adminUserAddItem } from '@/data/formItems'
import { getStatusText } from '@/common/_func'
import { adminType } from '@/data/options'
import MyForm from '@/template/form'
import MyPage from '@/template/page'
import http from '@/common/http'
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
      modalTitle: '新增',
      searchParams: {
        currentPage: 1
      },
      adminUserAddItem,
      adminUserAddData: {},
      userList: [],
      columns: [
        { title: '用户id', key: 'id', width: 100 },
        { title: '账号', key: 'name', width: 100 },
        { title: '手机号', key: 'mobile', width: 130 },
        { title: '地址', key: 'address' },
        {
          title: '用户类型',
          key: 'typ',
          render: (h, params) => {
            let text = getStatusText(params.row.typ, adminType)
            return text
          }
        },
        {
          title: '操作',
          key: 'action',
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
              }, '编辑')
            ])
          }
        }
        // { title: '智能单灯数', key: 'single' },
        // { title: '回路终端数', key: 'loop' }
      ]
    }
  },
  created () {
    this.update()
  },
  methods: {
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
      if (this.modalTitle === '新建') {
        http({ url: '/admin/users/usersAdd', method: 'POST', data: this.adminUserAddData })
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
        let data = {
          id: this.adminUserAddData.id,
          name: this.adminUserAddData.name,
          mobile: this.adminUserAddData.mobile,
          address: this.adminUserAddData.address,
          // password: this.adminUserAddData.password,
          // confirmPassword: this.adminUserAddData.confirmPassword,
          typ: this.adminUserAddData.typ
        }
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
