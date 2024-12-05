<template>
  <div class="w-full px-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <form class="flex flex-wrap items-center gap-3 py-3">
      <template v-for="(element, index) in topFilterData">
        <span
          v-if="element.type === 'date'"
          :key="index"
          class="flex items-center gap-1"
        >
          <span class="text-[12px] font-light">{{ element.name }}</span>
          <generic-date-time-picker
            :value="allSelectAndInputValues?.[element.subName]"
            width="175"
            :name="element.subName"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span
          v-else-if="element.type === 'select'"
          :key="`unique-${index}`"
          class="flex items-center gap-1"
        >
          <span class="text-[12px] font-light">{{ element.name }}</span>
          <generic-look-up
            :dwidth="`${element.width}`"
            :name="element.subName"
            :durl="element.api"
            :required="
              !element.required || allSelectAndInputValues?.[element.subName]
                ? true
                : false
            "
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span
          v-else-if="element.type === 'number'"
          :key="`uniqueTwo-${index}`"
          class="flex items-center gap-1"
        >
          <span class="text-[12px] font-light">{{ element.name }}</span>
          <generic-input
            :name="element.subName"
            :value="allSelectAndInputValues?.[element.subName]"
            :width="`${element.width}`"
            :disabled="element.disabled"
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
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px]">
            {{
              `${GET_CORE_STRING?.balance} ${GET_CORE_STRING?.report}` ||
              'Balance Reports'
            }}
          </h1>
          <generic-button
            :name="GET_CORE_STRING?.accept || 'Accept'"
            type="primary"
            @click="acceptAction"
          />
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] mb-10"
        :class="
          isOpenTable
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <!-- GRAPHIC -->
        <balance-reports-graphic v-show="graphData?.length" :data="graphData" />
        <!-- GRAPHIC -->

        <div v-if="showHideTable" class="h-[500px] overflow-y-auto">
          <div class="flex flex-col items-start">
            <div
              v-for="(arr, topKey) in resultDataObj"
              :key="topKey"
              class="w-full flex flex-col overflow-x-scroll"
            >
              <div
                class="h-[50px] bg-[rgb(34,139,197,0.56)] flex items-center justify-center border-[1px] border-solid whitespace-nowrap text-[#444] font-bold text-[14px]"
              >
                {{ GET_CORE_STRING[topKey] || topKey }}
              </div>
              <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
                <thead class="bg-[rgb(229,235,245)]">
                  <tr>
                    <th
                      v-for="(value, key) in arr[0]"
                      :key="key"
                      class="w-[200px] text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] px-4 py-2 whitespace-nowrap"
                    >
                      {{ GET_CORE_STRING[key] || key }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(obj, i) in arr"
                    :key="i"
                    class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] text-center"
                  >
                    <td
                      v-for="(value, subKey) in obj"
                      :key="subKey"
                      class="border-[1px] text-[12px] p-2"
                    >
                      {{
                        (subKey === 'total_amount' ||
                          subKey === 'real_count_sum' ||
                          subKey === 'amount') &&
                        parseFloat(value)
                          ? $formatNumber(value, 2)
                          : subKey === 'startDate' || subKey === 'endDate'
                          ? $formatDate(value)
                          : value
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericButton from '@generics/GenericButton.vue'
import BalanceReportsGraphic from '@components/Reports/BalanceReportsGraphic.vue'
import GenericDateTimePicker from '@generics/GenericDateTimePicker.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericInput,
    GenericButton,
    BalanceReportsGraphic,
    GenericDateTimePicker,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      isOpenTable: true,
      isCloseTable: true,
      showHideTable: false,
      topFilterData: [],
      allSelectAndInputValues: {},
      resultDataObj: {},
      graphData: [],
      bgColors: {
        allTransactionCreditDebit: '#D891EF',
        byCashboxAndBankAccount: '#F07427',
        byProductCategory: '#F4CA16',
        capital: '#318CE7',
        debitReverse: '#20B2AA',
        intangibleAsset: '#50C878',
        obligations: '#006262',
        profitsAndLosses: '#AF002A',
      },
    }
  },

  // COMPUTED
  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },

  // WATCH
  watch: {
    // start CoreString action
    GET_CORE_STRING: {
      handler(newVal) {
        // function
        this.createDataFiltering(newVal)
        this.createGraphDataAction(this.resultDataObj)
      },
      deep: true,
    },
    // end CoreString action
  },

  // CREATED
  created() {
    this.allSelectAndInputValues.dateFrom = this.$formatDate(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    )
    this.allSelectAndInputValues.dateTo = this.$formatDate(new Date())
  },

  // MOUNTED
  mounted() {
    // function
    this.createDataFiltering(this.GET_CORE_STRING)
  },

  // METHODS
  methods: {
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
    // Table page ni ochish va yopish uchun

    // set Currency Rate Value
    setCurrencyRateValueAction(value) {
      value
        ? this.$axios
            .post(`/invoiceBase/getCurrentCurrencyRate`, {
              currencyId: value,
              settingsRateType: 'PURCHASE',
            })
            .then(
              ({
                data: {
                  paramsObject: { value },
                },
              }) => {
                this.$set(this.allSelectAndInputValues, 'currencyRate', value)
              }
            )
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error)
            })
        : this.$set(this.allSelectAndInputValues, 'currencyRate', '')
    },

    // get Input, date, select datasini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValues, name, value)
      name === 'currency' && this.setCurrencyRateValueAction(value)
    },
    // get Input, date, select datasini olish

    // page request action
    acceptAction() {
      if (this.allSelectAndInputValues?.currency) {
        // request body
        const body = {
          currencyRate: this.allSelectAndInputValues?.currencyRate,
          branchId: this.allSelectAndInputValues?.branch,
          dateFrom: this.allSelectAndInputValues?.dateFrom ?? '',
          dateTo: this.allSelectAndInputValues?.dateTo ?? '',
        }
        // request body
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/balance/prepareBalanceReports`, body)
          .then(({ data }) => {
            this.resultDataObj = data
            this.createGraphDataAction(data)
            this.showHideTable = true
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.showHideTable = false
        this.resultDataObj = {}
        this.graphData = []
        this.$notification(`Currency value not found.`)
      }
    },

    createGraphDataAction(obj) {
      this.graphData = []
      for (const key in obj) {
        const newObj = {
          label: this.GET_CORE_STRING[key] || key,
          fill: false,
          tension: 0.1,
          borderColor: this.bgColors?.[key],
        }
        if (obj[key]?.length) {
          const data = []
          obj[key].forEach((subObj) => {
            data.push(
              subObj?.total_amount ??
                subObj?.real_count_sum ??
                subObj?.amount ??
                null
            )
            newObj.data = data
          })
        }
        this.graphData.push(newObj)
      }
    },

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering(getText) {
      const createDate = [
        {
          name: getText?.startDate || 'Start date',
          subName: 'dateFrom',
          type: 'date',
        },
        {
          name: getText?.endDate || 'End date',
          subName: 'dateTo',
          type: 'date',
        },
        {
          width: 200,
          name: getText?.branch || 'Branch',
          subName: 'branch',
          api: 'findAllCompanyLogic',
          type: 'select',
        },
        {
          width: 150,
          name: getText?.currency || 'Currency',
          subName: 'currency',
          api: 'findAllCurrency',
          type: 'select',
          required: true,
        },
        {
          width: 100,
          name: getText?.currencyRate || 'Currency Rate',
          subName: 'currencyRate',
          type: 'number',
          disabled: true,
        },
      ]
      this.topFilterData = createDate
    },
  },
}
</script>
