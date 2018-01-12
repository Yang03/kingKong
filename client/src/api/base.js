import axios from 'axios'
import qs from 'qs'
import cookie from 'js-cookie'
import router from '../router'

const request = axios.create({
	timeout: 5000,
	
	transformRequest: [function (data) {
		return qs.stringify(data)
	}],
	headers: {'x-csrf-token': cookie.get('csrfToken'), 'Cache-Control': 'no-cache'}
})

request.interceptors.response.use(response => {
	// Do something with response data
	return Promise.resolve(response)
}, error => {
	// Do something with response error
	if (error.response.status == 403) {
		router.push({
			path: '/login'
		})
	} 
	return Promise.reject(error)	
})

export const Api = {
	get(url, params = {}) {
		console.log(params)
		return request.get(url, {params: params})
	},
	post(url, data = {}) {
		cookie.get(cookie.get('csrfToken'))
		return request.post(url, data)
	},
 }