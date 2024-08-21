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
            Xom-ashyo qabuli
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
          <div class="flex items-center gap-2">
            <span v-for="(element, index) in topFilterData" :key="index">
              <span
                v-if="element.type === 'date'"
                class="flex items-center gap-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input-date-page
                  :value="''"
                  width="165"
                  pl="10"
                  pr="10"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="datetime-local"
                  valuecolor="rgba(0,0,0,0.7)"
                  :name="element.subName"
                />
              </span>
              <generic-button
                v-else-if="element?.type === 'btn'"
                :name="element?.name"
                type="success"
                icon-name-attribute="search"
                @click="searchFilterAction(element?.type)"
              />
            </span>
          </div>
          <hr class="my-5" />
          <generic-scales-box />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericScalesBox from '@generics/GenericScalesBox.vue'
export default {
  components: {
    LoadingPage,
    ColumnConfigPage,
    GenericInputDatePage,
    GenericButton,
    GenericScalesBox,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      pageID: null,
      keywordValue: '',
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      topFilterData: [],
    }
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
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
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
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

    // crested data filter
    createdDataAction() {
      const data = [
        {
          name: 'Date From',
          subName: 'dateFrom',
          type: 'date',
        },
        {
          name: 'Date To',
          subName: 'dateTo',
          type: 'date',
        },
        {
          name: 'Search',
          type: 'btn',
        },
      ]
      this.topFilterData = data
    },

    // search action
    searchFilterAction(type) {
      if (type === 'btn') {
        console.log('hayyy!')
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
