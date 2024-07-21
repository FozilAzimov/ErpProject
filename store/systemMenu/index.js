import actions from '@store/systemMenu/actions'
import mutations from '@store/systemMenu/mutations'

const systemMenu = {
  // STATE
  state() {
    return {
      isLoading: false,
      systemMenuList: [],
    }
  },

  // GETTERS
  getters: {
    GET_LOADING: (state) => state.isLoading,
    GET_SYSTEM_MENU_LIST: (state) =>
      state.systemMenuList.map((obj) => obj.active && obj),
  },

  // ACTIONS
  actions,

  // MUTATIONS
  mutations,

  // NAMESPACED
  namespaced: true,
}

export default systemMenu
