<template>
	<view class="content">
		<view class="select">确认支付</view>
		<view class="payment-top">
			<view class="pament-top-top">支付信息</view>
			<view class="paymenttop-mid">确认为车辆 川B 666666加油</view>
			<view class="paymenttop-bom">
				<view class="apymenttop-bom-left">支付金额</view>
				<view class="apymenttop-bom-right">100元</view>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="payment-top pament-mid">
			<view class="pament-top-top">支付方式</view>
			<view class="payemnt-list">
				<view class="payment-lists">
					<view class="payments-list-left">
						<view class="paymentlist-span">支付方式</view>
						<view class="paymentlist-text">剩余200元</view>
					</view>
					<view class="payments-list-right">
						<image src="../../../../static/tabbar/openradio.png" mode=""></image>
					</view>
				</view>
				<view class="payment-lists">
					<view class="payments-list-left">
						<image src="../../../../static/Wallet/zhifubao.png" mode=""></image>
						<view class="paymentlist-span">支付宝支付</view>
					</view>
					<view class="payments-list-right">
						<image src="../../../../static/tabbar/closeraido.png" mode=""></image>
					</view>
				</view>
				<view class="payment-lists">
					<view class="payments-list-left">
						<image src="../../../../static/Wallet/yizhifu.png" mode=""></image>
						<view class="paymentlist-span">翼支付</view>
					</view>
					<view class="payments-list-right">
						<image src="../../../../static/tabbar/closeraido.png" mode=""></image>
					</view>
				</view>
				<view class="payment-lists">
					<view class="payments-list-left">
						<image src="../../../../static/Wallet/wo.png" mode=""></image>
						<view class="paymentlist-span">沃支付</view>
					</view>
					<view class="payments-list-right">
						<image src="../../../../static/tabbar/closeraido.png" mode=""></image>
					</view>
				</view>
				<view class="payment-lists">
					<view class="payments-list-left">
						<image src="../../../../static/Wallet/weixin.png" mode=""></image>
						<view class="paymentlist-span">微信支付</view>
					</view>
					<view class="payments-list-right">
						<image src="../../../../static/tabbar/closeraido.png" mode=""></image>
					</view>
				</view>
				<view class="payment-lists">
					<view class="payments-list-left">
						<image src="../../../../static/Wallet/bank.png" mode=""></image>
						<view class="paymentlist-span">中国建设银行</view>
					</view>
					<view class="payments-list-right">
						<image src="../../../../static/tabbar/closeraido.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<button class="indexbtn">去支付 ￥100</button>
		<view class="disk" v-if="diskif"></view>
		<!-- 输入密码 -->
		<view class="password" v-if="password">
			<view class="pay-title pay-psd">
				选择支付方式
				<image src="../../../static/Wallet/close.png"></image>
			</view>
			<view class="psd-middle">
				<view class="psd-mid-price">充值金额</view>
				<view class="psd-mid-text">￥100</view>
			</view>
			<view class="psd-input">
				<view class="Num" style="border-color: #000000;">
					<view class="Num-selected"></view>
				</view>
				<view class="Num"></view>
				<view class="Num"></view>
				<view class="Num"></view>
				<view class="Num"></view>
				<view class="Num"></view>
			</view>
		</view>
		<!-- 二维码 -->
		<view class="code" v-if="ifcode">
			<view class="code-close">
				<image src="../../../../static/tabbar/close.png" mode=""></image>
			</view>
			<view class="code-view">
				<view class="codeview-top">
					<view class="codeview-top-tops">本次加油车辆</view>
					<view class="codeview-top-mids">川B 666666</view>
					<view class="codeimg">
						<image src="../../../../static/tabbar/code.png" mode=""></image>
					</view>
					<view class="codeview-top-boms">本次加油100元</view>
				</view>
				<view class="codeview-bom">
					<view class="codeview-bom-top">请在加油站向加油员出示此二维码</view>
					<view class="codeview-bom-bom">有效期24小时</view>
				</view>
			</view>
			<view class="code-savecode">
				保存手机
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:false,//密码框
				diskif:false,//层
				ifcode:false,//二维码生成
			}
		},
		methods: {
			
		}
	}
</script>

<style>

