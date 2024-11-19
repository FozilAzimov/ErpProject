<template>
  <div class="w-full p-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-1">
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="$router.push('/purchaseorder.htm')"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Registration of Contracts
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] p-2"
        :class="
          isOpenTable
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex justify-start">
          <div
            class="w-[500px] rounded-md shadow-lg border-[1px] border-solid border-[#E5E5E5]"
          >
            <div
              v-for="(element, index) in topFilterData"
              :key="index"
              class="p-2"
            >
              <div
                v-if="element?.type === 'date'"
                class="flex items-center justify-between gap-x-4"
              >
                <span class="gradient-text">{{ element?.name }} :</span>
                <generic-input-date-page
                  type="datetime-local"
                  :name="element?.subName"
                  :width="element?.width"
                  :value="allSelectAndInputValues?.[element?.subName]"
                  textsize="13"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </div>
              <div
                v-else-if="element?.type === 'select'"
                class="flex items-center justify-between gap-x-4"
              >
                <span class="gradient-text">{{ element?.name }} :</span>
                <generic-look-up
                  :name="element?.subName"
                  :durl="element?.url"
                  :dwidth="element?.width"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </div>
              <div
                v-else-if="
                  element?.type === 'text' || element?.type === 'textarea'
                "
                class="flex items-center justify-between gap-x-4"
              >
                <span class="gradient-text">{{ element?.name }} :</span>
                <generic-input
                  :width="element?.width"
                  :type="element?.type"
                  :name="element?.subName"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </div>
            </div>
            <div class="flex items-center justify-evenly mb-3">
              <generic-button name="Save" type="primary" @click="saveAction" />
              <generic-button
                name="Print"
                type="success"
                icon-name-attribute="printer"
              />
              <generic-button
                name="Confirm"
                type="primary"
                @click="confirmOrderAtion"
              />
            </div>
          </div>
        </div>

        <div>
          <production-addition-table
            class="mt-5"
            :data="rowData"
            :buttons="[
              {
                name: 'Add new',
                type: 'primary',
                iconNameAttribute: 'circle-plus-outline',
                action: 'add',
              },
            ]"
            @emitTableData="getTableDataAction"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericButton from '@generics/GenericButton.vue'
