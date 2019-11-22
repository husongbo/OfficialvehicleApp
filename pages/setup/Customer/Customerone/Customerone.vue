<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="select">1.支付宝支付时提示额度不够怎么办</view>
		<view class="cusespan">
			付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办
		</view>
		<view class="cusespan">
			付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办付宝支付时提示额度不够怎么办
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
			}
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
		}
	}
</script>

<style>
.content{height:calc(100vh - 88upx);}
.select{padding: 10upx;padding-left: 20upx;font-size: .9rem;font-weight: bold;padding-bottom: 40upx;}
.cusespan{padding: 20upx;}
</style>
