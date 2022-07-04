<template>
	<view class="flex-column main">
			<u-sticky>
		<u-tabs
		    :list="list4"
		    lineWidth="80"
		    lineHeight="5"
		    :activeStyle="{
		        color: '#303133',
		        fontWeight: 'bold',
		        transform: 'scale(1.05)'
		    }"
		    :inactiveStyle="{
		        color: '#606266',
		        transform: 'scale(1)'
		    }"
		    itemStyle="padding-left: 15px; padding-right: 15px; height: 45px;width:200rpx;background-color: #e6e6e6;"
			 @click='click'
		    >
		    </u-tabs>
		</u-sticky>
		
			<u-line style="margin-top:10px;" color="#ccc"></u-line>
			
			<view class="flex1 flex-column" v-if="current==0">
				<view class="" style="height: 400px;margin-top: 15px;" v-for="(item,index) in mydata">
					<uni-card style="height: 100%;" :title="item.title" :sub-title='item.date'>
								
									<text class="uni-body">{{item.content}}</text>
										<image  style="width: 100%;height: 180px;margin-top: 10px;" :src="item.imglist"></image>
									<view slot="actions" class="card-actions">
										<view class="card-actions-item" @click="actionsClick()">
											<uni-icons type="heart" size="24" color="#aaffff" ></uni-icons>
											<text class="card-actions-item-text" >收藏</text>
										</view>
										<view class="card-actions-item" @click="deleteWall(item.wid)">
											<uni-icons type="trash-filled" size="24" color="#ff0000"></uni-icons>
											<text class="card-actions-item-text">删除</text>
										</view>
										
									</view>
								</uni-card>
				</view>
				
			</view>
			<view class="flex1 flex-column" v-if="current==1">
				<view class="" style="height: 400px;margin-top: 15px;" v-for="(item,index) in secondHand">
					<uni-card style="height: 100%;" :title="item.title" :sub-title='item.cTime' extra='出闲置'>
								
									<text class="uni-body">{{item.content}}</text>
										<image  style="width: 100%;height: 180px;margin-top: 10px;" :src="item.imgList"></image>
									<view slot="actions" class="card-actions">
										<view class="card-actions-item" @click="actionsClick(item)">
											<uni-icons type="heart" size="24" color="#aaffff" ></uni-icons>
											<text class="card-actions-item-text" >收藏</text>
										</view>
										<view class="card-actions-item" @click="deleteSecond(item.hid)">
											<uni-icons type="trash-filled" size="24" color="#ff0000"></uni-icons>
											<text class="card-actions-item-text">删除</text>
										</view>
										
									</view>
								</uni-card>
				</view>
				<view class="" style="height:auto;margin-top: 20px;" v-for="(item,index) in lookGoods">
					<uni-card style="height: 100%;" :title="item.title" :sub-title='item.cTime' extra='求闲置'>
								
									<text class="uni-body">{{item.content}}</text>
										
									<view slot="actions" class="card-actions">
										<view class="card-actions-item" @click="actionsClick(item)">
											<uni-icons type="heart" size="24" color="#aaffff" ></uni-icons>
											<text class="card-actions-item-text" >收藏</text>
										</view>
										<view class="card-actions-item" @click="deleteLooks(item.lid)">
											<uni-icons type="trash-filled" size="24" color="#ff0000"></uni-icons>
											<text class="card-actions-item-text">删除</text>
										</view>
										
									</view>
								</uni-card>
				</view>
			</view>
			<view class="flex1 flex-column" v-if="current==2">
				<view class="" style="height: 400px;margin-top: 15px;" v-for="(item,index) in LostList">
					<uni-card style="height: 100%;" :title="item.title" :sub-title='item.publishTime' :extra='item.sort' >
								
									<text class="uni-body">{{item.content}}</text>
										<image  style="width: 100%;height: 180px;margin-top: 10px;" :src="item.imgList"></image>
									<view slot="actions" class="card-actions">
										<view class="card-actions-item" @click="actionsClick('分享')">
											<uni-icons type="heart" size="24" color="#aaffff" ></uni-icons>
											<text class="card-actions-item-text" >收藏</text>
										</view>
										<view class="card-actions-item" @click="deleteLost(item.gid)">
											<uni-icons type="trash-filled" size="24" color="#ff0000"></uni-icons>
											<text class="card-actions-item-text">删除</text>
										</view>
										
									</view>
								</uni-card>
				</view>
			</view>
	</view>
</template>