.password{width: 70%;margin: 0 15%;position: absolute;top: 20%;left: 0;background: white;z-index: 9999;border-radius: 10upx;}
.code-view{margin-top: 10%;padding: 0 3%;}
.codeview-top-tops{text-align: center;padding-top: 60upx;padding-bottom: 10upx;}
.codeview-top-mids{text-align: center;font-weight: bold;font-size: 1rem;}
.codeimg{display: flex;justify-content: center;align-items: center;margin-top: 60upx;}
.codeimg image{width: 300upx;height: 300upx;}
.codeview-top-boms{text-align: center;color: red;font-size: 1rem;padding-bottom: 20upx;}
.codeview-bom{background: rgb(246,201,21);border-radius: 0 0 10upx 10upx;}
.codeview-bom-top{text-align: center;padding-top: 100upx;color: white;}
.codeview-bom-bom{text-align: center;color: white;padding-bottom: 40upx;}
.code-savecode{text-align: center;color: white;margin-top: 20upx;}





.codeview-top{background: white;border-radius: 10upx 10upx 0 0;}
.indexbtn{margin:30% 5%;width: 90%;margin-bottom:20upx;height: 100upx;line-height: 100upx;border: 0;background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));font-size:1rem;color: white;}
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;padding-top: 0;}
.payment-top{margin: 0 20upx;box-shadow: 0 0 0.4rem rgba(136, 130, 129, 0.3);border-radius: 10upx;}
.pament-top-top{margin-left: 20upx;margin-top: 10upx;}
.code-close{display: flex;justify-content: flex-end;}
.code-close image{width: 60upx;height: 60upx;margin-right: 20upx;}
.code{width: 100%;position: fixed;top:100upx;left: 0;z-index: 9999;}
.psd-middle{margin-top: 40upx;}
.Num-selected{width: 10upx;height: 10upx;border-radius: 50%;background: black;}
.psd-mid-text{font-size: 1.5rem;font-weight: bold;text-align: center;padding: 20upx;}
.psd-mid-price{text-align: center;font-size: 0.8rem;color: #CCCCCC;}
.Num{width: 60upx;height: 40upx;border-bottom: 1px solid #CCCCCC;padding-bottom: 10upx;text-align: center;display: flex;justify-content: center;align-items: center;}
.pay-title{width: 100%;height: 70upx;line-height: 70upx;text-align: center;font-size: 0.8rem;}
.keyboard-container {position: absolute;top:0;height: 100%;width: 100%;}
.pay-title image{position: absolute;top: 15upx;left: 15upx;width: 40upx;height: 40upx;}
.pay-next{display: flex;align-items: center;}
.wallet-pay{margin: 20upx 0;margin-left: 40upx;}
.psd-input{display: flex;padding: 0 40upx;margin-top: 40upx;justify-content: space-between;margin-bottom: 60upx;}
.pay-psd{border-bottom: 1px solid rgb(240,240,240);}
input{margin-left: 40upx;border-bottom: 1px solid #CCCCCC;padding-bottom: 10upx;}
.pay-next image{width: 40upx;height: 40upx;}
.pay-titles image{right: 0;left: 15upx;}
.disk{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.3);z-index: 999;}
.paymenttop-mid{width: 100%;text-align: center;padding: 80upx 0;font-weight: bold;font-size: .8rem;border-bottom: 1px solid #CCCCCC;}
.paymenttop-bom{display: flex;justify-content: space-between;}
.apymenttop-bom-left{margin-left: 20upx;padding:40upx 0;}
.apymenttop-bom-right{margin-right: 20upx;padding:30upx 0;color: red;font-size: 1rem;}
.payment-lists{display: flex;justify-content: space-between;height: 100upx;border-bottom: 1px solid rgb(245,245,245);}
.payments-list-left image{width: 50upx;height: 50upx;margin-left: 20upx;}
.payments-list-left{display: flex;flex-direction: row;align-items: center;}
.pament-mid{margin-top: 40upx;}
.payments-list-right{display: flex;align-items: center;}
.payments-list-right image{width: 40upx;height: 40upx;margin-right: 20upx;}
.paymentlist-span{margin-left: 20upx;}
.paymentlist-text{margin-left: 20upx;color: #CCCCCC;}
uni-button:after{border: 0;}








</style>
