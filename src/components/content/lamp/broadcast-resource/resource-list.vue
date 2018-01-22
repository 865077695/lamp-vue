<template>
  <div>
    <!-- 资源列表,包含搜索框表格和分页组件 -->
    <div class="_search">
      <my-form class="_form" :formItem="resourceSearchItem" :formData="searchParams"></my-form>
      <Button type="primary" @click="search" :disabled="tableLoading" style="height: 32px">查找</Button>
      <Button type="success" @click="add" style="margin-left: 20px; height: 32px" :disabled="tableLoading">新增</Button>
    </div>

    <Table class="table" :loading="tableLoading" border :columns="columns" :data="mediaList"></Table>
    <MyPage :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="searchParams.currentPage"></MyPage>

    <Modal v-model="addModal" width="600">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>新增</span>
        </p>
        <div>
          <my-form class="_form" :formItem="devResourceAddItem" :formData="resourceAddData" style="height: 80px;"></my-form>
          <!-- <RadioGroup v-model="resourceAddData" :style="'width:' + item.width">
            <Radio :label="opt.fileName" v-for="opt in item.options" :key="opt.fileName"></Radio>
          </RadioGroup> -->
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="primary" size="large" :loading="adding" @click="ok">确认</Button>
          <Button size="large" @click="cancel">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import bus from '@/eventBus'
import MyForm from '@/template/form'
import MyPage from '@/template/page'
export default {
  name: 'MediaList',
  props: {
    resourceSearchItem: Array,
    searchParams: Object,
    mediaList: Array,
    totalPage: Number,
    devResourceAddItem: Array,
    resourceAddData: Object
  },
  components: { MyForm, MyPage },
  data () {
    return {
      tableLoading: true,
      addModal: false,
      adding: false,
      columns: [            // 表单列
        { title: '资源id', key: 'id', width: 100 },
        { title: '资源名称', key: 'name', width: 200 },
        { title: '资源地址', key: 'url', width: 300 },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    console.log('编辑')
                    this.addModal = true
                    bus.$emit('edit')
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log('删除')
                    // this.tableLoading = true
                    // http({ url: '/media/delete', method: 'POST', data: { id: params.row.id, url: params.row.url } })
                    //   .then(res => {
                    //     if (res.code === 200) {
                    //       this.$Message.success('删除资源成功')
                    //       this.updateData()
                    //     } else {
                    //       this.$Message.warning('删除失败')
                    //     }
                    //   })
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    search () {
      this.$emit('search')
    },
    add () {
      this.addModal = true
      this.$emit('add')
    },
    ok () {
      this.$emit('ok')
    },
    cancel () {

    },
    pageChange () {
      this.$emit('pageChange')
    }
  },
  created () {
    console.log(this.devResourceAddItem)
    bus.$on('updateBegin', () => {
      this.tableLoading = true
    })
    bus.$on('updateEnd', () => {
      this.tableLoading = false
    })
    bus.$on('addBegin', () => {
      this.adding = true
    })
    bus.$on('addEnd', () => {
      this.adding = false
      this.addModal = false
    })
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
