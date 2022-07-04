<template>
	<view class="flex-column">
		<view class="swiper">
			<u-swiper
			                :list="list"
			                previousMargin="30"
			                nextMargin="30"
			                :circular="true"
			                :autoplay="true"
			                radius="5"
			                bgColor="#ffffff"
							height="160px"
			        ></u-swiper>
		</view>
		<view class="flex-row margin-top40">
			<view class="flexItem">
				<img src="../../static/images/helper/zs.png" alt="" style="transform: scale(0.8);">
				<view class="">
					生活指南
				</view>
			</view>
			<view class="flexItem" @click="show2 = true">
				<img src="../../static/images/helper/rl.png" alt="" style="transform: scale(0.95);">
				<view class=""  >
					校历
				</view>
			</view>
			<view class="flexItem">
				<img src="../../static/images/helper/xw.png" alt="" style="transform: scale(0.8);">
				<view class="">
					校内新闻
				</view>
			</view>
		</view>
		 <u-notice-bar :text="text"  class="margin-top30" style="height: 0px;width: 90%;"></u-notice-bar>
		 <view class="title flex-row">
			 <img src="../../static/images/helper/bj.png" alt="">
		 	<view class="margin-left10">
		 		学院热点
		 	</view>
		 </view>
		 <view class="flex-row list" v-for="(item,index) in notic" @click="toDetails(item.nid)">
			 <img :src="item.img" alt="">
		 	<view class="flex-column margin-left20">
		 		<view class="">
		 			{{item.title}}
		 		</view>
				<view class="time">
					{{item.date}}
				</view>
		 	</view>
		 </view>
		 <u-loadmore :status="status" nomoreText="我也是有底线的"/>
		 <u-back-top :scroll-top="scrollTop"></u-back-top>
		 <u-overlay :show="show2" @click="show2 = false" opacity="0.9">
		 		<img src="../../static/images/other/xl.jpg" alt="" style="margin-top: 45%;">
		 	</u-overlay>
	</view>
</template>

<script>
	import api from "@/net/api.js"
	export default {
		data() {
			return {
				 list: [
				                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcity.kmust.edu.cn%2F__local%2FC%2F9C%2F47%2F335CC1AC62C1E88C1FAE8CECC71_A92C9204_3568BC.jpg&refer=http%3A%2F%2Fcity.kmust.edu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654486271&t=9c45b2a28e68ebbcfb06df9526f43ac0',
				                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200505%2F60830e35b5e24d4ba7a4f66c71a05916.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654486664&t=1035851667a6792c394bd5faa5becf8a',
				                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.jdxzz.com%2Fuploads%2Fallimg%2F191203%2F4-191203160621.jpg&refer=http%3A%2F%2Fwww.jdxzz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654486599&t=e1ee9035ab79529527d3e3f02fe16a96',
				                ],
								text: '未来有风雨兼程，也有雨雪初霁，但只要秉承勤奋拼搏的信念，就会迎来属于每一个人的光辉岁月。',
						notic:[],
						status: 'nomore',
						scrollTop: 0,
						show2: false
			}
		},
		methods: {
			async getNoticList(){
				let opts = {
					url: '/bus/getNoticelist',
					method: "GET"
				}
				let data = {
					
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				res.data.data.map((item,index)=>{
					if(item.title.length>30){
						item.title=item.title.substring(0,30)+'...'
					}
				})
				this.notic=res.data.data;
			},
			toDetails(id){
				uni.navigateTo({
					url:`/pages/newDetail/newDetail?nid=${id}`
				})
			},
			onPageScroll(e) {
					this.scrollTop = e.scrollTop;
				}
		},
		onLoad() {
			this.getNoticList();
		}
	}
</script>

<style scoped lang="scss">
.swiper{
	height: 160px;
	margin-top:20px;
}
.flexItem{
	display: flex;
	flex-direction: column;
	font-size: 12px;
	margin-left: 20px;
	align-items: center;
	justify-content: center;
		img{
		width: 50px;
		height: 50px;
		border-radius: 10px;
	}
}
.title{
	font-size:20px;
	align-items: center;
	margin-top: 20px;
	img{
		width: 25px;
		height: 25px;
		margin-left: 20px;
	}
}
.list{
	height: 100px;
	align-items: center;
	margin: 10px 20px;
	border-bottom: 1px solid #CCC;
	img{
		width: 60px;
		height: 60px;
		border-radius: 10px;
	}
	.time{
		color: #bdbdbd;
		font-size: 13px;
		margin-top: 5px;
	}
}
</style>
