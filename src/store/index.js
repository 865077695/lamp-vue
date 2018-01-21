/**
 * vuex,需要在main.js里添加import store from './store'，并注入
 * 使用时，通过this.$store.dispatch('updateCount', 10)触发actions内事件
 * 通过this.$store.commit()触发mutations内事件
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义初始值
const state = {
  count: 0
}

// 相当于基于state的计算属性
const getters = {
  getCount (state) {
    return state.count
  }
}

// 必须同步
const mutations = {
  updateCount: function (state, num) {
    state.count += num
  }
}

// 同步或异步
const actions = {
  updateCount (context, num) {
    context.commit('updateCount', num)
  }
}

export default new Vuex.Store({
  state, mutations, actions, getters
})
