import * as types from '../mutation-types'

import { getUsage, getUsageByIdAndTime } from  '../../api/log'

const state = {
    items: [],
    apps: [],
    currentApp: null
}

const getters = {
    items: state => state.items,
    apps: state => state.apps,
    currentApp: state => state.currentApp
}

const actions = {
    [types.GET_USAGE]({commit, state}, params) {
        //console.log(params)
        getUsage(params).then((res) => {
            commit('setUsage', res.data)
            commit('changeUsage', res.data)
        })
    },
    [types.GET_USAGE_BY_ID_AND_TIME]({commit, state}, params) {
        commit('appChange', params.appId)
        getUsageByIdAndTime(params).then((res) => {
            commit('changeUsage', res.data)
        })     
    }
}

const mutations = {
    setUsage(state, data) {
        state.apps = data.apps || []
        if (data.apps && data.apps.length) {
            state.currentApp = data.apps[0].appId
        } else {
            state.currentApp = ''
        }
    },
    appChange(state, value) {
        state.currentApp = value
    },
    changeUsage(state, data) {
        state.items = data.logs || []
    }
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}