<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="content">
			<view class="con-login">设置支付密码</view>
			<view class="inputs" style="display: flex;justify-content: space-between;align-items:center;">
				<input :type="psd" class="phone" style="font-size: 1.2rem;" v-model="UserPsd.text" placeholder="请输入6位数字的密码"/>
				<image :src="psdeyeimg" mode="" style="width: 40upx;height: 40upx;" @tap="visPsd"></image>
			</view>
			<view class="inputs">
				<input :type="psd" class="phone" style="font-size: 1.2rem;" v-model="UserPsd.texts" placeholder="再次输入密码"/>
			</view>
			<view class="login-bottom">
				<view  class="gobtn" @click="completelogin">确定</view>
			</view>
		</view>
		<w-loading text="加载中.." mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import Utils from '../../../../util/util.js'
	import md5 from '@/common/md5.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				UserPsd:{
					Yz:/^[0-9]{6}$/,
					text:'',
					texts:''
				},
				UserRegister:{
					user_id:'',
					user_password:''
				},
				psd:'password',
				psdeyeimg:'../../../../static/login/eyes.png',
				psdeysflag:false,
				User:{
					userinfo:''
				},
				PSDflag:true,
			}
		},
		onLoad(){
				this.UserRegister.user_id=this.UserLogin.UserInfo.user_id
		},
		computed: mapState(['LoginFlag','UserLogin']),
		methods: {
			...mapMutations(['information']),
			visPsd(){
				if(!this.psdeysflag){				
					this.psdeyeimg='../../../../static/login/eye.png'
					this.psd='text'
					this.psdeysflag=true
					return;
				}
				if(this.psdeysflag){
					this.psdeyeimg='../../../../static/login/eyes.png'
					this.psd='password'
					this.psdeysflag=false
				}
			},
			completelogin(){
				this.$api.ChekcToken(this.$store.state.UserLogin.SessionFlag).then((res)=>{
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
					if(this.PSDflag){
						this.PSDflag=false
						var _this=this
						if(this.UserPsd.text==''){
							uni.showToast({
								title: '密码不能为空，请正确输入',
								duration: 1000,
								icon:"none",
								success:function(){
									_this.PSDflag=true
								}
							});
							return
						}
						if(!this.UserPsd.Yz.test(this.UserPsd.text)){
							uni.showToast({
								title: '密码格式不正确，请正确填写',
								duration: 1000,
								icon:"none",
								success:function(){
									_this.PSDflag=true
								}
							});
							return
						}
						if(this.UserPsd.text!=this.UserPsd.texts){
							uni.showToast({
								title: '俩次密码不一致，请正确填写',
								duration: 1000,
								icon:"none",
								success:function(){
									_this.PSDflag=true
									_this.UserPsd.texts=''
								}
							});
							return
						}
						this.UserRegister.user_password=this.UserPsd.text
						var mdoldpsd=md5(this.UserRegister.user_password)
						var json={
							user_trade_password:this.UserRegister.user_password
						}
						var jsonesc=Utils.encrypt(JSON.stringify(json),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
						var PsdJson={
							user_id:this.UserLogin.UserInfo.user_id,
							post_params:jsonesc
						}
						console.log(mdoldpsd)
						console.log(json)
						console.log(PsdJson)
						this.$api.SetTraderPwd(PsdJson).then((res)=>{
							console.log(res)
							if(res.data.result==0){
								_this.$refs.loading.open()
								setTimeout(()=>{
									_this.UserLogin.UserInfo.user_trade_password=_this.UserRegister.user_password
									_this.information(_this.UserLogin.UserInfo)
									_this.$refs.loading.close()
									uni.showToast({
										title:"支付密码设置成功",
										duration: 1000,
										icon:"none",
									});
									setTimeout(()=>{
										uni.navigateBack({
											delta:2,
											animationType: 'pop-in',
											animationDuration: 200
										})
									},1000)
								},2000)
								return;
							}
							if(res.data.result==1){
								_this.$refs.loading.open()
								setTimeout(()=>{
									_this.$refs.loading.close()
									uni.showToast({
										title: res.data.message,
										duration: 1000,
										icon:"none",
									});
								},2000)
								return;
							}
						})
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
