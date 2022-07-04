<template>
	<view id="container">
	    <view class="wave"></view>
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

<style>
	    #container{
	        width:400px;
	        height:200px;
	        position: absolute;
			bottom: 0;
	        overflow: hidden;
	       background: linear-gradient(-180deg, #68c8b8, #3677cc);
	    }
	    .wave{
	        background:#fff;
	        border-radius:40%;
	        width:1000px;
	        height:1000px;
	        position:absolute;
	        left:50%;
	        bottom:88px;
	        animation: go 8s infinite linear;
	    }
	    @keyframes go {
	        0% {
	            transform: translate(-50%, 0) rotateZ(0deg);
	        }
	        50% {
	            transform: translate(-50%, -2%) rotateZ(180deg);
	        }
	        100% {
	            transform: translate(-50%, 0%) rotateZ(360deg);
	        }
	    }

</style>
