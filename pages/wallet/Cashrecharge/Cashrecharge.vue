<template>
	<view class="content">
		<view class="select">现金充值</view>
		<view class="cahrge-top">
			<view class="chargeprice">充值金额</view>
			<input type="number" value="" style="margin-left:20upx;" placeholder="请输入充值金额" />
		</view>
		<view class="cahrge-top">
			<view class="chargeprice">支付方式</view>
			<view class="Payments">
				<view class="payment-left">请选择支付方式</view>
				<view class="payment-right">
					<image src="../../../static/Wallet/next.png" mode="" class="img"></image>
				</view>
			</view>		
		</view>
		<button class="cashrebtn" @click="openpay">立即充值</button>
		<!-- 充值 -->
		<view class="disk" v-if="diskif" @click="closepay"></view>
		<view class="Payment" v-if="diskif" :class="{'Payaminate':Payamin}" >
			<view v-if="payone">
				<view class="pay-title">
					现金充值
					<image src="../../../static/Wallet/close.png" @click="closepay"></image>
				</view>
				<view class="cashre-price">
					<view class="prices">充值金额</view>
					<input type="number" value="" placeholder="请输入充值金额"/>
				</view>
				<view class="wallet-pay">
					<view class="pay-text">支付方式</view>
					<view class="wallet-list" @click="Payment">
						<view class="list-left">
							<image src="../../../static/Wallet/weixin.png" mode=""></image>
							<view class="">微信支付</view>
						</view>
						<view class="list-right">
							<image src="../../../static/Wallet/next.png" mode=""></image>
						</view>
					</view>
				</view>
				<button  class="paymentbtn" @tap="Inputpssword">立即支付</button>
			</view>
			<!-- 第二步 -->
			<view v-if="paytwo">
				<view class="pay-title">
					选择支付方式
					<image src="../../../static/Wallet/close.png" @click="closepay"></image>
				</view>
				<view class="pat-list">
					<view class="paylist">
						<view class="palist-left">
							<image src="../../../static/Wallet/price.png" mode=""></image>
							<view class="palist-price">余额</view>
						</view>
						<view class="palist-right">剩余200元</view>
						<view class="pay-ok">
							<image src="../../../static/Wallet/ok.png" mode=""></image>
						</view>
					</view>
					<view class="paylist">
						<view class="palist-left">
							<image src="../../../static/Wallet/weixin.png" mode=""></image>
							<view class="palist-price">微信支付</view>
						</view>
					</view>
					<view class="paylist">
						<view class="palist-left">
							<image src="../../../static/Wallet/zhifubao.png" mode=""></image>
							<view class="palist-price">支付宝支付</view>
						</view>
					</view>
					<view class="paylist">
						<view class="palist-left">
							<image src="../../../static/Wallet/yizhifu.png" mode=""></image>
							<view class="palist-price">翼支付</view>
						</view>
					</view>
					<view class="paylist">
						<view class="palist-left">
							<image src="../../../static/Wallet/wo.png" mode=""></image>
							<view class="palist-price">沃支付</view>
						</view>
					</view>
					<view class="paylist">
						<view class="palist-left">
							<image src="../../../static/Wallet/bank.png" mode=""></image>
							<view class="palist-price">中国建设银行</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 输入密码 -->
		<view class="password" v-if="password">
			<view class="pay-title pay-psd">
				选择支付方式
				<image src="../../../static/Wallet/close.png" @click="closepay"></image>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				diskif:false,//模板层,
				Payamin:false,//支付动画
				payone:true,//第一步
				paytwo:false,
				password:false,
				CountBuyMoney:'0.00',
				payreplacetext:'微信',//获取支付方式
			}
		},
		methods: {
			//关闭付款弹框
			closepay(){
				this.diskif=false
				this.Payamin=false
				this.password=false
			},
			openpay(){
				this.diskif=!this.diskif
				this.Payamin=!this.Payamin
			},
			//选择支付方式
			Payment(){
				this.payone=!this.payone
				this.paytwo=!this.paytwo
			},
			//输入密码
			Inputpssword(){
				this.payone=!this.payone
				this.password=!this.password
			}
		}
	}
</script>

