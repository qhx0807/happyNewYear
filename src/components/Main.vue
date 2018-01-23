<template>
    <div class="main">
        <div class="sidebar-menu-con"  :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto',}">
			<SidebarMenu v-show="!hideMenuText"></SidebarMenu>
			<SidebarMenuShrink v-show="hideMenuText"></SidebarMenuShrink>
		</div>
		<div class="main-header-con" :style="{paddingLeft: hideMenuText ? '60px' : '200px'}">
			<Button type="text" @click="toggleClick">
				<Icon type="navicon" size="32"></Icon>
			</Button>
			<div class="avatar">
				<Poptip trigger="hover"  placement="bottom-end" width="100">
					<Avatar size="large" :style="{background: avatarColor}">{{ username }}</Avatar>
					<div slot="title">欢迎您，{{username}}</div>
					<div slot="content" class="poptip-content">
						<ul>
							<li><Icon type="ios-locked" size="16"></Icon>&nbsp;&nbsp;修改密码</li>
							<li @click="loginOut"><Icon type="power" size="14"></Icon>&nbsp;退出登录</li>
						</ul>
					</div>
				</Poptip>
			</div>
      <div class="menu-href">
        <!-- <a href="http://qhxing.site/page/danmu.html" target="_blank">大屏弹幕</a> -->
        <a href="http://118.24.25.115/page/vote.html" target="_blank">大屏投票</a>
      </div>
		</div>
		<div class="main-page-con" :style="{paddingLeft: hideMenuText ? '60px' : '200px'}">
			<div class="breadcrumb-con">
				<Breadcrumb>
					<BreadcrumbItem>首页</BreadcrumbItem>
					<BreadcrumbItem>{{breadcrumbname}}</BreadcrumbItem>
				</Breadcrumb>
				<div class="page" :style="mainContentHeight">
          <router-view ></router-view>
				</div>
				<div class="copy">
            2018 &copy;Happy New Year
        </div>
			</div>
		</div>
    </div>
</template>

<script>
import SidebarMenu from './main_components/SidebarMenu.vue'
import SidebarMenuShrink from './main_components/SidebarMenuShrink.vue'
export default {
	name: "Main",
	components:{
		SidebarMenu,
		SidebarMenuShrink,
	},
	data() {
		return {
			hideMenuText:true,
			username:'admin',
			avatarColor:'#00a2ae',
			breadcrumbname:'节目列表',
			mainContentHeight:{
				minHeight:'',
			},
			editData:{
				password:'',
			},
			editPassModal:false,
			ruleEdit:{
				password:[
                    { required: true, message: '密码不能为空', trigger: 'blur' }
				],
			},
			modal_loading:false,
		}
	},
	watch:{
		"$route":function(to, from){
			this.activeName = to.name
			switch(to.name){
				case "Show":
					this.breadcrumbname = "节目列表"
					break
				case "Danmu":
					this.breadcrumbname = "所有弹幕"
          break
        case "ShowInfo":
          this.breadcrumbname = "编辑信息"
          break
			}
		}
	},
	created(){
		let winH = document.body.clientHeight;
		let winW = document.body.clientWidth;

		//this.menuStyleObj.height = winH + 'px';
		this.mainContentHeight.minHeight = winH - 169 +'px'

	},
	methods: {
		toggleClick(){
			this.hideMenuText = !this.hideMenuText
		},
		loginOut(){
			this.$Modal.confirm({
				title: '登出提示',
				content: '<p>确认退出当前账号吗？</p>',
				onOk: () => {
					window.sessionStorage.clear()
					this.$router.replace({name:'Login'})
					this.$Message.info('已退出')
				}
			})
		}
	}
};
</script>

<style lang="less" scoped>
.main {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #f0f0f0;
	.sidebar-menu-con{
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
		z-index: 1010;
		background: rgb(73, 80, 96);
		//transition: width .2s linear;
	}
	&-header-con{
		transition: padding .2s linear;
    box-sizing: border-box;
    position: fixed;
    display: block;
    padding-left: 200px;
    width: 100%;
    height: 60px;
		z-index: 1000;
		background-color: #ffffff;
		box-shadow: 0 2px 1px 1px rgba(100,100,100,.1);
		.avatar{
			float: right;
			margin-right: 40px;
			margin-top: 11px;
		}
		.poptip-content{
			ul{
				li{
					height: 35px;
					line-height: 35px;
					cursor: pointer;
					&:hover{
						color: black;
					}
				}
			}
    }
    .menu-href{
      float: right;
      height: 60px;
      line-height: 60px;
      margin-right: 12px;
      a{
        color: #9ea7b4;
        margin-right: 10px;
        font-size: 13px;
        &:hover{
          color:#00a2ae;
        }
      }
    }
	}
	&-page-con{
		box-sizing: border-box;
    padding: 60px 0 10px;
    background-color: #F0F0F0;
		z-index: -1;
		transition: padding .2s linear;
		.breadcrumb-con{
			clear: both;
			padding: 10px 15px 0;
		}
		.page{
      margin: 10px 0;
      position: relative;
		}
		.copy{
			text-align: center;
			padding: 10px 0 20px;
			color: #9ea7b4;
		}
	}
}

</style>

