<template>
  <div class="w-full p-[0px_12px_0px_10px]">
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
            Products And Automatic Systems
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
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="p-2">
          <generic-look-up
            dwidth="250"
            durl="findAllAutomaticSystems"
            placeholder="Automatic Systems"
          />
          <production-addition-table
            class="mt-5 p-2"
            :page-id="pageID"
            :data="rowData"
            :buttons="[
              {
                name: 'Add new',
                type: 'primary',
                iconNameAttribute: 'circle-plus-outline',
                action: 'add',
              },
              {
                name: 'Save Changes',
                type: 'primary',
                action: 'save',
              },
              {
                name: 'sendToExternalSys',
                type: 'success',
                action: 'sendToExternalSys',
              },
            ]"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import ProductionAdditionTable from '@components/Productions/ProductionAdditionTable.vue'
export default {
  components: {
    LoadingPage,
    ColumnConfigPage,
    GenericLookUp,
    ProductionAdditionTable,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      btnType: '',
      pageID: null,
      keywordValue: '',
      tableHead: {
        id: { name: 'Id', code: 'id' },
        name: {
          name: 'Batch Process Name',
          code: 'name',
        },
        status: {
          name: 'Status',
          code: 'status',
        },
      },
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      rowData: [],
    }
  },

  // WATCH
  watch: {
    pageID(newVal) {
      this.btnTypeSpecifyingAction()
    },
  },

  // CREATED
  created() {
    this.btnType = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.type
    // page ID sini olish
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    this.tableHeadLength = Object.keys(this.tableHead).length + 1
    // Table function
    this.getTableRequest()
    // function
    this.createDataAction()
  },

  // Methods
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },

    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batchProcess/batchProcessAjaxLoad`, {
          searchForm: {
            keyword: this.keywordValue,
          },
          pagingForm: {
            pageSize: this.pageSize_value,
            currentPage: 1,
            pageCount: 14,
            total: 328,
          },
        })
        .then(({ data: { batchProcessList } }) => {
          this.isLoading = !this.isLoading
          this.tableBody = batchProcessList

          this.tableBody.length
            ? (this.isThereBody = true)
            : (this.isThereBody = false)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Specifying the buttun type action
    btnTypeSpecifyingAction() {
      if (!this.pageID) {
        localStorage.removeItem('allTrueAndFalseData')
      }
    },

    // Generic_Input value
    getInputValue(inputVal) {
      this.keywordValue = inputVal
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // table data created
    createDataAction() {
      const data = [
        {
          name: 'Id',
          subName: 'id',
          width: '200',
          type: 'label',
        },
        {
          name: 'Product',
          subName: 'productId',
          width: '300',
          type: 'select',
        },
        {
          name: 'Code',
          subName: 'code',
          width: '300',
          type: 'text',
        },
        {
          name: 'Delete',
          subName: 'delete',
          width: '200',
          type: 'del',
        },
      ]
      this.rowData = data
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
