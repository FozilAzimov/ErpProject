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
            Producton By Package
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] min-h-[755px] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="p-2 flex items-start justify-center">
          <div
            class="w-[1000px] h-[500px] rounded-2xl shadow-2xl border-[1px] border-solid border-[#dbdbdb] p-3 flex flex-col flex-wrap gap-2"
          >
            <div
              v-for="(element, index) in boxAllData"
              :key="index"
              class="w-[280px] flex items-center justify-between gap-2"
            >
              <span class="text-[13px] whitespace-nowrap"
                >{{ element.name }}
                <span v-if="element.required" class="text-[red] text-[15px]"
                  >*</span
                >
              </span>
              <generic-input-date-page
                v-if="element.type === 'date'"
                :width="element.width"
                height="23"
                pl="8"
                pr="8"
                pt="1"
                pb="1"
                textsize="13"
                type="datetime-local"
                :value="new Date().toISOString().split('.')[0]"
                valuecolor="rgba(0,0,0,0.7)"
                :name="element.subName"
                @customFunction="getInputDateValueAction"
              />
              <span v-else-if="element.type === 'list'">
                <span
                  v-if="element.multiple"
                  class="flex items-center gap-[2px]"
                >
                  <look-up
                    :durl="
                      element.subName === 'equipment'
                        ? `productionReports/${element.url}`
                        : `invoiceBase/${element.url}`
                    "
                    :dparam="
                      element.subName === 'stavkaStage'
                        ? {
                            stavkaId: allLookUpAndInputValues?.iplikStavka,
                            finalStatus: true,
                          }
                        : {}
                    "
                    :defvalue="
                      element.subName === 'warehouse' &&
                      stavkaStageFirstData.warehouseName
                        ? stavkaStageFirstData.warehouseName
                        : element.subName === 'iplikStavka' &&
                          stavkaStageFirstData.stavkaName
                        ? stavkaStageFirstData.stavkaName
                        : element.subName === 'stavkaStage' &&
                          stavkaStageFirstData.stavkaStageName
                        ? stavkaStageFirstData.stavkaStageName
                        : element.subName === 'stavkaPlan' &&
                          stavkaStageFirstData.stavkaPlanName
                        ? stavkaStageFirstData.stavkaPlanName
                        : element.subName === 'employee' &&
                          stavkaStageFirstData.personName
                        ? stavkaStageFirstData.personName
                        : element.subName === 'color' &&
                          stavkaStageFirstData.colorName
                        ? stavkaStageFirstData.colorName
                        : element.subName === 'equipment' &&
                          stavkaStageFirstData.equipmentName
                        ? stavkaStageFirstData.equipmentName
                        : element.subName === 'tara' &&
                          stavkaStageFirstData.taraName
                        ? `${stavkaStageFirstData.taraName}`
                        : ''
                    "
                    :disabled="
                      element.subName === 'warehouse' &&
                      stavkaStageFirstData.warehouseName
                        ? true
                        : element.subName === 'iplikStavka' &&
                          stavkaStageFirstData.stavkaName
                        ? true
                        : element.subName === 'stavkaStage' &&
                          stavkaStageFirstData.stavkaStageName
                        ? true
                        : element.subName === 'stavkaPlan' &&
                          stavkaStageFirstData.stavkaPlanName
                        ? true
                        : element.subName === 'employee' &&
                          stavkaStageFirstData.personName
                        ? true
                        : element.subName === 'color' &&
                          stavkaStageFirstData.colorName
                        ? true
                        : element.subName === 'equipment' &&
                          stavkaStageFirstData.equipmentName
                        ? true
                        : element.subName === 'tara' &&
                          stavkaStageFirstData.taraName
                        ? true
                        : false
                    "
                    :dwidth="element.width"
                    :name="element.subName"
                    @customFunction="getLookUpValueAction"
                  />
                  <generic-input
                    :width="element.widthTwo"
                    :value="`${
                      element.subNameTwo
                        ? stavkaStageFirstData.packagingTwo
                        : ''
                    }`"
                    type="number"
                    :name="element.subNameTwo"
                    :disabled="element.disabledTwo"
                  />
                </span>
                <look-up
                  v-else
                  :durl="
                    element.subName === 'equipment'
                      ? `productionReports/${element.url}`
                      : `invoiceBase/${element.url}`
                  "
                  :dparam="
                    element.subName === 'stavkaStage'
                      ? {
                          stavkaId: allLookUpAndInputValues?.iplikStavka,
                          finalStatus: true,
                        }
                      : {}
                  "
                  :defvalue="
                    element.subName === 'warehouse' &&
                    stavkaStageFirstData.warehouseName
                      ? stavkaStageFirstData.warehouseName
                      : element.subName === 'iplikStavka' &&
                        stavkaStageFirstData.stavkaName
                      ? stavkaStageFirstData.stavkaName
                      : element.subName === 'stavkaStage' &&
                        stavkaStageFirstData.stavkaStageName
                      ? stavkaStageFirstData.stavkaStageName
                      : element.subName === 'stavkaPlan' &&
                        stavkaStageFirstData.stavkaPlanName
                      ? stavkaStageFirstData.stavkaPlanName
                      : element.subName === 'employee' &&
                        stavkaStageFirstData.personName
                      ? stavkaStageFirstData.personName
                      : element.subName === 'color' &&
                        stavkaStageFirstData.colorName
                      ? stavkaStageFirstData.colorName
                      : element.subName === 'equipment' &&
                        stavkaStageFirstData.equipmentName
                      ? stavkaStageFirstData.equipmentName
                      : element.subName === 'tara' &&
                        stavkaStageFirstData.taraName
                      ? `${stavkaStageFirstData.taraName}`
                      : ''
                  "
                  :disabled="
                    element.subName === 'warehouse' &&
                    stavkaStageFirstData.warehouseName
                      ? true
                      : element.subName === 'iplikStavka' &&
                        stavkaStageFirstData.stavkaName
                      ? true
                      : element.subName === 'stavkaStage' &&
                        stavkaStageFirstData.stavkaStageName
                      ? true
                      : element.subName === 'stavkaPlan' &&
                        stavkaStageFirstData.stavkaPlanName
                      ? true
                      : element.subName === 'employee' &&
                        stavkaStageFirstData.personName
                      ? true
                      : element.subName === 'color' &&
                        stavkaStageFirstData.colorName
                      ? true
                      : element.subName === 'equipment' &&
                        stavkaStageFirstData.equipmentName
                      ? true
                      : false
                  "
                  :dwidth="element.width"
                  height="23"
                  :name="element.subName"
                  @customFunction="getLookUpValueAction"
                />
              </span>
              <span v-else-if="element.type === 'float'">
                <span v-if="element.required">
                  <span
                    v-if="element.multiple"
                    class="flex items-center gap-[2px]"
                  >
                    <generic-input
                      :width="element.width"
                      type="number"
                      :name="element.subName"
                      class="focusInput"
                      @customFunction="getInputValueAction"
                      @enter="getEnterAction"
                    />
                    <generic-input
                      :width="element.widthTwo"
                      :value="`${stavkaStageFirstData?.bruttoTwo}`"
                      type="number"
                      :name="element.subNameTwo"
                      :disabled="element.disabledTwo"
                    />
                  </span>
                  <generic-input
                    v-else
                    :width="element.width"
                    type="number"
                    :name="element.subName"
                    :disabled="
                      element.subName === 'batch' && stavkaStageFirstData.batch
                        ? true
                        : false
                    "
                    @customFunction="getInputValueAction"
                  />
                </span>
                <generic-input
                  v-else-if="element.disabled"
                  :width="element.width"
                  :value="`${
                    element.subName === 'subTotalTara'
                      ? stavkaStageFirstData?.subTotalTara
                      : ''
                  }`"
                  type="number"
                  :disabled="element.disabled"
                  :name="element.subName"
                  @customFunction="getInputValueAction"
                />
                <generic-input
                  v-else
                  :width="element.width"
                  :value="`${
                    element.subName === 'rows'
                      ? allLookUpAndInputValues?.rows || '30'
                      : ''
                  }`"
                  type="number"
                  :name="element.subName"
                  @customFunction="getInputValueAction"
                />
              </span>
              <span v-else-if="element.type === 'string'">
                <generic-input
                  v-if="element.required"
                  :value="`${
                    element.subName === 'batch' && stavkaStageFirstData.batch
                      ? stavkaStageFirstData.batch
                      : element.subName === 'description' &&
                        stavkaStageFirstData.invoiceDescription
                      ? stavkaStageFirstData.invoiceDescription
                      : element.subName === 'lot' &&
                        stavkaStageFirstData.itemLot
                      ? stavkaStageFirstData.itemLot
                      : ''
                  }`"
                  :width="element.width"
                  type="text"
                  :name="element.subName"
                  :disabled="
                    element.subName === 'batch' && stavkaStageFirstData.batch
                      ? true
                      : element.subName === 'description' &&
                        stavkaStageFirstData.invoiceDescription
                      ? true
                      : element.subName === 'lot' &&
                        stavkaStageFirstData.itemLot
                      ? true
                      : false
                  "
                  @customFunction="getInputValueAction"
                />
                <generic-input
                  v-else-if="element.disabled"
                  :width="element.width"
                  type="text"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputValueAction"
                />
                <generic-input
                  v-else
                  :value="`${
                    element.subName === 'invoice' &&
                    stavkaStageFirstData.invoice_id
                      ? stavkaStageFirstData.invoice_id
                      : ''
                  }`"
                  :width="element.width"
                  type="text"
                  :name="element.subName"
                  :disabled="
                    element.subName === 'invoice' &&
                    stavkaStageFirstData.invoice_id
                      ? true
                      : false
                  "
                  @customFunction="getInputValueAction"
                />
              </span>
              <generic-check-box
                v-else-if="element.type === 'checkbox'"
                :name="element.subName"
                @customFunction="getCheckBoxValueAction"
              />
              <span v-else-if="element.type === 'button'">
                <span
                  v-if="element.multiple"
                  class="flex items-center gap-[2px]"
                >
                  <generic-button
                    :name="element.btnName"
                    type="primary"
                    @click="clickedBtnAction(element.btnDifferentiate)"
                  />
                  <generic-input
                    :width="element.widthTwo"
                    :value="`0`"
                    type="number"
                    :name="element.subNameTwo"
                    :disabled="element.disabledTwo"
                  />
                </span>
                <generic-button
                  v-else
                  :name="element.btnName"
                  type="primary"
                  @click="clickedBtnAction(element.btnDifferentiate)"
                />
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="stavkaStageSecondData.length"
          class="w-full flex items-start gap-7 p-5 overflow-x-auto"
        >
          <div
            v-for="(arr, index) in drawUIData"
            :key="index"
            class="flex flex-col items-end"
          >
            <div
              v-for="obj in arr"
              :key="obj?.id"
              class="flex items-center justify-between flex-nowrap"
            >
              <span class="text-[12px]">{{ obj?.index }}</span>
              <span class="mx-1">-</span>
              <span class="flex items-center flex-nowrap">
                <generic-input
                  width="70"
                  :value="obj?.qty2 ? obj?.qty2 : ''"
                  height="23"
                  type="number"
                  :disabled="true"
                />
                <generic-input
                  width="70"
                  :value="obj?.qty ? obj?.qty : ''"
                  type="number"
                  :disabled="true"
                />
              </span>
            </div>
            <span class="flex items-center flex-nowrap">
              <span class="text-[12px]">Total</span>
              <span class="mx-1">-</span>
              <generic-input
                width="70"
                :value="drawGropTotalQty2[index]"
                type="number"
                valuecolor="red"
                :disabled="true"
              />
              <generic-input
                width="70"
                :value="drawGropTotalQty[index]"
                type="number"
                valuecolor="red"
                :disabled="true"
              />
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@components/Generics/GenericButton.vue'
import GenericCheckBox from '@components/Generics/GenericCheckBox.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import LookUp from '@components/Lookup/LookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericInputDatePage,
    GenericInput,
    LookUp,
    GenericCheckBox,
    GenericButton,
  },

  // DATA
  data() {
    return {
      boxAllData: [
        {
          width: '180',
          name: 'Start Date',
          subName: 'startDate',
          type: 'date',
          required: true,
          disabled: false,
        },
        {
          width: '180',
          name: 'Rows',
          subName: 'rows',
          type: 'float',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Warehouse',
          subName: 'warehouse',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllWarehouseByAbsoluteLogic',
        },
        {
          width: '180',
          name: 'Iplik Stavka',
          subName: 'iplikStavka',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllStavka',
        },
        {
          width: '180',
          name: 'Stavka Stage',
          subName: 'stavkaStage',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllStavkaStage',
        },
        {
          width: '180',
          name: 'Employee',
          subName: 'employee',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllEmployee',
        },
        {
          width: '180',
          name: 'Color',
          subName: 'color',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllColor',
        },
        {
          width: '180',
          name: 'Equipment',
          subName: 'equipment',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllEquipments',
        },
        {
          width: '180',
          name: 'Defect Qty4',
          subName: 'defectQty4',
          type: 'float',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Defect Qty',
          subName: 'defectQty',
          type: 'float',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Defect Stillage',
          subName: 'defectStillage',
          type: 'float',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Qty4',
          subName: 'qty4',
          type: 'float',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Qty2',
          subName: 'qty2',
          type: 'float',
          required: false,
          disabled: true,
        },
        {
          width: '180',
          name: 'autoPrint',
          subName: 'autoPrint',
          type: 'checkbox',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Invoice',
          subName: 'invoice',
          type: 'string',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Batch',
          subName: 'batch',
          type: 'string',
          required: true,
          disabled: false,
        },
        {
          width: '180',
          name: 'StavkaPlan',
          subName: 'stavkaPlan',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllStavkaPlan',
        },
        {
          width: '180',
          name: 'Tara',
          subName: 'tara',
          type: 'list',
          required: false,
          disabled: false,
          url: 'findAllTara',
        },
        {
          width: '180',
          name: 'Description',
          subName: 'description',
          type: 'string',
          required: true,
          disabled: false,
        },
        {
          width: '180',
          name: 'Lot',
          subName: 'lot',
          type: 'string',
          required: true,
          disabled: false,
        },
        {
          width: '100',
          widthTwo: '80',
          name: 'Brutto',
          subName: 'brutto',
          subNameTwo: 'bruttoTwo',
          type: 'float',
          required: true,
          disabled: false,
          disabledTwo: true,
          multiple: true,
        },
        {
          width: '180',
          name: 'Stillage',
          subName: 'stillage',
          type: 'string',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Lost Qty',
          subName: 'lostQty',
          type: 'float',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Grade',
          subName: 'grade',
          type: 'list',
          required: false,
          disabled: false,
          url: 'findAllGrade2',
        },
        {
          width: '180',
          name: 'Grade Qty',
          subName: 'gradeQty',
          type: 'float',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Grade Stillage',
          subName: 'gradeStillage',
          type: 'string',
          required: false,
          disabled: false,
        },
        {
          width: '130',
          widthTwo: '50',
          name: 'Packaging',
          subName: 'packaging',
          subNameTwo: 'packagingTwo',
          required: false,
          disabled: false,
          disabledTwo: false,
          type: 'list',
          multiple: true,
          url: 'findAllPackaging',
        },
        {
          width: '180',
          name: 'Subtotal tara',
          subName: 'subTotalTara',
          type: 'float',
          required: false,
          disabled: true,
        },
        {
          type: 'button',
          btnName: 'Quality Control',
          disabled: false,
          btnDifferentiate: 'controlTwo',
        },
        {
          width: '180',
          name: 'AutoPressEnter',
          subName: 'autoPressEnter',
          type: 'checkbox',
          required: false,
          disabled: false,
        },
        {
          width: '180',
          name: 'Total Packs',
          subName: 'totalPacks',
          type: 'float',
          required: false,
          disabled: true,
        },
        {
          width: '180',
          name: 'Total Brutto',
          subName: 'totalBrutto',
          type: 'float',
          required: false,
          disabled: true,
        },
        {
          width: '180',
          name: 'Total tara',
          subName: 'totalTara',
          type: 'float',
          required: false,
          disabled: true,
        },
        {
          width: '180',
          name: 'Total Net',
          subName: 'TotalNet',
          type: 'float',
          required: false,
          disabled: true,
        },
      ],
      boxAdditionalData: [
        {
          widthTwo: '80',
          subNameTwo: 'printBobbinInput',
          type: 'button',
          btnName: 'Print Bobbin',
          multiple: true,
          disabled: false,
          btnDifferentiate: 'printB',
        },
        {
          type: 'button',
          btnName: 'Print',
          disabled: false,
          btnDifferentiate: 'print',
        },
        {
          type: 'button',
          btnName: 'Quality Control',
          disabled: false,
          btnDifferentiate: 'controlOne',
        },
      ],
      isLoading: false,
      pageSize_value: 10,
      keywordValue: '',
      isOpenTable: true,
      isCloseTable: true,
      allLookUpAndInputValues: {},
      stavkaStageFirstData: {},
      stavkaStageSecondData: [],
      drawUIData: [],
      drawGropTotalQty: [],
      drawGropTotalQty2: [],
    }
  },

  // WATCH
  watch: {
    stavkaStageSecondData: {
      handler(newVal) {
        this.drawUIDataAction(newVal)
      },
      deep: true,
    },
  },

  // MOUNTED
  mounted() {
    this.allLookUpAndInputValues.rows = '30'
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

      // function
      key === 'packaging' &&
        this.packagingInfoRequestAction(this.allLookUpAndInputValues?.packaging)
      // function
      key === 'tara' &&
        this.bruttoInputAction(this.allLookUpAndInputValues?.brutto || 0)
      // function
      if (
        key === 'stavkaStage' &&
        value &&
        this.allLookUpAndInputValues?.iplikStavka
      ) {
        this.stavkaStageIdChange(value)
      }
    },

    // Input value'sini olish
    getInputValueAction(key, value, order) {
      this.$set(this.allLookUpAndInputValues, key, value)

      // brutto action
      if (key === 'brutto') this.bruttoInputAction(value)
    },

    // Input value'sini olish
    getCheckBoxValueAction(key, value) {
      this.$set(this.allLookUpAndInputValues, key, value)
    },

    // Date Input value'sini olish
    getInputDateValueAction(key, value, order) {
      this.$set(this.allLookUpAndInputValues, key, value)
    },

    // Stavka Stage change qilinganda ishlaydi
    stavkaStageIdChange(value) {
      this.isLoading = !this.isLoading
      const body = {
        batchNumber: this.allLookUpAndInputValues?.batch || 0,
        stavkaId: this.allLookUpAndInputValues?.iplikStavka,
        stavkaStageId: value,
        year:
          this.allLookUpAndInputValues?.startDate?.split('-')[0] ||
          new Date().getFullYear(),
      }
      this.$axios
        .post(`/invoices/prepareByYearAndBatchNumber`, body)
        .then((res) => {
          this.isLoading = !this.isLoading
          this.stavkaStageFirstData = {
            ...this.stavkaStageFirstData,
            ...res.data,
          }
          // function
          this.changePackageQty(res.data)
          // Brutto input'ga focus qaratish
          document.querySelector('.focusInput').focus()
          // qo'shimcha buttun'larni qo'shish
          this.boxAllData.splice(26, 0, ...this.boxAdditionalData)
        })
        .catch(() => {
          this.isLoading = !this.isLoading
        })
    },

    // Stavka Stage change qilinganda "invoice_id" borligini tekshirib action bajaradi
    changePackageQty(propObj) {
      if (propObj.invoice_id) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/invoices/changePackageQty`, {
            stavkaStageId: propObj?.stavkaStageId,
          })
          .then((res) => {
            this.isLoading = !this.isLoading
            this.stavkaStageSecondData = JSON.parse(res.data?.resultJson)
            // function
            this.secondDataFindValue(this.stavkaStageSecondData)
          })
          .catch(() => {
            this.isLoading = !this.isLoading
          })
      }
    },

    secondDataFindValue(propSecondData) {
      const obj = propSecondData.find((obj) => obj.personName && obj)
      this.stavkaStageFirstData = { ...this.stavkaStageFirstData, ...obj }
      // function
      this.bruttoInputAction(this.allLookUpAndInputValues?.brutto || 0)
    },

    // Packaging change Action
    packagingInfoRequestAction(selectedID) {
      this.$axios
        .post(`/packaging/findPackagingInfoUrl`, {
          id: selectedID,
        })
        .then((res) => {
          this.stavkaStageFirstData = {
            ...this.stavkaStageFirstData,
            ...res?.data,
          }
          this.stavkaStageFirstData.packagingTwo = 20
          // function
          this.bruttoInputAction(this.allLookUpAndInputValues?.brutto || 0)
        })
    },

    // Brutto Calculation Action
    bruttoInputAction(value) {
      const sum = this.stavkaStageFirstData?.sum
        ? parseFloat(this.stavkaStageFirstData?.sum)
        : 0
      const sumOnce = this.stavkaStageFirstData?.sumOnce
        ? parseFloat(this.stavkaStageFirstData?.sumOnce)
        : 0
      const packagingTwo = this.stavkaStageFirstData.packagingTwo
        ? parseFloat(this.stavkaStageFirstData.packagingTwo)
        : 0
      const tara =
        this.allLookUpAndInputValues?.tara ||
        this.stavkaStageFirstData?.taraName
          ? parseFloat(
              this.allLookUpAndInputValues?.tara ||
                this.stavkaStageFirstData?.taraName
            )
          : 0
      const summary = sum * packagingTwo + tara + sumOnce

      this.$set(
        this.stavkaStageFirstData,
        'bruttoTwo',
        parseFloat(value || 0) - summary?.toFixed(2)
      )

      // Sub Total Tara set val
      this.$set(this.stavkaStageFirstData, 'subTotalTara', summary?.toFixed(2))
    },

    // Brutto Enter event action
    getEnterAction(value) {
      if (value) {
        const [day, month, year, time] = this.allLookUpAndInputValues?.startDate
          ? this.allLookUpAndInputValues?.startDate.split(/[-/T]+/)
          : new Date()
              .toISOString()
              .split('.')[0]
              .split(/[-/T]+/)
        const formattedDateStr = `${year}/${month}/${day} ${time}`

        const body = {
          autoPrintToPDF: this.allLookUpAndInputValues?.autoPrint || false,
          batchStr: this.stavkaStageFirstData?.batch || '',
          colorId: this.stavkaStageFirstData?.colorId || '',
          dateTo: formattedDateStr,
          defectStillage: this.allLookUpAndInputValues?.defectStillage || '',
          description: this.stavkaStageFirstData?.invoiceDescription || '',
          employeeId: this.stavkaStageFirstData?.personId || '',
          equipmentId: this.stavkaStageFirstData?.equipmentId || '',
          gradeStillage: this.allLookUpAndInputValues?.gradeStillage || '',
          invoiceId: this.stavkaStageFirstData?.invoice_id || '',
          lot: this.stavkaStageFirstData?.itemLot || '',
          packagingId: this.stavkaStageFirstData?.packagingId || '',
          productBarcode: value || '',
          qty: this.stavkaStageFirstData?.bruttoTwo || '',
          qty2: value || '',
          sequence: this.stavkaStageSecondData.length || '',
          stavkaPlanId: this.stavkaStageFirstData?.stavkaPlanId || '',
          stavkaStageId: this.stavkaStageFirstData?.stavkaStageId || '',
          stillage: this.allLookUpAndInputValues?.stillage || '',
          taraId: this.stavkaStageFirstData?.taraId || '',
          warehouseId: this.stavkaStageFirstData?.warehouseId || '',
        }
        this.$axios.post(`/invoices/readSaveByPackage`, body).then((res) => {
          this.stavkaStageSecondData = JSON.parse(res.data?.itemBarcodes)
        })
      }
    },

    // All data draw UI
    drawUIDataAction(newVal) {
      function chunkArray(array, chunkSize) {
        if (array.length) {
          return array?.reduce((result, item, index) => {
            item.index = index + 1
            const chunkIndex = Math.floor(index / chunkSize)
            if (!result[chunkIndex]) {
              result[chunkIndex] = [] // yangi group array yaratish
            }
            result[chunkIndex].push({
              realQty: `${item?.realQty}`,
              id: `${item?.id}`,
              index: `${item?.index}`,
              qty: `${item?.qty}`,
              qty2: `${item?.qty2}`,
            })
            return result
          }, [])
        }
      }
      this.drawUIData = chunkArray(newVal, this.allLookUpAndInputValues.rows)

      // Qty av Qty2 summasini hisoblash
      this.drawUIData.forEach((arr, index) => {
        let summQty = 0
        let summQty2 = 0
        arr.forEach((obj) => {
          summQty += parseFloat(obj?.qty)
          summQty2 += parseFloat(obj?.qty2)
        })
        this.drawGropTotalQty[index] = summQty?.toFixed(2)
        this.drawGropTotalQty2[index] = summQty2?.toFixed(2)
      })
    },

    // All Buttun action
    clickedBtnAction(propName) {
      if (
        this.allLookUpAndInputValues?.stavkaStage &&
        this.stavkaStageFirstData.itemLot
      ) {
        if (propName === 'printB') {
          alert('Not action')
        } else if (propName === 'print') {
          alert('Not action')
        } else if (propName === 'controlOne') {
          localStorage.setItem(
            'allTrueAndFalseData',
            JSON.stringify({
              packageValue: propName,
              stavkaStageId: this.allLookUpAndInputValues?.stavkaStage,
            })
          )
          window.open('/openControlPageNew.htm', '_blank')
        } else if (propName === 'controlTwo') {
          localStorage.setItem(
            'allTrueAndFalseData',
            JSON.stringify({
              packageValue: propName,
              lot: this.stavkaStageFirstData.itemLot,
            })
          )
          window.open('/openControlPageNew.htm', '_blank')
        }
      }
    },
  },
}
</script>
