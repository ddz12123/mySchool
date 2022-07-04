<template>
	<view class="main">
		<u-sticky bgColor="#ffffff">
			<u-tabs :list="list" lineWidth="70" :itemStyle="itemStyle" @click="click"></u-tabs >
		</u-sticky>
		<view class="tabs" v-if="index==0">
			<view class="item1" v-for="(item,index) in newList" @tap="toNew1(item.url)">
				<view class="left" v-if="item.picUrl!=''">
					<img :src="item.picUrl" alt="暂无">
				</view>
				<view class="right">
					<view class="title">
						{{item.title}}
					</view>
					<view class="bottom">
						<view class="">
							{{item.ctime.split(' ')[0]}}
						</view>
						<view class="margin-left20">
							{{item.source}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tabs" v-if="index==1">
			<view class="item1" v-for="(item,index) in localNewList">
				<view class="left" v-if="item.picUrl!=''">
					<img :src="item.picUrl" alt="暂无">
				</view>
				<view class="right">
					<view class="title">
						{{item.title}}
					</view>
					<view class="bottom">
						<view class="">
							{{item.ctime.split(' ')[0]}}
						</view>
						<view class="margin-left20">
							{{item.source}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '头条资讯'
				}, {
					name: '公考资讯'
				}],
				itemStyle: {
					height: '44px',
					width:'300rpx',
				},
				index:0,
				pageSize:20,
				page:1,
				newList:[],
				localNewList:[]

			}
		},
		onLoad() {
			this.getNewsList();
			this.getLocalNews();
		},
		onReachBottom() {
			this.page++;
			this.getNewsList();
		},
		methods: {
			  click(index) {
			                //console.log('index', index.index);
							this.index=index.index;
			            },
						getNewsList(){
							let that = this;
							uni.request({
								url: 'http://api.tianapi.com/topnews/index',
								data: {
									key:'f879b41e91380fa5238178f2bf7b95c3',
									page:this.page,
									num:this.pageSize
								},
								method: "GET",
								header: {
									'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
									
								},
								success: (res) => {
									//console.log(res);
									this.newList=this.newList.concat(res.data.newslist);	
								}
							
							})
						},
						getLocalNews(){
							let that = this;
							uni.request({
								url: 'http://api.tianapi.com/areanews/index',
								data: {
									key:'f879b41e91380fa5238178f2bf7b95c3',
									areaname:'云南',
								},
								method: "GET",
								header: {
									'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
									
								},
								success: (res) => {
									//console.log(res);
									this.localNewList=res.data.newslist;	
								}
							
							})
						},
						toNew1(e){
							//console.log(e);
							uni.navigateTo({
								url:`/pages/newDetail/newDetail?nid=${e}`
							})
						}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100vh;
		width: 750rpx;
		display: flex;
		flex-direction: column;

		.tabs {
			display: flex;
			flex: 1;
			flex-direction: column;
		}
		.item1{
			display: flex;
			flex-direction: row;
			height: 120px;
			border-bottom: 1px solid #ccc;
			margin: 5px 20px;
			.left{
				height: 100%;
				width: 35%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				img{
					width: 80%;
					height: 80%;
					border-radius: 10px;
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				flex: 1;
				.title{
					font-size: 15px;
					font-weight: bold;
				}
				.bottom{
					display: flex;
					flex-direction: row;
					font-size: 12px;
					color: #ccc;
				}
			}
		}
	}
</style>
