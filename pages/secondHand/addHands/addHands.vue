<template>
	<view class="flex-column">
		<view class="menus flex-row space-between align-item-center">
			<view class="margin-left20" @click="back()">
				取消
			</view>
			<view class="fb margin-right20" @click="submit()">
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
		
		<u-line style="margin-top: 10px;"></u-line>
		<view class="price flex-row margin-top20 align-item-center">
			<view class="margin-left20">
				<u-icon name="rmb-circle-fill" color="#757575" size="24"></u-icon>
			</view>
			<view class="margin-left10">
				价格
			</view>
			<view class="margin-left20" style="color: red; width:40px;">
				 <u--input
					fontSize='14px'
				    border="none"
					color="red"
					v-model="price"
				  ></u--input>
			</view>
			<view class="margin-left20" style="color: red;font-size: 12px;">
				(单位：元)
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/net/api.js"
	export default {
		data() {
			return {
				html:'',
				fileList1: [],
				imglist:[],
				price:'',
				title:'',
				userInfo:""
			}
		},
		methods: {
			// 删除图片
						deletePic(event) {
							this[`fileList${event.name}`].splice(event.index, 1)
						},
						getInfo(){
							api.getInfo({
							phone:localStorage.getItem('phone')
						}).then(res=>{
								////console.log(res);
								this.userInfo=res.data.data[0]
							})
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
							uni.uploadFile({ //上传代码
								url: this.$myHttp.baseUrl+"/upload/uploads", //本地node.js服务器地址
								header: {
							
									'Authorization': localStorage.getItem('token')
								},
								filePath: lists[0].url,
								name: "file", //这个东西有点类似与 form表单中的  name值 在后面也需要这个		
								success: function(res) {
									//console.log(res);
									
									
								}
							})
							//console.log(lists);
							this.imglist.push('/public/image/upload/'+lists[0].name);
							
						},
						back(){
							uni.navigateBack({
								
							})
						},
						submit(){
							let timer=new Date().getTime();
							let date=uni.$u.timeFormat(timer, 'yyyy-mm-dd');
							api.addSecondhand({
								title:this.title,
								content:this.html,
								cTime:date,
								uid:this.userInfo.uid,
								imglist:this.imglist,
								price:this.price
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

<style scoped lang="scss">
	.menus{
		height: 40px;
		font-size: 13px;
		//border-bottom: 1px solid #ccc;
		margin: 0 20px;
		.fb{
			background:linear-gradient(135deg,#fdeb71,#f8d800);
			width: 50px;
			height: 25px;
			border-radius: 5px;
			text-align: center;
			line-height: 25px;
			
		}
	}
	.text{
		padding: 10px 20px;
	}
	.img{
		padding: 5px 20px;
	}
	.price{
		height: 30px;
	}
</style>
