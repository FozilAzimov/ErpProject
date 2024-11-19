<template>
  <div class="w-full p-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <div class="flex items-center gap-1">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/currenRates.htm')"
            />
            <generic-button
              name="Save changes"
              type="success"
              icon-name-attribute="edit"
              @click="saveAction"
            />
          </div>
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            ADD CURRENCY RATE
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] p-1"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <h1 class="text-[#317eac] font-medium">System Currency: UZB</h1>
        <div class="h-fit flex flex-col items-start overflow-scroll">
          <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
            <thead class="bg-[rgb(229,235,245)] sticky top-[-1px]">
              <tr>
                <th
                  v-for="(headName, key) in headData"
                  :key="key"
                  class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
                  :class="`w-[${headName?.width}px]`"
                >
                  {{ GET_CORE_STRING?.[headName.name] || headName.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="isThereBody">
                <tr
                  v-for="(value, index) in bodyData"
                  :key="index"
                  class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
                >
                  <td
                    v-for="(key, inx) in headData"
                    :key="inx"
                    class="border-[1px] text-[12px] p-2"
                  >
                    <template v-if="key.code === 'id' || key.code === 'name'">
                      {{ value?.[key?.code] }}
                    </template>
                    <template v-else>
                      <generic-input
                        width="150"
                        type="number"
                        :name="key?.code"
                        :order="index"
                        :value="`${value?.[key?.code] ?? ''}`"
                        @customFunction="setInputValueAction"
                      />
                    </template>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td
                    :colspan="tableHeadLength"
                    class="border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
                  >
                    <div class="flex justify-start">
                      <el-empty
                        :image-size="60"
                        description="No Data"
                        style="padding: 0"
                      >
                        <template #description>
                          <p style="font-size: 13px; margin-top: -10px">
                            {{
                              GET_CORE_STRING?.NoDataAvailableInTable ||
                              'no data'
                            }}
                          </p>
                        </template>
                      </el-empty>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <pre>{{ reqData }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      isOpenTable: true,
      isCloseTable: true,
      isThereBody: false,
      dateFrom: null,
      headData: {
        id: {
          name: 'Id',
          code: 'id',
        },
        name: {
          name: 'Currency Name',
          code: 'name',
        },
        banks_purchase_rate: {
          name: 'Bank Purchase Rate',
          code: 'currencyRateBankPurchaseRate',
        },
        banks_sell_rate: {
          name: 'Bank Sell Rate',
          code: 'currencyRateBankSellRate',
        },
        free_purchase_rate: {
          name: 'Free Purchase Rate',
          code: 'currencyRateFreePurchaseRate',
        },
        free_sell_rate: {
          name: 'Free Sell Rate',
          code: 'currencyRateFreeSellRate',
        },
        stock_purchase_rate: {
          name: 'Stock Purchase Rate',
          code: 'currencyRateStockPurchaseRate',
        },
        stock_sell_rate: {
          name: 'Stock Sell Rate',
          code: 'currencyRateStockSellRate',
        },
        nominal: {
          name: 'Nominal',
          code: 'nominal',
        },
      },
      bodyData: [],
      reqData: [],
    }
  },

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },

  // CREATED
  created() {
    // queryVal
    this.dateFrom = this.$route.query?.date_from
    this.tableHeadLength = Object.keys(this.headData).length + 1
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
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

    // get Input datasini olish
    setInputValueAction(name, value, index) {
      this.$set(this.reqData[index], name, value)
    },
    // get Input datasini olish

    // PAGE request action
    getTableRequest() {
      const body = {
        current_page: 1,
        page_size: this.pageSize_value,
        actionUrl: 'currenRates',
        dateFrom: this.dateFrom ?? this.$formatDate(new Date()),
      }

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/currencyRate/prepareCurrenRate`, body)
        .then(({ data: { currencyRateCurrencyList } }) => {
          this.getTableBody(currencyRateCurrencyList)
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Save Action
    saveAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/currencyRate/addCurrenRate`, {
          currencyRateCurrencyList: this.reqData,
        })
        .then(() => {
          this.$router.push('/currenRates.htm')
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic Table action Start
    getTableBody(data) {
      this.bodyData = []
      for (const obj of data) {
        const newObj = {}
        for (const key in this.headData) {
          const keyCode = this.headData[key]?.code
          if (keyCode !== 'system' && keyCode !== 'date' && keyCode in obj) {
            newObj[keyCode] = obj[keyCode]
          }
        }
        this.bodyData.push(newObj)
      }
      this.bodyData.length > 0
        ? (this.isThereBody = true)
        : (this.isThereBody = false)

      data.forEach((obj, i) => {
        this.reqData.push({})
        this.$set(this.reqData[i], 'currency', {})
        for (const key in this.headData) {
          if (this.headData[key]?.code === 'name') {
            this.$set(this.reqData[i].currency, key, obj?.[key])
            this.$set(this.reqData[i].currency, 'id', i + 1)
          } else {
            this.$set(this.reqData[i], key, obj?.[this.headData[key]?.code])
          }
        }
      })
    },
    // Generic Table action End
  },
}
</script>
