// 日志列表、搜索和列表查看
<template>
  <div>
    <div class="_search">
      <my-form class="_form" :formItem="logSearchItem" :formData="searchParams"></my-form>
      <Button type="primary" @click="search" :disabled="tableLoading" style="height: 32px">查找</Button>
    </div>
    <div class="table">
      <Table class="table" :loading="tableLoading" border :columns="columns" :data="logList"></Table>
      <MyPage :_totalPage="totalPage" @pageChange="pageChange" :_currentPage.sync="searchParams.currentPage"></MyPage>
    </div>

</div>
</template>

<script>
import { logSearchItem } from '@/data/formItems'
import MyForm from '@/template/form'
import MyPage from '@/template/page'
import http from '@/common/http'
export default {
  name: 'Log',
  components: { MyForm, MyPage },
  data () {
    return {
      tableLoading: false,
      logSearchItem,
      totalPage: null,
      searchParams: {
        currentPage: 1
      },
      logList: [],
      columns: [
        { title: '日志id', key: 'id', width: 100 },
        { title: '操作人', key: 'username', width: 100 },
        { title: '日志类型', key: 'typ', width: 100 },
        { title: '操作时间', key: 'time' },
        { title: '请求url', key: 'url' },
        { title: '操作人ip', key: 'ip' }
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
    pageChange () {
      this.update()
    },
    update () {
      this.tableLoading = true
      const data = {
        username: this.searchParams.username,
        beginTime: this.searchParams.beginTime,
        endTime: this.searchParams.endTime,
        currentPage: this.searchParams.currentPage
      }
      http({ url: '/logs/queryLogsList', method: 'POST', data })
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            this.logList = res.data.result
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
