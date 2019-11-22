<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="select">修改密码</view>
		<view class="changepsdlist">
			<view class="list" v-for="(item,index) in list" :key="index" @click="Gotolist(item.id)">
				<view class="">{{item.text}}</view>
				<image src="../../../../static/Wallet/next.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				list:[
					{id:1,text:'登录密码',url:'../LoginPsd/loginpsdone/loginpsdone'},
					{id:2,text:'支付密码',url:'../paymentpsd/paymentpsdone/paymentpsdone'},
				],
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			}
		},
		computed: mapState(['LoginFlag','UserLogin']),
		methods: {
			Gotolist(e){//选择项
				var _this=this
				this.list.forEach((item)=>{
					if(e==item.id){
						if(item.id==2){
							console.log(_this.UserLogin.UserInfo)
							_this.ifpayment(item.url)
								return
							}
							_this.Urladress(item.url)
							return;
						}
				})
			},
			ifpayment(url){
				var _this=this
				var datas={
					phone:this.UserLogin.UserInfo.phone
				}
				this.$api.CheckUserTradePwd(datas).then((res)=>{
					console.log(res)
					if(res.data.result==1){
						uni.showToast({
							title: '你还没有设置支付密码，请先设置',
							duration: 1000,
							icon:"none",
						});
					}
					else{
						_this.Urladress(url)
					}
				})
			},
			Urladress(urls){
				uni.navigateTo({
				    url: urls,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
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
.select{padding: 10upx;padding-left: 20upx;font-size: 1.2rem;font-weight: bold;padding-bottom: 40upx;}
.changepsdlist{}
.list{display: flex;justify-content: space-between;align-items: center;padding-bottom:20upx;border-bottom: 1px solid rgb(240,240,240);font-size: 0.8rem;padding-top: 20upx;padding-left: 20upx;}
.list image{width: 40upx;height: 40upx;margin-right: 20upx;}
.list:active{background: rgb(250,250,250);}
</style>
