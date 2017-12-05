import Vue from 'vue'
import Vuex from 'vuex'

import usage from './modules/usage'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
	modules: {
		usage
	},
	strict: debug
})
