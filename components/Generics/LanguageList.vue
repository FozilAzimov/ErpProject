<template>
  <div>
    <button
      class="translate-button w-[120px] p-[4px_15px] text-[13px] flex items-center justify-between bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
      @click="translateToggle"
    >
      <img src="@assets/icons/translate.png" alt="user" class="w-[14px]" />
      {{ GET_CORE_STRING[GET_ACTIVE_LANG] }}
      <img
        src="@assets/icons/arrow-bottom.png"
        alt="user"
        class="w-[8px]"
        :style="{
          transform: langToggle ? 'rotate(180deg)' : 'rotate(0deg)',
        }"
      />
    </button>
    <ul
      class="w-[120px] absolute top-[30px] text-[13px] overflow-hidden z-[100] duration-[0.3s] transition-[height, background] ease-in-out"
      :style="{
        height: langToggle ? `${parseFloat(optionLength) * 34}px` : '0px',
        background: langToggle
          ? '#fff'
          : 'linear-gradient(to top, #99A7B5, #8693A1)',
      }"
    >
      <li
        v-for="obj in optionData"
        :key="obj.code"
        @click="getLanguage(obj.code)"
      >
        <span
          class="p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s] flex items-center gap-2 cursor-pointer"
        >
          <img
            class="w-[11px]"
            :src="
              obj?.code === 'uz' ||
              obj?.code === 'en' ||
              obj?.code === 'ru' ||
              obj?.code === 'tr'
                ? require(`@icons/${obj.code}.png`)
                : ''
            "
            :alt="obj.code"
          />
          {{ GET_CORE_STRING?.[obj.name] }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  // DATA
  data() {
    return {
      langToggle: false,
      optionData: [],
      optionLength: null,
    }
  },

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
    ...mapGetters('activeLanguage', ['GET_ACTIVE_LANG', 'GET_ACTIVE_DATA']),
  },

  // Mounted
  mounted() {
    // toggle language
    window.addEventListener('click', this.handleWindowClickTranslate)
    this.setAndGetActiveLang() // function
  },

  // BeforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClickTranslate)
  },

  // Method
  methods: {
    // Store getters
    ...mapActions('translate', ['FETCH_TRANSLATE']),
    ...mapActions('activeLanguage', ['FETCH_ACTIVE_LANG']),
    ...mapMutations('activeLanguage', ['SET_ACTIVE_LANG']),

    // Active LANG get and set action
    async setAndGetActiveLang() {
      await this.FETCH_ACTIVE_LANG()
      this.optionData = this.GET_ACTIVE_DATA
      this.optionLength = this.GET_ACTIVE_DATA?.length || 4
    },

    // Translate toggle
    translateToggle() {
      this.setAndGetActiveLang() // function
      this.langToggle = !this.langToggle
    },
    handleWindowClickTranslate(event) {
      if (!event.target.closest('.translate-button')) {
        this.toggleFunctionTranslate()
      }
    },
    toggleFunctionTranslate() {
      this.langToggle = false
    },

    // Language Request
    getLanguage(lang) {
      // Translate
      const api = 'getLanguage'
      this.FETCH_TRANSLATE({ lang, api })
      const obj = this.optionData.find((obj) => obj?.code === lang)
      this.SET_ACTIVE_LANG(obj?.name)
    },
  },
}
</script>
