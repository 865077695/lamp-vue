<template>
  <div class="topbar">
    {{$route.name}}
  </div>
</template>

<script>
export default {
  name: 'topbar',
  created () {
    console.log(this.$route)
  }
}
</script>

<style scoped>
.topbar {
  line-height: 50px;
  border-bottom: 1px solid rgb(243, 241, 241);
  padding-left: 20px;
  font-size: 20px;
  background: #fff;
}
</style>
