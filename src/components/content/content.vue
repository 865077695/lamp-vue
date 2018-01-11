<template>
  <div id="content">
    <LeftBar class="leftBar"></LeftBar>
    <RightContent class="RightContent"></RightContent>
  </div>
</template>

<script>
import LeftBar from './left-bar'
import RightContent from './right-content'
export default {
  name: 'BroadcastAdmin',
  components: { LeftBar, RightContent }
}
</script>

<style scoped>
#content {
  height: 100%;
  display: flex;
}
.leftBar {
  flex: 0 1 200px;
}
.RightContent{height: 100%}
</style>
