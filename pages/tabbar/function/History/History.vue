<template>
	<view class="content"  @touchstart="touchstart" @touchmove="touchmove">
		<view class="titles" style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 40upx;">
			<view class="select">加油记录</view>
			<view class="" style="width: 100upx;height: 100%;">
				<image src="../../../../static/Wallet/date.png" mode="" style="width: 40upx;height: 40upx;margin-right: 40upx;" @click="openDate"></image>
			</view>
			
		</view>
		
		<!-- 11 -->
		<view class="select-list">
			<view class="list" @click="GotoRecord" v-for="(item,index) in historylist" :key="index">
				<view class="list-middle">
					<view class="mid-top">{{item.name}}</view>
					<view class="mid-bom">{{item.date}}</view>
				</view>
				<view class="price">
					{{item.price}}<span style="color: #CCCCCC;font-size: 0.7rem;margin-left: 5upx;">元</span>
				</view>
			</view>
		</view>
		<w-picker :mode="mode" startYear="2019" endYear="2030" step="1" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				tabList:[{
					mode:"yearMonth",
					name:'',
					value:[0,1]
				}],
				tabIndex:0,
				historylist:[
					{name:'壳牌绵阳游仙仙海加油站',date:'2018.12.04 周二 19:30',price:'100'},
					{name:'壳牌绵阳游仙仙海加油站',date:'2018.12.04 周二 19:30',price:'100'},
					{name:'壳牌绵阳游仙仙海加油站',date:'2018.12.04 周二 19:30',price:'100'}
				]
			}
		},
		components:{
			wPicker
		},
		computed:{
			mode(){
				return this.tabList[this.tabIndex].mode
			},
			defaultVal(){
				return this.tabList[this.tabIndex].value
			}
		},
		methods: {
			touchstart(event){
				event.preventDefault();
　　　　			this.startX = event.touches[0].pageX
			},
			openDate(){
				this.$refs.picker.show();
			},
			onConfirm(val){
				console.log(val);
				this.tabList[0].name=val.result
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
			GotoRecord(){
				uni.navigateTo({
				    url: '../Recorddetails/Recorddetails',
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
.content{
	height:calc(100vh - 88upx);
}
.select{
	padding: 10upx;
	padding-left: 30upx;
	font-size: 1rem;
	font-weight: bold;
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
	justify-content: space-between;
	padding-left: 20upx;
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
.img{
	width: 40upx;
	height: 40upx;
	position: absolute;
	top: 0;
	left:0;
}
.list:active{background: rgb(240,240,240);}
.list-middle{
	width: 60%;
	height: 100%;
}
.mid-top{
	margin-top: 20upx;
	font-weight: bold;
	font-size:1rem;
}
.mid-bom{
	font-size: 0.8rem;
	color: #C8C7CC;
	/* margin-top: 10upx; */
}
.price{
	width: 20%;
	height: 100%;
	display: flex;
	align-items: center;
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
