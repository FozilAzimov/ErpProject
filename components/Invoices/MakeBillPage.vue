<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <form class="flex flex-wrap items-center gap-3 py-4">
      <div>
        <span class="text-[13px] cursor-pointer tracking-[1.1]">Date from</span>
        <GenericInputDatePage
          width="190"
          height="25"
          pl="10"
          pr="10"
          pt="2"
          pb="2"
          textsize="13"
          type="datetime-local"
          valuecolor="rgba(0,0,0,0.7)"
          name="dateFrom"
          @customFunction="getInputDateValues"
        />
      </div>
      <div>
        <span class="text-[13px] cursor-pointer">Date to</span>
        <GenericInputDatePage
          width="190"
          height="25"
          pl="10"
          pr="10"
          pt="2"
          pb="2"
          textsize="13"
          type="datetime-local"
          valuecolor="rgba(0,0,0,0.7)"
          name="dateTo"
          @customFunction="getInputDateValues"
        />
      </div>
      <div class="flex items-center gap-1">
        <span class="text-[13px] cursor-pointer">Company Branch</span>
        <look-up
          durl="invoiceBase/findAllCompanyLogic"
          :dparam="{ branchcompany: true }"
          dwidth="150"
          dlist="100"
          name="companyBranch"
          @customFunction="getLookUpValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <span class="text-[13px] cursor-pointer">Departments</span>
        <look-up
          durl="invoiceBase/findAllDepartment"
          :dparam="{ branchcompany: null }"
          dwidth="150"
          dlist="100"
          name="department"
          @customFunction="getLookUpValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <span class="text-[13px] cursor-pointer">Warehouse</span>
        <look-up
          durl="invoiceBase/findAllWarehouse"
          :dparam="{ branchcompany: null, departmentId: null }"
          dwidth="150"
          dlist="100"
          name="warehouseId"
          @customFunction="getLookUpValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <span class="text-[13px] cursor-pointer">Invoice Type</span>
        <look-up
          durl="invoiceBase/findAllInvoiceType"
          dwidth="150"
          dlist="100"
          name="invoiceTypeId"
          @customFunction="getLookUpValue"
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
import LookUp from '@generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: {
    LoadingPage,
    GenericInputDatePage,
    LookUp,
    GenericButton,
  },
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      keywordValue: '',
      allLookUpValues: {},
      isOpenTable: true,
      isCloseTable: true,
      isMakeBillBtn: true,
      makeBillCount: null,
      makeBillData: {},
      makeBillSendPayloadData: {},
    }
  },
  mounted() {
    // Table function
    this.getTableRequest()
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
        .post(`/invoices/makeBill`)
        .then(({ data }) => {
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Look Up values
    getLookUpValue(name, valueText, valueId) {
      this.$set(this.allLookUpValues, name, valueId)
    },

    // Generic_Date value
    getInputDateValues(name, value) {
      const [day, month, year, time] = value.split(/[-/T]+/)
      this.$set(
        this.allLookUpValues,
        name,
        `${year}/${month}/${day} ${time}:00`
      )
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

    acceptAction() {
      if (
        this.allLookUpValues?.dateFrom &&
        this.allLookUpValues?.dateTo &&
        !isNaN(this.allLookUpValues?.warehouseId) &&
        !isNaN(this.allLookUpValues?.invoiceTypeId)
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
      }
    },

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
