<template>
  <div class="w-full max-w-[1440px] px-[50px] mx-auto my-5">
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <div class="bg-[rgba(0,0,0,0.03)] p-2">
      <div class="flex flex-col items-center">
        <table class="mb-4 w-fit">
          <thead>
            <tr>
              <th class="py-2 px-4 bg-[#dbdbdb]">yourCurrentBalance</th>
              <th class="py-2 px-4 bg-[#dbdbdb]">maxSaleLimit</th>
              <th class="py-2 px-4 bg-[#dbdbdb]">totalOrder</th>
              <th>
                <generic-button
                  btn-size="medium"
                  name="Log out"
                  class="ml-3"
                  type="danger"
                  @click="$refs.messageBoxRef.open('', '', 'delete', 'Log out')"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center p-2 bg-green-400">
                {{ $formatNumber(totalAmountValue ?? 0, 2) ?? 0 }}
              </td>
              <td class="text-center p-2 bg-red-400">
                {{ $formatNumber(limitValue ?? 0, 2) ?? 0 }}
              </td>
              <td class="text-center p-2 bg-[#ffec28]">
                {{ $formatNumber(allTotalValue ?? 0, 2) ?? 0 }}
              </td>
              <td>
                <generic-button
                  btn-size="medium"
                  name="To do order"
                  class="ml-3"
                  type="success"
                  @click="purchaseAction"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="h-[50px] flex items-center">
          <generic-input
            :value="inputValue"
            size="medium"
            @customFunction="inputValueAction"
          />
          <div v-for="num in calcArr" :key="num">
            <generic-button
              v-if="num === 'remove'"
              icon-name-attribute="back"
              btn-size="medium"
              @click="calculatorAction(num)"
            />
            <generic-button
              v-else
              :name="`${num}`"
              btn-size="medium"
              @click="calculatorAction(num)"
            />
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-center flex-wrap gap-4 max-w-[1440px] w-full mx-auto py-3 mt-2"
      >
        <div
          v-for="(obj, i) in categoriesData"
          :key="i"
          class="w-[150px] h-[130px] hover:cursor-pointer flex flex-col items-center justify-start gap-2 text-[14px] p-2 border-[1px] border-solid border-[#e5e5e5] rounded-md overflow-hidden"
          :class="{ box: i === activeIndex }"
          @click="sortedAction(obj?.type === 'all' ? '' : obj?.name, i)"
        >
          <div
            v-if="obj?.type === 'all'"
            class="w-full h-full flex items-center justify-center"
          >
            {{ obj.name }}
          </div>
          <div v-else class="flex flex-col items-center justify-start gap-2">
            <img
              v-if="obj?.base64"
              :src="obj?.base64"
              alt="img"
              class="w-[80px] h-[70px] rounded-md"
            />
            <img
              v-else
              src="@assets/images/no-image.jpg"
              alt="img"
              class="w-[80px] h-[70px] rounded-md"
            />
            <span class="text-center leading-none">{{ obj?.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[700px] overflow-y-auto p-2">
      <div
        class="grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 max-w-[1440px] w-full mx-auto place-items-center"
      >
        <card-list
          v-for="(obj, i) in cardData"
          :key="i"
          :card-data="obj"
          :row-index="i"
          :limit-value="limitValue"
          :total-amount-value="totalAmountValue"
          :all-card-data="allCardData"
          @emitAction="setCardDataAction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardList from '@components/Invoices/CampMarket/CardList.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericButton from '@generics/GenericButton.vue'
import MessageBox from '@components/MessageBox.vue'

export default {
  // COMPONENTS
  components: {
    CardList,
    GenericInput,
    GenericButton,
    MessageBox,
  },

  // DATA
  data() {
    return {
      productCategories: [],
      categoriesData: [],
      oldProductList: [],
      productList: [],
      allCardData: [],
      mapArrayList: [],
      limitValue: null,
      totalAmountValue: null,
      allTotalValue: 0,
      inputValue: '',
      activeIndex: 0,
      clientId: null,
      calcArr: ['remove', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    }
  },

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
    cardData() {
      return this.productList
    },
  },

  // WATCH
  watch: {
    productCategories: {
      handler(newVal) {
        this.categoriesData = [{ name: 'All', type: 'all' }, ...newVal]
      },
      deep: true,
      immediate: true,
    },
  },

  // MOUNTED
  mounted() {
    this.requestAction() // function
  },

  // METHODS
  methods: {
    requestAction() {
      this.loadingAction() // function
      this.$axios
        .get('/compMarketApi/campMarketSaleInvoice')
        .then(({ data }) => {
          this.productCategories = data.productCategories
          this.oldProductList = data.productList
          this.productList = data.productList
          this.limitValue = data.limitValue
          this.totalAmountValue = data.totalAmountValue
          this.clientId = data.client_id
          this.isDisabledBtnAction(data.productList) // function
          this.loadingAction().close() // loading function
        })
        .catch((error) => {
          this.loadingAction().close() // loading function
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Set Initial disabled value
    isDisabledBtnAction(arr) {
      arr.forEach((obj, i) => {
        if (obj?.price > this.limitValue) {
          this.$set(this.allCardData, i, { count: 0, total: 0, disabled: true })
        } else {
          this.$set(this.allCardData, i, {
            count: 0,
            total: 0,
            disabled: false,
          })
        }
      })
    },

    setCardDataAction(type, index, price, id, name) {
      let count = this.allCardData[index]?.count ?? 0

      if (type === 'plus') count += 1
      else if (type === 'minus' && count > 0) count -= 1

      const total = price * count
      const allTotalValue = this.totalSummAction(this.allCardData) // function
      const oldTotal = allTotalValue + price

      if (oldTotal <= this.limitValue)
        this.$set(this.allCardData, index, {
          ...this.allCardData[index],
          count,
          total,
          price,
          id,
          name,
        })
      else if (type === 'minus')
        this.$set(this.allCardData, index, {
          ...this.allCardData[index],
          count,
          total,
          price,
          id,
          name,
        })
      else this.$notification('You do not Have Insufficient Of Funds!')
      this.allTotalValue = this.totalSummAction(this.allCardData) // function
      // limit tugaganini tekshiradi
      const difference = this.limitValue - this.allTotalValue
      this.productList.forEach((obj, i) => {
        if (difference < (obj?.price ?? 0)) {
          this.$set(this.allCardData, i, {
            ...this.allCardData[i],
            disabled: true,
          })
        } else {
          this.$set(this.allCardData, i, {
            ...this.allCardData[i],
            disabled: false,
          })
        }
      })
      // limit tugaganini tekshiradi
    },

    // All Total summ
    totalSummAction(arr) {
      return arr?.reduce((summ, curr) => (summ += curr.total || 0), 0)
    },

    // Calculation action
    calculatorAction(value) {
      if (value === 'remove') this.inputValue = this.inputValue.slice(0, -1)
      else this.inputValue += `${value}`
    },

    // Input set value
    inputValueAction(name, value) {
      this.$set(this, 'inputValue', value)
    },

    // Sorted Action
    sortedAction(name, inx) {
      this.activeIndex = inx
      this.productList = this.oldProductList
      if (name) {
        this.productList = this.productList.filter(
          (obj) => obj.product_category_name === name
        )
      }
    },

    // Message box action
    getEmitProp(propMessage, id, index, actionName) {
      if (propMessage === 'confirm' && actionName === 'delete') {
        this.logOutAction() // function
      } else if (propMessage === 'confirm' && actionName === 'purchase') {
        this.loadingAction() // function
        // created body
        const body = {
          client_id: this.clientId,
          order_notes: this.inputValue,
          mapArrayList: this.mapArrayList,
        }
        this.$axios
          .post('/compMarketApi/campMarketSaleInvoiceSale', body)
          .then(({ data }) => {
            this.logOutAction() // function
            this.loadingAction().close() // loading function
          })
          .catch((error) => {
            this.loadingAction().close() // loading function
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Log Out
    logOutAction() {
      this.$router.push('/login.htm')
      // remove
      document.cookie = 'JSESSIONID='
      localStorage.removeItem('token')
      // remove
      this.$notification(`Proyekt'dan chiqdingiz.`, 'Success', 'success')
    },

    // purchase Action
    purchaseAction() {
      if (this.allTotalValue) {
        this.mapArrayList = []
        this.allCardData.forEach((obj) => {
          // mapArrayList
          if (obj?.count) {
            const newObj = {
              product_id: obj.id,
              product_name: obj.name,
              product_price: obj.price,
              qty: obj.count,
            }
            this.mapArrayList.push(newObj)
          }
        })
        this.$refs.messageBoxRef.open('', '', 'purchase', 'Purchase')
      } else this.$notification('pleaseAddProductsToCart')
    },

    // Loading action
    loadingAction() {
      const loading = this.$loading({
        lock: true,
        text: this.GET_CORE_STRING.loading || 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      return loading
    },
  },
}
</script>

<style>
.box {
  transition: 0.6s;
  box-shadow: 0 0 15px rgb(183, 227, 187);
  background: #b7e3bb;
  border: 1px solid rgb(142, 209, 148);
}
</style>
