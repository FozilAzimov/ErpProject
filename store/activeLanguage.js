import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// STATE
export const state = () => ({
  data: [],
  activeLan: null,
})

// MUTATIONS
export const mutations = {
  SET_ACTIVE_DATA(state, res) {
    state.data = res
  },
  SET_ACTIVE_LANG(state, res) {
    state.activeLan = res
  },
}

// GETTERS
export const getters = {
  GET_ACTIVE_DATA: ({ data }) => data,
  GET_ACTIVE_LANG: ({ activeLan }) => activeLan,
}

// ACTIONS
export const actions = {
  async FETCH_ACTIVE_LANG({ commit }) {
    try {
      const { data } = await this.$axios.get(`/language/getAllActiveLanguages`)
      commit('SET_ACTIVE_DATA', data)
      const cookieLang = document.cookie
        ?.split(' ')
        ?.find((val) => val.includes('lang'))
        ?.split('=')[1]
        ?.replace(';', '')
      const obj =
        Array.isArray(data) && data?.find((obj) => obj?.code === cookieLang)
      commit('SET_ACTIVE_LANG', obj.name)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to axios systemMenu:', error)
    }
  },
}
