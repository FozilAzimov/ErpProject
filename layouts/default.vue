<template>
  <div>
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <LoadingPage
      v-if="isLoading && !isLoginPage"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      v-if="!isLoginPage"
      class="w-full h-[50px] bg-[rgba(32,111,162,0.7)] flex justify-between items-center px-1"
    >
      <nuxt-link
        to="/dashboard.htm"
        class="flex items-center gap-1 text-[17px] text-[rgba(255,255,255,0.8)] hover:text-[rgb(255,255,255)] duration-[0.2s] font-medium"
      >
        <img class="w-[30px] ml-1" src="@icons/logo.png" alt="logo" />
        <h1 class="text-[#004A8F]">UZ-ERP</h1>
      </nuxt-link>
      <div class="flex items-center gap-[5px]">
        <div v-if="GET_SESSION?.sessionUser?.accessPermission">
          <button
            class="toggle-button p-[5px_8px] text-[13px] uppercase flex items-center justify-center gap-4 bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
            @click="$router.push('/quickMenuSettings.htm')"
          >
            <img
              src="@assets/icons/menuSetting.png"
              alt="menu-setting"
              class="w-[16px]"
            />
          </button>
        </div>
        <div class="relative w-fit">
          <button
            class="toggle-button w-fit whitespace-nowrap p-[3px_8px] text-[13px] flex items-center justify-between gap-1 bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
            @click="dropToggle = !dropToggle"
          >
            <img
              src="@assets/icons/user-black.png"
              alt="user"
              class="w-[12px]"
            />
            {{
              `${GET_SESSION?.sessionUser?.person?.fname ?? ''} ${
                GET_SESSION?.sessionUser?.person?.lname ?? ''
              }`
            }}
            <img
              src="@assets/icons/arrow-bottom.png"
              alt="user"
              class="w-[7px]"
              :style="{
                transform: dropToggle ? 'rotate(180deg)' : 'rotate(0deg)',
              }"
            />
          </button>
          <ul
            class="w-[190px] bg-[#fff] absolute top-[28px] right-0 z-[1000] text-[12px] overflow-hidden duration-[0.5s]"
            :style="{
              height: dropToggle ? '220px' : '0px',
              border: dropToggle ? '1px solid #ddd' : '1px solid #206fa2b3',
            }"
          >
            <li>
              <nuxt-link
                to="#"
                class="block whitespace-nowrap p-[7px_10px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >{{
                  GET_CORE_STRING?.['menu.settings.password'] ||
                  'Change Password'
                }}</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="#"
                class="block whitespace-nowrap p-[7px_10px] bg-[lightgreen] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >{{
                  GET_CORE_STRING?.setAutoLoginPage || 'setAutoLoginPage'
                }}</nuxt-link
              >
            </li>
            <div class="w-fll h-[1px] bg-[#ddd] mt-3"></div>
            <li>
              <nuxt-link
                to="/sessions.htm"
                class="block whitespace-nowrap p-[7px_10px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >{{ GET_CORE_STRING?.sessions || 'Sessions' }}</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="#"
                class="block whitespace-nowrap p-[7px_10px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >{{ GET_CORE_STRING?.sessions || 'Sessions' }}</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="#"
                class="block whitespace-nowrap p-[7px_10px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >{{
                  GET_CORE_STRING?.['title.settings.sub'] || 'Settings'
                }}</nuxt-link
              >
            </li>
            <div class="w-fll h-[1px] bg-[#ddd] mb-3"></div>
            <li>
              <p
                class="flex items-center gap-3 p-[7px_10px] bg-[rgba(255,0,0,0.5)] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s] cursor-pointer"
                @click="$refs.messageBoxRef.open('', '', 'delete', 'Log out')"
              >
                <img src="@assets/icons/logout.png" alt="logout" />
                {{ GET_CORE_STRING?.['menu.logout'] || 'Log out' }}
              </p>
            </li>
          </ul>
        </div>
        <div>
          <button
            class="translate-button w-[110px] p-[3px_8px] text-[13px] flex items-center justify-between bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
            @click="translateToggle"
          >
            <img
              src="@assets/icons/translate.png"
              alt="user"
              class="w-[13px]"
            />
            {{ GET_CORE_STRING[GET_ACTIVE_LANG] }}
            <img
              src="@assets/icons/arrow-bottom.png"
              alt="user"
              class="w-[7px]"
              :style="{
                transform: langToggle ? 'rotate(180deg)' : 'rotate(0deg)',
              }"
            />
          </button>
          <ul
            class="w-[110px] bg-[#fff] absolute top-[40px] text-[12px] overflow-hidden duration-[0.4s] z-[100]"
            :style="{
              height: langToggle ? `${parseFloat(optionLength) * 34}px` : '0px',
              border: langToggle ? '1px solid #ddd' : '1px solid #206fa2b3',
            }"
          >
            <li
              v-for="obj in optionData"
              :key="obj.code"
              @click="getLanguage(obj.code)"
            >
              <span
                class="p-[7px_10px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s] flex items-center gap-2 cursor-pointer"
              >
                <img
                  class="w-[11px]"
                  :src="
                    obj.code === 'en' ||
                    obj.code === 'ru' ||
                    obj.code === 'tr' ||
                    obj.code === 'uz'
                      ? require(`@icons/${obj.code}.png`)
                      : ''
                  "
                  :alt="obj.code"
                />
                {{ GET_CORE_STRING[obj.name] }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full flex items-start gap-[5px]">
      <el-container>
        <el-aside
          v-if="!isLoginPage && !GET_SESSION?.sessionCompany"
          :width="collapseMune ? '64px' : '300px'"
          class="mt-1 border-t-[1px] border-t-solid border-t-[rgba(0,0,0,0.15)]"
        >
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :collapse="collapseMune"
          >
            <ul
              class="p-[15px_22px] hover:bg-[#ecf5ff] hover:cursor-pointer hover:duration-[0.4s] duration-[0.4s] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]"
              @click="isCollapse"
            >
              <li>
                <img
                  src="@assets/icons/toggle.jpg"
                  alt="icons"
                  class="w-[20px] h-[20px]"
                  :style="{
                    transform: collapseMune
                      ? 'rotateY(0deg)'
                      : 'rotateY(180deg)',
                  }"
                />
              </li>
            </ul>
            <el-submenu
              v-for="(item, index) in GET_SYSTEM_MENU_LIST"
              :key="index"
              :index="`${index}`"
              class="border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]"
            >
              <template slot="title">
                <div class="flex items-center gap-[20px]">
                  <img
                    :src="
                      item.icon ? item.icon : require('@assets/icons/list.png')
                    "
                    alt="icons"
                    class="w-[16px] h-[16px] cursor-pointer"
                  />
                  <p
                    :style="{ overflow: collapseMune ? 'hidden' : 'visible' }"
                    class="text-[#000] text-[14px]"
                  >
                    {{ item.name }}
                  </p>
                </div>
              </template>
              <div @click="isCollapse">
                <nuxt-link
                  v-for="(childItem, indexChild) in item.childList"
                  :key="indexChild"
                  :to="`/${childItem.url}.htm`"
                >
                  <el-menu-item :index="String(childItem.id - indexChild)">
                    {{ childItem.name }}
                  </el-menu-item>
                </nuxt-link>
              </div>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <Nuxt />
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MessageBox from '@components/MessageBox.vue'

