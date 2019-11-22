<template>
	<view class="content">
		<view class="select">申请与审批</view>
		<view class="uni-tab-bar">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id" v-if="tab.flag"
				 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
			</scroll-view>
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item v-for="(tab,index1) in newsitems" :key="index1" v-if="tab.flag">
					<scroll-view class="list" scroll-y >
						<!-- 11 -->
						<view v-if="tab.id==0" class="select-list">
							<view class="pagelist" style="display: flex;justify-content: space-between;background:rgb(245,245,245);align-items: center;">
								<view class="select-head">申请记录</view>
								<image src="../../../static/Wallet/date.png" mode="" style="width: 40upx;height: 40upx;margin-right: 40upx;" @click="openDate(0)"></image>
							</view>
							
							<view class="lists" v-for="(item,index) in newsitemss" :key="index" v-if="newsitemssflag">
								<view class="list-middle">
									<view class="mid-top">{{item.text}}</view>
									<view class="mid-bom">{{item.data_create_time}}</view>
								</view>
								<view class="price" v-if="item.data_state==1">
									<image src="../../../static/examination/ok.png" mode=""></image>
									<view class="exam-view" style="color: #ff9000;">已通过</view>
								</view>
								<view class="price" v-if="item.data_state==0">
									<image src="../../../static/examination/nook.png" mode="" style="width: 30upx;height: 30upx;"></image>
									<view class="exam-view" style="color: #1afa29;">审核中</view>
								</view>
								<view class="price" v-if="item.data_state==2">
									<image src="../../../static/examination/no.png" mode="" style="width: 30upx;height: 30upx;"></image>
									<view class="exam-view" style="color: #d81e06;">未通过</view>
								</view>
							</view>
							<view class="" v-if="!newsitemssflag" style="text-align: center;margin-top: 100upx;color: #ccc;">
								暂无申请记录信息
							</view>
						</view>
						<view v-if="tab.id==1&&PowerFlag" class="select-list">
							<view class="pagelist" style="display: flex;justify-content: space-between;background:rgb(245,245,245);align-items: center;">
								<view class="select-head">审批记录</view>
								<image src="../../../static/Wallet/date.png" mode="" style="width: 40upx;height: 40upx;margin-right: 40upx;" @click="openDate(1)"></image>
							</view>
							<view class="Approval" v-for="(item,index) in Powerlist" :key="index">
								<view class="approval-list">
									<view class="list-top">用户{{item.apply_real_name}}的用车申请{{item.apply_gold}}元</view>
									<view class="list-mid">{{item.data_create_time}}</view>
									<view class="approval-btn" v-if="item.data_state==0">
										<view class="openbtn" @click="Whetheradopt(true,item)">通过</view>
										<view class="closebtn" @click="Whetheradopt(false,item)">不通过</view>
									</view>
									<view class="approval-btn" v-if="item.data_state==1">
										<view class="openbtns" style="color: #C0C0C0;">已通过</view>
									</view>
									<view class="approval-btn" v-if="item.data_state==2">
										<view class="closebtns" style="color: #C0C0C0;">未通过</view>
									</view>
								</view>	
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 输入密码 -->
		<view class="" v-if="password" @click="closepay" style="position: fixed;top: 0;left: 0;width:100%;height:100%;background: rgba(0,0,0,0.5);"></view>
		<view class="password" v-if="password">
			<view class="pay-title pay-psd">
				请输入审批密码
				<image src="../../../static/Wallet/close.png" @click="closepay"></image>
			</view>
			<!-- <view class="psd-middle">
				<view class="psd-mid-price">充值金额</view>
				<view class="psd-mid-text">￥100</view>
			</view> -->
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
		<w-picker :mode="mode" startYear="2019" endYear="2030" step="1" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
	</view>
</template>


