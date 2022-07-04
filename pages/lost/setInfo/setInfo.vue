<template>
	<view style="margin:  20px;">
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm" labelWidth='auto'>
			<u-form-item label="失物名称" prop="userInfo.name" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.name" border="none" style="margin-left: 10px;"></u--input>
			</u-form-item>
			<u-form-item label="丢失地点" prop="userInfo.address" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.address" border="none" placeholder="如果不清楚可以不填"
					style="margin-left: 10px;"></u--input>

			</u-form-item>
			<u-form-item label="丢失时间" prop="userInfo.time" borderBottom ref="item2" @click="showDate =!showDate">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="model1.userInfo.time" @change="maskClick" />
				
			</u-form-item>
			<u-form-item label="物品分类" prop="userInfo.sort" borderBottom ref="item4" class="flex-row">
				<view v-if="model1.userInfo.sort==''" class="margin-left20" @click="show = true" style="color: #18BC37;font-size: 12px;">
					点击选择分类
				</view>
				<u--input v-model:value="model1.userInfo.sort" border="none" 
					style="margin-left: 10px;" clearable></u--input>
				<u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel()"  ></u-picker>
			</u-form-item>
			<u-form-item label="描述信息" prop="userInfo.desc" borderBottom ref="item3">
				<u--textarea v-model="model1.userInfo.desc" placeholder="请输入内容" count maxlength='150'></u--textarea>
			</u-form-item>
			<u-form-item label="图片" prop="userInfo.imgs" borderBottom ref="item4">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="1" :previewFullImage="true" uploadText='请选择照片' style="margin-left: 30px;"></u-upload>
			</u-form-item>
			
			<u-form-item label="手机" prop="userInfo.info" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.info.phone" border="none" style="margin-left: 10px;"></u--input>
			</u-form-item>
			<u-form-item label="邮箱" prop="userInfo.info" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.info.email" border="none" style="margin-left: 10px;"></u--input>
			</u-form-item>

		</u--form>
			<u-button type="success" size="small" text="提交" style="height: 40px;margin-top: 10px;" @click="test()">
			</u-button>
			<u-button type="primary" size="small" text="重置" style="height: 40px;margin-top: 10px;" @click="reset()">
			</u-button>
	</view>
	</view>
</template>

<script>
	import api from '@/net/api.js'
	export default {
		data() {
			return {
				showSex: false,
				fileList1: [],
				showDate:false,
				model1: {
					userInfo: {
						name: '',
						time:'',
						desc: '',
						address: '',
						sort:'',
						info: {
							phone: '',
							email: ''
						},
						imglist:'',
						username:'admin'
						
					}
				},
				show:false,

				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写丢失的物品名称',
						trigger: ['blur', 'change']
					},
					'userInfo.desc': {
						type: 'string',
						required: true,
						message: '请填写描述信息',
						trigger: ['blur', 'change']
					},
					'userInfo.address': {
						type: 'string',
						required: false,
						message: '请填写失物位置',
						trigger: ['blur', 'change']
					},
					'userInfo.info.phone': {
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					},
					'userInfo.info.email': {
						type: 'string',
						required: false,
						message: '',
						trigger: ['blur', 'change']
					},
					'userInfo.sort': {
						type: 'string',
						required: true,
						message: '请填写丢失的物品分类',
						trigger: ['blur', 'change']
					},

				},
				radio: '',
				switchVal: false,
				columns: [
					 ['学习用品', '书籍', '证件','生活用品','衣物','其他']
				],
			}

		},
		methods: {
			maskClick(e){
							//console.log('maskClick事件:', e);
							this.model1.userInfo.time=e;
						},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					let status = 'success'

					this[`fileList${event.name}`].push({
						...item,
						status: status,
					})
				})
				////console.log(this.fileList1);
			},
			test() {
				this.$refs.uForm.validate().then(res => {
								uni.$u.toast('登记成功');
								this.model1.userInfo.imglist='/image/upload/'+this.fileList1[0].name
								//console.log(this.model1.userInfo);
								//console.log(this.fileList1);
								
								//添加
								let opts = {
									url: '/bus/addLostThings',
									method: "POST"
								}
								let data = {
									title:this.model1.userInfo.name,
									content:this.model1.userInfo.desc,
									publishTime:this.model1.userInfo.time,
									name:this.model1.userInfo.username,
									sort:this.model1.userInfo.sort,
									area:this.model1.userInfo.address,
									img:this.model1.userInfo.imglist,
									phone:this.model1.userInfo.info.phone,
									email:this.model1.userInfo.info.email,
									state:1
								}
								let result = this.$myHttp.httpRequest(opts, data);
								result.then(res=>{
									if(res.data.status==200){
										var that=this;
										uni.uploadFile({ //上传代码
											url: that.$myHttp.baseUrl+"/upload/uploads", //本地node.js服务器地址
											header: {
										
												'Authorization': localStorage.getItem('token')
											},
											filePath: this.fileList1[0].url,
											name: "file", //这个东西有点类似与 form表单中的  name值 在后面也需要这个		
											success: function(res) {
												//console.log(res);
												
											}
										})
										setTimeout(()=>{
											uni.navigateTo({
												url:'/pages/lost/lost'
											})
										},2000)
									}
								}).catch(err=>{
									uni.$u.toast('登记失败')
								})
								
							}).catch(errors => {
								uni.$u.toast('校验失败,请重新填写必要信息')
							})
			},
			reset(){
				this.$refs.uForm.resetFields();
			},
			confirm(e){
				this.show=false;
				const {
				     columnIndex,
				     index
				 } = e
				//console.log(e.value[0]);
				this.model1.userInfo.sort=e.value[0];
			},
			cancel(){
				this.show=false;
			},
			getInfo(){
				api.getInfo({
				phone:localStorage.getItem('phone')
			}).then(res=>{
					////console.log(res.data.data[0].username);
					this.model1.userInfo.username=res.data.data[0].username;
				}).catch(err=>{
					//console.log(err)
					uni.showToast({
						title:'身份失效，重新登陆',
						duration: 2000,
						icon: "error",
						position: "center"
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/login/login'
						})
					},2000)
				})
			}
		},
		onLoad() {
			this.getInfo();
		}
	}
</script>

<style>

</style>
