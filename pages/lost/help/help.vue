<template>
	<view class="flex-column">
		<view class="top">
			
		</view>
		<view class="flex1 margin-top20">
			 <view class="u-page__item">
			        <u-collapse
			                accordion
			        >
			            <u-collapse-item
			                    title="寻找丢失物品"
			            >
			                <text class="u-collapse-content">
							丢失物品不用着急，你可以在寻找失物模块里面寻找。可以直接搜索物品名称，也支持搜索物品种类。找到自己的物品后可以捡到物品的同学联系、认领。
							</text>
			            </u-collapse-item>
			            <u-collapse-item
			                    title="失物登记"
			            >
			                <text class="u-collapse-content">
								同学，如果你在校园里面捡到了他人的物品，可以在失物登记模块里面进行相应的登记，登记完后要注意后续失主的联系哦。
							</text>
			            </u-collapse-item>
			            <u-collapse-item
			                    title="建议和意见"
			            >
			                <text class="u-collapse-content">
								在这里你可以和我们反馈存在的问题，可以投诉，也可以给我提供你宝贵的建议。联系QQ:770083376
							</text>
			            </u-collapse-item>
			        </u-collapse>
			    </view>
		</view>
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

<style scoped lang="scss">
	.top{
		width: 750rpx;
		height: 200px;
		background: url('../../../static/help.png') no-repeat center;
		margin: 0 5px;
	}
	.u-page {
	        padding: 0;
	
	        &__item {
	    
	            &__title {
	                 color: $u-tips-color;
	                 background-color: $u-bg-color;
	                 padding: 15px;
	                 font-size: 15px;
	        
	                &__slot-title {
	                     color: $u-primary;
	                     font-size: 14px;
	                 }
	            }
	        }
	    }
	
	    .u-collapse-content {
	        color: $u-tips-color;
	        font-size: 14px;
	    }
</style>
