import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// STATE
export const state = () => ({
  data: null,
})

// MUTATIONS
export const mutations = {
  SET_SESSION(state, res) {
    state.data = res
  },
}

// GETTERS
export const getters = {
  GET_SESSION: ({ data }) => data,
}

// ACTIONS
export const actions = {
  async FETCH_SESSION({ commit }) {
    try {
      const { data } = await this.$axios.get(`/security/getCurrentSession`)
      // console.log(data)

      commit('SET_SESSION', data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to axios systemMenu:', error)
    }
  },
}
