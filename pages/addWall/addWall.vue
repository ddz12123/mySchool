<template>
	<view class="flex-column">
		
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
		<view class="text">
			<u--textarea v-model="html" placeholder="请输入内容" height="160" border="none"></u--textarea>
		</view>
		<view class="img">
			<u-upload
				:fileList="fileList1"
				@afterRead="afterRead"
				@delete="deletePic"
				name="1"
				multiple
				:maxCount="6"
				:previewFullImage="true"
				uploadText='请选择照片'
			></u-upload>
		</view>
			<u-button type="primary" text="发布" class="fb" @click="addWall()"></u-button>
		
		
	</view>
</template>

<script>
	import api from "@/net/api.js";
	import utils from "@/utils/badWords.js";
	export default {
		data() {
			return {
				html:'',
				fileList1: [],
				title:'',
				imglist:[],
				date:'',
				userInfo:""
			}
		},
		methods: {
			// 删除图片
						deletePic(event) {
							this[`fileList${event.name}`].splice(event.index, 1)
						},
						// 新增图片
						async afterRead(event) {
							// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
							let lists = [].concat(event.file)
							let fileListLen = this[`fileList${event.name}`].length
							lists.map((item) => {
								let status='success'
								
								this[`fileList${event.name}`].push({
									...item,
									status: status,
								})
								
								
							})
							//console.log(lists);
							var that=this;
							uni.uploadFile({ //上传代码
								url: that.$myHttp.baseUrl+"/upload/uploads", //本地node.js服务器地址
								header: {
							
									'Authorization': localStorage.getItem('token')
								},
								filePath: lists[0].url,
								name: "file", //这个东西有点类似与 form表单中的  name值 在后面也需要这个		
								success: function(res) {
									//console.log(res);
									let img='/public/image/upload/'+lists[0].name;
									that.imglist.push(img);
									//console.log(that.imglist);
								}
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
							addWall(){
								let timer=new Date().getTime();
								let date=uni.$u.timeFormat(timer, 'yyyy-mm-dd hh:MM');
								////console.log(timer);
								this.date=date;
								let content=utils(this.html);
								if(content==this.html){
									api.addWall({
										uid:this.userInfo.uid,
										title:this.title,
										content:content,
										date:timer,
										imglist:this.imglist
									}).then(res=>{
										//console.log(res);
										if(res.data.data.affectedRows==1){
											uni.showToast({
												title: '发布成功',
												duration: 2000
											});
											setTimeout(()=>{
												uni.navigateTo({
													url:'/pages/wall/wall'
												})
											},1000)
										}
									})
								}else{
									uni.showToast({
										title: '包含敏感词，请重新检查',
										duration: 2000,
										icon:"error"
									});
								}
								
							}
						},
						onLoad() {
							let timer=new Date().getTime();
							//console.log(timer);
							if(sessionStorage.getItem("isLogin")=='true'){
								this.getInfo();
							}	
						}
	}
</script>

<style scoped lang="scss">
	
		.fb{
			background:linear-gradient(135deg,#fdeb71,#f8d800);
			width: 90%;
			height: 35px;
			border-radius: 10px;
			text-align: center;
			border: none;
			margin-top: 20px;
		}
	
	.text{
		padding: 10px 20px;
	}
	.img{
		padding: 5px 20px;
	}
	
</style>
