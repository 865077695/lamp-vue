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
}
.leftBar {
  flex: 0 1 200px;
}
.RightContent {
  flex: 1;
  background: rgb(248, 246, 246);
  display: flex;
  flex-direction: column
}
</style>
