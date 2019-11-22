import Vue from 'vue'
import Vuex from 'vuex'
import state from './moudels/state.js';
import mutations from './moudels/mutations.js';
import actions from './moudels/actions.js';
Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	mutations,
	actions,
})

export default store
