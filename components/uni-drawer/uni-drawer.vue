<template>
	<view class="">
		<view class="header-parent"></view>
		<view v-if="visibleSync" class="uni-drawer" @touchmove.stop.prevent="moveHandle" :class="{'uni-drawer--visible':showDrawer,'uni-drawer--right':rightMode}" @touchstart="touchstart" @touchmove="touchmove">
			<view class="uni-drawer__mask" @tap="close"></view>
			<view class="uni-drawer__content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uni-drawer',
		props: {
			/**
			 * 显示状态
			 */
			visible: {
				type: Boolean,
				default: false
			},
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: String,
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: [Boolean, String],
				default: true
			}
		},
		data() {
			return {
				visibleSync: false,
				showDrawer: false,
				rightMode: false,
				closeTimer: null,
				watchTimer: null,
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			}
		},
		watch: {
			visible(val) {
				clearTimeout(this.watchTimer)
				setTimeout(() => {
					this.showDrawer = val
				}, 50)
				if (this.visibleSync) {
					clearTimeout(this.closeTimer)
				}
				if (val) {
					this.visibleSync = val
				} else {
					this.watchTimer = setTimeout(() => {
						this.visibleSync = val
					}, 50)
				}
			}
		},
		created() {
			this.visibleSync = this.visible
			setTimeout(() => {
				this.showDrawer = this.visible
			}, 50)
			this.rightMode = this.mode === 'right'
		},
		methods: {
			close() {
				this.showDrawer = false
				this.closeTimer = setTimeout(() => {
					this.visibleSync = false
					this.$emit('close')
				}, 200)
			},
			touchstart(event){
				event.preventDefault();
　　　　			this.startX = event.touches[0].pageX
			},
			touchmove(event){
				event.preventDefault();
		　　　　this.moveEndX = event.touches[0].pageX
				this.valueX= this.moveEndX - this.startX
				if ( this.valueX <= -90 ) {
					// this.$emit('backs',this.valueX)
					return;　	
		　　　　}
		　　　　else{
		　　　　　　return
		　　　　}
			},
			moveHandle() {}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.uni-drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		visibility: hidden;
		z-index:1000;
		height: 100%
	}

	.uni-drawer.uni-drawer--right .uni-drawer__content {
		left: auto;
		right: 0;
		transform: translatex(100%)
	}

	.uni-drawer.uni-drawer--visible {
		visibility: visible
	}

	.uni-drawer.uni-drawer--visible .uni-drawer__content {
		transform: translatex(0)
	}

	.uni-drawer.uni-drawer--visible .uni-drawer__mask {
		display: block;
		opacity: 1
	}

	.uni-drawer__mask {
		display: block;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
		transition: opacity .2s
	}

	.uni-drawer__content {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 80%;
		height: 100%;
		z-index: 999;
		background: #fff;
		transition: all .2s ease-out;
		transform: translatex(-100%)
	}
	.header-parent{height: var(--status-bar-height);width: 100%;}
</style>