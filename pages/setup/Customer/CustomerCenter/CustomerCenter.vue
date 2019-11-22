<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="select">客服中心</view>
		<view class="customer-qusetion">
			常见问题
		</view>
		<view class="custoremer-list">
			<view class="list" v-for="(item,index) in Customerlist" :key="index" @click="Gotolist(item.id)">
				{{item.text}}
			</view>
		</view>
		<view class="Contact">联系我们</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Customerlist:[
					{id:1,text:'1.支付时提示额度不够怎么办',url:'../Customerone/Customerone'},
					{id:2,text:'2.U先生可以在哪些方面使用',url:''},
					{id:3,text:'3.怎么开发票',url:''},
					{id:4,text:'4.为什么要实名认证',url:''},
					{id:5,text:'5.企业额度怎么提升',url:''}
				],
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			}
		},
		methods: {
			Gotolist(e){//选择项
				var _this=this
				this.Customerlist.forEach((item)=>{
					if(e==item.id){
						_this.Urladress(item.url)
						return;
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
.select{padding: 10upx;padding-left: 20upx;font-size: 1.5rem;font-weight: bold;padding-bottom: 40upx;}
.customer-qusetion{width: 200upx;height: 80upx;background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));border-radius: 50upx;margin-left: 20upx;text-align: center;line-height: 80upx;
font-size: 0.9rem;}
.custoremer-list{margin-top: 40upx;}
.list{padding: 20upx 0;border-bottom: 1px solid rgb(240,240,240);padding-left: 20upx;}
.list:active{background: rgb(250,250,250);}
uni-button{border: 0;}
.Contact{margin: 30% 20%;margin-bottom: 0;border: 0;background: linear-gradient(left,rgb(247,206,19),rgb(246,163,45));border-radius: 50upx;width: 60%;height: 80upx;line-height: 80upx;
text-align: center;}
</style>
