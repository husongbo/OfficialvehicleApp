<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="con-login">验证码已发送至<span>{{phones}}</span></view>
		<view class="codeinput">
			<view class="inputs">
				<input type="text" class="codes" disabled="disabled" v-model="PasswordList[0].text" />
			</view>
			<view class="inputs">
				<input type="number" class="codes" disabled="disabled" v-model="PasswordList[1].text" />
			</view>
			<view class="inputs">
				<input type="number" class="codes" disabled="disabled" v-model="PasswordList[2].text" />
			</view>
			<view class="inputs">
				<input type="number" class="codes" disabled="disabled" v-model="PasswordList[3].text" />
			</view>
			<view class="inputs">
				<input type="number" class="codes" disabled="disabled" v-model="PasswordList[4].text" />
			</view>
			<view class="inputs">
				<input type="number" class="codes" disabled="disabled" v-model="PasswordList[5].text" />
			</view>
		</view>
		<view class="CodeCx">
			<view class="CodeCx-right">
				<view class="Gosend" :class="{codeactive:LoginCode}" @click="againaendCode" >重新发送</view>
				<view class="codenum" :class="{codeactive:!LoginCode}">{{second}}S后重新发送</view>
			</view>
		</view>
		<view :class="'keyboard ' + pattern">
			<ul class="number">
				<li class="button"  v-for="item in keyss" :key="item" @tap="GetNumbers(item)">{{item}}</li>
				<li class="button">.</li>
				<li class="button down" >
					<image src="../../../static/Set/keydown.png" mode=""></image>
				</li>
			</ul>
			<view class="action">
				<view class="delete down" @click="DelNumbers"><image src="../../../static/Set/keydel.png" mode=""></image></view>
				<view class="ok down" ><image src="../../../static/Set/backjian.png" mode=""></image></view>
			</view>
		</view>
		<w-loading text="加载中.." mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	const keys = () => {
		let natural = [1, 2, 3, 4, 5, 6, 7, 8, 9,0];
		return natural
		// return natural.sort(function(){
		// 	return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		// });
	};
	import {mapState,mapMutations} from 'vuex'
	export default {
		
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				pattern: 'hidden',
				keyss: keys(),
				PsdArr:[],//密码存
				PasswordList:[
					{text:''},
					{text:''},
					{text:''},
					{text:''},
					{text:''},
					{text:''}
				],
				datas:{
					Phone:'',
					flag:false
				},
				phones:'',
				code:{
					phone:'',
					sms_validate_code:''
				},
				second:60,
				LoginCode:true,
				User:{
					userinfo:''
				}
			}
		},
		onLoad(options){
			var _this=this
			var after=options.phone.slice(0,3)//前三位
			var end=options.phone.slice(7,11)//后三位
			_this.phones=after+"*****"+end
			console.log(end)
			this.PsdArr=[]
			this.second=60
			this.LoginCode=true
			this.datas.Phone=options.phone
			this.datas.flag=options.flag
			this.SendCode()
		},
		filters:{
			Zeros:function(val){
				console.log(val)
				return val
			}
		},
		
		methods: {
			...mapMutations(['Login']),
			touchstart(event){
				event.preventDefault();
	　　　　			this.startX = event.touches[0].pageX
			},
			againaendCode(){
				if(!this.LoginCode){
					this.SendCode()
					this.LoginCode=true
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
			SendCode(){
				var _this=this
				this.$api.SendSmsCode(this.datas).then((res)=>{
					console.log(res)
					if(res.data.result==1){
						 uni.showToast({
							title: '验证码发送成功，请留意短信',
							duration: 2000,
							icon:"none",
						});
						var SecordNum=setInterval(()=>{
							//console.log("aaa")
							_this.second--
							if(_this.second<0){
								clearInterval(SecordNum)
								_this.second=60
								_this.LoginCode=false							
							}
						},1000)
					}
					else{
						uni.showToast({
							title: '短信发送超限,请稍后重试',
							duration: 2000,
							icon:"none",
						});
					}	
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
					item.text=''
				})
				this.PsdArr.forEach((item,index)=>{
					_this.PasswordList[index].text=item
				})
			},
			
			GetNumbers(val){			
				var _this=this
				this.PsdArr.push(val)
				console.log(this.PsdArr)
				this.PsdArr.forEach((item,index)=>{
					_this.PasswordList[index].text=item
					if(_this.PasswordList[index].text==0){
						_this.PasswordList[index].text="0"
					}
				})
				console.log(JSON.stringify(this.PasswordList))
				if(this.PsdArr.length==6){
					 this.$refs.loading.open()
					var codelist=this.PsdArr.join('')
					this.code.sms_validate_code=codelist
					this.code.phone=this.datas.Phone
					console.log(codelist)
					if(_this.datas.flag=="false"){
						// uni.navigateTo({
						// 	url: `../SettingPassword/SettingPassword?phone=${this.datas.Phone}`,
						// 	animationType: 'pop-in',
						// 	animationDuration: 200
						// })
					this.$api.CheckSmsValidateCode(this.code).then((res)=>{
						console.log(res)
						this.code.sms_validate_code=''
						this.PasswordList.forEach((item,index)=>{
							item.text=''
						})
						this.PsdArr=[]
						if(res.data.result==0){
							setTimeout(()=>{
								this.$refs.loading.close()
									uni.navigateTo({
										url: `../SettingPassword/SettingPassword?phone=${this.datas.Phone}`,
										animationType: 'pop-in',
										animationDuration: 200
									})
							},2000)
							return					
						}
						if(res.data.result==1){
							setTimeout(()=>{
								this.$refs.loading.close()
								uni.showToast({
									title: '验证码不正确',
									duration: 1000,
									icon:"none",
								});
							},2000)	
						}	
					})
					return;
					}
					if(_this.datas.flag=="true"){
						this.$api.LoginFromAValidateCode(this.code).then((res)=>{
							this.$refs.loading.open()
							console.log(res)
							this.code.sms_validate_code=''
							this.PasswordList.forEach((item,index)=>{
								item.text=''
							})
							this.PsdArr=[]
							if(res.data.result==0){
								setTimeout(()=>{
									_this.User.userinfo=res.data.data
									_this.Login(_this.User)
										uni.showToast({
											title: '登录成功，请稍后...',
											duration: 2000,
											icon:"none",
										});
										setTimeout(()=>{
											_this.$refs.loading.close()
											const currentWebview = this.$mp.page.$getAppWebview()
											console.log(currentWebview.id)
											uni.navigateBack({
												delta: parseInt(currentWebview.id)-1,
												animationType: 'pop-out',
												animationDuration: 200
											});
										},2000)
								},2000)
								return					
							}
							if(res.data.result==1){
								setTimeout(()=>{
									this.$refs.loading.close()
									uni.showToast({
										title: '验证码不正确',
										duration: 1000,
										icon:"none",
									});
								},2000)
							}
						})
					}
				}	
			},
		}
	}
</script>

<style>
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
	.button:nth-child(11){border-bottom: none;font-size: 16px;}
	.button:nth-child(10),.button:nth-child(12){border-bottom: none;}
	.action{ width: 25%;display: -webkit-box;display: -webkit-flex;display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.delete{height: 50%;width: 100%;border-bottom: 1px solid #ddd;background: #ddd;}
	.ok{flex: 1; width: 100%;}
	.codeactive{color: #CCCCCC!important;}
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
.codeinput{
	display: flex;
	flex-direction: row;
	margin-top: 80upx;
}
.inputs{
	text-align: center;
	margin-right: 30upx;
	display: flex;
	justify-content: center;
	border-bottom: 1px solid #CCCCCC;
}
.codes{
	width: 100%;
	text-align: center;
	margin-right: 30upx;
	display: flex;
	justify-content: center;
}
.CodeCx{
	display: flex;
	justify-content: flex-end;
	margin-top: 80upx;
}
.CodeCx-right{
	width: 50%;
	display: flex;
	justify-content: space-between;
}
.Gosend{
	font-size: 0.7rem;
	color: rgb(250,207,128);
}
.codenum{
	font-size: 0.7rem;
	color: rgb(250,207,128);
}
</style>
