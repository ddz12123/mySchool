<template>
	<view class="main">
		<view class="top">
			<u-transition :show="true" mode="fade-down">
			<view v-if="isLogin=='true'||this.$store.state.isLogin" class="avator">
				<image :src="this.$BaseUrl.BaseUrl+userInfo.pic" mode=""></image>
			</view>
			</u-transition>
			<view v-if="isLogin==null||isLogin=='false'" class="avator">
				<image src="../../static/images/commonIcon/ava.png" mode=""></image>
			</view>
			<u-transition :show="true" mode="fade-down">
			<view v-if="isLogin=='true'||this.$store.state.isLogin" class="margin-top20" style="color: white;font-size: 16px;">
				{{userInfo.username}}
			</view>
			<view v-if="isLogin=='true'&&this.$store.state.isLogin&&userInfo.reg=='0'" class="margin-top20 flex-row" style="color: white;font-size: 12px;"
			@tap="toRz()">
				<img src="../../static/rz.png" alt="" style="width: 20px;height: 20px;">
				<view class="">
					未认证
				</view>
				
			</view>
			<view v-if="isLogin=='true'&&this.$store.state.isLogin&&userInfo.reg=='1'" class="margin-top20 flex-row" style="color: #abd462;font-size: 12px;" @tap="toRz()">
				<img src="../../static/yrz.png" alt="" style="width: 20px;height: 20px;">
				<view class="" style="margin-top: 1px;">
					已认证
				</view>
				
			</view>
				</u-transition>
			<view v-if="isLogin==null||isLogin=='false'" class="margin-top20" style="color: white;font-size: 16px;" @tap="toLogin()">
				点击登录
			</view>
		</view>
		<view class=" margin-top60"> 
			<u-list style="width: 700rpx;height: 100%;margin-left: 25rpx;">
				<u-list-item>
								<u-cell
									title="我的动态"
									:isLink="true" 
									@tap="tolive()"
								>
									<u-avatar
										slot="icon"
										shape="square"
										size="30"
										src="/static/images/my/dt.png"
										customStyle="margin: -3px 5px -3px 0"
										:isLink="true"
									></u-avatar>
								</u-cell>
								
				</u-list-item>
				<u-list-item>
								<u-cell
									title="个人中心"
									:isLink="true" 
									@tap="toUserCenter()"
								>
									<u-avatar
										slot="icon"
										shape="square"
										size="22"
										src="/static/images/my/my.png"
										customStyle="margin: -3px 5px -3px 0"
										:isLink="true"
									></u-avatar>
								</u-cell>
								
				</u-list-item>
				<u-list-item>
								<u-cell
									title="账户安全"
									:isLink="true" 
									@tap="toSafe()"
								>
									<u-avatar
										slot="icon"
										shape="square"
										size="25"
										src="/static/images/my/aq.png"
										customStyle="margin: -3px 5px -3px 0"
										:isLink="true"
									></u-avatar>
								</u-cell>
								
				</u-list-item>
				<u-list-item>
								<u-cell
									title="帮助中心"
									:isLink="true" 
								>
									<u-avatar
										slot="icon"
										shape="square"
										size="22"
										src="/static/images/my/bzzx.png"
										customStyle="margin: -3px 5px -3px 0"
										:isLink="true"
									></u-avatar>
								</u-cell>
								
				</u-list-item>
				
				<u-list-item>
								<u-cell
									title="设置"
									:isLink="true" 
									@tap='toBaseSetting()'
								>
									<u-avatar
										slot="icon"
										shape="square"
										size="22"
										src="/static/images/my/sz.png"
										customStyle="margin: -3px 5px -3px 0"
										:isLink="true"
									></u-avatar>
								</u-cell>
								
				</u-list-item>
			</u-list>
		</view>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop" icon="arrow-up" text="top"></u-back-top>
	</view>
</template>
<script>
	import api from '@/net/api.js'
	export default {
		data() {
			return {
				
				scrollTop: 0,
				userInfo:{},
				status:"",
				isLogin:''
				
				
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			onShow() {
				this.isLogin=sessionStorage.getItem("isLogin");
				////console.log('isLogin',this.isLogin)
				////console.log(this.$store.state.isLogin)
				if(sessionStorage.getItem("isLogin")=='true'){
					this.getInfo();
				}	
				
			},
			onLoad() {
						
					},
		methods: {
			toSafe(){
				uni.navigateTo({
					url:'/pages/accountSafe/accountSafe'
				})
			},
				toUserCenter(){
					uni.navigateTo({
						url:'/pages/setting/accountDetail/accountDetail'
					})
				},
				tolive(){
					uni.navigateTo({
						url:'/pages/live/live'
					})
				},
				toRz(){
					uni.navigateTo({
						url:'/pages/rz/rz'
					})
				},
				toLogin(){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				},
				toBaseSetting(){
					uni.navigateTo({
						url:'/pages/setting/setting'
					})
				},
				getInfo(){
					api.getInfo({
					phone:localStorage.getItem('phone')
				}).then(res=>{
						////console.log(res);
						this.userInfo=res.data.data[0]
					}).catch(err=>{
						uni.showToast({
							title:'身份失效，重新登陆',
							duration: 2000,
							icon: "error",
							position: "center"
						});
						setTimeout(()=>{
							uni.navigateTo({
								url:'../login/login'
							})
						},2000)
					})
				}
							
			}
	}
</script>

<style scoped lang="scss">
	.main{
		width: 750rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		.top{
			width: 750rpx;
			height: 250px;
			background: url(../../static/images/my/bg.png) repeat-x;
			background-size: contain;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			.avator{
				width: 70px;
				height: 70px;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
		}
	}
</style>
