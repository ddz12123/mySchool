<template>
	<view class="main">
		<view class="loginBox">
			<view class='ava'>
				<image :src="img" mode=""></image>
			</view>
			<view>
				<uni-easyinput  v-model="phone" placeholder="请输入用户名" :styles="styles" placeholderStyle="color: #ddd" prefixIcon="person"></uni-easyinput>
			</view>
			<view class='margin-top20' >
				<uni-easyinput type="password" v-model="password" placeholder="请输入密码" prefixIcon="locked"
					placeholderStyle="color: #ddd" :styles="styles"
					@focus='getInfo()'></uni-easyinput>
			</view>
			<view class="margin-top40">
				<u-button text="登录" color="linear-gradient(45deg, rgb(66, 83, 216), rgb(0, 255, 255))" @tap="login()"></u-button>
			</view>
			<view class="margin-top20 flex-row space-between boxText">
				<view @tap="toPwd()">忘记密码？</view>
				<view @tap="toReg()">立即注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../net/api.js"
	export default {
		data() {
			return {
				styles: {
					color: '#ffffff',
					borderColor: '#ffffff',
				},
				password:'',
				phone:'',
				img:'../../static/images/commonIcon/ava.png'
			}
		},
		methods: {
			toHome() {
				uni.switchTab({
					url: '/pages/index/index',
					success:(res)=>{
																								 let page = getCurrentPages().pop(); //跳转页面成功之后
																								        if (!page) return; 
																								           // page.onLoad(); //如果页面存在，则重新刷新页面
																			
					}
				})
			},
			login(){
				uni.request({
					url: this.$BaseUrl.BaseUrl + '/users/login', //仅为示例，并非真实接口地址。
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
						if(res.data.status==200){
							
							sessionStorage.setItem("isLogin","true");
							this.$store.commit('setLogin',true);
							uni.showToast({
								title: '登陆成功',
								duration: 2000
							});
							uni.setStorage({
								key: 'token',
								data: res.data.token,
								success: function() {
									////console.log('success');
								}
							});
							uni.setStorage({
								key: 'isLogin',
								data: true,
								success: function() {
									////console.log('success');
								}
							});
													
							uni.setStorage({
								key: 'phone',
								data: this.phone,
								success: function() {
									////console.log('success');
								}
							});
							setTimeout(() => {
								this.toHome();
							}, 1000)
						}
						 if(res.data.status==402){
							uni.showToast({
								title: '用户名不存在',
								duration: 2000,
								icon:'error'
							});
						}
						 if(res.data.status==401)
						{
							uni.showToast({
								title: '用户名或密码错误',
								duration: 2000,
								icon:'error'
							});
						}
						
					}
				});
				// api.login({
				// 	phone: this.phone,
				// 	password: this.password
				// }).then((res)=>{
				// 	if(res.data.status==200){
				// 		sessionStorage.setItem("isLogin","true");
				// 		uni.showToast({
				// 			title: '登陆成功',
				// 			duration: 2000
				// 		});
				// 		uni.setStorage({
				// 			key: 'token',
				// 			data: res.data.token,
				// 			success: function() {
				// 				////console.log('success');
				// 			}
				// 		});
				// 		uni.setStorage({
				// 			key: 'isLogin',
				// 			data: true,
				// 			success: function() {
				// 				////console.log('success');
				// 			}
				// 		});
												
				// 		uni.setStorage({
				// 			key: 'phone',
				// 			data: this.phone,
				// 			success: function() {
				// 				////console.log('success');
				// 			}
				// 		});
				// 		setTimeout(() => {
				// 			this.toHome();
				// 		}, 1000)
				// 	}
				// 	 if(res.data.status==402){
				// 		uni.showToast({
				// 			title: '用户名不存在',
				// 			duration: 2000,
				// 			icon:'error'
				// 		});
				// 	}
				// 	 if(res.data.status==401)
				// 	{
				// 		uni.showToast({
				// 			title: '登录失败',
				// 			duration: 2000,
				// 			icon:'error'
				// 		});
				// 	}
					
				// 	//console.log(res.data.status)
				// })
			},
			toReg(){
				uni.navigateTo({
					url:'/pages/reg/reg'
				})
			},
			toPwd(){
				uni.navigateTo({
					url:'/pages/findPwd/findPwd'
				})
			},	
				getInfo(){
					uni.request({
						url: this.$BaseUrl.BaseUrl + '/users/findUser', //仅为示例，并非真实接口地址。
						data: {
							phone:this.phone,
						},
						method: "GET",
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
							'Authorization':uni.getStorageSync('token')
						},
						success: (res) => {					
							//console.log(res.data.data[0].pic);
							this.img=this.$BaseUrl.BaseUrl+res.data.data[0].pic;
						}
					});
					
				},
		
			
		}
	}
</script>

<style lang="scss"scoped>
	.main {
		height: 100vh;
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: linear-gradient(-180deg, #68c8b8, #3677cc);

		.loginBox {
			width: 550rpx;
			height: 400px;
			margin-top: 20%;
			display: flex;
			flex-direction: column;

			.ava {
				width: 100%;
				height: 40%;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 100px;
					height: 100px;
					border-radius: 50%;
				}
			}
		}
		.boxText{
			font-size: 12px;
			color: white;
		}
	}
</style>
