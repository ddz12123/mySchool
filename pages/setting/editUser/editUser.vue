<template>
	<view class="main-box flex flex-column" :style="{height:screenHeight+'px'}">
		<view class="flex-column flex1">
			
			<view class="flex-row main-row">
				<view class="main-row-left">
					用户名
				</view>
				<view class="flex1 main-row-mid">
					<input type="text" v-model:value="username" :placeholder="userInfo.username" />
				</view>
			</view>
			<view class="flex-row main-row">
				<view class="main-row-left">
					性别
				</view>
				<view class="flex1 main-row-mid">
					<input type="text" v-model:value="sex" :placeholder="userInfo.sex" />
				</view>
			</view>
			<view class="flex-row main-row">
				<view class="main-row-left">
					邮箱
				</view>
				<view class="flex1 main-row-mid">
					<input type="text" v-model:value="email" :placeholder="userInfo.email" />
				</view>
				
			</view>
			<view class="flex-row mian-row just-content-center margin-top40">
				<view class="mid-btn">
					<button type="default"
						style="background: linear-gradient(90deg, #68c8b8, #3677cc) !important;border-radius:15px;color: white;height: 40px;line-height: 40px;"
						@click="putInfo()">确认修改</button>
				</view>
			</view>
			<view class="flex-row mian-row">
				
			</view>
			
		</view>
	</view>
	
</template>

<script>
	export default {
		
		data() {
			return {
				screenHeight:'',
				userInfo:'',
				email:'',
				username:'',
				sex:'',
				show: true
			}
		},
		
		methods: {
		
			getUserInfo(){
				uni.request({
					url: this.$BaseUrl.BaseUrl + '/users/findUser', //仅为示例，并非真实接口地址。
					data: {
						phone:localStorage.getItem('phone'),
					},
					method: "GET",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						'Authorization':this.$store.state.token
					},
					success: (res) => {					
						////console.log(res);
						this.userInfo=res.data.data[0];
						////console.log(this.userInfo)
						this.username=this.userInfo.username;
						this.email=this.userInfo.email;
						this.sex=this.userInfo.sex;
						
					}
				});
			},
			putInfo(){
				uni.request({
						url: this.$BaseUrl.BaseUrl + '/account/updateUser', //仅为示例，并非真实接口地址。
						data: {
							username:this.username,
							email:this.email,
							sex:this.sex,
							phone:localStorage.getItem('phone'),
						},
						method: "PUT",
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
							'Authorization':localStorage.getItem('token')
						},
						success(res) {
							if(res.data.data.changedRows==1){
								uni.showToast({
								title: '修改成功',
								duration: 1000
								});
								setTimeout(()=>{
									uni.navigateTo({
									url:'/pages/setting/accountDetail/accountDetail'
									})
								},1000)
								
							}
							if(res.data.data.changedRows==0){
								uni.showToast({
								title: '请修改内容',
								duration: 1000,
								icon:"error"
								});
							}
							
						}
						
						})
			}
		},
		onLoad() {
			this.screenHeight= uni.getSystemInfoSync().windowHeight;
			if(this.$store.state.isLogin){
				this.getUserInfo();
				
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
		input{
			width: 100%;
			height: 100%;
			text-align: left;
		}
		
</style>
