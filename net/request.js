// 全局请求封装
const baseUrl = 'http://43.138.208.151:5500';
//const baseUrl = 'http://127.0.0.1:5500';
export default (url, method, params) => {
	const token = uni.getStorageSync('token');
	// uni.showLoading({
	// 	title: "加载中"
	// });
	if (!token) {
		// 执行没有登录的逻辑
		return;
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method,
			header: {
				'Authorization': token,
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			data: {
				...params
			},
			success: (res) => {
				setTimeout(function () {
					uni.hideLoading();
				}, 1000);				
				resolve(res)
			},
			fail: (err) => {

				reject(err)
			}

		});
	});
};
