<template>
	<view class="flex-column flex1" style="height: 100%;">
		<view class="top-items flex-column">
			<view class="top_search">
				<u-search placeholder="搜索笔记" :showAction="true" :animation="true" v-model='searchd' @custom='searchs()'>
				</u-search>
			</view>
			<view class="flex1 flex-row space-around align-item-center" style="margin-bottom: 10px;">
				<view class="flex-column align-item-center">
					<view class="white" @click="show = true">
						{{time}}
					</view>
					<view class="white-bold">
						日期
					</view>
				</view>
				<view class="flex-column align-item-center">
					<view class="white">
						{{count1}}
					</view>
					<view class="white-bold" @click="getNotelist()">
						已完成
					</view>
				</view>
				<view class="flex-column align-item-center ">
					<view class="white">
						{{count2}}
					</view>
					<view class="white-bold" @click="getDarft()">
						草稿
					</view>
				</view>
			</view>

		</view>
		<view class="flex flex-row margin-top20 space-between">
			<span class="allNote" @click="getAllNote()">全部笔记</span>
			<span class="margin-right40" style='font-size: 12px;' @click="changeList()">切换视图</span>
		</view>
		<view class="flex flex-column margin-top10 pd" :style="style">

			<view class="notecard flex-column " v-for="(item,index) in noteList"
				:style="[{width:width},{margin:margin}]" @click="toDetails(item)" @touchend="handletouchend(item.id)">
				<view class="time flex">
					{{item.time}}
				</view>
				<view class="content flex">
					{{item.title}}
				</view>

			</view>
			</u-tooltip>
		</view>
		<wm-list-add ref="add" @clickAdd="clickAdd" />
		<view>
			<u-datetime-picker :show="show" v-model="value1" mode="date" @confirm='confirm' @cancel='close'>
			</u-datetime-picker>
		</view>
		<u-action-sheet :actions="list" title="选项" :show="showAction" @close='closeAction' :closeOnClickOverlay="true"
			:closeOnClickAction="true" @select='selectAction'> </u-action-sheet>

	</view>

</template>

