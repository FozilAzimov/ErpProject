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
          <internal-custom-table
            :head-data="headDataTable"
            :body-data="bodyDataTable"
          />
          <internal-custom-table
            top-head-name="Рахим Абдулло (Рахимжон Абдулло)"
            :head-data="headDataTable2"
            :body-data="bodyDataTable2"
            @additionTableDataAction="setTableDataAction"
          />
          <internal-custom-table
            type="subTable"
            top-head-name="Рахим Абдулло (Рахимжон Абдулло)"
            :head-data="headDataTable3"
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
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    InternalCustomTable,
    GenericScalesBox,
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
      headDataTable3: [],
      bodyDataTable3: [],
      tableThreeBodyData: [],
    }
  },

  mounted() {
    this.tableThreeBodyData.push(this.bodyDataTable3)
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
      const headData = [
        'Created Date',
        'Category Company',
        'Company List',
        'Save',
      ]
      const bodyData = [
        { subName: 'dateFrom', type: 'date', width: '180' },
        { subName: 'categoryId', type: 'select', width: '150' },
        {
          subName: 'companyId',
          type: 'select',
          width: '180',
          url: 'findAllCompany',
        },
        {
          data: [
            {
              name: 'Save company list',
              type: 'primary',
              disabled: false,
              btnClickType: 'save_company',
            },
            {
              name: 'Updates',
              type: 'success',
              disabled: false,
              btnClickType: 'updates',
            },
          ],
          type: 'btn',
        },
      ]
      this.headDataTable = headData
      this.bodyDataTable = bodyData

      const headData2 = [
        'Category',
        'Manufacture',
        'Article',
        'Products',
        'Save Products',
      ]
      const bodyData2 = [
        {
          subName: 'categoryId',
          type: 'select',
          width: '150',
          url: 'findAllCategory',
        },
        {
          subName: 'manufactureId',
          type: 'select',
          width: '150',
          url: 'findAllManufacturer',
        },
        {
          subName: 'articleId',
          type: 'select',
          width: '150',
          url: 'findAllArticle',
        },
        {
          subName: 'productsId',
          type: 'select',
          width: '150',
          url: 'searchProductList',
        },
        {
          data: [
            {
              name: 'Create New Item',
              type: 'success',
              disabled: false,
              btnClickType: 'create_item',
              iconName: 'circle-plus-outline',
            },
          ],
          type: 'btn',
        },
      ]
      this.headDataTable2 = headData2
      this.bodyDataTable2 = bodyData2

      const headData3 = [
        '№',
        'Article',
        'Products',
        'Packaging',
        'Tara',
        'Information from scales',
        'Number of packages',
        'Check weight',
        'Actions',
      ]
      const bodyData3 = [
        {
          type: 'label',
        },
        {
          type: 'label',
        },
        {
          subName: 'packagingId',
          type: 'select',
          width: '150',
          url: 'findAllPackaging',
        },
        {
          subName: 'taraId',
          type: 'select',
          width: '150',
          url: 'findAllTara',
        },
        {
          subName: 'scales',
          type: 'number',
          width: '150',
        },
        {
          subName: 'packages',
          type: 'number',
          width: '150',
        },
        {
          data: [
            {
              name: 'Ok',
              type: 'primary',
              showHide: true,
              btnClickType: 'ok',
            },
            {
              name: 'Show print',
              type: 'success',
              showHide: true,
              btnClickType: 'show_print',
              iconName: 'printer',
            },
          ],
          type: 'btn',
        },
        {
          data: [
            {
              name: 'Save tara',
              type: 'primary',
              showHide: true,
              btnClickType: 'save_tara',
            },
          ],
          type: 'btn',
        },
      ]
      this.headDataTable3 = headData3
      this.bodyDataTable3 = bodyData3
    },

    // emit action
    setTableDataAction() {
      this.tableThreeBodyData.push(this.bodyDataTable3)
    },
  },
}
</script>
