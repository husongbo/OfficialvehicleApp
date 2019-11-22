<template>
	<view>
		<view class="QRcode" >
			<view class="qrimg">
				<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"  :pdground="pdground"  :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
			</view>
			<view style="text-align: center;margin-top: 20upx;">请扫描此二维码</view>
				<view class="btns" style="display: flex;justify-content: center;">
					<!-- <button @tap="saveQrcode" style="padding: 10upx 20upx;display: flex;align-items: center;margin-top: 20upx;background: rgb(50,219,198);color:white;border: 0;">保存二维码</button> -->
					<!-- <button type="warn" @tap="clearQrcode">清除二维码</button> -->
				</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				val:'', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: 'white', // 背景色
				foreground: 'black', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '../../../static/login/tus.png', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' ,// 二维码生成后的图片地址或base64
			}
		},
		components:{
			tkiQrcode
		},
		onLoad(options){
			this.val=options.code
			var _this=this
			setTimeout(()=>{
				uni.showToast({
					title: '核销成功，请稍后...',
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
			},3000)
		},
		methods: {
			sliderchange(e) {
				this.size = e.detail.value
			},
			creatQrcode() {
				this.$refs.qrcode._makeCode()
			},
			saveQrcode() {
				this.$refs.qrcode._saveCode()
			},
			qrR(res) {
				this.src = res
			},
			clearQrcode() {
				this.$refs.qrcode._clearCode()
				this.val = ''
			},
			ifQrcode() {
				this.ifShow = !this.ifShow
			},
		}
	}
</script>

<style>
.QRcode{
	height: 100vh;
}

.qrimg {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30%;
}
.coupon_box {
	width:100%; max-height:450upx; padding:6upx 0 26upx 0;overflow:scroll;
}
.other_type {
	width:100%; height:90upx; padding-top:50upx;
}
.other_type .text { width:100%; border-top:1px solid #eeeeee; display:block; text-align:center; position:relative; }
</style>
