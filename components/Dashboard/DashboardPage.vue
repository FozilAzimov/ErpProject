<template>
  <div class="w-full m-1 pr-2">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
    >
      <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
        {{ $t('pages.dashboard.headerName') }}
      </h1>
    </div>
    <div
      class="flex flex-wrap items-start justify-start gap-7 p-5 mt-2 border-[1px] border-solid border-[#D9D9D9] shadow-md rounded-sm"
    >
      <nuxt-link
        v-for="(item, index) of items"
        :key="index"
        :to="item.url"
        class="flex flex-col items-center hover:shadow-lg duration-[0.2s] w-full max-w-[150px] bg-white border border-gray-200 rounded-lg shadow"
      >
        <img class="w-[80px]" src="@images/desktop.png" alt="image" />
        <div class="text-center mb-2">
          <p class="font-medium text-[13px] text-[#317EAC] line-clamp-1">
            {{ item.name }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
export default {
  components: { LoadingPage },

  // DATA
  data() {
    return {
      menuList: null,
      items: null,
      systemMenuList: null,
      isLoading: false,
    }
  },

  // MOUNTED
  mounted() {
    // Menu request
    this.isLoading = !this.isLoading
    this.$axios
      .get(`/menu`)
      .then((res) => {
        this.isLoading = !this.isLoading
        this.menuList = res.data
        this.items = res.data.items
      })
      .catch((error) => {
        this.isLoading = !this.isLoading
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
}
</script>
