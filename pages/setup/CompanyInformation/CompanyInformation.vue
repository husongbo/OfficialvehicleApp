<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="user-title" style="display: flex;justify-content: center;padding-top: 10%;">
			<image src="../../../static/Set/company.png" mode="" style="width: 170upx;height: 160upx;"></image>
		</view>
		<view class="" style="display: flex;justify-content: center;padding-top: 20upx;padding-bottom: 20upx;">
			<view class="" style="font-size: 1rem;">绵阳我要加油电子商务有限公司</view>
		</view>
		<!-- 接收方式 -->
		<view class="select-list">
			<view class="select-head">企业信息</view>
			<!-- 企业单位 -->
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_name.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;">
						企业名称
					</view>
					<view class="" style="width: 70%;">
						<input type="text" value=""  />
					</view>
					
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_sheng.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;">
						纳税人识别号
					</view>
					<view class="" style="width: 70%;">
						<input type="text" value=""  />
					</view>
					
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_email.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;">
						企业地址
					</view>
					<view class="" style="width: 70%;">
						<input type="text" value=""  />
					</view>
					
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<image src="../../../static/Set/ic_po.png" mode="" style="width: 40upx;height: 40upx;"></image>
					<view class="list-left" style="margin-left: 20upx;">
						我的角色
					</view>
					<view class="" style="width: 70%;">
						<input type="text" value="" />
					</view>
					
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="gotj" @click="Submission">退出企业</view>
		<w-loading  mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			}
		},
		computed: mapState(['LoginFlag','UserLogin']),
		onLoad(){
			console.log(this.UserLogin)
		},
		methods: {
			...mapMutations(['information']),
			touchstart(event){
				event.preventDefault();
　　　　			this.startX = event.touches[0].pageX
			},
			
			//弹出提示信息
			Tips(text){
				var _this=this
				 uni.showToast({
					title: text,
					duration: 500,
					icon:"none",
				});
				setTimeout(()=>{
					_this.inputs=true
				},500)
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
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;}
.select-list{padding-bottom: 40upx;}
.select-head{padding: 10upx 0;background:rgb(245,245,245);font-size: 0.8rem;color:#CCCCCC;padding-left: 20upx;}
.invoice-top{display: flex;justify-content: row;}
.imgs{
	width: 40upx;height: 40upx;
}
.invtop-left{width: 47%;height:120upx;margin-left: 2%;margin-right: 1%;display: flex;justify-content: center;align-items: center;
border: 1.5px solid #EEC900;margin-top: 20upx;color:#EEC900;}
.invtop-right{width: 47%;height:120upx;margin-left: 1%;margin-right: 2%;display: flex;justify-content: center;align-items: center;
border: 1.5px solid #C8C7CC;margin-top: 20upx;color:#C8C7CC;}
.list-radios{height: 100upx;border-bottom: 1px solid rgb(240,240,240);padding-left: 20upx;display: flex;align-items: center;flex-direction: row;}
.list-left{font-size: 0.7rem;width: 25%;}
.list-right{display: flex;width: 75%;justify-content: space-between;}
.enterprise{display: flex;flex-direction: row;align-items: center;}
.enterprise-radio{width: 40upx;height: 40upx;border: 1px solid #CCCCCC;box-sizing: border-box;border-radius: 50%;position: relative;}
.enterprise-span{margin-left: 10upx;font-size: 0.8rem;}
.img{width: 40upx;height: 40upx;position: absolute;top: 0;left:0;}
input{font-size: 0.8rem;}
.gotj{margin: 40upx 10%;margin-bottom:40upx;background:linear-gradient(left,rgb(247,205,22),rgb(247,164,44));width: 80%;height: 100upx;line-height: 100upx;text-align: center;border-radius: 10upx;}
.gotj:active{color: white;}
</style>
