<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="parent">
			<view class="logo">
				<view class="logoimg">
					<image src="../../../static/login/US.png" mode="" style="width: 70%;height:70%;position: absolute;top:15%;left: 15%;"></image>
				</view>
			</view>
			<view class="list">
				<view class="list-children">
					<image class="img" src="../../../static/login/phone.png" mode=""></image>
					<view class="inputs">
						<input type="text" style="font-size: 1.2rem;" v-model="UserPhonePsd.user_name" disabled="disabled" placeholder="请输入手机号" />
					</view>
				</view>
				<view class="list-children">
					<image class="img" src="../../../static/login/psdd.png" mode=""></image>
					<view class="inputs" style="display: flex;justify-content:space-between;align-items: center;">
						<input type="password" v-model="UserPhonePsd.user_pwd" placeholder="请输入登录密码" style="width: 100%;font-size: 1.2rem;"/>
						<image class="close" src="../../../static/login/close.png" @click="Del" mode="" @touchstart="gotouchstart" @touchend="gotouchend"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="forgetpsd">
			忘记密码?
		</view>
		<view class="LoginBtn" v-on:click.stop="Logins">
			登录
		</view>
		<w-loading text="登录中.." mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import Utils from '../../../util/util.js'
	import md5 from '@/common/md5.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				UserPhonePsd:{
					user_name:'',
					user_pwd:''
				},
				User:{
					userinfo:''
				},
				Phonelist:[],
				touch:'',
				touchIn:'',
				Dheight:'',//屏幕高度
				ScollFlag:true,
			}
		},
		onLoad(options){
			var _this=this
			this.UserPhonePsd.user_name=options.phone
			uni.getSystemInfo({
			success: function (res) {
				_this.Dheight=res.screenHeight+"px"
			}
		});
		},
		methods: {
			...mapMutations(['Login']),
			Del(){
				var num=''
				this.Phonelist=this.UserPhonePsd.user_pwd.split('')
				this.Phonelist.pop()
				this.Phonelist.forEach((item)=>{
					num+=item
				})
				this.UserPhonePsd.user_pwd=num
				console.log(this.Phonelist)
			},
			gotouchstart(){
				var _this=this
				this.touch=setTimeout(()=>{
					this.touchIn=setInterval(()=>{
						_this.Del()
					},50)
				},100)
			},
			gotouchend(){
				clearTimeout(this.touch)
				clearInterval(this.touchIn)
			},
			Logins(){
				var _this=this
				if(this.UserPhonePsd.user_pwd==''){
					 uni.showToast({
						title: '密码不能为空，请继续输入',
						duration: 1000,
						icon:"none",
					});
					return;
				}
				var mdpsd=md5(this.UserPhonePsd.user_pwd)
				var json={
					user_name:this.UserPhonePsd.user_name,
					user_password:this.UserPhonePsd.user_pwd
				}
				var jsondata=Utils.encrypt(JSON.stringify(json),mdpsd)
				var datas={
					user_name:this.UserPhonePsd.user_name,
					post_params:jsondata
				}
				console.log(datas)
				this.$api.Login(datas).then((res)=>{
					_this.$refs.loading.open()
					console.log(res)
					if(res.data.result==1){
						setTimeout(()=>{
							_this.$refs.loading.close()
							this.UserPhonePsd.user_pwd=''
							uni.showToast({
								title: '密码不正确,请重新输入密码',
								duration: 1000,
								icon:"none",
							});
						},2000)
						return;
					}
					if(res.data.result==0){
						setTimeout(()=>{
							uni.showToast({
								title: '登录成功，请稍后...',
								duration: 2000,
								icon:"none",
							});
							setTimeout(()=>{
								_this.$refs.loading.close()
								uni.navigateBack({
									delta:4,
									animationType: 'pop-out',
									animationDuration: 200
								});
							},2000)
							// this.UserPhonePsd.user_pwd=''
							// 保存用户信息
							this.User.userinfo=res.data.user_info
							this.Login(this.User)
							// console.log(JSON.stringify(this.User))
							
							
						},2000)
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
	.content{height: calc(100vh - 150upx);padding-top: 20%;overflow: hidden;}
.close{width: 70upx;height: 40upx;}
.logo{width: 100%;display: flex;justify-content: center;}
.logoimg{width: 140upx;height: 140upx;border: 1px solid rgb(223,127,33);border-radius: 50%;position: relative;box-sizing: border-box;}
.list-children{display: flex;flex-direction: row;height: 80upx;align-items: center;width: 80%;margin: 0 10%;margin-top: 40upx;}
.img{width: 60upx;height: 60upx;margin-right: 10upx;}
.list{padding-top: 100upx;}
.inputs{border-bottom:1px solid rgb(240,240,240);width: 100%;}
.forgetpsd{text-align: right;margin-right: 10%;margin-top: 20upx;color: #CCCCCC;}
.LoginBtn{width: 60%;margin: 0 20%;height: 90upx;display: flex;justify-content: center;align-items: center;background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));
border-radius: 50upx;margin-top: 30%;}
.LoginBtn:active{color: white;}
</style>
