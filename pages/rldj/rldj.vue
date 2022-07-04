<template>
	<view class="flex-column"> 
	<view class="item">
		<view class="title">
			认领时间 
		</view>
		 <u--input
		    placeholder="请输入内容"
		    border="none"
		    clearable
		  ></u--input>
	</view>
		<view class="item">
			<view class="title">
				 认领地点
			</view>
			 <u--input
			    placeholder="请输入内容"
			    border="none"
			    clearable
			  ></u--input>
		</view>
		<view class="item">
			<view class="title">
				联系人 
			</view>
			 <u--input
			    placeholder="请输入内容"
			    border="none"
			    clearable
			  ></u--input>
		</view>
		<u-button text="提交" class='btn'  color="linear-gradient(to right,  rgb(0, 255, 255),rgb(66, 83, 216))"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.item{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 86%;
	margin-left:7%;
	border-bottom: 1px solid #ccc;
	height: 50px;
	margin-top: 10px;
	.title{
		width: 80px;
	}
}
.btn{
	margin-top: 100px;
	width: 80%;
	border-radius: 20px;
}
</style>
