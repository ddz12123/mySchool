<template>
	<view class="flex flex-column"style="margin: 0 20px;">
		<view class="author">
			<view class="">
				<image :src="`${this.$BaseUrl.BaseUrl}${userInfo.pic}`" mode=""  ></image>
			</view>
			<view class="flex-column margin-left20">
				<view class="" style="font-size: 15px;">
					{{userInfo.username}}
				</view>
				<view class="" style="color: #ccc;">
					{{item.ctime}}
				</view>
			</view>
		</view>
		<view class="title margin-top20 margin-left20">
			{{item.title}}
		</view>
		<view class="content flex-column">
			<view class="">
				<image :src="`${this.$BaseUrl.BaseUrl}${item.url}`" mode=""  @click="clickImg(item)" style=""></image>
			</view>
			<view class="margin-top10" style="width: 92%;margin-left: 4%;">
				{{item.content}}
			</view>
			<view style="width: 90%;color: white;text-align: center;background-color: #ffaa7f;height: 100%;line-height: 50px;margin-left: 5%;border-radius: 10px;margin-top: 30px;" @click="open()">
				<span>联系</span>
			</view>
					<u-popup :show="show" @close="close" :closeable="true" round='10'>
			            <view class="model">
							<view class="flex-row align-item-center">
								
								<img src="../secondHand/img/qq.png" alt="">
								 <u-tooltip :text="userInfo.email" direction="top" bgColor="#e3e4e6">
								 </u-tooltip>
								 <view class="" style="font-size: 12px;margin-left: 10px;">
								 	(长按复制)
								 </view>
							</view>
							
							<view class="flex-row align-item-center" style="margin-left: 0px;">
								<u-transition :show="true" mode="slide-left">
								<img src="../secondHand/img/phone.png" alt="" style="transform: scale(0.9);margin-left: 6px;">
								</u-transition>
								<u-transition :show="true" mode="slide-left">
								<u-tooltip :text="userInfo.phone" direction="bottom" bgColor="#e3e4e6"> </u-tooltip>
								</u-transition>
								<view class="" style="font-size: 12px;margin-left: 10px;">
									(长按复制)
								</view>
							</view>
							
			            </view>
						
					</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:'',
				id:'',
				uid:'',
				userInfo:'',
				show:false
			}
		},
		methods: {
					open() {
									 this.show = true
					         // //console.log('open');
					       },
					       close() {
					         this.show = false
					         // //console.log('close');
					       },
				async getItem(){
					let opts={
						url:'/bus/getLikesById',
						method:"GET"
					}
					let data={
						id:this.id
					}
					let res=await this.$myHttp.httpRequest(opts, data);
					this.item=res.data.data[0];
					//console.log('内容详情为',res.data.data[0]);
				},
			  async getUserInfo(){
				  let opts={
				  	url:'/bus/getInfoById',
				  	method:"GET"
				  }
				  let data={
				  	id:this.uid
				  }
				  let res=await this.$myHttp.httpRequest(opts, data);
				  this.userInfo=res.data.data[0]
				  //console.log('发布者信息为',res);
			  },
			  clickImg(item) {
				  let arr=[];
				  arr[0]=this.$BaseUrl.BaseUrl+item.url
				  //console.log(item)
			  				uni.previewImage({
								urls:arr,
								current:0
							})
			  			},
		
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				
				//console.log(option);
				this.id=option.id;
				this.uid=option.uid;
				this.getItem();
				this.getUserInfo();
			}
	}
</script>

<style scoped lang="scss">
	.author{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 60px;
			
		align-items: center;
		font-size: 13px;
		image{
			width: 50px;
			height: 50px;
			border-radius: 10px;
		}
	}
	.title{
		font-size: 20px;
		
	}
	.content{
		margin-top: 15px;
		image{
			border-radius: 15px;		
			width: 96%;
			margin-left: 2%;
			height: 350px;
		}
	}
	.model{
		height: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		img{
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
	}
</style>
