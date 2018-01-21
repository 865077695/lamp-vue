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
  name: 'Main',
  components: { LeftBar, RightContent }
}
</script>

<style scoped>
#content {
  height: 100%;
  display: flex;
  overflow: hidden;
}
.leftBar {
  width: 240px;
  flex: 0 0 240px;
  height: 100%;
}
.RightContent {
  background: rgb(248, 246, 246);
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}
</style>
