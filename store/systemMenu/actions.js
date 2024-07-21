export default {
  async GET_SYSTEM_MENU({ commit }) {
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
