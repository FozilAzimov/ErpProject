import mutations from './mutations'
import actions from './actions'

export const state = () => ({
  users: [],
})

export const getters = {
  getUsers: (state) => state.users.map((value) => value.name),
}

export { mutations, actions }
