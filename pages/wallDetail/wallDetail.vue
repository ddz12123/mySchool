<template>
	<view class="flex-column">
		<view class="flex-row align-item-center margin-top10">
			<view class="ava">
				<img :src="item.pic" alt="">
			</view>
			<view class="flex-column">
				<view class="titles">
					{{item.username}}
				</view>
				<view class="time">
					{{item.date}}
				</view>
			</view>
		</view>
		<view class="content">
			{{item.content}}
		</view>
		<view class="flex-row imgs">
			<img :src="item.imglist" alt="" v-if="item.imglist!=''" @click="clickImg(item.imglist)">
		</view>
			
		<view class="flex-column words">
			<view class="" style="font-size: 15px;color: goldenrod;border-bottom: 1px solid #969600;background: #bcbc00;color: white;border-radius: 3px;width:100px;text-align: center;">
				留言板
			</view>
			<view class="" style="height:1px;width: 100%;background: #969600;margin-top: 5px;margin-bottom: 5px;">
				
			</view>
			<view class="" style="background: url(../../static/lybg.png);height: 30px;background-size: cover;margin-bottom: 10px;" @click="showMsgBar">
				
			</view>
			
			<view class=" flex-column" style="overflow-y: scroll;height: 200px;"> 
				<view class="flex-column margin-top10" v-for="(v,k) in message" style="border-bottom: 1px solid #ccc;width: 90%;margin-left: 5%;">
					<view class="flex-row align-item-center">
						<view class="avas">
							<img :src="v.pic" alt="">
						</view>
						<view class="flex-column margin-left20">
							<view class="">
								{{v.username}}
							</view>
							<view class="" style="font-size: 12px;color: #ccc;">
								{{v.time}}
							</view>
						</view>
					</view>
					<view class="margin-top10" style="margin-left: 50px;width: 80%;margin-bottom: 20px;">
						{{v.content}}
					</view>
				</view>
				
			</view>
			
				<!-- <u-empty
				        text="留言为空"
				        icon="http://cdn.uviewui.com/uview/empty/message.png"
						v-if="message.length==0"
				>
				
				</u-empty> -->
			
		
		
			<u-popup :show="show" @close="close" @open="open" :overlay='false' :closeable='true' :round='10' >
			            <view style="height: 220px;" class="flex-column" >
							<view class="" style="height: 100;">
								 <u--textarea v-model="content" placeholder="请输入内容" style=" width: 80%;margin-top: 40px;margin-left: 5%;" height='100'></u--textarea>
							</view>
							<view class="flex-row" style="margin-top: 10px;width: 50px;position: relative;left: 75%;">
								<u-button text="发送" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" size="small" @click="addMsg"></u-button>
							</view>
			            </view>
			</u-popup>
			
		</view>
	</view>
</template>

<script>
	import api from "@/net/api.js"
	export default {
		data() {
			return {
				item:[],
				id:'',
				message:[],
				show:false,
				content:'',
				userInfo:[]
			}
		},
		methods: {
			clickImg(url) {
							uni.previewImage({
								urls: [url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
								current: '', // 当前显示图片的http链接，默认是第一个
								success: function(res) {},
								fail: function(res) {},
								complete: function(res) {},
							})
						},
			
		async getDetails(){
				let opts = {
					url: '/bus/getWallListByID',
					method: "GET"
				}
				let data = {
					id:this.id
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				//console.log(res);
				res.data.data.map((item, index) => {
					if (item.imglist !== '') {
						item.imglist = this.$BaseUrl.BaseUrl + item.imglist;
					}
					item.pic = this.$BaseUrl.BaseUrl + item.pic;
					item.date=uni.$u.timeFormat(item.date, 'yyyy-mm-dd hh:MM')
				});
				this.item=res.data.data[0];
				
			},
			async getMsg(){
				let opts = {
					url: '/bus/getMsgListByID',
					method: "GET"
				}
				let data = {
					id:this.id
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				//console.log(res);
				res.data.data.map((item, index) => {
					if (item.imglist !== '') {
						item.imglist = this.$BaseUrl.BaseUrl + item.imglist;
					}
					item.pic = this.$BaseUrl.BaseUrl + item.pic;
					item.time=uni.$u.timeFormat(item.time, 'yyyy-mm-dd hh:MM')
				});
				this.message=res.data.data;
				////console.log("message",this.message.length);
				
			},
			showMsgBar(){
				if(sessionStorage.getItem("isLogin")=='true'){
					this.show=true;
				}else{
					uni.showToast({
						title:'请先登录',
						duration: 2000,
						icon: "error",
						position: "center"
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1500)
				}
				
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
			},
			addMsg(){
				let timer=new Date().getTime();
				if(this.content!=''){
					api.addMsg({
						uid:this.userInfo.uid,
						content:this.content,
						oid:this.id,
						time:timer
					}).then(res=>{
						if(res.data.data.affectedRows==1){
							this.getMsg();
							//console.log("添加成功");
							this.show = false;
							uni.showToast({
								title:'添加成功',
								duration: 1000,
								icon: "success",
								position: "center"
							});
						}
					}).catch(err=>{
						//console.log(err);
					})
				}else{
					uni.showToast({
						title:'内容不能为空',
						duration: 2000,
						icon: "error",
						position: "center"
					});
				}
			},
			 close() {
			          this.show = false
			         
			        },
					open() {
					        // //console.log('open');
					      },
		},
		onLoad(options) {
			this.id=options.id;
			//console.log(options);
			this.getDetails();
			this.getMsg();
			this.getInfo();
		}
	}
</script>

<style lang="scss" scoped>
	.ava {
		width: 50px;
		height: 50px;
		overflow: hidden;
		border-radius: 50%;
		display: flex;
		margin-left: 10px;
	
		img {
			width: 100%;
			height: 100%;
		}
	}
	.titles {
		font-size: 15px;
		color: goldenrod;
		margin-left: 10px;
	}
	.time{
		font-size: 12px;
		color: #ccc;
		margin-left: 10px;
	}
	.content{
		margin: 10px 30px;
	}
	.imgs{
		height: auto;
		margin:10px 40px;
		display: flex;
		flex-direction: row;
		img{
			width: 120px;
			height: 120px;
			border-radius: 10px;
		}
	}
	
	.words{
		display: flex;
		flex-direction: column;
		font-size: 13px;
		color: #6f6f6f;
		position: fixed;
		width: 90%;
		bottom: 0;
		height: 250px;
		margin-left: 5%;
		overflow: hidden;
		.avas{
			width:40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
