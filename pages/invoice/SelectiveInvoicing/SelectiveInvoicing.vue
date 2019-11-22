<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<!-- <view class="select">选择开票</view> -->
		<!-- 11 -->
		<!-- <view class="select-list">
			<view class="select-head">11月</view>
			<view class="list">
				<view class="list-radio">
					<image src="../../../static/Select/radio.png" mode="" class="imgs"></image>
				</view>
				<view class="list-middle">
					<view class="mid-top">车牌号 川B6666666</view>
					<view class="mid-bom">2018.12.04 周二 19:30</view>
				</view>
				<view class="price">
					100<span style="color: #CCCCCC;font-size: 0.7rem;margin-left: 5upx;">元</span>
				</view>
			</view>
			<view class="list">
				<view class="list-radio">
					<image src="../../../static/Select/circle.png" mode="" class="imgs"></image>
				</view>
				<view class="list-middle">
					<view class="mid-top">车牌号 川B6666666</view>
					<view class="mid-bom">2018.12.04 周二 19:30</view>
				</view>
				<view class="price">
					100<span style="color: #CCCCCC;font-size: 0.7rem;margin-left: 5upx;">元</span>
				</view>
			</view>
		</view> -->
		<!-- 12 -->
		<!-- <view class="select-list">
			<view class="select-head">11月</view>
			<view class="list">
				<view class="list-radio">
					<image src="../../../static/Select/circle.png" mode="" class="imgs"></image>
				</view>
				<view class="list-middle">
					<view class="mid-top">车牌号 川B6666666</view>
					<view class="mid-bom">2018.12.04 周二 19:30</view>
				</view>
				<view class="price">
					100<span style="color: #CCCCCC;font-size: 0.7rem;margin-left: 5upx;">元</span>
				</view>
			</view>
			<view class="list">
				<view class="list-radio">
					<image src="../../../static/Select/circle.png" mode="" class="imgs"></image>
				</view>
				<view class="list-middle">
					<view class="mid-top">车牌号 川B6666666</view>
					<view class="mid-bom">2018.12.04 周二 19:30</view>
				</view>
				<view class="price">
					100<span style="color: #CCCCCC;font-size: 0.7rem;margin-left: 5upx;">元</span>
				</view>
			</view>
		</view>
		<view class="select-bom">
			<view class="bom-left">
				<image src="../../../static/Select/circle.png" mode="" class="imgs"></image>
				<view style="font-size: 0.8rem;margin-left: 10upx;color: #CCCCCC;">全选</view>
			</view>
			<view class="bom-right">
				<view class="goBtn" @click="GoInvoicing">下一步</view>
			</view>
		</view> -->
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
			GoInvoicing(){
				uni.navigateTo({
				    url: '../Invoiceinformation/Invoiceinformation',
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
.select{
	padding: 10upx;
	padding-left: 30upx;
	font-size: 1rem;
	font-weight: bold;
	padding-bottom: 40upx;
}
.select-list{
	padding-bottom: 40upx;
}
.select-head{
	padding: 10upx 0;
	background:rgb(245,245,245);
	padding-left: 30upx;
	font-size: 0.8rem;
	color:#CCCCCC;
}
.list{
	height: 140upx;
	border-bottom: 1px solid #CCCCCC;
	display: flex;
	flex-direction: row;
}
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
.imgs{
	width: 40upx;height: 40upx;
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
	font-size:1rem;
}
.mid-bom{
	font-size: 0.8rem;
	color: #C8C7CC;
}
.list:active{
	background: rgb(250,250,250);
}
.price{
	width: 20%;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 1rem;
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
	border-radius: 10upx;
	width: 150upx;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
}
</style>
