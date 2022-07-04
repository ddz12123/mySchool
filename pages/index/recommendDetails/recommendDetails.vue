<template>
	<view class="main">
		<view class="topImg">
			<img :src="content.img" alt="">
		</view>
		<view class="title"> 
			{{content.title}}
		</view>
		<view class="time">
			{{content.time}}
		</view>
		<view class="content">
			{{content.desc}}
		</view>
	</view>
</template>

<script>
	import api from "../../../net/api.js"
	export default {
		data() {
			return {
				id:'',
				content:[]
			}
		},
		methods: {
			async getDetails(){
				let opts = {
					url: '/bus/getRecomendById',
					method: "GET"
				}
				let data = {
					id:this.id
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				res.data.data[0].img=this.$BaseUrl.BaseUrl+res.data.data[0].img
				this.content=res.data.data[0]
				//console.log(res.data);
			}
		},
		onLoad(options){
			//console.log(options);
			this.id=options.id;
			this.getDetails();
		}
		
	}
</script>

<style lang="scss" scoped>
	.main{
		display:flex;
		flex-direction: column;
		align-items: center;
		.topImg{
			width:750rpx;
			height:350rpx;
			img{
				width:100%;
				height:100%;
			}
		}
		.title{
			font-size: 20px;
			margin-top: 15px;
		}
		.time{
			color: #ccc;
			margin-top: 5px;
			margin-left: 50%;
			font-size: 12px;
		}
		.content{
			margin: 15px 20px;
		}
	}
</style>
