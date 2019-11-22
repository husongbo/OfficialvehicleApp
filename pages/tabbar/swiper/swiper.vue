<template>
	<view>
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
    <swiper class="swiper-box" @change="change">
        <swiper-item v-for="(item ,index) in info" :key="index" style="background: red;width: 80%!important;">
            <view class="swiper-item" style="width: 80%;">
                {{item.content}}
            </view>
        </swiper-item>
    </swiper>
</uni-swiper-dot>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot.vue'
	export default {
		components: {uniSwiperDot},
		data() {
			return {
				
				current: 0,
				mode: 'default',
			}
		},
		methods: {
			change(e) {
            this.current = e.detail.current;
        }
		}
	}
</script>

<style>
uni-swiper .uni-swiper-slide-frame{
	width: 80%!important;
}
</style>
