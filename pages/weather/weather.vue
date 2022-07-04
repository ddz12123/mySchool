<template>
	<view class="main">
		<view class="top">
			<view class="cityName">
				{{weather.city}}市
			</view>
			<view class="" style="font-size: 40px;">
				{{weather.data[0].tem}}°C
			</view>
			<view class="">
				{{weather.data[0].tem2}}°C~
				{{weather.data[0].tem1}}°C
			</view>
			<view class="">
				{{weather.data[0].wea}}
			</view>
			<view class="">
				空气 {{weather.data[0].air_level}}
			</view>
			<view class="margin-top10" style="background-color: rgba(170, 170, 170, 0.5);border-radius: 20px;font-size: 13px;width: 100px;text-align: center;height: 25px;line-height: 25px;color: wheat;" v-if="weather.data[0].alarm.alarm_type!==''">
				{{weather.data[0].alarm.alarm_type}}{{weather.data[0].alarm.alarm_level}}预警
			</view>
		</view>
		<view class="" style="display: flex;flex-direction: row-reverse;margin-right: 20px;margin-bottom: 10px;font-size: 12px;">
			{{weather.aqi.update_time}} 更新
		</view>
		<view class="hours">
			<view class="item" v-for="(item2,index) in weather.data[0].hours">
				<view class="" style="width: 60px;" >
					{{item2.hours}}
				</view>
				<view class="" >
					{{item2.wea}}
				</view>
				<img src="../../static/images/weather/sun.png" alt="" style="width: 25px;height: 25px;" v-if="item2.wea=='晴'">
				<img src="../../static/images/weather/cloud.png" alt="" style="width: 25px;height: 25px;" v-if="item2.wea=='多云'">
				<img src="../../static/images/weather/lzy.png" alt="" style="width: 25px;height: 25px;" v-if="item2.wea=='雷阵雨'">
				<img src="../../static/images/weather/xy.png" alt="" style="width: 25px;height: 25px;" v-if="item2.wea!='晴'&&item2.wea!='多云'&&item2.wea!='雷阵雨'">
				<view class="" >
					{{item2.tem}}°C
				</view>
			</view>
		</view>
		
		<view class="mid">
			
			<view class="item " v-for="(item,index) in weather.data">
				<view class="" style="width: 55px;text-align: center;">
					{{item.date.split('-')[1]}}-{{item.date.split('-')[2]}}
				</view>
				<view class="" style="width: 55px;text-align: center;">
					{{item.day.substring(4,7)}}
				</view>
				<img src="../../static/images/weather/sun.png" alt="" style="width: 25px;height: 25px;" v-if="item.wea_day=='晴'">
				<img src="../../static/images/weather/cloud.png" alt="" style="width: 25px;height: 25px;" v-if="item.wea_day=='多云'||item.wea_day=='阴'">
				<img src="../../static/images/weather/lzy.png" alt="" style="width: 25px;height: 25px;" v-if="item.wea_day=='雷阵雨'">
				<img src="../../static/images/weather/xy.png" alt="" style="width: 25px;height: 25px;" v-if="item.wea_day!='晴'&&item.wea_day!='多云'&&item.wea_day!='阴'&&item.wea_day!='雷阵雨'">
				<view class="">
					{{item.tem1}}~{{item.tem2}}
				</view>
				
				<view class="">
					{{item.wea_day}}
				</view>
			</view>
		</view>
		<view class="title">
			空气质量
		</view>
		<view class="box">
			<view class="left">
				<view class="">
					污染指数
				</view>
				
				<view class="">
					{{weather.aqi.air_level}}
				</view>
				<view class="" style="font-size: 30px;">
					{{weather.aqi.air}}
				</view>
				<view class="" style="font-size: 12px;">
					{{weather.aqi.waichu}}  {{weather.aqi.yundong}}
				</view>
			</view>
			<view class="flex1 flex-row" style="display: flex;align-items: center;font-size: 14px;">
				<view class="flex-column">
					<view class="">
						PM10
					</view>
					<view class="">
						PM2.5
					</view>
					<view class="">
						NO2
					</view>
					<view class="">
						SO2
					</view>
					<view class="">
						O3
					</view>
					<view class="">
						CO
					</view>
				</view>
				<view class="flex-column margin-left60">
					<view class="">
						{{weather.aqi.pm10}}
					</view>
					<view class="">
						{{weather.aqi.pm25}}
					</view>
					<view class="">
						{{weather.aqi.no2}}
					</view>
					<view class="">
						{{weather.aqi.so2}}
					</view>
					<view class="">
						{{weather.aqi.o3}}
					</view>
					<view class="">
						{{weather.aqi.co}}
					</view>
				</view>
			</view>
		</view>
		<view class="title">
			生活指数
		</view>
		<view class="life">
			<view class="items">
				<img src="../../static/images/weather/wsd.png" alt="">
				<view class="">
					湿度
				</view>
				<view class="tips">
					{{weather.data[0].humidity}}
				</view>
			</view>
			<view class="items">
				<img src="../../static/images/weather/yj.png" alt="">
				<view class="">
					能见度
				</view>
				<view class="tips">
					{{weather.data[0].visibility}}
				</view>
			</view>
			<view class="items">
				<img src="../../static/images/weather/wind.png" alt="">
				<view class="">
					风力
				</view>
				<view class="tips">
					{{weather.data[0].win_speed.slice(0,4)}}
				</view>
			</view>
			<view class="items">
				<img src="../../static/images/weather/fx.png" alt="">
				<view class="">
					风向
				</view>
				<view class="tips">
					{{weather.data[0].win[0]}}
				</view>
			</view>
			<view class="items">
				<img src="../../static/images/weather/zwx.png" alt="">
				<view class="">
					紫外线
				</view>
				<view class="tips">
					{{weather.data[0].index[0].level}}
				</view>
			</view>
			<view class="items">
				<img src="../../static/images/weather/jf.png" alt="">
				<view class="">
					{{weather.data[0].index[1].title}}
				</view>
				<view class="tips">
					{{weather.data[0].index[1].level}}
				</view>
			</view>
			<view class="items">
				<img src="../../static/images/weather/xc.png" alt="">
				<view class="">
					{{weather.data[0].index[4].title}}
				</view>
				<view class="tips">
					{{weather.data[0].index[4].level}}
				</view>
			</view>
			<view class="items">
				<img src="../../static/images/weather/kqwr.png" alt="">
				<view class="">
					空气污染
				</view>
				<view class="tips">
					{{weather.data[0].index[5].level}}
				</view>
			</view>
		</view>
		<view class="title">
			生活小助手
		</view>
		<view class="" style="margin:5px 30px;">
			
			{{weather.aqi.air_tips}}
		</view>
		<view class="title">
			预警信息
		</view>
		<view class="" style="margin:5px 30px;" >
			<view class="" v-if="weather.data[0].alarm.alarm_content!=''">
					{{weather.data[0].alarm.alarm_content}}
			</view>
			<view class="" v-if="weather.data[0].alarm.alarm_content==''">
					暂无预警信息
			</view>
					
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weatherData:[],
				weather:[]
			}
		},
		onShow() {
			
		},
		onLoad() {
			this.getW2();
			this.getWeather();
			
		},
		methods: {
				getWeather(){
					uni.request({
						url:`http://wthrcdn.etouch.cn/weather_mini?city=昆明市`, //仅为示例，并非真实接口地址。
						data: {
							
						},
						method: "GET",
						header: {
							'Content-Type': 'application/json;charset=UTF-8', //自定义请求头信息
							
						},
						success: (res) => {
							//console.log(res.data);
							res.data.data.forecast.map((item,index)=>{
								item.date=item.date;
								item.high=item.high.split(' ')[1];
								item.low=item.low.split(' ')[1]
							})
							res.data.data.yesterday.date=res.data.data.yesterday.date;
							res.data.data.yesterday.high=res.data.data.yesterday.high.split(' ')[1];
							res.data.data.yesterday.low=res.data.data.yesterday.low.split(' ')[1];
							this.weatherData=res.data.data;
							//console.log(this.weatherData);
						}
					
					})
				},
				getW2(){
					uni.request({
						url:'https://v0.yiketianqi.com/api?unescape=1&version=v9&appid=97483845&appsecret=oN8CmKvC ', //仅为示例，并非真实接口地址。
						data: {
							
						},
						method: "GET",
						header: {
							'Content-Type': 'application/json;charset=UTF-8', //自定义请求头信息
							
						},
						success: (res) => {
							//console.log(res.data);
							// res.data.update_time=res.data.update_time.split(' ')[1];
							this.weather=res.data;
						}
					
					})
				}
		
			}

		}
