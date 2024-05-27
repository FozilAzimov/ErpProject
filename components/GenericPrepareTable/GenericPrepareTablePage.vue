<template>
  <div>
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <LoadingPage
      v-if="!tableShowHide && helperShowHideRow"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <span>
      <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    </span>
    <div
      v-if="isOpenModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[10000]"
    >
      <generic-invoice-filtering-modal-page
        v-if="
          $route.path.includes('prepareSaleInvoiceNew.htm') ||
          $route.path.includes('prepareSalesReturnNew.htm') ||
          $route.path.includes('prepareProductionInvoiceNew.htm') ||
          $route.path.includes('prepareInputReturnNew.htm') ||
          $route.path.includes('prepareExpenseInvoice.htm') ||
          $route.path.includes('prepareOutputToPrOrder.htm') ||
          $route.path.includes('prepareOutputToEquipment.htm') ||
          $route.path.includes('prepareOutputToPrOrderReturn.htm') ||
          $route.path.includes('prepareOutputToEquipmentReturn.htm') ||
          $route.path.includes('prepareOutputToProductionCompanyNew.htm') ||
          $route.path.includes('prepareOutputToProductionCompanyReturnNew.htm')
        "
        :table-head="filteredTablehead"
        :filtering-modal-payload-data="filteringModalPayloadData"
        @customCloseAction="closeAction"
        @modalDataAction="tableBodyAllDataAction"
      />
      <GenericInvoiceItemModalPage
        v-else
        :tabledata="tablehead"
        :which-table-name="whichTableName"
        @customCloseAction="closeAction"
        @customInputValueObj="modalAcceptAction"
      />
    </div>
    <div
      class="flex items-start overflow-scroll relative z-0 mb-5 bg-white border-[1px] border-solid border-[rgba(119,136,153,0.3)]"
      :style="`max-height:${height}px`"
      style="min-height: 165px"
    >
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)]">
          <tr>
            <th
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2"
            >
              №
            </th>

            <th
              v-for="(headName, key) in filteredTablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 whitespace-nowrap"
              :class="headName.width ? `w-[${headName.width}px]` : ''"
            >
              {{ headName.headerText }}
            </th>
            <th
              v-if="!showHideRow && !isCanAdd"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2"
            >
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Save button click qilingandan keyin ko'rinadi -->
          <template v-if="showHideRow || isCanAdd">
            <tr>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericInput
                  width="50"
                  height="20"
                  pl="8"
                  pr="8"
                  pt="1"
                  pb="1"
                  textsize="11"
                  type="text"
                  name="index"
                  @customFunction="filterAction"
                />
              </td>
              <td
                v-for="(item, inx) in filteredTablehead"
                :key="inx"
                class="border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="150"
                  height="20"
                  pl="8"
                  pr="8"
                  pt="1"
                  pb="1"
                  textsize="11"
                  type="text"
                  :name="item.name"
                  @customFunction="filterAction"
                />
              </td>
            </tr>
            <template v-if="rowDataShowHide">
              <tr
                v-for="(row, indexOne) in twoResData"
                :key="indexOne"
                class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
              >
                <td class="border-[1px] text-[12px] p-2 text-center">
                  {{ indexOne + 1 }}
                </td>
                <td
                  v-for="(item, indexToo) in filteredTablehead"
                  :key="indexToo"
                  class="border-[1px] text-[12px] p-2"
                >
                  <span
                    v-if="
                      row?.[item.name] && typeof row?.[item.name] === 'object'
                    "
                    >{{ row?.[item.name]?.['text'] }}</span
                  >
                  <span v-else-if="row?.[item.name] && item.type === 'date'">{{
                    new Date(row?.[item.name])
                      .toLocaleString('en-GB')
                      .split(',')
                      .join('')
                  }}</span>
                  <img
                    v-else-if="item.type === 'file_image'"
                    src="../../assets/images/no-image.png"
                    class="w-[60px]"
                  />
                  <span v-else-if="item.type === 'checkbox'">{{
                    row?.[item.name]
                  }}</span>
                  <GenericButton
                    v-else-if="item.type === 'button'"
                    :name="item.headerText"
                    pl="10"
                    pt="3"
                    pr="10"
                    pb="3"
                    :order="indexOne"
                    bg="rgb(156,104,183)"
                    textsize="12"
                  />
                  <span v-else-if="row?.[item.name] && item.name === 'ammount'">
                    {{
                      combinationThreeInputValues.length &&
                      Boolean(
                        (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          ((combinationThreeInputValues[indexOne]?.unitPrice ??
                            0) +
                            (combinationThreeInputValues[indexOne]?.cashPrice ??
                              0))
                      ) &&
                      combinationThreeInputValues[indexOne]?.vat
                        ? (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                            ((combinationThreeInputValues[indexOne]
                              ?.unitPrice ?? 0) +
                              (combinationThreeInputValues[indexOne]
                                ?.cashPrice ?? 0)) +
                          ((combinationThreeInputValues[indexOne]?.qty ?? 0) *
                            (combinationThreeInputValues[indexOne]?.unitPrice ??
                              0) *
                            (combinationThreeInputValues[indexOne]?.vat ?? 0)) /
                            100
                        : combinationThreeInputValues.length &&
                          Boolean(
                            (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                              ((combinationThreeInputValues[indexOne]
                                ?.unitPrice ?? 0) +
                                (combinationThreeInputValues[indexOne]
                                  ?.cashPrice ?? 0))
                          )
                        ? (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          (combinationThreeInputValues[indexOne]?.unitPrice ??
                            0)
                        : isCanAdd
                        ? row[item.name]
                        : 0
                    }}
                  </span>
                  <span
                    v-else-if="row[item.name] && item.name === 'ammountwvat'"
                  >
                    {{
                      combinationThreeInputValues.length &&
                      Boolean(
                        (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          (combinationThreeInputValues[indexOne]?.unitPrice ??
                            0)
                      )
                        ? (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          (combinationThreeInputValues[indexOne]?.unitPrice ??
                            0)
                        : isCanAdd
                        ? row[item.name]
                        : 0
                    }}
                  </span>
                  <span v-else-if="row[item.name] && item.name === 'vatAmount'">
                    {{
                      combinationThreeInputValues.length &&
                      Boolean(
                        (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          (combinationThreeInputValues[indexOne]?.unitPrice ??
                            0) *
                          (combinationThreeInputValues[indexOne]?.vat ?? 0)
                      )
                        ? ((combinationThreeInputValues[indexOne]?.qty ?? 0) *
                            (combinationThreeInputValues[indexOne]?.unitPrice ??
                              0) *
                            (combinationThreeInputValues[indexOne]?.vat ?? 0)) /
                          100
                        : isCanAdd
                        ? row[item.name]
                        : 0
                    }}
                  </span>
                  <span v-else>{{ row[item.name] }}</span>
                </td>
              </tr>
            </template>
            <tr v-if="noDataRow">
              <td
                :colspan="tableheadlength"
                class="text-center border-[1px] border-solid border-[#F0F0F0] text-[12px] p-2"
              >
                <div
                  class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
                >
                  <span class="flex flex-col items-center">
                    <img
                      src="../../assets/icons/no-data.png"
                      alt="no-data-icons"
                    />
                    No data
                  </span>
                </div>
              </td>
            </tr>
            <tr v-else class="bg-[rgb(229,235,245)]">
              <td
                class="border-1px text-[13px] p-3 text-[rgba(0,0,0,0.7)] border-[1px] border-solid border-[rgba(119,136,153,0.2)]"
              >
                Total
              </td>
              <td
                v-for="(item, indexToo) in filteredTablehead"
                :key="indexToo"
                class="border-1px text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-solid border-[rgba(119,136,153,0.2)]"
              >
                {{ item.sumColumn && totalObjMap.get(item.name)?.toFixed(4) }}
              </td>
            </tr>
          </template>

          <!-- Save button click qilinishidan oldin ko'rinadi -->
          <template v-else>
            <tr
              v-for="(item, indexOne) in tableBody"
              :key="indexOne"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ indexOne + 1 }}
              </td>
              <td
                v-for="(value, indexToo) in item"
                :key="indexToo"
                class="border-[1px] text-[12px] p-2"
                :class="`w-[${value.dwidth}px]`"
              >
                <LookUp
                  v-if="value.type === 'list'"
                  :defvalue="
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[value.name]
                      ? newEditObjData?.[indexOne]?.[value.name]?.text
                      : ''
                  "
                  :durl="`${
                    value?.durl === 'findAllEquipments'
                      ? 'productionReports'
                      : 'invoiceBase'
                  }/${value.durl}`"
                  dwidth="200"
                  :order="indexOne"
                  :name="value.name"
                  :result-type="value.resultType"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  @customFunction="getLookUpValue"
                />
                <GenericInput
                  v-else-if="value.type === 'float' || value.type === 'integer'"
                  :value="
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[value.name]
                      ? newEditObjData?.[indexOne]?.[value.name]
                      : ''
                  "
                  width="150"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="2"
                  pb="2"
                  :order="indexOne"
                  textsize="13"
                  type="number"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  :name="value.name"
                  @customFunction="getInputValue"
                />
                <GenericInput
                  v-else-if="value.type === 'string'"
                  :value="
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[value.name]
                      ? newEditObjData?.[indexOne]?.[value.name]
                      : ''
                  "
                  width="150"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="2"
                  pb="2"
                  :order="indexOne"
                  textsize="13"
                  type="text"
                  :name="value.name"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  @customFunction="getInputValue"
                />
                <GenericInputDatePage
                  v-else-if="value.type === 'date'"
                  width="200"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="1"
                  pb="1"
                  :order="indexOne"
                  textsize="13"
                  type="datetime-local"
                  :value="
                    newEditObjData[indexOne]?.updatedDate &&
                    new Date(newEditObjData?.[indexOne]?.updatedDate)
                      .toISOString()
                      .split('.')[0]
                  "
                  valuecolor="rgba(0,0,0,0.7)"
                  :name="value.name"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  @customFunction="getInputValue"
                />
                <GenericInput
                  v-else-if="value.type === 'checkbox'"
                  type="checkbox"
                  :order="indexOne"
                  :name="value.name"
                  :value="
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[value.name]
                      ? newEditObjData?.[indexOne]?.[value.name]
                      : ''
                  "
                  @customFunction="getInputValue"
                />
                <GenericButton
                  v-else-if="value.type === 'button'"
                  :name="value.headerText"
                  pl="10"
                  pt="3"
                  pr="10"
                  pb="3"
                  :order="indexOne"
                  bg="rgb(156,104,183)"
                  textsize="12"
                />
                <span
                  v-else-if="value.type === 'label' && value.name === 'ammount'"
                >
                  {{
                    combinationThreeInputValues.length &&
                    Boolean(
                      (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                        ((combinationThreeInputValues[indexOne]?.unitPrice ??
                          0) +
                          (combinationThreeInputValues[indexOne]?.cashPrice ??
                            0))
                    ) &&
                    combinationThreeInputValues[indexOne]?.vat
                      ? (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          ((combinationThreeInputValues[indexOne]?.unitPrice ??
                            0) +
                            (combinationThreeInputValues[indexOne]?.cashPrice ??
                              0)) +
                        ((combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          (combinationThreeInputValues[indexOne]?.unitPrice ??
                            0) *
                          (combinationThreeInputValues[indexOne]?.vat ?? 0)) /
                          100
                      : combinationThreeInputValues.length &&
                        Boolean(
                          (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                            ((combinationThreeInputValues[indexOne]
                              ?.unitPrice ?? 0) +
                              (combinationThreeInputValues[indexOne]
                                ?.cashPrice ?? 0))
                        )
                      ? (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                        (combinationThreeInputValues[indexOne]?.unitPrice ?? 0)
                      : 0
                  }}
                </span>
                <span
                  v-else-if="
                    value.type === 'label' && value.name === 'ammountwvat'
                  "
                >
                  {{
                    combinationThreeInputValues.length &&
                    Boolean(
                      (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                        (combinationThreeInputValues[indexOne]?.unitPrice ?? 0)
                    )
                      ? (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                        (combinationThreeInputValues[indexOne]?.unitPrice ?? 0)
                      : 0
                  }}
                </span>
                <span
                  v-else-if="
                    value.type === 'label' && value.name === 'vatAmount'
                  "
                >
                  {{
                    combinationThreeInputValues.length &&
                    Boolean(
                      (combinationThreeInputValues[indexOne]?.qty ?? 0) *
                        (combinationThreeInputValues[indexOne]?.unitPrice ??
                          0) *
                        (combinationThreeInputValues[indexOne]?.vat ?? 0)
                    )
                      ? ((combinationThreeInputValues[indexOne]?.qty ?? 0) *
                          (combinationThreeInputValues[indexOne]?.unitPrice ??
                            0) *
                          (combinationThreeInputValues[indexOne]?.vat ?? 0)) /
                        100
                      : 0
                  }}
                </span>
                <span
                  v-else-if="
                    value.type === 'label' &&
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[value.name] &&
                    typeof newEditObjData?.[indexOne]?.[value.name] === 'object'
                  "
                  >{{ newEditObjData?.[indexOne]?.[value.name]?.text }}</span
                >
                <span
                  v-else-if="
                    value?.type === 'label' &&
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[value.name] &&
                    typeof newEditObjData?.[indexOne]?.[value.name] !== 'object'
                  "
                  >{{ newEditObjData?.[indexOne]?.[value.name] }}</span
                >
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <span
                  class="flex justify-center active:scale-[1.2] duration-[0.2s]"
                >
                  <img
                    :src="img.del"
                    alt="delete"
                    class="w-[18px] cursor-pointer"
                    @click="
                      rowDelAction(indexOne, newEditObjData[indexOne]?.id)
                    "
                  />
                </span>
              </td>
            </tr>
          </template>

          <!-- AddAnItem button -->
          <tr v-if="!showHideRow && !isCanAdd">
            <td
              :colspan="tableheadlength"
              class="text-center border-[1px] border-solid border-[#F0F0F0] text-[12px] py-3"
            >
              <div
                class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
              >
                <GenericButton
                  name="Add an Item"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  bg="rgb(119,191,120)"
                  textsize="14"
                  :url="img.plus"
                  :istherepicture="true"
                  @click="addAnItemAction"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import icons
import plus from '../../assets/icons/plus.png'
import del from '../../assets/icons/delete-button.png'

// import components
import GenericButton from '../Button/GenericButton.vue'
import GenericInvoiceItemModalPage from '../GenericInvoiceItemModal/GenericInvoiceItemModalPage.vue'
import GenericInput from '../Input/GenericInput.vue'
import LookUp from '../Lookup/LookUp.vue'
import GenericInputDatePage from '../InputDate/GenericInputDatePage.vue'
import LoadingPage from '../Loading/LoadingPage.vue'
import GenericInvoiceFilteringModalPage from '../GenericInvoiceFilteringModal/GenericInvoiceFilteringModalPage.vue'
import MessageBox from '../MessageBox.vue'

export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericInvoiceItemModalPage,
    LookUp,
    GenericInput,
    GenericInputDatePage,
    LoadingPage,
    GenericInvoiceFilteringModalPage,
    MessageBox,
  },

  // PROPS
  props: {
    tablehead: {
      type: Array,
      default: () => [],
    },
    responseData: {
      type: Array,
      default: () => [],
    },
    uiShowHide: {
      type: Boolean,
      default: false,
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    addmodalorrow: {
      type: Boolean,
      default: true,
    },
    isedit: {
      type: Boolean,
      default: false,
    },
    defaultValues: {
      type: Array,
      default: () => [],
    },
    filteringModalPayloadData: {
      type: Object,
      default: () => ({}),
    },
  },

  // DATA
  data() {
    return {
      img: {
        plus,
        del,
      },
      isLoading: false,
      isOpenModal: false,
      tableBody: [],
      inputValuesObj: new Map(),
      totalArray: [],
      totalObjMap: new Map(),
      sumColumnArr: [],
      total: 0,
      showHideRow: false,
      helperShowHideRow: false,
      rowDataShowHide: true,
      noDataRow: false,
      newEditObjData: [],
      whichTableName: '',
      ResData: [],
      twoResData: [],
      isCanAdd: this.isedit,
      combinationThreeInputValues: [],
      parentID: null,
      tableShowHide: false,
      requiredData: [],
      disabledButtun: false,
    }
  },

  // COMPUTED
  computed: {
    filteredTablehead() {
      return this.tablehead.filter((headName) => headName.showUI)
    },
  },

  // WATCH
  watch: {
    isedit(newVal) {
      this.isCanAdd = newVal
    },
    uiShowHide(value) {
      this.tableShowHide = value
      this.showHideRow = this.tableShowHide
    },
    defaultValues(newVal) {
      this.ResData = newVal
      this.isCanAdd && (this.twoResData = this.ResData)
      this.totalAction()
      this.setIndex()
    },
    responseData(newResData) {
      this.ResData = newResData
      this.twoResData = this.ResData
      this.totalAction()
      this.setIndex()
      this.twoResData.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
    },
    ResData(val) {
      this.requiredLookUpAndInputCheckerAction(val)
    },
  },

  // MOUNTED
  mounted() {
    // Close modal when clicking outside of it
    window.addEventListener('click', this.closeModalOutside)
  },

  // BeforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.closeModalOutside)
  },

  // METHODS
  methods: {
    // GenericInvoiceFilteringModal show hide action
    closeModalOutside(event) {
      if (event.target.classList.contains('bg-gray-900')) {
        this.isOpenModal = false
      }
    },
    // GenericInvoiceFilteringModal show hide action

    // ID orqali filterlash uchun
    setIndex() {
      this.ResData.forEach((obj, i) => (obj.index = i + 1))
    },
    // ID orqali filterlash uchun

    // Arrayni bo'sh object dan tozalash
    arrayFiltered() {
      this.ResData = this.ResData.filter((obj) => Object.keys(obj).length > 8)
    },
    // Arrayni bo'sh object dan tozalash

    // LookUp va Input'larning required'larini tekshiradi
    requiredLookUpAndInputCheckerAction(data) {
      const arr = this.filteredTablehead.filter(
        (obj) =>
          obj.required &&
          (obj.type === 'list' || obj.type === 'float' || obj.type === 'date')
      )

      arr.forEach((obj) => {
        data.forEach((subObj, index) => {
          if (subObj?.[obj.name] && this.requiredData[index])
            this.requiredData[index][obj.name] = true
          else if (subObj?.[obj.name] && !this.requiredData[index])
            this.requiredData.push({ [obj.name]: true })
          else if (!subObj?.[obj.name] && this.requiredData[index])
            this.requiredData[index][obj.name] = false
          else this.requiredData.push({ [obj.name]: false })
        })
      })

      this.requiredData = this.requiredData.splice(0, this.tableBody.length)
      this.disabledButton = this.requiredData.find((obj) =>
        Object.values(obj).includes(false)
      )
      if (this.disabledButton) this.disabledButton = true
      else this.disabledButton = false
      this.$emit('requiredAction', this.disabledButton, 'top')
    },
    // LookUp va Input'larning required'larini tekshiradi

    // static filter
    ResDataFiltered() {
      this.ResData = this.ResData.filter((obj) => {
        if (
          'createdDate' in obj ||
          'invoiceDate' in obj ||
          'updatedDate' in obj
        ) {
          obj.createdDate = new Date(obj.createdDate)
            .toISOString()
            .split('.')[0]
          obj.invoiceDate = new Date(obj.invoiceDate)
            .toISOString()
            .split('.')[0]
          obj.updatedDate = new Date(obj.updatedDate)
            .toISOString()
            .split('.')[0]
        }
        return obj
      })
      if (this.ResData.length) {
        this.ResData.forEach((obj) => {
          for (const key in obj) {
            if (obj[key] === '' || obj[key] === ' ') {
              delete obj[key]
            }
          }
        })
        this.ResData.forEach((obj) => {
          for (const key in obj) {
            if (
              (key === 'warehouse' && obj[key]) ||
              (key === 'invoice' && obj[key]) ||
              (key === 'entryRef' && obj[key]) ||
              (key === 'returnRef' && obj[key])
            ) {
              obj[key] = { id: obj[key] }
            }
          }
        })
      }
    },
    // static filter

    // Save action dan keyin filter qiluvchi input funksiyasi
    filterAction(name, value) {
      // eslint-disable-next-line array-callback-return
      this.twoResData = this.ResData.filter((obj) => {
        if (obj[name]) {
          this.rowDataShowHide = true
          this.noDataRow = false
          if (typeof obj[name] === 'number') {
            if (String(obj[name]).includes(String(value))) return obj
          } else if (String(obj[name].text).includes(String(value))) return obj
        } else if (obj[name] && value.length) {
          this.rowDataShowHide = false
          this.noDataRow = true
          return obj
        } else if (!value.length) {
          this.rowDataShowHide = true
          this.noDataRow = false
          return obj
        }
      })
      this.twoResData.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
      this.total = 0
      this.totalAction()
    },

    // input's Valuesini olish
    getInputValue(key, value, order) {
      this.setDefaultValues(order)
      if (this.ResData[order] && !this.newEditObjData.length) {
        this.ResData[order][key] = value
      } else if (this.ResData[order] && this.newEditObjData.length) {
        this.ResData[order][key] = value
      } else {
        this.inputValuesObj.set(key, value)
        this.ResData.push(Object.fromEntries(this.inputValuesObj))
      }
      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData, order)
      // function
      if (
        key === 'qty' ||
        key === 'unitPrice' ||
        key === 'cashPrice' ||
        key === 'vat'
      ) {
        if (this.combinationThreeInputValues[order])
          this.$set(this.combinationThreeInputValues[order], key, Number(value))
        else
          this.$set(this.combinationThreeInputValues, order, {
            [key]: Number(value),
          })
      }
    },
    // input's Valuesini olish

    // Lookup's Valuesini olish
    lookUpVal(resultType, value) {
      return resultType === 'object' ? { id: Number(value) } : value
    },
    getLookUpValue(name, value, order, resultType) {
      this.setDefaultValues(order)
      if (this.ResData[order] && !this.newEditObjData.length) {
        this.ResData[order][name] = this.lookUpVal(resultType, value)
      } else if (this.ResData[order] && this.newEditObjData.length) {
        this.ResData[order][name] = this.lookUpVal(resultType, value)
      } else {
        this.inputValuesObj.set(name, this.lookUpVal(resultType, value))
        this.ResData.push(Object.fromEntries(this.inputValuesObj))
      }
      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData, order)
    },
    // Lookup's Valuesini olish

    // default set values
    setDefaultValues(order) {
      this.inputValuesObj.set('erepairStatus', 'false')
      this.inputValuesObj.set('marriage', 'false')
      this.inputValuesObj.set('mark', 'false')
      this.inputValuesObj.set('waste', 'false')
      this.inputValuesObj.set('qtyOfOne', '0')
      this.inputValuesObj.set('price4', '0')
      // this.inputValuesObj.set('packNumber', order + 1)
      return this.inputValuesObj
    },
    // default set values

    // Add an Item
    addAnItemAction() {
      if (
        this.$route.path.includes('prepareSaleInvoiceNew.htm') ||
        this.$route.path.includes('prepareSalesReturnNew.htm') ||
        this.$route.path.includes('prepareProductionInvoiceNew.htm') ||
        this.$route.path.includes('prepareInputReturnNew.htm') ||
        this.$route.path.includes('prepareExpenseInvoice.htm') ||
        this.$route.path.includes('prepareOutputToPrOrder.htm') ||
        this.$route.path.includes('prepareOutputToEquipment.htm') ||
        this.$route.path.includes('prepareOutputToPrOrderReturn.htm') ||
        this.$route.path.includes('prepareOutputToEquipmentReturn.htm') ||
        this.$route.path.includes('prepareOutputToProductionCompanyNew.htm') ||
        this.$route.path.includes(
          'prepareOutputToProductionCompanyReturnNew.htm'
        )
      ) {
        this.isOpenModal = true
      } else {
        if (this.addmodalorrow) {
          this.isOpenModal = true
          this.whichTableName = 'topTable'
        } else {
          this.tableBody.push(this.filteredTablehead)
          this.setDefaultValues()
          const requestObj = Object.fromEntries(this.inputValuesObj)
          this.ResData.push(requestObj)
          this.inputValuesObj.clear()
        }
        this.showHideRow = false
        this.setIndex()
      }
    },
    // Add an Item

    // Row delete Request
    requestAction(id) {
      this.$axios
        .post(
          `/invoice/prepareCreateEditPurchaseInvoiceEx`,
          { deleteItemId: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {})
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    getEmitProp(propMessage, id, index) {
      if (propMessage === 'confirm') {
        this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
        this.combinationThreeInputValues =
          this.combinationThreeInputValues.filter((obj, inx) => inx !== index)
        id
          ? (this.ResData = this.ResData.filter((row) => row?.id !== id))
          : (this.ResData = this.ResData.filter(
              (row) => row.index !== index + 1
            ))
        id && this.requestAction(id)
        this.newEditObjData = this.ResData
        this.twoResData = this.ResData
        this.inputValuesObj.clear()
      }
    },

    // row delete action
    rowDelAction(index, id) {
      this.$refs.messageBoxRef.open(id, index)
    },

    // Modal Closeobject
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    // Modal uchun: Accept button bosilganda ishlaydi
    modalAcceptAction(objBack) {
      this.showHideRow = false
      this.tableBody.push(this.filteredTablehead)
      this.ResData.push(objBack)
      this.newEditObjData = this.ResData

      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData)

      // this.ResData.forEach((obj, index) => {
      //   this.combinationThreeInputValues[index] = {
      //     qty: parseFloat(obj?.qty),
      //     unitPrice: parseFloat(obj?.unitPrice),
      //     cashPrice: parseFloat(obj?.cashPrice),
      //     vat: parseFloat(obj?.vat),
      //   }
      // })
    },
    // Modal uchun: Accept button bosilganda ishlaydi

    // Save button click qilganda ishlaydi
    getSaveRowAction() {
      if (!this.addmodalorrow) {
        const requestObj = Object.fromEntries(this.inputValuesObj)
        this.ResData.push(requestObj)
        this.inputValuesObj.clear()
      }
      this.showHideRow = this.tableShowHide
      this.helperShowHideRow = true

      // ==================================
      this.arrayFiltered()
      this.ResDataFiltered()

      this.$emit(
        'rowValues',
        this.ResData,
        this.helperShowHideRow,
        this.parentID
      )
      // Total row ko'rinishini xal qiladi
      this.totalAction()
      this.twoResData.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
      // ==================================
    },

    // Edit button click qilganda ishlaydi
    getEditRowAction(id) {
      this.showHideRow = false
      this.helperShowHideRow = false
      this.newEditObjData = this.ResData

      if (this.isCanAdd) {
        this.parentID = id
        if (this.addmodalorrow) {
          this.setIndex()
          for (let i = 0; i < this.newEditObjData.length; i++) {
            this.tableBody.push(this.filteredTablehead)
          }
        } else {
          for (let i = 0; i < this.newEditObjData.length - 1; i++) {
            this.tableBody.push(this.filteredTablehead)
          }
        }
        this.addAnItemAction()
        this.isOpenModal = false
        this.combinationThreeInputValues = this.newEditObjData
        this.isCanAdd = false
      }
    },

    // new list dispatch
    getNewList() {
      this.$emit('getNewList', this.twoResData)
    },
    // new list dispatch

    // Total hisoblavchi function start
    totalAction() {
      this.filteredTablehead.forEach((headName) => {
        headName.sumColumn && this.sumColumnArr.push(headName.name)
      })
      this.sumColumnArr.forEach((name) => {
        this.twoResData.forEach((obj) => {
          if (name in obj) {
            this.total += Number(obj[name])
            this.totalObjMap.set(name, this.total)
          }
        })
        this.total = 0
      })
    },
    // Total hisoblavchi function end

    tableBodyAllDataAction(tableBodyAllData) {
      this.showHideRow = false
      tableBodyAllData.forEach((obj) => {
        this.tableBody.push(this.filteredTablehead)
      })

      this.ResData = [...this.ResData, ...tableBodyAllData]
      this.newEditObjData = this.ResData

      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData)

      this.ResData.forEach((obj, index) => {
        this.combinationThreeInputValues[index] = {
          qty: parseFloat(obj?.qty),
          unitPrice: parseFloat(obj?.unitPrice),
          cashPrice: parseFloat(obj?.cashPrice),
          vat: parseFloat(obj?.vat),
        }
      })
    },
  },
}
</script>
