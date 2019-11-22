<template>
	<view @touchstart="touchstart" @touchmove="touchmove">
		<view class="xqmid">
			<view class="xqmid-shu">
				<view class="shu-left">
					订单号
				</view>
				<view class="shu-right">
					{{Record.Ordernumber}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					油站名称
				</view>
				<view class="shu-right">
					{{Record.Namestation}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					订单金额
				</view>
				<view class="shu-right">
					{{Record.OrderPrice}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					油品类型
				</view>
				<view class="shu-right">
					{{Record.Oiltype}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					电子券码
				</view>
				<view class="shu-right">
					{{Record.couponcode}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					电子券状态
				</view>
				<view class="shu-right">
					{{Record.VoucherStatus}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					单价
				</view>
				<view class="shu-right">
					{{Record.UnitPrice}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					消费升数
				</view>
				<view class="shu-right">
					{{Record.Consumptionrise}}
				</view>
			</view>
			<view class="xqmid-shu">
				<view class="shu-left">
					核销时间
				</view>
				<view class="shu-right">
					{{Record.offtime}}
				</view>
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
				Record:{
					Ordernumber:'',//订单号
					Namestation:'',//油站名称
					OrderPrice:'',//订单金额
					Oiltype:'',//油品类型
					couponcode:'',//电子券码
					VoucherStatus:'',//电子券状态
					UnitPrice:'',//单价
					Consumptionrise:'',//消费升数
					offtime:''//核销时间
				}
				
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
			}
		},
		}
	}
</script>

<style>
		body {
            line-height: 0.7rem;
        }
        .page, .page-group {
            background: #fff;
        }
		.xqmid{
			height: calc(100vh - 44px);
			background: white;
			padding: 20px 5%;
		}
		.xqmid-shu{
			width: 100%;
			height: 50px;
			display: flex;
			flex-direction: row;
			border-bottom: #dfdfdf solid 0.01rem;
			color: #666;
			font-size: 0.8rem;
		}
		.xqmid-shu:active{background: rgb(240,240,240);}
		.shu-left{
			height: 50px;
			line-height: 50px;
			float: left;
			width: 40%;
		}
		.shu-right{
			height: 50px;
			line-height: 50px;
			float: left;
			width: 60%;
		}
</style>