<script>
	import wmListAdd from '@/components/wm-list-add/wm-list-add';
	import api from "@/net/api.js"
	export default {
		components: {
			wmListAdd
		},
		data() {
			return {
				searchd: '',
				list: [{
						name: '删除',
						color: '#ff0000',
						fontSize: '14'

					},

					{
						name: '收藏',
						color: '#19C7B7',
						fontSize: '14'
					},
				],
				showAction: false,
				noteList: [

				],
				styles: [{
						width: '100%'
					},
					{
						flexDirection: 'row'
					},
					{
						flexWrap: 'wrap'
					},

				],
				widths: '300rpx',
				margins: '10px 0 0 10px',
				style: [],
				width: '100%',
				margin: '',
				time: '',
				flag: false,
				show: false,
				value1: Number(new Date()),
				uid: '',
				draft: [],
				compelte: [],
				count1: 0,
				count2: 0,
				onteId:''



			}
		},
		methods: {
			handletouchend(e) {
				this.showAction = true;
				//console.log(e);
				this.onteId=e;
			},
			closeAction() {
				this.showAction = false;
			},
			selectAction(e){
				//console.log(e.name);
				if(e.name=='删除'){
					let opts={
						url:'/other/deleteNoteByID',
						method:"DELETE"
					}
					let data={
						id:this.onteId
					}
					let res=this.$myHttp.httpRequest(opts, data);
					this.$u.toast(e.name+'成功');
					this. getAllNotes();
					}
				if(e.name=='收藏'){
					this.$u.toast(e.name+'成功')
				}
			},
			confirm(e) {
				this.show = false;
				let a = this.$u.timeFormat(e.value, 'yyyy-mm-dd');
				this.time = a;
				////console.log(a);
			},
			close() {
				this.show = false;
			},
			clickAdd() {
				////console.log('点击加号执行操作')
				uni.navigateTo({
			 	url: `/pages/jsb/addNote/addNote?uid=${this.uid}`
				})
			},

			getNotelist() {
				// let opts={
				// 	url:'/other/getNoteList',
				// 	method:"GET"
				// }
				// let data={
				// 	uid:this.uid
				// }
				// let res=await this.$myHttp.httpRequest(opts, data);
				// //console.log(res.data);
				api.getNote({
					uid: this.uid
				}).then(res => {
					this.noteList = res.data.data;
				}).catch(err => {
					//console.log(err);
					uni.showToast({
						title: '身份失效，重新登录',
						duration: 2000,
						icon: "error",
						position: "center"
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 2000)
				})

			},
			async getAllNotes() {
				this.count1=0;
				this.count2=0;
				let opts = {
					url: '/other/getAllNote',
					method: "GET"
				}
				let data = {
					uid: this.uid
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				////console.log(res.data);
				this.noteList = Array.from(new Set(res.data.data));
				res.data.data.map((item, index) => {
					if (item.status == 2) {
						this.count1++;
					}
					if (item.status == 0) {
						this.count2++;
					}
				})
			},
			async getAllNote() {
				let opts = {
					url: '/other/getAllNote',
					method: "GET"
				}
				let data = {
					uid: this.uid
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				////console.log(res.data);
				this.noteList = Array.from(new Set(res.data.data));

			},
			async getDarft() {
				let opts = {
					url: '/other/getDarft',
					method: "GET"
				}
				let data = {
					uid: this.uid
				}
				let res = await this.$myHttp.httpRequest(opts, data);
				this.noteList = res.data.data;
				////console.log(res.data.data)
			},
			changeList() {
				this.flag = !this.flag;
				if (this.flag) {
					this.style = this.styles;
					this.width = this.widths;
					this.margin = this.margins;
					this.flag = true;
				} else {
					this.style = [];
					this.width = '100%';
					this.margin = '';
				}

			},
			toDetails(e) {
				////console.log(e);
				let item = JSON.stringify(e.id);
				uni.navigateTo({
					url: `noteDeatils/noteDeatils?item=${item}`
				});
			},
			searchs() {
				//console.log(this.searchd);
				api.getNoteSearch({
					item: this.searchd,
					uid: this.uid
				}).then(res => {
					//console.log(res);
					this.noteList = res.data.data;
				}).catch(err => {
					//console.log(err)
				})
			},
		},

		onLoad(option) {
			////console.log(option)
			this.uid = option.uid;
			if (localStorage.getItem('token') != null && localStorage.getItem('token') != '' && sessionStorage.getItem(
					"isLogin") == 'true') {
				this.getNotelist();
				this.getDarft();
				this.getAllNotes();
				let times = Number(new Date())
				this.time = this.$u.timeFormat(times, 'yyyy-mm-dd')

			} else {
				this.time = '';
				uni.showToast({
					title: '请先登录',
					duration: 2000,
					icon: "error",
					position: "center"
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '../login/login'
					})
				}, 2000)

			}
		},
		onShow() {

		}
	}
</script>

<style lang="scss" scoped>
	.top-items {
		height: 140px;
		background-color: #19C7B7;

		.top_search {
			height: 40px;
			padding: 0 20px;
			margin-top: 10px;
		}
	}

	.white-bold {
		color: white;
		font-weight: bold;
	}

	.white {
		color: white;
	}

	.allNote {
		margin-left: 20px;
	}

	.notecard {
		height: 70px;
		box-shadow: 2px 2px 1px 1px #ccc;
		border: 1px solid #ccc;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 10px;

		.time {
			color: #ccc;
			margin: 10px 10px 0 10px;
		}

		.content {
			display: flex;
			flex: 1;
			margin: 5px 15px 10px 15px;
			font-size: 14px;
			overflow: hidden;

		}
	}

	.pd {
		padding: 0 20px;

	}
</style>
