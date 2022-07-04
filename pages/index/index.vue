<template>
	<view class="content">
	
		<view class="top">

			<view class="search">
				<u-search shape="round" :clearabled="true" :animation="true" :show-action="true" v-model="search" placeholder="请输入搜索内容" @custom='indexSearch'>
				</u-search>
			</view>
			<view class="swiper">
				<swiper :indicator-dots="true" style="width: 90%;height: 100%;border-radius: 20px;"
					indicator-color='white' circular="true" indicator-active-color='#3677cc' :autoplay="true">
					<swiper-item>
						<view class="swiper-item ">
							<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcity.kmust.edu.cn%2F__local%2FC%2F9C%2F47%2F335CC1AC62C1E88C1FAE8CECC71_A92C9204_3568BC.jpg&refer=http%3A%2F%2Fcity.kmust.edu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654486271&t=9c45b2a28e68ebbcfb06df9526f43ac0" mode=""></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item ">
							<image src="../../static/images/commonIcon/wsw.jpg" mode=""></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item ">
							<image src="../../static/images/commonIcon/sc1.jpg" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>


	
		<view class="sorts">
			<view class="flex-row full-width space-around margin-top20">
				<u-transition :show="true" mode="fade-down">
				<view class="box1-sort-item">
					<image src="../../static/images/commonIcon/tq.png" mode="" @click="totq()"></image>
				</view>
				 </u-transition>
				 <u-transition :show="true" mode="fade-down">
				<view class="box1-sort-item">
					<image src="../../static/images/commonIcon/gl.png" mode="" @click="toHelper()"></image>
				</view>
				 </u-transition>
				 <u-transition :show="true" mode="fade-down">
				<view class="box1-sort-item" @click="toWall()">
					<image src="../../static/images/commonIcon/jyzx.png" mode=""></image>
				</view>
				 </u-transition>
			</view>
			<view class="flex-row full-width space-around ">
				<u-transition :show="true" mode="fade-down">
						<text class="sort-text">今日天气</text>
				 </u-transition>
				<u-transition :show="true" mode="fade-down">
				<text class="sort-text">校园帮手</text>
				 </u-transition>
				<u-transition :show="true" mode="fade-down">
				<text class="sort-text">校园墙君</text>
				 </u-transition>
			</view>
			<view class="flex-row full-width space-around margin-top10">
				<view class="box1-sort-item" @click="tojsb()">
					<image src="../../static/images/commonIcon/jsb.png" mode=""></image>
				</view>
				<view class="box1-sort-item" @click="toSecondhand()">
					<image src="../../static/images/commonIcon/sss.png" mode=""></image>
				</view>
				<view class="box1-sort-item" @click="toLost()">
					<image src="../../static/images/commonIcon/swzl.png" mode=""></image>
				</view>
				
			</view>
			<view class="flex-row full-width space-around margin-bottom20">
				<text class="sort-text">每日笔记</text>
				<text class="sort-text">跳蚤市场</text>
				<text class="sort-text">失物招领</text>
				
			</view>
		</view>
	
	
		<view class="recomend">
			<view class="title flex">
				<view style="width: 35px;height: 1px;background-color: #acacac;"></view>
				<view style="margin: 0 5px;">每日推荐</view>
				<view style="width: 35px;height: 1px;background-color: #acacac;"></view>
			</view>
			<view class="scrollview">
				<u-scroll-list indicatorColor="white" >
					<view class="scroll-list" style="flex-direction: row;">
						<view class="scroll-list__goods-item" v-for="(item, index) in recomendList" :key="index"
							:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']"
							style="text-align: center;" @tap="recomendDetails(item)">
							<image class="scroll-list__goods-item__image" :src="item.img"></image>
							<text class="scroll-list__goods-item__text margin-left10">{{item.title}}</text>
						</view>
						<view class="scroll-list__show-more">
							<text class="scroll-list__show-more__text">查看更多</text>
							<u-icon name="arrow-rightward" color="#f56c6c" size="12"></u-icon>
						</view>
					</view>
				</u-scroll-list>
			</view>
		</view>
		<view class="" style="width: 750rpx;margin-top: 20px;">
			
		</view>
		<view class="title flex" >
			<view style="width: 35px;height: 1px;background-color: #acacac;"></view>
			<view style="margin: 0 5px;">猜你喜欢</view>
			<view style="width: 35px;height: 1px;background-color: #acacac;"></view>
		</view>
		<view class="flex-column just-content-center" style="margin: 0 20rpx;">
			<waterfall :imgList="goodsList" @bindTab="bindTab" :status="status"></waterfall>

		</view>

	
		<!-- <u-back-top :scroll-top="scrollTop"></u-back-top> -->
		<!-- 返回顶部 -->
		<!-- <u-back-top :scrollTop="scrollTop" mode="square" :iconStyle="iconStyle" text="Top" icon="arrow-up"></u-back-top> -->
		<lt-back-top />
		<LtBackTop />
	</view>
	
</template>

