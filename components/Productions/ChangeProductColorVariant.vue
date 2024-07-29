<template>
  <div class="w-full p-[0px_12px_0px_10px] mt-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Change the products of colors variants
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
        <div class="flex items-center gap-3 m-3">
          <span class="text-[14px]">Department Name</span>
          <generic-look-up
            dwidth="250"
            name="departmentId"
            placeholder="-- Please Select --"
            @customFunction="getInputAndLookUpValueAction"
          />
          <generic-button
            type="primary"
            icon-name-attribute="refresh"
            :circle="true"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericLookUp,
    GenericButton,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      bodyData: [],
      allSelectAndInputValues: {},
      isOpenTable: true,
      isCloseTable: true,
    }
  },

  // MOUNTED
  created() {
    // Table function
    this.getTableRequest()
    // function
    this.createDataFiltering()
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

    // get Input, date, select datasini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValues, name, value)
    },

    // created data
    createDataFiltering() {
      const createDate = [
        {
          name: 'Color',
          subName: 'color',
          type: 'select',
          url: 'findAllColor',
        },
        {
          name: 'Color Variant',
          subName: 'colorVariant',
          type: 'select',
          url: 'findAllColorVariant',
        },
        {
          name: 'Color Depth',
          subName: 'colorDepth',
          type: 'select',
          url: 'findAllColorDepth',
        },
        {
          name: 'Products',
          subName: 'products',
          type: 'select',
          url: 'searchProductList',
        },
        {
          name: 'Qty',
          subName: 'qty',
          type: 'number',
        },
      ]
      this.bodyData = createDate
    },

    // page request action
    getTableRequest() {
      const body = {}

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sew/sewOrderOnlineStatusContent`, body)
        .then(({ data }) => {
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
