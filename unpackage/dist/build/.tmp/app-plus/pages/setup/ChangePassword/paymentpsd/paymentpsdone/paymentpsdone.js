(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setup/ChangePassword/paymentpsd/paymentpsdone/paymentpsdone"],{"0cfb":function(e,t,s){},"1fc4":function(e,t,s){"use strict";s.r(t);var n=s("8eb2"),a=s("7daf");for(var o in a)"default"!==o&&function(e){s.d(t,e,function(){return a[e]})}(o);s("4b71");var i=s("2877"),r=Object(i["a"])(a["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports},"4b71":function(e,t,s){"use strict";var n=s("0cfb"),a=s.n(n);a.a},"7daf":function(e,t,s){"use strict";s.r(t);var n=s("ec71"),a=s.n(n);for(var o in n)"default"!==o&&function(e){s.d(t,e,function(){return n[e]})}(o);t["default"]=a.a},"8eb2":function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=(e._self._c,Array.isArray(e.User.password));e._isMounted||(e.e0=function(t){var s=e.User.password,n=t.target,a=!!n.checked;if(Array.isArray(s)){var o="",i=e._i(s,o);n.checked?i<0&&e.$set(e.User,"password",s.concat([o])):i>-1&&e.$set(e.User,"password",s.slice(0,i).concat(s.slice(i+1)))}else e.$set(e.User,"password",a)}),e.$mp.data=Object.assign({},{$root:{g0:s}})},a=[];s.d(t,"a",function(){return n}),s.d(t,"b",function(){return a})},ec71:function(e,t,s){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=s("2f62"),o={data:function(){return{len:0,startX:0,moveEndX:0,valueX:0,User:{phone:"",password:"",pwd_type:2},FlagUserPsd:!0,Yz:/^[0-9]{6}$/,psd:"password",psdeyeimg:"../../../../../static/login/eyes.png",psdeysflag:!1}},computed:(0,a.mapState)(["LoginFlag","UserLogin"]),onLoad:function(){console.log(e(this.UserLogin.UserInfo.phone," at pages\\setup\\ChangePassword\\paymentpsd\\paymentpsdone\\paymentpsdone.vue:41")),this.User.phone=this.UserLogin.UserInfo.phone.trim()},methods:{touchstart:function(e){e.preventDefault(),this.startX=e.touches[0].pageX},visPsd:function(){if(!this.psdeysflag)return this.psdeyeimg="../../../../../static/login/eye.png",this.psd="text",void(this.psdeysflag=!0);this.psdeysflag&&(this.psdeyeimg="../../../../../static/login/eyes.png",this.psd="password",this.psdeysflag=!1)},Gologintwo:function(){var e=this;if(this.FlagUserPsd){var t=this;if(this.FlagUserPsd=!1,""==this.User.password)return void n.showToast({title:"不能为空，请继续输入",duration:1e3,icon:"none",success:function(){t.FlagUserPsd=!0}});if(!this.Yz.test(this.User.password))return void n.showToast({title:"请正确输入6位数的密码",duration:1e3,icon:"none",success:function(){t.FlagUserPsd=!0,t.User.password=""}});t.$refs.loading.open(),setTimeout(function(){t.$refs.loading.close(),t.FlagUserPsd=!0,n.navigateTo({url:"../paymentthree/paymentthree?oldpsd=".concat(e.User.password),animationType:"pop-in",animationDuration:200})},1e3)}},touchmove:function(e){return e.preventDefault(),this.moveEndX=e.touches[0].pageX,this.valueX=this.moveEndX-this.startX,this.valueX>=80?void n.navigateBack({delta:1,animationType:"pop-in",animationDuration:200}):void this.valueX}}};t.default=o}).call(this,s("0de9")["default"],s("6e42")["default"])},feca:function(e,t,s){"use strict";(function(e){s("d7b2"),s("921b");n(s("66fd"));var t=n(s("1fc4"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("6e42")["createPage"])}},[["feca","common/runtime","common/vendor"]]]);