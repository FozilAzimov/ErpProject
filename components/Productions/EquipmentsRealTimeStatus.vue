<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
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

      <!-- LIST UI -->
      <template
        v-if="dyeingWorkType === 'uzerp' || dyeingWorkType === 'single'"
      >
        <div
          class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
          :class="
            isOpenTable
              ? 'duration-[1s] min-h-[100px] h-fit overflow-hidden'
              : 'duration-[1s] h-0 overflow-hidden'
          "
        >
          <div
            class="min-h-[100px] h-fit flex flex-wrap items-center gap-3 p-2"
          >
            <span class="flex items-center gap-1">
              <generic-select
                id="personStatus"
                textsize="13"
                :max-width="100"
                :min-width="100"
                :is-def-option="true"
                :is-def-option-title="selectData?.personListItems[0]?.name"
              />
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[13px]">Department Name</span>
              <generic-select id="departments" textsize="13" />
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[13px]">Company</span>
              <generic-select id="company" textsize="13" />
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[13px]">Creator</span>
              <generic-select id="creator" textsize="13" />
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[13px]">width</span>
              <generic-input
                type="number"
                width="80"
                name="width"
                value="400"
                @customFunction="getInputValueAction"
              />
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[13px]">height</span>
              <generic-input
                type="number"
                width="80"
                name="height"
                value="400"
                @customFunction="getInputValueAction"
              />
            </span>
            <generic-button
              name="Set Size"
              type="primary"
              @click="getPageRequest"
            />
          </div>
        </div>
        <div
          class="w-full h-fit mt-4 grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5"
          :style="{
            gridTemplateColumns: `repeat(auto-fit, minmax(${width}px, ${1}fr))`,
          }"
        >
          <div
            v-for="(box, index) in equipmentsRealTimeStatus"
            :key="index"
            class="rounded-lg"
            :style="{
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.15)',
              width: `${width}px`,
              height: `${height}px`,
            }"
          >
            <div
              v-if="box?.equipment_status === null"
              class="m-2 flex flex-col items-start gap-1"
            >
              <span class="flex items-center gap-2 mb-1">
                <img
                  src="@assets/images/equipment.jpg"
                  width="35"
                  alt="equipment"
                />
                <span class="text-[13px] font-medium">{{ box?.name }}</span>
              </span>
              <p class="text-[12px]">
                Status Timer: {{ box?.equipment_status_date }}
              </p>
              <p class="text-[12px]">
                Start Timer: {{ box?.equipment_first_entry_date }}
              </p>
              <p class="text-[14px]">{{ box?.equipment_status }}</p>
              <p class="text-[14px] font-medium">
                Started {{ box?.start_info }}
              </p>
            </div>

            <div
              v-else-if="box?.equipment_status === 'START'"
              class="m-2 flex flex-col items-center p-1 gap-1 bg-[#67C23A] rounded-lg"
            >
              <span class="flex items-center gap-2">
                <img
                  src="@assets/images/equipment.jpg"
                  width="35"
                  alt="equipment"
                />
                <span class="text-[13px] font-medium">{{ box?.name }}</span>
              </span>
              <p class="text-[12px]">
                Status Timer: {{ box?.equipment_status_date }}
              </p>
              <p class="text-[12px]">
                Start Timer: {{ box?.equipment_first_entry_date }}
              </p>
              <p class="text-[14px]">{{ box?.equipment_status }}</p>
              <p class="text-[14px] font-medium">
                Started {{ box?.start_info }}
              </p>
            </div>

            <div
              v-else-if="box?.equipment_status === 'PAUSE'"
              class="m-2 flex flex-col items-center p-1 gap-1 bg-[#e9e63b] rounded-lg"
            >
              <span class="flex items-center gap-2">
                <img
                  src="@assets/images/equipment.jpg"
                  width="35"
                  alt="equipment"
                />
                <span class="text-[13px] font-medium">{{ box?.name }}</span>
              </span>
              <p class="text-[12px]">
                Status Timer: {{ box?.equipment_status_date }}
              </p>
              <p class="text-[12px]">
                Start Timer: {{ box?.equipment_first_entry_date }}
              </p>
              <p class="text-[14px]">{{ box?.equipment_status }}</p>
              <p class="text-[14px] font-medium">
                Started {{ box?.start_info }}
              </p>
            </div>

            <div
              v-else-if="box?.equipment_status === 'STOP'"
              class="m-2 flex flex-col items-center p-1 gap-1 bg-[#FF7F00] rounded-lg"
            >
              <span class="flex items-center gap-2">
                <img
                  src="@assets/images/equipment.jpg"
                  width="35"
                  alt="equipment"
                />
                <span class="text-[13px] font-medium">{{ box?.name }}</span>
              </span>
              <p class="text-[12px]">
                Status Timer: {{ box?.equipment_status_date }}
              </p>
              <p class="text-[12px]">
                Start Timer: {{ box?.equipment_first_entry_date }}
              </p>
              <p class="text-[14px]">{{ box?.equipment_status }}</p>
              <p class="text-[14px] font-medium">
                Started {{ box?.start_info }}
              </p>
            </div>
          </div>
        </div>
      </template>

      <!-- SIMPLE LIST UI -->
      <template v-else-if="dyeingWorkType === 'simple'">
        <div
          class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
          :class="
            isOpenTable
              ? 'duration-[1s] min-h-[70px] h-fit overflow-hidden'
              : 'duration-[1s] h-0 overflow-hidden'
          "
        >
          <div class="min-h-[70px] h-fit flex flex-wrap items-center gap-3 p-2">
            <span class="flex items-center gap-1">
              <span class="text-[13px]">Customer code: </span>
              <generic-look-up
                name="customer"
                :popper-append-to-body="true"
                :options-data="filteringCustomerData"
                @customFunction="getLookUpValue"
              />
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[13px]">Party code: </span>
              <generic-look-up
                name="party"
                :popper-append-to-body="true"
                :options-data="filteringBatchData"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>
        </div>
        <div
          class="w-full h-fit bg-black grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-3 p-3 mb-5 mt-1"
        >
          <div
            class="h-[400px] max-w-[700px] bg-[#D2D2D2] rounded-md border-[3px] border-solid border-[#778899] overflow-y-scroll"
          >
            <table class="w-full">
              <thead class="bg-[rgb(206,218,240)] sticky top-0">
                <tr>
                  <th
                    v-for="(headName, index) in tableHeadData1"
                    :key="index"
                    class="text-[11px] font-semibold border-[2px] border-solid border-[#778899] p-1 cursor-pointer whitespace-nowrap"
                  >
                    {{ headName }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(rowObj, index) in firstCardUIData"
                  :key="index"
                  class="bg-[#f8f8f8] font-medium"
                >
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    v-for="(item, inx) in tableBodyNames"
                    :key="inx"
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  >
                    {{ rowObj?.[item] || '-' }}
                  </td>
                </tr>
                <tr
                  v-if="firstCardUIData.length"
                  class="bg-[#f8f8f8] font-medium"
                >
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  >
                    Total
                  </td>
                  <td
                    colspan="3"
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  ></td>
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000] bg-[#35FF35]"
                  >
                    {{ allSummData?.firstCardQtyTotal.toFixed(2) }}
                  </td>
                  <td
                    colspan="3"
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  ></td>
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000] bg-[#35FF35]"
                  >
                    {{ allSummData?.firstCardPackTotal.toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-for="(obj, index) in allCardData"
            :key="index"
            class="h-[400px] max-w-[755px] bg-[#D2D2D2] rounded-md border-[3px] border-solid border-[#778899] overflow-y-scroll"
          >
            <table class="w-full">
              <thead class="bg-[rgb(206,218,240)] sticky top-0">
                <tr>
                  <th
                    class="text-[11px] font-semibold border-[2px] border-solid border-[#778899] p-1 cursor-pointer whitespace-nowrap"
                    :colspan="allTableHeadData.length + 1"
                  >
                    {{ obj?.nextEquipmentStatus[0]?.protsessName }}
                  </th>
                </tr>
              </thead>
              <thead class="bg-[rgb(206,218,240)] sticky top-[25px]">
                <tr>
                  <th
                    v-for="(headName, indexHead) in allTableHeadData"
                    :key="indexHead"
                    class="text-[11px] font-semibold border-[2px] border-solid border-[#778899] p-1 cursor-pointer whitespace-nowrap"
                  >
                    {{ headName }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(rowObj, indexBodyOne) in obj?.row"
                  :key="indexBodyOne"
                  class="bg-[#f8f8f8] font-medium"
                >
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    v-for="(item, inx) in allTableBodyNames"
                    :key="inx"
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  >
                    {{ rowObj?.[item] || '-' }}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr class="bg-[#F3BE2A] font-semibold">
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[11px] p-1 text-center text-[#000]"
                    :colspan="allTableHeadData.length + 1"
                  >
                    Wait
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr
                  v-for="(rowObj, indexBodyTwo) in obj?.nextEquipmentStatus"
                  :key="indexBodyTwo"
                  class="bg-[#f8f8f8] font-medium"
                >
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000] bg-[#FFFFE2]"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    v-for="(item, inx) in allTableBodyNames"
                    :key="inx"
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000] bg-[#FFFFE2]"
                  >
                    {{ rowObj?.[item] || '-' }}
                  </td>
                </tr>
                <!-- Total -->
                <tr
                  v-if="firstCardUIData.length"
                  class="bg-[#f8f8f8] font-medium"
                >
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  >
                    Total
                  </td>
                  <td
                    colspan="2"
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  ></td>
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000] bg-[#35FF35]"
                  >
                    {{ obj?.qtySumm.toFixed(2) }}
                  </td>
                  <td
                    colspan="4"
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000]"
                  ></td>
                  <td
                    class="border-[2px] border-solid border-[#778899] text-[9px] p-1 text-center text-[#000] bg-[#35FF35]"
                  >
                    {{ obj?.packSumm.toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
// Components
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericSelect from '@components/Select/GenericSelect.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericSelect,
    GenericInput,
    GenericButton,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      dyeingWorkType: null,

      // start list page state
      equipmentsRealTimeStatus: [],
      selectData: {
        personListItems: [],
        departmentList: [],
        companysList: [],
        creator: [],
      },
      personStatus: null,
      allSelectAndInputValue: {},
      width: null,
      height: null,
      intervalId: null,
      // end list page state

      // start SIMPLE list page state
      dyeingEquipments: [],
      stageDetails: {},
      customerCodeData: [],
      filteringCustomerData: [],
      batchNumberData: [],
      filteringBatchData: [],
      allLookUpData: {},
      rowData: [],
      firstCardUIData: [],
      allSummData: {
        firstCardQtyTotal: null,
        firstCardPackTotal: null,
      },
      allCardData: [],
      cardData: {},

      // table 1
      tableHeadData1: [
        '№',
        'Козон',
        'Cl. code',
        'Product',
        'Weight Qty',
        'Planned color',
        'Code',
        'Batch',
        'Packs',
      ],
      tableBodyNames: [
        'name',
        'codeCompany',
        'product',
        'qty',
        'color',
        'colorVariantName',
        'batchNumber',
        'pack',
      ],
      // all table head data
      allTableHeadData: [
        '№',
        'Cl. code',
        'Product',
        'Weight Qty',
        'Planned color',
        'Code',
        'Batch',
        'Date',
        'Packs',
      ],
      allTableBodyNames: [
        'codeCompany',
        'product',
        'qty',
        'color',
        'colorVariantName',
        'batchNumber',
        'prevExitDate',
        'pack',
      ],
      // start SIMPLE list page state
    }
  },

  // MOUNTED
  mounted() {
    this.allSelectAndInputValue.personStatus = 1
    this.allSelectAndInputValue.width = 400
    this.allSelectAndInputValue.height = 400
    // function
    this.getPageRequest()
  },

  //  BEFORE_DESTROY
  beforeDestroy() {
    clearInterval(this.intervalId)
  },

  // METHODS
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Selects valuesini olish
    selectValueAction(value, formDataId, isDefOptionTitle, index, idName) {
      this.allSelectAndInputValue[idName] = value
      // function
      this.getPageRequest()
    },

    getInputValueAction(name, value) {
      this.allSelectAndInputValue[name] = value
    },

    // Page Request Action
    getPageRequest() {
      const body = {}
      body.personStatus = this.allSelectAndInputValue?.personStatus
      body.departmentId = this.allSelectAndInputValue?.departments
      body.companyId = this.allSelectAndInputValue?.company
      body.personId = this.allSelectAndInputValue?.creator
      body.width = this.allSelectAndInputValue?.width
      body.height = this.allSelectAndInputValue?.height

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/equipment/equipmentsRealTimeStatusAjaxLoad`, body)
        .then(({ data }) => {
          this.dyeingWorkType = data?.dyeingWorkType
          // start list page data
          this.width = data?.width
          this.height = data?.height
          this.equipmentsRealTimeStatus = data?.equipmentsRealTimeStatus
          this.selectData.departmentList = data?.departmentList
          this.selectData.personListItems = data?.personListItems
          this.selectData.companysList = data?.companysList
          this.selectData.creator = data?.creator
          this.allSelectAndInputValue.personStatus = data?.personStatus
          data?.dyeingWorkType === 'uzerp' &&
            setTimeout(() => {
              this.getPageRequest()
            }, 10000)
          // end list page data

          // start Simple list page data
          this.dyeingEquipments = data?.dyeingEquipments
          this.stageDetails = JSON.parse(data?.stageDetails)
          // function
          this.getNextEquipmentsStatusAction()
          // function
          this.getAllSubCardDataAction()
          // end Simple list page data

          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // GenericLookUp value'sini olish
    getLookUpValue(name, value, order, resultType) {
      this.allLookUpData[name] = value
    },

    // GenericLookUp options data
    getNextEquipmentsStatusAction() {
      this.customerCodeData = []
      this.batchNumberData = []
      this.rowData = []
      this.firstCardUIData = []

      // Loop action | GenericLookUp data'sini yig'ish
      this.dyeingEquipments.forEach((obj) => {
        this.rowData.push(JSON.parse(obj?.row))

        if (obj?.row && Array.from(JSON.parse(obj?.row)).length) {
          const row = JSON.parse(obj?.row)

          row.forEach((obj) => {
            this.customerCodeData.push({
              name: obj?.codeCompany,
              id: obj?.codeCompany,
            })
            this.batchNumberData.push({
              name: obj?.batchNumber,
              id: obj?.batchNumber,
            })
          })
        }

        if (
          obj?.next_equipment_status &&
          Array.from(JSON.parse(obj?.next_equipment_status)).length
        ) {
          const next = JSON.parse(obj?.next_equipment_status)
          next.forEach((obj) => {
            this.customerCodeData.push({
              name: obj?.codeCompany,
              id: obj?.codeCompany,
            })
            this.batchNumberData.push({
              name: obj?.batchNumber,
              id: obj?.batchNumber,
            })
          })
        }
      })

      // start - First Card data created
      this.rowData.forEach((arr, index) => {
        let counterRow = 0
        if (arr.length) {
          arr.forEach((obj, index) => {
            const nextData = arr[index + 1]
            if (
              counterRow === 0 &&
              (nextData == null ||
                (nextData !== null && obj.batchNumber !== nextData.batchNumber))
            ) {
              counterRow++
              this.firstCardUIData.push(obj)
              this.allSummData.firstCardQtyTotal += parseFloat(obj?.qty)
              this.allSummData.firstCardPackTotal += parseFloat(obj?.pack)
            }
          })
          this.firstCardUIData[index] = {
            ...this.firstCardUIData?.[index],
            name: this.dyeingEquipments?.[index]?.name,
          }
        } else {
          this.firstCardUIData.push({
            name: this.dyeingEquipments?.[index]?.name,
          })
        }
      })
      // end - First Card data created

      // customer code uchun
      const seen = new Map()
      this.filteringCustomerData = this.customerCodeData.filter((item) => {
        const duplicate = seen.has(item.name)
        seen.set(item.name, true)
        return !duplicate
      })

      // batch number uchun
      const seenBatch = new Map()
      this.filteringBatchData = this.batchNumberData.filter((item) => {
        const duplicate = seenBatch.has(item.name)
        seenBatch.set(item.name, true)
        return !duplicate
      })

      // default set object value
      this.filteringCustomerData.unshift({ name: '---', id: '---' })
      this.filteringBatchData.unshift({ name: '---', id: '---' })
    },

    // 11 ta CARD data'sini yaratish
    getAllSubCardDataAction() {
      const objParseArray = Object.values(this.stageDetails)

      objParseArray.forEach((obj) => {
        this.cardData = {}
        const nextData = []
        let qtySumm = null
        let packSumm = null
        obj?.next_equipment_status?.myArrayList?.forEach((subObj) => {
          qtySumm += subObj?.map?.qty
          packSumm += subObj?.map?.pack
          nextData.push(subObj?.map)
        })
        this.cardData.nextEquipmentStatus = nextData
        this.cardData.qtySumm = qtySumm
        this.cardData.packSumm = packSumm

        const rowData = []
        obj?.row?.myArrayList?.forEach((subObj) => {
          rowData.push(subObj?.map)
        })
        this.cardData.row = rowData
        this.allCardData.push(this.cardData)
      })
    },
  },
}
</script>
