import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  isLoading: false,
  systemMenuList: [],
  firstSystemMenuList: [],
})

export const mutations = {
  SET_LOADING(state, value) {
    state.isLoading = value
  },
  SET_SYSTEM_MENU_LIST(state, data) {
    state.systemMenuList = data
  },
  SET_FIRST_SYSTEM_MENU_LIST(state, data) {
    state.firstSystemMenuList = data
  },
}

export const actions = {
  fetchSystemMenu({ commit }) {
    commit('SET_LOADING', true)
    return this.$axios
      .get(`/systemMenu`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'x-auth-token': localStorage.getItem('authToken'),
        },
      })
      .then((res) => {
        commit('SET_LOADING', false)
        commit('SET_SYSTEM_MENU_LIST', res.data)
        const firstSystemMenuList = res.data.filter((value) => value.active)
        commit('SET_FIRST_SYSTEM_MENU_LIST', firstSystemMenuList)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        // eslint-disable-next-line no-console
        console.error(error)
      })
  },
}
