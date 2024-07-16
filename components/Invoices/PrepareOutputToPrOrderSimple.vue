<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
    >
      <div class="flex items-center gap-[10px]">
        <generic-button
          name="Go Back"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Output To Production Order Simple
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
          >
            <img
              class="w-[11px]"
              :class="
                true
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
          >
            <img class="w-[11px]" src="@assets/icons/remove.png" alt="remove" />
          </li>
        </ul>
      </div>
    </div>

    <div
      class="w-full border-[1px] border-solid border-[#D9DBDF] flex items-start gap-5 p-3"
    >
      <div
        class="p-3 w-fit flex flex-col items-start gap-2 border-[1px] border-solid border-[rgba(0,0,0,0.2)]"
      >
        <div class="flex flex-col items-start text-[13px]">
          <span>selectOrderKroy</span>
          <look-up
            dwidth="200"
            name="kroy"
            durl="invoiceBase/findAllKroyForInvoice"
            @customFunction="getLookUpValue"
          />
        </div>
        <div class="flex flex-col items-start text-[13px]">
          <span>Warehouse</span>
          <look-up
            dwidth="200"
            name="warehouse"
            durl="invoiceBase/findAllWarehouseByAbsoluteLogic"
            @customFunction="getLookUpValue"
          />
        </div>
        <generic-input
          width="200"
          pl="8"
          pr="8"
          pt="2"
          pb="2"
          textsize="13"
          type="text"
          placeholder="Qty"
          name="qty"
          @customFunction="getInputValue"
        />
        <generic-input
          width="200"
          pl="8"
          pr="8"
          pt="2"
          pb="2"
          textsize="13"
          type="text"
          placeholder="Barcode"
          name="barcode"
          @customFunction="getInputValue"
          @enter="enterRequestAction"
        />
        <span class="text-[13px]">
          Qty sum:
          <span class="text-[14px] text-[#aa3d3d] font-medium">{{
            qtySumm.toFixed('3')
          }}</span>
        </span>
      </div>

      <generic-button
        v-if="tableResponseData.length && !isExpenceBtn"
        name="Expense Invoice"
        type="primary"
        @click="expenseInvoiceAction"
      />

      <generic-button
        v-if="isExpenceBtn"
        name="Expense"
        type="primary"
        @click="$router.push('/outputToPrOrder.htm')"
      />
      <div
        v-if="tableResponseData.length && !isExpenceBtn"
        class="p-3 w-fit gap-2 border-[1px] border-solid border-[rgba(0,0,0,0.2)]"
      >
        <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
          <tbody>
            <tr
              v-for="(row, index) in tableResponseData"
              :key="index"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row.product }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <generic-input
                  :value="row.qty"
                  width="100"
                  pl="8"
                  pr="8"
                  pt="2"
                  pb="2"
                  textsize="13"
                  type="text"
                  placeholder="Qty"
                  name="qty"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <generic-input
                  width="200"
                  pl="8"
                  pr="8"
                  pt="2"
                  pb="2"
                  textsize="13"
                  type="text"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <generic-input :value="true" type="checkbox" name="check" />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <generic-button name="Remove" type="primary" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import LookUp from '@generics/LookUp.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    LookUp,
  },

  // DATA,
  data() {
    return {
      isLoading: false,
      allLookUpAndInputValues: {},
      tableResponseData: [],
      allBarcodeValue: [],
      requestBody: [],
      isExpenceBtn: false,
      openPageID: null,
      qtySumm: 0,
    }
  },

  watch: {
    tableResponseData: {
      handler(newVal) {
        this.newDataAction(newVal)
      },
      deep: true,
    },
  },

  // MOUNTED
  mounted() {},

  // METHOD
  methods: {
    // LookUp value'sini olish
    getLookUpValue(name, value, valueID, order, resultType) {
      this.allLookUpAndInputValues[name] = valueID
    },
    // Input value'sini olish
    getInputValue(name, value) {
      this.allLookUpAndInputValues[name] = value
    },

    // Barcode qaytarilashini tekshiradi
    barcodeCheckAction(array, barcode, batchInfo) {
      if (this.tableResponseData.length) {
        let isThere = true
        this.allBarcodeValue.find((number) => {
          if (parseFloat(number) === parseFloat(barcode)) isThere = false
          return ''
        })

        if (isThere) {
          this.tableResponseData.push(...array)
          this.allBarcodeValue.push(batchInfo)
        }
      } else {
        this.tableResponseData = array
        this.allBarcodeValue.push(batchInfo)
      }
    },

    // Barcode ENTER action
    enterRequestAction() {
      const productBarcode = this.allLookUpAndInputValues.barcode
      const warehouseId = this.allLookUpAndInputValues.warehouse
      const qty = this.allLookUpAndInputValues.qty
      const kroy = this.allLookUpAndInputValues.kroy
      if (productBarcode && warehouseId && qty && kroy) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/batchProduction/batchStartStopByCardNumber`, {
            anyParam: 'expenseReadyItems',
            productBarcode,
            warehouseId,
          })
          .then(({ data }) => {
            this.isLoading = !this.isLoading

            // function
            this.barcodeCheckAction(
              data?.saleReadyItems,
              productBarcode,
              data?.batch_info
            )
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    expenseInvoiceAction() {
      const body = {
        invoice: {
          invoiceItems: this.requestBody,
          statusType: 'OUTPUT_TO_PR_ORDER_SIMPLE',
          warehouse: { id: this.allLookUpAndInputValues.warehouse },
        },
      }

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareCreateEditOutputToPrOrder`, body)
        .then(({ data: { invoiceJson } }) => {
          this.isLoading = !this.isLoading
          if (invoiceJson.id) {
            this.isExpenceBtn = true
            this.openPageID = invoiceJson.id
          }
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    newDataAction(newData) {
      this.requestBody = []
      this.qtySumm = 0

      newData.forEach((obj) => {
        const newObj = {}
        newObj.barcodeId = obj.id
        newObj.entryRef = { id: obj.id }
        newObj.item = { id: this.allLookUpAndInputValues.warehouse }
        newObj.kroy = { id: this.allLookUpAndInputValues.kroy }
        newObj.qty = obj.qty
        newObj.warehouse = { id: this.allLookUpAndInputValues.warehouse }
        this.requestBody.push(newObj)
      })

      this.requestBody.forEach((obj) => (this.qtySumm += obj.qty))
    },
  },
}
</script>
