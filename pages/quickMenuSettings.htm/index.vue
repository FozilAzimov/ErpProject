<template>
  <div>
    <loading-page
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <quick-menu-settings-list
      v-if="activeMenuList && menuObject"
      :activemenu="activeMenuList"
      :menuobj="menuObject"
    />
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import QuickMenuSettingsList from '@components/QuickMenuSettings/QuickMenuSettingsList.vue'
export default {
  components: {
    LoadingPage,
    QuickMenuSettingsList,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      menuObject: null,
      activeMenuList: null,
    }
  },

  // CREATED
  created() {
    // function
    this.getRequestPageAction()
  },

  // METHODS
  methods: {
    async getRequestPageAction() {
      this.isLoading = !this.isLoading
      await this.$axios
        .get('user/quickMenuSettings')
        .then(({ data }) => {
          this.menuObject = data
          this.activeMenuList = data.children.map((item) => ({
            ...item,
            isOpen: false,
          }))
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.error(error)
        })
    },
  },
}
</script>
