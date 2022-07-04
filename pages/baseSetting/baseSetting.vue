<template>
	<view class="flex-column">
		<u-navbar title="设置" :autoBack="true" leftText="返回">

		</u-navbar>
		<view class="main">
			<u-list style="width: 750rpx;height: 100%;">
				<u-list-item>
								<u-cell
									title="切换账号"
									:isLink="true" 
								>
								
								</u-cell>
								
				</u-list-item>
			</u-list>
			<view  style="margin: 40px 30px 0 30px;">
				<u-button text="退出登录" color="linear-gradient(45deg, rgb(66, 83, 216), rgb(0, 255, 255))" @tap="quit()" style="border-radius: 15px;"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../net/api.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			quit(){
				api.quit().then((res)=>{
					sessionStorage.setItem("isLogin","false");
					uni.setStorage({
					    key: 'isLogin',
					    data:false,
					    success: function () {
					       
					    }
					});
					uni.setStorage({
					    key: 'token',
					    data:'',
					    success: function () {
					       
					    }
					});
					uni.removeStorage({
					    key: 'phone',
					    success: function (res) {
					        uni.showToast({
					        	title: "退出登录成功",
					        	duration: 2000,
					        	icon: "success",
					        	position: "center"
					        });
							setTimeout(()=>{
								 uni.reLaunch({
									 url: '/pages/my/my?id=123',
								   });
							},1000)
							
					    }
					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		margin-top: 45px;
	}

</style>
