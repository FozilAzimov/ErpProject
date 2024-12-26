<template>
  <div class="w-full m-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
    >
      <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
        {{ GET_CORE_STRING?.dashboard }}
      </h1>
    </div>
    <div
      class="flex flex-wrap items-start justify-start gap-7 p-5 mt-1 border-[1px] border-solid border-[#D9D9D9] shadow-md rounded-sm"
    >
      <nuxt-link
        v-for="(item, index) of items"
        :key="index"
        :to="item.url"
        class="flex flex-col items-center hover:shadow-lg duration-[0.2s] w-full max-w-[150px] bg-white border border-gray-200 rounded-lg shadow"
      >
        <img
          v-if="item?.value"
          class="w-[80px] h-[80px] p-1"
          :src="item?.value"
          alt="image"
        />
        <img v-else class="w-[80px]" src="@images/desktop.png" alt="image" />
        <div class="text-center mb-2 w-full px-2 whitespace-normal">
          <p class="font-medium text-[13px] text-[#317EAC] line-clamp-1">
            {{ item.name }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },

  // WATCH
  watch: {
    // start CoreString action
    GET_CORE_STRING: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) this.pageRequestAction()
      },
      deep: true,
    },
    // end CoreString action
  },

  // MOUNTED
  mounted() {
    // function
    this.pageRequestAction()
  },

  methods: {
    // Page Request
    pageRequestAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .get(`/menu`)
        .then((res) => {
          this.menuList = res.data
          this.items = res.data.items
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>
