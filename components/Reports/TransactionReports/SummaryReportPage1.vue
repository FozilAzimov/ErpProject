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
              for="cur"
              class="text-[13px] text-[] cursor-pointer tracking-[1.1] text-nowrap"
              >Currency</label
            >
            <LookUp
              durl="invoiceBase/findAllCurrency"
              dwidth="200"
              height="29"
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
            <GenericActiveLookUpPage
              v-if="data.length"
              v-model="requiredLookup"
              placeholder="Bank Sell Rate"
              :data="data"
              :isrequired="required"
              @customLookupValue="bankSellRate"
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
      <div class="flex items-start justify-between p-5">
        <!-- Left Box Start -->
        <div class="w-[45%]">
          <div class="flex flex-col my-1">
            <span class="text-[rgb(49,126,172)] text-[28px] font-semibold">
              Daily report behind
            </span>
            <span class="text-[rgb(49,126,172)] text-[13px] font-medium">{{
              dateF
            }}</span>
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Report on income and expenditure in the context of Money
            </span>
            <PageTable
              :header="header1"
              :tablebody="tableBody?.resultDataCreditDebit"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Production Invoice Report
            </span>
            <PageTable
              :header="header2"
              :tablebody="tableBody?.resultSummaryQtyByProductionInput"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Stock Report
            </span>
            <PageTable
              :header="header3"
              :tablebody="tableBody?.resultSummaryQtyByStock"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Sales Report
            </span>
            <PageTable
              :header="header3"
              :tablebody="tableBody?.resultSummaryQtyBySale"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Expense report
            </span>
            <PageTable
              :header="header3"
              :tablebody="tableBody?.resultSummaryQtyByExpense"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Attendance Report
            </span>
            <PageTable :header="header6" :tablebody="tableBody6" />
          </div>
        </div>
        <!-- Right Box Start -->
        <div class="w-[45%]">
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
              Report on income and expenditure in the context of Money
            </span>
            <PageTable
              :header="header1"
              :tablebody="tableBody?.resultDataCreditDebitForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Production Invoice Report
            </span>
            <PageTable
              :header="header2"
              :tablebody="tableBody?.resultSummaryQtyByProductionInputForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Stock Report
            </span>
            <PageTable
              :header="header3"
              :tablebody="tableBody?.resultSummaryQtyByStockForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Sales Report
            </span>
            <PageTable
              :header="header3"
              :tablebody="tableBody?.resultSummaryQtyBySaleForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Expense report
            </span>
            <PageTable
              :header="header3"
              :tablebody="tableBody?.resultSummaryQtyByExpenseForMonth"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '../../Button/GenericButton.vue'
import GenericActiveLookUpPage from '../../Generics/GenericActiveLookUp/GenericActiveLookUpPage.vue'
import GenericInput from '../../Input/GenericInput.vue'
import LookUp from '../../Lookup/LookUp.vue'
import PageTable from './PageTable.vue'

export default {
  components: {
    GenericButton,
    GenericActiveLookUpPage,
    LookUp,
    GenericInput,
    PageTable,
  },

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
    isopen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isLoading: false,
      required: false,
      required2: true,
      isCloseTableUI: false,
      requiredLookup: '',
      dateFrom: this.from,
      inputValuesObj: new Map(),
      currencyId: new Map(),
      rateTypeId: null,
      currencyRate: null,
      currencySymbol: null,
      dateF: null,
      dateT: null,
      tableBody: {},
      tableBody6: [],
      header1: ['Id', 'Type', 'Debit', 'Credit', 'Saldo Debit', 'Saldo Credit'],
      header2: ['Id', 'Type', 'Planning', 'Qty', 'U/M'],
      header3: ['Id', 'Design Variant', 'Color', 'Qty', 'U/M'],
      header6: [
        'Total',
        'Present ( Without Delay )',
        'Present ( With Delay )',
        'Absent',
        'Outside Of Work Schedule',
      ],
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
            this.dateF = data?.dateF
            this.dateT = data?.dateT
            this.tableBody = data
            this.tableBody6.push(data?.resultLastEntryPersons)
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
