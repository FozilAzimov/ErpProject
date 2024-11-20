<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
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
            Cluster Camera
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
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="p-2">
          <div
            class="flex flex-col items-start gap-5 p-4 shadow-lg rounded-lg border-[1px] border-solid border-[#E5E5E5] mb-4"
          >
            <span
              v-for="(element, index) in topFilterData"
              :key="index"
              class="w-[350px] flex items-center justify-between"
            >
              <template v-if="element.type === 'date'">
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input-date-page
                  :value="''"
                  width="250"
                  :name="element.subName"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </template>
              <template v-else-if="element.type === 'select'">
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-look-up
                  dwidth="250"
                  :name="element.subName"
                  :defvalue="''"
                  :durl="element?.url"
                  :dparam="element?.params"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </template>
              <template v-else-if="element.type === 'number'">
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input
                  type="number"
                  :name="element?.subName"
                  width="250"
                />
              </template>
            </span>

            <div class="flex items-center gap-2">
              <generic-button
                name="Accept"
                type="primary"
                @click="getTableAction"
              />
              <generic-button
                name="Print Preview"
                type="success"
                icon-name-attribute="printer"
                @click="getTableAction"
              />
            </div>
          </div>

          <GenericTablePage
            v-if="isShowHideTable"
            :tablehead="tableHead"
            :tablebody="tableBody"
            :tableheadlength="tableHeadLength"
            :istherebody="isThereBody"
            open-url="prepareBatchProcess"
            :productions-action-buttons="true"
            delete-row-url="batchProcess/prepareBatchProcessDelete"
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
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@components/Generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  components: {
    LoadingPage,
    ColumnConfigPage,
    GenericInputDatePage,
    GenericLookUp,
    GenericButton,
    GenericInput,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      topFilterData: [],
      btnType: '',
      pageID: null,
      keywordValue: '',
      tableHead: {
        id: { name: 'Id', code: 'id' },
        name: {
          name: 'Batch Process Name',
          code: 'name',
        },
        status: {
          name: 'Status',
          code: 'status',
        },
      },
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      isShowHideTable: false,
    }
  },

  // WATCH
  watch: {
    pageID(newVal) {
      this.btnTypeSpecifyingAction()
    },
  },

  // CREATED
  created() {
    this.btnType = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.type
    // page ID sini olish
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    this.tableHeadLength = Object.keys(this.tableHead).length + 1
    // Table function
    this.getTableRequest()
    // function
    this.createDataFiltering()
  },

  // Methods
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },

    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batchProcess/batchProcessAjaxLoad`, {
          searchForm: {
            keyword: this.keywordValue,
          },
          pagingForm: {
            pageSize: this.pageSize_value,
            currentPage: 1,
            pageCount: 14,
            total: 328,
          },
        })
        .then(({ data: { batchProcessList } }) => {
          this.isLoading = !this.isLoading
          this.tableBody = batchProcessList

          this.tableBody.length
            ? (this.isThereBody = true)
            : (this.isThereBody = false)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Specifying the buttun type action
    btnTypeSpecifyingAction() {
      if (!this.pageID) {
        localStorage.removeItem('allTrueAndFalseData')
      }
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

    getTableAction() {
      this.isShowHideTable = true
    },

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering() {
      const createDate = [
        {
          name: 'Start Date',
          subName: 'startDate',
          type: 'date',
        },
        {
          name: 'End Date',
          subName: 'endDate',
          type: 'date',
        },
        {
          name: 'Client',
          subName: 'clientId',
          type: 'select',
          url: 'findAllCompany',
          params: {
            branchcompany: false,
          },
        },
        {
          name: 'Department',
          subName: 'departmentId',
          type: 'select',
          url: 'findAllDepartment',
        },
        {
          name: 'Warehouse',
          subName: 'warehouseId',
          type: 'select',
          url: 'findAllWarehouse',
          params: {
            branchCompanyId: null,
            departmentId: null,
          },
        },
        {
          name: 'Equipment',
          subName: 'equipmentId',
          type: 'select',
          url: 'findAllEquipments',
        },
        {
          name: 'Invoice',
          subName: 'invoice',
          type: 'number',
        },
        {
          name: 'PK',
          subName: 'pk',
          type: 'number',
        },
        {
          name: 'Id',
          subName: 'id',
          type: 'number',
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
