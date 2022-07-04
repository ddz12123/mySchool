<template>
	<view class="flex-column" style="overflow-y: scroll;width: 750rpx;height: 100vh;">
		<view class="" style="height: 300px;margin-top: 15px;" v-for="(item,index) in itemList">
			<uni-card style="height: 100%;" :title="item.title" :sub-title='item.publishTime' :thumbnail="userInfo.pic">
						
							<text class="uni-body">{{item.content}}</text>
							<image  style="width: 100%;height: 180px;margin-top: 10px;" :src="item.imgList"></image>
						
						</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[],
				userInfo:[]
			}
		},
		methods: {
		
		},
		onLoad(options) {
			let option=JSON.parse(options.item);
			let opts={
				url:'/users/findUser',
				method:"GET"
			}
			let data={
				phone:option.phone
			}
			let res2=this.$myHttp.httpRequest(opts, data);
			res2.then(res=>{
				////console.log(res);
				if(res.data.data.length>0){
					res.data.data.map((v,k)=>{
						v.pic=this.$BaseUrl.BaseUrl+v.pic
					})
						this.userInfo=res.data.data;
				}else{
					
						this.userInfo.pic=this.$BaseUrl.BaseUrl+'/public/image/ava.png'
					
				}
				option.map((item,index)=>{
					item.imgList=this.$BaseUrl.BaseUrl+item.imgList;
				})
				this.itemList=option;
				//console.log(option);
				
			
				////console.log(this.userInfo)
			})
		
			
		}
	}
</script>

<style>

</style>
