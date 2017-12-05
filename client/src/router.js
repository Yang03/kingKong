import Router from 'vue-router'
import Vue from 'vue'
//页面组件
import Usage from './components/Usage/'
import Register from './components/Register/'
import Login from './components/Login/'

Vue.use(Router)

const config = {
	linkActiveClass: 'active',
	scrollBehavior: () => ({ x: 0, y: 0 }),
	routes: [{
		path: '/',
		beforeEnter(to, from, next) {
			router.push('/usage/')
		}
	},{
		path: '/usage',
		component: Usage,
		name: 'usage',
	},{
		path: '/register',
		component: Register,
		name:'register'
	},{
		path: '/login',
		component: Login,
		name:'login'
	}]
}

const router = new Router(config)

export default router