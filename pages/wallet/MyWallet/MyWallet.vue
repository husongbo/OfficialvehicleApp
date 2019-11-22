<template>
	<view class="content">
		<view class="select" @touchstart="touchstart" @touchmove="touchmove">我的钱包</view>
		<view class="cover-container" :style="[{transform: coverTransform,transition: coverTransition}]" @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend" >
			<view class="wallet-parent">
				<view class="wallet">
					<view class="li-parent">
					<view class="wallet-li">
						<view class="wallet-top">
							个人账户余额 （元）
						</view>
						<view class="wallet-middle">
							<view class="mid-left">{{UserLogin.UserInfo.personal_balance}}</view>
							<!-- <view class="mid-right" @click="Seedetails">查看账单>></view> -->
						</view>
						<view class="Recharge" @click="openpay">立即充值</view>
					</view>
					</view>
					<view class="li-parent">
					<view class="wallet-li walletlis">
						<view class="wallet-top">
							公务用车剩余额度 （元）
						</view>
						<view class="wallet-middle">
							<view class="mid-left">{{UserLogin.UserInfo.company_balance}}</view>
							<!-- <view class="mid-right" @click="Seedetails">查看账单>></view> -->
						</view>
						<view class="Recharge" @click="clickbusiness">公务申请</view>
					</view>
					</view>
				</view>
			</view>
		</view>
		<view class="boms" @touchstart="touchstart" @touchmove="touchmove"></view>
		<!-- 公务用车 -->
		<view class="business" style="display: flex;justify-content: center;align-items: center;" v-if="flagbusiness">
			<view class="business-center" :class="{businessactive:flagbusiness}">
				<view class="companytitle"></view>
				<view class="companyprice">申请金额</view>
				<view class="inputparent">
					<input type="number" v-model="bunsinessjson.model_info.apply_gold" value="" class="priceinput"/>
				</view>
				<view class="buttons">
					<view class="btnleft" @click="btnleft">取消</view>
					<view class="btnright" @click="btnright">确定</view>
				</view>
			</view>
		</view>
		
		<!-- 充值 -->
		<view class="disk" v-if="diskif" @click="closepay" @touchmove.stop.prevent="moveHandle"></view>
		<view class="Payment" v-if="diskif" :class="{'Payaminate':Payamin}" >
			<view v-if="payone">
				<view class="pay-title">
					现金充值
					<image src="../../../static/Wallet/close.png" @click="closepay"></image>
				</view>
				<view class="cashre-price">
					<view class="prices">充值金额</view>
					<view class="inputs">
						<input type="number" class="phone" value="" placeholder="请输入充值金额"/>
					</view>
				</view>
				<view class="wallet-pay">
					<view class="pay-text">支付方式</view>
					<view class="wallet-list" @click="Payment">
						<view class="list-left">
							<image :src="paymentobj.img" mode=""></image>
							<view class="">{{paymentobj.text}}</view>
						</view>
						<view class="list-right">
							<image src="../../../static/Wallet/next.png" mode="" style="margin-right: 20upx;"></image>
						</view>
					</view>
				</view>
				<view  class="paymentbtn" @tap="Inputpssword">立即支付</view>
			</view>
			<!-- 第二步 -->
			<view v-if="paytwo">
				<view class="pay-title">
					选择支付方式
					<image src="../../../static/Wallet/left.png" @click="backs"></image>
				</view>
				<view class="pat-list" >
					<view class="paylist" style="justify-content: space-between;" v-for="(item,index) in Paymentlist" :key="index" @click="changepayment(item)">
						<view class="palist-left">
							<image :src="item.img" mode=""></image>
							<view class="palist-price">{{item.text}}</view>
							<view class="palist-right" v-if="index==0">剩余{{item.price}}元</view>
						</view>
						
						<view class="pay-ok" style="margin-right: 40upx;" v-if="item.flag">
							<image src="../../../static/Wallet/ok.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 输入密码 -->
		<view class="password" v-if="password">
			<view class="pay-title pay-psd">
				选择支付方式
				<image src="../../../static/Wallet/close.png" @click="closepay"></image>
			</view>
			<view class="psd-middle">
				<view class="psd-mid-price">充值金额</view>
				<view class="psd-mid-text">￥100</view>
			</view>
			<view class="psd-input">
				<view class="Num" :class="{activeview:PasswordList[0].flag}">
					<view class="Num-selected" v-if="PasswordList[0].flag"></view>
				</view>
				<view class="Num" :class="{activeview:PasswordList[1].flag}">
					<view class="Num-selected" v-if="PasswordList[1].flag"></view>
				</view>
				<view class="Num" :class="{activeview:PasswordList[2].flag}">
					<view class="Num-selected" v-if="PasswordList[2].flag"></view>
				</view>
				<view class="Num" :class="{activeview:PasswordList[3].flag}">
					<view class="Num-selected" v-if="PasswordList[3].flag"></view>
				</view>
				<view class="Num" :class="{activeview:PasswordList[4].flag}">
					<view class="Num-selected" v-if="PasswordList[4].flag"></view>
				</view>
				<view class="Num" :class="{activeview:PasswordList[5].flag}">
					<view class="Num-selected" v-if="PasswordList[5].flag"></view>
				</view>
			</view>
		</view>
		<view :class="'keyboard ' + pattern" v-if="password">
			<ul class="number">
				<li class="button"  v-for="item in keyss" :key="item" @tap="GetNumbers(item)">{{item}}</li>
				<li class="button">.</li>
				<li class="button down" >
					<image src="../../../static/Set/keydown.png" mode=""></image>
				</li>
			</ul>
			<view class="action">
				<view class="delete down" @click="DelNumbers"><image src="../../../static/Set/keydel.png" mode=""></image></view>
				<view class="ok down" @tap="backPay"><image src="../../../static/Set/backjian.png" mode=""></image></view>
			</view>
		</view>
		<w-loading :text="loadingtext" mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	const keys = () => {
		let natural = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		return natural.sort(function(){
			return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		});
	};
	import {mapState,mapMutations} from 'vuex'
	let startX = 0, moveX = 0, pageAtTop = true;
	export default {
		data() {
			return {
				pattern: 'hidden',
				keyss: keys(),
				diskif:false,//模板层,
				Payamin:false,//支付动画
				payone:true,//第一步
				paytwo:false,
				password:false,
				CountBuyMoney:'0.00',
				payreplacetext:'微信',//获取支付方式
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				Paymentlist:[
					{id:1,img:'../../../static/Wallet/price.png',text:'余额',price:100,flag:true},
					{id:2,img:'../../../static/Wallet/weixin.png',text:'微信支付',flag:false},
					{id:3,img:'../../../static/Wallet/zhifubao.png',text:'支付宝',flag:false},
					{id:4,img:'../../../static/Wallet/yizhifu.png',text:'翼支付',flag:false},
					{id:5,img:'../../../static/Wallet/wo.png',text:'沃支付',flag:false},
					{id:6,img:'../../../static/Wallet/bank.png',text:'中国建设银行',flag:false},
				],
				PsdArr:[],//密码存
				PasswordList:[
					{id:1,flag:false},
					{id:2,flag:false},
					{id:3,flag:false},
					{id:4,flag:false},
					{id:5,flag:false},
					{id:6,flag:false}
				],
				paymentobj:{
					text:'余额',
					img:'../../../static/Wallet/price.png'
				},
				loadingtext:'',
				flagbusiness:false,//公务充值
				price:{
					personalprice:'',
					businessprice:''
				},
				bunsinessjson:{
					method:"add",
					model_info:{
						user_id:'',
						apply_gold:''
					}
				},
				businessif:true,
				coverTransform: 'translateY(0)',
				coverTransition: '0s',
				moving: false,
				
			}
		},
		onLoad(){
			this.Getuserinfo()
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
			},
		},
		watch:{
			LoginFlag(news,olds){
				this.LoginFlag=news
			}
		},
		methods: {
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startX = e.touches[0].clientX;
				// console.log(startX)
			},
			coverTouchmove(e){
				moveX = e.touches[0].clientX;
				// console.log("移动"+moveX)
				let moveDistance = moveX - startX;
				// console.log(moveDistance)
				// if(moveDistance > 0){
				// 	this.moving = false;
				// 	return;
				// }
				this.moving = true;
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateX(${moveDistance}px)`;
				}
					
				if(moveDistance < 0 && moveDistance >= -80){
					this.coverTransform = `translateX(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateX(0px)';
			},
			Getuserinfo(){
				var _this=this
				this.bunsinessjson.model_info.user_id=this.UserLogin.UserInfo.user_id
				console.log(this.UserLogin)
			},
			GetNumbers(val){
				var _this=this
				this.PsdArr.push(val)
				if(this.PsdArr.length==6){
					this.loadingtext='充值中..'
					 this.$refs.loading.open()
					 this.password=false
					 setTimeout(()=>{
						 _this.diskif=false
						 _this.closepay()
						 _this.PsdArr=[]
						 this.PasswordList.forEach((item,index)=>{
						 	item.flag=false
						 })
						  this.$refs.loading.close()
						  uni.showToast({
						  	title: '充值成功',
						  	duration: 1000,
						  	icon:"none",
						  });
					 },1000)
					return;
				}
				this.PsdArr.forEach((item,index)=>{
					_this.PasswordList[index].flag=true
				})
				console.log(this.PsdArr)
			},
			//公务申请
			clickbusiness(){
				this.flagbusiness=true
			},
			//公务取消
			btnleft(){
				this.flagbusiness=false
			},
			btnright(){
				if(!this.LoginFlag){
					return
				}
				var _this=this
				if(this.businessif){
					this.businessif=false
					if(this.bunsinessjson.model_info.apply_gold==''||this.bunsinessjson.model_info.apply_gold==null){
						 uni.showToast({
							title: '申请金额不能为空',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.businessif=true
							}
						});
						return
					}
					if(parseInt(this.bunsinessjson.model_info.apply_gold)<=0){
						 uni.showToast({
							title: '申请金额不能小于等于0',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.businessif=true
							}
						});
						return;
					}
					if(parseInt(this.bunsinessjson.model_info.apply_gold)>parseInt(this.UserLogin.UserInfo.company_balance)){
						uni.showToast({
							title: '申请金额已大于你的公务用车剩余金额',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.businessif=true
							}
						});
						return;
					}
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
						var datas=`{user_id:"${this.bunsinessjson.model_info.user_id}",apply_gold:"${this.bunsinessjson.model_info.apply_gold}"}`
						console.log(datas)
						uni.request({
							url: 'http://gwyc.youxinbao.com.cn/public/SubMitApplyInfo', //仅为示例，并非真实接口地址。
							data: {
								method:"add",
								model_info:datas
							},
							success: (res) => {
								console.log(res);
								if(res.data.result==0){
									_this.$refs.loading.open()
									setTimeout(()=>{
										_this.$refs.loading.close()
										_this.flagbusiness=false
										_this.bunsinessjson.model_info.apply_gold=''
										uni.showToast({
											title: '申请成功，等待申请审核',
											duration: 1000,
											icon:"none",
											success:function(){
												_this.businessif=true
											}
										});
									},1500)
								}
							},
							fail:(err)=>{
								console.log(err)
							}
						});
					})
					
					// this.bunsinessjson.model_info.company_balance=parseInt(this.bunsinessjson.model_info.company_balance)
					// console.log(this.bunsinessjson)
					// this.$api.SubMitApplyInfo(this.bunsinessjson).then((res)=>{
					// 	console.log(res)
					// })
				}
				
				// this.$refs.loading.open()
				// setTimeout(()=>{
				// 	this.$refs.loading.close()
				// 	this.flagbusiness=false
				// 	uni.showToast({
				// 		title: '申请成功,等待公司审批',
				// 		duration: 1000,
				// 		icon:"none",
				// 	});
				// },2000)
				
			},
			//查看详情
			Seedetails(){
				uni.navigateTo({
				    url: '../Billdetails/Billdetails',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			DelNumbers(){
				var _this=this
				if(this.PsdArr.length==0){
					return;
				}
				this.PsdArr.pop()
				console.log(this.PsdArr)
				this.PasswordList.forEach((item,index)=>{
					item.flag=false
				})
				this.PsdArr.forEach((item,index)=>{
					_this.PasswordList[index].flag=true
					console.log(_this.PasswordList[index].flag)
				})
			},
			backPay(){
				this.payone=!this.payone
				this.password=!this.password
			},
			moveHandle(){
				return;
			},
			//更换支付方式
			changepayment(item){
				console.log(item)
				var _this=this
				this.Paymentlist.forEach((items)=>{
					if(item.id==items.id){
						items.flag=true
						_this.paymentobj.text=items.text
						_this.paymentobj.img=items.img
					}
					else{
						items.flag=false
					}
				})
				_this.backs()
			},
			backs(){
				this.payone=!this.payone
				this.paytwo=!this.paytwo
			},
			//关闭付款弹框
			closepay(){
				this.diskif=false
				this.Payamin=false
				this.password=false
				this.payone=true
				this.paytwo=false
			},
			openpay(){
				this.diskif=!this.diskif
				this.Payamin=!this.Payamin
			},
			//选择支付方式
			Payment(){
				this.payone=!this.payone
				this.paytwo=!this.paytwo
			},
			back(){
				this.payone=!this.payone
				this.paytwo=!this.paytwo
			},
			//输入密码
			Inputpssword(){
				this.payone=!this.payone
				this.loadingtext='加载中..'
				this.$refs.loading.open()
				setTimeout(()=>{
					this.$refs.loading.close()
					this.password=!this.password
				},2000)
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
.business{width: 100%;height:100vh;position: fixed;background: rgba(0,0,0,0.5);top: 0;left: 0;}
.companytitle{text-align: center;margin-top: 20upx;font-size: .9rem;}
.btnleft{display: flex;justify-content: center;align-items: center;width: 50%;border-right: 1px solid #CCCCCC;}
.btnright{display: flex;justify-content: center;align-items: center;width: 50%;background: -webkit-linear-gradient(left,rgb(247,206,19),rgb(246,163,45));border-radius:0 0  20upx 0;}
.companyprice{text-align: center;margin-top: 20upx;font-size: .7rem;}
/* .btnright:active,.btnleft:active{background: rgb(240,240,240);} */
.inputparent{height: 80upx;border: 1px solid #CCCCCC;display: flex;justify-content: center;align-items: center;width: 60%;margin-left: 20%;margin-top: 20upx;border-radius: 20upx;
box-shadow: 0 0 0.4rem rgba(136, 130, 129, 0.3);}
.priceinput{text-align: center;}
.buttons{display: flex;justify-content: space-between;height: 80upx;margin-top: 80upx;border: 1px solid #CCCCCC;border-radius:0 0 20upx 20upx;}
.business-center{width: 80%;background: white;border-radius: 20upx;box-shadow: 0 0 0.4rem rgba(136, 130, 129, 0.3);}
.businessactive{animation: .15s businessamin linear;}
@keyframes businessamin{
	from{
		transform: scale(0);
	}
	to{
		transform: scale(1);
	}
}
.content{height: calc(100vh - 44px);overflow: hidden;}
.disk{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 999;}
.Payment{position: absolute;left: 0;bottom: -300px;background: white;width: 100%;z-index: 1000;}
.Payaminate{animation: .2s Paymentamin linear;animation-fill-mode:forwards;}
.Num-selected{width: 10upx;height: 10upx;border-radius: 50%;background: black;}
.pay-text{font-size: 0.9rem;}
.psd-mid-text{font-size: 1.5rem;font-weight: bold;text-align: center;padding: 20upx;}
.psd-middle{margin-top: 40upx;}
.Num{width: 60upx;height: 40upx;border-bottom: 1px solid #CCCCCC;padding-bottom: 10upx;text-align: center;display: flex;justify-content: center;align-items: center;}
.psd-input{display: flex;padding: 0 40upx;margin-top: 40upx;justify-content: space-between;margin-bottom: 60upx;}
.pay-psd{border-bottom: 1px solid rgb(240,240,240);}
.palist-right{font-size: 0.8rem;color: #CCCCCC;margin-left: 40upx;}
.list-left{display: flex;align-items: center;flex-direction: row;}
.list-left image{width: 40upx;height: 40upx;}
.psd-mid-price{text-align: center;font-size: 0.8rem;color: #CCCCCC;}
.pat-list{margin-top: 40upx;}
.password{width: 70%;margin: 0 15%;position: absolute;top: 10%;left: 0;background: white;z-index: 9999;border-radius: 10upx;}
.pay-ok{margin-left: 45%;}
.pay-ok image{width: 40upx;height: 40upx;}
.palist-price{font-size: 0.8rem;margin-left: 20upx;}
.palist-left{display: flex;flex-direction: row;}
.palist-left image{width: 40upx;height: 40upx;margin-left: 20upx;}
.paymentbtn{margin: 0 5%;background:linear-gradient(left,rgb(247,205,22),rgb(247,164,44));margin-bottom: 40upx;width: 90%;border: 0;height: 80upx;line-height: 80upx;text-align: center;border-radius: 10upx;}
.list-right{display: flex;align-items: center;}
.paylist{display: flex;flex-direction: row;padding: 30upx 0;box-sizing: border-box;border-bottom: 1px solid rgb(250,250,250);}
.paylist:active{background: rgb(250,250,250);}
.list-right image{width: 40upx;height: 40upx;}
.list-left view{margin-left: 20upx;font-size: 0.8rem;}
.wallet-list{display: flex;justify-content: space-between;margin: 20upx 0;margin-bottom: 100upx;padding: 20upx 0;}
.wallet-list:active{background:rgb(250,250,250);}
@keyframes Paymentamin{from{bottom: -300px;}to{bottom:0;}}
.wallet{margin-top: 20upx;}
.pay-title{width: 100%;height: 70upx;line-height: 70upx;text-align: center;font-size: 0.8rem;}
.keyboard-container {position: absolute;top:0;height: 100%;width: 100%;}
.pay-title image{position: absolute;top: 15upx;left: 15upx;width: 40upx;height: 40upx;}
.pay-next{display: flex;align-items: center;}
.wallet-pay{margin: 20upx 0;margin-left: 40upx;}
.pay-next image{width: 40upx;height: 40upx;}
.pay-titles image{right: 0;left: 15upx;}
.pay-middle{width: 100%;text-align: center;padding: 20upx 0;font-size: 1rem;margin-top: 40upx;border-bottom: 1px solid #ECECEC;}
.pay-active:active{background: #ECECEC;}
.pay-xz{width: 90%;height: 100upx;display: flex;align-items: center;justify-content: space-between;margin: 0 5%;}
.pay-xzs{display: flex;align-items: center;}
.pay-xz image{width: 40upx;height: 40upx;margin-right: 20upx;}
.prices{padding-left: 20upx;font-size: 0.8rem;margin: 20upx;}
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;}
.wallet-parent{overflow-x: scroll;margin-top: 80upx;}
.wallet{width: 150%;display: flex;flex-direction: row;}
.wallet-li{height: 400upx;box-shadow: 0 0 0.6rem rgba(136, 130, 129, 0.3);box-sizing: border-box;
margin: 0 20upx;border-radius: 20upx;padding-top: 20upx;}
.wallet-top{margin:40upx 20upx;font-size: 0.8rem;}
.li-parent{width: 70%;height:420upx;}
.actived{background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));color: white;}
.Recharge:active{background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));color: white;}
.boms{height: calc(100vh - 88upx - 120upx - 420upx);}
.wallet-middle{display: flex;justify-content: space-between;}
.mid-left{font-size: 1.2rem;font-weight: bold;margin-left: 20upx;}
.mid-right{font-size: 0.7rem;color: #CCCCCC;display: flex;align-items: flex-end;margin-right: 10upx;}
.Recharge{margin: 60upx 20%;margin-bottom: 0;border-radius: 40upx;border: 0;background:rgb(247,200,24);width: 60%;height: 80upx;line-height: 80upx;text-align: center;}
uni-button:after{border: 0;}
.walletlis{
	margin-left: 0;
}
::-webkit-scrollbar {
width: 0px;
}

::-webkit-scrollbar-track {
background-color: none;
}

::-webkit-scrollbar-thumb {
background-color: none;
}
.inputs{
	border-bottom: 1px solid #ccc;
	margin-top: 20upx;
	margin-left: 40upx;
	margin-right: 40upx;
	/* padding-bottom: 10upx; */
}
.phone{
	
	color: #C8C7CC;
	
}
::-webkit-scrollbar-thumb:hover {
background-color: none;
}

::-webkit-scrollbar-thumb:active {
background-color: none;
}

/* 密码 */
.keyboard{
position: fixed;
bottom: 0;height: 240px;width: 100%;border-top: 1px solid #ddd;background: #fff;display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;flex-direction: row;z-index: 9999;}
.down{display: flex;justify-content: center;align-items: center;}
.down image{width: 60upx;height: 60upx;}
.number{display: flex;flex-wrap: wrap;width: 75%;list-style: none;margin: 0;border-right: 1px solid #ddd;}
.button{margin: 0;padding: 0;width: 33%;height: 60px;text-align: center;line-height: 60px;border-right: 0.5px solid #ddd;border-bottom: 0.5px solid #ddd;}
.button:active{background: rgb(240,240,240);}
.button:nth-child(3),.button:nth-child(6),.button:nth-child(9),.button:nth-child(12){ border-right: none;}
.button:nth-child(11){border-bottom: none;font-size: 16px;font-weight: bold;}
.button:nth-child(10),.button:nth-child(12){border-bottom: none;}
.action{ width: 25%;display: -webkit-box;display: -webkit-flex;display: flex;flex-direction: column;align-items: center;justify-content: center;}
.delete{height: 50%;width: 100%;border-bottom: 1px solid #ddd;background: #ddd;}
.ok{flex: 1; width: 100%;}
</style>
