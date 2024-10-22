import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// STATE
export const state = () => ({
  isLoading: false,
  systemMenuList: [],
})

// MUTATIONS
export const mutations = {
  SET_LOADING(state, value) {
    state.isLoading = value
  },
  SET_SYSTEM_MENU_LIST(state, data) {
    state.systemMenuList = data
  },
}

// GETTERS
export const getters = {
  GET_LOADING: (state) => state.isLoading,
  GET_SYSTEM_MENU_LIST: (state) =>
    state.systemMenuList.filter((obj) => obj?.active && obj?.childList?.length),
}

// ACTIONS
export const actions = {
  async FETCH_SYSTEM_MENU({ commit }) {
    commit('SET_LOADING', true)
    try {
      const { data } = await this.$axios.get(`/systemMenu`)
      commit('SET_SYSTEM_MENU_LIST', data)
      commit('SET_LOADING', false)
    } catch (error) {
      commit('SET_LOADING', false)
      // eslint-disable-next-line no-console
      console.error('Failed to axios systemMenu:', error)
    }
  },
}
