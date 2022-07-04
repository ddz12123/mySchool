<template>
	<view class="flex-column">
		<view class="flex-column" style="position: fixed;z-index: 99;">
			<view class="search">
				<u-search placeholder="请输入内容" v-model="search" style="padding: 15px 20px;" :show-action="true" actionText="搜索" :animation="true" @custom='lostSearch()'>
				</u-search>
			</view>
			<view class="flex-row flex-warp" style="background-color: white;padding-left: 20px;">
				<view class="u-page__tag-item" v-for="(item, index) in checkboxs" :key="index">
					<u-tag :text="item.name" :plain="!item.checked" type="warning" :name="index" size="mini"
						@click="checkboxClick">
					</u-tag>
				</view>
			</view>
			<view class="flex-row flex-warp" style="background-color: white;padding-left: 20px;">
				<view class="" style="padding-bottom: 15px;" v-for="(v,k) in searchtags">
					<u-tag :text="v.name" size="mini" closable :show="v.show" @close="v.show = false" type="warning" :plain="!v.checked"></u-tag>
				</view>
			</view>
		</view>

		<view class="" style="background-color: #f3f3f3;padding: 0 10px;margin-top: 180px;">
			<view class="waterfall-box h-flex-x h-flex-2" >
				<view>
					<helang-waterfall v-for="(item,index) in leftList" :key="index" :params="item" tag="left" 
						:index="index" @height="onHeight" @click="onClick"></helang-waterfall>
				</view>
				<view>
					<helang-waterfall v-for="(item,index) in rightList" :key="index" :params="item" @height="onHeight" 
						@click="onClick" tag="right" :index="index"></helang-waterfall>
				</view>
			</view>
			<view class="load-txt">{{ajax.loadTxt}}</view>
		</view>
		<u-back-top :scrollTop="scrollTop" :mode="mode" :iconStyle="iconStyle"></u-back-top>
		<u-popup :show="show" mode="center"  @close="close" @open="open" closeable	 :round="10">
		    <view style="width:600rpx;height: 1100rpx;overflow-y: scroll;">
		       <view class="flex1 flex-column " >
				   <u-transition :show="true" mode="fade-down">
					<image :src="`${this.$BaseUrl.BaseUrl}${clcikData.imgList}`" mode="" style="width: 400rpx;height: 300rpx;margin-left: 100rpx;margin-top: 45px;border-radius: 10px;"></image>
					</u-transition>
					<view class="margin-top20 flex-row margin-left40">
						<view class="" style="width:50px;">
							标题:
						</view>
						<view >
							{{clcikData.title}}
						</view>
					</view>
					<view class="margin-top20  margin-left40" v-if="clcikData.state==2">
						
						<view >
							地点:教学楼
						</view>
					</view>
					<view class="margin-top20  margin-left40" v-if="clcikData.state==1">
						
						<view >
							丢失地:{{clcikData.area}}
						</view>
					</view>
					<view class="margin-top20  margin-left40">
						
						<view >
							时间:{{clcikData.publishTime}}
						</view>
					</view>
					<view class="margin-top20  margin-left40">
						
						<view >
							描述:</br>{{clcikData.content}}
						</view>
					</view>
					<view class="margin-top20  margin-left40">
						
						<view >
							联系人:{{clcikData.name}}
						</view>
					</view>
					<view class="margin-top20  margin-left40" v-if="clcikData.state==2">
						
						<view >
							暂存地:{{clcikData.storage}}
						</view>
					</view>
					
					
					
					<view class="margin-top20 margin-bottom40 flex-row space-around" >
						<u-button type="primary" text="认领" style="width: 40%;" @click="rl()"></u-button>
						<u-button type="success" text="已认领" style="width: 40%;" @click='rldj(clcikData.gid)'></u-button>
					</view>
					<view class="model" v-if="showData">
						<view class="flex-row align-item-center">
							<u-transition :show="true" mode="slide-left">
							<img src="../../secondHand/img/qq.png" alt="">
							</u-transition>
							<u-transition :show="true" mode="slide-left">
							 <u-tooltip :text="clcikData.email" direction="top" bgColor="#e3e4e6">
							 </u-tooltip>
							 </u-transition>
							 <u-transition :show="true" mode="slide-left">
							 <view class="" style="font-size: 12px;margin-left: 5px;color: #ccc;">
							 	(长按复制)
							 </view>
							 </u-transition>
						</view>
						
						<u-transition :show="true" mode="slide-left">
							<view class="flex-row align-item-center" >	
								<u-transition :show="true" mode="slide-left">
								<img src="../../secondHand/img/phone.png" alt="" style="transform: scale(0.9);margin-left: 6px;">
								</u-transition>
								<u-transition :show="true" mode="slide-left">
								<u-tooltip :text="clcikData.phone" direction="bottom" bgColor="#e3e4e6"> </u-tooltip>
								</u-transition>
								<u-transition :show="true" mode="slide-left">
								<view class="" style="font-size: 12px;margin-left: 5px;color: #ccc;">
									(长按复制)
								</view>
								</u-transition>					
							</view>
						</u-transition>
					</view>
		       </view>
		    </view>
		</u-popup>
		
	</view>
	