</script>


<style lang="scss" scoped>
	.main {
		width: 750rpx;
		display: flex;
		overflow-y: scroll;
		flex-direction: column;
		background: url('@/static/images/weather/bg.jpeg') no-repeat center;
		background-size: cover;
		.top{
			
			width: 750rpx;
			height: 240px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		
			.cityName{
				font-size: 20px;
			}
		}
		.hours{
			
			height: 160px;
			margin-left: 10px;
			margin-right: 10px;
			overflow-x: scroll;
			display: flex;
			border-top: 1px solid #CCC;
			border-bottom: 1px solid #CCC;
			margin-bottom: 10px;
			flex-direction: row;
			font-size: 14px;
			.item{
				height: 100%;
				width: 140px;
				margin: 0 5px;
				border-radius: 5px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				view{
					text-align: center;
				}
			}
		}
		.mid{
			width: 750rpx;
			height: 140px;
			overflow-x: scroll;
			display: flex;
			flex-direction: row;
			font-size: 14px;
			
			.item{
				height: 100%;
				width: 140px;
				margin: 0 5px;
				background: rgba(170, 170, 170, 0.3);
				border-radius: 5px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				view{
					width: 65px;
					text-align: center;
				}
				&:nth-child(1){
					background: rgba(117, 117, 117, 0.3);
				}
			}
		}
		.title{
			font-size: 18px;
			font-weight: bold;
			margin: 10px 20px ;
		}
		.box{
			height: 180px;
			margin: 10px 15px;
			border-radius: 10px;
			background: rgba(204, 204, 204,0.3);
			display: flex;
			flex-direction: row;
			.left{
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}
		.life{
			border-radius: 10px;
			margin: 15px;
			height: 200px;
			background: rgba(204, 204, 204,0.3);
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			.items{
				color: #4b4b4b;
				font-size: 14px;
				width:22%;
				height: 47%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
				img{
					width: 30px;
					height: 30px;
				}
			}
		}
	}
	.tips{
		color: black;
		font-weight: bold;
		margin-top: 5px;
	}
</style>
