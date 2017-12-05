import * as types from '../mutation-types'

import { getUsage } from  '../../api/log'

const state = {
    items: []
}

const getters = {
    items: state => state.items
}

const actions = {
    [types.GET_USAGE]({commit, state}, params) {
        getUsage(params).then((res) => {
            commit('setUsage', res.data)
        })
    }
}

const mutations = {
    setUsage(state, data) {
        state.items = data
    }
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}