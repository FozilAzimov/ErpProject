<template>
  <div class="w-full p-[0px_12px_0px_10px] mt-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="tableHead"
        :left="leftMap"
        :url="actionUrl"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            SALES ORDER LIST
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
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
        <div class="flex items-center gap-3 m-2">
          <generic-file-upload />
          <generic-button
            name="Download"
            type="success"
            icon-name-attribute="download"
          />
        </div>
        <div class="p-2"></div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@components/Generics/GenericButton.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericFileUpload from '@generics/GenericFileUpload.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    ColumnConfigPage,
    GenericFileUpload,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      tableHead: {},
      allSelectAndInputValues: {},
      checkModal: false,
      actionUrl: '',
      leftMap: {},
      isOpenTable: true,
      isCloseTable: true,
    }
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
  },

  // METHODS
  methods: {
    // Column config uchun ishlaydi
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },
    // Column config uchun ishlaydi
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
    // get Input, date, select datasini olish

    // page request action
    getTableRequest() {
      const body = {
        current_page: 1,
        page_size: this.pageSize_value,
        searchForm: {
          keyword: this.allSelectAndInputValues?.searchInput || '',
        },
        dateFrom: this.allSelectAndInputValues?.dateFrom
          ? new Date(this.allSelectAndInputValues?.dateFrom)
              .toLocaleString('en-GB')
              .split(',')
              .join('')
          : '',
        dateTo: this.allSelectAndInputValues?.dateTo
          ? new Date(this.allSelectAndInputValues?.dateTo)
              .toLocaleString('en-GB')
              .split(',')
              .join('')
          : '',
        companyBranchId: this.allSelectAndInputValues?.companyBranchId || '',
        statusId: this.allSelectAndInputValues?.statusId || '',
      }

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/expenseInvoice`, body)
        .then(({ data: { build } }) => {
          this.isLoading = !this.isLoading
          this.tableHead = build?.rightMap
          this.leftMap = build?.leftMap
          this.actionUrl = build?.actionUrl
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
