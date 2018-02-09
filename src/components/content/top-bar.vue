<template>
  <div class="topbar">
    <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem v-for="breadcrumb in breadcrumbList" :to="breadcrumb.path" :key="breadcrumb.label">{{breadcrumb.label}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import bus from '@/eventBus'
import breadcrumbOptions from '@/router/breadcrumb'
export default {
  name: 'topbar',
  data () {
    return {
      breadcrumbList: null
    }
  },
  created () {
    let name = this.$route.name
    this.breadcrumbList = breadcrumbOptions[name]
    bus.$on('routerChange', (name) => {
      this.breadcrumbList = breadcrumbOptions[name]
    })
  }
}
</script>

<style scoped>

</style>
