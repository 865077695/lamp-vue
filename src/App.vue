<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/* 全局样式 */
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.anchorBL {
  display: none;
}

.darkColor {
  color: rgb(139, 131, 131);
}
/* 播放器样式 */
#player .prism-ErrorMessage {
  height: 0;
  width: 0;
  display: none;
}
#player .prism-auto-stream-selector {
  height: 0;
  width: 0;
  display: none;
}
.formItem {
  height: auto !important;
}
</style>
