<template>
  <div>
    <button
      class="translate-button w-[130px] p-[4px_15px] text-[13px] uppercase flex items-center justify-between bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
      @click="translateToggle"
    >
      <img src="@assets/icons/translate.png" alt="user" class="w-[14px]" />
      {{ 'English' }}
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
      class="w-[130px] bg-[#fff] absolute top-[30px] text-[13px] overflow-hidden duration-[0.4s] z-[100]"
      :style="{
        height: langToggle ? '135px' : '0px',
        border: langToggle ? '1px solid #ddd' : '1px solid #206fa2b3',
      }"
    >
      <li
        v-for="locale in optionData"
        :key="locale.code"
        @click="getLanguage(locale.code)"
      >
        <span
          class="p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s] flex items-center gap-2 cursor-pointer"
        >
          <img
            class="w-[11px]"
            :src="require(`@icons/${locale.code}.png`)"
            :alt="locale.code"
          />
          {{ locale.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  // DATA
  data() {
    return {
      langToggle: false,
      optionData: [
        { name: 'English', code: 'en' },
        { name: 'Russian', code: 'ru' },
        { name: 'O`zbekistan', code: 'uz' },
        { name: 'Turkiya', code: 'tr' },
      ],
    }
  },

  // Mounted
  mounted() {
    // toggle language
    window.addEventListener('click', this.handleWindowClickTranslate)
  },

  // BeforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClickTranslate)
  },

  // Method
  methods: {
    // Store getters
    ...mapActions('translate', ['FETCH_TRANSLATE']),

    // Translate toggle
    translateToggle() {
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
      this.FETCH_TRANSLATE(lang)
    },
  },
}
</script>
