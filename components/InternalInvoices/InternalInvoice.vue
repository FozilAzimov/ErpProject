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
    <form class="flex flex-wrap items-center gap-3 py-4">
      <div>
        <label for="from" class="text-[13px] cursor-pointer tracking-[1.1]"
          >Date from</label
        >
        <GenericInputDatePage
          id="from"
          v-model="formData.from"
          width="165"
          @change="getInputDateValues"
        />
      </div>
      <div>
        <label for="to" class="text-[13px] cursor-pointer">Date to</label>
        <GenericInputDatePage
          id="to"
          v-model="formData.to"
          width="165"
          @change="getInputDateValues"
        />
      </div>
      <div class="flex items-center gap-1">
        <label for="pay" class="text-[13px] cursor-pointer">Status (Pay)</label>
        <GenericSelect
          id="pay"
          v-model="formData.pay"
          :data="selectData?.payStatusList"
          textsize="13"
          @change="getSelectValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <label for="deny" class="text-[13px] cursor-pointer"
          >Status (deny)</label
        >
        <GenericSelect
          id="deny"
          v-model="formData.from"
          :data="selectData?.denyStatusList"
          textsize="13"
          @change="getSelectValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <label for="warehouse" class="text-[13px] cursor-pointer"
          >Sender warehouse</label
        >
        <GenericSelect
          id="warehouse"
          v-model="formData.from"
          :data="selectData?.warehouseLi"
          textsize="13"
          @change="getSelectValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <label for="warehouseRef" class="text-[13px] cursor-pointer"
          >Warehouse Ref</label
        >
        <GenericSelect
          id="warehouseRef"
          v-model="formData.from"
          :data="selectData?.warehouseLi"
          textsize="13"
          @change="getSelectValue"
        />
      </div>
    </form>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            INTERNAL LIST
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
            ? 'duration-[1s] h-[750px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex items-center gap-2 m-2">
          <generic-button
            name="Internal Invoice"
            type="primary"
            @click="goToPageAction('yes_internalStatus')"
          />
          <generic-button
            name="Via Branch Invoice"
            type="primary"
            @click="goToPageAction('not_internalStatus')"
          />
          <generic-button name="Packaging and transfer" type="primary" />
          <!-- @click="$router.push('/prepareSaleInvoiceNew.htm')" -->
          <generic-button
            name="Internal application"
            type="primary"
            @click="goToPageActionTwo('yes_internalStatus')"
          />
          <generic-button
            name="Viabranch application"
            type="primary"
            @click="goToPageActionTwo('not_internalStatus')"
          />
        </div>
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
                v-model="keywordValue"
                width="200"
                type="text"
                placeholder="Search..."
                @enter="getTableRequest"
                @input="getInputValue"
              />
              <generic-button
                name="Search"
                type="primary"
                icon-name-attribute="search"
                @click="getTableRequest"
              />
              <generic-button
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
            open-url="prepareInternalInvoiceNew"
            height="600"
            btn-name="sendInvoiceWithQrCode"
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
import GenericSelect from '@components/Select/GenericSelect.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericTablePage from '@components/GenericTable/GenericTablePage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericSelect,
    GenericInputDatePage,
    ColumnConfigPage,
    GenericTablePage,
  },
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      keywordValue: '',
      users: [],
      tableData: [],
      tableHead: {},
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      tableId: [],
      selectData: {},
      formData: new Map(),
      checkModal: false,
      actionUrl: '',
      leftMap: {},
      isOpenTable: true,
      isCloseTable: true,
    }
  },

  mounted() {
    // Table function
    this.getTableRequest()
  },

  // Methods
  methods: {
    // Page btn click action
    goToPageAction(prop) {
      const dataThatStoresTrueAndFalse = {}
      if (prop === 'yes_internalStatus') {
        dataThatStoresTrueAndFalse.internalStatus = true
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify(dataThatStoresTrueAndFalse)
        )
      } else if (prop === 'not_internalStatus') {
        dataThatStoresTrueAndFalse.internalStatus = false
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify(dataThatStoresTrueAndFalse)
        )
      }
      this.$router.push('/prepareInternalInvoiceNew.htm')
    },
    // Page btn click action
    goToPageActionTwo(prop) {
      const dataThatStoresTrueAndFalse = {}
      if (prop === 'yes_internalStatus') {
        dataThatStoresTrueAndFalse.internalStatus = true
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify(dataThatStoresTrueAndFalse)
        )
      } else if (prop === 'not_internalStatus') {
        dataThatStoresTrueAndFalse.internalStatus = false
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify(dataThatStoresTrueAndFalse)
        )
      }
      //   this.$router.push('/prepareInternalInvoiceNewDevice.htm')
    },

    handleValue(checkModal) {
      this.checkModal = checkModal
    },

    openColumnConfig() {
      this.checkModal = true
    },

    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(
          `/invoices/internalInvoice`,
          {
            internalStatus: true,
            current_page: 1,
            page_size: this.pageSize_value,
            searchForm: {
              keyword: this.keywordValue,
              from_date: new Date(Object.fromEntries(this.formData).from)
                .toLocaleString('en-GB')
                .split(',')
                .join(''),
              to_date: new Date(Object.fromEntries(this.formData).to)
                .toLocaleString('en-GB')
                .split(',')
                .join(''),
            },
            payStatus: Object.fromEntries(this.formData).pay,
            denyStatus: Object.fromEntries(this.formData).deny,
            warehouseId: Object.fromEntries(this.formData).warehouse,
            warehouseRefId: Object.fromEntries(this.formData).warehouseRef,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then(({ data }) => {
          this.tableBody = []
          this.isLoading = !this.isLoading
          this.tableHead = data.rightMap
          this.leftMap = data.leftMap
          this.actionUrl = data.actionUrl
          this.tableData = data.invoiceList
          this.selectData = data.invoiceSearchDTO
          this.getTableBody()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic Table action Start
    getTableBody() {
      const arr = new Set()
      for (const obj of this.tableData) {
        arr.add(obj.id)
        const data = new Map()
        for (const key in this.tableHead) {
          const value = this.tableHead[key].code
          if (this.tableHead[key].code in obj) {
            if (obj[value]) {
              if (typeof obj[value] === 'object')
                data.set(value, obj[value].value)
              else data.set(value, obj[value])
            } else data.set(value, obj[value])
          } else data.set(value, false)
        }
        this.tableBody.push(Object.fromEntries(data))
      }
      this.tableHeadLength = Object.entries(this.tableHead).length
      this.tableBody.length > 0
        ? (this.isThereBody = true)
        : (this.isThereBody = false)
      this.tableId = Array.from(arr)
    },
    // Generic Table action End

    // Generic_Date value
    getInputDateValues(value, id) {
      this.formData.set(id, value)
    },

    // Generic_Select value
    getSelectValue(value, formDataId, isDefOptionTitle, index, id) {
      this.formData.set(id, value)
    },

    // Generic_Input value
    getInputValue(inputVal) {
      this.keywordValue = inputVal
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