<style>
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;}
.chargeprice{padding-left: 20upx;font-size: 0.8rem;}
input{margin: 40upx 20upx;border-bottom: 1px solid #CCCCCC;padding-bottom: 10upx;}
.Payments{display: flex;justify-content: space-between;margin-left: 20upx;margin-top: 20upx;padding: 20upx 0;}
.payment-left{font-size: 0.7rem;color:#CCCCCC;}
.payment-right{display: flex;justify-content: center;align-items: center;margin-right: 20upx;}
.img{width: 40upx;height: 40upx;}
.cashrebtn{margin: 40% 5%;background: linear-gradient(left,rgb(247,205,22),rgb(246,163,43));}
uni-button:after{border: 0;}
.disk{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 999;}
.Payment{position: absolute;left: 0;bottom: -300px;background: white;width: 100%;z-index: 1000;}
.Payaminate{animation: .2s Paymentamin linear;animation-fill-mode:forwards;}
@keyframes Paymentamin{from{bottom: -300px;}to{bottom:0;}}
.pay-title{width: 100%;height: 70upx;line-height: 70upx;text-align: center;font-size: 0.8rem;}
.keyboard-container {position: absolute;top:0;height: 100%;width: 100%;}
.pay-title image{position: absolute;top: 15upx;left: 15upx;width: 40upx;height: 40upx;}
.pay-next{display: flex;align-items: center;}
.pay-next image{width: 40upx;height: 40upx;}
.pay-titles image{right: 0;left: 15upx;}
.pay-middle{width: 100%;text-align: center;padding: 20upx 0;font-size: 1rem;margin-top: 40upx;border-bottom: 1px solid #ECECEC;}
.pay-active:active{background: #ECECEC;}
.pay-xz{width: 90%;height: 100upx;display: flex;align-items: center;justify-content: space-between;margin: 0 5%;}
.pay-xzs{display: flex;align-items: center;}
.pay-xz image{width: 40upx;height: 40upx;margin-right: 20upx;}
.prices{padding-left: 20upx;font-size: 0.8rem;color: #CCCCCC;margin: 20upx;}

/*  */
.disk{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 999;}
.Payment{position: absolute;left: 0;bottom: -300px;background: white;width: 100%;z-index: 1000;}
.Payaminate{animation: .2s Paymentamin linear;animation-fill-mode:forwards;}
.Num-selected{width: 10upx;height: 10upx;border-radius: 50%;background: black;}
.pay-text{font-size: 0.9rem;}
.psd-mid-text{font-size: 1.5rem;font-weight: bold;text-align: center;padding: 20upx;}
.psd-middle{margin-top: 40upx;}
.Num{width: 60upx;height: 40upx;border-bottom: 1px solid #CCCCCC;padding-bottom: 10upx;text-align: center;display: flex;justify-content: center;align-items: center;}
.psd-input{display: flex;padding: 0 40upx;margin-top: 40upx;justify-content: space-between;margin-bottom: 60upx;}
.pay-psd{border-bottom: 1px solid rgb(240,240,240);}
.palist-right{font-size: 0.8rem;color: #CCCCCC;margin-left: 40upx;}
.list-left{display: flex;align-items: center;flex-direction: row;}
.list-left image{width: 40upx;height: 40upx;}
.psd-mid-price{text-align: center;font-size: 0.8rem;color: #CCCCCC;}
.pat-list{margin-top: 40upx;}
.password{width: 70%;margin: 0 15%;position: absolute;top: 20%;left: 0;background: white;z-index: 9999;border-radius: 10upx;}
.pay-ok{margin-left: 45%;}
.pay-ok image{width: 40upx;height: 40upx;}
.palist-price{font-size: 0.8rem;margin-left: 20upx;}
.palist-left{display: flex;flex-direction: row;}
.palist-left image{width: 40upx;height: 40upx;margin-left: 20upx;}
.paymentbtn{margin: 0 5%;background:linear-gradient(left,rgb(247,205,22),rgb(247,164,44));margin-bottom: 40upx;}
.list-right{display: flex;align-items: center;}
.paylist{display: flex;flex-direction: row;padding: 30upx 0;box-sizing: border-box;border-bottom: 1px solid rgb(250,250,250);}
.list-right image{width: 40upx;height: 40upx;}
.list-left view{margin-left: 20upx;font-size: 0.8rem;}
.wallet-list{display: flex;justify-content: space-between;margin: 20upx 0;margin-bottom: 100upx;padding: 20upx 0;}
.wallet-list:active{background:rgb(250,250,250);}
@keyframes Paymentamin{from{bottom: -300px;}to{bottom:0;}}
.pay-title{width: 100%;height: 70upx;line-height: 70upx;text-align: center;font-size: 0.8rem;}
.keyboard-container {position: absolute;top:0;height: 100%;width: 100%;}
.pay-title image{position: absolute;top: 15upx;left: 15upx;width: 40upx;height: 40upx;}
.pay-next{display: flex;align-items: center;}
.wallet-pay{margin: 20upx 0;margin-left: 40upx;}
input{margin-left: 40upx;border-bottom: 1px solid #CCCCCC;padding-bottom: 10upx;}
.pay-next image{width: 40upx;height: 40upx;}
.pay-titles image{right: 0;left: 15upx;}
.pay-middle{width: 100%;text-align: center;padding: 20upx 0;font-size: 1rem;margin-top: 40upx;border-bottom: 1px solid #ECECEC;}
.pay-active:active{background: #ECECEC;}
.pay-xz{width: 90%;height: 100upx;display: flex;align-items: center;justify-content: space-between;margin: 0 5%;}
.pay-xzs{display: flex;align-items: center;}
.pay-xz image{width: 40upx;height: 40upx;margin-right: 20upx;}
.prices{padding-left: 20upx;font-size: 0.8rem;margin: 20upx;}
.select{padding: 10upx;padding-left: 20upx;font-size: 1rem;font-weight: bold;padding-bottom: 40upx;}
.wallet-parent{overflow-x: scroll;}
.wallet{width: 150%;display: flex;flex-direction: row;}
.wallet-li{height: 400upx;box-shadow: 0 0 0.6rem rgba(136, 130, 129, 0.3);box-sizing: border-box;
margin: 0 20upx;border-radius: 20upx;padding-top: 20upx;}
.wallet-top{margin:40upx 20upx;font-size: 0.8rem;}
.li-parent{
	width: 70%;height:500upx;
}
</style>
