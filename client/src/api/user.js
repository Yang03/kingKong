import { Api } from './base'

export const register = (params) => {
    return Api.post('/api/user/register', params)
} 

export const login = (params) => {
    return Api.post('/api/user/login', params)
}

export const loginOut = () => {
    return Api.post('/api/user/loginOut')
}

export const checkEmail = (params) => {
    //console.log(params)
    return Api.get('/api/user/checkEmail', params)
}

export const session = () => {
    //console.log(params)
    return Api.get('/api/user/session')
}