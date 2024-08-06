<template>
  <div class="w-full p-[4px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Registration of Contracts
        </h1>
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
        <div class="flex justify-center">
          <div
            class="w-[600px] rounded-md shadow-lg border-[1px] border-solid border-[#E5E5E5]"
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
                  :width="element?.width"
                  textsize="13"
                />
              </div>
              <div
                v-else-if="element?.type === 'select'"
                class="flex items-center justify-between gap-x-4"
              >
                <span class="gradient-text">{{ element?.name }} :</span>
                <generic-look-up
                  :dwidth="element?.width"
                  :durl="element?.url"
                />
              </div>
              <div
                v-else-if="element?.type === 'text'"
                class="flex items-center justify-between gap-x-4"
              >
                <span class="gradient-text">{{ element?.name }} :</span>
                <generic-input :width="element?.width" type="text" />
              </div>
              <div
                v-else-if="element?.type === 'textarea'"
                class="flex items-center justify-between gap-x-4"
              >
                <span class="gradient-text">{{ element?.name }} :</span>
                <generic-input :width="element?.width" type="textarea" />
              </div>
            </div>
            <div class="flex items-center justify-evenly mb-3">
              <generic-button name="Save" type="primary" />
              <generic-button
                name="Print"
                type="success"
                icon-name-attribute="printer"
              />
              <generic-button name="Confirm" />
            </div>
          </div>
        </div>

        <div>
          <production-addition-table
            class="mt-10 p-2"
            :data="rowData"
            :buttons="[
              {
                name: 'Add new',
                type: 'primary',
                iconNameAttribute: 'circle-plus-outline',
                action: 'add',
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
      rowData: [
        {
          name: '№',
          subName: 'id',
          width: '120',
          type: 'label',
        },
        {
          name: 'Product name',
          subName: 'productName',
          width: '120',
          type: 'select',
        },
        {
          name: 'Qty',
          subName: 'qty',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type1 Value',
          subName: 'unitMeasurementType1Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type1',
          subName: 'unitMeasurementType1',
          width: '120',
          type: 'select',
        },
        {
          name: 'Unit Measurement Type2 Value',
          subName: 'unitMeasurementType2Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type2',
          subName: 'unitMeasurementType2',
          width: '120',
          type: 'select',
        },
        {
          name: 'Unit Measurement Type3 Value',
          subName: 'unitMeasurementType3Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type3',
          subName: 'unitMeasurementType3',
          width: '120',
          type: 'select',
        },
        {
          name: 'Unit Measurement Type4 Value',
          subName: 'unitMeasurementType4Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type4',
          subName: 'unitMeasurementType4',
          width: '120',
          type: 'select',
        },
        {
          name: 'Notes',
          subName: 'notes',
          width: '120',
          type: 'text',
        },
        {
          name: 'Expense',
          subName: 'expense',
          width: '120',
          type: 'checkbox',
        },
        {
          name: 'Action',
          subName: 'delete',
          width: '120',
          type: 'del',
        },
      ],
    }
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
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
          width: '250',
        },
        {
          name: 'Shartnoma raqami',
          subName: 'contractNumber',
          type: 'text',
          width: '250',
        },
        {
          name: 'Shartnoma sanasi',
          subName: 'contractDate',
          type: 'date',
          width: '250',
        },
        {
          name: 'Amal qilish muddati',
          subName: 'validityPeriod',
          type: 'date',
          width: '250',
        },
        {
          name: 'Yetkazib beruvchi nomi',
          subName: 'supplierName',
          type: 'select',
          width: '250',
          url: 'findAllCompany',
          params: {
            branchcompany: false,
            companyType: 'Supplier',
          },
        },
        {
          name: 'Izox',
          subName: 'description',
          type: 'textarea',
          width: '250',
        },
      ]
      this.topFilterData = createDate
    },

    // get Input, date, select datasini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValues, name, value)
      // function
      this.getTableRequest()
      if (name === 'autorefresh') {
        // function
        this.realTimeRequest(value)
      }
    },

    // page request action
    getTableRequest() {
      const body = {}

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sew/contractRegistration`, body)
        .then(({ data }) => {
          this.this.isLoading = !this.isLoading
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

<style>
.gradient-text {
  background: -webkit-linear-gradient(60deg, #4568dc, #dd05af, #dd4903);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: 18px;
}
</style>
