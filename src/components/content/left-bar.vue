<template>
  <Menu theme="dark" :active-name="$route.path" @on-select="changeMenu">
    <div class="logo">
      <img src="@/assets/logo.png" width="50%">
    </div>
    <MenuItem name="/home" style="font-size: 16px;margin-bottom:20px">
    <Icon type="home"></Icon>
    首页
    </MenuItem>
    <MenuGroup v-for="items in leftBarItems" :key="items.path" :title="items.title">
      <MenuItem v-for="item in items.children" :key="item.path" :name="items.path+'/'+item.path" v-if="!('addr_admin' === $store.state.roleCode && item.addr_admin_hidden)">
      <Icon :type="item.icon"></Icon>
      {{item.title}}
      </MenuItem>
    </MenuGroup>
    <div class="avatar" style="color:#fff">
      <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
      <div style="text-align:center;padding-right: 20px;">
        <p>{{userInfo.name}}</p>
        <p style="color: rgb(167, 171, 187)">{{userInfo.mobile}}</p>
      </div>
      <div class="quit" @click="quit">
        <Icon type="power"></Icon>
      </div>
    </div>
  </Menu>
</template>

<script>
import { appRoutes } from "../../router/routes";
import http from "@/common/http";
export default {
  name: "LeftBar",
  data() {
    return {
      userInfo: {
        name: null,
        address: null,
        mobile: null
      }
    };
  },
  computed: {
    leftBarItems: () => {
      console.log(appRoutes);
      const _leftBarItems = appRoutes.filter(item => {
        return item.children.length > 1;
      });
      console.log(_leftBarItems)
      return _leftBarItems
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    changeMenu(path) {
      this.$router.push({ path });
    },
    getUserInfo() {
      // TODO
      http({ url: "/users/userselfInfo" }).then(res => {
        if (res.code === 200) {
          this.userInfo = res.data;
          this.$store.commit("setRoleCode", res.data.roleCode);
        } else {
          this.$Message.error("获取用户数据失败");
        }
      });
    },
    quit() {
      http({ url: "/users/logout" }).then(res => {
        if (res.code === 200) {
          this.$router.push({ path: "/sign" });
        }
      });
    }
  }
};
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
  cursor: pointer;
}
</style>
