<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <form class="flex flex-wrap items-center gap-3 py-3">
      <span v-for="(element, index) in topFilterData" :key="index">
        <span
          v-if="element.type === 'number'"
          class="flex flex-col items-start"
        >
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-input
            :value="`${allSelectAndInputValues?.[element?.subName]}`"
            :width="element?.width"
            type="number"
            :name="element.subName"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span
          v-else-if="element.type === 'select'"
          class="flex flex-col items-start"
        >
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-look-up
            :dwidth="element?.width"
            :name="element?.subName"
            :durl="element?.url"
            :dparam="element?.param"
            defvalue=""
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
      </span>
    </form>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Sew Order Online Status
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="@assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="@assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <h1>Hayyyy</h1>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericInput,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      topFilterData: [],
      allSelectAndInputValues: {},
      isOpenTable: true,
      isCloseTable: true,
      resultDataResponse: [],
      resultDataResponseColumns: [],
    }
  },

  // MOUNTED
  mounted() {
    this.allSelectAndInputValues.autorefresh = 50
    // Table function
    this.getTableRequest()
    // function
    this.createDataFiltering()
    // function
    this.realTimeRequest(this.allSelectAndInputValues?.autorefresh)
  },

  // METHODS
  methods: {
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
    // Table page ni ochish va yopish uchun

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering() {
      const createDate = [
        {
          name: 'Autorefresh',
          subName: 'autorefresh',
          type: 'number',
          width: '70',
        },
        {
          name: 'Article',
          subName: 'article',
          type: 'select',
          width: '200',
          url: 'findAllPrOrderByClientOrder',
        },
        {
          name: 'Order',
          subName: 'productionOrderId',
          type: 'select',
          width: '200',
          url: 'findAllPrOrder',
          param: {
            statusId: 4,
            finalStatus: true,
          },
        },
        {
          name: 'SewModel',
          subName: 'sewModelId',
          type: 'select',
          width: '200',
          url: 'findAllSewModel',
          param: {
            finalStatus: true,
          },
        },
        {
          name: 'Color',
          subName: 'colorId',
          type: 'select',
          width: '200',
          url: 'findAllColor',
        },
      ]
      this.topFilterData = createDate
    },

    // get Input, date, select datasini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValues, name, value)
      // function
      this.getTableRequest()
      if (name === 'autorefresh') {
        // function
        this.realTimeRequest(value)
      }
    },

    // page request action
    getTableRequest() {
      const body = {
        colorId: this.allSelectAndInputValues?.colorId || null,
        fromAccept: true,
        productionOrderId:
          this.allSelectAndInputValues?.productionOrderId || null,
        sewModelId: this.allSelectAndInputValues?.sewModelId || null,
      }

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sew/sewOrderOnlineStatusContent`, body)
        .then(({ data: { resultDataResponse, resultDataResponseColumns } }) => {
          this.resultDataResponse = resultDataResponse
          this.resultDataResponseColumns = resultDataResponseColumns
          this.this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    realTimeRequest(value) {
      setInterval(
        () => {
          // function
          this.getTableRequest()
        },
        value ? parseInt(value) * 1000 : 1000
      )
    },
  },
}
</script>
