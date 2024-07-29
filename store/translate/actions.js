export default {
  CHANGE_TRANSLATE({ commit }, value) {
    let res = null
    if (value === 1) res = 'Hello World'
    else if (value === 2) res = 'Привет, мир'
    else if (value === 3) res = 'Salom Dunyo'
    else if (value === 4) res = 'Selam Dünya'
    commit('SET_TRANSLATE_DATA', res)
  },
}
