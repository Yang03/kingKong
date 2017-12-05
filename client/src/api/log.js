import { Api } from './base'

export const getUsage = (params) => {
    return Api.get('/api/log/usage/')
} 