<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        api="saveColumnConfigU"
        class="z-[10000]"
      />
    </transition>

    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
    >
      <div class="flex items-center gap-[10px]">
        <generic-button
          name="Go Back"
          type="primary"
          icon-name-attribute="arrow-left"
        />
        <generic-button
          v-if="isPage_ID"
          name="Print Preview"
          type="success"
          icon-name-attribute="printer"
        />
        <generic-button
          v-if="isPage_ID"
          name="Delete"
          type="success"
          icon-name-attribute="delete"
          @click="deleteAction"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Add Simple Production Invoice
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
      v-if="isPage_ID"
      class="w-full border-[1px] border-solid border-[#D9DBDF] pb-5"
    >
      <div class="m-2">
        <table class="w-full flex items-center">
          <tbody class="w-1/2 flex flex-col">
            <tr
              v-for="(name, index) in editNameData"
              :key="index"
              class="border-[1px] border-solid border-[#D9DBDF] py-1 px-2"
            >
              <td>
                {{ name }}
              </td>
            </tr>
          </tbody>
          <tbody class="w-1/2 flex flex-col">
            <tr
              v-for="(value, index) in editValueData"
              :key="index"
              class="border-[1px] border-solid border-[#D9DBDF] py-1 px-2"
            >
              <td>
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="m-2">
        <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
          <thead class="bg-[rgb(229,235,245)]">
            <tr>
              <th
                v-for="(element, index) in subListHeadData"
                :key="index"
                class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer whitespace-nowrap"
              >
                {{ element.name }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in subListData"
              :key="index"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
            >
              <td
                v-for="(value, inx) in row"
                :key="inx"
                class="border-[1px] text-[12px] p-2 text-center"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="w-full border-[1px] border-solid border-[#D9DBDF] pb-5">
      <scale-box class="m-2 rounded-sm" />
      <div class="flex items-start">
        <end-scale-box
          class="m-2 rounded-sm"
          @isTableShowHide="isTableShowHideAction"
        />
        <scale-box-generic-table
          v-if="isTableShowHide"
          class="m-2 rounded-sm"
          :table-head-body-data="tableHeadBodyData"
          :all-look-up-and-input-data="endScaleBoxAllInputAndLookUpData"
          save-url="addSimpleProductionInvoice"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@components/Generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import EndScaleBox from '@components/Invoices/ScaleBoxs/EndScaleBox.vue'
import ScaleBox from '@components/Invoices/ScaleBoxs/ScaleBox.vue'
import ScaleBoxGenericTable from '@components/Invoices/ScaleBoxs/ScaleBoxGenericTable.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    ScaleBox,
    EndScaleBox,
    ScaleBoxGenericTable,
  },

  // DATA,
  data() {
    return {
      isLoading: false,
      checkModal: false,
      tableHeadBodyData: [
        { name: 'Product', payloadName: 'item', type: 'list' },
        { name: 'Percentage %', payloadName: 'percentage', type: 'float' },
        { name: 'Qty', payloadName: 'qty', type: 'float' },
        { name: 'Note', payloadName: 'description', type: 'string' },
      ],
      isTableShowHide: false,
      currencyId: null,
      currencyRate: null,
      endScaleBoxAllInputAndLookUpData: {},
      isPage_ID: null,
      editID: null,
      editNameData: [
        'Date',
        'Company Branch',
        'Departments',
        'Input Warehouse',
        'Product',
        'Output Warehouse',
        'Production QTY',
        'Status',
      ],
      editValueData: [],
      subListData: [],
      subListHeadData: [
        { name: 'Product', payloadName: 'item', type: 'list' },
        { name: 'Qty', payloadName: 'qty', type: 'float' },
        { name: 'Note', payloadName: 'description', type: 'string' },
      ],
    }
  },

  mounted() {
    this.isPage_ID = !isNaN(this.$route.path.split('/').at(-1))
    this.editID = this.$route.path.split('/').at(-1)
    // functon
    this.getRequestPageCreatedAction()
  },

  // METHOD
  methods: {
    isTableShowHideAction(allStaticData, tableShowHideProp) {
      this.endScaleBoxAllInputAndLookUpData = {
        ...this.endScaleBoxAllInputAndLookUpData,
        ...allStaticData,
      }
      this.isTableShowHide = tableShowHideProp
    },

    deleteAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .delete(
          `simpleProductionInvoice/prepareSimpleProductionInvoiceDelete`,
          {
            data: {
              id: this.editID,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            this.isLoading = !this.isLoading
            this.$router.push('/simpleProductionInvoice.htm')
          }
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    getRequestPageCreatedAction() {
      if (this.isPage_ID) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/simpleProductionInvoice/prepareSimpleProductionInvoice`,
            {
              id: this.editID,
              page_current: 1,
              page_size: 25,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-auth-token': localStorage.getItem('authToken'),
              },
            }
          )
          .then(({ data }) => {
            this.isLoading = !this.isLoading
            this.editValueData.push(data.valueDate)
            this.editValueData.push(data.branchCompanyName)
            this.editValueData.push(data.departmentName)
            this.editValueData.push(data.warehouseName)
            this.editValueData.push(data.productName)
            this.editValueData.push(data.expenseWarehouseName)
            this.editValueData.push(data.productionQty)
            this.editValueData.push(
              data.statusType === 'SIMPLE_MEAT_PRODUCTION' ? 'Manual' : 'Simple'
            )
            this.subListData = data.erpInvoiceItemList
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`invoiceBase/getCurrentCurrencyRate`, {
            branchCompanyId: null,
            currencyId: 1,
            dateFrom: 'undefined',
            employeeId: null,
            settingsRateType: 'PURCHASE',
          })
          .then(({ data: { paramsObject } }) => {
            this.isLoading = !this.isLoading
            this.endScaleBoxAllInputAndLookUpData.currencyId = paramsObject?.id
            this.endScaleBoxAllInputAndLookUpData.currencyRate =
              paramsObject?.value
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
