<template>
    <div>
      <div class="layout-logo-left"></div>
      <template >
        <Tooltip :class="{active:active==0}" content="节目列表" placement="right">
          <Button style="width: 60px;margin-left: 0px;padding:10px 0;" type="text"  @click="selectMenu(4,'Show')">
              <Icon :size="22" :color="iconColor" type="ios-list-outline"></Icon>
          </Button>
        </Tooltip>
      </template>
      <template >
        <Tooltip :class="{active:active==0}" content="所有弹幕" placement="right">
          <Button style="width: 60px;margin-left: 0px;padding:10px 0;" type="text"  @click="selectMenu(4,'Danmu')">
              <Icon :size="22" :color="iconColor" type="ios-settings"></Icon>
          </Button>
        </Tooltip>
      </template>
    </div>
</template>

<script>
export default {
  name: 'SidebarMenu',
  data() {
    return {
      activeName: 'CarList',
      iconColor: '#ffffff',
      active: -1,
    }
  },
  created () {},
  methods: {
    selectMenu (index, e) {
      this.active = index
      this.$router.push({ name: e })
    }
  }
}
</script>

<style lang="less" scoped>
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
.active {
  background: #363e4f;
}
</style>
