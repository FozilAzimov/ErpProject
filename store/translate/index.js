import actions from '@store/translate/actions'
import mutations from '@store/translate/mutations'

const systemMenu = {
  // STATE
  state() {
    return {
      translate: 'Hello World',
    }
  },

  // GETTERS
  getters: {
    GET_TRANSLATE_VALUE: ({ translate }) => translate,
  },

  // ACTIONS
  actions,

  // MUTATIONS
  mutations,

  // NAMESPACED
  namespaced: true,
}

export default systemMenu
