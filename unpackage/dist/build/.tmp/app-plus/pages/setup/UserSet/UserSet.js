(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setup/UserSet/UserSet"],{2109:function(e,t,n){"use strict";n.r(t);var o=n("5332"),i=n("48de");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("be5b");var s=n("2877"),r=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports},3525:function(e,t,n){"use strict";(function(e){n("d7b2"),n("921b");o(n("66fd"));var t=o(n("2109"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"48de":function(e,t,n){"use strict";n.r(t);var o=n("f56c"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=i.a},5332:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})},8510:function(e,t,n){},be5b:function(e,t,n){"use strict";var o=n("8510"),i=n.n(o);i.a},f56c:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("2f62");a(n("d45d"));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){r(e,t,n[t])})}return e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){return n.e("components/dialog").then(n.bind(null,"6123"))},l={components:{simpleDialog:u},data:function(){return{UserSetList:[{id:1,img:"../../../static/Wallet/next.png",text:"密码修改",url:"../ChangePassword/ChangePsd/ChangePsd",flag:!0},{id:2,img:"../../../static/Wallet/next.png",text:"设置支付密码",url:"../changephone/changephoneone/changephoneone",flag:!0},{id:3,img:"../../../static/Wallet/next.png",text:"实名认证",url:"../InformationRenz/InformationRenz",flag:!0},{id:4,img:"../../../static/Wallet/next.png",text:"联系我们",url:"",flag:!0},{id:5,img:"../../../static/Wallet/next.png",text:"关于U先生",url:"",flag:!0}],len:0,startX:0,moveEndX:0,valueX:0,Userimg:"../../../static/Set/boy.png",Infomation:{img:"",name:""},UserInfo:"",sDialog:{message:"你还没有登录，是否前往登录",title:""},flagpayment:!0}},onLoad:function(){this.LoginFlag?(this.UserInfo=this.UserLogin.UserInfo,this.Infomation.img="../../../static/Set/boy.png",this.Infomation.name=this.UserInfo.real_name):(this.UserInfo="",this.Infomation.img="../../../static/Set/boy.png",this.Infomation.name="游客")},watch:{UserLogin:function(t,n){console.log(e("hgdsadgbhbagdhadadkahdkdhakjdhakdhakhdkahda"," at pages\\setup\\UserSet\\UserSet.vue:75")),this.UserLogin=t,this.Infomation.name=this.UserLogin.UserInfo.real_name},LoginFlag:function(e,t){this.LoginFlag=e}},computed:{LoginFlag:{get:function(){return this.$store.state.LoginFlag},set:function(e){this.$store.state.LoginFlag=e}},UserLogin:{get:function(){return this.$store.state.UserLogin},set:function(e){this.$store.state.UserLogin=e}}},methods:s({},(0,i.mapMutations)(["RemoveLoginOut"]),{ifpayment:function(t){var n=this,i={phone:this.UserLogin.UserInfo.phone};this.$api.CheckUserTradePwd(i).then(function(t){console.log(e(t," at pages\\setup\\UserSet\\UserSet.vue:109")),1==t.data.result?n.Urladress("../changephone/changephoneone/changephoneone"):o.showToast({title:"你已设置支付密码",duration:1e3,icon:"none"})})},Gotolist:function(e){var t=this;this.UserSetList.forEach(function(n){if(e==n.id)return 1==e||2==e||3==e?2==e?void t.ifpayment(n.url):t.LoginFlag?void t.Urladress(n.url):void t.$refs.simpleDialog2.confirm({title:"提示！",message:t.sDialog.message}):void t.Urladress(n.url)})},confirmButton:function(){console.log(e("Dialog 确定按钮点击"," at pages\\setup\\UserSet\\UserSet.vue:149")),this.Urladress("../../login/login/login")},cancelButton:function(){console.log(e("Dialog 取消按钮点击"," at pages\\setup\\UserSet\\UserSet.vue:153"))},Urladress:function(e){o.navigateTo({url:e,animationType:"pop-in",animationDuration:200})},LoginOut:function(){var e=this;this.$refs.loading.open(),setTimeout(function(){e.$refs.loading.close(),o.showToast({title:"退出成功",duration:1e3,icon:"none"}),setTimeout(function(){e.RemoveLoginOut(),o.navigateBack({delta:1,animationType:"pop-out",animationDuration:200})},1e3)},1500)},touchstart:function(e){e.preventDefault(),this.startX=e.touches[0].pageX},touchmove:function(e){return e.preventDefault(),this.moveEndX=e.touches[0].pageX,this.valueX=this.moveEndX-this.startX,this.valueX>=80?void o.navigateBack({delta:1,animationType:"pop-in",animationDuration:200}):void this.valueX},EditName:function(){var e=this;this.LoginFlag?o.navigateTo({url:"../nicknames/changenicknames/changenicknames",animationType:"pop-in",animationDuration:200}):e.$refs.simpleDialog2.confirm({title:"提示！",message:e.sDialog.message})},ChangeImg:function(){var t=this;o.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(n){console.log(e(n.tempFilePaths," at pages\\setup\\UserSet\\UserSet.vue:242")),o.saveFile({tempFilePath:n.tempFilePaths[0],success:function(n){var o=n.savedFilePath;t.Userimg=o,t.Infomation.img=o,console.log(e(t.Userimg," at pages\\setup\\UserSet\\UserSet.vue:249"))}})},fail:function(t){console.log(e(JSON.stringify(t)," at pages\\setup\\UserSet\\UserSet.vue:254"))}})}})};t.default=l}).call(this,n("0de9")["default"],n("6e42")["default"])}},[["3525","common/runtime","common/vendor"]]]);