import Vue from 'vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components/Base/index.css'

import App from './components/App.vue'
import Header from './components/Header/'
import SideNav from './components/SideNav/'

import store from './store'

Vue.use(ElementUI)
Vue.component('SideNav', SideNav)
Vue.component('Header', Header)

const vue = new Vue({
    el: '#app',
    store,
	router,
	render: h => h(App, {
		on: {
			'history-back'() {
				router.go(-1)
			}
		}
	})
})