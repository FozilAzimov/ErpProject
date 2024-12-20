<template>
  <div class="w-full h-screen">
    <LanguageList class="absolute right-[10px] top-[7px]" />
    <div
      class="w-full h-[80vh] bg-[url('@/assets/images/fon.png')] bg-no-repeat bg-cover flex flex-col items-center justify-start"
    >
      <LoadingPage v-if="isLoading" class="absolute top-[30px]" />
      <face-door-list :loading="loading" @getDoorIdsEmitAction="getDoorIds" />
      <img class="w-[200px] mt-16" src="@/assets/icons/logo.png" />
      <h1 class="text-[24px] text-[#317eac] leading-[36px] font-bold py-[30px]">
        {{ GET_CORE_STRING?.welcomeErp || 'Welcome to Uz-Erp' }}
      </h1>
      <ValidationObserver ref="formValidation">
        <form
          class="w-[350px] bg-[rgba(0,0,0,0.2)] flex flex-col items-center gap-[15px] p-[30px_25px] rounded-[5px]"
        >
          <div class="flex items-center gap-[10px] mb-[5px]">
            <ValidationProvider
              v-slot="{ errors }"
              class="flex items-center gap-[10px]"
              rules="required"
            >
              <label for="username">
                <img
                  src="@/assets/icons/user.png"
                  class="w-[17px] cursor-pointer"
                />
              </label>
              <input
                id="username"
                ref="usernameInput"
                v-model="form.username"
                :class="{
                  'border-red-500': errors[0],
                }"
                type="text"
                :placeholder="GET_CORE_STRING?.['login.login']"
                class="w-[220px] p-[4px_10px] bg-[rgba(255,255,255,.8)] rounded-[2px] outline-none text-[13px] border-[1px] border-solid border-[#fff] focus:border-[1px] focus:border-solid focus:border-[#52a8eccc] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
              />
            </ValidationProvider>
          </div>
          <div class="flex items-center gap-[10px] relative">
            <ValidationProvider
              v-slot="{ errors }"
              class="flex items-center gap-[10px] relative"
              rules="required"
            >
              <label for="password">
                <img
                  src="@/assets/icons/password.png"
                  class="w-[17px] cursor-pointer"
                />
              </label>
              <input
                id="password"
                v-model="form.password"
                :class="{
                  'border-red-500': errors[0],
                }"
                :type="typeIcon ? 'text' : 'password'"
                :placeholder="GET_CORE_STRING?.['login.password']"
                class="w-[220px] p-[4px_10px] rounded-[2px] bg-[rgba(255,255,255,.8)] outline-none text-[13px] border-[1px] border-solid border-[#fff] focus:border-[1px] focus:border-solid focus:border-[#52a8eccc] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
                @keyup.enter="getResponse"
              />
              <img
                v-if="typeIcon"
                src="@/assets/icons/view.png"
                class="w-[15px] absolute right-[10px] cursor-pointer"
                @click="getTypePassword"
              />
              <img
                v-else
                src="@/assets/icons/hide.png"
                class="w-[15px] absolute right-[10px] cursor-pointer"
                @click="getTypePassword"
              />
            </ValidationProvider>
          </div>
          <input
            type="button"
            :value="GET_CORE_STRING?.['login.submit']"
            class="w-[250px] p-[5px_10px] mt-[10px] rounded-[3px] text-[13px] bg-[#5dc2f4] text-white cursor-pointer hover:bg-[#40b2e9] active:bg-[#249fdb] duration-[0.4s] outline-none"
            @click="getResponse"
          />
          <p class="text-[13px]">{{ '' }}</p>
        </form>
      </ValidationObserver>
    </div>
    <div
      class="w-full h-[20vh] bg-[url('@/assets/images/footer-img.png')] bg-no-repeat bg-cover"
    ></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import LanguageList from '@generics/LanguageList.vue'
import FaceDoorList from '@components/Login/FaceDoorList.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    LanguageList,
    FaceDoorList,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      loading: false,
      typeIcon: false,
      form: {
        username: null,
        password: null,
      },
    }
  },

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
    ...mapGetters('activeLanguage', ['GET_ACTIVE_LANG']),
    ...mapGetters('session', ['GET_SESSION']),
  },

  // MOUNTED
  mounted() {
    // default focus
    this.$refs.usernameInput.focus()
  },

  // METHODS
  methods: {
    // Store getters
    ...mapActions('session', ['FETCH_SESSION']),
    ...mapActions('translate', ['FETCH_TRANSLATE']),
    ...mapActions('systemMenu', ['FETCH_SYSTEM_MENU']),

    getTypePassword() {
      this.typeIcon ? (this.typeIcon = false) : (this.typeIcon = true)
    },

    // Face uchun
    async getDoorIds(isActive, body) {
      try {
        if (isActive && body) {
          this.$set(this, 'loading', true)
          const {
            data: { token },
          } = await this.$axios.post('/security/logIn', body)
          localStorage.setItem('token', token)
          await this.FETCH_SESSION() // Store session function
          await this.FETCH_TRANSLATE() // Store translate function
          await this.$router.push(`/campMarketSaleInvoice.htm`)
          await this.$notification('Success', 'Success', 'success')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Login request failed', error)
        this.$notification(`Error`, 'Error', 'error')
      } finally {
        // Loading holatini tugatish
        this.$set(this, 'loading', false)
      }
    },

    async getResponse() {
      try {
        const success = await this.$refs.formValidation.validate()
        if (success) {
          this.$set(this, 'isLoading', true)
          const {
            data: { token },
          } = await this.$axios.post('/security/logIn', {
            user: {
              username: this.form.username,
              password: this.form.password,
            },
          })
          localStorage.setItem('token', token)
          await this.FETCH_SESSION() // Store session function
          await this.FETCH_TRANSLATE() // Store translate function
          await this.FETCH_SYSTEM_MENU() // Store systemMenu function
          await this.$router.push(
            `/${this.GET_SESSION?.sessionUser?.autoLoginPage}.htm`
          )
          await this.$notification('Success', 'Success', 'success')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.$notification('Error', 'Error', 'error')
      } finally {
        this.$set(this, 'isLoading', false)
      }
    },
  },
}
</script>
