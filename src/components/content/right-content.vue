<template>
<div>
  <TopBar class="topbar"></TopBar>
  <div class="container">
    <keep-alive :include="['StreetAdmin', 'BroadcastPlan', 'LampGroup', 'StreetAdmin']">
      <router-view/>
    </keep-alive>
  </div>
</div>
  
</template>

<script>
import TopBar from './top-bar'
export default {
  name: 'RightContent',
  components: { TopBar }
}
</script>

<style scoped>
.topbar {
  line-height: 50px;
  border-bottom: 1px solid rgb(243, 241, 241);
  padding-left: 20px;
  font-size: 20px;
  background: #fff;
  flex: 0 1 50px;
}
.container {
  padding: 20px;
  flex: 1;
  margin: 20px;
  background: #fff;
}
</style>
