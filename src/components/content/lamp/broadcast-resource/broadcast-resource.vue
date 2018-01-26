// 播报资源管理
<template>
  <div>
    <Tabs type="card" @on-click="toggleTab">
        <TabPane label="音频" icon="music-note" name="1">
        </TabPane>
        <TabPane label="视频" icon="videocamera" name="2">
        </TabPane>
    </Tabs>
    <my-tab></my-tab>
  </div>
</template>

<script>
import MyTab from './my-tab'
import bus from '@/eventBus'
export default {
  name: 'MediaResource',
  components: { MyTab },
  data () {
    return {
      tab: 'audio'     // 初始化数据
    }
  },
  methods: {
    toggleTab ($event) {
      bus.$emit('toggleTab', $event)
    }
  }
}
</script>

<style scoped>

</style>
