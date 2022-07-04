<template>
	<view class="flex-column flex1">
		<view class="card">
			<card
				:data="data"
				@previewImage="previewImage"
				:flag="flag"
			>
			</card>	
		</view>
		<view class="ly">
			<span class="margin-left40">留言:</span>
			<span class="margin-left20">0</span>
		</view>
		<view class="bottom flex-row space-between align-item-center" v-if="data[0].imgList!=null">
			<!-- <view class="flex-row just-content-center" style="width: 50%;">
				<view style="width: 25px;height: 25px;margin-right: 40px;">
					<image src="../img/zz.png" mode="" style="width: 100%;height: 100%;"></image>
				</view>
				<view style="width: 25px;height: 25px;">
					<image src="../img/wsc.png" mode="" style="width: 100%;height: 100%;" ></image>
				</view>
			</view> -->
			<view style="width: 90%;color: white;text-align: center;background-color: #ffaa7f;height: 100%;line-height: 50px;margin-left: 5%;border-radius: 10px;" @click="open()">
				<span>{{name}}</span>
			</view>
					<u-popup :show="show" @close="close" :closeable="true" round='10'>
			            <view class="model">
							<view class="flex-row align-item-center">
								<img src="../img/qq.png" alt="">
								 <u-tooltip :text="data[0].email" direction="top" bgColor="#e3e4e6">
								 </u-tooltip>
							</view>
							<view class="" style="font-size: 12px;margin-left: 20px;">
								(长按复制)
							</view>
							
			            </view>
						
					</u-popup>
		</view>
	
	</view>
</template>

<script>
	import card from "@/components/newCard.vue"
	export default {
		components: {
			card
		},
		data() {
			return {
				data:[],
				current:1,
				name:'联系卖家',
				show:false,
				flag:1
			}
		},
		methods: {
			previewImage(item,index){
				uni.previewImage({
					current:index, //预览图片的下标
					urls:item //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
				////console.log(item)
			},
			 open() {
				 this.show = true
			          // //console.log('open');
			        },
			        close() {
			          this.show = false
			          // //console.log('close');
			        }
		},
		onLoad: function (option) {
			////console.log(option.flag)
			this.flag==option.flag
		   
			if(option.flag==2){
				this.current==2;
				this.data[0]=JSON.parse(option.item);
				this.data[0].imgList=null;
				this.data[0].price='联系老板商量吧';
				this.name='联系买家'
			}else{
				 this.data[0]=JSON.parse(option.item);	
			}
			//this.current=option.current+'';
			
			//console.log(JSON.parse(option.item))
		}
	}
</script>

<style scoped lang="scss">
	
	.card{
		padding-bottom: 30px;
		border-bottom: 1px solid #ccc;
		box-shadow: 3px 3px 3px 3px  #f7f7f7;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.ly{
		background-color: #f7f7f7;
		margin-top: 5px;
		height: 30px;
		line-height: 30px;
		padding-bottom: 5px;
	}
	.bottom{
		height: 50px;
		position: fixed;
		bottom: 0;
		width: 750rpx;
		background-color: #f7f7f7;
	}
	.model{
		height: 150px;
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