export default {
  components: { MessageBox },
  // DATA
  data() {
    return {
      isLoading: false,
      isLoginPage: false,
      collapseMune: true,
      dropToggle: false,
      langToggle: false,
      optionData: [],
      optionLength: null,
    }
  },

  // COMPUTED
  computed: {
    // Store getters
    ...mapGetters('systemMenu', ['GET_LOADING', 'GET_SYSTEM_MENU_LIST']),
    ...mapGetters('translate', ['GET_CORE_STRING']),
    ...mapGetters('activeLanguage', ['GET_ACTIVE_LANG', 'GET_ACTIVE_DATA']),
    ...mapGetters('session', ['GET_SESSION']),
  },

  // WATCH
  watch: {
    $route(to, from) {
      this.isLoginPage = to.path === '/login.htm'
      const token = localStorage.getItem('token')
      if (!token && to.path !== '/login.htm') {
        this.$router.push('/login.htm')
      }
    },

    GET_LOADING(newVal) {
      this.isLoading = newVal
    },
  },

  // CREATED
  created() {
    this.isLoginPage = this.$route.path === '/login.htm'
    const token = localStorage.getItem('token')
    if (token === 'undefined' || token === '') {
      localStorage.removeItem('token')
    }
    if (!token && this.$route.path !== '/login.htm') {
      this.$router.push('/login.htm')
    }
  },

  // MOUNTED
  async mounted() {
    const cookieLang = document.cookie
      ?.split(' ')
      .find((val) => val.includes('lang'))
      ?.split('=')[1]
      ?.replace(';', '')
    const lang = cookieLang || 'en'
    const api = 'getLanguage'

    try {
      if (this.isLoginPage) {
        // Translate all page
        await this.FETCH_TRANSLATE({ lang, api })
      } else {
        // Store session function
        await this.FETCH_SESSION()
        // Translate login.htm
        await this.FETCH_TRANSLATE()
        // System Menu if session data exists
        if (!this.GET_SESSION?.sessionCompany) {
          await this.FETCH_SYSTEM_MENU()
        }
        // Function for setting and getting active language
        await this.setAndGetActiveLang()
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in mounted:', error)
    }

    // Drop Toggle
    window.addEventListener('click', this.handleWindowClick)
    window.addEventListener('click', this.handleWindowClickTranslate)
  },

  // beforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClick)
    window.removeEventListener('click', this.handleWindowClickTranslate)
  },

  // METHODS
  methods: {
    // Store actions
    ...mapActions('translate', ['FETCH_TRANSLATE']),
    ...mapActions('systemMenu', ['FETCH_SYSTEM_MENU']),
    ...mapActions('activeLanguage', ['FETCH_ACTIVE_LANG']),
    ...mapMutations('activeLanguage', ['SET_ACTIVE_LANG']),
    ...mapActions('session', ['FETCH_SESSION']),

    // Active LANG get and set action
    async setAndGetActiveLang() {
      await this.FETCH_ACTIVE_LANG()
      this.optionData = this.GET_ACTIVE_DATA
      this.optionLength = this.GET_ACTIVE_DATA?.length || 4
    },

    isCollapse() {
      this.collapseMune = !this.collapseMune
    },

    // Message box action
    getEmitProp(propMessage, id, index, actionName) {
      if (propMessage === 'confirm' && actionName === 'delete') {
        this.getLogout() // function
      }
    },

    // Log Out
    getLogout() {
      this.isLoading = !this.isLoading
      this.$axios
        .delete(`/security/logout`)
        .then((res) => {
          if (res.status < 300) {
            // remove
            document.cookie = 'JSESSIONID='
            localStorage.removeItem('token')
            // remove
            this.$router.push('/login.htm')
            this.$notification(`Proyekt'dan chiqdingiz.`, 'Success', 'success')
            this.isLoading = !this.isLoading
          }
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.error('Login request failed', error)
          this.$notification(`Error`, 'Error', 'error')
        })
    },

    handleWindowClick(event) {
      if (!event.target.closest('.toggle-button')) {
        this.dropToggle = false
      }
    },

    // Translate toggle
    translateToggle() {
      this.setAndGetActiveLang() // function
      this.langToggle = !this.langToggle
    },
    handleWindowClickTranslate(event) {
      if (!event.target.closest('.translate-button')) {
        this.langToggle = false
      }
    },

    // Language Request
    getLanguage(lang) {
      this.FETCH_TRANSLATE({ lang }) // Translate
      !this.GET_SESSION?.sessionCompany && this.FETCH_SYSTEM_MENU() // System Menu
      const obj = this.optionData.find((obj) => obj?.code === lang)
      this.SET_ACTIVE_LANG(obj?.name)
    },
  },
}
</script>
