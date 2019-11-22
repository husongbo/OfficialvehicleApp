<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="user-title" style="display: flex;justify-content: center;padding-top: 10%;">
			<image src="../../../static/Set/girl.png" mode="" style="width: 160upx;height: 160upx;"></image>
		</view>
		<view class="" style="display: flex;justify-content: center;padding-top: 20upx;padding-bottom: 20upx;">
			<view class="" style="font-size: 1rem;">{{UserLogin.UserInfo.phone}}</view>
		</view>
		<!-- 接收方式 -->
		<view class="select-list">
			<view class="select-head">基本信息</view>
			<!-- 企业单位 -->
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_name.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;font-size: .8rem;">
						用户名
					</view>
					<view class="" style="width: 60%;">
						<input type="text" value="" style="font-size:.8rem;" v-model="UserLogin.UserInfo.real_name" placeholder="请输入用户名" @blur="Blurclick(1)"/>
					</view>
					
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_sheng.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;font-size: .8rem;">
						身份证号
					</view>
					<view class="" style="width: 70%;">
						<input type="text" value="" style="font-size: .8rem;" v-model="UserLogin.UserInfo.driver_id" placeholder="请输入身份证号" @blur="Blurclick(2)"/>
					</view>
					
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_email.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;font-size: .8rem;">
						邮箱
					</view>
					<view class="" style="width: 70%;">
						<input type="text" value="" style="font-size: .8rem;" v-model="UserLogin.UserInfo.email" placeholder="请输入邮箱" @blur="Blurclick(3)"/>
					</view>
					
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios" @click="Choiceaddress">
					<image src="../../../static/Set/ic_po.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;font-size:.8rem;">
						地址
					</view>
					<view class="" style="width: 70%;">
						<view class="" style="font-size: .8rem;">{{address}}</view>
					</view>
					
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_pos.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;font-size: .8rem;">
						详情地址
					</view>
					<view class="" style="width: 70%;">
						<input type="text" style="font-size: .8rem;" value="" v-model="UserLogin.UserInfo.address" placeholder="请输入详细地址" />
					</view>
					
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="gotj" @click="Submission">提交</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm">
		</mpvue-city-picker>
		<w-loading  mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import Utils from '../../../util/util.js'
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				address:'请选择地址',
				UserAdressYZ:[
					{id:1,yzm:/^[\u4e00-\u9fa5]+$/,trpstexts:"请输入只包含中文用户名",flag:false},
					{id:2,yzm:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,trpstexts:"请输入有效的身份证号码",flag:false},
					{id:3,yzm:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,trpstexts:"请输入正确的邮箱地址",flag:false}
				],
				inputs:true,//是否可以点击输入
				YZMindex:0,
				datas:{
					model_info:'aaa'
				},
				flagDisabled:false,
			}
		},
		computed: mapState(['LoginFlag','UserLogin']),
		components:{
			mpvueCityPicker
		},
		onLoad(){
			console.log(this.UserLogin)
			//获取用户信息
			this.GetInfo()
		},
		methods: {
			...mapMutations(['information']),
			touchstart(event){
				event.preventDefault();
　　　　			this.startX = event.touches[0].pageX
			},
			//验证
			Blurclick(val){
				var _this=this
				if(this.inputs){
					console.log("aaaaaaaa")
					this.inputs=false
					this.UserAdressYZ.forEach((item)=>{
						if(item.id==val){//用户名
							if(val==1){
								var flag=this.flagempty(_this.UserLogin.UserInfo.real_name)
								if(!flag){
									_this.Tips("不能为空")
									_this.inputs=true
									item.flag=false
									return;
								}
								if(!item.yzm.test(_this.UserLogin.UserInfo.real_name)){
									_this.Tips(item.trpstexts)
									item.flag=false
									return;
								}
								_this.inputs=true
								item.flag=true
								return;
							}	
							if(val==2){
								var flag=this.flagempty(_this.UserLogin.UserInfo.driver_id)
								if(!flag){
									_this.Tips("不能为空")
									_this.inputs=true
									item.flag=false
									return;
								}
								console.log(item.yzm)
								if(!item.yzm.test(_this.UserLogin.UserInfo.driver_id)){
									_this.Tips(item.trpstexts)
									item.flag=false
									return;
								}
								_this.inputs=true
								item.flag=true
								return;
							}	
							if(val==3){
								var flag=this.flagempty(_this.UserLogin.UserInfo.email)
								if(!flag){
									_this.Tips("不能为空")
									_this.inputs=true
									item.flag=false
									return;
								}
								if(!item.yzm.test(_this.UserLogin.UserInfo.email)){
									_this.Tips(item.trpstexts)
									item.flag=false
									return;
								}
								_this.inputs=true
								item.flag=true
								return;
							}	
						}
					})
				}	
			},
			Submission(){
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
					if(_this.inputs){
						setTimeout(()=>{
							_this.YZMindex=0
							this.UserAdressYZ.forEach((item)=>{
								if(item.flag){
									_this.YZMindex++
								}
							})
							console.log(_this.address)
							console.log(_this.UserLogin.UserInfo.address)
							if(_this.YZMindex==3&&_this.address!='请选择地址'&&_this.UserLogin.UserInfo.address!=""){
								_this.datas.model_info=_this.UserLogin.UserInfo
								var jsondatas={
									user_id:_this.UserLogin.UserInfo.user_id,
									real_name:_this.UserLogin.UserInfo.real_name,
									driver_id:_this.UserLogin.UserInfo.driver_id,
									contry:"中国",
									province:_this.UserLogin.UserInfo.province,
									city:_this.UserLogin.UserInfo.city,
									address:_this.UserLogin.UserInfo.address,
									email:_this.UserLogin.UserInfo.email,
									phone:_this.UserLogin.UserInfo.phone.trim()	
								}
								var ascdata=Utils.encrypt(JSON.stringify(jsondatas),'a0bdac13b5cb2c2acf8f7j0f737aa78b')
								// this.$api.UpdateUserInfo(_this.datas).then((res)=>{
								// 	console.log(res)
								// })
								console.log(ascdata)
								uni.request({
									url: 'http://gwyc.youxinbao.com.cn/public/UpdateUserInfo', //仅为示例，并非真实接口地址。
									data: {
										post_params:ascdata
									},
									success: (res) => {
										console.log(res);
										if(res.data.result==0){
											_this.$refs.loading.open()
											setTimeout(()=>{
												_this.information(_this.UserLogin.UserInfo)
												_this.$refs.loading.close()
												uni.showToast({
													title: res.data.message,
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
													title: res.data.message,
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
								return;
							}
							_this.Tips("请正确填写信息")
							console.log(_this.YZMindex)
						},600)
					}
				})
			},
			//是否为空
			flagempty(val){
				if(val==''||val==null){
					return false;
				}
				return true;
			},
			//弹出提示信息
			Tips(text){
				var _this=this
				 uni.showToast({
					title: text,
					duration: 500,
					icon:"none",
				});
				setTimeout(()=>{
					_this.inputs=true
				},500)
			},
			onCancel(e) {
				// console.log(e.label)
			},
			onConfirm(e) {
				var formtxt=e.label
				this.UserLogin.UserInfo.province=formtxt.split('-')[0]
				this.UserLogin.UserInfo.city=formtxt.split('-')[1]
				// if(this.UserLogin.UserInfo.province==''){
				// 	this.address='请选择地址'
				// }
				// else{
					this.address=e.label
				// }				
			},
			//选择地址
			Choiceaddress(){
				this.$refs.mpvueCityPicker.show()
			},
			GetInfo(){
				console.log(this.UserLogin.UserInfo.real_name)
				if(this.UserLogin.UserInfo.real_name=='未设置'){
					this.UserLogin.UserInfo.real_name=""
				}
				if(this.UserLogin.UserInfo.driver_id==null){
					this.UserLogin.UserInfo.driver_id=""
				}
				if(this.UserLogin.UserInfo.email==null){
					this.UserLogin.UserInfo.email=""
				}
				if(this.UserLogin.UserInfo.address==null){
					this.UserLogin.UserInfo.address=""
				}
				if(this.UserLogin.UserInfo.city==null){
					this.UserLogin.UserInfo.province=""
					this.UserLogin.UserInfo.city=""
				}
				if(this.UserLogin.UserInfo.driver_id!=null){
					console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
					if(this.UserLogin.UserInfo.province==''||this.UserLogin.UserInfo.province==null){
						this.address='请选择地址'
					}
					else{
						this.address=this.UserLogin.UserInfo.province+"-"+this.UserLogin.UserInfo.city
					}
					this.UserAdressYZ.forEach((item)=>{
						item.flag=true
					})
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
			},
		}
	}
</script>

<style>
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;}
.select-list{padding-bottom: 40upx;}
.select-head{padding: 10upx 0;background:rgb(245,245,245);font-size: 0.8rem;color:#CCCCCC;padding-left: 20upx;}
.invoice-top{display: flex;justify-content: row;}
.imgs{
	width: 40upx;height: 40upx;
}
.invtop-left{width: 47%;height:120upx;margin-left: 2%;margin-right: 1%;display: flex;justify-content: center;align-items: center;
border: 1.5px solid #EEC900;margin-top: 20upx;color:#EEC900;}
.invtop-right{width: 47%;height:120upx;margin-left: 1%;margin-right: 2%;display: flex;justify-content: center;align-items: center;
border: 1.5px solid #C8C7CC;margin-top: 20upx;color:#C8C7CC;}
.list-radios{height: 100upx;border-bottom: 1px solid rgb(240,240,240);padding-left: 20upx;display: flex;align-items: center;flex-direction: row;}
.list-left{font-size: 0.7rem;width: 25%;}
.list-right{display: flex;width: 75%;justify-content: space-between;}
.enterprise{display: flex;flex-direction: row;align-items: center;}
.enterprise-radio{width: 40upx;height: 40upx;border: 1px solid #CCCCCC;box-sizing: border-box;border-radius: 50%;position: relative;}
.enterprise-span{margin-left: 10upx;font-size: 0.8rem;}
.img{width: 40upx;height: 40upx;position: absolute;top: 0;left:0;}
input{font-size: 0.8rem;}
.gotj{margin: 40upx 10%;margin-bottom:40upx;background:linear-gradient(left,rgb(247,205,22),rgb(247,164,44));width: 80%;height: 100upx;line-height: 100upx;text-align: center;border-radius: 10upx;}
.gotj:active{color: white;}
</style>
