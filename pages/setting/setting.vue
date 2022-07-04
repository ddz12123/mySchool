<template>
	<view class="flex-column flex1 bg">
		<view class="flex-column box1 white">
			<view class="flex-row box-item align-item-center space-between" @click="toPwd" v-if="isLogin=='true'">
				
			</view>
			
		</view>
		<view class="flex-column flex1">
			<view class="flex-row box-item">
				<view class="login-btn flex1">
					<button v-if="isLogin=='true'" type="default"
						style="background: linear-gradient(90deg, #68c8b8, #3677cc) !important;border-radius: 40px;color: white;width: 100%;height: 100%;line-height: 80rpx;"
						@click="quit()">退出登录</button>
					<button v-else="isLogin==null||isLogin==false" type="default"
						style="background: linear-gradient(90deg, #68c8b8, #3677cc) !important;border-radius: 40px;color: white;width: 100%;height: 100%;line-height: 80rpx;"
						@click="toLogin()">前去登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:''
			}
		},
		onShow() {
				this.isLogin=sessionStorage.getItem("isLogin");
				//console.log(this.isLogin)
		},
		methods: {
			quit(){
				//uni.clearStorage();
				sessionStorage.setItem("isLogin","false");
				let opts={
					url:'/users/quit',
					method:"POST"
				}
				let data={
					
				}
				this.$myHttp.httpRequest(opts, data);	
				this.$store.commit('setLogin',false);
				this.$store.commit('token','');
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
				
			},
			toLogin(){
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			},
			toPwd(){
				uni.navigateTo({
					url:'/pages/my/putPwd/putPwd'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg{
		width: 750rpx;
		height: 100vh;
		background: #F5F5F5;
	}
	.white{
		background: white;
	}
	.box1{
		width: 750rpx;
		height: 400rpx;
	}
	.box-item{
		width: 750rpx;
		height: 80rpx;
	}
	.box-item-title{
		margin: 40rpx;
	}
	.login-btn {
			height: 100%;
			margin: 0 60rpx;
		}

</style>
