import request from "./request.js"
//const BaseUrl = 'http://127.0.0.1:5500';
const BaseUrl = 'http://43.138.208.151:5500';
export default {
	BaseUrl,
	// 密码登录
	login(params) {
		return request("/users/login", "POST", params)
	},
	getInfo(params) {
		return request("/users/findUser", "GET", params)
	},
	//判断登录状态
	getStatus(params){
		return request("/users/getUserInfo","GET",params)
	},
	//退出登录
	quit(params){
		return request("/users/quit","POST",params)
	},
	//首页推荐
	getRecomend(params){
		return request("/bus/getAllRecomendList","GET",params)
	},
	//根据id查推荐详情
	getRecommendById(params){
		return request("/bus/getRecomendById","GET",params)
	},
	//获取校园墙列表
	getWallList(params){
		return request("/bus/getWallList","GET",params)
	},
	//根据id获取校园墙详情
	getWallListByID(params){
		return request("getMsgListByID","GET",params)
	},
	//根据id获取留言列表
	getMsgListByID(params){
		return request("/bus/getMsgListByID","GET",params)
	},
	//添加校园墙
	addWall(params){
		return request("/bus/addWall","POST",params)
	},
	//跳蚤市场出闲置模糊查询
	cxzSearch(params){
		return request("/bus/cxzsearch","GET",params)
	},
	//跳蚤市场求购闲置模糊搜索
	qxzSearch(params){
		return request("/bus/qxzsearch","GET",params)
	},
	//失物招领搜索
	lostSearch(params){
		return request("/bus/lostsearch","GET",params)
	},
	getNote(params){
		return request("/other/getNoteList","GET",params)
	},
	//获取学校新闻列表
	getNoticList(params){
		return request("/bus/getNoticelist","GET",params)
	},
	//根据id 获取新闻
	getNoticById(params){
		return request("/bus/getNoticelistByID","GET",params)
	},
	//模糊搜索笔记
	getNoteSearch(params){
		return request("/other/getNoteSearch","GET",params)
	},
	//添加闲置列表
	addSecondhand(params){
		return request("/bus/addSecondhand","POST",params)
	},
	//添加求购
	addLookingList(params){
		return request("/bus/addLookingList","POST",params)
	},
	//添加留言
	addMsg(params){
		return request("/other/addMsg","PUT",params)
	}
}