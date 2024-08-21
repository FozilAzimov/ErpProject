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
            Model Barcode Reader
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
          <div v-for="(element, index) in allData" :key="index">
            <span
              v-if="element.type === 'number'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]"
                >{{ element.name }}
                <span v-if="element?.require" class="text-[17px] text-red-500"
                  >*</span
                >
              </span>
              <generic-input
                width="300"
                type="number"
                :name="element?.subName"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span
              v-else-if="element.type === 'select'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]"
                >{{ element.name }}
                <span v-if="element?.require" class="text-[17px] text-red-500"
                  >*</span
                ></span
              >
              <generic-look-up
                dwidth="300"
                :durl="element?.url"
                :name="element?.subName"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span
              v-else-if="element.type === 'checkbox'"
              class="flex flex-col items-start mb-1"
            >
              <generic-check-box
                :text="element?.name"
                :name="element?.subName"
                :border="true"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span v-else-if="element.type === 'radio'">
              <el-radio
                v-for="(item, inx) in element?.data"
                :key="inx"
                v-model="radio"
                :label="item"
              ></el-radio>
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    LoadingPage,
    ColumnConfigPage,
    GenericInput,
    GenericLookUp,
    GenericCheckBox,
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
      allData: [],
      radio: '',
      allSelectAndInputValue: {},
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
    this.createdDataAction()
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
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // created data action
    createdDataAction() {
      const data = [
        {
          name: 'Employee',
          subName: 'employee',
          type: 'select',
          require: true,
          url: 'findAllEmployee',
        },
        {
          name: 'Barcode',
          subName: 'barcode',
          type: 'number',
          require: true,
        },
        {
          name: 'Send to auto print',
          subName: 'print',
          type: 'checkbox',
        },
        {
          type: 'radio',
          data: ['1', '10', '20', '30', '40', '50'],
        },
      ]
      this.allData = data
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
