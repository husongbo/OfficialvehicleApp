import Utils from '../../util/util.js'
export default {
	//登录
	Login(state,info){
		this.commit('GetDatas')
		// console.log(info)
		state.UserLogin.UserInfo=info.userinfo
		state.UserLogin.LoginFlags=true
		state.LoginFlag=true
		if(state.UserLogin.UserInfo.real_name==null){
			state.UserLogin.UserInfo.real_name='未设置'
		}
		if(state.UserLogin.UserInfo.personal_balance==null){
			state.UserLogin.UserInfo.personal_balance=0
		}
		if(state.UserLogin.UserInfo.company_balance==null){
			state.UserLogin.UserInfo.company_balance=0
		}
		console.log(state.UserLogin)
		uni.setStorage({
			key: 'UserInfos',
			data:state.UserLogin,
			success: function (e) {
				return;
			}
		});
	},
	//获取当前日期时间
	GetDatas(state){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		month=month< 10 ? ("0" + month) : month;
		day=day< 10 ? ("0" + day) : day
		state.UserLogin.logintime=year + '-' + month + '-' + day;
	},
	//获取用户信息
	GetUserInfo(state){
		
		uni.getStorage({
			key: 'UserInfos',
			success: function (res) {
				state.UserLogin=res.data
				if(res.data.LoginFlags){
					state.LoginFlag=true
				}
				var json={
					user_id:state.UserLogin.UserInfo.user_id,
					user_token:state.UserLogin.UserInfo.user_token
				}
				var AesJson=Utils.encrypt(JSON.stringify(json),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
				var datas={
					post_params:AesJson
				}
				console.log(json)
				console.log(datas)
				state.UserLogin.SessionFlag=datas
			}	
		})
	},
	//退出登录
	RemoveLoginOut(state){
		uni.removeStorage({
			key: 'UserInfos'
		});
		state.LoginFlag=false
		state.UserLogin.UserInfo=''
		state.LoginFlags=false
		state.UserLogin.logintime=''
		state.UserLogin.Halfwaylogintime=''
		state.UserLogin.DatNum=''
		state.UserLogin.SessionFlag=''
	},
	//基本信息保存
	information(state,info){
		state.UserLogin.UserInfo=info
		uni.setStorage({
			key: 'UserInfos',
			data:state.UserLogin,
			success: function (e) {
				return;
			}
		});
		this.commit('GetUserInfo')
	},
	//保存当前定位
	SaveLocation(state){
		state.LocationFlag=true
		uni.setStorage({
			key: 'Location',
			data:state.LocationFlag
		});
	},
	//获取当前定位
	GetLocation(state){
		uni.getStorage({
			key: 'Location',
			success: function (res) {
				state.LocationFlag=res
			}	
		})
	},
	//修改金额(公司)
	changPrice(state,price){
		state.UserLogin.UserInfo.company_balance=price
		uni.setStorage({
			key: 'UserInfos',
			data:state.UserLogin,
			success: function (e) {
				return;
			}
		});
		this.commit('GetUserInfo')
	},
	//获取当前日期时间
	GetData(state){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		month=month< 10 ? ("0" + month) : month;
		day=day< 10 ? ("0" + day) : day
		state.UserLogin.Halfwaylogintime= year + '-' + month + '-' + day;//中途打开APP时间
	},
	//格式化日期的月份或天数的显示（小于10，在前面增加0）
	getFormatDate(value){
		var result;
		result = value < 10 ? ("0" + value) : value;
		return result;
	},
	//获取两个日期的相差日期数(differ 相差天数：1、相差小时数：2、相差分钟数：3、相差秒数：4)
	getDifferDate(state,Dates){
		console.log(Dates)
		var sDate1 = Date.parse(Dates.logintimes);
	    var sDate2 = Date.parse(Dates.outlogintimes);
		var dateSpan = sDate2 - sDate1;
	    var dateSpan = Math.abs(dateSpan);
		var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
		state.UserLogin.DatNum=iDays
	},
	//判断登录状态
	FalgLogin(state){
		this.commit('GetUserInfo')
		var json={
			user_id:state.UserLogin.UserInfo.user_id,
			user_token:state.UserLogin.UserInfo.user_token
		}
		var AesJson=Utils.encrypt(JSON.stringify(json),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
		var datas={
			post_params:AesJson
		}
		console.log(json)
		console.log(datas)
		state.UserLogin.SessionFlag=datas
	}
}