<script>
	import api from "@/net/api.js"
	export default {
		data() {
			return {
				list4: [{
				                    name: '校园墙',
				                    badge: {
				                        isDot: true
				                    }
				                }, {
				                    name: '跳蚤市场'
				                }, {
				                    name: '失物招领',
				                }],
								current: 0,
								userInfo:[],
								mydata:[],
								secondHand:[],
								lookGoods:[],
								LostList:[]
			}
		},
		methods: {
			click(index) {
				////console.log(index.index);
				this.current = index.index;
			},
			getInfo(){
				api.getInfo({
				phone:localStorage.getItem('phone')
			}).then(res=>{
					////console.log(res);
					this.userInfo=res.data.data[0]
				}).catch(err=>{
					uni.showToast({
						title:'身份失效，重新登陆',
						duration: 2000,
						icon: "error",
						position: "center"
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},2000)
				})
			},
			async getLooks(){
				let opts={
					url:'/other/myWallList',
					method:"GET"
				}
				let data={
					uid:this.userInfo.uid
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				let result=res.data.data;
				
				result.map((item,index)=>{
					item.imglist=this.$BaseUrl.BaseUrl+item.imglist;
					item.date=uni.$u.timeFormat(item.date, 'yyyy-mm-dd hh:MM')
				})
				//console.log(result);
				this.mydata=result;

			},
			async getSecond(){
				let opts={
					url:'/other/mySecondList',
					method:"GET"
				}
				let data={
					uid:this.userInfo.uid
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				let result=res.data.data;
				
				result.map((item,index)=>{
					item.imgList=this.$BaseUrl.BaseUrl+item.imgList;
				})
				//console.log(result);
				this.secondHand=result;
			
			},
			async getLookGoods(){
				let opts={
					url:'/other/myLookgoodsList',
					method:"GET"
				}
				let data={
					uid:this.userInfo.uid
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				let result=res.data.data;
			
				//console.log(result);
				this.lookGoods=result;
			
			},
			async getLost(){
				let opts={
					url:'/other/myLostList',
					method:"GET"
				}
				let data={
					phone:this.userInfo.phone
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				let result=res.data.data;
				
				result.map((item,index)=>{
					item.imgList=this.$BaseUrl.BaseUrl+item.imgList;
				})
				//console.log(result);
				this.LostList=result;
			
			},
			actionsClick(e){
				//console.log(e)
			},
			async deleteLooks(e){
				//console.log(e);
				let id=e;
				let opts={
					url:'/other/deleteLooksByID',
					method:"DELETE"
				}
				let data={
					id:id
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				
				if(res.data.data.affectedRows==1){
					uni.showToast({
						title:'删除成功',
						duration: 1000,
						icon: "success",
						position: "center"
					});
					this.getLookGoods();
					//console.log(res.data);
				}
				
			},
			async deleteSecond(e){
				let id=e;
				//console.log(e);
				let opts={
					url:'/other/deleteSecondByID',
					method:"DELETE"
				}
				let data={
					id:id
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				
				if(res.data.data.affectedRows==1){
					uni.showToast({
						title:'删除成功',
						duration: 1000,
						icon: "success",
						position: "center"
					});
					this.getSecond();
					//console.log(res.data);
				}
				
			},
			async deleteLost(e){
				//console.log(e);
				let id=e;
				let opts={
					url:'/other/deleteLostByID',
					method:"DELETE"
				}
				let data={
					id:id
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				
				if(res.data.data.affectedRows==1){
					uni.showToast({
						title:'删除成功',
						duration: 1000,
						icon: "success",
						position: "center"
					});
					this.getLost();
					//console.log(res.data);
				}
			},
			async deleteWall(e){
				//console.log(e);
				let id=e;
				let opts={
					url:'/other/deleteWallByID',
					method:"DELETE"
				}
				let data={
					id:id
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				
				if(res.data.data.affectedRows==1){
					uni.showToast({
						title:'删除成功',
						duration: 1000,
						icon: "success",
						position: "center"
					});
					this.getLooks();
					//console.log(res.data);
				}
			}
		},
		
		onLoad() {
			if(sessionStorage.getItem("isLogin")=='true'){
				api.getInfo({
					phone:localStorage.getItem('phone')
				}).then(res=>{
						////console.log(res);
						this.userInfo=res.data.data[0];
						this.getLooks();
						this.getSecond();
						this.getLookGoods();
						this.getLost();
					}).catch(err=>{
						uni.showToast({
							title:'身份失效，重新登陆',
							duration: 2000,
							icon: "error",
							position: "center"
						});
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/login/login'
							})
						},2000)
					});
			}else{
				uni.showToast({
					title:'请先登录',
					duration: 2000,
					icon: "error",
					position: "center"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/login/login'
					})
				},2000)
			}	
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		width: 750rpx;
		height: 100vh;
	}
	.card-actions{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 10px;
		border-top: 1px solid #ccc;
		.card-actions-item{
				margin-top: 10px;
				height: 30px;
				display: flex;
				align-items: center;
				
		}
		
		
	}

</style>
