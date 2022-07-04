<template>
	<view class="flex1" style="background-color: #1bd9c6;height: 85vh;">
		
		<view class="flex1 flex-column" style="margin:5% 5%;background-color: white;">
			<view class="flex-row align-item-center" style="height: 40px;width: 100%;line-height: 40px;border-bottom: 1px solid #CCc;">
				<view class="margin-left40" style="color:#1bd9c6 ;">
					标题
				</view>
				<input type="text" v-model:value="title" class="margin-left20" placeholder="请输入标题" />
			</view>
			<jinEdit placeholder="请输入内容" @editOk="editOk" uploadFileUrl="/#"></jinEdit> 
		</view>
		
	</view>
</template>

<script>
	import jinEdit from '../../../components/jin-edit/jin-edit.vue';	
	export default {
		components: {
			jinEdit
		},
		data() {
			return {
				uid:'',
				title:'',
			}
		},
		methods: {
			// 点击发布
			editOk(res) {
				 
			    //console.log(res);
				let opts={
					url:'/other/addNote',
					method:"PUT"
				}
				let data={
					uid:this.uid,
					status:res.isPublic,
					content:res.html,
					time:uni.$u.timeFormat(new Date(), 'yyyy-mm-dd'),
					title:this.title
				}
				
				let result=this.$myHttp.httpRequest(opts, data);
				result.then((res,err)=>{
					//console.log(res);
					if(res.data.status==200){
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "success",
							position: "center"
						});
						setTimeout(()=>{
							uni.navigateTo({
								url:`/pages/jsb/jsb?uid=${this.uid}`
							})
						},2000)
						
					}
				})
				
			}
		},
		onLoad(option) {
			this.uid=option.uid;
		}
	}
</script>

<style>

</style>
