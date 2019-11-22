<template>
	<view>
		<view class="content" @touchstart="touchstart" @touchmove="touchmove">
			<view class="con-login">设置新的电话号码</view>
			<view class="inputs">
				<input type="number" class="phone" value="" placeholder="请输入电话号码"/>
			</view>
			
			<view class="login-bottom">
				<view  class="gobtn" @click="Gologintwo">下一步</view>
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
			Gologintwo(){
				uni.navigateTo({
				    url: '../changephonetwo/changephonetwo',
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
.content{
	padding: 20upx;
	height:calc(100vh - 88upx);
}
.con-login{
	font-size:1rem;
	font-weight: 700;
}
.con-login span{
	color:rgb(228,200,110);
	margin-left: 10upx;
}
.inputs{
	border-bottom: 1px solid #ccc;
	margin-top: 70upx;
	/* padding-bottom: 10upx; */
}
.phone{
	
	color: #C8C7CC;
	
}
.login-bottom{
	display: flex;
	justify-content:flex-end;
	height: 100upx;
	margin-top: 80upx;
}
.setpsd{
	font-size: 0.8rem;
	color:#C8C7CC;
}
.gobtn{
	margin-right: 0;
	padding: 0 60upx;
	background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));
	height: 80upx;
	line-height:80upx;
	border-radius: 10upx;
}
uni-button:after{border: 0;}
</style>
