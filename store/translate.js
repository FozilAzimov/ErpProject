import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// STATE
export const state = () => ({
  isLoading: false,
  coreStringObj: {},
})

// MUTATIONS
export const mutations = {
  SET_LOADING(state, value) {
    state.isLoading = value
  },
  SET_CORE_STRING_OBJECT(state, res) {
    state.coreStringObj = res
  },
}

// GETTERS
export const getters = {
  GET_LOADING: (state) => state.isLoading,
  GET_CORE_STRING: ({ coreStringObj }) => coreStringObj,
}

// ACTIONS
export const actions = {
  async FETCH_TRANSLATE({ commit }, { lang, api } = {}) {
    let language = null
    const cookieLang = document.cookie
      ?.split(' ')
      .find((val) => val.includes('lang'))
      ?.split('=')[1]
      ?.replace(';', '')

    if (lang) {
      language = lang
      document.cookie = `lang=${lang}`
    } else if (cookieLang) {
      language = cookieLang
    }
    commit('SET_LOADING', true)
    try {
      const method = api ? 'get' : 'post'
      const { data } = await this.$axios[method](
        `/language/${api || 'getLanguageAndSave'}?language=${language || 'en'}`
      )
      commit('SET_CORE_STRING_OBJECT', data)
      commit('SET_LOADING', false)
    } catch (error) {
      try {
        const { data } = await this.$axios.get(
          `/language/getLanguage?language=${language || 'en'}`
        )
        commit('SET_CORE_STRING_OBJECT', data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to axios translate:', error)
      }
      commit('SET_LOADING', false)
    }
  },
}
