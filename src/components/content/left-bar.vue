<template>
  <Menu theme="dark" :active-name="$route.path" @on-select="changeMenu">
    <div class="logo">
      <img src="@/assets/logo.png" width="50%">
      <p class="title">智能路灯管理系统</p>
    </div>
    <MenuItem name="/home" style="font-size: 16px;margin-bottom:20px">
      <Icon type="home"></Icon>
      首页
    </MenuItem>
    <MenuGroup v-for="items in leftBarItems" :key="items.path" :title="items.title">
      <MenuItem v-for="item in items.children" :key="item.path" :name="items.path+'/'+item.path">
        <Icon :type="item.icon"></Icon>
        {{item.title}}
        <Badge count="10" style="float: right;"></Badge>
      </MenuItem>
    </MenuGroup>
    <div class="avatar" style="color:#fff">
      <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large"/>
      <div>
        <p>科技园物业</p>
        <p>135****5678</p>
      </div>
      <div class="quit">
        <Icon type="power"></Icon>
      </div>
    </div>
  </Menu>
</template>

<script>
import { appRoutes } from '../../router/routes'
export default {
  name: 'LeftBar',
  computed: {
    leftBarItems: () => {
      return appRoutes.filter(item => {
        return item.children.length > 1
      })
    }
  },
  methods: {
    changeMenu (path) {
      this.$router.push({ path })
    }
  }
}
</script>

<style scoped>
img {
  width: 50%;
  padding: 10px;
}
.logo {
  color: rgb(236, 233, 233);
  margin-bottom: 20px;
  padding-left: 20px;
}
.title {
  font-size: 16px;
  color: rgb(189, 186, 183);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #384054;
  color: #fff;
  border-left: 3px solid #2d8cf0;
  border-right: 0;
}
.avatar {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 30px;
  width: 100%;
}
.quit {
  align-self: center;
}
</style>
