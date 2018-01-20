<template>
  <div>
    资源id：{{resourceInfo.id}}<br>
    资源名称：{{resourceInfo.name}}<br>
    资源url：{{resourceInfo.url}}<br>
    修改人id：{{resourceInfo.modifyId}}<br>
    修改人名字：{{resourceInfo.user_name}}<br>
    修改时间：{{resourceInfo.modifyTime}}<br>
  </div>
</template>

<script>
export default {
  name: 'ResourceInfo',
  computed: {
    resourceInfo: function () {
      return JSON.parse(this.$route.query.row)
    }
  }
}
</script>