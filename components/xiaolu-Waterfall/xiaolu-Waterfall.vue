<template>
	<view class="container">
		<view class="list">
			<view class="list-item"  v-for="(item,index) in imgList" :key="index" @click="bindTab(item)">
				<image class="item-img" :src="item.url" mode="widthFix"></image>
				<view class="content">
					{{item.title}}
				</view>
				<view v-if="item.price!=''" class="content price">
					￥{{item.price}}
				</view>
			</view>
		</view>
		<u-loadmore :status="status" style="margin-bottom:60px;"/>						
	</view>
</template>

<script>
	export default {
		props:{
			imgList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			status
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			bindTab(e){
				this.$emit('bindTab',e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100vh;
		overflow-y: scroll;
		background-color: rgba(226, 226, 226, 0.452);
	}
	.list {
	  padding-top: 4rpx;
	  column-count: 2;
	  column-gap: 18rpx;
	  margin: 10px;
	  .list-item {
	    display: inline-block;
	    margin-top: 8px;
	    width: 310rpx;
	    background: white;
	    box-shadow: 0 0 10rpx 0 rgba(194, 194, 194, 0.1);
	    border-radius: 14rpx;
	    break-inside: avoid;
	    padding-bottom: 20rpx;
	    overflow: auto;
		.item-img{
			width: 100%;
			
		}
		.content{
			 width: 95%;
			 margin-left: 5%;
			 margin-top: 20px;
			 font-size: 26rpx;
			 margin-bottom: 10px;
			  word-break: break-all;
		}
	  }
	}
	.price{
		color: red;
		margin-top: 10rpx;
	}
</style>
