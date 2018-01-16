<template>
<div class="page">
  <ButtonGroup class="item">
    <Button :disabled="isFirst" @click="changePage('first')">首页</Button>
    <Button :disabled="isFirst" @click="changePage('pre')">上一页</Button>
    <Button :disabled="isLast" @click="changePage('next')">下一页</Button>
    <Button :disabled="isLast" @click="changePage('last')">尾页</Button>
  </ButtonGroup>
  <div class="item">
    第 {{currentPage}} 页，共 {{totalPage}} 页，跳转到 
    <InputNumber :max="_totalPage" :min="1" v-model="bePage" :step="1" style="width: 50px;" @on-change="countChange"></InputNumber>
     页
  </div>
  <Button @click="changePage('page')">GO</Button>
</div>
  
</template>

<script>
/**
 * page组件向上传递pageChange事件
 * 接收总页数
 * 当前页数自行维护
 */
export default {
  name: 'page',
  props: {
    _currentPage: {
      default: 1,
      type: Number
    },
    _totalPage: {
      default: 10,
      type: Number
    }
  },
  data () {
    return {
      bePage: null,
      currentPage: this._currentPage,
      totalPage: this._totalPage
    }
  },
  methods: {
    changePage (text) {
      if (text === 'first') {
        this.currentPage = 1
      } else if (text === 'last') {
        this.currentPage = this.totalPage
      } else if (text === 'pre') {
        this.currentPage = this.currentPage - 1
      } else if (text === 'next') {
        this.currentPage = this.currentPage + 1
      } else if (text === 'page') {
        this.currentPage = this.bePage
      } else {
        this.currentPage = 1
      }
      this.$emit('pageChange', this.currentPage)
    },
    countChange ($event) {
      console.log($event)
      this.bePage = parseInt($event)
      console.log(this.bePage)
    }
  },
  computed: {
    isFirst: function () {
      return this.currentPage === 1
    },
    isLast: function () {
      return this.currentPage === this.totalPage
    }
  }
}
</script>

<style scoped>
.page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  line-height: 32px;
}
.item {
  margin-right: 20px;
}
</style>
