import * as types from '../mutation-types'
import { MessageBox } from 'element-ui'
import {getProjectById, createProject, getAllProjects } from  '../../api/project'

const state = {
    apps: [],
    currentApp: null,
    app: null
}

const getters = {
    apps: state => state.apps,
    currentApp: state => state.currentApp,
    app: state => state.app
}

const actions = {
    [types.GET_PROJECT]({commit, state}, params) {
        getAllProjects(params).then((res) => {
            commit('setProjects', res.data)
            if (res.data.length) {
                getProjectById({appId: res.data[0].appId}).then((res) => {
                    commit('setProject', res.data)
                })
            }
        })
    },
    [types.PROJECT_CHANGE]({commit, state}, appId) {
        commit('appChange', appId)
        getProjectById({appId: appId}).then((res) => {
            commit('setProject', res.data)
        })     
    },
    [types.CRATE_PROJECT]({commit, state}, data) {
        createProject(data).then((res) => {
           commit('crateSuccess', res)
           if (!res.data.code) {
                const index = res.data.apps.length
                const appId = res.data.apps[index - 1].appId
                getProjectById({appId: appId}).then((res) => {
                    commit('setProject', res.data)
                })  
           }
           
        })     
    }
}

const mutations = {
    setProjects(state, data) {
        if (data && data.length) {
            state.apps = data
            state.currentApp = data[0].appId
        }
    },
    setProject(state, data) {
        state.app = data
        state.currentApp = data.appName
    },
    appChange(state, value) {
        state.currentApp = value
    },
    crateSuccess(state, res) {
        if (!res.data.code) {
            if (res.data.apps && res.data.apps.length && res.data.apps[res.data.apps.length - 1].appId) {
                state.apps = res.data.apps
                state.currentApp = res.data.apps[res.data.apps.length - 1].appId
            }
            MessageBox.alert('创建成功',  {
                confirmButtonText: '确定',
            }) 
        } else  {
            MessageBox.alert('创建失败',  {
                confirmButtonText: '确定',
            })  
        }
    }
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}