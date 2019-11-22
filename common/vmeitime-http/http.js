import config from './config.js'
class HTTP {
	request(params) {
		if (!params.method) {
			params.method = 'GET'
		}
		if (!params.data) {
			params.data = '';
		}
		uni.request({
			url: config.url + params.url,
			method: params.method,
			data: params.data,
			dataType: 'json',
			success:function(res) {
				params.success(res)
			}
		});
	}
}
export {
	HTTP
}