import ProductionAdditionTable from '@components/Productions/ProductionAdditionTable.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericInputDatePage,
    GenericLookUp,
    GenericInput,
    GenericButton,
    ProductionAdditionTable,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      topFilterData: [],
      allSelectAndInputValues: {},
      isOpenTable: true,
      isCloseTable: true,
      pageID: null,
      pageType: null,
      orderItems: [],
      rowData: [
        {
          name: '№',
          subName: 'id',
          width: '100',
          type: 'label',
        },
        {
          name: 'Product name',
          subName: 'item',
          width: '200',
          type: 'select',
          api: 'searchProductList',
        },
        {
          name: 'Identification number and name according to the unified electronic national catalog of the product',
          subName: 'externalProductsAndServicesCode',
          width: '200',
          type: 'select',
          api: 'findAllExternalProductsAndServicesCode',
        },
        {
          name: 'Measurement',
          subName: 'measurement',
          width: '100',
          type: 'text',
          disabled: true,
        },
        {
          name: 'Qty',
          subName: 'qty',
          width: '120',
          type: 'number',
        },
        {
          name: 'Price',
          subName: 'unitPrice',
          width: '120',
          type: 'text',
        },
        {
          name: 'Amount',
          subName: 'net',
          width: '150',
          type: 'number',
          disabled: true,
        },
        {
          topName: 'Vat',
          name: 'Percent',
          subName: 'vat',
          type: 'number',
          width: '150',
          multiple: true,
        },
        {
          topName: 'Vat',
          name: 'vatAmount',
          subName: 'vatAmount',
          type: 'number',
          width: '150',
          disabled: true,
          multiple: true,
        },
        {
          name: 'Total Amount',
          subName: 'ammount',
          width: '120',
          type: 'number',
          disabled: true,
        },
        {
          name: 'Approximate day',
          subName: 'approxDay',
          width: '120',
          type: 'text',
        },
        {
          name: 'Prepayment',
          subName: 'prePayment',
          width: '120',
          type: 'checkbox',
        },
        {
          width: '50',
          type: 'del',
        },
      ],
    }
  },

  // CREATED
  created() {
    this.allSelectAndInputValues.dateFrom = new Date()
      .toISOString()
      .split('.')[0]
    this.allSelectAndInputValues.contractDate = new Date()
      .toISOString()
      .split('.')[0]
    this.allSelectAndInputValues.contractTimeDurationDate = new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    )
      .toISOString()
      .split('.')[0]
  },

  // MOUNTED
  mounted() {
    this.pageID = this.$route?.params?.id
    this.pageType = this.$route?.query?.page_type
    // function
    this.createDataFiltering()
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

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering() {
      const createDate = [
        {
          name: 'Kiritish chiqarish sanasi',
          subName: 'dateFrom',
          type: 'date',
          width: '185',
        },
        {
          name: 'Shartnoma raqami',
          subName: 'contractNumber',
          type: 'text',
          width: '185',
        },
        {
          name: 'Shartnoma sanasi',
          subName: 'contractDate',
          type: 'date',
          width: '185',
        },
        {
          name: 'Amal qilish muddati',
          subName: 'contractTimeDurationDate',
          type: 'date',
          width: '185',
        },
        {
          name: 'Yetkazib beruvchi nomi',
          subName: 'supplierName',
          type: 'select',
          width: '200',
          url: 'findAllCompany',
          params: {
            branchcompany: false,
            companyType: 'Supplier',
          },
        },
        {
          name: 'Valyuta',
          subName: 'currency',
          type: 'select',
          width: '200',
          url: 'findAllCurrency',
        },
        {
          name: 'Izox',
          subName: 'description',
          type: 'textarea',
          width: '200',
        },
      ]
      this.topFilterData = createDate
    },

    // get Input, date, select datasini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValues, name, value)
    },

    getTableDataAction(arr) {
      this.orderItems = arr
    },

    // Save action
    saveAction() {
      const purchaseOrder = {
        createDate: this.allSelectAndInputValues?.dateFrom
          ? this.allSelectAndInputValues?.dateFrom
          : '',
        date: this.allSelectAndInputValues?.contractDate
          ? this.allSelectAndInputValues?.contractDate
          : '',
        sellDate: this.allSelectAndInputValues?.contractTimeDurationDate
          ? this.allSelectAndInputValues?.contractTimeDurationDate
          : '',
        company: {
          id: this.allSelectAndInputValues?.supplierName ?? '',
        },
        currency: {
          id: this.allSelectAndInputValues?.currency ?? '',
        },
        contractNumber: this.allSelectAndInputValues?.contractNumber ?? '',
        orderItems: this.orderItems,
      }
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/order/createPurchaseOrder`, {
          purchaseOrder,
          note: this.allSelectAndInputValues?.description ?? '',
        })
        .then(({ data }) => {
          this.isLoading = !this.isLoading
          if (!this.pageID) {
            this.$router.push({
              path: `contractRegistration.htm/${data?.id}`,
              query: { page_type: 'edit' },
            })
          }
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Confirm and Censel_Confirmation
    confirmOrderAtion() {
      this.$refs.messageBoxRef.open(this.pageID)
    },

    // Message Emit action
    getEmitProp(propMessage, id) {
      if (propMessage === 'confirm' && id) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/order/confirmOrder`, {
            id,
            status: true,
          })
          .then(() => {
            this.isLoading = !this.isLoading
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

<style>
.gradient-text {
  background: -webkit-linear-gradient(60deg, #4568dc, #dd05af, #dd4903);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: 18px;
}
</style>
