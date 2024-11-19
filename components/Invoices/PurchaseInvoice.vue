<template>
  <div class="w-full px-1">
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
    <form class="flex flex-wrap items-center gap-1 py-3">
      <template v-for="(element, index) in topFilterData">
        <span
          v-if="element.type === 'date'"
          :key="index"
          class="flex flex-col items-start gap-1"
        >
          <span class="text-[12px] font-light">{{ element.name }}</span>
          <generic-input-date-page
            :value="allSelectAndInputValues?.[element?.subName]"
            width="185"
            pl="10"
            pr="10"
            pt="1"
            pb="1"
            textsize="13"
            type="datetime-local"
            valuecolor="rgba(0,0,0,0.7)"
            :name="element?.subName"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span
          v-else-if="element.type === 'select'"
          :key="`unique-${index}`"
          class="flex flex-col items-start gap-1"
        >
          <span class="text-[12px] font-light">{{ element.name }}</span>
          <generic-look-up
            :dwidth="`${element?.width}`"
            :name="element?.subName"
            :options-data="selectData?.[element.selectName]"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
      </template>
    </form>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Purchase Invoice List
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
        <generic-button
          name="Add New"
          type="primary"
          :margin="true"
          icon-name-attribute="circle-plus-outline"
          @click="$router.push('preparePurchaseInvoiceNew.htm')"
        />
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
            open-url="preparePurchaseInvoiceNew"
            height="600"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@components/Generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericTablePage from '@components/GenericTable/GenericTablePage.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericInputDatePage,
    ColumnConfigPage,
    GenericTablePage,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      topFilterData: [],
      tableHead: {},
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      allSelectAndInputValues: {},
      checkModal: false,
      actionUrl: null,
      leftMap: {},
      selectData: {},
      productionOrderStatus: null,
    }
  },

  // CREATED
  created() {
    this.allSelectAndInputValues.dateFrom = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    )
      .toISOString()
      .split('.')[0]
    this.allSelectAndInputValues.dateTo = new Date().toISOString().split('.')[0]
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
    // function
    this.createDataFiltering()
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
      // request body
      const body = {
        pagingForm: {
          currentPage: 1,
          pageSize: this.pageSize_value,
        },
        searchForm: {
          keyword: this.allSelectAndInputValues?.searchInput ?? '',
        },
        dateFrom1: this.allSelectAndInputValues?.dateFrom
          ? this.$formatDate(this.allSelectAndInputValues.dateFrom)
          : '',
        dateTo1: this.allSelectAndInputValues?.dateTo
          ? this.$formatDate(this.allSelectAndInputValues.dateTo)
          : '',
        billStatus: this.allSelectAndInputValues?.billStatus ?? '',
        payStatus: this.allSelectAndInputValues?.payStatus ?? '',
        invoiceOnWayStatus:
          this.allSelectAndInputValues?.invoiceOnWayStatus ?? '',
        departmentId: this.allSelectAndInputValues?.departmentId ?? '',
        warehouseId: this.allSelectAndInputValues?.warehouseId ?? '',
        confirmStatus: this.allSelectAndInputValues?.confirmStatus ?? '',
      }
      // request body
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/purchaseinvoice`, body)
        .then(({ data }) => {
          this.actionUrl = data?.actionUrl
          this.tableHead = data?.rightMap
          this.leftMap = data?.leftMap
          this.selectData = data
          // function
          this.getTableBody(data?.invoiceList)
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic Table action Start
    getTableBody(bodyData) {
      this.tableBody = []
      for (const obj of bodyData) {
        const newObj = {}
        for (const key in this.tableHead) {
          const keyCode = this.tableHead[key]?.code
          if (keyCode in obj) {
            if (typeof obj[keyCode] === 'object')
              newObj[keyCode] = obj[keyCode]?.value
            else newObj[keyCode] = obj[keyCode]
          }
        }
        this.tableBody.push(newObj)
      }
      this.tableHeadLength = Object.keys(this.tableHead).length
      this.tableBody.length > 0
        ? (this.isThereBody = true)
        : (this.isThereBody = false)
    },
    // Generic Table action End

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
          width: 150,
          name: 'Status Bill',
          subName: 'billStatus',
          selectName: 'billStatusList',
          type: 'select',
        },
        {
          width: 150,
          name: 'Status Pay',
          subName: 'payStatus',
          selectName: 'payStatusList',
          type: 'select',
        },
        {
          width: 150,
          name: 'Invoice (Status)',
          subName: 'invoiceOnWayStatus',
          selectName: 'invoiceOnWayStatusList',
          type: 'select',
        },
        {
          width: 200,
          name: 'Departments',
          subName: 'departmentId',
          selectName: 'departmentList',
          type: 'select',
        },
        {
          width: 200,
          name: 'Warehouse',
          subName: 'warehouseId',
          selectName: 'warehouseList',
          type: 'select',
        },
        {
          width: 200,
          name: 'invoiceConfirmedStatus',
          subName: 'confirmStatus',
          selectName: 'confirmStatusList',
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