<script>
	import waterfall from "../../components/xiaolu-Waterfall/xiaolu-Waterfall.vue";
	import LtBackTop from '../../components/lt-back-top/lt-back-top.vue'
	import api from "../../net/api.js"
	export default {
		components: {
			waterfall,
			 LtBackTop
		},
		data() {
			return {
				search: '',
				scrollTop: 0,
				goodsList: [],
				status: 'loading',
				pages: 1,
				pageSize: 5,
				uid: '',
				recomendList: [],
				iconStyle: {
					fontSize: '32rpx',
					color: '#2979ff'
				},
				searchList:[]

			}
		},
		onLoad() {
			this.getAllLikesList();
			if(this.$store.state.isLogin){
					this.getUser();
			}
		
			this.getRecomend();
		},
		onReachBottom() {
			this.pages++;
			this.getAllLikesList();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			this.search='';
		},
		methods: {
			indexSearch(){
				////console.log(this.search);
				let opts={
					url:'/other/indexsearch',
					method:"GET"
				}
				let data={
					item:this.search
				}
				let res=this.$myHttp.httpRequest(opts, data);
				res.then(res=>{
					let result=res.data.data;
					this.searchList=result;
					if(result.length>0){
						uni.navigateTo({
							url:`/pages/indexSearch/indexSearch?item=${JSON.stringify(result)}`
						})
					}else{
						this.$u.toast('暂无搜索结果');
						this.search=''
					}
						////console.log(result)
				}).catch(err=>{
					//console.log(err)
				})
			
			},
			recomendDetails(item){
				//console.log(item);
				uni.navigateTo({
					url:`/pages/index/recommendDetails/recommendDetails?id=${item.rid}`
				})
			},
			bindTab(item) {
				let newArr = JSON.parse(JSON.stringify(item));
				//console.log(JSON.parse(JSON.stringify(item)))
				uni.navigateTo({
					url: `/pages/cardDetails/cardDetails?uid=${newArr.uid}&id=${newArr.lid}`
				})
				
			},
			toSecondhand() {
				uni.navigateTo({
					url: '/pages/secondHand/secondHand'
				})
			},
			toWall(){
				uni.navigateTo({
					url:'/pages/wall/wall'
				})
			},
			toHelper(){
				uni.navigateTo({
					url:'/pages/helper/helper'
				})
			},
			toLost() {
				uni.navigateTo({
					url: '/pages/lost/lost'
				})
			},
			toNew(){
				uni.navigateTo({
					url:'/pages/news/news'
				})
			},
			totq(){
				uni.navigateTo({
					url:'/pages/weather/weather'
				})
			},
			getAllLikesList() {
				let that = this;
				uni.request({
					url: this.$BaseUrl.BaseUrl + '/bus/getAllLikesList', //仅为示例，并非真实接口地址。
					data: {
						page_num: that.pages,
						page_size: that.pageSize
					},
					method: "GET",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						// 'Authorization': localStorage.getItem('token')
					},
					success: (res) => {
						////console.log(res.data.data);
						res.data.data.map((item, index) => {
							item.url = this.$BaseUrl.BaseUrl + item.url
						})
						let arr = res.data.data.map(function(i, index, arr) {
							return i;
						});

						that.status = 'loading'
						setTimeout(function() {
							let newArr = that.goodsList.concat(that.goodsList, arr);
							that.goodsList = Array.from(new Set(newArr));
							that.status = 'nomore'
						}, 1500)


					}

				})
			},
			async getUser() {
				let opts = {
					url: '/users/findUser',
					method: "GET"
				}
				let data = {
					phone: localStorage.getItem('phone'),
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				this.uid = res.data.data[0].uid;

			},
			tojsb() {
				uni.navigateTo({
					url: `/pages/jsb/jsb?uid=${this.uid}`
				})
			},
			getRecomend() {
				
				let that = this;
				uni.request({
					url:  this.$BaseUrl.BaseUrl+'/bus/getAllRecomendList', //仅为示例，并非真实接口地址。
					data: {
				
					},
					method: "GET",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						'Authorization': localStorage.getItem('token')
					},
					success: (res) => {
						let result = [];
						res.data.data.map((item, index) => {
							item.img = this.$BaseUrl.BaseUrl + item.img;
							if (item.title.length >= 6) {
								item.title = item.title.slice(0, 6) + '...'
							}
							if (item.show == 0) {
								result.push(item);
							}
						})
						that.recomendList = result;
				
					}
				
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		//justify-content: center;
		background-color: #efefef;
		overflow-y: scroll;

		.top {
			width: 750rpx;
			height: 180px;
			padding-top: 0px;
			z-index: 1;
			background: linear-gradient(45deg, #68c8b8, #3677cc);
			
			.search {
				margin: 40px 20px 0 20px;
			}
		}

		.swiper {
			width: 100%;
			height: 160px;
			margin: 20px 0 0 0;
			z-index: 99;
			display: flex;
			justify-content: center;
			position: relative;
			.swiper-item {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
		}

		.sorts {
			width: 85%;
			height: 200px;
			background-color: white;
			margin-top: 100px;
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			font-size: 12px;

			.box1-sort-item {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
		}

		.recomend {
			width: 85%;
			height: auto;
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 50px;

			.title {
				font-size: 18px;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.scrollview {
				width: 100%;
				height: 100px;

				image {
					width: 70px;
					height: 70px;
				}
			}
		}

		.title {
			font-size: 18px;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 10px 0;
		}

	}

	.scroll-list {
		@include flex(column);
		margin-top: 20px;

		&__goods-item {
			margin-right: 20px;

			&__image {
				width: 60px;
				height: 60px;
				border-radius: 4px;
			}

			&__text {
				text-align: center;
				font-size: 12px;
				margin-top: 5px;
			}
		}

		&__show-more {
			background-color: #fff0f0;
			border-radius: 3px;
			padding: 3px 6px;
			@include flex(column);
			align-items: center;

			&__text {
				font-size: 12px;
				width: 12px;
				color: #f56c6c;
				line-height: 16px;
				margin-top: 5px;
			}
		}
	}
</style>
