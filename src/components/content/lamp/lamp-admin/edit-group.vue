<template>
  <div>
    <MyGroup></MyGroup>
  </div>
</template>

<script>
import MyGroup from './template/group'
export default {
  name: 'editGroup',
  components: { MyGroup },
  created () {
    console.log(this.$route.query.id)
  }
}
</script>