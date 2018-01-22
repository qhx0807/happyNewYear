<template>
    <Menu :active-name="activeName" theme="dark" width="auto" @on-select="selectMenu">
      <div class="layout-logo-left"></div>
      <MenuItem name="Show">
        <Icon type="ios-list-outline" :size="iconSize"></Icon>
        <span class="layout-text">节目列表</span>
      </MenuItem>
      <MenuItem name="Danmu">
        <Icon type="ios-settings" :size="iconSize"></Icon>
        <span class="layout-text">所有弹幕</span>
      </MenuItem>

    </Menu>
</template>

<script>
export default {
  name: 'SidebarMenu',
  data() {
    return {
      activeName: 'CarList',
      iconSize: 18
    }
  },
  created () {},
  methods: {
    selectMenu (e) {
      this.$router.push({ name: e })
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: rgba(255, 255, 255, 0.7);
}
.layout-menu-left {
  background: #464c5b;
  overflow: auto;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
  text-align: center;
  line-height: 30px;
  color: #fff;
}
</style>
