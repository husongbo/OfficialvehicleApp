<template>
	<!-- <view class="cover-container" :style="[{transform: coverTransform,transition: coverTransition}]" @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend" > -->
	<!-- <mescroll-uni :down="downOption" @down="downCallback"> -->
	<view class="" style="position: relative;" :style="{top:reltops}">
		<!-- #ifndef MP -->
		<mix-advert 
			ref="mixAdvert" 
			:timedown="15" 
			imageUrl="/static/U.jpg"
			:url="advertNavUrl"
			@loads="loadMapData"
		></mix-advert>
		<!-- #endif -->
		<view class="content" >
			<view class="index-mid">
				<view class="" v-if="visabMap">
					<view class="index-top" @touchstart="touchstart" @touchmove="touchmove">
						<view class="indextopone">
							<view>
							<view class="idnexone-view">92(V)</view>
							<view class="indexone-span">8.00 -</view>
							</view>
						</view>
						<view class="indextopone">
							<view>
							<view class="idnexone-view">92(V)</view>
							<view class="indexone-span" style="background:red;color: white;">8.00 <image src="../../../static/tabbar/top.png" mode=""></image></view>
							</view>
						</view>
						<view class="indextopone">
							<view>
							<view class="idnexone-view">92(V)</view>
							<view class="indexone-span" style="background: rgb(62,247,118);color: white;">8.00 <image src="../../../static/tabbar/bom.png" mode=""></image></view>
							</view>
						</view>
					</view>
					<!-- <cover-view class="" style="width: 100%; height:700upx;margin-top: 40upx;" src="/pages/tabbar/index/maps.vue"></cover-view> -->
					<!-- 地图 -->
					<view class="mapparent" style="position: relative;">
						<map :class={nones:!mapIsHidden}  style="width: 100%; height:500upx;margin-top: 40upx;" :scale="10" @controltap="OpenMap"  :latitude="latitude" :longitude="longitude"  :markers="covers" :controls="controlss">
						</map>
						<view class="" :class={nones:mapIsHidden} style="width: 100%; height:500upx;margin-top: 40upx;"></view>
					</view>	
				</view>
					<view class="" style="height: 100upx;" @touchstart="touchstart" @touchmove="touchmove"></view>
				<view class="index-middles"  >
					<view class="" @touchstart="touchstart" @touchmove="touchmove">
						<view class="indexmid-top">
							<view class="indexmid-top-left">
								<view class="indexmid-topleft-left" :class="{actived:actflag}" @click="changeactive(1)">公务</view>
								<view class="indexmid-topleft-left" :class="{actived:!actflag}"  @click="changeactive(2)">自费</view>
							</view>
							<view class="indexmid-top-right" @click="ReCord">
								历史记录
							</view>
						</view>
						<view class="" v-if="actflag">
							<view class="indexmid-tops">
								使用规则
							</view>
							<view class="indexmid-toptwo">
								<view class="indexmid-toptwo-left" :class="{actived:systemflag}" @click="systemactive(1)">员工制度</view>
								<view class="indexmid-toptwo-left" :class="{actived:!systemflag}" @click="systemactive(2)" style="margin-left: 40upx;">车辆制度</view>
							</view>
							<view class="indexmid-mid">
								<view class="indexmid-mid-left">当前额度</view>
								<view class="indexmid-mid-right" @click="Appquota">申请额度</view>
							</view>
							<!-- 当前额度 -->
							<view class="indexmid-mids" v-if="LoginFlag">
								{{price}}
							</view>
							<view class="" v-if="!LoginFlag" style="text-align: center;padding: 20upx 0;color: black;">
								没有余额信息
							</view>
						</view>
					</view>
					<view class="indexmid-tops" style="margin-top: 0;">
						选择车辆
					</view>
					<view class="indexmid-parent" v-if="LoginFlag">		
						<!-- <view class="indexmids"> -->
							<view class="indexmids-child" v-for="(item,index) in vehiclelist" :key="index" :class="{actived:item.active}" @click="changevehicle(item.id)" style="display: inline-block;text-align: center;line-height: 100upx;">
								{{item.text}}
							</view>
						<!-- </view> -->
					</view>
					<view class="" style="text-align: center;padding: 20upx 0;color: black;" v-if="!LoginFlag||!CarFlag">没有车辆信息</view>
					<view class="" @touchstart="touchstart" @touchmove="touchmove">
						<view class="indexmid-tops" style="margin-top: 0;">
							加油金额
						</view>
						<view class="indexbom">
							<view class="indexbom-left">￥</view>
							<input type="number" v-model="UserCouponInfo.conponprice" value="" style="font-size: 1.2rem;" class="price-number" placeholder-style="font-size:1.2rem;" placeholder="请输入金额"/>
						</view>
						<view class="indexbtn" @click="openpay">立即支付</view>
					</view>
				</view>
				<!-- <button type="default" @click="show('left')">显示Drawer</button> -->
				<!-- 抽屉 -->
				<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer('left')" @backs="back">
					<view class="drawer-title" @click="Whether">
						<image :src="UserInfoleft.Img" mode=""></image>
						<view class="drawer-title-right">
							<view class="drawer-title-span">{{UserInfoleft.Names}}</view>
							<view class="drawer-title-text">{{UserInfoleft.Phone}}</view>
						</view>
					</view>
					<view class="drawer-list">
						<view class="userlists" v-for="(item,index) in UserSetList" :key="index" @click="GoToUrl(item.id)">
							<view v-if="item.id!=2" style="display: flex;flex-direction: row;">
								<image :src="item.img" mode=""></image>
								<view class="userlists-text">{{item.text}}</view>
							</view>
							<view v-if="item.id==2" style="justify-content: space-between;display: flex;width: 100%;">
								<view class="listss">
									<image src="../../../static/tabbar/icon_qy.png" mode=""></image>
									<view class="userlists-text">企业中心</view>
								</view>
								<view class="list-right">
									未开通
								</view>
							</view>
						</view>	
					</view>
				</uni-drawer>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
		
		<!-- 充值 -->
		<view class="disk" v-if="diskif" @click="closepay" @touchmove.stop.prevent="moveHandle"></view>
		<view class="Payment" v-if="diskif" :class="{'Payaminate':Payamin}" >
			<view v-if="payone">
				<view class="pay-title">
					加油充值
					<image src="../../../static/Wallet/close.png" @click="closepay"></image>
				</view>
				<!-- <view class="cashre-price">
					<view class="prices">充值金额</view>
					<view class="inputs">
						<input type="number" class="phone" value="" placeholder="请输入充值金额"/>
					</view>
				</view> -->
				<view class="wallet-pay">
					<view class="wallet-list" @click="Payment" style="justify-content: center;font-size: .8rem;">
						<!-- 绵阳我要加油电子商务有限公司 -->
					</view>
				</view>
				<view class="price_item">
					<view class="" style="text-align: center;font-size: .7rem;">当前加油金额</view>
					<view class="" style="text-align: center;font-size: .8rem;margin-top: 20upx;margin-bottom: 60upx;font-weight: bold;">{{UserCouponInfo.conponprice}}元</view>
				</view>
				<view  class="paymentbtn" @tap="Inputpssword(paymentobj.text)">立即支付</view>
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
				<view class="psd-mid-text">{{UserCouponInfo.conponprice}}</view>
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
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" confirmButtonText="确定"  @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
	</view>
	<!-- </mescroll-uni> -->
	<!-- </view> -->
