import { Api } from './base'

export const getUsage = (params) => {
    return Api.get('/api/log/usage/', params)
} 

export const getUsageByIdAndTime = (params) => {
    return Api.get('/api/log/usageByIdAndTime/', params)
} 