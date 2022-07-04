<template>
	<view class="main">
		<view class="top">

		</view>
		<view class="" style="width: 750rpx; height: 30px;margin-bottom: 10px;">
			<u-notice-bar :text="text"></u-notice-bar>
		</view>

		<view class="flex1 flex-column" style="width: 90%;margin-left: 5%;">
			<u-transition :show="true" mode="fade-up">
			<view class="items" :style="{backgroundImage: 'url(' + imageURL + ')'}" v-for="(item,index) in list" @click="toDetails(item)">
				<view class="itemMain">
					<view class="flex-row space-between">
						<view class="Topleft">
							<view class="ava">
								<img :src="item.pic" alt="">
							</view>
							<view class="titles">
								{{item.username}}
							</view>
						</view>
						<view class="flex1 align-item-center"
							style="flex-direction: row-reverse;font-size: 12px;color: #ccc;">
							{{item.date}}
						</view>
					</view>
					<view class="flex1 flex-column">
						<view class="desc">
							{{item.content}}
						</view>
						<view class="imgs" v-if="item.imglist!==''">
							<img :src="item.imglist" v-if="item.imglist!==''">
						</view>
					</view>
				</view>

			</view>
			 </u-transition>		
		</view>
		<u-transition :show="true" mode="fade-down">
		<uni-fab horizontal='right' :pattern="pattern" :content="content" direction="vertical" @trigger="trigger">
		</uni-fab>
		 </u-transition>	
		<u-back-top :scrollTop="scrollTop" mode="square" :iconStyle="iconStyle" text="top" icon="arrow-up"></u-back-top>
	</view>
</template>

<script>
	import api from "@/net/api.js"
	export default {
		data() {
			return {
				text: '马上毕业了，有什么想说的就赶紧说出来吧',
				imageURL: '../../static/images/img/1.png',
				list: "",
				scrollTop: 0,
				iconStyle: {
					fontSize: '32rpx',
					color: '#d18b00'
				},
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#d18b00',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '../../static/images/fb2.png',
						selectedIconPath: '../../static/images/fb1.png',
						text: '发布',
						active: false
					},
					{
						iconPath: '../../static/images/tapbar/wode.png',
						selectedIconPath: '../../static/images/tapbar/my2.png',
						text: '我的',
						active: false
					}
				]
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
		async getWallList() {
				let opts = {
					url: '/bus/getWallList',
					method: "GET"
				}
				let data = {
					
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				res.data.data.map((item, index) => {
					if (item.content.length > 40) {
						item.content = item.content.slice(0, 30) + '...'
					}
					if (item.imglist !== '') {
						item.imglist = this.$BaseUrl.BaseUrl + item.imglist;
					}
					item.pic = this.$BaseUrl.BaseUrl + item.pic;
					item.date=uni.$u.timeFormat(item.date, 'yyyy-mm-dd hh:MM')
				});
				this.list = res.data.data;
			},
			trigger(e) {
				this.content[e.index].active = !e.item.active
				//console.log(e);
				if(e.index==0){
					uni.navigateTo({
						url:'/pages/addWall/addWall'
					})
				}
				if(e.index==1){
					uni.navigateTo({
						url:'/pages/live/live'
					})
				}
			},
			toDetails(e){
				////console.log(e);
				uni.navigateTo({
					url:`/pages/wallDetail/wallDetail?id=${e.wid}`
				})
			}

		},
		onLoad() {
			this.getWallList();

		}
	}
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
		flex-direction: column;
		height: auto;
	
	.top {
			width: 100%;
			height: 200px;
			background: url('@/static/images/img/wall.jpeg') no-repeat center;
			background-size: contain;
		}

		.items {
			width: 100%;
			height: 200px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100% 95%;
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.title {
				width: 100%;
				height: 20px;
				line-height: 20px;
				display: flex;
				flex-direction: row;
			}

			.itemMain {
				height: 100%;
				margin: 20px;
				display: flex;
				flex-direction: column;

				.Topleft {
					display: flex;
					flex-direction: row;
					width: 30%;
					align-items: center;
					justify-content: space-around;

					.titles {
						font-size: 13px;
						color: goldenrod;
					}
				}

				.desc {
					height: 40px;
					font-size: 14px;
					overflow: hidden;
					margin-top: 5px;
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-left: 10px;
				}

				.imgs {
					display: flex;
					flex: 1;
					flex-direction: row;

					img {
						width: 70px;
						height: 70px;
						border-radius: 10px;
					}
				}
			}
		}

		.ava {
			width: 35px;
			height: 35px;
			overflow: hidden;
			border-radius: 50%;
			display: flex;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
