<template>
	<view>
		<view class="cover-container" :style="[{transform: coverTransform,transition: coverTransition}]" @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend" ></view>
	</view>
</template>

<script>
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		data() {
			return {
				coverTransform: 'translateY(0)',
				coverTransition: '0s',
				moving: false,
			}
		},
		mounted() {
			
		},
		methods: {
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
				console.log(startY)
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				console.log("移动"+moveY)
				let moveDistance = moveY - startY;
				console.log(moveDistance)
				// if(moveDistance > 0){
				// 	this.moving = false;
				// 	return;
				// }
				this.moving = true;
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
				// 	
				if(moveDistance < 0 && moveDistance >= -80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateX(0px)';
			}
		}
	}
</script>

<style>
	.cover-container{
		background: red;
		width: 100%;
		height:1200upx;
	}
</style>
