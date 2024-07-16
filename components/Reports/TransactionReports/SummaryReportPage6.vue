<template>
  <div class="h-inherit">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      :class="
        !isopen
          ? 'duration-[0.4s] h-[100px]'
          : 'duration-[0.4s] h-0 overflow-hidden'
      "
    >
      <div class="w-full p-4 bg-[#f8f8f8] shadow-[0_0_7px_rgba(0,0,0,0.3)]">
        <form class="flex items-center gap-3 flex-wrap">
          <div class="flex items-center gap-1">
            <label
              for="from"
              class="text-[13px] text-[] cursor-pointer tracking-[1.1] text-nowrap"
              >Start date</label
            >
            <GenericInput
              v-if="dateFrom"
              id="from"
              v-model="dateFrom"
              width="200"
              height="29"
              pl="10"
              pr="10"
              pt="2"
              pb="2"
              textsize="13"
              type="text"
            />
          </div>
          <div class="flex items-center gap-1">
            <label
              for="to"
              class="text-[13px] text-[] cursor-pointer tracking-[1.1] text-nowrap"
              >Start date</label
            >
            <GenericInput
              v-if="dateTo"
              id="to"
              v-model="dateTo"
              width="200"
              height="29"
              pl="10"
              pr="10"
              pt="2"
              pb="2"
              textsize="13"
              type="text"
            />
          </div>
          <div class="flex items-center gap-1">
            <label
              for="cur"
              class="text-[13px] text-[] cursor-pointer tracking-[1.1] text-nowrap"
              >Currency</label
            >
            <generic-look-up
              durl="findAllCurrency"
              dwidth="200"
              name="currency"
              :required="required2"
              @customFunction="getLookUpValue"
            />
          </div>
          <div class="flex items-center gap-1">
            <label
              for="rate"
              class="text-[13px] text-[] cursor-pointer tracking-[1.1] text-nowrap"
              >Currency Rate</label
            >
            <generic-look-up
              v-if="data.length"
              :options-data="data"
              :required="required"
              placeholder="Bank Sell Rate"
              @customFunction="bankSellRate"
            />
          </div>
        </form>
        <GenericButton
          name="Accept"
          pl="10"
          pt="2"
          pr="10"
          pb="2"
          bg="rgba(54, 155, 215, 0.8)"
          textsize="14"
          class="mt-[15px]"
          @click="getTableUI"
        />
      </div>
    </div>
    <div
      :class="
        isCloseTableUI
          ? 'duration-[1s] h-[620px] overflow-auto '
          : 'duration-[1s] h-0 overflow-hidden'
      "
    >
      <div class="mt-3">
        <span class="block text-[red] font-semibold text-center text-[18px]">
          Currency Rate {{ currencyRate }} {{ currencySymbol }}
        </span>
      </div>
      <div class="flex items-start justify-center p-5">
        <!-- Right Box Start -->
        <div class="w-[80%]">
          <div class="flex flex-col my-1">
            <span class="text-[rgb(49,126,172)] text-[28px] font-semibold">
              Monthly report behind
            </span>
            <span class="text-[rgb(49,126,172)] text-[13px] font-medium">{{
              `${dateF} - ${dateT}`
            }}</span>
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              totalProduction
            </span>
            <PageTable
              :tablebody="tableBody?.resultSummaryQtyByFinishedBatchForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Sale
            </span>
            <PageTable
              :tablebody="tableBody?.resultSummaryQtyAndAmountBySaleInvoice"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Knitting
            </span>
            <PageTable
              :tablebody="tableBody?.resultSummaryKnittingServicePrice"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Expenses
            </span>
            <PageTable
              :tablebody="tableBody?.resultSummaryExpenseProductsByCategory"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Finance
            </span>
            <PageTable :tablebody="tableBody?.resultSummaryFinanceExpense" />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Cost
            </span>
            <PageTable :tablebody="tableBody?.resultCostPriceForProduction" />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Saldo
            </span>
            <PageTable
              :topheader="topHeader"
              :header="header2"
              :tablebody="tableBody?.resultSummaryQtyByProductionInput"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Entry
            </span>
            <PageTable :tablebody="tableBody?.entryResultDataCreditDebitList" />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              SaleCost
            </span>
            <PageTable :tablebody="tableBody?.resultCostPriceForSale" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@components/Button/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import PageTable from '@components/Reports/TransactionReports/PageTable.vue'
export default {
  components: {
    GenericButton,
    GenericLookUp,
    GenericInput,
    PageTable,
  },

  // PROPS
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    actionname: {
      type: String,
      default: '',
    },
    from: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    isopen: {
      type: Boolean,
      default: false,
    },
  },

  // DATA
  data() {
    return {
      isLoading: false,
      required: false,
      required2: true,
      isCloseTableUI: false,
      requiredLookup: '',
      dateFrom: this.from,
      dateTo: this.to,
      inputValuesObj: new Map(),
      currencyId: new Map(),
      rateTypeId: null,
      currencyRate: null,
      currencySymbol: null,
      tableBody: {},
      topHeader: {},
      dateF: null,
      dateT: null,
      header1: ['Id', 'Name', 'Round'],
      header2: ['Id', 'Saldo', 'Debit', 'Credit'],
    }
  },

  methods: {
    // Lookup's Valuesini olish
    getLookUpValue(key, value, id) {
      this.inputValuesObj.set(key, value)
      this.currencyId.set(key, id)
      // LookUp required action
      this.inputValuesObj.get('currency')
        ? (this.required2 = true)
        : (this.required2 = false)
    },
    // Required Look up
    bankSellRate(value, id) {
      this.rateTypeId = id
      this.requiredLookup = value
      this.requiredLookup ? (this.required = false) : (this.required = true)
    },
    // Accept action
    getTableUI() {
      this.getLookUpValue()
      this.requiredLookup ? (this.required = false) : (this.required = true)

      if (!this.required && this.required2) {
        this.isLoading = !this.isLoading
        const requestBody = {
          actionName: this.actionname,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          currencyId: Number(this.currencyId.get('currency')),
          rateTypeId: this.rateTypeId,
        }
        this.$axios
          .post(`/transactionsReport/reportContent`, requestBody, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          })
          .then(({ data }) => {
            this.isLoading = !this.isLoading
            this.isCloseTableUI = true
            this.currencyRate = data?.fp?.currencyRate
            this.currencySymbol = data?.currencySymbol
            this.tableBody = data
            this.topHeader = data?.resultSummaryQtyByProductionInput[0]
            this.dateF = data?.dateF
            this.dateT = data?.dateT
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },
  },
}
</script>
