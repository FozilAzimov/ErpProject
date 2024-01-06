import axios from 'axios'
export default {
  async fetchUsers({ commit }) {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    )
    commit('setUsers', await data)
  },
}
