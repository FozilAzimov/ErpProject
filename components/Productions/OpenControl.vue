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
    <form class="flex flex-wrap items-center gap-3 py-4">
      <span v-for="(element, index) in topFilterData" :key="index">
        <span v-if="element.type === 'date'" class="flex items-center gap-1">
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-input-date-page
            :value="''"
            width="165"
            :name="element.subName"
            @customFunction="getInputValuesAction"
          />
        </span>
      </span>
    </form>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Quality Control
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
          <h1 class="font-bold text-[22px] text-[rgb(49,126,172)]">Details</h1>
          <div class="flex flex-col justify-start">
            <div
              v-for="(arr, index) in allInputData"
              :key="index"
              class="w-full flex items-center justify-between mb-2 gap-x-10"
            >
              <span v-for="(obj, inx) in arr" :key="inx" class="w-full">
                <span
                  v-if="obj?.name"
                  class="w-full flex flex-col items-start gap-1"
                >
                  <span class="text-[13px]">{{ obj?.name }}</span>
                  <generic-input
                    :type="obj?.type"
                    :name="obj?.subName"
                    widthtype="%"
                    width="100"
                    @customFunction="getInputValuesAction"
                  />
                </span>
              </span>
            </div>
            <hr class="my-5" />
            <generic-button name="Save" type="primary" />
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
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: {
    LoadingPage,
    ColumnConfigPage,
    GenericInput,
    GenericButton,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      topFilterData: [],
      btnType: '',
      pageID: null,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      allInputValues: {},
      allInputData: [],
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
    // Table function
    this.getTableRequest()
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

    // get Input, date, select datasini olish
    getInputValuesAction(name, value) {
      this.$set(this.allInputValues, name, value)
    },
    // get Input, date, select datasini olish

    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batchProcess/batchProcessAjaxLoad`, {
          searchForm: {
            keyword: this.allInputValues?.keyword,
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

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering() {
      const createDate = [
        {
          name: 'Start Date',
          subName: 'dateFrom',
          type: 'date',
        },
      ]
      this.topFilterData = createDate

      const data = [
        [
          { name: 'Feine', subName: 'fine', type: 'number' },
          {
            name: 'Shrinkage width tolerance',
            subName: 'tolerance',
            type: 'number',
          },
          {
            name: 'Twist',
            subName: 'twist',
            type: 'number',
          },
        ],
        [
          { name: 'Pus', subName: 'pus', type: 'number' },
          {
            name: 'Rotation tolerance',
            subName: 'rotation_tolerance',
            type: 'number',
          },
          {
            name: 'Sans',
            subName: 'sans',
            type: 'number',
          },
        ],
        [
          {
            name: 'Height tolerance',
            subName: 'height_tolerance',
            type: 'number',
          },
          {
            name: 'Grammage',
            subName: 'grammage',
            type: 'number',
          },
          {
            name: 'Thin',
            subName: 'thin',
            type: 'number',
          },
        ],
        [
          {
            name: 'Width tolerance',
            subName: 'width_tolerance',
            type: 'number',
          },
          {
            name: 'Shrinkage height tolerancnce',
            subName: 'tolerancnce',
            type: 'number',
          },
          {
            name: 'Thik',
            subName: 'thik',
            type: 'number',
          },
        ],
        [
          {
            name: 'Count of needle2',
            subName: 'needle2',
            type: 'number',
          },
          {
            name: 'Linear density',
            subName: 'linear_density',
            type: 'number',
          },
          {
            name: 'Neps',
            subName: 'neps',
            type: 'number',
          },
        ],
        [
          {
            name: 'Count of needle3',
            subName: 'needle3',
            type: 'number',
          },
          {},
          {
            name: 'Sans tolerance',
            subName: 'sans_tolerance',
            type: 'number',
          },
        ],
        [
          {
            name: 'Count of needle4',
            subName: 'needle4',
            type: 'number',
          },
          {},
          {
            name: 'Washing purity',
            subName: 'washing_purity',
            type: 'number',
          },
        ],
        [
          {
            name: 'Height',
            subName: 'height',
            type: 'number',
          },
          {},
          {
            name: 'Rapor height',
            subName: 'rapor_height',
            type: 'number',
          },
        ],
        [
          {
            name: 'Ring breaking kilometer',
            subName: 'ring_breaking_kilometer',
            type: 'number',
          },
          {},
          {
            name: 'Special touch',
            subName: 'special_touch',
            type: 'number',
          },
        ],
        [
          {
            name: 'Variation coefficient',
            subName: 'variation_coefficient',
            type: 'number',
          },
          {},
          {},
        ],
      ]
      this.allInputData = data
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
