<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="select">申请额度</view>
		<view class="quota-title">
			申请金额
		</view>
		<view class="input-par">
			<input class="price" type="number" value="" placeholder="请输入充值金额" />
		</view>
		<view class="indexbtn" @click="Immediate">立即申请</view>
		<w-loading text="申请中" mask="1" click="0" ref="loading"></w-loading>
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
				btnflag:true,
			}
		},
		methods: {
			touchstart(event){
				event.preventDefault();
	　　　　			this.startX = event.touches[0].pageX
			},
			Immediate(){
				var _this=this
				if(this.btnflag){
					this.btnflag=false
					this.$refs.loading.open()
					setTimeout(()=>{
						_this.$refs.loading.close()
						_this.btnflag=true
					},1500)
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
	.content{height:calc(100vh - 88upx);}
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;}
.quota-title{margin-left: 20upx;color: #CCCCCC;}
.input-par{border-bottom: 1px solid #CCCCCC;margin: 0 20upx;}
.price{height: 70upx;font-size: 1.2rem;margin-top: 20upx;color: #CCCCCC;}
.indexbtn{margin:30% 5%;width: 90%;margin-bottom:20upx;height: 100upx;line-height: 100upx;border: 0;background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));font-size: 0.8rem;font-weight: bold;
text-align: center;}
.indexbtn:active{background: linear-gradient(left,rgba(247,206,19,0.8),rgba(246,163,45,0.8));color: white;}
uni-button:after{border: 0;}
</style>