</template>

<script>
	import amapFile from '../../../static/js/amap-wx.js'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import simpleDialog from '@/components/dialog.vue'
    import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
    import cityData from '@/common/city.data.js';
	import {mapState,mapMutations} from 'vuex'
	import Utils from '../../../util/util.js'
	import md5 from '@/common/md5.js'
	// import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import mixAdvert from '@/components/mix-advert/vue/mix-advert';
	const keys = () => {
		let natural = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		return natural.sort(function(){
			return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		});
	};
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		
		components: {
			uniDrawer,
			mpvuePicker,
            mpvueCityPicker,
			simpleDialog,
			mixAdvert
		},
		data() {
			return {
				mapkeys:'78e2cf5d6b8404995216797147d317c1',//地图key值
				latitude:'',
				longitude:'',
				covers: [{
					latitude:'',
					longitude:'',
					
				}],
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				controlss:[{
					id:1,
					position:{
						left:600,
						top:250,
						width:30,
						height:30
					},
					iconPath:'../../../static/tabbar/nav.png',
					clickable:true
				}],
				sDialog: {
					message:'',
					title:''
				},
				showRigth: false,
				showLeft: false,
				mapIsHidden:false,//地图显示和隐藏
				UserSetList:[//设置列表
					{id:1,img:'../../../static/tabbar/icon_qb.png',text:'我的钱包',url:'../../wallet/MyWallet/MyWallet'},
					{id:2,img:'../../../static/tabbar/icon_qy.png',text:'企业中心',url:'',childtext:'未开通'},
					{id:3,img:'../../../static/tabbar/icon_fp.png',text:'开发票',url:'../../invoice/SelectiveInvoicing/SelectiveInvoicing'},
					{id:4,img:'../../../static/tabbar/icon_kf.png',text:'客服中心',url:'../../setup/Customer/CustomerCenter/CustomerCenter'},
					{id:5,img:'../../../static/tabbar/icon_sq.png',text:'申请与审批',url:'../../Examination/ExaminationApproval/ExaminationApproval'},
					{id:6,img:'../../../static/tabbar/icon_sz.png',text:'设置',url:'../../setup/UserSet/UserSet'},
				],
				vehiclelist:[
					
				],
				obj:{
					id:'',
					text:'',
					active:''
				},
				UserInfoleft:{
					Img:'../../../static/Set/boy.png',
					Phone:'*************',
					Names:'游客'
				},
				PasswordList:[
					{id:1,flag:false},
					{id:2,flag:false},
					{id:3,flag:false},
					{id:4,flag:false},
					{id:5,flag:false},
					{id:6,flag:false}
				],
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				startY:0,
				moveEndY:0,
				valueY:0,
				pickerSingleArray: [{
                        label: '绵阳市',
                        value: 1,
						code:510700
                    },
                    {
                        label: '成都市',
                        value: 2,
						code:510100
                    }
                ],
                mulLinkageTwoPicker: cityData,
                cityPickerValueDefault: [0, 0, 1],
                themeColor: '#007AFF',
                pickerText: '',
                mode: '',
                deepLength: 1,
                pickerValueDefault: [0],
                pickerValueArray:[],
				addressName:'',
				mapindexflag:false,
				actflag:true,//公务/自费
				systemflag:true,//员工/车辆制度
				pattern: 'hidden',
				keyss: keys(),
				diskif:false,//模板层,
				Payamin:false,//支付动画
				payone:true,//第一步
				paytwo:false,
				password:false,
				CountBuyMoney:'0.00',
				payreplacetext:'微信',//获取支付方式
				Paymentlist:[
					{id:1,img:'../../../static/Wallet/price.png',text:'余额',price:100,flag:true},
					{id:2,img:'../../../static/Wallet/weixin.png',text:'微信支付',flag:false},
					{id:3,img:'../../../static/Wallet/zhifubao.png',text:'支付宝',flag:false},
					{id:4,img:'../../../static/Wallet/yizhifu.png',text:'翼支付',flag:false},
					{id:5,img:'../../../static/Wallet/wo.png',text:'沃支付',flag:false},
					{id:6,img:'../../../static/Wallet/bank.png',text:'中国建设银行',flag:false},
				],
				paymentobj:{
					text:'余额',
					img:'../../../static/Wallet/price.png'
				},
				PsdArr:[],//密码存
				myAmapFun:'',
				locationCity:'',//当前城市
				loadingtext:'',
				visabMap:true,
				nearbylocation:{
					latitude:'',
					longitude:''
				},
				thousand:1000,
				thousands:500,
				distance:'',//距离
				flagdistance:true,
				setttimes:'',
				Locationflag:false,
				swidth:'',
				MYmaplist:[],
				CDmaplist:[],
				maplist:[],
				citycodes:'',
				mapcityflag:true,
				price:0,
				mapindex:0,
				UserCouponInfo:{
					userid:'',
					conponprice:'',
					type:1,
					carnumber:''
				},
				User:{
					phone:'',
					password:'',
					pwd_type:2
				},
				reltops:'',
				flagreltops:false,
				tokken:'',
				OrderInfo:{
					user_id:'',
					pay_type:'',
					pay_amount:'',
					car_no:'',
					time_span:'',
				},
				ordernumber:'',
				coverTransform: 'translateY(0)',
				coverTransition: '0s',
				moving: false,
				scollheight:'0px',
				scollFlag:false,
				scollTopflag:false,
				windowheights:0,
				scolls:0,
				scrollbottom:0,
				CarFlag:true,
				Mapxixi:false,
			}
		},
		computed:{
			// mapState(['LoginFlag','UserLogin','MYGasstation','CDGasstation']),
			...mapState({
					MYGasstation:state => state.MYGasstation,
					CDGasstation:state => state.CDGasstation
				}),
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
			advertNavUrl(){
				return ``;
			},
		},
		mounted() {
			
			// this.$refs.mixAdvert.initAdvert();
			
		},
		onShow(){
			var _this=this
			// console.log(this.Mapxixi)
			if(!this.Mapxixi){
				var _this=this
				_this.showLeft=false
				this.mapIsHidden=false
				this.loadingtext=''
				this.$refs.loading.open()
				this.MYmaplist=this.MYGasstation
				this.CDmaplist=this.CDGasstation
				 uni.onNetworkStatusChange(function (res) {
					 console.log(res)
					 if(!res.isConnected){
						// uni.showToast({
						// 	title: '当前没有网络',
						// 	duration: 2000,
						// 	icon:"none",
						// });
					 }
					 else{
						 console.log("欧我那个")
						 _this.timelocation()
					 }
				});
				 _this.timelocation()
				setTimeout(()=>{			
					_this.mapIsHidden=true
					_this.$refs.loading.close()
					console.log(JSON.stringify(_this.UserLogin))
					this.FlagLogin()
				},2000)
			}		
		},
		onLoad(){
			var _this=this
			uni.getSystemInfo({
				success: function (res) {
					_this.windowheights=res.windowHeight
					console.log(_this.windowheights)
				}
			});				
		},
			
		onNavigationBarButtonTap(e){
			var _this=this
			console.log(e)
			if(e.index==0){
				if(!this.showLeft){
					this.show('left')
					return;
				}
				this.closeDrawer('left')
			}
			if(e.index==1){
				uni.getNetworkType({
					success: function (res) {
						console.log(res)
						// console.log(res.networkType)
						if(res.networkType=='none'){
							uni.showToast({
								title: '当前没有网络',
								duration: 1000,
								icon:"none",
							});
						}
						else{
							_this.showSinglePicker()
							return
						}			
					}
				});
			}
			if(e.index==2){
				uni.navigateTo({
				    url: '../../setup/Customer/CustomerCenter/CustomerCenter',
					animationType: 'pop-in',
					animationDuration: 200
				})
				return
			}
			if(e.index==3){
				uni.navigateTo({
				    url: '../../Examination/ExaminationApproval/ExaminationApproval',
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		},
		watch:{
			LoginFlag(news,olds){
				this.LoginFlag=news
				if(this.LoginFlag){
					this.GetUserInfo()
				}
				this.FlagLogin()
			},
			UserLogin(news,olds){
				this.UserLogin=news
				this.UserInfoleft.Phone=this.UserLogin.UserInfo.phone
				this.UserInfoleft.Names=this.UserLogin.UserInfo.real_name
			}
		},
		methods: {
			...mapMutations(['GetUserInfo','changPrice','FalgLogin']),
			coverTouchstart(e){
				if(!this.scollFlag){
					e.preventDefault();
						this.startX = e.touches[0].pageX
						// console.log(this.startX)
					return;
				}
				this.startX = e.touches[0].pageX
				// this.scollheight="5px"
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
				// console.log(startY)
			},
			loadMapData(){
				console.log("ok")
			},
			ceshis(){
				uni.navigateTo({
				    url: `/pages/login/UserLoginPhone/UserLoginPhone`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			coverTouchmove(e){
				if(!this.scollFlag){
					e.preventDefault();
					this.moveEndX = e.touches[0].pageX
					this.valueX= this.moveEndX - this.startX
					if ( this.valueX >= 80 ) {
							this.show('left')
						return;　	
			　　　　}
			　　　　else if ( this.valueX < 0 ) {
			　　　　　　return
			　　　　}
			　　　　else{
			　　　　　　return
			　　　　}
					return
				}
				e.preventDefault();
						this.moveEndX = e.touches[0].pageX
						this.valueX= this.moveEndX - this.startX
						if ( this.valueX >= 150 ) {
								this.show('left')
							return;　	
				　　　　}
				moveY = e.touches[0].clientY;
				// console.log("移动"+moveY)
				let moveDistance = moveY - startY;
				// console.log(moveDistance)
				if(!this.scollFlag){
					return;
				}
				this.moving = true;
				// if(moveDistance > 0 && moveDistance <= 80){
				// 	this.coverTransform = `translateX(${moveDistance}px)`;
				// }
				// 	
				if(moveDistance < 0 && moveDistance >= -80){
					this.coverTransform = `translateY(${moveDistance}px)`;		
				}
			},
			coverTouchend(){
				if(this.moving === false||!this.scollFlag){
					return;
				}
				// this.scollheight="0px"
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateX(0px)';
				this.scollFlag=true
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				// this.getListDataFromNet(0, 1, (data) => {
					//联网成功的回调,隐藏下拉刷新的状态
					this.onRefresh()
					setTimeout(()=>{
						mescroll.endSuccess();	
					},1000)	
			},
			GetNumbers(val){
				var _this=this
				this.PsdArr.push(val)
				if(this.PsdArr.length==6){
					this.User.password=this.PsdArr.join('')
					this.User.phone=this.UserLogin.UserInfo.phone.trim()
					console.log(this.User)
					 // this.$api.CheckPassWordIn(this.User).then((res)=>{
						 this.$refs.loading.open()
						 setTimeout(()=>{
							//获取数据
							var json={
								user_id:'',
								pay_type:'',
								pay_amount:'',
								car_no:'',
							}
							json.user_id=_this.UserCouponInfo.userid
							json.pay_amount=_this.UserCouponInfo.conponprice.toString()
							json.pay_type=_this.UserCouponInfo.type
							json.car_no=_this.UserCouponInfo.carnumber
							var a=(new Date()).toLocaleDateString()//获取当前日期
								a =a.replace(/\//g,'-');//替换2017/05/03 为    2017-05-03
							var nowdate= Math.round(new Date() / 1000);//把当前日期变成时间戳
							var aesjson={
								pay_type:json.pay_type,
								pay_amount:json.pay_amount,
								car_no:json.car_no,
								date:nowdate,
								token:_this.UserLogin.UserInfo.user_token,
								order_no:_this.ordernumber
							}
							console.log(aesjson)
							_this.tokken=_this.UserLogin.UserInfo.user_token
							var password=md5(_this.User.password)
							// var mdtxt=md5('dvyYRQlnPRCMdQSe')
							var aesjsons=Utils.encrypt(JSON.stringify(aesjson),password)
							var jsons={
								user_id:json.user_id,
								post_params:aesjsons
							}
							// var datass=`user_id:"${json.user_id}",post_params:"${aesjson}"}`
							// console.log(datass)
							// console.log(json)
							this.$api.ChekcToken(this.$store.state.UserLogin.SessionFlag).then((res)=>{
								if(res.data.result!=0){
									uni.showToast({
										title: '你的账户已在别处登录，如不是本人请尽快修改密码',
										duration: 2000,
										icon:"none",
									});
									this.$store.commit('RemoveLoginOut')									
									setTimeout(()=>{
										_this.PsdArr=[]
										_this.PasswordList.forEach((items)=>{
											items.flag=false
										})
										_this.closepays()
										_this.UserCouponInfo.conponprice=''
										_this.password=false
										_this.diskif=false
										_this.$refs.loading.close()
										uni.navigateTo({
										    url: `/pages/login/UserLoginPhone/UserLoginPhone`,
											animationType: 'pop-in',
											animationDuration: 200
										})
									},2000)
									return
								}
								this.$api.ApplyCouponInfo(jsons).then((res)=>{
									console.log(res)
									if(res.data.result==1){
										if(res.data.message=='支付密码错误超过三次，锁定交易3小时，建议修改支付密码'){
											uni.showToast({
												title: res.data.message,
												duration: 1000,
												icon:"none"	
											});
											setTimeout(function() {
												_this.PsdArr=[]
												_this.PasswordList.forEach((items)=>{
													items.flag=false
												})
												_this.closepays()
												_this.UserCouponInfo.conponprice=''
												_this.password=false
												_this.diskif=false
												_this.$refs.loading.close()
											}, 1000);
											return
										}
										uni.showToast({
											title: '密码错误，请重新输入',
											duration: 1000,
											icon:"none"	
										});
										setTimeout(function() {
											_this.PsdArr=[]
											// _this.UserCouponInfo.conponprice=''
											_this.PasswordList.forEach((items)=>{
												items.flag=false
											})
											_this.$refs.loading.close()
										}, 1000);
										return
									}
									if(res.data.result==0){
										console.log(json)
										 this.password=false
										  setTimeout(()=>{
										 	 _this.diskif=false
										 	 _this.closepays()
										 	 _this.PsdArr=[]
											 _this.UserCouponInfo.conponprice=''
										 	 this.PasswordList.forEach((item,index)=>{
										 	 	item.flag=false
										 	 })
											 _this.price=_this.price-_this.UserCouponInfo.conponprice
											 if(_this.UserCouponInfo.type==1){
												 _this.changPrice(_this.price)
											 }									 
										 	  this.$refs.loading.close()
										 	  uni.showToast({
										 	  	title: '充值成功',
										 	  	duration: 1000,
										 	  	icon:"none",
										 	  });
										 	  setTimeout(()=>{
										 		  uni.navigateTo({
										 		      url: `/pages/tabbar/function/Code/Code?code=${res.data.coupon_no}`,
										 		  	animationType: 'pop-in',
										 		  	animationDuration: 200
										 		  })
										 	  },1000)
										  },1000)
										 return;
									}
								})
							})	
						 },1000)
					 // })
					 
				}
				this.PsdArr.forEach((item,index)=>{
					_this.PasswordList[index].flag=true
				})
				console.log(this.PsdArr)
			},
			onRefresh() {
					var _this=this
					this.mapIsHidden=false
					this.loadingtext=''
					this.$refs.loading.open()
					this.MYmaplist=this.MYGasstation
					this.CDmaplist=this.CDGasstation
					// setTimeout(()=>{
						_this.timelocation()
					// },500)
					setTimeout(()=>{
						_this.mapIsHidden=true
						_this.$refs.loading.close()
						console.log(JSON.stringify(_this.UserLogin))
						this.FlagLogin()
						uni.stopPullDownRefresh();
					},2000)
			},
			FlagLogin(){
				var _this=this
				this.vehiclelist=[]
				if(this.LoginFlag){
					console.log("已登录");
					this.UserInfoleft.Phone=this.UserLogin.UserInfo.phone
					this.UserInfoleft.Names=this.UserLogin.UserInfo.real_name
					if(this.UserLogin.UserInfo.company_balance==null){
						
					}
					else{
						this.price=this.UserLogin.UserInfo.company_balance
					}
					
					if(this.UserLogin.UserInfo.car_no_list==null){
						return
					}
					console.log(this.UserLogin.UserInfo.car_no_list.split("|"))
						var caelist=this.UserLogin.UserInfo.car_no_list.split("|")
						if(caelist[0]==''||caelist[0]==null){
							_this.vehiclelist=''
							_this.CarFlag=false
						}
						else{
							caelist.forEach((item,index)=>{
								_this.CarFlag=true
								console.log(item)
								var obj={id:'',text:'',active:''}
								obj.id=index+1
								obj.text=item
								if(index==0){
									obj.active=true
								}
								else{
									obj.active=false
								}
								_this.vehiclelist.push(obj)
							})
							this.UserCouponInfo.carnumber=_this.vehiclelist[0].text
							console.log(_this.vehiclelist)
						}
				}
				else{
					console.log("未登录")
					this.UserInfoleft.Phone='***********'
					this.UserInfoleft.Names='游客'
					this.price=0
				}
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				// this.mapIsHidden=true
				// this.controlss[0].position.left=this.swidth
				if(this.LoginFlag&&!this.flagdistance){
					this.Urladress('../map/map')
					return;
				}
				if((!this.LoginFlag&&!this.flagdistance)||(!this.LoginFlag&&this.flagdistance)){
					this.Urladress('../../login/login/login')
					return;
				}
			},
			cancelButton: function() {
				// this.mapIsHidden=true
				// this.controlss[0].position.left=this.swidth
				console.log('Dialog 取消按钮点击');
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
			mapfalgs(){
				this.mapIsHidden=false
				this.controlss[0].position.left=600
			},
			//加油记录
			ReCord(){
				var _this=this
				if(!this.LoginFlag){
					// this.mapfalgs()
					var _this=this
					uni.showToast({
						title: '请先登录你的账户',
						duration: 1000,
						icon:"none",
					});
					return;
				}
				uni.navigateTo({
				    url: '../function/History/History',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			getmaplocation(){//地图
				var _this=this
				var myAmapFun = new amapFile.AMapWX({key:'78e2cf5d6b8404995216797147d317c1'});
					myAmapFun.getRegeo({
						success:(data) => {
							console.log("成功")
							_this.Mapxixi=true
							this.addressName = data[0].regeocodeData.addressComponent.city;  
							console.log(this.addressName);
							let pages = getCurrentPages();  
							let page = pages[pages.length - 1];  
							let currentWebview = page.$getAppWebview();  
							let titleObj = currentWebview.getStyle().titleNView;
							var webview = this.$mp.page.$getAppWebview();
							titleObj.buttons[1].text = this.addressName;
							this.latitude=data[0].latitude
							this.longitude=data[0].longitude
							this.covers[0].latitude=this.latitude
							this.covers[0].longitude=this.longitude
							this.covers[0].iconPath='../../../static/tabbar/loca.png'
							this.Locationflag=true
							this.mapasye(titleObj.buttons[1].text)
							webview.setTitleNViewButtonStyle(1, {  
								text:titleObj.buttons[1].text,  
							});
							// console.log(titleObj.buttons[0].text)
							uni.getSystemInfo({
								success: (datas) => {
									_this.controlss[0].position.left=datas.screenWidth-50
									_this.swidth=datas.screenWidth-50
									console.log(datas.screenWidth)
								}
							})
							// if(this.Locationflag&&this.mapindex==3){
							// 	clearInterval(_this.setttimes)
							// }
						},
						fail:function(err){
							uni.showToast({
								title: '当前没有网络',
								duration: 2000,
								icon:"none",
							});
							// console.log("失败")
							console.log(err)	
							_this.checkPermissionPos()
						}
				});
			},
			mapasye(btntext){
				var _this=this
				_this.maplist=[]
				// if(btntext=='绵阳市'){
				// 	this.mapcityflag=false
				// 	this.MYmaplist.forEach((item)=>{
				// 		var ggLocation=_this.bd_decrypt(item.lat,item.lon)
				// 		_this.SaveLocation(ggLocation.lat,ggLocation.lng,item)
				// 	})
				// }
				// else{
				// 	this.mapcityflag=true
				// 	this.CDmaplist.forEach((item)=>{
				// 		var ggLocation=_this.bd_decrypt(item.lat,item.lon)
				// 		
				// 		_this.SaveLocation(ggLocation.lat,ggLocation.lng,item)
				// 	})
				// }
				// this.maplist.sort(_this.sortDistances)
				// console.log(JSON.stringify(_this.maplist))
				// // this.getSystemInfo()
				// this.Getgasstation()
			},
			timelocation(){
				var _this=this
				// _this.setttimes=setInterval(()=>{
					_this.mapindex++
					_this.getmaplocation()
				// },1000)						
			},
			//判断
			Getgasstation(){
				console.log(this.maplist[0].mid)
				var _this=this
				if(parseInt(this.maplist[0].mid)>parseInt(this.thousands)){
					_this.flagdistance=false
					console.log("no")
					return;
				}
				_this.flagdistance=true
				console.log("ok")
			},
			//地址转换
			bd_decrypt(bd_lng, bd_lat) {
				var X_PI = Math.PI * 3000.0 / 180.0;
				var x = bd_lng - 0.0065;
				var y = bd_lat - 0.006;
				var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
				var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
				var gg_lng = z * Math.cos(theta);
				var gg_lat = z * Math.sin(theta);
				return {lng: gg_lng, lat: gg_lat}
			},
			//保存地址
			SaveLocation(lat,lon,item){
				var distance=this.getDisance(this.latitude,this.longitude,lat,lon)
				
				var transfor=this.Transformation(distance)
				var jsontext={
					latitude:lat,
					longitude:lon,
					id:item.index,
					address:item.address,
					name:item.name,
					distances:transfor.middles,
					mid:transfor.mid
				}
				this.maplist.push(jsontext)
			},
			//排序
			sortDistances(a,b){
				a=parseFloat(a.mid)
				b=parseFloat(b.mid)
				return a-b
			},
			toRad(d){
				return d * Math.PI / 180;
			},
			getDisance(lat1, lng1, lat2, lng2){
				var dis = 0;
				var radLat1 = this.toRad(lat1);
				var radLat2 = this.toRad(lat2);
				var deltaLat = radLat1 - radLat2;
				var deltaLng = this.toRad(lng1) - this.toRad(lng2);
				var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
				return dis * 6378137;
			},
			Transformation(item){
				// console.log(item)
				var val=parseInt(item)
				if(val<this.thousand){
					return {middles:val+"m",mid:val}
				}
				var thounds=parseInt(val/this.thousand)
				var mintes=parseInt(val%this.thousand).toString()
				mintes=mintes.substring(0,2)
				return {middles:thounds+"."+mintes+"km",mid:val}
			},
			//打开地图
			OpenMap(){
				uni.navigateTo({
				    url: '../map/map',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			showSinglePicker() {
                this.pickerValueArray = this.pickerSingleArray
                this.mode = 'selector'
                this.deepLength = 1
                this.pickerValueDefault = [0]
                this.$refs.mpvuePicker.show()
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
			onConfirm(e) {
				var _this=this
                this.pickerText = e
				console.log(this.pickerText.label)
				var webview = this.$mp.page.$getAppWebview();
				webview.setTitleNViewButtonStyle(1, {  
					text:this.pickerText.label,  
				});
				
				if(this.addressName==this.pickerText.label){
					console.log(this.pickerText.label)
					_this.latitude=_this.covers[0].latitude
					_this.longitude=_this.covers[0].longitude
					this.mapcityflag=false
				}
				else{
					if(_this.pickerText.label=='成都市'){
						this.mapIsHidden=false
						this.$refs.loading.open()
						_this.latitude='30.5702000000'
						_this.longitude='104.0647600000'
					}
					// var citycode=''
					// this.pickerSingleArray.forEach((item)=>{
					// 	if(item.label==this.pickerText.label){
					// 		citycode=item.code
					// 		return
					// 	}
					// })
					// if(_this.pickerText.label=='成都市'){
					// 	if(!_this.mapcityflag){
					// 		this.mapIsHidden=false
					// 		this.$refs.loading.open()
					// 		_this.maplist=[]
					// 		_this.CDmaplist.forEach((item)=>{
					// 			var ggLocation=_this.bd_decrypt(item.lat,item.lon)
					// 			_this.SaveLocation(ggLocation.lat,ggLocation.lng,item)
					// 		})
					// 		_this.mapcityflag=true
					// 	}
					// }
					// if(_this.pickerText.label=='绵阳市'){
					// 	if(_this.mapcityflag){
					// 		this.mapIsHidden=false
					// 		this.$refs.loading.open()
					// 		_this.maplist=[]
					// 		_this.MYmaplist.forEach((item)=>{
					// 			var ggLocation=_this.bd_decrypt(item.lat,item.lon)
					// 			_this.SaveLocation(ggLocation.lat,ggLocation.lng,item)
					// 		})
					// 		_this.mapcityflag=false
					// 	}
					// }
					// _this.maplist.sort(_this.sortDistances)
					// _this.latitude=_this.maplist[20].latitude
					// _this.longitude=_this.maplist[20].longitude
					// _this.Getgasstation()
					// console.log(JSON.stringify(_this.maplist))
				}
				setTimeout(()=>{
					_this.mapIsHidden=true
					_this.$refs.loading.close()
				},1000)
            },
			show(e) {
				if (e === 'left') {
					this.controlss[0].position.left=600
					this.mapIsHidden=false
					setTimeout(()=>{
						this.showLeft=true
					},100)
					// console.log(this.mapIsHidden)
				} else {
					this.showRigth = true
				}
			},
			hide() {
				this.showLeft = false
				this.showRigth = false
			},
			closeDrawer(e) {
				if (e === 'left') {
					this.controlss[0].position.left=this.swidth
					this.showLeft = false
					setTimeout(()=>{
						this.mapIsHidden=true
					},100)
				} else {
					this.showRigth = false
				}
			},
			Urladress(urls){
				uni.navigateTo({
				    url: urls,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			GoToUrl(e){//跳转
				var _this=this
				this.UserSetList.forEach((item)=>{
					if(e==item.id){
						if(e==1||e==3||e==5){
							if(!_this.LoginFlag){
								_this.sDialog.message='抱歉，你还没有登录，请前往登录'
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
		back(val){
			this.closeDrawer('left')
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
						this.show('left')
					return;　	
		　　　　}
		　　　　else if ( this.valueX < 0 ) {
		　　　　　　return
		　　　　}
		　　　　else{
		　　　　　　return
		　　　　}
		},
		touchend(){
			// if(this.flagreltops){
			// 	var _this=this
			// 	var ends=setInterval(()=>{
			// 		_this.valueY--
			// 		_this.reltops=-(_this.valueY)+'px'
			// 		if(_this.valueY==0){
			// 			_this.flagreltops=false
			// 			clearInterval(ends)
			// 		}
			// 	},0.1)
			// }
			
		},
		bindPickerChange: function(e) {
			console.log(e.target)
			this.city = this.array[e.target.value]
		},
		//公务/自费
		changeactive(val){
			console.log(val)
			//获取附近加油站
			// this.UserCouponInfo.type=val
			if(val==1){
				this.actflag=true
				return
			}
			this.actflag=false
			console.log(this.actflag)
		},
		//申请额度
		Appquota(){
			if(!this.LoginFlag){
				// this.mapfalgs()
				var _this=this
				uni.showToast({
					title: '请先登录你的账户',
					duration: 1000,
					icon:"none",
				});
				return;
			}
			uni.navigateTo({
			    url: '../function/Applicationquota/Applicationquota',
				animationType: 'pop-in',
				animationDuration: 200
			})
		},
		//员工车辆制度
		systemactive(val){
			var _this=this
			if(!this.LoginFlag){
				return
			}
			this.UserCouponInfo.type=val
			if(val==1){
				this.FlagLogin()
				this.systemflag=true
				return
			}
			var datas={
				car_no:this.UserCouponInfo.carnumber
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
				this.$api.GetCarBalance(datas).then((res)=>{
					if(res.data.result==0){
						_this.price=res.data.data.balance
					}
					console.log(res)
				})
				this.systemflag=false
			})
		},
		//选择车辆
		changevehicle(val){
			var _this=this
			this.vehiclelist.forEach((item)=>{
				if(item.id==val){
					_this.UserCouponInfo.carnumber=item.text
					item.active=true
					if(this.UserCouponInfo.type==2){
						var datas={
							car_no:this.UserCouponInfo.carnumber
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
							this.$api.GetCarBalance(datas).then((res)=>{
								if(res.data.result==0){
									_this.price=res.data.data.balance
								}
								console.log(res)
							})
						})
					}
					return;
				}
				item.active=false
			})
		},
		//关闭付款弹框
		closepay(){
			this.diskif=false
			this.Payamin=false
			this.password=false
			this.payone=true
			this.paytwo=false
			uni.showToast({
				title: '你已取消了金额充值',
				duration: 1000,
				icon:"none",
			});
		},
		closepays(){
			this.diskif=false
			this.Payamin=false
			this.password=false
			this.payone=true
			this.paytwo=false
		},
		openpay(event){
			var _this=this
			event.preventDefault();
			this.timelocation()
			if(!this.LoginFlag){
				_this.sDialog.message='抱歉，你还没有登录，请前往登录'
				_this.$refs.simpleDialog2.confirm({
					title: '提示！',
					message:_this.sDialog.message
				});
				return;
			}
			if(!this.flagdistance){
				_this.sDialog.message='抱歉，你没有在加油站附近，请前往导航附近加油站'
				_this.$refs.simpleDialog2.confirm({
					title: '提示！',
					message:_this.sDialog.message
				});
				return;
			}
			if(this.UserCouponInfo.conponprice==''){
				uni.showToast({
					title: '请输入你的充值金额',
					duration: 1000,
					icon:"none",
				});
				return
			}
			if(this.UserCouponInfo.conponprice<=0){
				uni.showToast({
					title: '不能输入小于或等于0的充值金额',
					duration: 1000,
					icon:"none",
				});
				return
			}
			if(parseFloat(this.UserCouponInfo.conponprice)>parseFloat(this.price)){
				uni.showToast({
					title: '加油金额已大于当前额度',
					duration: 1000,
					icon:"none",
				});
				return
			}
			this.UserCouponInfo.userid=this.UserLogin.UserInfo.user_id
			this.OrderInfo.user_id=this.UserCouponInfo.userid
			this.OrderInfo.pay_type=this.UserCouponInfo.type
			this.OrderInfo.pay_amount=this.UserCouponInfo.conponprice
			this.OrderInfo.car_no=this.UserCouponInfo.carnumber
			
			var a=(new Date()).toLocaleDateString()//获取当前日期
				a =a.replace(/\//g,'-');//替换2017/05/03 为    2017-05-03
			var nowdate= (new Date(a))/1000;//把当前日期变成时间戳
			this.OrderInfo.time_span=Math.round(new Date() / 1000) 
			var orderinfojson=Utils.encrypt(JSON.stringify(this.OrderInfo),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
			var jsondatas={
				post_params:orderinfojson
			}
			this.diskif=!this.diskif
			this.Payamin=!this.Payamin
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
				this.$api.CreateOrderInfo(jsondatas).then((res)=>{
					console.log(res)
					if(res.data.result==0){
						_this.ordernumber=res.data.order_no
					}
				})
				console.log(this.OrderInfo)
			})
		},
		//选择支付方式
		Payment(){
			if(this.UserCouponInfo.type==1){
				return;
			}
			this.payone=!this.payone
			this.paytwo=!this.paytwo
		},
		backs(){
			this.payone=!this.payone
			this.paytwo=!this.paytwo
		},
		//输入密码
		Inputpssword(text){
			console.log(text)
			if(text=='余额'){
				var _this=this
				this.payone=!this.payone
				this.loadingtext=''
				this.$refs.loading.open()
				setTimeout(()=>{
					_this.$refs.loading.close()
					_this.password=!_this.password
				},1500)
				return
			}
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
		//判断是否登录
		Whether(){
			if(this.LoginFlag){
				uni.navigateTo({
				    url: '../../setup/UserSet/UserSet',
					animationType: 'pop-in',
					animationDuration: 200
				})
				return;
			}
			uni.navigateTo({
			    url: '../../login/login/login',
				animationType: 'pop-in',
				animationDuration: 200
			})
		}
	},
	onReachBottom(e){
		console.log("哈哈")
		// this.scollFlag=true
	},
	onPageScroll(e){
		// console.log(e)
		this.scolls=e.scrollTop
		var TopWidth=this.windowheights-this.scolls
		// console.log("差"+TopWidth)
		if(TopWidth<=280){
			this.scollFlag=true
		}
		else{
			this.scollFlag=false
		}
		if(this.scolls==0){
			this.scollTopflag=true
		}
		else{
			this.scollTopflag=false
		}
		if(e.scrollTop<=50){
			// this.mapIs	Hidden=true
			this.mapindexflag=false
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#ffffff'
			})
			return;
		}
		else{
			// this.mapIsHidden=false
			this.mapindexflag=true
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#F7CE13'
			})
		}
	},
	
}
</script>

<style>
	.content{width: 100%;height: 100%;}
	.drawer-title{display: flex;flex-direction: row;margin-top: 40upx;padding-left: 20upx;}
	.drawer-title image{width: 140upx;height: 140upx;}
	.drawer-title-span{font-size: 1.5rem;margin-left: 20upx;}
	.drawer-title-text{font-size: 0.7rem;color: #C0C0C0;margin-left: 20upx;}
	.userlists{display: flex;flex-direction: row;padding-top: 20upx;padding-bottom: 20upx;padding-left: 30upx;}
	.userlists:active{background: rgb(250,250,250);}
	.userlists image{width:50upx;height: 50upx;}
	.drawer-list{margin-top: 40upx;}
	.userlists-text{margin-left: 20upx;}
	.list-right{margin-right: 20upx;color: #CCCCCC;}
	.priceholder{font-size: 0.9rem;}
	.listss{display: flex;flex-direction: row;}
	.Jmaps{width: 100%; height:700upx;margin-top: 40upx;background: rgb(229,227,223);}
	.covers{z-index: 1!important;}
	.noactive{right: 200upx;}
	.header{width: 100%;display: flex;align-items: center;justify-content: space-between;position:relative;z-index: 9999;}
	.index-middle{text-align: center;display: flex;justify-content: center;font-weight: bold;align-items: center;height: 100%;width: 30%;}
	.index-my{width:40upx;height: 40upx;margin-left: 20upx;}
	.indexmid-top-left{display: flex;flex-direction: row;height: 100upx;align-items: center;}
	.indexmid-mid-left{margin-left: 20upx;color: #CCCCCC;}
	.indexmids-child-active{width: 200upx;height: 100upx;background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));border-radius: 10upx;font-weight: bold;display: flex;justify-content: center;align-items: center;
	margin-left: 20upx;}
	.activeview{border-color: #000000!important;}
	.index-right{height: 100%;width: 30%;display: flex;align-items: center;justify-content:flex-end;}
	.index-left{height: 100%;display: flex;align-items: center;width: 30%;}
	.index-middles{border-radius:20upx 20upx 0 0;background:white;height:calc(100vh - 80upx);}
	.indexbom-left{font-size: 1.5rem;}
	.indexmids-child{width: 200upx;height: 100upx;border-radius: 10upx;font-weight: bold;display: flex;justify-content: center;align-items: center;margin-top: 10upx;margin-bottom: 10upx;
	margin-left: 30upx;box-shadow: 0 0 0.4rem rgba(136, 130, 129, 0.3);}
	/* .indexmids-child:last-child{margin-right: 20upx;} */
	.indexbom{display: flex;flex-direction: row;height: 80upx;border-bottom: 2px solid rgb(245,245,245);margin:20upx 20upx 20upx;margin-top: 0;}
	.price-number{position: relative;height:100upx;min-height:100upx;}
	.indexbtn{margin:30% 5%;width: 90%;height: 100upx;line-height: 100upx;border: 0;background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));font-size: 0.8rem;font-weight: bold;text-align: center;margin-bottom: 0;}
	uni-button:after{border: 0;}
	.nones{display: none;}
	.indexmid-mid-right{margin-right: 20upx;color:#EEC900;}
	.indexmid-topleft-left{width: 150upx;height: 70upx;border-radius: 40upx;background:white;font-weight: bold;
	margin-left: 20upx;display: flex;justify-content: center;align-items: center;}
	.actived,.indexbtn:active{background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));color: white;}
	.indexmid-parent{width: 100%;overflow-x: scroll;}
	.indexmids{display: -webkit-box;margin: 20upx 0;margin-bottom: 10upx;width: 100%;overflow-x: scroll;padding-right: 60upx;}
	.indexmid-mids{font-size: 2rem;margin-left: 20upx;font-weight: bold;}
	.indexmid-mid{display: flex;justify-content: space-between;margin-top: 40upx;}
	.indexmid-toptwo{display: flex;flex-direction: row;margin-top: 20upx;}
	.indexmid-toptwo-left{width: 180upx;height: 60upx;border-radius: 40upx;font-weight: bold;box-shadow: 0 0 0.4rem rgba(136, 130, 129, 0.3);margin-left: 20upx;display: flex;justify-content: center;align-items: center;}
	.indexmid-tops{margin-left: 20upx;color: #CCCCCC;font-size: 0.8rem;margin-top: 10upx;}
	.indexmid-top-right{margin-right: 20upx;color: #CCCCCC;}
	.index-message{width:40upx;height: 40upx;margin-right: 40upx;}
	.index-Doubt{width:40upx;height: 40upx;margin-right: 20upx;}
	.index-middle image{width: 20upx;height: 20upx;}
	.index-top{display: flex;justify-content: space-between;}
	.indextopone{width: 30%;display: flex;justify-content: center;}
	.indexmid-top{display: flex;justify-content: space-between;align-items: center;height: 100upx;}
	.indexone-span{background: rgb(233,233,233);padding: 0 10upx;font-size: 0.6rem;display: flex;align-items: center;}
	.indexone-span image{width: 20upx;height: 20upx;margin-left: 10upx;}
	.idnexone-view{font-size: 1.1rem;}
	.header-parent{height: var(--status-bar-height);width: 100%;position: relative;z-index: 9999;}
	/* .index-mid{height: calc(100vh - var(--status-bar-height) - 54upx);overflow-y: scroll;} */
	.Navigation{position: absolute;bottom: 0;right: 0;z-index: 9999;width: 140upx;height: 140upx;background: -webkit-linear-gradient(left,rgb(247,206,19),rgb(246,163,45));color: white;border-radius: 50%;
	display: flex;justify-content: center;align-items: center;}
	.navimg{width: 80upx;height: 80upx;bottom:40upx;position: absolute;right:40upx;z-index: 999;box-shadow: 0px 1px 10px rgba(50,133,253,0.8);}
	
	.disk{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 999;}
	.Payment{position: fixed;left: 0;bottom: -300px;background: white;width: 100%;z-index: 1000;}
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
	.password{width: 70%;margin: 0 15%;position: absolute;bottom:30%;left: 0;background: white;z-index: 9999;border-radius: 10upx;}
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
	.wallet-list{display: flex;justify-content: space-between;margin: 20upx 0;margin-bottom: 40upx;padding: 0upx 0;}
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
	.wallet-parent{overflow-x: scroll;}
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
	.delete{height: 50%;width: 100%;border-bottom: 1px solid #ddd;background:rgb(250,250,250);}
	.delete:active{background: #ddd;}
	.ok{flex: 1; width: 100%;}
</style>
