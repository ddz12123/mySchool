<template>
	<view class="main flex1 flex-row align-item-center margin-top10">
		<view class="left">
			<image :src="this.$myHttp.baseUrl+busdata.simg" mode=""></image>
		</view>
		<view class="right flex-column flex1 margin-left20">
			<view class="title title-text">
				{{busdata.sname}}
			</view>
			<view class="score flex-row">
				 <uRate :count="count" v-model="value" active-color='#FFC641'></uRate>
				 <text class="color-text">{{busdata.score/10}}分</text>
				 <text class="margin-left40 text">月销{{busdata.mcount}}</text>
				 <view class="flex1" style="display: flex;flex-direction: row-reverse;">
				 	<text class="margin-right60 text">{{busdata.ranges}}m</text>
				 </view>
			</view>
			<view class="consume flex-row">
				<view class="text">
					起送
					<text>￥{{busdata.sprice}}</text>
				</view>
				<view class="margin-left20 text">
					配送
					<text>￥{{busdata.lprice}}</text>
				</view>
				<view class="margin-left20 text">
					人均
					<text>￥{{busdata.eprice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uRate from "../uview-ui/components/u-rate/u-rate.vue";
	export default {
		components: {
					uRate
				},
				props:['busdata'],
		name:"shopCard",
		data() {
			return {
				count: 1,
				value:1,
				Data:''
			};
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.main{
		width: 750rpx;
		height: 120rpx;
		.left{
			height: 100%;
			width: 120rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			title{
				width: 100%;
				height: 30rpx;
			}
		}
	}
	.text{
			font-size: 13px;
		    color: #858687;
		    font-weight: 400;
	}
	.color-text{
		color: #FF8000;
	}
	.title-text{
		    font-size: 16px;
		    color: #222426;
		    line-height: 20px;
		    white-space: nowrap;
		    width: 80%;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    font-weight: 600;
	}
</style>
