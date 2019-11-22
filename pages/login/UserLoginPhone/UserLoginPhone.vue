<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="content">
			<view class="con-login">登录<span>U先生</span></view>
			<view class="inputs">
				<input type="number" style="font-size: 1.2rem;" class="phone" v-model="UserText.userphone" placeholder="请输入电话号码"/>
				<image class="close" src="../../../static/login/close.png" @click="Del" mode="" @touchstart="gotouchstart" @touchend="gotouchend"></image>
			</view>
			
			<view class="login-bottom">
				<!-- <view class="setpsd">设置登录密码</view> -->
				<view  class="gobtn" @click="GetCode">下一步</view>
			</view>
		</view>
		<w-loading text="加载中.." mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	
	export default {
		computed: mapState([ 'aa']),
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				RegisterLogin:true,
				// /^1[3456789]\d{9}$/
				Regular:{
					phone:/^1[3456789]\d{9}$/
				},
				UserText:{
					userphone:''
				},
				datas:{
					phone:''
				},
				UserJson:{
					phone:'',
					flag:false
				},
				Phonelist:[],
				touch:'',
				touchIn:'',
				PhoneFlag:true,
				BackFlag:true,
			}
		},
		onLoad(options){
			if(options.flag==undefined){
				this.BackFlag=false
			}
			else{
				this.BackFlag=true
			}
		},
		onNavigationBarButtonTap(e){
			console.log(this.BackFlag)
			if(this.BackFlag){
				uni.navigateBack({
					delta:1,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
			else{
				uni.reLaunch({
					url: '../../tabbar/index/index'
				});
			}
			console.log(e)
		},
		methods: {
			GetCode(){
				var _this=this
				if(this.PhoneFlag){
					this.PhoneFlag=false
					if(this.UserText.userphone==''){
						uni.showToast({
							title: '电话号码不能为空',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.PhoneFlag=true
							}
						});
						return;
					}
					if(!this.Regular.phone.test(this.UserText.userphone)){
						uni.showToast({
							title: '请输入正确的电话号码',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.PhoneFlag=true
							}
						});
					}
					else{
						this.datas.phone=this.UserText.userphone
						this.UserJson.phone=this.UserText.userphone
						this.$api.CheckUserPwd(this.datas).then((res)=>{
							console.log(res)
							_this.$refs.loading.open()
							setTimeout(()=>{
								_this.$refs.loading.close()
								_this.PhoneFlag=true
								if(res.data.result==1&&res.data.message=='请先设置登录密码'){
									_this.UserJson.flag=false
									uni.navigateTo({
										url: `../CodeSending/CodeSending?phone=${_this.UserJson.phone}&flag=${_this.UserJson.flag}`,
										animationType: 'pop-in',
										animationDuration: 200
									})
								}
								if(res.data.result==0){
									uni.navigateTo({
										url: `../Loginmode/Loginmode?phone=${_this.UserText.userphone}`,
										animationType: 'pop-in',
										animationDuration: 200
									})
								}
							},1500)
						})
					}
				}	
			},
			Del(){
				var num=''
				this.Phonelist=this.UserText.userphone.split('')
				this.Phonelist.pop()
				this.Phonelist.forEach((item)=>{
					num+=item
				})
				this.UserText.userphone=num
				console.log(this.Phonelist)
			},
			gotouchstart(){
				var _this=this
				this.touch=setTimeout(()=>{
					this.touchIn=setInterval(()=>{
						_this.Del()
					},100)
				},200)
			},
			gotouchend(){
				clearTimeout(this.touch)
				clearInterval(this.touchIn)
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
						if(this.BackFlag){
							uni.navigateBack({
								delta:1,
								animationType: 'pop-in',
								animationDuration: 200
							})
						}
						else{
							uni.reLaunch({
								url: '../../tabbar/index/index'
							});
						}
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
.close{width: 70upx;height: 40upx;}
.con-login span{
	color:rgb(228,200,110);
	margin-left: 10upx;
}
.inputs{
	margin-top: 50upx;
	border-bottom: 1px solid #CCCCCC;
	display: flex;
	justify-content: space-between;
	height: 70upx;
	align-items: center;
	/* padding-bottom: 10upx; */
}
.phone{
	/* margin-top: 70upx; */
	font-size: 1.2rem;
	color: #C8C7CC;
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
	height: 60upx;
	line-height: 60upx;
	padding: 0 40upx;
	background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));
	border-radius: 10upx;
}
.gobtn:active{
	color: white;
}
</style>
