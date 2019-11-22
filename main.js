import Vue from 'vue'
import App from './App'
import './static/css/mui.css'
import './static/css/aui.css'
import './static/css/style.css'
import store from './store'
import api from './common/vmeitime-http/index.js'
Vue.config.productionTip = false
Vue.prototype.$api=api
Vue.prototype.$store = store
//全局注入w-loading组件
import wLoading from "@/components/w-loading.vue";
Vue.component('w-loading',wLoading)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
	