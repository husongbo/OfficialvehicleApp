<template>
	<view>
		<view class="content" @touchstart="touchstart" @touchmove="touchmove">
			<view class="con-login">我的昵称</view>
			<view class="inputs" style="display: flex;justify-content: space-between;align-items:center;">
				<input type="text" class="phone" style="font-size: 1.2rem;" v-model="User.name" value="" placeholder="请输入昵称"/>
				<image src="../../../../static/Set/keydel.png" mode="" style="width: 40upx;height: 40upx;" @tap="visPsd"></image>
			</view>
			
			<view class="login-bottom">
				<view  class="gobtn" @click="Gologintwo">完成</view>
			</view>
		</view>
		<w-loading  mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import Utils from '../../../../util/util.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				User:{
					name:'',
					YZM:/^[\u4e00-\u9fa5]+$/,
				},
				nameflag:true,
				PlacrHoloder:'',
			}
		},
		computed: mapState(['LoginFlag','UserLogin']),
		onLoad(){
			if(this.UserLogin.UserInfo.real_name=='未设置'){
				this.User.name=''
			}
			else{
				this.User.name=this.UserLogin.UserInfo.real_name
			}
			console.log(this.User.name)
		},
		methods: {
			...mapMutations(['information']),
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
			visPsd(){
				if(this.User.name==''){
					return
				}
				this.User.name=''
			},
			Gologintwo(){
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
					var _this=this
					if(this.nameflag){
						this.nameflag=false
						if(this.User.name==''||this.User.name==null){
							uni.showToast({
								title:'文本框不能为空',
								duration: 1000,
								icon:"none",
								success:function(){
									_this.nameflag=true
								}
							});
							return
						}
						if(!this.User.YZM.test(this.User.name)){
							uni.showToast({
								title:'请输入只包含中文用户名',
								duration: 1000,
								icon:"none",
								success:function(){
									_this.nameflag=true
								}
							});
							return
						}
						var jsondatas={
							user_id:_this.UserLogin.UserInfo.user_id,
							real_name:_this.User.name,
							driver_id:_this.UserLogin.UserInfo.driver_id,
							contry:"中国",
							province:_this.UserLogin.UserInfo.province,
							city:_this.UserLogin.UserInfo.city,
							address:_this.UserLogin.UserInfo.address,
							email:_this.UserLogin.UserInfo.email,
							phone:_this.UserLogin.UserInfo.phone.trim()	
						}
						var ascdata=Utils.encrypt(JSON.stringify(jsondatas),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
						uni.request({
							url: 'http://gwyc.youxinbao.com.cn/public/UpdateUserInfo', //仅为示例，并非真实接口地址。
							data: {
								post_params:ascdata
							},
							success: (res) => {
								console.log(res);
								if(res.data.result==0){
									_this.UserLogin.UserInfo.real_name=_this.User.name
									_this.$refs.loading.open()
									setTimeout(()=>{
										_this.information(_this.UserLogin.UserInfo)
										_this.$refs.loading.close()
										uni.showToast({
											title:'昵称修改成功',
											duration: 1000,
											icon:"none",
										});
										setTimeout(()=>{
											uni.navigateBack({
												delta:1,
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
											title: '昵称修改失败',
											duration: 1000,
											icon:"none",
										});
									},2000)
									return;
								}
							},
							fail:(err)=>{
								console.log(err)
							}
						});
					}	
				})				
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
	padding: 0 60upx;
	background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));
	height: 80upx;
	line-height:80upx;
	border-radius: 10upx;
}
uni-button:after{border: 0;}
</style>
