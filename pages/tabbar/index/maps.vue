<template>
	<view class="">
		<map v-if="mapIsHidden"  :scale="13"  :latitude="latitude" :longitude="longitude"  :markers="covers">
		</map>
	</view>
</template>

<script>
	import amapFile from '../../../static/js/amap-wx.js'
	export default {
			components: {
				uniDrawer
			},
			data() {
				return {
					keys:'78e2cf5d6b8404995216797147d317c1',//地图key值
					latitude:'',
					longitude:'',
					covers: [{
						latitude:'',
						longitude:''
					}]
				}
			},
			onLoad() {
				this.getmaplocation()
			},
			methods: {
				getmaplocation(){//地图
					var _this=this
					var myAmapFun = new amapFile.AMapWX({key:this.keys});
						myAmapFun.getRegeo({
							success:(data) => {
								console.log(JSON.stringify(data))
								this.latitude=data[0].latitude
								this.longitude=data[0].longitude
								this.covers[0].latitude=this.latitude
								this.covers[0].longitude=this.longitude
								console.log(this.latitude)
								console.log(this.longitude)
							},
							fail:function(){
								console.log('出错了')	
							}
					})
				}
			}
		}
</script>

<style>
</style>
