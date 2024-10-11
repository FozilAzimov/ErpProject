<template>
  <div class="w-full px-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Calculation qty by recipe of variant of color
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="p-2">
          <div
            class="flex flex-col items-start gap-5 p-4 shadow-lg rounded-lg border-[1px] border-solid border-[#E5E5E5] mb-4"
          >
            <div
              v-for="(arr, index) in topFilterData"
              :key="index"
              class="flex gap-5"
            >
              <template v-for="(obj, subIndex) in arr">
                <span
                  v-if="obj?.type === 'text'"
                  :key="subIndex"
                  class="flex flex-col justify-start font-semibold text-[16px]"
                  :style="{ color: obj?.color, width: `${obj?.width}px` }"
                  >{{ obj?.name }} {{ resultData?.[obj?.subName] }}
                  <span class="text-[#317eac]">{{
                    resultData?.[obj?.subNameTwo]
                  }}</span>
                </span>
                <span
                  v-else-if="obj.type === 'select'"
                  :key="`${subIndex}-0`"
                  class="flex flex-col items-start"
                >
                  <span class="text-[13px]">{{ obj.name }}</span>
                  <generic-look-up
                    dwidth="250"
                    :durl="obj?.api"
                    :name="obj?.defName"
                    :required="
                      !obj?.required || allInputAndSelectValue?.[obj?.defName]
                        ? true
                        : false
                    "
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </span>
                <span
                  v-else-if="obj.type === 'number'"
                  :key="`${subIndex}-1`"
                  class="flex flex-col items-start"
                >
                  <span class="text-[13px]">{{ obj.name }}</span>
                  <generic-input
                    type="number"
                    width="250"
                    :name="obj?.defName"
                    :required="
                      !obj?.required || allInputAndSelectValue?.[obj?.defName]
                        ? true
                        : false
                    "
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </span>
              </template>
            </div>

            <generic-button
              name="Accept"
              type="primary"
              @click="acceptAction"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  components: {
    LoadingPage,
    ColumnConfigPage,
    GenericLookUp,
    GenericButton,
    GenericInput,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      topFilterData: [],
      allInputAndSelectValue: {},
      resultData: {},
    }
  },

  // MOUNTED
  mounted() {
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

    // GET SELECT AND INPUT VALUES
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndSelectValue, name, value)
      // function
      name === 'productId' && this.productPriceAction(value)
    },

    // ACCEPT Action
    acceptAction() {
      if (
        this.allInputAndSelectValue?.colorVariantId &&
        this.allInputAndSelectValue?.productId &&
        this.allInputAndSelectValue?.meters &&
        this.allInputAndSelectValue?.ratio
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `calculationByColorVariantRecipe/calculationList`,
            this.allInputAndSelectValue
          )
          .then(
            ({
              data: {
                resultData: [obj],
              },
            }) => {
              this.resultData = obj
              this.allInputAndSelectValue.mediumPrice = obj?.price_medium
              this.allInputAndSelectValue.lastPrice = obj?.last_price
              this.allInputAndSelectValue.unitPrice = obj?.unitprice
              this.allInputAndSelectValue.price4 = obj?.price4
              this.isLoading = !this.isLoading
            }
          )
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$notification(`Ma'lumotni to'liq to'ldiring`)
      }
    },

    // Product Select Action
    productPriceAction(productId) {
      if (productId) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`calculationByColorVariantRecipe/productPrices`, { productId })
          .then(
            ({
              data: {
                resultData: [obj],
              },
            }) => {
              this.resultData = obj
              this.allInputAndSelectValue.mediumPrice = obj?.price_medium
              this.allInputAndSelectValue.lastPrice = obj?.last_price
              this.allInputAndSelectValue.unitPrice = obj?.unitprice
              this.allInputAndSelectValue.price4 = obj?.price4
              this.isLoading = !this.isLoading
            }
          )
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.allInputAndSelectValue.mediumPrice = ''
        this.allInputAndSelectValue.lastPrice = ''
        this.allInputAndSelectValue.unitPrice = ''
        this.allInputAndSelectValue.price4 = ''
      }
    },

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering() {
      const createDate = [
        [
          {
            name: 'Batch Process',
            defName: 'batchProcessId',
            api: 'findAllBatchProcess',
            type: 'select',
            required: false,
          },
          {
            width: '250',
            name: 'Price ( Product ) :',
            defName: 'mediumPrice',
            subName: 'price_medium',
            subNameTwo: 'product_currency',
            type: 'text',
            color: 'red',
          },
          {
            width: '300',
            name: 'costPrice ( Measurement ) :',
            defName: 'lastPrice',
            subName: 'last_price',
            subNameTwo: 'product_currency',
            type: 'text',
            color: 'red',
          },
        ],
        [
          {
            name: 'Currency',
            defName: 'currencyId',
            subName: 'currencyId',
            api: 'findAllCurrency',
            type: 'select',
            required: false,
          },
          {
            name: 'Qty',
            defName: 'meters',
            subName: 'qty',
            type: 'number',
            required: true,
          },
          {
            name: 'Ration',
            defName: 'ratio',
            subName: 'ration',
            type: 'number',
            required: true,
          },
          {
            width: '200',
            name: 'Unit Price :',
            defName: 'unitPrice',
            subName: 'unitprice',
            subNameTwo: 'product_currency',
            type: 'text',
            color: '#317eac',
          },
        ],
        [
          {
            name: 'Color Variant',
            defName: 'colorVariantId',
            subName: 'colorVariantId',
            api: 'findAllColorVariant',
            type: 'select',
            required: true,
          },
          {
            name: 'Gramm',
            defName: 'gramm',
            subName: 'gramm',
            type: 'number',
            required: false,
          },
          {
            name: 'Pressing',
            defName: 'pressing',
            subName: 'pressing',
            type: 'number',
            required: false,
          },
          {
            width: '200',
            name: 'Price4 :',
            defName: 'price4',
            subName: 'price4',
            subNameTwo: 'product_currency',
            type: 'text',
            color: '#317eac',
          },
        ],
        [
          {
            name: 'Products',
            defName: 'productId',
            subName: 'productId',
            api: 'searchProductList',
            type: 'select',
            required: true,
          },
          {
            name: 'Width',
            defName: 'width',
            subName: 'width',
            type: 'number',
            required: false,
          },
          {
            name: 'Volume ',
            defName: 'volume',
            subName: 'volume',
            type: 'number',
            required: false,
          },
        ],
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
