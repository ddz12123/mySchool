<template>
	<view class="flex1 flex-column">

		<view class="img-box margin-top60">
			<uni-file-picker v-model:value="imageValue" fileMediatype="image" mode="grid" @select="select"
				@progress="progress" @success="success" @fail="fail" :limit="1" :image-styles="imageStyles" />
		</view>
		<view class="ava-btn">
			<button type="default"
				style="background: linear-gradient(90deg, #68c8b8, #3677cc) !important;border-radius:15px;color: white;height: 40px;line-height: 40px;"
				@click="setAvas()">更换头像</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [{
					"url": "",
				}],
				userInfo: '',
				imageStyles: {
					width: 200,
					height: 200,
					border: {
						color: "#ff5a5f",
						width: 2,
						style: 'dashed',
						radius: '100px'
					}
				},
			}
		},
		methods: {

			setAvas() {
				this.imageValue = []
			},
			// 获取上传状态
			select(e) {
				//console.log('选择文件：', e);
				var that=this;
				var imgsFile = e.tempFilePaths[0]; //获取图片的临时资源
				uni.uploadFile({ //上传代码
					url: that.$myHttp.baseUrl+"/upload/uploads", //本地node.js服务器地址
					header: {

						'Authorization': localStorage.getItem('token')
					},
					filePath: imgsFile,
					name: "file", //这个东西有点类似与 form表单中的  name值 在后面也需要这个		
					success: function(res) {
						//console.log(res);
						//修改数据库头像
						uni.request({
							url: that.$myHttp.baseUrl+'/account/upic', //仅为示例，并非真实接口地址。
							data: {
								phone: localStorage.getItem('phone'),
								pic: '/public/image/upload/' + e.tempFiles[0].name
							},
							method: "PUT",
							header: {
								'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
								'Authorization': localStorage.getItem('token')
							},
							success: (res) => {
								//console.log(res);
								//this.imageValue[0].url = e.tempFiles[0].name;
								uni.showToast({
									title: '修改头像成功',
									duration: 2000,
									icon: "success",
									position: "center"
								});
							},
							fail(err) {
								uni.showToast({
									title: '修改失败，请稍后重试',
									duration: 2000,
									icon: "error",
									position: "center"
								});
							}
						});
					}
				})



			},
			// 获取上传进度
			progress(e) {
				//console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				//console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				//console.log('上传失败：', e)
			},
			getUserInfo() {
				uni.request({
					url: this.$BaseUrl.BaseUrl + '/users/findUser', //仅为示例，并非真实接口地址。
					data: {
						phone: localStorage.getItem('phone'),
					},
					method: "GET",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						'Authorization': localStorage.getItem('token')
					},
					success: (res) => {
						////console.log(res);
						this.userInfo = res.data.data[0];
						////console.log(this.userInfo.pic);
						this.imageValue[0].url = this.$myHttp.baseUrl+this.userInfo.pic;
					}
				});
			},
		},
		onLoad() {
			if(localStorage.getItem('token').length>0){
				this.$store.state.isLogin=true;
			}else{
				this.$store.state.isLogin=false;
			}
			if (this.$store.state.isLogin) {
				this.getUserInfo();
			}
		},
	}
</script>

<style scoped lang="scss">
	.img-box {
		margin-left: 175rpx;
	}

	.ava-btn {
		width: 60%;
		margin-left: 20%;
		margin-top: 60rpx;
	}
</style>
