<template>
  <div class="w-full p-[0px_12px_0px_10px]">
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Color Variant List
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
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
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
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
        <div class="m-2">
          <generic-look-up
            dwidth="300"
            durl="findAllCompany"
            name="companyId"
            @customFunction="getSelectAndInputValueAction"
          />
        </div>
        <div class="p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="text-[14px]">
              <select
                v-model="pageSize_value"
                class="border-[1px] border-solid border-[rgba(171,177,187,0.7)] w-[60px] px-[5px] py-[3px] cursor-pointer rounded-[2px] text-[14px] outline-none"
                @change="getTableRequest"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
              Records
            </div>
            <div class="flex items-center gap-2">
              <GenericInput
                width="200"
                placeholder="Search..."
                name="keywordValue"
                @enter="getTableRequest"
                @customFunction="getSelectAndInputValueAction"
              />
              <generic-button
                name="Search"
                type="primary"
                icon-name-attribute="search"
                @click="getTableRequest"
              />
            </div>
          </div>
          <GenericTablePage
            :tablehead="tableHead"
            :tablebody="tableBody"
            :tableheadlength="tableHeadLength"
            :istherebody="isThereBody"
            open-url="prepareColorVariant"
            delete-row-elements="colorVariant/prepareDeleteColorVariantItemUrl"
            height="600"
            @pageEmitAction="getTableRequest"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericTablePage from '@components/GenericTable/GenericTablePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    ColumnConfigPage,
    GenericTablePage,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      tableData: [],
      tableHead: {},
      tableBody: [],
      tableHeadLength: null,
      leftMap: {},
      actionUrl: null,
      isThereBody: false,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      allSelectAndInputValue: {},
    }
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
  },

  // METHODS
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },

    // Page Request Action
    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/colorVariant/colorVariants`, {
          searchForm: {
            keyword: this.allSelectAndInputValue?.keywordValue ?? '',
          },
          companyId: this.allSelectAndInputValue?.companyId,
          current_page: 1,
          page_size: this.pageSize_value,
        })
        .then(
          ({ data: { actionUrl, colorVariantList, rightMap, leftMap } }) => {
            this.actionUrl = actionUrl
            this.tableHead = rightMap
            this.leftMap = leftMap
            this.tableData = colorVariantList
            this.getTableBody()
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic Table action Start
    getTableBody() {
      this.tableBody = []
      this.tableData.forEach((obj) => {
        const newObj = {}
        newObj.colorId = obj?.colorId
        if ('getDefaultColumns' in obj) {
          for (const key in obj?.getDefaultColumns) {
            newObj[key] = obj.getDefaultColumns[key]?.value
          }
          this.tableBody.push(newObj)
        }
      })
      this.tableHeadLength = Object.keys(this.tableHead).length + 1
      this.tableBody.length > 0
        ? (this.isThereBody = true)
        : (this.isThereBody = false)
    },
    // Generic Table action End

    // Generic_Input value
    getSelectAndInputValueAction(name, value) {
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
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
