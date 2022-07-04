<template>
	<view class="flex-column main" >
		<view class="menus flex-row space-between align-item-center">
			<view class="margin-left40 cancel" @click="back()">
				取消
			</view>
			<view class="fb margin-right40" @click="submit()">
				发布
			</view>
		</view>
		<view class="flex-row" style="margin: 10px 20px;align-items: center; ">
			<view class="">
				标题
			</view>
			 <u--input
			    placeholder="请输入内容"
			    border="bottom"
			    clearable
				 v-model="title"
			  ></u--input>
		</view>
		<view class="text ">
			<u--textarea v-model="content" placeholder="请输入你需要求购的内容" height="300" border="none" style="border-radius: 10px;"></u--textarea>
		</view> 
		<view class="margin-top60 ">
			<div class="container">
					<span class="girl"></span>
					<div class="boys">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
		</view>
	</view>
	
</template>

<script>
	import api from "@/net/api.js"
	export default {
		data() {
			return {
				content:'',
				title:'',
				userInfo:""
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
			getInfo(){
				api.getInfo({
				phone:localStorage.getItem('phone')
			}).then(res=>{
					////console.log(res);
					this.userInfo=res.data.data[0]
				})
			},
			submit(){
				let timer=new Date().getTime();
				let date=uni.$u.timeFormat(timer, 'yyyy-mm-dd');
				api.addLookingList({
					title:this.title,
					uid:this.userInfo.uid,
					content:this.content,
					cTime:date
				}).then(res=>{
					//console.log(res);
					uni.showToast({
						title: '发布成功',
						duration: 2000
					});
					setTimeout(()=>{
						uni.navigateBack({
							
						})
					},2000)
					
				}).catch(err=>{
					//console.log(err)
				})
			}
		},
		onLoad() {
			if(sessionStorage.getItem("isLogin")=='true'){
				this.getInfo();
			}	
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		width: 750rpx;
		height: 100%;
		background-color: #e6e6e6;
	}
	.menus{
		height: 40px;
		font-size: 13px;
		margin-top: 20px;
		.fb{
			background:linear-gradient(135deg,#fdeb71,#f8d800);
			width: 50px;
			height: 25px;
			border-radius: 10px;
			text-align: center;
			line-height: 25px;
			opacity: 0.7;
			
		}
		.cancel{
			background:#ccc;
			width: 50px;
			height: 25px;
			border-radius: 10px;
			text-align: center;
			line-height: 25px;
			opacity: 0.8;
			
		}
	}
	.text{
	
		padding: 10px 20px;
		
	}
		.container {
		    width: 8em;
		    height: 1em;
		    font-size: 35px;
		    display: flex;
		    justify-content: space-between;
			margin-left: 50px;
		}
	
		.container span {
		    width: 1em;
		    height: 1em;
		    --duration: 1.5s;
		}
	
		.girl {
		    animation: slide var(--duration) ease-in-out infinite alternate;
		}
	
		@keyframes slide {
		    from {
		        transform: translateX(0);
		        filter: brightness(1);
		    }
	
		    to {
		        transform: translatex(calc(8em - (1em * 1.25)));
		        filter: brightness(1.45);
		    }
		}
	
		.boys {
		    width: 6em;
		    display: flex;
		    justify-content: space-between;
		}
	
		.boys span {
		    animation: var(--duration) ease-in-out infinite alternate;
		}
	
		.boys span:nth-child(1) {
		    animation-name: jump-off-1;
		}
	
		.boys span:nth-child(2) {
		    animation-name: jump-off-2;
		}
	
		.boys span:nth-child(3) {
		    animation-name: jump-off-3;
		}
	
		.boys span:nth-child(4) {
		    animation-name: jump-off-4;
		}
	
		@keyframes jump-off-1 {
		    0%, 15% {
		        transform: rotate(0deg);
		    }
	
		    35%, 100% {
		        transform-origin: -50% center;
		        transform: rotate(-180deg);
		    }
		}
	
		@keyframes jump-off-2 {
		    0%, 30% {
		        transform: rotate(0deg);
		    }
	
		    50%, 100% {
		        transform-origin: -50% center;
		        transform: rotate(-180deg);
		    }
		}
	
		@keyframes jump-off-3 {
		    0%, 45% {
		        transform: rotate(0deg);
		    }
	
		    65%, 100% {
		        transform-origin: -50% center;
		        transform: rotate(-180deg);
		    }
		}
	
		@keyframes jump-off-4 {
		    0%, 60% {
		        transform: rotate(0deg);
		    }
	
		    80%, 100% {
		        transform-origin: -50% center;
		        transform: rotate(-180deg);
		    }
		}
	
		.container span::before {    
		    content: '';
		    position: absolute;
		    width: inherit;
		    height: inherit;
		    border-radius: 15%;
		    box-shadow: 0 0 0.1em rgba(0, 0, 0, 0.3);
		}
	
		.girl::before {
		    background-color: hotpink;
		}
	
		.boys span::before {
		    background-color: dodgerblue;
		    animation: var(--duration) ease-in-out infinite alternate;
		}
	
		.boys span:nth-child(1)::before {
		    filter: brightness(1);
		    animation-name: jump-down-1;
		}
	
		.boys span:nth-child(2)::before {
		    filter: brightness(1.15);
		    animation-name: jump-down-2;
		}
	
		.boys span:nth-child(3)::before {
		    filter: brightness(1.3);
		    animation-name: jump-down-3;
		}
	
		.boys span:nth-child(4)::before {
		    filter: brightness(1.45);
		    animation-name: jump-down-4;
		}
	
		@keyframes jump-down-1 {
		    5% {
		        transform: scale(1, 1);
		    }
	
		    15% {
		        transform-origin: center bottom;
		        transform: scale(1.3, 0.7);
		    }
	
		    20%, 25% {
		        transform-origin: center bottom;
		        transform: scale(0.8, 1.4);
		    }
	
		    40% {
		        transform-origin: center top;
		        transform: scale(1.3, 0.7);
		    }
	
		    55%, 100% {
		        transform: scale(1, 1);
		    }
		}
	
		@keyframes jump-down-2 {
		    20% {
		        transform: scale(1, 1);
		    }
	
		    30% {
		        transform-origin: center bottom;
		        transform: scale(1.3, 0.7);
		    }
	
		    35%, 40% {
		        transform-origin: center bottom;
		        transform: scale(0.8, 1.4);
		    }
	
		    55% {
		        transform-origin: center top;
		        transform: scale(1.3, 0.7);
		    }
	
		    70%, 100% {
		        transform: scale(1, 1);
		    }
		}
	
		@keyframes jump-down-3 {
		    35% {
		        transform: scale(1, 1);
		    }
	
		    45% {
		        transform-origin: center bottom;
		        transform: scale(1.3, 0.7);
		    }
	
		    50%, 55% {
		        transform-origin: center bottom;
		        transform: scale(0.8, 1.4);
		    }
	
		    70% {
		        transform-origin: center top;
		        transform: scale(1.3, 0.7);
		    }
	
		    85%, 100% {
		        transform: scale(1, 1);
		    }
		}
	
		@keyframes jump-down-4 {
		    50% {
		        transform: scale(1, 1);
		    }
	
		    60% {
		        transform-origin: center bottom;
		        transform: scale(1.3, 0.7);
		    }
	
		    65%, 70% {
		        transform-origin: center bottom;
		        transform: scale(0.8, 1.4);
		    }
	
		    85% {
		        transform-origin: center top;
		        transform: scale(1.3, 0.7);
		    }
	
		    100%, 100% {
		        transform: scale(1, 1);
		    }
		}

</style>
