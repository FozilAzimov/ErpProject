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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] p-[10px_10px_70px_10px]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="w-full rounded-lg shadow-xl p-3">
          <div class="flex items-end gap-3 m-2">
            <span class="flex items-center gap-1">
              <span class="text-[14px] font-medium">invoice_items_ids:</span>
              <generic-input
                width="300"
                type="text"
                name="invoice_item_ids"
                @customFunction="getInputValueAction"
              />
            </span>
            <table
              class="w-[400px] border-[1px] border-[solid] border-[#F0F0F0]"
            >
              <thead class="bg-[rgb(229,235,245)]">
                <tr>
                  <th
                    class="text-[12px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-1 cursor-pointer whitespace-nowrap"
                  >
                    N
                  </th>
                  <th
                    class="text-[12px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-1 cursor-pointer whitespace-nowrap"
                  >
                    Id
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in qualityControlErrorList"
                  :key="index"
                  class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
                >
                  <td class="border-[1px] text-[12px] p-1 text-center">
                    {{ index }}
                  </td>
                  <td
                    v-for="(value, inx) in row"
                    :key="inx"
                    class="border-[1px] text-[12px] p-1 text-center"
                  >
                    {{ value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-[28px] font-medium text-[#317EAC] text-center py-5">
            qualityControlDetails
          </div>
          <div class="flex items-start justify-between flex-wrap gap-5">
            <span
              v-for="(element, index) in allLookUpAndInputTypesData"
              :key="index"
              class="w-[450px] flex items-center justify-between gap-2"
            >
              <span class="text-[14px]">{{ element.name }}</span>
              <span>
                <look-up
                  v-if="element.type === 'list'"
                  dwidth="200"
                  :name="element.subName"
                  :options-data="allSelectData?.[element.dataName]"
                  @customFunction="getLookUpValueAction"
                />
                <generic-input
                  v-else-if="element.type === 'float'"
                  width="300"
                  type="number"
                  :name="element.subName"
                  @customFunction="getInputValueAction"
                />
              </span>
            </span>
          </div>
          <div class="py-3">
            <generic-button name="Save" type="primary" @click="saveAction" />
          </div>
        </div>
      </div>
      <div class="overflow-x-scroll">
        <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
          <thead class="bg-[rgb(229,235,245)]">
            <tr>
              <th
                v-for="(element, index) in tableHeadBodyData"
                :key="index"
                class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer whitespace-nowrap"
              >
                {{ element }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in tableBodyAllData"
              :key="index"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ index + 1 }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.product_name }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.qty }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.qty2 }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.creator_id }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.created_date }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.updated_date }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.controlstatus }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.status }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.qfc_name }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.qft_name }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.grade }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.breaking_load }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.coefficient_maturity }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.mass_share_defects }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.specific_load }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.stamp_weight_length }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ row?.linear_density }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import LookUp from '@generics/LookUp.vue'
export default {
  components: {
    GenericInput,
    LookUp,
    GenericButton,
  },

  // DATA
  data() {
    return {
      allLookUpAndInputTypesData: [
        {
          name: 'fiber_type',
          type: 'list',
          subName: 'fiber_type',
          dataName: 'fiberTypeList',
        },
        {
          name: 'fiberClass',
          type: 'list',
          subName: 'fiber_class',
          dataName: 'fiberClassList',
        },
        {
          name: 'Grade',
          type: 'list',
          subName: 'grade_id',
          dataName: 'gradeList',
        },
        {
          name: 'breaking_load',
          type: 'float',
          subName: 'breakingLoad',
        },
        {
          name: 'coefficient_maturity',
          type: 'float',
          subName: 'coefficient_maturity',
        },
        {
          name: 'stamp_weight_length',
          type: 'float',
          subName: 'stamp_weight_length',
        },
        { name: 'linear_density', type: 'float', subName: 'linear_density' },
        { name: 'specific_load', type: 'float', subName: 'specific_load' },
        {
          name: 'mass_share_defects',
          type: 'float',
          subName: 'mass_share_defects',
        },
        {
          name: 'massRatioMoisture',
          type: 'float',
          subName: 'massRatioMoisture',
        },
        {
          name: 'controlled Status',
          type: 'list',
          subName: 'controlstatus',
          dataName: 'controlledStatusItems',
        },
        {
          name: 'Status',
          type: 'list',
          subName: 'status',
          dataName: 'controlledFinishedStatusItems',
        },
      ],
      isLoading: false,
      pageSize_value: 10,
      keywordValue: '',
      isOpenTable: true,
      isCloseTable: true,
      tableHeadBodyData: [
        '№',
        'Product',
        'Qty',
        'Qty2',
        'creator_id',
        'created_date',
        'updated_date',
        'control_status',
        'Status',
        'Class',
        'Type',
        'Grade',
        'breaking_load',
        'coefficient_maturity',
        'mass_share_defects',
        'specific_load',
        'stamp_weight_length',
        'linear_density',
      ],
      tableBodyAllData: [],
      allSelectData: {},
      allLookUpAndInputValues: {},
      qualityControlErrorList: [],
    }
  },

  // WATCH
  watch: {
    allSelectData(newVal) {
      this.allSelectData = newVal
    },
  },

  // MOUNTED
  mounted() {
    // function
    this.getRequestAction(
      JSON.parse(localStorage.getItem('allTrueAndFalseData'))
    )
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

    // LookUp value'sini olish
    getLookUpValueAction(key, value, order, resultType) {
      this.$set(this.allLookUpAndInputValues, key, value)
    },

    // Input value'sini olish
    getInputValueAction(key, value, order) {
      this.$set(this.allLookUpAndInputValues, key, value)
    },

    getRequestAction(obj) {
      let body = {}
      if (obj?.packageValue === 'controlOne')
        body = { stavkaStageId: obj?.stavkaStageId }
      else if (obj?.packageValue === 'controlTwo') body = { lot: obj?.lot }

      // request action
      if (body?.stavkaStageId || body?.lot) {
        this.allLookUpAndInputValues = {
          ...this.allLookUpAndInputValues,
          ...body,
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/qualitycontrol/getReportQualityControlListByFilter`, body)
          .then(({ data: { qualityControlList } }) => {
            this.isLoading = !this.isLoading
            this.tableBodyAllData = qualityControlList
          })
          .catch(() => {
            this.isLoading = !this.isLoading
          })

        // request action
        this.$axios
          .post(`/qualitycontrol/openControlPageNew`, body)
          .then(({ data }) => {
            this.allSelectData = data
          })
      }
    },

    // Save Action
    saveAction() {
      // request action
      if (Object.values(this.allLookUpAndInputValues).length >= 13) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/qualitycontrol/createQualityControlDetailsbyItems`,
            this.allLookUpAndInputValues
          )
          .then(({ data: { stavkaStageId, lot, qualityControlErrorList } }) => {
            this.isLoading = !this.isLoading
            this.qualityControlErrorList = qualityControlErrorList
            // function
            if (stavkaStageId) {
              this.$axios
                .post(`/qualitycontrol/getReportQualityControlListByFilter`, {
                  stavkaStageId,
                })
                .then(({ data }) => {
                  this.allSelectData = data
                })
            } else if (lot) {
              this.$axios
                .post(`/qualitycontrol/getReportQualityControlListByFilter`, {
                  lot,
                })
                .then(({ data }) => {
                  this.allSelectData = data
                })
            }
          })
          .catch(() => {
            this.isLoading = !this.isLoading
          })
      }
    },
  },
}
</script>
