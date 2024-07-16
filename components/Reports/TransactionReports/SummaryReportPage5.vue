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
              >End date</label
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
            <PageTable
              :header="header"
              :tablebody="tableBody?.purchaseAndSaleHasUnitPriceList"
            />
          </div>
          <div class="flex flex-col my-4">
            <PageTable
              :header="header"
              :tablebody="tableBody?.purchaseAndSaleNotUnitPriceList"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Cashbox Production expense
            </span>
            <PageTable
              :header="genericHead2"
              :tablebody="tableBody?.resultDataCashForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Bank TransactionsExit
            </span>
            <PageTable
              :header="genericHead1"
              :tablebody="tableBody?.resultDataBankForMonth"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Bank TransactionsExit
            </span>
            <PageTable
              :header="genericHead1"
              :tablebody="tableBody?.resultDataBankForMonth2"
            />
          </div>
          <div class="flex flex-col my-4">
            <span class="text-[rgb(49,126,172)] text-[18px] font-semibold">
              Bank TransactionsExit
            </span>
            <PageTable
              :header="genericHead1"
              :tablebody="tableBody?.resultDataBankForMonth3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@components/Button/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import PageTable from '@components/Reports/TransactionReports/PageTable.vue'

export default {
  components: {
    GenericButton,
    GenericInput,
    PageTable,
  },

  props: {
    from: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    actionname: {
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
      isCloseTableUI: false,
      dateFrom: this.from,
      dateTo: this.to,
      rateTypeId: null,
      currencyRate: null,
      currencySymbol: null,
      dateF: null,
      dateT: null,
      tableBody: {},
      tableBody6: [],
      genericHead1: [],
      genericHead2: [],
      bankList: [],
      cashboxList: [],
      header: [
        'Id',
        'PRODUCT CATEGORY LIST',
        'Warehouses',
        'Measurement',
        'Currency Name',
        'Purchase Invoice',
        'Purchase Amount',
        'Production',
        'Production Amount',
        'Sale Invoice',
        'Sales Amount',
      ],
    }
  },

  methods: {
    // Accept action
    getTableUI() {
      this.isLoading = !this.isLoading
      const requestBody = {
        actionName: this.actionname,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
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
          this.currencyRate = data?.currencyRateValue
          this.currencySymbol = data?.currencySymbol
          this.body = data
          this.dateF = data?.dateF
          this.dateT = data?.dateT
          this.bankList = data?.bankList
          this.cashboxList = data?.cashboxList
          this.tableBody6.push(data?.resultLastEntryPersons)
          this.genericHeadAction()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    genericHeadAction() {
      this.genericHead1 = []
      this.genericHead2 = []
      this.bankList.forEach((obj) => this.genericHead1.push(obj.account_name))
      this.cashboxList.forEach((obj) => this.genericHead2.push(obj.name))
      this.genericHead1.unshift('Id', 'Company Name', 'Payment Type')
      this.genericHead2.unshift('Id', 'Company Name', 'Payment Type')
      this.genericHead1.push('Total')
      this.genericHead2.push('Total')
    },
  },
}
</script>
