<template>
  <div class="w-full p-[0px_12px_0px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] mt-1 border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{ $t('pages.reports.transactionReports.headerName') }}
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
        :class="
          isOpenTable
            ? 'duration-[1s] h-[94%] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div
          class="border-[1px] border-[solid] border-[#dedede] p-[10px_5px] shadow-[0_0_10px_rgba(189,189,189,0.4)]"
        >
          <div class="flex items-center gap-2 pb-[10px]">
            <h3 class="text-[15px]">Reports</h3>
            <GenericActiveLookUpPage
              v-if="lookUpData.length"
              :data="lookUpData"
              placeholder="Select an Option"
              @customLookupValue="getValueLookup"
            />
            <GenericButton
              name="Show/Hide"
              pl="10"
              pt="3"
              pr="10"
              pb="3"
              bggradient="linear-gradient(to right, rgba(54, 155, 215, 0.8),rgba(34, 39, 76, 0.8))"
              textsize="14"
              @click="showHideAction"
            />
          </div>
          <div>
            <SummaryReportPage1
              v-if="lookUpValue === 'transactionSummaryReports' && dateFrom"
              :data="lookUpData2"
              :from="dateFrom"
              :actionname="lookUpValue"
              :isopen="formClose"
            />
            <SummaryReportPage2
              v-else-if="lookUpValue === 'transactionDailyReports' && dateFrom"
              :data="lookUpData2"
              :from="dateFrom"
              :actionname="lookUpValue"
              :isopen="formClose"
            />
            <SummaryReportPage3
              v-else-if="lookUpValue === 'transactionDailyReports2' && dateFrom"
              :data="lookUpData2"
              :from="dateFrom"
              :actionname="lookUpValue"
              :isopen="formClose"
            />
            <SummaryReportPage4
              v-else-if="
                lookUpValue === 'transactionDailyReports3' && dateFrom && dateTo
              "
              :data="lookUpData2"
              :from="dateFrom"
              :to="dateTo"
              :actionname="lookUpValue"
              :isopen="formClose"
            />
            <SummaryReportPage5
              v-else-if="
                lookUpValue === 'transactionDailyReports4' && dateFrom && dateTo
              "
              :from="dateFrom"
              :to="dateTo"
              :actionname="lookUpValue"
              :isopen="formClose"
            />
            <SummaryReportPage6
              v-else-if="
                lookUpValue === 'transactionDailyReports5' && dateFrom && dateTo
              "
              :data="lookUpData2"
              :from="dateFrom"
              :to="dateTo"
              :actionname="lookUpValue"
              :isopen="formClose"
            />
            <SummaryReportPage7
              v-else-if="
                lookUpValue === 'transactionDailyReports6' && dateFrom && dateTo
              "
              :from="dateFrom"
              :to="dateTo"
              :isopen="formClose"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericActiveLookUpPage from '@generics/GenericActiveLookUp/GenericActiveLookUpPage.vue'
import GenericButton from '@components/Button/GenericButton.vue'
import SummaryReportPage1 from '@components/Reports/TransactionReports/SummaryReportPage1.vue'
import SummaryReportPage2 from '@components/Reports/TransactionReports/SummaryReportPage2.vue'
import SummaryReportPage3 from '@components/Reports/TransactionReports/SummaryReportPage3.vue'
import SummaryReportPage4 from '@components/Reports/TransactionReports/SummaryReportPage4.vue'
import SummaryReportPage5 from '@components/Reports/TransactionReports/SummaryReportPage5.vue'
import SummaryReportPage6 from '@components/Reports/TransactionReports/SummaryReportPage6.vue'
import SummaryReportPage7 from '@components/Reports/TransactionReports/SummaryReportPage7.vue'
export default {
  components: {
    LoadingPage,
    GenericActiveLookUpPage,
    GenericButton,
    SummaryReportPage1,
    SummaryReportPage2,
    SummaryReportPage3,
    SummaryReportPage4,
    SummaryReportPage5,
    SummaryReportPage6,
    SummaryReportPage7,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      isOpenTable: true,
      isCloseTable: true,
      checkModalValue: false,
      lookUpData: [],
      lookUpData2: [],
      lookUpValue: null,
      dateFrom: '',
      dateTo: '',
      formClose: false,
    }
  },

  // MOUNTED
  mounted() {
    this.isLoading = !this.isLoading
    this.$axios
      .post(`/transactionsReport/transactionReports`)
      .then((res) => {
        this.isLoading = !this.isLoading
        this.lookUpData = res.data
      })
      .catch((error) => {
        this.isLoading = !this.isLoading
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModalValue = true
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    showHideAction() {
      this.formClose = !this.formClose
    },

    // Look Up data sini olish
    getValueLookup(value) {
      this.lookUpValue = value
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/transactionsReport/transactionReportsType`, {
          reportType: this.lookUpValue,
        })
        .then((res) => {
          this.isLoading = !this.isLoading
          this.lookUpData2 = res.data.rateTypeList
          this.dateFrom = res.data.dateFrom
          this.dateTo = res.data.dateTo
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>
