<template>
	<view class="content"  @touchstart="touchstart" @touchmove="touchmove" >
		<view class="list" style="border-top: 1px solid rgb(240,240,240);" @click="GoUserInfo(1)">
			<view class="left" >
				<image class="img1"  src="../../../static/Set/myinfo.png" mode=""></image>
				<view class="">个人信息</view>
			</view>
			<image class="img2"  src="../../../static/Wallet/next.png" mode=""></image>
		</view>
		<view class="list" @click="GoUserInfo(2)">
			<view class="left">
				<image class="img1" src="../../../static/Set/jiainfo.png" mode=""></image>
				<view  class="">驾照信息</view>
			</view>
			<image class="img2"  src="../../../static/Wallet/next.png" mode=""></image>
		</view>
		<view class="list" @click="GoUserInfo(3)">
			<view class="left">
				<image class="img1"  src="../../../static/Set/cominfo.png" mode=""></image>
				<view class="">公司信息</view>
			</view>
			<image class="img2"  src="../../../static/Wallet/next.png" mode=""></image>
		</view>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" confirmButtonText="前往"  @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import simpleDialog from '@/components/dialog.vue'
	export default {
		data() {
			return {
				sDialog: {
					message: '你还没有登录，请前往登录',
					title:''
				},
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			}
		},
		components: {
			simpleDialog
		},
		onLoad(){
			
		},
		computed: mapState(['LoginFlag','UserLogin']),
		methods: {
			GoUserInfo(val){
				if(!this.LoginFlag){
					this.$refs.simpleDialog2.confirm({
						title: '提示！',
						message:this.sDialog.message
					});
					return;
				}
				if(val==1){
					this.GoTo('../authentication/authentication')
				}
				if(val==2){
					this.GoTo('../DriverInfomation/DriverInfomation')
				}
				if(val==3){
					this.GoTo('../CompanyInformation/CompanyInformation')
				}
			},
			confirmButton: function() {
				this.GoTo('../../login/login/login')
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			GoTo(text){
				uni.navigateTo({
				    url: text,
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
.content{
	height: calc(100vh - 44px);
}
.list{display: flex;align-items: center;border-bottom: 1px solid rgb(240,240,240);height: 100upx;justify-content: space-between;}
.img1{width: 60upx;height: 60upx;margin:0 20upx;}
.img2{width: 40upx;height: 40upx;margin:0 20upx;}
.left{display: flex;flex-direction: row;align-items: center;}
.list:active{background: rgb(240,240,240);}
</style>
