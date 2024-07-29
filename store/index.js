import Vue from 'vue'
import Vuex from 'vuex'

import systemMenu from '@store/systemMenu'
import translate from '@store/translate'

Vue.use(Vuex)

const store = () =>
  // eslint-disable-next-line import/no-named-as-default-member
  new Vuex.Store({
    // STATE
    state() {
      return {}
    },

    // GETTERS
    getters: {},

    // ACTIONS
    actions: {},

    // MUTATIONS
    mutations: {},

    // MODULES
    modules: {
      systemMenu,
      translate,
    },
  })

export default store
