<template>
	<view class="flex-column flex1">
		<view style="width: 100%;height: 100%;display: flex;flex-direction: column;margin:0 15px;"  v-for="(item,index) in data" @click="toDetails(item)">
			<view style="display: flex;flex-direction: row;align-items: center;width: 100%;height: 60px;" >
				<view style="border: 1px solid #ccc;width: 40px;height: 40px;border-radius: 50%;overflow: hidden;">
					<image :src="item.pic" mode="" style="width: 100%;height: 100%;"></image>
				</view>
				<view style="display: flex;flex-direction: column;margin-left: 10px;flex: 1;">
					<view style="font-weight: bold;">
						{{item.username}}
					</view>
					<view style="display: flex;flex-direction: row;color: #ccc;font-size: 12px;">
						<view >
							{{item.cTime}}
						</view>
						<view style="margin-left: 10px;">
							昆明理工大学
						</view>
					</view>
				</view>
				<view style="font-weight: bold;font-size: 18px;color: #5f5f5f;margin-right: 40px;">
					 ...
				</view>
				
			</view>
		<!-- 正文 -->
			<view style="margin-top: 10px;margin-right: 50px;margin-left: 10px;">
				<span>
					{{item.content}}
				</span>
			</view>
			<view style="display: flex;flex-direction: row;flex-wrap: wrap;margin-top: 10px;width: 70%;" v-if="flag==1">
				<view style="width:100px;height:100px;border-radius: 5px;margin-left: 5px;" v-for="(item2,index2) in item.imgList">
					<image :src="item2" mode="" style="width:100%;height: 100%;border-radius: 5px" @tap="previewImage(item.imgList,index)" ></image>
				</view>
			
			</view>
			<view style="display: none;" v-else="flag==2">
				
			</view>
			<!-- 标签 -->
			<!-- <view style="margin-top: 15px;margin-left:5px;display:flex;flex-direction: row;" v-if="flag==1">
				<view style="background-color: rgba(255, 170, 127,0.6);width: auto;height:15px;border-radius: 5px;font-size: 12px;text-align: center;overflow: hidden;line-height: 15px;padding: 0 10px;color: rgb(255, 85, 0);margin-left: 5px;">
					<span>{{item.sort}}</span>
				</view>
			</view> -->
			<!-- 价格 -->
			<view style="display: flex;flex-direction: row;margin-top: 20px;margin-left: 10px;" v-if="flag==1">
				<view style="color: rgb(255, 170, 127);">
					￥ {{item.price}}
				</view>
			</view>
			<!-- 操作 -->
			<view v-if="flag==2" style="width: 100%;height: 15px;">
				
			</view>
			<view style="margin-top: 10px;display: flex;flex-direction: row;margin-left: 10px;"
			v-if="show">
				
				<view style="display: flex;flex-direction: row;width: 50%;height: 100%;justify-content: space-around;margin-left: 40%;">
						<view style="width: 25px;height: 25px;">
							<image src="./img/zz.png" mode="" style="width: 100%;height: 100%;"></image>
						</view>
						<view style="width: 25px;height: 25px;">
							<image src="./img/wsc.png" mode="" style="width: 100%;height: 100%;" ></image>
						</view>
				</view>
				
			</view>
			<!-- line -->
			<view class="" style="background-color: #dddddd; width: 90%;height: 2px;margin-top: 20px;" v-if="show">
				
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		name:"newCard",
		props:['data','flag','show'],
		data() {
			return {
				list:[],
				
			};
		},
		methods:{
			previewImage:function(item,index){
				
					this.$emit('previewImage',item);
				},
			toDetails(item){
				this.$emit('toDetails',item);
			},	
				
		},
		onLoad() {
			
		}
	
	}
</script>

<style scoped lang="scss">
	
</style>
