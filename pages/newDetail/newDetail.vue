<template>
	<view style="width: 100%;height: 100%;align-items: center;" class="flex-column">
		<view class="title">
			{{item.title}}
		</view>
		<view class="time">
			发布时间:{{item.date}}
		</view>
		<img :src="item.img" alt="" style="width: 85%;border-radius: 5px;margin-top: 10px;">
		<view class="content">
			{{item.content}}
		</view>
	</view>
</template>

<script>
	import api from "@/net/api.js"
	export default {
		data() {
			return {
				item:[],
				id:''
			}
		},
		methods: {
			async getnotic(){
				let opts = {
					url: '/bus/getNoticelistByID',
					method: "GET"
				}
				let data = {
					id:this.id
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				//console.log(res)
				this.item=res.data.data[0];
			
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				////console.log(option.nid);
				this.id=option.nid;
				this.getnotic();
			}
	}
</script>

<style scoped lang="scss">
.title{
	width: 85%;
	margin-top: 20px;
	font-size: 18px;
}
.time{
	margin-top: 10px;
	color: #c48a34;
}
.content{
	width: 80%;
	margin-top: 10px;
}
</style>
