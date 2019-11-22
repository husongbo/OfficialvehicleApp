<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="select">发票信息</view>
		<view class="select-list">
			<view class="select-head">请选择发票类型</view>
			<view class="invoice-top">
				<view class="invtop-left">
					电子普通发票
				</view>
				<view class="invtop-left invtop-right">
					电子普通发票
				</view>
			</view>
		</view>
		<view class="select-list">
			<view class="select-head">发票详情</view>
			<view class="list-radios">
				<view class="list-left">
					抬头类型
				</view>
				<view class="list-right">
					<view class="enterprise">
						<image src="../../../static/Select/radio.png" mode="" class="imgs"></image>
						<view class="enterprise-span">
							企业单位
						</view>
					</view>
					<view class="enterprise" style="margin-right:5%;">
						<image src="../../../static/Select/circle.png" mode="" class="imgs"></image>
						<view class="enterprise-span">
							个人/非企业单位
						</view>
					</view>
				</view>
			</view>
			<!-- 企业单位 -->
			<view class="enter-one">
				<view class="list-radios">
					<view class="list-left">
						发票抬头
					</view>
					<input type="text" value="" placeholder="请输入名称" />
				</view>
				<view class="list-radios">
					<view class="list-left">
						税号
					</view>
					<input type="text" value="" placeholder="请输入税号" />
				</view>
				<view class="list-radios">
					<view class="list-left">
						发票内容
					</view>
					<input type="text" value="" placeholder="请输入内容" />
				</view>
				<view class="list-radios">
					<view class="list-left">
						发票金额
					</view>
					<input type="number" value="" placeholder="请输入金额" />
				</view>
			</view>
		</view>
		<!-- 接收方式 -->
		<view class="select-list">
			<view class="select-head">接收方式</view>
			<!-- 企业单位 -->
			<view class="enter-one">
				<view class="list-radios">
					<view class="list-left">
						接收邮箱
					</view>
					<input type="text" value="" placeholder="请输入邮箱" />
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<view class="list-left">
						收件人
					</view>
					<input type="text" value="" placeholder="请填写收件人" />
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<view class="list-left">
						联系电话
					</view>
					<input type="text" value="" placeholder="请填写电话" />
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<view class="list-left">
						所在地区
					</view>
					<input type="text" value="" placeholder="请选择" />
				</view>
			</view>
			<view class="enter-one">
				<view class="list-radios">
					<view class="list-left">
						详细地址
					</view>
					<input type="text" value="" placeholder="请填写详细地址" />
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="gotj">提交</view>
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
.list-radios{height: 100upx;border-bottom: 1px solid #CCCCCC;padding-left: 20upx;display: flex;justify-content: row;align-items: center;}
.list-left{display: flex;align-items: center;width: 25%;font-size: 0.8rem;}
.list-right{display: flex;width: 75%;justify-content: space-between;}
.enterprise{display: flex;flex-direction: row;align-items: center;}
.enterprise-radio{width: 40upx;height: 40upx;border: 1px solid #CCCCCC;box-sizing: border-box;border-radius: 50%;position: relative;}
.enterprise-span{margin-left: 10upx;font-size: 0.8rem;}
.img{width: 40upx;height: 40upx;position: absolute;top: 0;left:0;}
input{font-size: 0.8rem;}
.gotj{margin: 40upx 10%;margin-bottom:40upx;background:linear-gradient(left,rgb(247,205,22),rgb(247,164,44));width: 80%;height: 100upx;line-height: 100upx;text-align: center;border-radius: 10upx;}
</style>