</template>

<script>
	import helangWaterfall from "@/uni_modules/helang-waterfall/components/helang-waterfall/helang-waterfall";
	import api from "@/net/api.js"
	export default {
		components: {
			"helang-waterfall": helangWaterfall
		},
		data() {
			return {
				scrollTop: 0,
				mode: 'circle',
				iconStyle: {
					fontSize: '32rpx',
					color: '#f9ae3d'
				},
				search: '',
				showData:false,
				close1: true,
				checkboxs: [
					{
						checked: true,
						name: '全部'
					},
					{
						checked: false,
						name: '学习用品'
					},
					{
						checked: false,
						name: '书籍'
					},

					{
						checked: false,
						name: '证件'
					},
					{
						checked: false,
						name: '生活用品'
					},
					{
						checked: false,
						name: '衣物'
					},
					{
						checked: false,
						name: '其他'
					},

				],
				searchtags:[
					
				],
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				ajax: {
					// 是否可以加载
					load: true,
					// 加载中提示文字
					loadTxt: '',
					// 每页的请求条件
					rows: 5,
					// 页码
					page: 1,
				},
				clcikData:[],
				show:false,
				empty:true
	
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReady() {
			this.getList();
		},
		// 触底触发
		onReachBottom() {
			this.getList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
			setTimeout(() => {
				this.ajax.page = 1;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.ajax.load = true;
				this.getList();
			}, 800);
		},
		methods: {
			rldj(id){
				uni.navigateTo({
					url:`/pages/rldj/rldj?id=${id}`
				})
			},
			lostSearch(){
				api.lostSearch({
					item:this.search
				}).then(result=>{
					//console.log(result);
						if(result.data.data.length>0){
							let res = [];
							for (let i = 0; i < result.data.data.length; i++) {
								res.push({
									url: this.$BaseUrl.BaseUrl + result.data.data[i].imgList,
									title: result.data.data[i].title,
									time: result.data.data[i].publishTime,
									label: result.data.data[i].sort,
									shop: result.data.data[i].state ,
									id:result.data.data[i].gid
								})
							}
							this.addList(res,true);
							if(this.searchtags!=''){
								this.searchtags.push({
									name:this.search,
									checked: true,
									show:true
								})
							}
							
						}else{
							this.empty==true;
							
							this.searchtags.push({
									name:this.search,
									checked: true,
									show:true
								})
							
							uni.showToast({
								title: '无搜索结果',
								duration: 3000,
								icon:"error"
							});
						}
						
				
				}).catch(err=>{
					//console.log(err)
				})
			},
			// 监听高度变化
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			 close() {
			        this.show = false
					this.showData=false;
			      },
				  rl(){
					this.showData=true;  
				  },
			//根据id查询详情
			async getDeatilsById(id){
					let opts = {
						url: '/bus/getLostListById',
						method: "GET"
					}
					let data = {
						gid:id
					}
					let result = await this.$myHttp.httpRequest(opts, data);
					////console.log(result.data.data[0]);
					this.clcikData=result.data.data[0];
				},
			// 组件点击事件
			onClick(index, tag) {
				// 对应的数据
					this.show=true;
					
				if (tag == 'left') {
					//console.log(this.leftList[index]);
					this.getDeatilsById(this.leftList[index].id);
				
				} else {
					//console.log(this.rightList[index]);
					this.getDeatilsById(this.rightList[index].id);
				}
				let direction = {
					"left": '左',
					"right": '右'
				}
				
			},
			
			// 获取数据
			async getList() {
				/* 
					无真实数据，当前由 setTimeout 模拟异步请求、
					自行替换 请求方法将数据 传入 addList() 方法中
					自行解决数据格式，自行修改组件内布局和内容绑定
				*/
				let opts = {
					url: '/bus/getLostList',
					method: "GET"
				}
				let data = {
					page_num: this.ajax.page,
					page_size: this.ajax.rows
				}
				let result = await this.$myHttp.httpRequest(opts, data);
				//console.log(result);

				if (!this.ajax.load) {
					return;
				}
				this.ajax.load = false;
				this.ajax.loadTxt = '加载中';

				setTimeout(() => {
					// 生成随机数方法
					let random = (min = 0, max) => {
						return Math.floor(Math.random() * max) + min;
					}

					let res = [];
					for (let i = 0; i < result.data.data.length; i++) {
						res.push({
							url: this.$BaseUrl.BaseUrl + result.data.data[i].imgList,
							title: result.data.data[i].title,
							time: result.data.data[i].publishTime,
							label: result.data.data[i].sort,
							shop: result.data.data[i].state,
							id:result.data.data[i].gid
						})
					}
					this.addList(res)
				}, 1000);

			},
			addList(res,flag) {
				// 获取到的数据，请注意数据结构
				//console.log(res);

				if (!res || res.length < 1) {
					this.ajax.loadTxt = '没有更多了';
					return;
				}

				// 左右列表高度的差
				let differ = this.leftHeight - this.rightHeight;
				// 计算差值，用于确定优先插入那一边
				let differVal = 0;

				// 初始化左右列表的数据
				let i = differ > 0 ? 1 : 0;

				let [left, right] = [
					[],
					[]
				];


				// 获取插入的方向
				let getDirection = (index) => {
					/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
					if (differ >= 600 && index < 3) {
						differVal = 1;
						return 'right';
					}

					/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
					if (differ <= -600 && index < 3) {
						differVal = -1;
						return 'left';
					}

					/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
					if (differ >= 350 && index < 2) {
						return 'right';
					}
					/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
					if (differ <= -350 && index < 2) {
						differVal = -1;
						return 'left';
					}

					/* 当前数据序号为偶数时，则插入到左边 */
					if ((i + differVal) % 2 == 0) {
						return 'left';
					} else {
						/* 当前数据序号为奇数时，则插入到右边 */
						return 'right';
					}
				}

				// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
				res.forEach((item, index) => {
					if (getDirection(index) == 'left') {
						////console.log(`差值：${differ},方向：left，序号${index}`)
						left.push(item);
					} else {
						////console.log(`差值：${differ},方向：right，序号${index}`)
						right.push(item);
					}
					i++; 
				});

				// 将左右列表的数据插入，第一页时则覆盖
				if(!flag){
					if (this.ajax.page == 1) {
					this.leftList = left;
					this.rightList = right;
					uni.stopPullDownRefresh();
					} else {
						this.leftList = [...this.leftList, ...left];
						this.rightList = [...this.rightList, ...right];
					}
				}else{				
						this.leftList = left;
						this.rightList = right;
						uni.stopPullDownRefresh();
				}
				
				
				this.ajax.load = true;
				this.ajax.loadTxt = '上拉加载更多';
				this.ajax.page++;
			},
		  async	checkboxClick(name) {	
				this.checkboxs.map((item, index) => {
									item.checked = index === name ? true : false
								})
				////console.log(this.checkboxs[name].name);
				let opts={
					url:'/bus/getLostListBySort',
					method:"GET"
				}
				let data={
					sort:this.checkboxs[name].name
				}
				let result=await this.$myHttp.httpRequest(opts, data);
				////console.log(result.data.data);
				
				let res = [];
				for (let i = 0; i < result.data.data.length; i++) {
					res.push({
						url: this.$BaseUrl.BaseUrl + result.data.data[i].imgList,
						title: result.data.data[i].title,
						time: result.data.data[i].publishTime,
						label: result.data.data[i].sort,
						shop: result.data.data[i].state,
						id:result.data.data[i].gid
					})
				}
				
				
				
				if(this.checkboxs[name].name=='全部'){
					uni.redirectTo({
					    url: '/pages/lost/goodsRegister/goodsRegister'
					});
				}else{
					this.addList(res,true)
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.search {
		width: 750rpx;
		background: white;
	}

	.u-page__tag-item {
		margin-right: 20px;
		margin-top: 10px;
	}

	.waterfall-box {
		padding: 20rpx 10rpx;
		box-sizing: border-box;

		>view {
			padding: 0 10rpx;
		}
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&.h-flex-2 {
			>view {
				width: 50%;
			}
		}
	}

	.load-txt {
		padding: 0 0 20rpx 0;
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}
	.model{
		height: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		img{
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
	}
</style>
