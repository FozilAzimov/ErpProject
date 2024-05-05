export default function ({ $axios, redirect }) {
  $axios.defaults.withCredentials = true
  $axios.onError((error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token')
      redirect('/login.htm')
    }
  })
}
