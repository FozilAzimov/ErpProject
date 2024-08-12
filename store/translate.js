import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// STATE
export const state = () => ({
  translate: 'Hello World',
})

// MUTATIONS
export const mutations = {
  SET_TRANSLATE_DATA(state, res) {
    state.translate = res
  },
}

// GETTERS
export const getters = {
  GET_TRANSLATE_VALUE: ({ translate }) => translate,
}

// ACTIONS
export const actions = {
  CHANGE_TRANSLATE({ commit }, value) {
    let res = null
    if (value === 1) res = 'Hello World'
    else if (value === 2) res = 'Привет, мир'
    else if (value === 3) res = 'Salom Dunyo'
    else if (value === 4) res = 'Selam Dünya'
    commit('SET_TRANSLATE_DATA', res)
  },
}
