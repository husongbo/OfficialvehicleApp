<template>
	<view class="page-body" style="overflow-y: hidden;" :style="{height:MapHeight}">
		<view class="maps" v-if="OpenMap" :style="{height:MapHeight}">
		<view class="buttons" :style="{height:titleheight}">
			<view class="left" :class="{'bom':mapleft}" @click="mapleftmethods">
				地图
			</view>
			<view class="right" :class="{'bom':mapright}" @click="maprightmethods">
				列表
			</view>
		</view>
		<view class="page-section page-section-gap" :style="{display:maptrue}">
            <map style="width: 100%;" :style="{height:mapsheight}" :scale="13"   :circles="circle" :latitude="latitude" :longitude="longitude"  :markers="covers"  @controltap="clickcontrol" @markertap="dianclick" >
				<!-- :controls="controlss" -->
            </map>	
        </view>
		<view class="page-section page-section-gap slects" :style="{display:maplbtrue}">
		    <view class="slects-lb" v-for="(item,index) in coverlist" :key="index" @click="getMappos(item)">
				<view class="select-btn-left">
					<view style="font-size: 0.8rem;">{{item.name}}</view>
					<view style="font-size: 0.6rem;color: #C7C7CC;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.address}}</view>
				</view>
				<view class="select-btn-right">
					<view style="font-size: 0.7rem;color: #C7C7CC;">{{item.distances}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="mapbtn-jy" @click="Gorefueling">去加油</view> -->
		<!-- <view class="mapdistance" v-if="mappos">
			<view class="mapdis">
			<view class="mapdis-top">{{mapdisgood.name}}</view>
			<view class="mapdis-bom">{{mapdisgood.distance}}&nbsp;|&nbsp;{{mapdisgood.address}}</view>
			</view>
			<view class="mapdisbtn">
			<view class="mapbtn" @click="Gomap" style="margin-left: 30upx;margin-right: 10upx;">导航</view>
			</view>
		</view> -->
		<view class="mapdistance" v-if="mappos">
			<view class="mapdis">
			<view class="mapdis-top">延长壳牌绵阳游仙仙海加油站</view>
			<view class="mapdis-bom">2km&nbsp;|&nbsp;108国道仙海水利风景区入口处西侧</view>
			</view>
			<view class="mapdisbtn">
			<view class="mapbtn" @click="Gomap" style="margin-left: 30upx;margin-right: 10upx;">导航</view>
			</view>
		</view>
		</view>
		<view class="CloseMap" style="width: 100%;background: white;" v-if="CloseMaps">
			<view class="Closemap-img" style="display: flex;justify-content: center;margin-top: 30%;">
				<image src="../../../static/no.png" mode="" style="width: 200upx;height: 200upx;"></image>
			</view>
			<view style="text-align: center;color: #C0C0C0;font-size: 0.8rem;margin-top: 5%;">地图加载失败，请检查网络是否良好</view>
		</view>
		<w-loading :text="loadingtext" mask="0" click="0" ref="loading"></w-loading>
	</view>
</template>
<script>
	import amapFile from '../../../common/vmeitime-http/amap-wx.js'
	import CityJson from '../../../json.js'
	export default {
        data() {
			return {
				keys:'78e2cf5d6b8404995216797147d317c1',//地图key值
				maptrue:'block',
				mapleft:true,
				mapright:false,
				maplbtrue:'none',
				mappos:true,
				title: 'map',
				latitude:'',
				longitude:'',
				loadingtext:'',
				clcikId:'',//单击的ID
				thousand:1000,
				trips:'',
				polylines: [],
				circle:[{}],
				selectedindex:0,//判断是否选择了列表
				mapdisgood:{
					name:'',
					address:'',
					distance:'',
					latitude:'',
					longitude:''
				},
				covers: [{
					latitude:'',
					longitude:'',
					iconPath: '../../../static/tabbar/loca.png',
					label:{
						content:"",
						color:"#FCFCFC",
						fontSize:20,
						bgColor:"#FF8C69",
						borderWidth:50,
						borderColor:"#FF8C69",
						padding:20,
						textAlign:"center"
					}
				}],
				controlss:[{
					id:1,
					position:{
						left:10,
						top:420,
						width:30,
						height:30
					},
					iconPath:'../../../static/map/map.png',
					clickable:true
				}],
			scale:10,
			coverlist:[],//数据
			Pos:'',//当前位置
			City:'',
			OpenMap:false,
			CloseMaps:false,
			locationlat:'',
			locationlon:'',
			CityArr:'',
			CityCode:'',
			ArrLocation:[],
			MapHeight:'',
			titleheight:'',
			gotoheight:'',
			mapsheight:'',
			}
        },
      mounted() {
		console.log("开始了")
		 var that = this;
		uni.getSystemInfo({
			success: function (res) {
				var heights=res.windowHeight
				that.MapHeight=(heights)+'px'
				that.titleheight='45px'
				that.gotoheight='85px'
				that.mapsheight=(heights-130)+'px'
				console.log(res.windowHeight);
			}
		});
		this.CityArr=CityJson.City
		// console.log(this.CityArr)
       
		uni.getNetworkType({
			success: function (res) {
				console.log(res)
				// console.log(res.networkType)
				if(res.networkType=='none'){
					// console.log(res.networkType)
					that.CloseMaps=true
					return;
				}
				that.$refs.loading.open()
				that.getmaplocation() 
				that.checkPermissionPos()	
			}
		});
		 uni.onNetworkStatusChange(function (res) {
			 console.log(res)
			 if(!res.isConnected){
				 that.OpenMap=false
				 that.CloseMaps=true
				 that.controlss[0].position.top='1000'
				 // console.log(res.isConnected);
				 // console.log(res.networkType);
				 return;
			 }
			 that.$refs.loading.open()
			 that.getmaplocation() 
			 that.checkPermissionPos()
			// console.log(res.isConnected);
			// console.log(res.networkType);
		});
		
     },
	
     methods: {
		 //标记点单击事件
      	dianclick(e){
			this.clcikId=parseInt(e.mp.markerId)
			for(var i=0;i<this.coverlist.length;i++){
				if(this.coverlist[i].id==this.clcikId){
					this.mapdisgood.name=this.coverlist[i].name
					this.mapdisgood.address=this.coverlist[i].address
					this.mapdisgood.distance=this.coverlist[i].distances
					this.mapdisgood.latitude=this.coverlist[i].latitude
					this.mapdisgood.longitude=this.coverlist[i].longitude
					// console.log(JSON.stringify(this.covers[i]))
					// this.mappointers()
				}
				// this.covers[i].iconPath='../../../static/app-plus/dao.png'
			}
			
		},
		//点击控件
		clickcontrol(e){
			this.latitude=this.locationlat
			this.longitude=this.locationlon
		},
		//转换
		SaveLocation(lat,lon,item){
			var distance=this.getDisance(this.latitude,this.longitude,lat,lon)
			var transfor=this.Transformation(distance)
			var jsontext={
				latitude:lat,
				longitude:lon,
				iconPath: '../../../static/img/tuss.png',
				id:item.id,
				address:item.address,
				name:item.station,
				distances:transfor.middles,
				label:{
					content:'',
				},
				mid:transfor.mid
			}
			this.covers.push(jsontext)
			this.coverlist.push(jsontext)
			
		},
		//排序
		sortDistances(a,b){
			a=parseFloat(a.mid)
			b=parseFloat(b.mid)
			return a-b
		},
		bd_decrypt(bd_lng, bd_lat) {
			var X_PI = Math.PI * 3000.0 / 180.0;
			var x = bd_lng - 0.0065;
			var y = bd_lat - 0.006;
			var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
			var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
			var gg_lng = z * Math.cos(theta);
			var gg_lat = z * Math.sin(theta);
			return {lng: gg_lng, lat: gg_lat}
		},
		//获取附近位置
		getmaplocation(){
			var _this=this
			var myAmapFun = new amapFile.AMapWX({key:this.keys});
					myAmapFun.getRegeo({
						success:(data) => {
							// console.log(JSON.stringify(data))
							this.latitude=data[0].latitude
							this.longitude=data[0].longitude
							this.locationlat=data[0].latitude
							this.locationlon=data[0].longitude
							this.Pos=this.longitude+","+this.latitude
							this.circle[0].latitude=this.latitude
							this.circle[0].longitude=this.longitude
							this.covers[0].latitude=this.latitude
							this.covers[0].longitude=this.longitude
							this.circle[0].color="#FF0000"
							this.circle[0].fillColor="#FF0000"
							this.circle[0].radius=50
							// console.log(this.latitude)
							// console.log(this.longitude)
							this.City=data[0].regeocodeData.addressComponent.city
							this.CityArr.forEach((item)=>{
								if(item.text==_this.City){
									_this.CityCode=item.id
								}
							})
							// console.log("当前的值"+_this.CityCode)
							var datas=`{method:"GetStationInfo",city_code:"${this.CityCode}"}`
							console.log(JSON.stringify(datas))
							uni.request({
								url: 'http://smstest.youxinbao.com.cn/App/Common/CSharp/app/user/UserInfo.ashx',
								data:{
									params:datas
								},
								success: (res) => {
									// console.log(JSON.stringify(res));
									if(res.data.result==1){
										// _this.ArrLocation=JSON.parse(res.data.data)
										_this.ArrLocation=eval(res.data.data)
										_this.ArrLocation.forEach((item)=>{
											var ggLocation=_this.bd_decrypt(item.longitude,item.latitude)
											_this.SaveLocation(ggLocation.lat,ggLocation.lng,item)
										})
										_this.coverlist.sort(_this.sortDistances)
										_this.coverlist[0].label.content=_this.coverlist[0].name
										_this.mapdisgood.name=_this.coverlist[0].name
										_this.mapdisgood.address=_this.coverlist[0].address
										_this.mapdisgood.distance=_this.coverlist[0].distances
										_this.mapdisgood.latitude=_this.coverlist[0].latitude
										_this.mapdisgood.longitude=_this.coverlist[0].longitude
										_this.$refs.loading.close()
										_this.OpenMap=true
									}
								}
							});
						},
						fail:function(err){
							console.log(err)
						}
					})
		},
		mappointers(){
			this.polylines=[]
			this.polylines.push({
				points:[{
						longitude:this.longitude,
						latitude:this.latitude,
					},{
						longitude:this.mapdisgood.longitude,
						latitude:this.mapdisgood.latitude,
					}],
						color: "#FF6347",
						width: 5,
						dottedLine: false,
						borderWidth:3
			})
		},
		mapleftmethods(){
			this.mapleft=true
			this.mapright=false
			this.maptrue='block'
			this.maplbtrue='none'
			this.mappos=true
			this.controlss[0].position.top='420'
		},
		maprightmethods(){
			this.mapleft=false
			this.mapright=true
			this.maptrue='none'
			this.maplbtrue='block'
			this.mappos=false
			this.controlss[0].position.top='1000'
		},
		toRad(d){
			return d * Math.PI / 180;
		},
		getDisance(lat1, lng1, lat2, lng2){
			var dis = 0;
			var radLat1 = this.toRad(lat1);
			var radLat2 = this.toRad(lat2);
			var deltaLat = radLat1 - radLat2;
			var deltaLng = this.toRad(lng1) - this.toRad(lng2);
			var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
			return dis * 6378137;
		},
		Transformation(item){
			var val=parseInt(item)
			if(val<this.thousand){
				return {middles:val+"m",mid:val*0.001}
			}
			var thounds=parseInt(val/this.thousand)
			var mintes=parseInt(val%this.thousand).toString()
			mintes=mintes.substring(0,2)
			return {middles:thounds+"."+mintes+"km",mid:thounds+"."+mintes}
		},
		Gomap(){	
			// console.log(this.mapdisgood.latitude)
			// console.log(this.mapdisgood.longitude)
			uni.openLocation({
				name:this.mapdisgood.name,
				address:this.mapdisgood.address,
				latitude: parseFloat(this.mapdisgood.latitude), // 纬度，范围为-90~90，负数表示南纬
				longitude: parseFloat(this.mapdisgood.longitude), // 经度，范围为-180~180，负数表示西经
				scale: 28 // 缩放比例          
			})
		},
		//列表单击事件
		getMappos(item){
			this.coverlist.forEach((items)=>{
				if(items.id==item.id){
					items.label.content=items.name
				}
				else{
					items.label.content=''
				}
			})
			this.mapdisgood.name=item.name
			this.mapdisgood.address=item.address
			this.mapdisgood.distance=item.distances
			this.mapdisgood.latitude=item.latitude
			this.mapdisgood.longitude=item.longitude
			this.latitude=item.latitude
			this.longitude=item.longitude
			// this.selectedindex++;
			this.mapleftmethods()
			// this.getmaplocation()
			this.mappointers()
			// console.log(JSON.stringify(item))
			
		},
		//判断是否有权限
		checkPermissionPos(){
			plus.geolocation.getCurrentPosition(function(p){
					// plus.nativeUI.alert('当前地址经纬度:'+p.coords.latitude+"---"+p.coords.longitude);
					console.log('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
					
				}, function(e){
					// plus.nativeUI.alert('当前定位失败');
					// console.log('Gelocation Error: code - ' + e.code + '; message - ' + e.message);
					switch(e.code) {
					  case e.PERMISSION_DENIED:
						 plus.nativeUI.alert('用户拒绝了地理定位请求.');
						  break;
					  case e.POSITION_UNAVAILABLE:
						  plus.nativeUI.alert('位置信息不可用.');
						  break;
					  case e.TIMEOUT:
						  plus.nativeUI.alert('获取用户位置的请求超时.');
						  break;
					  case e.UNKNOWN_ERROR:
						  plus.nativeUI.alert('未知错误.');
						  break;
					  }
				});

		},
		//去加油
		Gorefueling(){
			uni.navigateTo({
			    url: '../../function/Buygasrolls/Buygasrolls',
				animationType: 'pop-in',
				animationDuration: 200
			})
		}
     }
}
</script>

<style>
	.mapdis-top,.mapdis-bom{
		margin: 15upx;
		font-size: 0.9rem;
		margin-bottom: 0;
	}
	.mapdis-bom{
		font-size: 0.6rem;
	}
	.mapdisbtn{
		width: 40%;
		display: flex;
		justify-content: center;
		/* align-items: center; */
	}
	uni-button:after{
		border: 0;
	}
	.mapbtn{
		background: rgb(50,133,253);
		color: white;
		width: 100upx;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		border-radius: 50%;
		font-size: 0.6rem;
		box-shadow: 0px 1px 10px rgba(50,133,253,0.8);
		margin-top: 40upx;
	}
	.mapbtn-jy{
		background: rgb(254,163,60);
		color: white;
		width: 100upx;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		border-radius: 50%;
		font-size: 0.6rem;
		box-shadow: 0px 1px 10px rgba(254,163,60,0.8);
		margin-top: 40upx;
	}
	.page-body{
		position: relative;
	}
	.mapdistance{
		width: 100%;
		/* height:calc(100vh - 1000upx - 110upx); */
		background: white;
		z-index: 9999;
		display: flex;
		flex-direction: row;
	}
	.mapdis{
		width: 70%;
	}
	.select-btn-left{
		width: 80%;
		height:120upx;
		padding: 10px 0;
	}
	.select-btn-right{
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.slects-lb{
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		border-bottom: 1px solid #C7C7CC;
		/* padding: 20upx 0; */
		
	}
	.slects-lb:active{
		background: #ECECEC;
	}
	.slects{
		height: 90vh;
		overflow-y: scroll;
		padding-left: 20upx;
		padding-top: 10upx;
		background: white;
	}
	.content{
		width: 100%;
		height: 100%;
	}
	.buttons{
		/* height:100upx; */
		width: 100%;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		border-bottom: 1px solid #CCCCCC;
	}
	.buttons .left,.buttons .right{
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(2,119,255);
		font-size: 0.9rem;
		background: white;
		
	}
	.bom{
		box-sizing: border-box;
		border-bottom: 2px solid rgb(2,119,255);
	}
	.Closemap-img{
	
	}
</style>
