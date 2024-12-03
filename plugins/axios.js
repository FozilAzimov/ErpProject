export default function ({ $axios, redirect }) {
  $axios.defaults.withCredentials = true
  // test start
  // $axios.onRequest((config) => {
  //   const token = localStorage.getItem('authToken') // Get token from localStorage or another source
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}` // Attach the token to the request
  //   }
  //   return config
  // })
  // test end
  $axios.onError((error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token')
      redirect('/login.htm')
    }
  })
}
