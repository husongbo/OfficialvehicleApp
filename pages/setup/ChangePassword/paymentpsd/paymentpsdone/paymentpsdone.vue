<template>
	<view>
		<view class="content" @touchstart="touchstart" @touchmove="touchmove">
			<view class="con-login">修改支付密码</view>
			<view class="inputs" style="display: flex;justify-content: space-between;align-items:center;">
				<input :type="psd" class="phone" value="" style="font-size: 1.2rem;" v-model="User.password" placeholder="请输入6位数的支付密码"/>
				<image :src="psdeyeimg" mode="" style="width: 40upx;height: 40upx;" @tap="visPsd"></image>
			</view>
			
			<view class="login-bottom">
				<view  class="gobtn" @click="Gologintwo">下一步</view>
			</view>
		</view>
		<w-loading text="..." mask="1" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				User:{
					phone:'',
					password:'',
					pwd_type:2
				},
				FlagUserPsd:true,
				Yz:/^[0-9]{6}$/,
				psd:'password',
				psdeyeimg:'../../../../../static/login/eyes.png',
				psdeysflag:false,
			}
		},
		computed: mapState(['LoginFlag','UserLogin']),
		onLoad(){
			console.log(this.UserLogin.UserInfo.phone)
			this.User.phone=this.UserLogin.UserInfo.phone.trim()
		},
		methods: {
			touchstart(event){
				event.preventDefault();
　　　　			this.startX = event.touches[0].pageX
			},
			visPsd(){
				if(!this.psdeysflag){				
					this.psdeyeimg='../../../../../static/login/eye.png'
					this.psd='text'
					this.psdeysflag=true
					return;
				}
				if(this.psdeysflag){
					this.psdeyeimg='../../../../../static/login/eyes.png'
					this.psd='password'
					this.psdeysflag=false
				}
			},
			Gologintwo(){
				if(this.FlagUserPsd){
					var _this=this
					this.FlagUserPsd=false
					if(this.User.password==''){
						uni.showToast({
							title: '不能为空，请继续输入',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.FlagUserPsd=true
							}
						});
						return;
					}
					if(!this.Yz.test(this.User.password)){
						uni.showToast({
							title: '请正确输入6位数的密码',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.FlagUserPsd=true
								_this.User.password=''
							}
						});
						return;
					}
						_this.$refs.loading.open()
						setTimeout(()=>{
							_this.$refs.loading.close()
							_this.FlagUserPsd=true
							uni.navigateTo({
							    url: `../paymentthree/paymentthree?oldpsd=${this.User.password}`,
								animationType: 'pop-in',
								animationDuration: 200
							})
						},1000)
					
				}				
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
			}
		}
	}
</script>

<style>
.content{
	padding: 20upx;
	height:calc(100vh - 88upx);
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
	/* padding-bottom: 10upx; */
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
	justify-content:flex-end;
	height: 100upx;
	margin-top: 80upx;
}
.setpsd{
	font-size: 0.8rem;
	color:#C8C7CC;
}
.gobtn{
	margin-right: 0;
	padding: 0 60upx;
	background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));
	height: 80upx;
	line-height:80upx;
	border-radius: 10upx;
}
uni-button:after{border: 0;}
</style>
