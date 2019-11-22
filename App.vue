<script>
	import {mapState,mapMutations} from 'vuex'
	import Utils from './util/util.js'
	import amapFile from './static/js/amap-wx.js'
	export default {
		computed: mapState([ 'UserLogin']),
		// onLaunch: function() {
		// 	console.log('App Launch')
		// 	this.$store.commit('GetLocation')
		// 	setTimeout(()=>{
		// 		//this.timelocation()
		// 		// this.Push()
		// 	},2000)
		// },
		
		onShow: function() {
			// this.getmaplocation()
			this.$store.commit('FalgLogin')
			// console.log('App Show')	
			console.log(this.$store.state.UserLogin.LoginFlags)
			if(!this.$store.state.UserLogin.LoginFlags){
				return
			}
			this.$api.ChekcToken(this.$store.state.UserLogin.SessionFlag).then((res)=>{
				console.log(res)
				setTimeout(()=>{
					if(res.data.result!=0){
						uni.showToast({
							title: '你的账户已在别处登录，如不是本人请尽快修改密码',
							duration: 2000,
							icon:"none",
						});
						this.$store.commit('RemoveLoginOut')
						setTimeout(()=>{
							uni.navigateTo({
							    url: '/pages/login/UserLoginPhone/UserLoginPhone',
								animationType: 'pop-in',
								animationDuration: 200
							})
						},2000)
						return
					}
					this.$store.commit('GetData')//中途打开时间
					console.log(this.$store.state.UserLogin.Halfwaylogintime)
					// this.$store.state.UserLogin.logintime='2018-05-24'
					var jsontime={
						logintimes:this.$store.state.UserLogin.logintime,
						outlogintimes:this.$store.state.UserLogin.Halfwaylogintime,
						diifer:1
					}
					// console.log(jsontime)
					this.$store.commit('GetUserInfo')
					// console.log(this.$store.state.UserLogin)
					this.$store.commit('getDifferDate',jsontime)
					// console.log(this.$store.state.UserLogin.DatNum)
					if(this.$store.state.UserLogin.DatNum>30){
						this.$store.commit('RemoveLoginOut')
						uni.showToast({
							title: '账户已过期，请重新登录!',
							duration: 1000,
							icon:"none"
						});
					}
				},3000)	
			})	
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: mapState(['LocationFlag']),
		methods:{
			...mapMutations(['GetUserInfo']),
			// timelocation(){
			// 	var _this=this
			// 	let system = uni.getSystemInfoSync();// 获取系统信息
			// 	if (system.platform === 'android') {
			// 		var context = plus.android.importClass("android.content.Context");
			// 		var locationManager = plus.android.importClass("android.location.LocationManager");
			// 		var main = plus.android.runtimeMainActivity();
			// 		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
			// 			console.log(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER))
			// 		if (mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)&&!_this.LocationFlag) {
			// 			uni.showModal({
			// 				title: '提示',
			// 				content: '请打开定位服务功能',
			// 				showCancel: false, // 不显示取消按钮
			// 				success() {
			// 					if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
			// 						var Intent = plus.android.importClass('android.content.Intent');
			// 						var Settings = plus.android.importClass('android.provider.Settings');
			// 						var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); 
			// 						main.startActivity(intent); // 打开系统设置GPS服务页面
			// 					} else {
			// 						_this.$store.commit('SaveLocation')
			// 						return;	
			// 					}
			// 				}
			// 			});
			// 		}
			// 	}
			// },
			getmaplocation(){//地图
				var _this=this
				var myAmapFun = new amapFile.AMapWX({key:'a6a78927a8aa32f0a5abe247d5a58a70'});
					myAmapFun.getRegeo({
						success:(data) => {
							console.log("成功")
							
						},
						fail:function(err){
							console.log("失败")
							// console.log(err)
							_this.checkPermissionPos()
						}
				});
			},
			checkPermissionPos(){
				plus.geolocation.getCurrentPosition(function(p){
					// plus.nativeUI.alert('当前地址经纬度:'+p.coords.latitude+"---"+p.coords.longitude);
					// console.log('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
				}, function(e){
					// plus.nativeUI.alert('当前定位失败');
					// console.log('Gelocation Error: code - ' + e.code + '; message - ' + e.message);
					switch(e.code) {
					  case e.PERMISSION_DENIED:
						 plus.nativeUI.alert('用户拒绝了地理定位请求.');
						  break;
					  case e.POSITION_UNAVAILABLE:
						  plus.nativeUI.alert('位置信息不可用.');
						  break;
					  case e.TIMEOUT:
						  plus.nativeUI.alert('获取用户位置的请求超时.');
						  break;
					  case e.UNKNOWN_ERROR:
						  plus.nativeUI.alert('未知错误.');
						  break;
					  }
				} );
			},
			// Push(){
			// 	uni.getProvider({
			// 		service: 'push',
			// 		success: function (res) {
			// 			console.log(res.provider)
			// 			// 个推的名称为 igexin
			// 			if (~res.provider.indexOf('igexin')) {
			// 				uni.subscribePush({
			// 					provider: 'igexin',
			// 					success: function (res) {
			// 						console.log('success:' + JSON.stringify(res));
			// 					}
			// 				});
			// 			}
			// 		}
			// 	});
			// }
		},
	}
</script>

<style>
	@import './common/uni.css';
	@import "./static/css/simplepro.css";
	/*每个页面公共css */
	*{font-family: "微软雅黑";}
</style>
