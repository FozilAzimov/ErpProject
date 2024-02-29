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
              :header="header1"
              :tablebody="tableBody?.resultSummaryQtyByFinishedBatchForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Expense of a severe cloth on the production
            </span>
            <PageTable
              :header="header3"
              :tablebody="tableBody?.resultSummaryQtyByProductionInputForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Chemical consumption
            </span>
            <PageTable
              :header="header4"
              :tablebody="tableBody?.resultSummaryQtyByExpenseForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Production expense
            </span>
            <PageTable
              :header="genericHead2"
              :tablebody="tableBody?.resultDataCreditDebitForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Bank operations
            </span>
            <PageTable
              :header="genericHead1"
              :tablebody="tableBody?.resultDataBankForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Investment For Production
            </span>
            <PageTable
              :header="genericHead2"
              :tablebody="tableBody?.resultDataBankForMonth2"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Final calculation
            </span>
            <PageTable
              :header="header5"
              :tablebody="tableBody?.resultSummaryQtyByStock"
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
    to: {
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
      dateTo: this.to,
      inputValuesObj: new Map(),
      currencyId: new Map(),
      rateTypeId: null,
      currencyRate: null,
      currencySymbol: null,
      dateF: null,
      dateT: null,
      tableBody: {},
      bankList: [],
      cashboxList: [],
      genericHead1: [],
      genericHead2: [],
      header1: [
        'Id',
        'Planning Type',
        'Order Production Type',
        'U/M',
        'Qty',
        'Qty2',
        'Amount',
      ],
      header2: ['Id', 'Saldo', 'Debit', 'Credit'],
      header3: ['Id', 'Order Production Type', 'Qty2', 'Amount'],
      header4: ['Id', 'Department', 'Qty2', 'Amount'],
      header5: ['Id', 'Name', 'Total', 'U/M'],
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
            this.dateF = data?.dateF
            this.dateT = data?.dateT
            this.bankList = data?.bankList
            this.cashboxList = data?.cashboxList
            this.genericHeadAction()
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    genericHeadAction() {
      this.genericHead1 = []
      this.genericHead2 = []
      this.bankList.forEach((obj) => this.genericHead1.push(obj.account_name))
      this.cashboxList.forEach((obj) => this.genericHead2.push(obj.name))
      this.genericHead1.unshift('Id', 'Payment Type')
      this.genericHead2.unshift('Id', 'Payment Type')
      this.genericHead1.push('Total')
      this.genericHead2.push('Total')
    },
  },
}
</script>
