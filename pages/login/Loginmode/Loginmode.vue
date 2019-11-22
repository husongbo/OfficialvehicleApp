<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="title">请选择你的登录方式</view>
		<view class="page">
			<view class="list" @click="PhoneCode">
				<image src="../../../static/login/code.png" mode="" style="width: 60upx;height: 60upx;"></image>
				<view class="text">手机验证码登录</view>
			</view>
			<view class="list" style="border-top: 0;" @click="PhonePsd">
				<image src="../../../static/login/psd.png" mode="" style="width: 60upx;height: 60upx;"></image>
				<view class="text">手机密码登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				datas:{
					phone:'',
					flag:true
				}
			}
		},
		onLoad(options){
			this.datas.phone=options.phone
			console.log(options)
		},
		methods: {
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
			PhoneCode(){
				uni.navigateTo({
				    url: `../CodeSending/CodeSending?phone=${this.datas.phone}&flag=${this.datas.flag}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			PhonePsd(){
				uni.navigateTo({
				    url: `../LoginPsd/LoginPsd?phone=${this.datas.phone}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
.content{
	height: calc(100vh - 44px);
}
.title{
	font-size: 1rem;
	font-weight: bold;
	margin-left: 20upx;
}
.page{margin-top: 30upx;}
.list{width: 100%;height: 100upx;display: flex;flex-direction: row;border-top: 1px solid rgb(240,240,240);display: flex;align-items: center;border-bottom: 1px solid rgb(240,240,240);}
image{margin-left: 20upx;}
.list:active{background: rgb(240,240,240);}
.text{display: flex;align-items: center;font-size: .8rem;margin-left: 20upx;}
</style>
