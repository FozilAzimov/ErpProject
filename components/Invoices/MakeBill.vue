<template>
  <div class="w-full p-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <form class="flex flex-wrap items-center gap-2 py-3">
      <template v-for="(element, index) in topFilterData">
        <span
          v-if="element.type === 'date'"
          :key="index"
          class="flex flex-col items-start gap-1"
        >
          <span class="text-[12px] font-light">{{ element.name }}</span>
          <generic-input-date-page
            :value="allSelectAndInputValues?.[element?.subName]"
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
            :durl="element?.api"
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
            Make Bill
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
        <div class="p-3 flex items-center gap-5">
          <generic-button name="Accept" type="primary" @click="acceptAction" />
          <generic-button
            name="Make Bill"
            type="primary"
            :disabled="isMakeBillBtn"
            @click="makeBillAction"
          />
        </div>
        <div class="p-3">
          <span class="text-[15px]">Count Invoice: {{ makeBillCount }}</span>
          <ul>
            <li
              v-for="(value, index) in makeBillData"
              :key="index"
              class="text-[14px] text-[#9c2121]"
            >
              {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: {
    LoadingPage,
    GenericInputDatePage,
    GenericLookUp,
    GenericButton,
  },
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      topFilterData: [],
      allLookUpValues: {},
      isOpenTable: true,
      isCloseTable: true,
      isMakeBillBtn: true,
      makeBillCount: null,
      makeBillData: {},
      makeBillSendPayloadData: {},
      allSelectAndInputValues: {},
    }
  },

  // CREATED
  created() {
    this.allSelectAndInputValues.dateFrom = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    )
      .toISOString()
      .split('.')[0]
    this.allSelectAndInputValues.dateTo = new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    )
      .toISOString()
      .split('.')[0]
  },

  // MOUNTED
  mounted() {
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
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

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
      }
      // request body
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/makeBill`, body)
        .then(() => {
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Accept action
    acceptAction() {
      if (
        this.allSelectAndInputValues?.dateFrom &&
        this.allSelectAndInputValues?.dateTo &&
        this.allSelectAndInputValues?.warehouseId &&
        this.allSelectAndInputValues?.invoiceTypeId
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/invoices/makeBillReportsData`, this.allLookUpValues)
          .then(({ data, status }) => {
            this.isLoading = !this.isLoading
            if (status === 200) this.isMakeBillBtn = false
            this.makeBillCount = data.countInvoice
            this.makeBillSendPayloadData = data.invoiceIds
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else this.$notification(`Ma'lumotni to'liq to'ldiring`)
    },

    // MAke Bill action
    makeBillAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/makeBillSendData`, {
          invoiceIds: this.makeBillSendPayloadData,
        })
        .then(({ data, status }) => {
          this.isLoading = !this.isLoading
          if (status === 200) this.isMakeBillBtn = true
          this.makeBillData = data?.errorInvoiceIds
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

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
          name: 'Company Branch',
          subName: 'branchCompanyId',
          api: 'findAllCompanyLogic',
          param: {
            branchcompany: true,
          },
          type: 'select',
        },
        {
          name: 'Department',
          subName: 'departmentId',
          api: 'findAllDepartmentByAbsoluteLogic',
          param: {
            branchCompanyId:
              this.allSelectAndInputValues?.branchCompanyId ?? null,
          },
          type: 'select',
        },
        {
          name: 'Warehouse',
          subName: 'warehouseId',
          api: 'findAllWarehouseByAbsoluteLogic',
          param: {
            branchCompanyId:
              this.allSelectAndInputValues?.branchCompanyId ?? null,
            departmentId: this.allSelectAndInputValues?.departmentId ?? null,
          },
          type: 'select',
        },
        {
          name: 'Invoice Types',
          subName: 'invoiceTypeId',
          api: 'findAllInvoiceType',
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
