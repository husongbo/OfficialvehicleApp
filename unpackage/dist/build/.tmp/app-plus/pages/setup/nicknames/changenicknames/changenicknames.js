(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setup/nicknames/changenicknames/changenicknames"],{"04c0":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})},"15b8":function(e,n,t){"use strict";(function(e){t("d7b2"),t("921b");o(t("66fd"));var n=o(t("9738"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},5904:function(e,n,t){"use strict";t.r(n);var o=t("599d"),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n["default"]=a.a},"599d":function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=r(t("d45d")),i=t("2f62");function r(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){u(e,n,t[n])})}return e}function u(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var c={data:function(){return{len:0,startX:0,moveEndX:0,valueX:0,User:{name:"",YZM:/^[\u4e00-\u9fa5]+$/},nameflag:!0,PlacrHoloder:""}},computed:(0,i.mapState)(["LoginFlag","UserLogin"]),onLoad:function(){"未设置"==this.UserLogin.UserInfo.real_name?this.User.name="":this.User.name=this.UserLogin.UserInfo.real_name,console.log(e(this.User.name," at pages\\setup\\nicknames\\changenicknames\\changenicknames.vue:44"))},methods:s({},(0,i.mapMutations)(["information"]),{touchstart:function(e){e.preventDefault(),this.startX=e.touches[0].pageX},touchmove:function(e){return e.preventDefault(),this.moveEndX=e.touches[0].pageX,this.valueX=this.moveEndX-this.startX,this.valueX>=80?void o.navigateBack({delta:1,animationType:"pop-in",animationDuration:200}):void this.valueX},visPsd:function(){""!=this.User.name&&(this.User.name="")},Gologintwo:function(){var n=this;this.$api.ChekcToken(this.$store.state.UserLogin.SessionFlag).then(function(t){if(0!=t.data.result)return o.showToast({title:"你的账户已在别处登录，如不是本人请尽快修改密码",duration:2e3,icon:"none"}),n.$store.commit("RemoveLoginOut"),void setTimeout(function(){o.navigateTo({url:"/pages/login/UserLoginPhone/UserLoginPhone",animationType:"pop-in",animationDuration:200})},2e3);var i=n;if(n.nameflag){if(n.nameflag=!1,""==n.User.name||null==n.User.name)return void o.showToast({title:"文本框不能为空",duration:1e3,icon:"none",success:function(){i.nameflag=!0}});if(!n.User.YZM.test(n.User.name))return void o.showToast({title:"请输入只包含中文用户名",duration:1e3,icon:"none",success:function(){i.nameflag=!0}});var r={user_id:i.UserLogin.UserInfo.user_id,real_name:i.User.name,driver_id:i.UserLogin.UserInfo.driver_id,contry:"中国",province:i.UserLogin.UserInfo.province,city:i.UserLogin.UserInfo.city,address:i.UserLogin.UserInfo.address,email:i.UserLogin.UserInfo.email,phone:i.UserLogin.UserInfo.phone.trim()},s=a.default.encrypt(JSON.stringify(r),"a0bdac13b5cb2c2acf8f7j0f737aa78b");o.request({url:"http://gwyc.youxinbao.com.cn/public/UpdateUserInfo",data:{post_params:s},success:function(n){return console.log(e(n," at pages\\setup\\nicknames\\changenicknames\\changenicknames.vue:138")),0==n.data.result?(i.UserLogin.UserInfo.real_name=i.User.name,i.$refs.loading.open(),void setTimeout(function(){i.information(i.UserLogin.UserInfo),i.$refs.loading.close(),o.showToast({title:"昵称修改成功",duration:1e3,icon:"none"}),setTimeout(function(){o.navigateBack({delta:1,animationType:"pop-in",animationDuration:200})},1e3)},2e3)):1==n.data.result?(i.$refs.loading.open(),void setTimeout(function(){i.$refs.loading.close(),o.showToast({title:"昵称修改失败",duration:1e3,icon:"none"})},2e3)):void 0},fail:function(n){console.log(e(n," at pages\\setup\\nicknames\\changenicknames\\changenicknames.vue:174"))}})}})}})};n.default=c}).call(this,t("0de9")["default"],t("6e42")["default"])},9738:function(e,n,t){"use strict";t.r(n);var o=t("04c0"),a=t("5904");for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);t("ef08");var r=t("2877"),s=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},ef08:function(e,n,t){"use strict";var o=t("f32b"),a=t.n(o);a.a},f32b:function(e,n,t){}},[["15b8","common/runtime","common/vendor"]]]);