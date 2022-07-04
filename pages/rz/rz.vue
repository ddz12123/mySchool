<template>
	<view class="flex-column"> 
	<view class="item">
		<view class="title">
			学生姓名 
		</view>
		 <u--input
		    placeholder="请输入内容"
		    border="none"
		    clearable
		  ></u--input>
	</view>
		<view class="item">
			<view class="title">
				学校名称 
			</view>
			 <u--input
			    placeholder="请输入内容"
			    border="none"
			    clearable
			  ></u--input>
		</view>
		<view class="item">
			<view class="title">
				学号 
			</view>
			 <u--input
			    placeholder="请输入内容"
			    border="none"
			    clearable
			  ></u--input>
		</view>
		<u-button text="开始认证" class='btn'  color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
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
