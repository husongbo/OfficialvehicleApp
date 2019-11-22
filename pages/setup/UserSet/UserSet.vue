<template>
	<view class="content"  @touchstart="touchstart" @touchmove="touchmove" >
		<view class="select" ref="load">设置</view>
		<view class="set-top">
			<view class="settop-left">
				<view class="settop-span">{{Infomation.name}}</view>
				<view class="settop-edit" @click="EditName" v-if="LoginFlag">编辑昵称</view>
				<view class="settop-edit" @click="EditName" v-if="!LoginFlag">用户登录</view>
			</view>
			<view class="settop-img" @click="ChangeImg()">
				<image :src="Infomation.img" mode=""></image>	
			</view>
		</view>
		<view class="settop-list">
			<view class="list" v-for="(item,index) in UserSetList" :key="index" @click="Gotolist(item.id)" v-if="item.flag">
				<view class="">{{item.text}}</view>
				<image :src="item.img" mode=""></image>
			</view>
		</view>
		<view class="outlogin" @click="LoginOut" v-if="LoginFlag">退出登录</view>
		<w-loading text="退出中.." mask="1" click="0" ref="loading"></w-loading>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" confirmButtonText="确定"  @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import simpleDialog from '@/components/dialog.vue'
	import Utils from '../../../util/util.js'
	export default {
		components: {
			simpleDialog
		},
		data() {
			return {
				UserSetList:[//设置列表
					{id:1,img:'../../../static/Wallet/next.png',text:'密码修改',url:'../ChangePassword/ChangePsd/ChangePsd',flag:true},
					{id:2,img:'../../../static/Wallet/next.png',text:'设置支付密码',url:'../changephone/changephoneone/changephoneone',flag:true},
					{id:3,img:'../../../static/Wallet/next.png',text:'实名认证',url:'../InformationRenz/InformationRenz',flag:true},
					{id:4,img:'../../../static/Wallet/next.png',text:'联系我们',url:'',flag:true},
					{id:5,img:'../../../static/Wallet/next.png',text:'关于U先生',url:'',flag:true}
				],
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				Userimg:'../../../static/Set/boy.png',
				Infomation:{
					img:'',
					name:''
				},
				UserInfo:'',
				sDialog: {
					message:'你还没有登录，是否前往登录',
					title:''
				},
				flagpayment:true,
			}
		},
		onLoad(){
			// this.ifpayment()
			if(this.LoginFlag){
				this.UserInfo=this.UserLogin.UserInfo
				this.Infomation.img='../../../static/Set/boy.png'
				this.Infomation.name=this.UserInfo.real_name
			}
			else{
				this.UserInfo=''
				this.Infomation.img='../../../static/Set/boy.png'
				this.Infomation.name='游客'
			}
		},
		watch:{
			UserLogin(news,olds){
				console.log("hgdsadgbhbagdhadadkahdkdhakjdhakdhakhdkahda")
				this.UserLogin=news
				this.Infomation.name=this.UserLogin.UserInfo.real_name
			},
			LoginFlag(news,olds){
				this.LoginFlag=news
			}
		},
		computed:{
			LoginFlag:{
				get(){
					return this.$store.state.LoginFlag
				},
				set(val){
					this.$store.state.LoginFlag=val
				}
			},
			UserLogin:{
				get(){
					return this.$store.state.UserLogin
				},
				set(val){
					this.$store.state.UserLogin=val
				}
			}
		},
		methods: {
			...mapMutations(['RemoveLoginOut']),
			ifpayment(url){
				var _this=this
				var datas={
					phone:this.UserLogin.UserInfo.phone
				}
				this.$api.CheckUserTradePwd(datas).then((res)=>{
					console.log(res)
					if(res.data.result==1){
						_this.Urladress('../changephone/changephoneone/changephoneone')
					}
					else{
						uni.showToast({
							title: '你已设置支付密码',
							duration: 1000,
							icon:"none",
						});
					}
				})
			},
			Gotolist(e){//选择项
				var _this=this
				this.UserSetList.forEach((item)=>{
					if(e==item.id){
						if(e==1||e==2||e==3){
							if(e==2){
								_this.ifpayment(item.url)
								return
							}
							if(_this.LoginFlag){
								_this.Urladress(item.url)
								return;
							}
							else{
								_this.$refs.simpleDialog2.confirm({
									title: '提示！',
									message:_this.sDialog.message
								});
								return;
							}
						}
						_this.Urladress(item.url)
						return;
					}
				})
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				this.Urladress('../../login/login/login')
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			Urladress(urls){
				uni.navigateTo({
				    url: urls,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			LoginOut(){
				this.$refs.loading.open()
				// var userid=this.UserLogin.UserInfo.user_id
				// var data={
				// 	user_id:userid
				// }
				// var AesJson=Utils.encrypt(JSON.stringify(data),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
				// var datas={
				// 	post_params:AesJson
				// }
				// this.$api.ExitCompany(datas).then((res)=>{
				// 	console.log(res)
					setTimeout(()=>{
						this.$refs.loading.close()
						uni.showToast({
							title: '退出成功',
							duration: 1000,
							icon:"none",
						});
						setTimeout(()=>{
							// const currentWebview = this.$mp.page.$getAppWebview()
							// console.log(currentWebview.id)
							this.RemoveLoginOut()
							uni.navigateBack({
								// delta: parseInt(currentWebview.id)-1,
								delta:1,
								animationType: 'pop-out',
								animationDuration: 200
							});
						},1000)
					},1500)
				// })
				
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
			EditName(){
				var _this=this
				if(!this.LoginFlag){
					_this.$refs.simpleDialog2.confirm({
						title: '提示！',
						message:_this.sDialog.message
					});
					return
				}
				uni.navigateTo({
				    url: '../nicknames/changenicknames/changenicknames',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			//改变头像
			ChangeImg(){
				var _this=this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(res.tempFilePaths);
						 uni.saveFile({
						  tempFilePath: res.tempFilePaths[0],
						  success: function (data) {
							var savedFilePath = data.savedFilePath;
							_this.Userimg=savedFilePath
							_this.Infomation.img=savedFilePath
							console.log(_this.Userimg)
						  }
						});
					},
					fail:function(err){
						console.log(JSON.stringify(err));
						
					}
				});
			}
		}
	}
</script>

<style>
.content{height:calc(100vh - 88upx);}
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;}
.set-top{display: flex;justify-content: space-between;margin-left: 20upx;font-size: 1.5rem;padding-bottom: 40upx;border-bottom: 1px solid rgb(250,250,250);}
.settop-edit{font-size: 0.8rem;color: #CCCCCC;margin-top: 10upx;}
.settop-img image{width: 140upx;height: 140upx;margin-right: 20upx;border-radius: 50%;}
.settop-list{}
.settop-span{font-size: 1.5rem;}
.list:active{background: rgb(250,250,250);}
.list{display: flex;justify-content: space-between;padding: 20upx 0;border-bottom: 1px solid rgb(250,250,250);font-size: 0.8rem;padding-left: 20upx;}
.list image{width: 40upx;height: 40upx;margin-right: 20upx;}
.outlogin{margin:0 20%;margin-top: 40%;background: rgb(81,166,255);color: white;width: 60%;height:80upx;line-height: 80upx;border: 0;text-align: center;
box-shadow: 0 0 0.4rem rgba(81,166,255, 0.6);}
.outlogin:active{background: rgb(81,180,255);}
uni-button:after{border: 0;}
</style>
