import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    })
}
