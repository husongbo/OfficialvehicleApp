<template>
  <view class="mask" v-if="show" @touchmove.stop.prevent="moveHandle">
		<!-- 加载动画开始 -->
    <view class="container">
      <!-- <view class="popsicle">
        <view class="colors"></view>
      </view>
      <view class="stick"></view>
      <view class="shadow"></view> -->
			<view class="loading-21">
			  <view></view>
			  <view></view>
			  <view></view>
			  <view></view>
			  <view></view>
			  <view></view>
			</view>
    </view>
		
		<!-- 加载动画结束 -->
		<view class="title">{{text}}</view>
  </view>
  <!-- 遮罩层-->
</template>

<script scoped="true">
export default {
  name: "w-loading",
	props:{
		text: String,
		mask:{
			type:String
		},
		click:{
			type:String
		},
	},
  data() {
    return {
			show: false
		};
  },
	methods:{
		Mclose(){
			if(this.click == 1){
				this.show = false
			}
		},
		moveHandle(){
			return;
		},
		open(){
			this.show = true
    },
    close(){
      this.show = false
    }
	}
};
</script>

<style>
.mask {
  /* pointer-events: none; */
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
	flex-direction:column;
  justify-content: center;
  align-items: center;
	flex-wrap: wrap;
}
.mask.mask-show{
	background: rgba(7, 17, 27, .3);
}
.title{
	color: #fff;
	font-size: 28upx;
}
.container {
  height: 280upx;
  width: 200upx;
}

.popsicle {
  height: 180upx;
  width: 120upx;
  border-radius: 55upx 55upx 10upx 10upx;
  position: relative;
  display: block;
  margin: 0 auto;
  overflow: hidden;
  -webkit-animation: float 2s ease-in infinite alternate;
  animation: float 2s ease-in infinite alternate;
}
.popsicle:before {
  content: "";
  height: 120%;
  width: 140%;
  position: absolute;
  left: -20%;
  top: -10%;
  background-image: -webkit-linear-gradient(
    bottom,
    #f63999 25%,
    #30dcf6 25%,
    #30dcf6 50%,
    #f2d200 50%,
    #f2d200 75%,
    #70ca5c 75%
  );
  background-image: linear-gradient(
    0deg,
    #f63999 25%,
    #30dcf6 25%,
    #30dcf6 50%,
    #f2d200 50%,
    #f2d200 75%,
    #70ca5c 75%
  );
  display: block;
  -webkit-transform: rotate(-20deg);
  transform: rotate(-20deg);
  -webkit-animation: magic 2.5s linear infinite;
  animation: magic 2.5s linear infinite;
}
@-webkit-keyframes magic {
  to {
    background-position: 0 210upx;
  }
}
@keyframes magic {
  to {
    background-position: 0 210upx;
  }
}
.popsicle:after {
  content: "";
  position: absolute;
  left: 10upx;
  bottom: 10upx;
  width: 13upx;
  height: 120upx;
  border-radius: 50upx;
  background: rgba(255, 255, 255, 0.35);
}

.stick {
  width: 38upx;
  height: 45upx;
  background: #e09c5f;
  border-radius: 0 0 12upx 12upx;
  display: block;
  margin: 0 auto;
  -webkit-animation: float 2s ease-in infinite alternate;
  animation: float 2s ease-in infinite alternate;
}
.stick:after {
  display: block;
  content: "";
  width: 100%;
  height: 14upx;
  background: rgba(0, 0, 0, 0.4);
}

@-webkit-keyframes float {
  to {
    -webkit-transform: translateY(20upx);
    transform: translateY(20upx);
  }
}

@keyframes float {
  to {
    -webkit-transform: translateY(20upx);
    transform: translateY(20upx);
  }
}
.shadow {
  width: 124upx;
  height: 35upx;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 60upx / 22upx;
  display: block;
  margin: 0 auto;
  -webkit-transform: scaleY(0.7) translateY(30upx);
  transform: scaleY(0.7) translateY(30upx);
  -webkit-animation: shad 2s ease-in infinite alternate;
  animation: shad 2s ease-in infinite alternate;
}

@-webkit-keyframes shad {
  to {
    -webkit-transform: scaleX(0.9) scaleY(0.7) translateY(30upx);
    transform: scaleX(0.9) scaleY(0.7) translateY(30upx);
  }
}

@keyframes shad {
  to {
    -webkit-transform: scaleX(0.9) scaleY(0.7) translateY(30upx);
    transform: scaleX(0.9) scaleY(0.7) translateY(30upx);
  }
}
.loading-21 view {
  width: 40upx;
  height: 40upx;
  border-radius: 20upx;
  backface-visibility: hidden;
  position: absolute;
  animation-name: move;
  animation-timing-function: cubic-bezier(0.4, 0, 1, 0.8);
  animation-iteration-count: infinite;
  animation-duration: 3s;
  top: calc(50% - 20upx);
  left: 50%;
  transform-origin: -20upx center;
}
.loading-21 view:nth-child(1) {
  background: #226b80;
  animation-delay: -0.5s;
  opacity: 0;
}
.loading-21 view:nth-child(2) {
  background: #226b80;
  animation-delay: -1s;
  opacity: 0;
}
.loading-21 view:nth-child(3) {
  background: #35b0ab;
  animation-delay: -1.5s;
  opacity: 0;
}
.loading-21 view:nth-child(4) {
  background: #c5f0a4;
  animation-delay: -2s;
  opacity: 0;
}
.loading-21 view:nth-child(5) {
  background: #226b80;
  animation-delay: -2.5s;
  opacity: 0;
}
.loading-21 view:nth-child(6) {
  background: #c5f0a4;
  animation-delay: -3s;
  opacity: 0;
}

@keyframes move {
  0% {
    transform: scale(1) rotate(0deg) translate3d(0, 0, 1px);
  }
  30% {
    opacity: 1;
  }
  100% {
    z-index: 10;
    transform: scale(0) rotate(360deg) translate3d(0, 0, 1px);
  }
}
</style>
