import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      baseURL: process.env.baseURL || 'https://192.168.1.55:8443/api', // Agar apiUrl configda bo'lmasa, default qiymatni ishlatamiz
    }
  },
})
