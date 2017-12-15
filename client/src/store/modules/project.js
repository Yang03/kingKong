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
        //console.log(params)
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
           commit('crateSuccess', res.data.code)
           commit('setProjects', res.data.apps)
        })     
    }
}

const mutations = {
    setProjects(state, data) {
        if (data && data.length && data[0].appId) {
            state.apps = data
            state.currentApp = data[0].appId
        }
    },
    setProject(state, data) {
        state.app = data
    },
    appChange(state, value) {
        state.currentApp = value
    },
    crateSuccess(state, code) {
        if (!code) {
            MessageBox.alert('创建成功',  {
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