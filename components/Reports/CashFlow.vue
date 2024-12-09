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
            {{ `${GET_CORE_STRING?.cashFlow} ${GET_CORE_STRING?.report}` }}
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
        <div v-if="showHideTable" class="h-screen overflow-y-auto">
          <div class="flex flex-col items-start">
            <div
              v-for="(arr, topKey, inx) in groupedObj"
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
                      class="w-[100px] text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] px-4 py-2"
                    >
                      №
                    </th>
                    <th
                      v-for="(value, key) in tableHead[inx]"
                      :key="key"
                      class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] px-4 py-2 whitespace-nowrap"
                    >
                      {{ value }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(obj, index) in arr"
                    :key="index"
                    class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] text-center"
                  >
                    <td class="border-[1px] text-[12px] p-2">
                      {{ index + 1 }}
                    </td>
                    <td
                      v-for="(value, key) in tableHead[inx]"
                      :key="value"
                      class="border-[1px] text-[12px] p-2"
                    >
                      <template v-if="key === 'sum_amount'">
                        {{
                          obj?.entry_exit_all_none === '1'
                            ? $formatNumber(obj?.sum_credit, 2)
                            : obj?.entry_exit_all_none === '2'
                            ? $formatNumber(obj?.sum_debit, 2)
                            : !obj?.entry_exit_all_none
                            ? $formatNumber(obj?.sum_amount, 2)
                            : ''
                        }}
                      </template>
                      <template v-else>
                        {{ obj?.[key] }}
                      </template>
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
import GenericDateTimePicker from '@generics/GenericDateTimePicker.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericInput,
    GenericButton,
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
      groupedObj: {},
      tableHead: [],
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
        const loading = this.$loading({
          lock: true,
          text: this.GET_CORE_STRING?.loading || 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
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
          .post(`/balance/getCashFlowReportList`, body)
          .then(({ data: { allTransactionInfoByType } }) => {
            this.groupedAction(allTransactionInfoByType, this.GET_CORE_STRING) // function
            this.showHideTable = true
            loading.close()
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            loading.close()
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.showHideTable = false
        this.groupedObj = {}
        this.$notification(`Currency value not found.`)
      }
    },

    groupedAction(arr, getText) {
      this.groupedObj = {}
      arr.forEach((obj) => {
        const payGrName = obj?.payment_group_name
        if (this.groupedObj?.[payGrName])
          this.$set(this.groupedObj, payGrName, [
            ...this.groupedObj[payGrName],
            obj,
          ])
        else this.$set(this.groupedObj, payGrName, [obj])
      })

      for (const key in this.groupedObj) {
        const obj = this.groupedObj[key][0]
        if (obj?.product_category_name) {
          this.tableHead.push({
            product_category_name:
              getText?.product_category_name || 'product_category_name',
            sum_amount: getText?.sum_amount || 'sum_amount',
          })
        } else if (obj?.credits_name) {
          this.tableHead.push({
            credits_name: getText?.credits_name || 'credits_name',
            sum_amount: getText?.sum_amount || 'sum_amount',
          })
        } else if (obj?.payment_type_name) {
          this.tableHead.push({
            payment_type_name:
              getText?.payment_type_name || 'payment_type_name',
            sum_amount: getText?.sum_amount || 'sum_amount',
          })
        } else if (obj?.fixed_assets_name) {
          this.tableHead.push({
            fixed_assets_name:
              getText?.fixed_assets_name || 'fixed_assets_name',
            sum_amount: getText?.sum_amount || 'sum_amount',
          })
        }
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
          selectName: 'currencyList',
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
