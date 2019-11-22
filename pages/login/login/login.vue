<template>
	<view class="content"  @touchstart="touchstart" @touchmove="touchmove">
		<image src="../../../static/login/logins.jpg" mode="" style="width: 100%;position: absolute;top: 0;left: 0;z-index: -1;height: 100vh;"></image>
		<view class="login-parent">
			<view class="login" @click="login">
				立即登录
			</view>
			<view class="register">
				企业注册 >>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				swidth:'',
			}
		},
		onLoad(){
			var _this=this
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					_this.swidth=res.screenWidth+"px"
					console.log(_this.swidth)
				}
			})
		},
		methods: {
			touchstart(event){
				event.preventDefault();
	　　　　			this.startX = event.touches[0].pageX
			},
			touchmove(event){
				event.preventDefault();
		　　　　this.moveEndX = event.touches[0].pageX
				this.valueX= this.moveEndX - this.startX
				if ( this.valueX >= 80 ) {
						uni.navigateBack({
							delta:1,
							animationType: 'pop-in',
							animationDuration: 200
						})
					return;　	
		　　　　}
		　　　　else if ( this.valueX < 0 ) {
		　　　　　　return
		　　　　}
		　　　　else{
		　　　　　　return
		　　　　}
			},
			login(){
				uni.navigateTo({
				    url: `../UserLoginPhone/UserLoginPhone?flag=false`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
.content{
	width:100%;
	height:100%;
	position: relative;
	/* background: url(../../../static/login/logins.jpg) no-repeat;
	background-size: 100% 100%; */
}
.login-parent{
	padding-top: 60%;
}
.login{
	width: 60%;
	height: 100upx;
	margin: 0 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: -webkit-linear-gradient(left,rgb(247,206,19),rgb(246,163,45));
	border-radius: 50upx;
}
.login:active{
	color: white;
	background: -webkit-linear-gradient(left,rgba(247,206,19,.8),rgba(246,163,45.8));
}
.register{
	text-align: center;
	color: #CCCCCC;
	font-size: .7rem;
	margin-top: 20upx;
}
</style>
