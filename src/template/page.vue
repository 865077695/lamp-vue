/**
 * page组件向上传递pageChange事件
 * 接收总页数_totalPage
 * 当前页_currentPage双向绑定
 */
<template>
<div class="page">
  <ButtonGroup class="item">
    <Button :disabled="isFirst" @click="changePage('first')">首页</Button>
    <Button :disabled="isFirst" @click="changePage('pre')">上一页</Button>
    <Button :disabled="isLast" @click="changePage('next')">下一页</Button>
    <Button :disabled="isLast" @click="changePage('last')">尾页</Button>
  </ButtonGroup>
  <div class="item">
    第 {{_currentPage}} 页，共 {{_totalPage}} 页，跳转到 
    <InputNumber :max="_totalPage" :min="1" v-model="bePage" :step="1" style="width: 50px;" @on-change="countChange"></InputNumber>
     页
  </div>
  <Button @click="changePage('page')">GO</Button>
</div>
  
</template>

<script>

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
      bePage: 1    // 跳往第几页
    }
  },
  methods: {
    changePage (text) {
      if (text === 'first') {
        this.$emit('update:_currentPage', 1)
      } else if (text === 'last') {
        this.$emit('update:_currentPage', this._totalPage)
      } else if (text === 'pre') {
        this.$emit('update:_currentPage', this._currentPage - 1)
      } else if (text === 'next') {
        this.$emit('update:_currentPage', this._currentPage + 1)
      } else if (text === 'page') {
        this.$emit('update:_currentPage', this.bePage)
      } else {
        this.$emit('update:_currentPage', 1)
      }
      this.$emit('pageChange')
    },
    countChange ($event) {
      this.bePage = parseInt($event)
    }
  },
  created () {
    this._currentPage = 1
  },
  computed: {
    isFirst: function () {
      return this._currentPage <= 1
    },
    isLast: function () {
      return this._currentPage >= this._totalPage
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
