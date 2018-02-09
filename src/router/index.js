import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import iView from 'iview'
import bus from '@/eventBus'
// Vue.use(iView)
Vue.use(Router)

const router = new Router({ routes })

export default router

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  bus.$emit('routerChange', to.name)
  next()
})

router.afterEach((to) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
