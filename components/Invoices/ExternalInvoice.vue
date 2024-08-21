<template>
  <div class="w-full p-[0px_12px_0px_10px] mt-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            List
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="p-1 flex flex-col items-start gap-5">
          <div class="flex items-end gap-10">
            <internal-custom-table
              top-head-name="External invocie table"
              :head-data="headDataTable"
              :body-data="bodyDataTable"
            />
            <div class="flex flex-col gap-2">
              <generic-input type="number" placeholder="Product weight..." />
              <generic-input type="number" placeholder="Product code..." />
            </div>
          </div>
          <internal-custom-table
            type="subTable"
            :head-data="headDataTable2"
            :body-data="tableThreeBodyData"
          />
          <generic-scales-box />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import InternalCustomTable from '@components/Invoices/PurchaseAndTransferInvoicesFolder/InternalCustomTable.vue'
import GenericScalesBox from '@generics/GenericScalesBox.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    InternalCustomTable,
    GenericScalesBox,
    GenericInput,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      selectValue: {},
      isOpenTable: true,
      isCloseTable: true,
      headDataTable: [],
      bodyDataTable: [],
      headDataTable2: [],
      bodyDataTable2: [],
      tableThreeBodyData: [],
    }
  },

  mounted() {
    this.tableThreeBodyData.push(this.bodyDataTable2)
  },

  // MOUNTED
  created() {
    // Table function
    this.getTableRequest()
    // function
    this.createDataTableAction()
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

    // get Input, date, select datasini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.selectValue, name, value)
    },

    // page request action
    getTableRequest() {
      const body = {}

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sew/sewOrderOnlineStatusContent`, body)
        .then(({ data }) => {
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Created data table
    createDataTableAction() {
      const headData = ['Date', 'Sender warehouse', 'reciver warehouse']
      const bodyData = [
        { subName: 'dateFrom', type: 'date', width: '180' },
        {
          subName: 'warehouseId',
          type: 'select',
          width: '180',
        },
        {
          subName: 'subWarehouseId',
          type: 'select',
          width: '150',
          url: 'findAllWarehouse',
        },
      ]
      this.headDataTable = headData
      this.bodyDataTable = bodyData

      const headData2 = [
        '№',
        'Category',
        'Article',
        'Products',
        'Real Count',
        'Product weight',
        'Packaging',
        'Number of packages',
        'Tara',
        'Package weight',
        'Product weight',
        'Action',
      ]
      const bodyData2 = [
        {
          subName: 'category',
          type: 'text',
          width: '100',
          widthtype: '%',
        },
        { subName: 'article', type: 'text', width: '100', widthtype: '%' },
        { subName: 'products', type: 'text', width: '100', widthtype: '%' },
        { subName: 'reslCount', type: 'number', width: '100', widthtype: '%' },
        {
          subName: 'productWeight',
          type: 'number',
          width: '100',
          widthtype: '%',
        },
        {
          subName: 'packagingId',
          type: 'select',
          width: '100',
          widthtype: '%',
          url: 'findAllPackaging',
        },
        {
          subName: 'numberPackages',
          type: 'number',
          width: '100',
          widthtype: '%',
        },
        {
          subName: 'tara',
          type: 'select',
          width: '100',
          widthtype: '%',
          url: 'findAllTara',
        },
        {
          subName: 'packageWeight',
          type: 'number',
          width: '100',
          widthtype: '%',
        },
        {
          subName: 'subProductWeight',
          type: 'number',
          width: '100',
          widthtype: '%',
        },
        {
          data: [
            {
              name: 'Ok',
              type: 'success',
              disabled: false,
              btnClickType: 'ok',
            },
            {
              name: 'Open',
              type: 'primary',
              disabled: false,
              btnClickType: 'open',
            },
            {
              name: 'Accept',
              type: 'success',
              disabled: false,
              btnClickType: 'accept',
            },
          ],
          type: 'btn',
        },
      ]
      this.headDataTable2 = headData2
      this.bodyDataTable2 = bodyData2
    },

    // emit action
    setTableDataAction() {
      this.tableThreeBodyData.push(this.bodyDataTable2)
    },
  },
}
</script>
