<template>
	<view class="main">
		<view class="regBox">
			<view class="title">
				Welcome
			</view>
			<view  style="width: 85%;margin-top: 60px;">
				<uni-easyinput  v-model="phone" placeholder="请输入手机号" :styles="styles" placeholderStyle="color: #ddd" prefixIcon="person"></uni-easyinput>
			</view>
			<view class='margin-top20' style="width: 85%;">
				<uni-easyinput type="password" v-model="password" placeholder="请输入密码" prefixIcon="locked"
					placeholderStyle="color: #ddd" :styles="styles"></uni-easyinput>
			</view>
			<view class='margin-top20' style="width: 85%;">
				<uni-easyinput type="password" v-model="repassword" placeholder="请确认密码" prefixIcon="locked"
					placeholderStyle="color: #ddd" :styles="styles"></uni-easyinput>
			</view>
			<view class="margin-top40" style="width: 85%;">
				<u-button text="立即注册" color="linear-gradient(45deg, rgb(66, 83, 216), rgb(0, 255, 255))" @click="register" :disabled="disabled" ></u-button>
			</view>
			<view class="margin-top20 flex-row" style="width: 85%;justify-content: center;">
				<view class="" style="color: white;font-size: 13px;" @tap="toLogin()">
					已有账号？去登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../net/api.js'
	export default {
		data() {
			return {
				styles: {
					color: '#ffffff',
					borderColor: '#ffffff',
				},	
				phone:'',
				password:'',
				repassword:'',
				disabled:false
			}
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			register(){
				if(this.password==this.repassword){
					uni.request({
						url: this.$BaseUrl.BaseUrl + '/users/register', //仅为示例，并非真实接口地址。
						data: {
							phone: this.phone,
							password: this.password
					
						},
						method: "POST",
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
							'Authorization':localStorage.getItem('token')
						},
						success: (res) => {
							//console.log(res);
							if(res.data.status==200){
								this.disabled==true;
								uni.showToast({
									title: '注册成功',
									duration: 2000,
									icon: "success",
									position: "center"
								});
								setTimeout(() => {
										uni.navigateTo({
											url:"//pages/login/login"
										})
										}, 1000)
								
							}else{
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
									icon: "error",
									position: "center"
								});
							}
							
						},
						fail() {
							uni.showToast({
								title:"网络异常，请稍后重试",
								duration: 2000,
								icon: "error",
								position: "center"
							});
						}
					});
				}else if(this.password!=this.repassword){
					uni.showToast({
						title:'两次密码输入不一致，请重新输入',
						duration: 2000,
						icon: "error",
						position: "center"
					});
				}else{
					uni.showToast({
						title:'密码不能为空',
						duration: 2000,
						icon: "error",
						position: "center"
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		width: 750rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: linear-gradient(-180deg, #68c8b8, #3677cc);
		.regBox {
			width: 600rpx;
			height: 400px;
			margin-top: 35%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.title{
				font-size: 48px;
				color: white;
			}
		}
	}
</style>
