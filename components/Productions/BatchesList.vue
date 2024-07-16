<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="rightMap"
        :left="leftMap"
        :url="actionUrl"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <form class="flex flex-wrap items-center gap-3 py-4">
      <span v-for="(element, index) in topFilterData" :key="index">
        <span v-if="element.type === 'text'" class="flex items-center gap-1">
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-input
            :value="''"
            width="165"
            type="text"
            :name="element.subName"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span v-if="element.type === 'number'" class="flex items-center gap-1">
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-input
            :value="`${allSelectAndInputValues?.year}`"
            width="165"
            type="number"
            :name="element.subName"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span
          v-else-if="element.type === 'date'"
          class="flex items-center gap-1"
        >
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-input-date-page
            :value="''"
            width="165"
            pl="10"
            pr="10"
            pt="1"
            pb="1"
            textsize="13"
            type="datetime-local"
            valuecolor="rgba(0,0,0,0.7)"
            :name="element.subName"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span
          v-else-if="element.type === 'select'"
          class="flex items-center gap-1"
        >
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-look-up
            dwidth="200"
            :name="element.subName"
            :defvalue="''"
            :options-data="topFilterSelect"
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
            Batch List
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
        <GenericButton
          name="Add New"
          type="primary"
          :margin="true"
          @click="$router.push('/prepareBatchNew.htm')"
        />
        <div class="p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="text-[14px]">
              <select
                v-model="pageSize_value"
                class="border-[1px] border-solid border-[rgba(171,177,187,0.7)] w-[60px] px-[5px] py-[3px] cursor-pointer rounded-[2px] text-[14px] outline-none"
                @change="getTableRequest()"
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
                type="text"
                name="searchInput"
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
            :productions-action-buttons="true"
            open-url="prepareBatchNew"
            height="600"
            @pageEmitAction="getTableRequest"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericTablePage from '@components/GenericTable/GenericTablePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  // COMPONENTS
  components: {
    GenericButton,
    LoadingPage,
    GenericInput,
    GenericInputDatePage,
    ColumnConfigPage,
    GenericTablePage,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      topFilterData: [],
      allSelectAndInputValues: {},
      leftMap: {},
      rightMap: {},
      users: [],
      tableHeadData: {},
      tableHead: {},
      tableBody: [],
      customObject: {},
      tableHeadLength: null,
      isThereBody: false,
      checkModal: false,
      actionUrl: '',
      isOpenTable: true,
      isCloseTable: true,
      topFilterSelect: [],
    }
  },

  // MOUNTED
  mounted() {
    this.allSelectAndInputValues.year = new Date().getFullYear()
    // Table function
    this.getTableRequest()
    // function
    this.createDataFiltering()
  },

  // Methods
  methods: {
    // Column config uchun ishlaydi
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true

      const body = {
        actionUrl: 'batches',
      }
      this.$axios
        .post(`/base/columnsConfig`, body)
        .then(({ data: { leftMap, rightMap, actionUrl } }) => {
          this.isLoading = !this.isLoading
          this.leftMap = leftMap
          this.rightMap = rightMap
          this.actionUrl = actionUrl
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
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

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering() {
      const createDate = [
        {
          name: 'Date From',
          subName: 'dateFrom',
          type: 'date',
        },
        {
          name: 'Date To',
          subName: 'dateTo',
          type: 'date',
        },
        {
          name: 'Year',
          subName: 'year',
          type: 'number',
        },
        {
          name: 'Batch',
          subName: 'batch',
          type: 'text',
        },
        {
          name: 'Pantone Code',
          subName: 'pantoneCode',
          type: 'select',
        },
      ]

      this.topFilterData = createDate
    },

    // get Input, date, select datasini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValues, name, value)
    },

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
        batchYear: this.allSelectAndInputValues?.year || '',
        batchNumber: this.allSelectAndInputValues?.batch || '',
        colorId: this.allSelectAndInputValues?.pantoneCode || '',
      }

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batch/batchesAjaxLoad`, body)
        .then(
          ({
            data: { columnNamesMap, batchListMap, colorList, actionUrl },
          }) => {
            this.tableBody = batchListMap
            this.isLoading = !this.isLoading
            this.tableHeadData = columnNamesMap
            this.actionUrl = actionUrl
            this.topFilterSelect = colorList
            this.getTableBody()

            this.tableBody.length
              ? (this.isThereBody = true)
              : (this.isThereBody = false)
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
      for (const iterator in this.tableHeadData) {
        this.customObject[iterator] = {
          name: this.tableHeadData[iterator],
          code: this.tableHeadData[iterator],
        }
      }
      this.tableHead = this.customObject
      this.tableHeadLength = Object.keys(this.tableHead).length + 1
    },
    // Generic Table action End
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