<script>
	const keys = () => {
		let natural = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		return natural.sort(function(){
			return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		});
	};
	import simpleDialog from '@/components/dialog.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import md5 from '../../../common/md5.js'
	import Utils from '../../../util/util.js'
	import { mapState } from 'vuex';
	export default {
		components: {
			simpleDialog,
			wPicker
		},
		computed:{
			// mapState(['LoginFlag','UserLogin']),
			mode(){
				return this.tabList[this.tabIndexs].mode
			},
			defaultVal(){
				return this.tabList[this.tabIndexs].value
			}
		},
		
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				pattern: 'hidden',
				keyss: keys(),
				password:false,
				PowerFlag:false,
				PsdArr:[],//密码存
				PasswordList:[
					{id:1,flag:false},
					{id:2,flag:false},
					{id:3,flag:false},
					{id:4,flag:false},
					{id:5,flag:false},
					{id:6,flag:false}
				],
				loadingtext:'',
				newsitems: [
					{
						id:0,
						arrlist:[{
							img:'../../../static/app-plus/img_lijilingqu_quan.png',
							text:'礼品价格',
							yxb:'油信宝加油券',
							time:'2019/05/24',
							Ts:'支付时抵扣',
							
						}],
						flag:true,
					},
					{
						id:1,
						arrlist:[{
							img:'../../../static/app-plus/img_lijilingqu_quan.png',
							text:'礼品价格',
							yxb:'油信宝加油券',
							time:'2019/05/24',
							Ts:'支付时抵扣',
							
						}],
						flag:false,
					},
					
				],
				newsitemss:[],
				tabBars: [{
					name: '我的申请',
					id:0,
					flag:true,
				}, {
					name: '我的审批',
					id:1,
					flag:false,
				},],
				sDialog: {
					message: '确认通过审批?',
					title:''
				},
				Whether:true,
				datas:{
					user_id:'',
					month:'',
				},
				tabList:[{
					mode:"yearMonth",
					name:'',
					value:[0,1]
				}],
				tabIndexs:0,
				newsitemssflag:false,
				Powerlist:[],
				Powerfalsetrue:false,
				Powerjson:'',
				UserIDs:'',
				PowerMonth:'',
				PowerMonthFlag:0,
			}
		},
		
		mounted: function() {
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
				this.getSQcord()
				this.Auditauthority()
			})
		},
		methods: {
			onConfirm(val){
				console.log(val);
				this.tabList[0].name=val.result
				if(this.PowerMonthFlag==0){
					this.datas.month=val.result
					this.getSQcord()
				}
				else{
					this.PowerMonth=val.result
					this.GetPowerList()
				}
				
			},
			//、审核权限
			Auditauthority(){
				var _this=this
				var data={
					user_id:this.$store.state.UserLogin.UserInfo.user_id
				}
				// this.GetPowerList()
				this.$api.AuthPowerInfo(data).then((res)=>{
					console.log(res)
					if(res.data.result==0){
						_this.UserIDs=res.data.data.user_id
						// console.log("sasasa"+_this.UserIDs)
						_this.tabBars.forEach((items)=>{
							items.flag=true
						})
						_this.newsitems.forEach((item)=>{
							item.flag=true
						})
						_this.PowerFlag=true
						this.GetPowerList()
					}
				})
				console.log(data)
			},
			GetPowerList(){
				this.Powerlist=[]
				var _this=this
				var myDate = new Date();
				var year=myDate.getFullYear();
				var month=myDate.getMonth()+1;
				if(month<10){
					month="0"+month
				}
				var Month=year+"-"+month
				var phone=this.$store.state.UserLogin.UserInfo.phone.trim()
				var data={
					auth_name:phone,
					month:this.PowerMonth
				}
				this.$api.AuthInfoList(data).then((res)=>{
					console.log(res)
					if(res.data.result==1){
						_this.Powerlist=[]
						return
					}
					res.data.data.forEach((items)=>{
						items.forEach((item)=>{
								var obj=item
								obj.data_create_time= eval('new ' + (obj.data_create_time.replace(/\//g, '')));
								var month=obj.data_create_time.getMonth() + 1
								var day=obj.data_create_time.getDate()
								var hours=obj.data_create_time.getHours()
								var minutes=obj.data_create_time.getMinutes()
								var seconds=obj.data_create_time.getSeconds()
								if(month<10){
									month="0"+month
								}
								if(hours<10){
									hours="0"+hours
								}
								
								if(minutes<10){
									minutes="0"+minutes
								}
								if(seconds<10){
									seconds="0"+seconds
								}
								if(day<10){
									day="0"+day
								}
								obj.data_create_time= obj.data_create_time.getFullYear() + '-' + month + '-' + day + ' '
							    + hours + ':' + minutes + ':' + seconds;
								_this.Powerlist.push(obj)
							})	
							console.log("aaaaaaaaaaaaaaaaaaa")
							console.log(_this.Powerlist)
						})
					})	
				console.log(data)
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
			closepay(){
				this.password=false
			},
			GetNumbers(val){
				this.$api.ChekcToken(this.$store.state.UserLogin.SessionFlag).then((res)=>{
					if(res.data.result!=0){
						uni.showToast({
							title: '你的账户已在别处登录，如不是本人请尽快修改密码',
							duration: 2000,
							icon:"none",
						});
						this.$store.commit('RemoveLoginOut')
						_this.diskif=false
						_this.closepay()
						_this.PsdArr=[]
						this.PsdArr.forEach((item,index)=>{
							_this.PasswordList[index].flag=true
						})
						this.PasswordList.forEach((item,index)=>{
							item.flag=false
						})
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
					this.PsdArr.push(val)
					if(this.PsdArr.length==6){
						var Psdtext=this.PsdArr.join('')
						console.log(Psdtext)
						var json={
							id:this.Powerjson.id,
							auth_name:this.Powerjson.auth_name,
							state:''
						}
						if(this.Powerfalsetrue){
							json.state=1
						}
						else{
							json.state=2
						}
						var MdPsd=md5(Psdtext)
						var AesJson=Utils.encrypt(JSON.stringify(json),MdPsd)
						var data={
							user_id:this.UserIDs,
							post_params:AesJson
						}
						this.$api.ApplyInfoAuth(data).then((res)=>{
							console.log(res)
							 this.$refs.loading.open()
							this.password=false
							 setTimeout(()=>{
								 if(res.data.result==1){
									 _this.GetPowerList()
									  _this.diskif=false
									  _this.closepay()
									  _this.PsdArr=[]
									  this.PasswordList.forEach((item,index)=>{
									  	item.flag=false
									  })
									   this.$refs.loading.close()
								 	  uni.showToast({
								 		title: res.data.message,
								 		duration: 1000,
								 		icon:"none",
								 	  });
									  return
								 }
								_this.GetPowerList()
								 _this.getSQcord()
								 _this.diskif=false
								 _this.closepay()
								 _this.PsdArr=[]
								 this.PasswordList.forEach((item,index)=>{
								 	item.flag=false
								 })
								  this.$refs.loading.close()
								  if(_this.Powerfalsetrue){
									  uni.showToast({
									  	title: '已审批为通过',
									  	duration: 1000,
									  	icon:"none",
									  });
								  }
								  else{
									uni.showToast({
										title: '已审批为不通过',
										duration: 1000,
										icon:"none",
									});  
								  }
								  
							 },1000)
						})
						return;
					}
					this.PsdArr.forEach((item,index)=>{
						_this.PasswordList[index].flag=true
					})
					console.log(this.PsdArr)
				})
				
			},
			backPay(){
				this.payone=!this.payone
				this.password=!this.password
			},
			getSQcord(){
				var _this=this
				_this.newsitemss=[]
				this.datas.user_id = this.$store.state.UserLogin.UserInfo.user_id
				console.log(this.datas.user_id)
				this.$api.ReserveApplyList(this.datas).then((res)=>{
					console.log(res)
					if(res.data.result==1){
						console.log("暂无申请记录信息")
						_this.newsitemssflag=false
						return;
					}
					res.data.data.forEach((item)=>{
						_this.newsitemssflag=true
						var obj=item
						obj.data_create_time= eval('new ' + (obj.data_create_time.replace(/\//g, '')));
						var month=obj.data_create_time.getMonth() + 1
						var day=obj.data_create_time.getDate()
						var hours=obj.data_create_time.getHours()
						var minutes=obj.data_create_time.getMinutes()
						var seconds=obj.data_create_time.getSeconds()
						if(month<10){
							month="0"+month
						}
						if(hours<10){
							hours="0"+hours
						}
						
						if(minutes<10){
							minutes="0"+minutes
						}
						if(seconds<10){
							seconds="0"+seconds
						}
						if(day<10){
							day="0"+day
						}
						obj.data_create_time= obj.data_create_time.getFullYear() + '-' + month + '-' + day + ' '
				        + hours + ':' + minutes + ':' + seconds;
						if(obj.data_state==0){
							obj.text=`您的用车申请"${obj.apply_gold}"元正在审核`
						}
						if(obj.data_state==1){
							obj.text=`您的用车申请"${obj.apply_gold}"元已通过`
						}
						if(obj.data_state==2){
							obj.text=`您的用车申请"${obj.apply_gold}"元未通过审核`
						}
						_this.newsitemss.push(obj)
						console.log(_this.newsitemss)
					})	
				})
			},
			openDate(val){
				this.PowerMonthFlag=val
				this.$refs.picker.show();
			},
			Whetheradopt(flag,item){
				
				this.Powerjson=item
				console.log(this.Powerjson)
				if(flag){
					this.Powerfalsetrue=true
					this.sDialog.message='确认通过审批?'
					this.TsMsg()
					return;
				}
				this.Powerfalsetrue=false
				this.sDialog.message='确认不通过审批?'
				this.TsMsg()
			},
			TsMsg(){
				this.$refs.simpleDialog2.confirm({
					title: '提示！',
					message:this.sDialog.message
				});
			},
			confirmButton: function() {
				var _this=this
				console.log('Dialog 确定按钮点击');
				this.$refs.loading.open()
				setTimeout(()=>{
					_this.$refs.loading.close()
					_this.password=true
				},1000)
				
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?data=' + e.title
				})
			},
			loadMore(e) {
				this.newsitems[e].loadingType = 1;
				setTimeout(() => {
					this.addData(e);
				}, 1200);
			},
			addData(e) {
				if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingType = 2;
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.newsitems[e].data.push(this['data' + Math.floor(Math.random() * 5)]);
				}
				this.newsitems[e].loadingType = 1;
			},
			async changeTab(e) {
				let index = e.detail.current;
				console.log(index)
				if (!this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = false;
					this.tabIndex = index;
				}
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingType:i,
						data: []
					};
					for (let j = 1; j <= 10; j++) {
						aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
					}
					ary.push(aryItem);
				}
				return ary;
			}
		}
	}
</script>
<style>
	
	
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
.password{width: 70%;margin: 0 15%;position: absolute;top: 10%;left: 0;background: white;z-index: 9999;border-radius: 10upx;margin-bottom: 0;margin-top: 30%;}
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
	
	
	
	
	
	
	
	
	
	
	
	
.title {padding: 20upx;}
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 20upx;}
.swiper-tab-list{line-height: 1;text-align: left;color: #CCCCCC;}
/* .uni-scroll-view{height: 100vh;} */
.swiper-tab-list:last-child{border: 0;color: #CCCCCC;}
.uni-swiper-tab{height: 40px;line-height: 40px;background: white;border: 0;margin-top: 5upx;border-bottom: 1px solid #CCCCCC;margin-left: 20upx;}
.coupon-count{width: 90%;margin: 0 5%;position: relative;}
.uni-tab-bar .swiper-box{height: calc(100vh - 44px - 40px - 10px);}
.coupon-left{width: 30.7%;height: 100%;position: absolute;top: 0;left: 0;display: flex;align-items: center;color: white;font-size: 0.8rem;}
.coupon-right{width: 69.3%;height: 100%;position: absolute;top: 0;right: 0;color: white;font-size: 0.8rem;}
.price image{width: 30upx;height: 20upx;margin-right: 10upx;}
.exam-view{margin-right: 10upx;}
.Approval{margin-top: 40upx;width: 90%;margin-left: 5%;margin-right: 5%;margin-bottom: 40upx;}
.approval-list{box-shadow: 0 0 0.6rem rgba(136, 130, 129, 0.3);border-radius: 14upx;}
.list-top{padding-top: 20upx;margin-left: 20upx;font-size: 0.8rem;font-weight: bold;}
.list-mid{padding-left: 20upx;color: #CCCCCC;padding-bottom: 40upx;}
.approval-btn{display: flex;justify-content: space-between;border-top: 1px solid rgb(240,240,240);}
.openbtn,.closebtn,.openbtns,.closebtns{width:50%;height: 80upx;line-height: 80upx;background: white;border: 0;box-sizing: border-box;text-align: center;}
.openbtns{width: 100%;color:#ff9000;}
.closebtns{width: 100%;color:#d81e06;}
.openbtn{border-right: 1px solid rgb(240,240,240);color:#ff9000;}
.openbtn:active,.closebtn:active,.openbtns:active,.closebtns:active{background: rgb(240,240,240);}
.active{color: black!important;}
.closebtn{color: #d81e06;}
/* .openbtn,.closebtn:active{background: rgb(250,250,250);} */
uni-view:after{border: 0;}
.select-list{
	margin-top: 40upx;
	position: relative;
}
.select-head{
	padding: 10upx 0;
	background:rgb(245,245,245);
	padding-left: 30upx;
	font-size: 0.8rem;
	color:#CCCCCC;
}
.lists{
	border-bottom: 1px solid #CCCCCC;
	display: flex;
	justify-content: space-between;
	padding-left: 20upx;
}
.lists:active{background: rgb(240,240,240);}
.list-radio{
	width: 20%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.radio-img{
	width: 40upx;
	height: 40upx;
	border: 1px solid #C8C7CC;
	border-radius: 50%;
	position: relative;
}
.img{
	width: 40upx;
	height: 40upx;
	position: absolute;
	top: 0;
	left:0;
}
.list-middle{
	width: 60%;
	height: 100%;
}
.mid-top{
	margin-top: 20upx;
	/* font-weight: bold; */
	font-size:.8rem;
}
.mid-bom{
	font-size: 0.8rem;
	color: #C8C7CC;
	margin-bottom: 10upx;
}
.price{
	width: 20%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.select-bom{
	height: 120upx;
	border-top: 1px solid #CCCCCC;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
}
.bom-left{
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 40upx;
}
.bom-right{
	margin-right: 40upx;
}
.goBtn{
	background: black;
	color: white;
	border-radius: 0;
}
</style>
