<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="con-login">验证码已发送至<span>138*****87003</span></view>
		<view class="codeinput">
			<view type="number" class="codes"></view>
			<view type="number" class="codes"></view>
			<view type="number" class="codes"></view>
			<view type="number" class="codes"></view>
		</view>
		<view class="CodeCx">
			<view class="CodeCx-right">
				<view class="Gosend" @click="GotoNewPsd">重新发送</view>
				<view class="codenum">60S后重新发送</view>
			</view>
		</view>
		
		<view :class="'keyboard ' + pattern">
			<ul class="number">
				<li class="button"  v-for="item in keys" :key="item">{{item}}</li>
				<li class="button">.</li>
				<li class="button down" >
					<image src="../../../../static/Set/keydown.png" mode=""></image>
				</li>
			</ul>
			<view class="action">
				<view class="delete down" ><image src="../../../../static/Set/keydel.png" mode=""></image></view>
				<view class="ok down" ><image src="../../../../static/Set/backjian.png" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	const keys = () => {
		let natural = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		return natural.sort(function(){
			return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		});
	};
	export default {
		data() {
			return {
				pattern: 'hidden',
				keys: keys(),
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
			GotoNewPsd(){
				uni.navigateTo({
				    url: '../changephonethree/changephonethree',
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
/* 密码 */
.keyboard{
position: fixed;
bottom: 0;height: 240px;width: 100%;border-top: 1px solid #ddd;background: #fff;display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;flex-direction: row;}
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



.content{height:calc(100vh - 88upx);}
.con-login{
	font-size:1rem;
	font-weight: 700;
	padding-left: 20upx;
}
.con-login span{
	color:rgb(228,200,110);
	margin-left: 10upx;
}
.codeinput{
	display: flex;
	flex-direction: row;
	margin-top: 80upx;
	padding-left: 20upx;
}
.codes{
	border-bottom: 1px solid #C8C7CC;
	width: 20%;
	height: 50upx;
	line-height: 50upx;
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
	color: #CCCCCC;
	margin-right: 20upx;
}
</style>
