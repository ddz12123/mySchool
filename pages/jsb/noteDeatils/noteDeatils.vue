<template>
	<view style="margin: 0 20px;">
		<u-parse :content="content"></u-parse>
		<!-- <rich-text :nodes="content"></rich-text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
			}
		},
		methods: {
			
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				let item=option.item;
		       // //console.log(option);
				let opts={
					url:'/other/getNoteByID',
					method:"GET"
				}
				let data={
					id:item
				}
				let res=this.$myHttp.httpRequest(opts, data);
				res.then(res=>{
						////console.log(res.data.data[0]);
						this.content=res.data.data[0].content;
				})
			
		    }
	}
</script>

<style>

</style>
