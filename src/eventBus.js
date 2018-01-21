/**
 * 创建事件总线
 * 在需要发出事件的地方引入eventBus，bus.$emit('eventName','params')
 * 在需要监听事件的地方引入eventBus，bus.$on('eventName',(params)=>{})  // 监听eventName事件，并接收参数
 */
import Vue from 'vue'
export default new Vue()
