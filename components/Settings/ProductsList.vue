<template>
  <div class="w-full p-1">
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
    <form class="flex flex-wrap items-center gap-3 py-4">
      <span v-for="(element, index) in topFilterData" :key="index">
        <span v-if="element.type === 'select'" class="flex items-center gap-1">
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-look-up
            dwidth="200"
            :name="element.subName"
            :options-data="productCategory"
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
            PRODUCT LIST
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
        <div class="flex items-center gap-2 m-2">
          <generic-button
            name="Grid"
            type="primary"
            @click="gridListAction('grid')"
          />
          <generic-button
            name="List"
            type="primary"
            @click="gridListAction('list')"
          />
          <generic-button
            name="Add New"
            type="primary"
            icon-name-attribute="circle-plus-outline"
            @click="
              $router.push({
                path: '/prepareProducts.htm',
                query: { page_type: 'create' },
              })
            "
          />
        </div>
        <!-- Start LIST template -->
        <div v-if="isGridAndList" class="p-2">
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
                name="keyword"
                placeholder="Search..."
                @enter="getTableRequest"
                @customFunction="getInputAndLookUpValueAction"
              />
              <GenericButton
                name="Search"
                type="primary"
                icon-name-attribute="search"
                @click="getTableRequest"
              />
              <GenericButton
                name="Print Preview"
                type="success"
                icon-name-attribute="printer"
              />
            </div>
          </div>
          <GenericTablePage
            :tablehead="tableHead"
            :tablebody="tableBody"
            :tableheadlength="tableHeadLength"
            :istherebody="isThereBody"
            :custom-btn="{
              name: 'Sticker',
              type: 'success',
              icon: 'printer',
              clickType: 'sticker',
            }"
            open-url="prepareProducts"
            :productions-action-buttons="true"
            delete-row-url="batchProcess/prepareBatchProcessDelete"
            height="600"
            @pageEmitAction="getTableRequest"
          />
        </div>
        <!-- End LIST template -->

        <!-- Start GRID template -->
        <div v-else class="overflow-y-auto w-full h-screen">
          <div
            class="p-4 w-full h-fit mt-4 grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5"
            :style="{
              gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
            }"
          >
            <div
              v-for="(box, index) in tableBody"
              :key="index"
              class="rounded-lg cursor-pointer w-[250px] h-[250px] flex flex-col items-center justify-evenly"
              :style="{
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.15)',
              }"
              @click="
                $router.push({
                  path: '/prepareProducts.htm',
                  query: { page_type: 'create' },
                })
              "
            >
              <span class="flex flex-col items-center gap-2">
                <img
                  :src="
                    box?.[image]
                      ? box?.[image]
                      : require('@images/no-image.png')
                  "
                  width="80"
                  :alt="box?.[image]"
                />
              </span>
              <p class="text-[14px] p-2 font-medium whitespace-normal">
                {{ box?.name }}
              </p>
            </div>
          </div>
        </div>
        <!-- End GRID template -->
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
      isGridAndList: true,
      topFilterData: [],
      actionUrl: '',
      leftMap: {},
      tableHead: {},
      tableBody: [],
      allSelectAndInputValue: {},
      tableHeadLength: null,
      isThereBody: false,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      productCategory: [],
    }
  },

  // MOUNTED
  mounted() {
    this.tableHeadLength = Object.keys(this.tableHead).length + 1
    // Table function
    this.getTableRequest()
    // function
    this.createData()
  },

  // Methods
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },

    // PAGE Request
    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/products/productsList`, {
          searchForm: {
            keyword: this.allSelectAndInputValue?.keyword ?? '',
          },
          pagingForm: {
            pageSize: this.pageSize_value,
            currentPage: 1,
            pageCount: 14,
            total: 328,
          },
          productCategoryId:
            this.allSelectAndInputValue?.productCategoryId ?? null,
        })
        .then(
          ({
            data: {
              actionUrl,
              productListMap,
              rightMap,
              leftMap,
              productCategory,
            },
          }) => {
            this.actionUrl = actionUrl
            this.tableBody = productListMap
            this.leftMap = leftMap
            this.tableHead = rightMap
            this.productCategory = productCategory

            this.tableBody.length
              ? (this.isThereBody = true)
              : (this.isThereBody = false)
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic_Input value
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    gridListAction(btnClickType) {
      btnClickType === 'list'
        ? (this.isGridAndList = true)
        : (this.isGridAndList = false)
    },

    // page yuqorisidagi filterlar uchun data yaratish
    createData() {
      const createDate = [
        {
          name: 'Product Categories',
          subName: 'productCategoryId',
          type: 'select',
        },
      ]
      this.topFilterData = createDate
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
