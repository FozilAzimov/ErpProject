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
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />

    <!-- Start Popups ================================================== -->
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
          $route.path.includes(
            'prepareOutputToProductionCompanyReturnNew.htm'
          ) ||
          $route.path.includes('prepareInternalInvoiceNew.htm')
        "
        :table-head="filteredTablehead"
        :filtering-modal-payload-data="filteringModalPayloadData"
        @customCloseAction="closeAction"
        @modalDataAction="tableBodyAllDataAction"
      />
      <generic-prepare-filtering-popup
        v-else-if="
          $route.path.includes('prepareIplikLotStavka.htm') &&
          departmentName !== 'orders'
        "
        :tab-name="tabName"
        :head-data="filteredTablehead"
        :filter-type="filterType"
        @customCloseFunction="closeAction"
        @popupEmitAction="popupSelectedTableDataGetAction"
      />
      <GenericInvoiceItemModalPage
        v-else
        :tabledata="filteredTablehead"
        @customCloseAction="closeAction"
        @customInputValueObj="modalAcceptAction"
      />
    </div>
    <!-- End Popups ================================================== -->

    <div
      class="flex items-start overflow-scroll relative z-0 bg-white border-[1px] border-solid border-[rgba(119,136,153,0.3)]"
      :style="`max-height:${height}px`"
      style="min-height: 165px"
    >
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="sticky top-[-1px] z-[1000]">
          <tr class="bg-[rgb(229,235,245)]">
            <th
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
            >
              №
            </th>
            <th
              v-for="(headName, key) in filteredTablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
              :class="headName.width ? `w-[${headName.width}px]` : ''"
            >
              {{ headName.headerText }}
              <pre>{{ headName }}</pre>
            </th>
            <th
              v-if="!showHideRow && !isCanAdd"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
            >
              Delete
            </th>
          </tr>
          <!-- Filter -->
          <tr class="bg-[#fff]">
            <th
              class="border-[1px] text-[12px] p-[1px_3px] text-center font-normal"
            >
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
            </th>
            <th
              v-for="(key, inx) in filteredTablehead"
              :key="inx"
              class="border-[1px] text-[12px] p-[1px_3px] text-center font-normal"
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
                :name="key.name"
                @customFunction="filterAction"
              />
            </th>
          </tr>
          <!-- Filter -->
        </thead>

        <tbody>
          <!-- Save button click qilingandan keyin ko'rinadi -->
          <template v-if="showHideRow || isCanAdd">
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
                  v-for="(obj, indexToo) in filteredTablehead"
                  :key="indexToo"
                  class="border-[1px] text-[12px] p-2"
                >
                  <generic-check-box v-if="obj.type === 'checkbox'" />
                  <span v-else-if="obj.type === 'date'">{{
                    new Date(row?.[obj.name])
                      .toLocaleString('en-GB')
                      .split(',')
                      .join('')
                  }}</span>
                  <img
                    v-else-if="obj.type === 'file_image'"
                    src="@assets/images/no-image.png"
                    class="w-[60px]"
                  />
                  <GenericButton
                    v-else-if="obj.type === 'button'"
                    :name="obj.headerText"
                    :type="`${obj?.param?.split('-')?.at(-1)}`"
                    :order="indexOne"
                  />
                  <span v-else-if="row?.[obj.name] && obj.name === 'ammount'">
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
                        ? row[obj.name]
                        : 0
                    }}
                  </span>
                  <span v-else-if="row[obj.name] && obj.name === 'ammountwvat'">
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
                        ? row[obj.name]
                        : 0
                    }}
                  </span>
                  <span v-else-if="row[obj.name] && obj.name === 'vatAmount'">
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
                        ? row[obj.name]
                        : 0
                    }}
                  </span>
                  <span v-else-if="typeof row?.[obj?.name] === 'object'">{{
                    row?.[obj.name]?.['text']
                  }}</span>
                  <span
                    v-else-if="
                      typeof row[obj?.name] === 'string' &&
                      row[obj?.name]?.includes('style')
                    "
                    v-html="row[obj?.name]"
                  ></span>
                  <span v-else>{{ row[obj.name] }}</span>
                </td>
              </tr>
            </template>
            <tr v-if="noDataRow">
              <td
                :colspan="tableheadlength"
                class="border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
              >
                <div class="flex justify-start">
                  <el-empty
                    :image-size="60"
                    description="No Data"
                    style="padding: 0"
                  >
                    <template #description>
                      <p style="font-size: 13px; margin-top: -10px">No Data</p>
                    </template>
                  </el-empty>
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
                v-for="(obj, indexToo) in filteredTablehead"
                :key="indexToo"
                class="border-1px text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-solid border-[rgba(119,136,153,0.2)]"
              >
                {{ obj.sumColumn && totalObjMap?.[obj.name]?.toFixed(4) }}
              </td>
            </tr>
          </template>

          <!-- Save button click qilinishidan oldin ko'rinadi -->
          <template v-else>
            <tr
              v-for="(innerArr, indexOne) in tableBody"
              :key="indexOne"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ indexOne + 1 }}
              </td>
              <td
                v-for="(obj, indexToo) in innerArr"
                :key="indexToo"
                class="border-[1px] text-[12px] p-2"
                :class="`w-[${obj.dwidth}px]`"
              >
                <generic-look-up
                  v-if="obj.type === 'list'"
                  :defvalue="
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[obj.name]
                      ? newEditObjData?.[indexOne]?.[obj.name]?.text
                      : ''
                  "
                  :durl="obj.durl"
                  dwidth="200"
                  :order="indexOne"
                  :name="obj.name"
                  :result-type="obj.resultType"
                  :required="requiredData?.[indexOne]?.[obj.name]"
                  :popper-append-to-body="true"
                  @customFunction="getLookUpValue"
                />
                <generic-input
                  v-else-if="obj.type === 'float' || obj.type === 'integer'"
                  :value="`${
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[obj.name]
                      ? newEditObjData?.[indexOne]?.[obj.name]
                      : ''
                  }`"
                  width="150"
                  :order="indexOne"
                  type="number"
                  :required="requiredData?.[indexOne]?.[obj.name]"
                  :name="obj.name"
                  @customFunction="getInputValue"
                />
                <generic-input
                  v-else-if="obj.type === 'string'"
                  :value="`${
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[obj.name]
                      ? newEditObjData?.[indexOne]?.[obj.name]
                      : ''
                  }`"
                  width="150"
                  :order="indexOne"
                  :name="obj.name"
                  :required="requiredData?.[indexOne]?.[obj.name]"
                  @customFunction="getInputValue"
                />
                <GenericInputDatePage
                  v-else-if="obj.type === 'date'"
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
                  :name="obj.name"
                  :required="requiredData?.[indexOne]?.[obj.name]"
                  @customFunction="getInputValue"
                />
                <generic-check-box
                  v-else-if="obj.type === 'checkbox'"
                  :order="indexOne"
                  :name="obj.name"
                  :value="
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[obj.name]
                      ? newEditObjData?.[indexOne]?.[obj.name]
                      : ''
                  "
                  @customFunction="getInputValue"
                />
                <GenericButton
                  v-else-if="obj.type === 'button'"
                  :name="obj.headerText"
                  type="primary"
                  :order="indexOne"
                />
                <template
                  v-else-if="obj.type === 'label' && obj.name === 'ammount'"
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
                </template>
                <template
                  v-else-if="obj.type === 'label' && obj.name === 'ammountwvat'"
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
                </template>
                <template
                  v-else-if="obj.type === 'label' && obj.name === 'vatAmount'"
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
                </template>
                <template
                  v-else-if="
                    obj.type === 'label' &&
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[obj.name] &&
                    typeof newEditObjData?.[indexOne]?.[obj.name] === 'object'
                  "
                  >{{ newEditObjData?.[indexOne]?.[obj.name]?.text }}</template
                >
                <template
                  v-else-if="
                    obj?.type === 'label' &&
                    newEditObjData.length &&
                    newEditObjData?.[indexOne]?.[obj.name] &&
                    typeof newEditObjData?.[indexOne]?.[obj.name] !== 'object'
                  "
                >
                  <span
                    v-if="
                      typeof newEditObjData?.[indexOne]?.[obj?.name] ===
                        'string' &&
                      newEditObjData?.[indexOne]?.[obj?.name]?.includes('style')
                    "
                    v-html="newEditObjData?.[indexOne]?.[obj?.name]"
                  ></span>
                  <template v-else>
                    {{ newEditObjData?.[indexOne]?.[obj?.name] }}
                  </template>
                </template>
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <generic-button
                  type="danger"
                  :circle="true"
                  icon-name-attribute="delete"
                  @click="rowDelAction(newEditObjData[indexOne]?.id, indexOne)"
                />
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
                  type="success"
                  icon-name-attribute="circle-plus-outline"
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
import GenericButton from '@generics/GenericButton.vue'
import GenericInvoiceItemModalPage from '@components/GenericInvoiceItemModal/GenericInvoiceItemModalPage.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericInvoiceFilteringModalPage from '@components/GenericInvoiceFilteringModal/GenericInvoiceFilteringModalPage.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericPrepareFilteringPopup from '@generics/GenericPrepareFilteringPopup.vue'

export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericInvoiceItemModalPage,
    GenericInput,
    GenericLookUp,
    GenericInputDatePage,
    LoadingPage,
    GenericInvoiceFilteringModalPage,
    MessageBox,
    GenericCheckBox,
    GenericPrepareFilteringPopup,
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
    isEdit: {
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
    deleteUrlRow: {
      type: String,
      default: '',
    },
    departmentName: {
      type: String,
      default: '',
    },
    tabName: {
      type: String,
      default: '',
    },
    filterType: {
      type: String,
      default: '',
    },
  },

  // DATA
  data() {
    return {
      isLoading: false,
      isOpenModal: false,
      tableBody: [],
      inputValuesObj: {},
      totalArray: [],
      totalObjMap: {},
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
      isCanAdd: this.isEdit,
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
    isEdit(newVal) {
      this.isCanAdd = newVal
    },
    uiShowHide(value) {
      this.tableShowHide = value
      this.showHideRow = value
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
      if (
        this.departmentName === 'production' ||
        this.departmentName === 'orders'
      ) {
        this.ResData = this.ResData.filter((obj) => Object.keys(obj).length > 1)
      } else {
        this.ResData = this.ResData.filter((obj) => Object.keys(obj).length > 8)
      }
      this.twoResData = this.ResData
    },
    // Arrayni bo'sh object dan tozalash

    // GenericLookUp va Input'larning required'larini tekshiradi
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
    // GenericLookUp va Input'larning required'larini tekshiradi

    // static filter
    ResDataFiltered() {
      // this.ResData = this.ResData.filter((obj) => {
      //   if (
      //     'createdDate' in obj ||
      //     'invoiceDate' in obj ||
      //     'updatedDate' in obj
      //   ) {
      //     obj.createdDate = new Date(obj.createdDate)
      //       .toISOString()
      //       .split('.')[0]
      //     obj.invoiceDate = new Date(obj.invoiceDate)
      //       .toISOString()
      //       .split('.')[0]
      //     obj.updatedDate = new Date(obj.updatedDate)
      //       .toISOString()
      //       .split('.')[0]
      //   }
      //   return obj
      // })
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
        } else if (obj[name] && value?.length) {
          this.rowDataShowHide = false
          this.noDataRow = true
          return obj
        } else if (!value?.length) {
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
        this.$set(this.inputValuesObj, key, value)
        this.ResData.push(this.inputValuesObj)
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

    // GenericLookUp's Valuesini olish
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
        this.$set(this.inputValuesObj, name, this.lookUpVal(resultType, value))
        this.ResData.push(this.inputValuesObj)
      }
      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData, order)
    },
    // GenericLookUp's Valuesini olish

    // default set values
    setDefaultValues(order) {
      if (this.departmentName === 'invoice') {
        this.$set(this.inputValuesObj, 'erepairStatus', 'false')
        this.$set(this.inputValuesObj, 'marriage', 'false')
        this.$set(this.inputValuesObj, 'mark', 'false')
        this.$set(this.inputValuesObj, 'waste', 'false')
        this.$set(this.inputValuesObj, 'qtyOfOne', '0')
        this.$set(this.inputValuesObj, 'price4', '0')
        // this.$set(this.inputValuesObj, 'packNumber', order + 1)
        return this.inputValuesObj
      }
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
        ) ||
        this.$route.path.includes('prepareInternalInvoiceNew.htm')
      ) {
        this.isOpenModal = true
      } else {
        if (this.addmodalorrow) {
          this.isOpenModal = true
          this.whichTableName = 'topTable'
        } else {
          this.tableBody.push(this.filteredTablehead)
          this.setDefaultValues()
          this.ResData.push(this.inputValuesObj)
          this.inputValuesObj = {}
        }
        this.showHideRow = false
        this.setIndex()
      }
    },
    // Add an Item

    // Row delete Request
    requestAction(id, index) {
      this.$axios
        .delete(`/${this.deleteUrlRow}`, { data: { deleteItemId: id } })
        .then((res) => {
          this.$notification('Successfully Deleted', 'Deleted', 'success')
          this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
          this.combinationThreeInputValues =
            this.combinationThreeInputValues.filter((obj, inx) => inx !== index)
          this.ResData = this.ResData.filter((row) => row?.id !== id)
          this.newEditObjData = this.ResData
          this.twoResData = this.ResData
          this.inputValuesObj = {}
        })
        .catch((error) => {
          this.$notification('Error Deleted', 'Not Deleted', 'error')
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Message Emit action
    getEmitProp(propMessage, id, index) {
      if (propMessage === 'confirm' && id) {
        this.requestAction(id, index)
      } else if (propMessage === 'confirm') {
        this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
        this.combinationThreeInputValues =
          this.combinationThreeInputValues.filter((obj, inx) => inx !== index)
        this.ResData = this.ResData.filter((row) => row.index !== index + 1)
        this.newEditObjData = this.ResData
        this.twoResData = this.ResData
        this.inputValuesObj = {}
      }
    },

    // row delete action
    rowDelAction(id, index) {
      this.$refs.messageBoxRef.open(id, index)
    },

    // Modal Closeobject
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    // get popUp data
    popupSelectedTableDataGetAction(data, isClose) {
      this.showHideRow = false
      data.forEach((obj) => {
        this.tableBody.push(this.filteredTablehead)
      })
      // set data
      this.ResData = [...this.ResData, ...data]
      this.newEditObjData = this.ResData
      // set data
      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData)
      // total action
      this.ResData.forEach((obj, index) => {
        this.combinationThreeInputValues[index] = {
          qty: parseFloat(obj?.qty),
          unitPrice: parseFloat(obj?.unitPrice),
          cashPrice: parseFloat(obj?.cashPrice),
          vat: parseFloat(obj?.vat),
        }
      })
      // close action clone
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
    },
    // Modal uchun: Accept button bosilganda ishlaydi

    // Save button click qilganda ishlaydi
    getSaveRowAction() {
      if (!this.addmodalorrow) {
        this.ResData.push(this.inputValuesObj)
        this.inputValuesObj = {}
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
            this.$set(this.totalObjMap, name, this.total)
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
