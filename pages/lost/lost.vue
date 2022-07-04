<template>
	<view class="main">
		<image src="../../static/images/commonIcon/dszj.png" mode=""
		style="width: 80px;height: 80px;position: absolute;left: 60px;z-index: 999;top: 90px;"
		class="swzl"></image>
		<image src="../../static/images/commonIcon/qb.png" mode=""
		style="width: 40px;height: 40px;position: absolute;z-index: 999;
		right:40px;top: 240px;"></image>
		<image src="../../static/images/commonIcon/fdj.png" mode=""
		style="width: 40px;height: 40px;position: absolute;z-index: 999;
		right:180px;top:340px;" class="fdj"></image>
		<image src="../../static/images/commonIcon/mine.png" mode=""
		style="width: 30px;height: 30px;position: absolute;z-index: 999;
		right:55px;top:60px;"></image>
	
		
		<view class="lost" @click="toRegister()">
			<u-transition :show="true" mode="slide-down">
			    <view class="margin-top40">
					寻找失物
				</view>  
			</u-transition>
		</view>
		<view class="getgoods">
			
			<view class="margin-top40" @click="toLive()">
				我的
			</view>
			
		</view>
		<view class="add" @click="toSet()">
			  <u-transition :show="true" mode="slide-left">
			        <view class="margin-top40">
			        	失物登记
			        </view>	
			 </u-transition>
			
		</view>
		<view class="item1" @click="toHelp()">
			<view class="margin-top40" >
				帮助中心
			</view>
		</view>
		 <u-transition :show="true" mode="fade-down" duration='1000'>
		    <view class="item2">
			
			</view>
		</u-transition>
		
		<view class="item3">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//寻找失物
			toRegister(){
				uni.navigateTo({
					url:'./goodsRegister/goodsRegister'
				})
			},
			//失物登记
			toSet(){
				uni.navigateTo({
					url:'setInfo/setInfo'
				})
			},
			toHelp(){
				uni.navigateTo({
					url:'help/help'
				})
			},
			toLive(){
				uni.navigateTo({
					url:'/pages/live/live'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		color: white;
		
	}
	@keyframes example4 {
	  from {
		  margin-top: 50px;
		  margin-left: -20px;
	  }
	  to {
		  margin-top: 30px;
		  margin-left: -40px;
	  }
	}
	@keyframes example5 {
	  from {
		 left: 60px;top: 90px;
	  }
	  to {
		 left: 40px;top: 70px;
	  }
	}
	@keyframes example6{
	  from {
		right: 80px;
		top: 450px;
	  }
	  to {
		 right: 60px;
		 top: 470px;
	  }
	}
	@keyframes example7{
	  from {
		width: 50px;
		height: 50px;
	  }
	  to {
		width: 60px;
		height: 60px;
	  }
	}
	.swzl{
		animation-name: example5;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
	.lost{
		font-size: 24px;
		text-align: center;
		line-height: 240px;
		width: 240px;
		height: 240px;
		border-radius: 50%;
		background: linear-gradient(-45deg, #35D1C4, #63F9B1);
		margin-top: 50px;
		margin-left: -20px;
		opacity: 0.95;
		position: absolute;
		animation-name: example4;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
	.getgoods{
		width: 140px;
		height: 140px;
		text-align: center;
		line-height: 140px;
		border-radius: 50%;
		background: linear-gradient(45deg, #536DFF, #A466FE);
		opacity: 0.95;
		position: absolute;
		right: 0;
		top: 10px;
	}
	@keyframes example {
	  from {width: 170px;height: 170px;}
	  to {width: 160px;height: 160px;}
	}
	@keyframes example2 {
	  from {
		  left: 90px;
		  top: 300px;
	  }
	  to {
		  left: 40px;
		  top: 300px;
	  }
	}
	@keyframes example3 {
	  from {
		 right:190px;top:340px;
	  }
	  to {
		  right:230px;top:340px;
	  }
	}
	.add{
		width: 170px;
		height: 170px;
		font-size: 18px;
		text-align: center;
		line-height: 170px;
		border-radius: 50%;
		background: linear-gradient(-45deg, #16A1FE, #18C7FE);
		opacity: 0.9;
		position: absolute;
		right: -20px;
		top: 200px;
		animation-name: example;
		animation-duration: 2s;
	    animation-iteration-count: infinite;
	}
	.item1{
		width: 155px;
		height: 155px;
		text-align: center;
		line-height: 155px;
		border-radius: 50%;
		background: linear-gradient(-45deg, #f08e4d, #ffd260);
		opacity: 0.95;
		position: absolute;
		left: 90px;
		top: 300px;
		animation-name: example2;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
	.fdj{
		animation-name: example3;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
	.item2{
		width: 90px;
		height: 90px;
		text-align: center;
		line-height: 90px;
		border-radius: 50%;
		background: linear-gradient(-45deg, #DC40FC, #FE8BE2);
		opacity: 0.95;
		position: absolute;
		right: 80px;
		top: 450px;
		animation-name: example6;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
	.item3{
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		border-radius: 50%;
		background: linear-gradient(-45deg, #34CFC4, #5DFAAD);
		opacity: 0.95;
		position: absolute;
		right: 20px;
		bottom: 50px;
		animation-name: example7;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
</style>
