(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wallet/DetailsRecord/DetailsRecord"],{"59cd":function(t,e,n){"use strict";n.r(e);var a=n("d7ed"),u=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=u.a},"97b1":function(t,e,n){"use strict";(function(t){n("d7b2"),n("921b");a(n("66fd"));var e=a(n("a685"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},a5d6:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},a685:function(t,e,n){"use strict";n.r(e);var a=n("a5d6"),u=n("59cd");for(var o in u)"default"!==o&&function(t){n.d(e,t,function(){return u[t]})}(o);n("eb7d");var i=n("2877"),r=Object(i["a"])(u["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},b9e1:function(t,e,n){},d7ed:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{len:0,startX:0,moveEndX:0,valueX:0}},methods:{touchstart:function(t){t.preventDefault(),this.startX=t.touches[0].pageX},touchmove:function(e){return e.preventDefault(),this.moveEndX=e.touches[0].pageX,this.valueX=this.moveEndX-this.startX,this.valueX>=80?void t.navigateBack({delta:1,animationType:"pop-in",animationDuration:200}):void this.valueX}}};e.default=n}).call(this,n("6e42")["default"])},eb7d:function(t,e,n){"use strict";var a=n("b9e1"),u=n.n(a);u.a}},[["97b1","common/runtime","common/vendor"]]]);