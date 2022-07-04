<template>
	<view>
		<u-sticky bgColor="#fff" offset-top="-50">
			<u-tabs :list="list" itemStyle="width:40%;height: 50px;" lineWidth="80" lineColor="#f56c6c" :activeStyle="{
						color: '#303133',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}" :inactiveStyle="{
						color: '#606266',
						transform: 'scale(1)',
					}" scrollable:false @click='click'>
						<view
						                slot="right"
						                style="margin-right: 20px;"
						                @tap="search()"
						        >
						            <u-icon
						                    name="search"
						                    size="30"
						                    bold
						            ></u-icon>
						        </view>
					</u-tabs>
		</u-sticky>
		<view class="flex-column flex1">
			<view class="line">
				
			</view>
			<view class="flex1 flex-column" v-if="current==0">
				
				<view class="flex1 flex-column" >
					<card
						:data="lists"
						@previewImage="previewImage"
						:flag=1
						@toDetails="toDetails"
						:show=true
					/>
				</view>
				<Drag @dragClick="dragClick1" creatTop="500" creatLeft="280" image="../../static/jia.png"
					imageWidth="84%">
				</Drag>
			</view>
			<view class="flex1 flex-column" v-if="current==1">
				<view class="flex1 flex-column" >
					<card
						:data="list2"
						@clickImg=""
						:flag=2
						:show=true
						@toDetails="toDetails"
					/>
					
				
				</view>
				<Drag @dragClick="dragClick2" creatTop="500" creatLeft="280" image="../../static/jia.png"
					imageWidth="84%">
				</Drag>
			</view>
		</view>
		<view class="serach" v-if="show">
			<view class="" style="width: 90%;margin-left: 5%;">
					<u-search :show-action="true" actionText="搜索" :animation="true" v-model='searchd' @custom='searchs()'></u-search>
			</view>
		
		</view>
		<u-empty
		        mode="search"
		        :show='showData'
		>
		</u-empty>
	</view>
</template>

<script>
	import Drag from '@/components/drag/drag.vue'
	import card from "@/components/newCard.vue";
	import api from "@/net/api.js"
	export default {
		components: {
			card,
			Drag
		},
		data() {
			return {
				list: [{
					name: '出闲置'
				}, {
					name: '求闲置'
				}],
				current: 0,
				lists:[],
				list2:[],
				searchd:'',
				show:false,
				showData:false
				
				          
				        
			}
		},
		methods: {
			toDetails(item,flag){
				////console.log(item);
				uni.navigateTo({
					url:`./secondHandDetails/secondHandDetails?item=`+JSON.stringify(item)
					+"&flag="+`${this.current+1}`
				})
			},
			previewImage(item,index){
				uni.previewImage({
					current:index, //预览图片的下标
					urls:item //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
				////console.log(item)
			},
			dragClick1() {
				////console.log('点击事件回调');
				uni.navigateTo({
					url:'addHands/addHands'
				})
			},
			dragClick2() {
				////console.log('点击事件回调');
				uni.navigateTo({
					url:'lookHands/lookHands'
				})	
			},

			click(index) {
				////console.log(index.index);
				this.current = index.index;
			},
			search(){
				//console.log(this.current);
				this.searchd='';
				this.show=true;
			},
			searchs(){
				//console.log(this.searchd);
				
				if(this.current==0){
					api.cxzSearch({
					item:this.searchd
					}).then(res=>{
						//console.log(res);
						let result=res.data.data;
						result.map((item,index)=>{
							item.pic=this.$BaseUrl.BaseUrl+item.pic;
							item.imgList=item.imgList.split(',');
							for(var i=0;i<item.imgList.length;i++){
								item.imgList[i]=this.$BaseUrl.BaseUrl+item.imgList[i]
							}
						})	
						this.lists=res.data.data;
						if(res.data.data.length==0){
							this.showData=true;
						}
						this.show=false;
					})
				}
				if(this.current==1){
					api.qxzSearch({
					item:this.searchd
					}).then(res=>{
						//console.log(res);
						let result=res.data.data;
						result.map((item,index)=>{
							item.pic=this.$BaseUrl.BaseUrl+item.pic;
							item.imgList=this.$BaseUrl.BaseUrl+item.imgList
						})
						
						this.list2=res.data.data;
						if(res.data.data.length==0){
							this.showData=true;
						}
						this.show=false;
					})
				}
				
			},
			async getLooks(){
				let opts={
					url:'/bus/getLookingList',
					method:"GET"
				}
				let data={
					
				}
				let res=await this.$myHttp.httpRequest(opts, data);
				let result=res.data.data;
				result.map((item,index)=>{
					item.pic=this.$BaseUrl.BaseUrl+item.pic;
					item.imgList=this.$BaseUrl.BaseUrl+item.imgList
				})
				this.list2=result;
				////console.log(this.list2)
			},
			async getSecondhand(){
				let opts={
					url:'/bus/getSecondList',
					method:"GET"
				}
				let data={
					
				}

				let res=await this.$myHttp.httpRequest(opts, data);
				let result=res.data.data;
				result.map((item,index)=>{
					item.pic=this.$BaseUrl.BaseUrl+item.pic;
					item.imgList=item.imgList.split(',');
					for(var i=0;i<item.imgList.length;i++){
						item.imgList[i]=this.$BaseUrl.BaseUrl+item.imgList[i]
					}
				})
				
					this.lists=result;
					//console.log(result)
		
				
			}
			
		},
		onLoad() {
			this.getLooks();
			this.getSecondhand();
			
		}
	}
</script>

<style lang="scss" scoped>
	.line{
		width: 100%;
		height: 5px;
		background: #e3e3e3;
	}
	.serach{
		position: absolute;
		height: 50px;
		background-color: #e3e3e3;
		width:100%;
		z-index: 9999;
		top: 0px;
		line-height: 50px;
	}
</style>
