import { Api } from './base'

export const getProjectById = (params = {}) => {
    console.log(params)
    return Api.get('/api/project', params)
}

export const getAllProjects = (params = {}) => {
    return Api.get('/api/projects', params)
}

export const createProject = (params) => {
    return Api.post('/api/project', params)
}