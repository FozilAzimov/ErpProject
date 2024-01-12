<template>
  <div class="w-full m-1 pr-2">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="dashboardBox border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
    >
      <div class="flex items-center gap-[10px]">
        <GenericButton
          name="Go Back"
          pl="10"
          pt="3"
          pr="10"
          pb="3"
          bggradient="linear-gradient(to right, rgba(70,94,140,0.8),rgb(34,39,76))"
          textsize="14"
          :url="img.goBack"
          istherepicture="true"
          @click="$router.go(-1)"
        />
        <GenericButton
          name="onWay changeState"
          pl="10"
          pt="3"
          pr="10"
          pb="3"
          bggradient="linear-gradient(to bottom, rgb(108,33,38),rgba(108,33,38,0.65))"
          textsize="14"
        />
        <GenericButton
          name="Copy Invoice"
          pl="10"
          pt="3"
          pr="10"
          pb="3"
          bg="rgba(54, 155, 215, 0.8)"
          textsize="14"
          :url="img.copy"
          istherepicture="true"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          {{ $t('pages.preparepurchaseinvoice.headerName') }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// Icons url
import goBack from '../../assets/icons/go-back.png'
import copy from '../../assets/icons/copy.png'
// Components
import GenericButton from '../Button/GenericButton.vue'
import LoadingPage from '../Loading/LoadingPage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
  },
  // DATA
  data() {
    return {
      isLoading: false,
      img: {
        goBack,
        copy,
      },
    }
  },

  // MOUNTED
  mounted() {
    this.getPageRequest()
  },

  // METHOD
  methods: {
    getPageRequest() {
      this.isLoading = !this.isLoading
      axios
        .post(
          `https://192.168.1.55:8443/api/invoice/preparePurchaseInvoiceNewAjaxLoad`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          this.isLoading = !this.isLoading
          this.$router.push('/preparePurchaseInvoiceNew.htm')
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
