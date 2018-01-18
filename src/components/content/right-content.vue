<template>
<div>
  <TopBar></TopBar>
  <div class="container">
    <router-view/>
  </div>
</div>
  
</template>

<script>
import TopBar from './top-bar'
export default {
  name: 'Main',
  components: { TopBar }
}
</script>

<style scoped>
.router {
  flex: 1;
  overflow: auto;
}
.container {
  padding: 20px;
  flex: 1;
  margin: 20px;
  background: #fff;
}
</style>
