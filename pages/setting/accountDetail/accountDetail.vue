<template>
	<view class="main-box flex flex-column" :style="{height:screenHeight+'px'}">
		<view class="flex-column flex1">
			<view class="flex-row main-row" @click="toAva()">
				<view class="main-row-left" >
					头像
				</view>
				<view class="flex1 main-row-mid">
					
				</view>
				<view class="main-row-right">
					>
				</view>
			</view>
			<view class="flex-row main-row">
				<view class="main-row-left">
					手机号
				</view>
				<view class="flex1 main-row-mid">
					{{userInfo.phone}}
				</view>
			</view>
			<view class="flex-row main-row">
				<view class="main-row-left">
					性别
				</view>
				<view class="flex1 main-row-mid">
					{{userInfo.sex}}
				</view>
			</view>
			<view class="flex-row main-row">
				<view class="main-row-left">
					邮箱
				</view>
				<view class="flex1 main-row-mid">
					{{userInfo.email}}
				</view>
				
			</view>
			<view class="flex-row main-row"  @click="toAddress()">
				<view class="main-row-left">
					收货地址
				</view>
				<view class="flex1 main-row-mid">
					
				</view>
				<view class="main-row-right">
					>
				</view>
			</view>
			<view class="flex-row mian-row just-content-center margin-top40">
				<view class="mid-btn">
					<button type="default"
						style="background: linear-gradient(90deg, #68c8b8, #3677cc) !important;border-radius:15px;color: white;height: 40px;line-height: 40px;"
						@click="toEdit()">编辑资料</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight:'',
				userInfo:''
			}
		},
		methods: {
			toEdit(){
				uni.navigateTo({
					 url: '/pages/setting/editUser/editUser'
				})
			},
			toAddress(){
				uni.navigateTo({
					 url: '/pages/address/address'
				})
			},
			toAva(){
				uni.navigateTo({
					 url: '/pages/setting/accountDetail/setAva/setAva'
				})
			},
			getUserInfo(){
				uni.request({
					url: this.$BaseUrl.BaseUrl + '/users/findUser', //仅为示例，并非真实接口地址。
					data: {
						phone:localStorage.getItem('phone'),
					},
					method: "GET",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						'Authorization':localStorage.getItem('token')
					},
					success: (res) => {					
						////console.log(res);
						this.userInfo=res.data.data[0];
					}
				});
			},
		},
		onLoad() {
			this.screenHeight= uni.getSystemInfoSync().windowHeight;
			if(sessionStorage.getItem("isLogin")=='true'){
				this.getUserInfo();
			}else{
				uni.showToast({
					title:'请先登录',
					duration: 2000,
					icon: "error",
					position: "center"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/login/login'
					})
				},2000)
			}
		},
	}
</script>

<style scoped lang="scss">
		.main-box{
			width: 750rpx;
			.main-row{
				width: 100%;
				height: 105rpx;
				border-bottom: 1px solid #e2e2e2;
				.main-row-left{
					height: 105rpx;
					line-height: 105rpx;
					width: 150rpx;
					text-align: left;
					margin-left: 30rpx;
				}
				.main-row-mid{
					height:105rpx;
					line-height: 105rpx;
					text-align: center;
				}
				.main-row-right{
					height: 105rpx;
					width: 105rpx;
					line-height:105rpx;
					text-align: center;
				}
			}
		}
		.mid-btn{
			width: 80%;
			height: 50%;
		}
	
</style>
