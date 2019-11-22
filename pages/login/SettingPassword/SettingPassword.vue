<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="content">
			<view class="con-login">设置登录密码</view>
			<view class="inputs" style="display: flex;justify-content: space-between;align-items:center;">
				<input :type="psd" class="phone" style="font-size: 1.2rem;" v-model="UserPsd.text" placeholder="6-16位数字和字母"/>
				<image :src="psdeyeimg" mode="" style="width: 40upx;height: 40upx;"></image>
			</view>
			<view class="inputs">
				<input :type="psd" class="phone" style="font-size: 1.2rem;" v-model="UserPsd.texts" placeholder="再次输入密码"/>
			</view>
			<view class="login-bottom">
				<view  class="gobtn" v-on:click.stop="completelogin">完成并登录</view>
			</view>
		</view>
		<w-loading text="加载中.." mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import Utils from '../../../util/util.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				UserPsd:{
					Yz:/^[0-9A-Za-z]{6,16}$/,
					text:'',
					texts:''
				},
				UserRegister:{
					phone:'',
					user_password:''
				},
				psd:'password',
				psdeyeimg:'../../../static/login/eyes.png',
				psdeysflag:false,
				User:{
					userinfo:''
				}
			}
		},
		onLoad(options){
				this.UserRegister.phone=options.phone
		},
		onNavigationBarButtonTap(e){
			uni.showToast({
				title: '你已取消注册',
				duration: 1000,
				icon:"none",
			});
			setTimeout(()=>{
				uni.navigateBack({
					delta:3,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},1000)
		},
		methods: {
			...mapMutations(['Login']),
			visPsd(){
				if(!this.psdeysflag){				
					this.psdeyeimg='../../../static/login/eye.png'
					this.psd='text'
					this.psdeysflag=true
					return;
				}
				if(this.psdeysflag){
					this.psdeyeimg='../../../static/login/eyes.png'
					this.psd='password'
					this.psdeysflag=false
				}
			},
			completelogin(){
				var _this=this
				if(this.UserPsd.text==''){
					uni.showToast({
						title: '密码不能为空，请正确输入',
						duration: 1000,
						icon:"none",
					});
					return
				}
				if(!this.UserPsd.Yz.test(this.UserPsd.text)){
					uni.showToast({
						title: '密码格式不正确，请正确填写',
						duration: 1000,
						icon:"none",
					});
					return
				}
				if(this.UserPsd.text!=this.UserPsd.texts){
					uni.showToast({
						title: '俩次密码不一致，请正确填写',
						duration: 1000,
						icon:"none",
					});
					return
				}
				this.UserRegister.user_password=this.UserPsd.text
				var json={
					phone:this.UserRegister.phone,
					user_password:this.UserRegister.user_password
				}
				var aesdatas=Utils.encrypt(JSON.stringify(json),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
				var datas={
					post_params:aesdatas
				}
				console.log(datas)
				this.$api.Register(datas).then((res)=>{
					console.log(res)
					this.$refs.loading.open()
					if(res.data.result==0){
						setTimeout(()=>{
							_this.User.userinfo=res.data.user_info
							_this.Login(_this.User)
							uni.showToast({
								title: '注册并登录成功,请稍后...',
								duration: 2000,
								icon:"none",
								success:function(){
									setTimeout(()=>{
										// const currentWebview = this.$mp.page.$getAppWebview()
										// console.log(currentWebview.id)
										// uni.navigateBack({
										// 	delta: parseInt(currentWebview.id)-1,
										// 	animationType: 'pop-out',
										// 	animationDuration: 200
										// });
										_this.$refs.loading.close()
										uni.reLaunch({
											url: '../../tabbar/index/index'
										});
									},2000)
								}
							});
						},2000)
						return
					}
				})
			},
			touchstart(event){
				event.preventDefault();
	　　　　			this.startX = event.touches[0].pageX
			},
			touchmove(event){
				event.preventDefault();
		　　　　this.moveEndX = event.touches[0].pageX
				this.valueX= this.moveEndX - this.startX
				if ( this.valueX >= 80 ) {
						uni.showToast({
							title: '你已取消注册',
							duration: 1000,
							icon:"none",
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:3,
								animationType: 'pop-in',
								animationDuration: 200
							})
						},1000)
					return;　	
		　　　　}
		　　　　else if ( this.valueX < 0 ) {
		　　　　　　return
		　　　　}
		　　　　else{
		　　　　　　return
		　　　　}
			},
		}
	}
</script>

<style>
.content{
	padding: 20upx;
	height: calc(100vh - 44px);
}
.con-login{
	font-size:1rem;
	font-weight: 700;
}
.con-login span{
	color:rgb(228,200,110);
	margin-left: 10upx;
}
.inputs{
	border-bottom: 1px solid #ccc;
	margin-top: 70upx;
}
.phone{
	border: 0;
	width: 100%;
	/* margin-top: 70upx; */
	font-size: 1.2rem;
	color: #C8C7CC;
	padding-bottom: 20upx;
}
.login-bottom{
	display: flex;
	justify-content: space-between;
	height: 100upx;
	margin-top: 80upx;
}
.setpsd{
	font-size: 0.8rem;
	color:#C8C7CC;
}
.gobtn{
	margin-right: 0;
	padding: 0 80upx;
	width: 100%;height: 80upx;
	border: 0;
	line-height: 80upx;
	background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));
	text-align: center;
}
uni-button:after{border: 0;}
</style>
