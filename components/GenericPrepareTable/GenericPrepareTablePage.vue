<template>
  <div>
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
      <!-- Filtering Prepare PopUp -->
      <generic-prepare-filtering-popup
        v-if="
          ($route.path.includes('prepareIplikLotStavka.htm') ||
            $route.path.includes('prepareSalesReturnNew.htm') ||
            $route.path.includes('prepareInputReturnNew.htm') ||
            $route.path.includes('prepareSaleInvoiceNew.htm') ||
            $route.path.includes('prepareExpenseInvoice.htm') ||
            $route.path.includes('prepareOutputToProductionCompanyNew.htm') ||
            $route.path.includes('prepareInputFromProductionCompanyNew.htm') ||
            $route.path.includes('prepareProductionInvoiceNew.htm') ||
            $route.path.includes('prepareOutputToPrOrder.htm') ||
            $route.path.includes('prepareOutputToEquipment.htm') ||
            $route.path.includes('prepareOutputToPrOrderReturn.htm') ||
            $route.path.includes('prepareOutputToEquipmentReturn.htm') ||
            $route.path.includes(
              'prepareOutputToProductionCompanyReturnNew.htm'
            ) ||
            $route.path.includes('prepareInternalInvoiceNew.htm')) &&
          departmentName !== 'orders'
        "
        :tab-name="tabName"
        :action-url="actionUrl"
        :head-data="filteredTableHeadData"
        :top-static-table-data="topStaticTableData"
        :filter-type="filterType"
        @customCloseFunction="closeAction"
        @filterPopupEmitAction="filterPopupSelectedTableDataGetAction"
      />

      <!-- Prepare PopUp -->
      <generic-prepare-popup
        v-else
        :head-data="filteredTableHeadData"
        @customCloseFunction="closeAction"
        @popupEmitAction="popupDataGetAction"
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
              v-for="(obj, key) in filteredTableHeadData"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 whitespace-nowrap"
              :style="{
                width: obj.dwidth ? `${obj.dwidth}px` : '100px',
                cursor: showHideRow || isCanAdd ? 'pointer' : 'text',
              }"
              @click="sortedRowAction(obj.name)"
            >
              {{ GET_CORE_STRING?.[obj.name] || obj.headerText }}
              <!-- <pre>{{ obj }}</pre> -->
            </th>
            <th
              v-if="!showHideRow && !isCanAdd"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
            >
              {{ GET_CORE_STRING?.delete || 'Delete' }}
            </th>
          </tr>
          <!-- Filter -->
          <tr v-if="showHideRow || isCanAdd" class="bg-[#fff]">
            <th
              class="border-[1px] text-[12px] p-[1px_3px] text-center font-normal"
            >
              <GenericInput
                width="50"
                name="index"
                :clearable="false"
                :placeholder="GET_CORE_STRING?.filter || 'filtering'"
                @customFunction="filterAction"
              />
            </th>
            <th
              v-for="(key, inx) in filteredTableHeadData"
              :key="inx"
              class="border-[1px] text-[12px] p-[1px_3px] text-center font-normal"
            >
              <GenericInput
                width="150"
                :name="key?.name"
                :placeholder="GET_CORE_STRING?.filter || 'filtering'"
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
                v-for="(row, index) in sortedData"
                :key="index"
                class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] hover:bg-[#eef3fa] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-transparent transition-all duration-300 ease-in-out"
              >
                <td class="border-[1px] text-[12px] p-2 text-center">
                  {{ index + 1 }}
                </td>
                <td
                  v-for="(obj, innerIndex) in filteredTableHeadData"
                  :key="innerIndex"
                  class="border-[1px] text-[12px] p-2"
                >
                  <generic-check-box
                    v-if="obj.type === 'checkbox'"
                    :default-value="row?.[obj?.name] || false"
                    disabled
                  />
                  <template
                    v-else-if="obj.type === 'date' && row?.[obj?.name]"
                    >{{ $formatDate(row[obj.name]) }}</template
                  >
                  <img
                    v-else-if="obj.type === 'file_image'"
                    src="@assets/images/no-image.png"
                    class="w-[60px]"
                  />
                  <GenericButton
                    v-else-if="obj.type === 'button'"
                    :name="obj.headerText"
                    :type="`${obj?.param?.split('-')?.at(-1)}`"
                    :order="index"
                  />
                  <span
                    v-else-if="
                      row?.[obj?.name] &&
                      typeof row[obj.name] === 'string' &&
                      row[obj.name]?.includes('style')
                    "
                    v-html="row[obj.name]"
                  ></span>
                  <template v-else-if="typeof row?.[obj?.name] === 'object'">{{
                    row[obj.name]?.text
                  }}</template>
                  <template v-else>{{ row?.[obj?.name] }}</template>
                </td>
              </tr>
            </template>
            <tr v-if="noDataRow" class="bg-[rgb(229,235,245)]">
              <td
                class="border-1px text-[13px] p-3 text-[rgba(0,0,0,0.7)] border-[1px] border-solid border-[rgba(119,136,153,0.2)]"
              >
                Total
              </td>
              <td
                v-for="(obj, innerIndex) in filteredTableHeadData"
                :key="innerIndex"
                class="border-1px text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-solid border-[rgba(119,136,153,0.2)]"
              >
                {{ obj.sumColumn && $formatNumber(totalObj?.[obj.name], 3) }}
              </td>
            </tr>
            <tr v-else>
              <td
                :colspan="tableheadlength"
                class="border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
              >
                <div class="flex justify-start">
                  <el-empty
                    :image-size="40"
                    description="No Data"
                    style="padding: 0"
                  >
                    <template #description>
                      <p
                        style="
                          font-size: 10px;
                          margin-top: -17px;
                          color: #cccdd0;
                        "
                      >
                        {{
                          GET_CORE_STRING?.NoDataAvailableInTable || 'No data'
                        }}
                      </p>
                    </template>
                  </el-empty>
                </div>
              </td>
            </tr>
          </template>

          <!-- Save button click qilinishidan oldin ko'rinadi -->
          <template v-else>
            <tr
              v-for="(innerArr, index) in tableBody"
              :key="index"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] hover:bg-[#eef3fa] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-transparent transition-all duration-300 ease-in-out"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ index + 1 }}
              </td>
              <td
                v-for="(obj, innerIndex) in innerArr"
                :key="innerIndex"
                class="border-[1px] text-[12px] p-2"
                :class="`w-[${obj.dwidth}px]`"
              >
                <generic-look-up
                  v-if="obj?.type === 'list'"
                  :defvalue="
                    tableList?.[index] && tableList[index]?.[obj.name]
                      ? tableList[index][obj.name].text
                      : ''
                  "
                  :durl="obj?.durl"
                  dwidth="200"
                  :order="index"
                  :name="obj.name"
                  :result-type="obj.resultType"
                  :is-look-up-obj="
                    obj.name === 'item' ||
                    obj.name === 'cashbox' ||
                    obj.name === 'bankBranchAccount'
                  "
                  :required="
                    !!(
                      !obj?.required ||
                      (tableList[index]?.[obj?.name]?.id ??
                        tableList[index]?.[obj?.name])
                    )
                  "
                  :popper-append-to-body="true"
                  @customFunction="setLookUpAndInputValue"
                />
                <generic-input
                  v-else-if="
                    obj.type === 'string' ||
                    obj.type === 'float' ||
                    obj.type === 'integer' ||
                    obj.name === 'unitPrice' ||
                    obj.name === 'cost_price' ||
                    obj.name === 'cashPrice' ||
                    obj.name === 'vat'
                  "
                  :value="`${
                    tableList?.[index]
                      ? tableList[index]?.[obj?.name] ?? ''
                      : ''
                  }`"
                  width="150"
                  :order="index"
                  :type="
                    obj?.type === 'hidden' ||
                    obj.type === 'float' ||
                    obj.type === 'integer'
                      ? 'number'
                      : obj?.type
                  "
                  :required="
                    !!(
                      !obj?.required ||
                      obj?.type === 'hidden' ||
                      obj?.type === 'label' ||
                      tableList[index]?.[obj?.name] ||
                      tableList[index]?.[obj?.name] === 0 ||
                      tableList[index]?.[obj?.name] === '0'
                    )
                  "
                  :name="obj?.name"
                  @customFunction="setLookUpAndInputValue"
                />
                <generic-date-time-picker
                  v-else-if="obj.type === 'date'"
                  :order="index"
                  :name="obj.name"
                  :value="
                    tableList?.[index] && tableList[index]?.[obj?.name]
                      ? $formatDate(tableList[index][obj.name])
                      : ''
                  "
                  :required="
                    !!(!obj?.required || tableList[index]?.[obj?.name])
                  "
                  @customFunction="setLookUpAndInputValue"
                />
                <generic-check-box
                  v-else-if="obj.type === 'checkbox'"
                  :order="index"
                  :name="obj.name"
                  :default-value="
                    tableList?.[index] &&
                    tableList[index]?.[obj.name] &&
                    JSON.parse(tableList[index][obj.name])
                      ? JSON.parse(tableList[index][obj.name])
                      : false
                  "
                  @customFunction="setLookUpAndInputValue"
                />
                <GenericButton
                  v-else-if="obj.type === 'button'"
                  :name="obj.headerText"
                  type="primary"
                  :order="index"
                />
                <template
                  v-else-if="
                    tableList?.[index] && tableList?.[index]?.[obj?.name]
                  "
                >
                  <span
                    v-if="
                      typeof tableList[index][obj.name] === 'string' &&
                      tableList[index][obj.name]?.includes('style')
                    "
                    v-html="tableList[index][obj.name]"
                  ></span>
                  <template v-else>
                    {{
                      tableList[index][obj.name]?.text ??
                      tableList[index][obj.name] ??
                      ''
                    }}
                  </template>
                </template>
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <generic-button
                  type="danger"
                  :circle="true"
                  icon-name-attribute="delete"
                  @click="rowDelAction(tableList[index]?.id, index)"
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
                  :name="GET_CORE_STRING?.addAnItem || 'Add an Item'"
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
import { mapGetters } from 'vuex'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericPreparePopup from '@generics/GenericPreparePopup.vue'
import GenericPrepareFilteringPopup from '@generics/GenericPrepareFilteringPopup.vue'
import GenericDateTimePicker from '@generics/GenericDateTimePicker.vue'

export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericDateTimePicker,
    LoadingPage,
    MessageBox,
    GenericCheckBox,
    GenericPreparePopup,
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
    topStaticTableData: {
      type: Object,
      default: () => ({}),
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
    deleteUrlRow: {
      type: String,
      default: '',
    },
    departmentName: {
      type: String,
      default: '',
    },
    actionUrl: {
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
      isOpenModal: false,
      tableBody: [],
      tableList: [],
      sortedTableList: [],
      requiredData: [],
      totalObj: {},
      showHideRow: false,
      helperShowHideRow: false,
      rowDataShowHide: true,
      noDataRow: false,
      isCanAdd: this.isEdit,
      tableShowHide: false,
      disabledButton: false,
      sortKey: '',
      sortOrder: 1,
    }
  },

  // COMPUTED
  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),
    // Filter Head data
    filteredTableHeadData() {
      return this.tablehead.filter(
        (obj) =>
          obj?.showUI ||
          ((this.tabName === 'sub_table' ||
            this.tabName === 'sub_extra_table') &&
            obj?.name === 'id')
      )
    },
    // Required Array
    requiredArr() {
      return this.filteredTableHeadData.filter(
        (obj) =>
          obj.required &&
          (obj.type !== 'label' || obj.type !== 'hidden') &&
          (obj.type === 'list' || obj.type === 'float' || obj.type === 'date')
      )
    },
    // Sorted row
    sortedData() {
      return this.sortedTableList.slice().sort((a, b) => {
        if (this.sortKey) {
          const valueA = this.getNestedValue(a, this.sortKey)
          const valueB = this.getNestedValue(b, this.sortKey)

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return this.sortOrder * valueA.localeCompare(valueB) // Sorting strings alphabetically
          } else if (typeof valueA === 'object' && typeof valueB === 'object') {
            return this.sortOrder * valueA.text.localeCompare(valueB.text) // Sorting Object alphabetically
          } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return this.sortOrder * (valueA - valueB) // Sorting numbers
          }
        }
        return 0
      })
    },
  },

  // WATCH
  watch: {
    isEdit(newVal) {
      this.isCanAdd = newVal
    },
    uiShowHide(newVal) {
      this.tableShowHide = newVal
      this.showHideRow = newVal
    },
    responseData: {
      handler(newVal) {
        this.tableList = newVal
      },
      deep: true,
      immediate: true,
    },
    tableList: {
      handler(newVal) {
        this.setIndex() // function
        this.requiredLookUpAndInputCheckerAction(newVal) // function
        this.sortedTableList = structuredClone(newVal) // deep clone
      },
      deep: true,
      immediate: true,
    },
    sortedTableList: {
      handler(newVal) {
        this.rowDataShowHide = !!newVal?.length
        this.noDataRow = !!newVal?.length
        this.totalAction() // function
      },
      deep: true,
      immediate: true,
    },
  },

  // METHODS
  methods: {
    // ID orqali filterlash uchun
    setIndex() {
      this.tableList.forEach((obj, i) => (obj.index = i + 1))
    },
    // ID orqali filterlash uchun

    // Table Body data set
    setTableBodyDataCount(tableData) {
      if (tableData?.length) {
        this.tableBody = []
        tableData.forEach((obj) => {
          this.tableBody.push(this.filteredTableHeadData)
        })
      } else {
        this.tableBody.push(this.filteredTableHeadData)
      }
    },

    // "prepareIplikLotStavka" page'da Reserve table'da entryRef'ni tekshiradi
    findEntryRefValueAction(oldArray, newArray) {
      const newResArrayData = structuredClone(oldArray)
      newArray.forEach((newObj) => {
        let oldArrayLength = oldArray.length
        const newEntryRefValue = parseFloat(newObj?.entryRef)
        oldArray.find((oldObj, index) => {
          const oldEntryRefValue = parseFloat(oldObj?.entryRef)
          if (newEntryRefValue === oldEntryRefValue) {
            newResArrayData[index].qty = newObj?.qty
            oldArrayLength = null
          }
          index + 1 === oldArrayLength && newResArrayData.push(newObj)
          return ''
        })
      })
      return newResArrayData
    },

    // Arrayni bo'sh object dan tozalash
    discardArrayFiltered() {
      this.tableList = this.tableList.filter((obj) => obj?.id)
      this.tableList?.length && this.setTableBodyDataCount(this.tableList) // function
      this.isCanAdd = true
    },
    // Arrayni bo'sh object dan tozalash

    // LookUp va Input'larning required'larini tekshiradi
    requiredLookUpAndInputCheckerAction(data) {
      if (data?.length) {
        this.requiredArr.forEach((obj) => {
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
        this.disabledButton = this.requiredData.some((obj) =>
          Object.values(obj).includes(false)
        )
      } else this.disabledButton = true
      this.$emit('requiredAction', this.disabledButton, this.tabName)
    },
    // LookUp va Input'larning required'larini tekshiradi

    // Save action dan keyin Table data'sini SORT qilib beradigan function
    filterAction(name, value) {
      // eslint-disable-next-line array-callback-return
      this.sortedTableList = this.tableList.filter((obj) => {
        if (
          (typeof obj?.[name] === 'object' && obj[name]?.text?.length) ||
          (!isNaN(obj?.[name]) && String(obj?.[name])?.length) ||
          (isNaN(obj?.[name]) && obj?.[name]?.length)
        ) {
          if (value?.length) {
            if (typeof obj[name] === 'object' && obj[name]?.text)
              return obj[name].text?.includes(String(value))
            else if (!isNaN(obj[name]))
              return String(obj[name])?.includes(String(value))
            else if (isNaN(obj[name])) return obj[name]?.includes(value)
            else return obj
          } else return obj
        } else return obj
      })
    },

    // Row sorted
    sortedRowAction(column) {
      if (this.sortKey === column) {
        this.sortOrder = -this.sortOrder
      } else {
        this.sortKey = column
        this.sortOrder = 1
      }
    },
    getNestedValue(object, keyPath) {
      return keyPath.split('.').reduce((acc, key) => acc && acc[key], object)
    },
    // Row sorted

    // default set values | function chaqirilgan joyni o'zgartirish kk.
    setDefaultValues(order) {
      if (this.departmentName === 'invoice') {
        const defValue = {
          erepairStatus: this.tableList?.[order]?.erepairStatus ?? false,
          marriage: this.tableList?.[order]?.marriage ?? false,
          mark: this.tableList?.[order]?.mark ?? false,
          waste: this.tableList?.[order]?.waste ?? false,
          qtyOfOne: this.tableList?.[order]?.qtyOfOne ?? 0,
          cashPrice: this.tableList?.[order]?.cashPrice ?? 0,
          price4: this.tableList?.[order]?.price4 ?? 0,
          index: order + 1,
          packNumber: order + 1,
        }
        this.$set(this.tableList, order, {
          ...this.tableList[order],
          ...defValue,
        })
      }
    },
    // default set values

    // change action
    onChangeSelectedLookUp(name, value, order, resultType, resObj) {
      if (name === 'item')
        this.$set(this.tableList[order], 'unitMeasurement', {
          text: resObj?.um,
        })
      else if (name === 'cashbox') {
        this.$set(this.tableList[order], 'bankBranchAccount', '')
        this.$set(this.tableList[order], name, {
          id: value,
          text: resObj?.name,
        })
      } else if (name === 'bankBranchAccount') {
        this.$set(this.tableList[order], 'cashbox', '')
        this.$set(this.tableList[order], name, {
          id: value,
          text: resObj?.name,
        })
      }
    },

    // set all LookUp and Input Value action
    setLookUpAndInputValue(name, value, order, resultType, resObj) {
      if (!this.tableList[order]) this.$set(this.tableList, order, {})
      this.$set(
        this.tableList[order],
        name,
        resultType === 'object' ? { id: value } : value
      )
      this.setDefaultValues(order) // function
      if (
        name === 'qty' ||
        name === 'unitPrice' ||
        name === 'cashPrice' ||
        name === 'vat'
      )
        this.conbinationsAction(order) // function
      if (name === 'item' || name === 'cashbox' || name === 'bankBranchAccount')
        this.onChangeSelectedLookUp(name, value, order, resultType, resObj) // function
      this.requiredLookUpAndInputCheckerAction(this.tableList) // function
    },

    // |'qty', 'unitPrice', 'cashPrice', 'vat'| combinations action
    conbinationsAction(order) {
      const rowObj = this.tableList[order]
      const qty = rowObj?.qty ? parseFloat(rowObj?.qty) : 0
      const unitPrice = rowObj?.unitPrice ? parseFloat(rowObj?.unitPrice) : 0
      const cashPrice = rowObj?.cashPrice ? parseFloat(rowObj?.cashPrice) : 0
      const vat = rowObj?.vat ? parseFloat(rowObj?.vat) : 0

      const ammountwvat = qty * unitPrice
      const vatAmount = (ammountwvat * vat) / 100
      const ammount = qty * (unitPrice + cashPrice) + vatAmount

      this.$set(this.tableList[order], 'ammountwvat', ammountwvat)
      this.$set(this.tableList[order], 'vatAmount', vatAmount)
      this.$set(this.tableList[order], 'ammount', ammount)
    },

    // Row delete Request
    requestAction(id, index) {
      this.$axios
        .post(`/${this.deleteUrlRow}`, { deleteItemId: id })
        .then((res) => {
          this.$notification('Successfully Deleted', 'Deleted', 'success')
          this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
          this.tableList = this.tableList.filter((row) => row?.id !== id)
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
        this.tableList = this.tableList.filter((row) => row.index !== index + 1)
      }
    },

    // row delete action
    rowDelAction(id, index) {
      this.$refs.messageBoxRef.open(id, index)
    },

    // Add an Item
    addAnItemAction() {
      this.addmodalorrow
        ? (this.isOpenModal = true)
        : this.setTableBodyDataCount() // function
      this.showHideRow = false
      this.requiredLookUpAndInputCheckerAction(this.tableList) // function
    },
    // Add an Item

    // Modal Closeobject
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    // Modal uchun: Accept button bosilganda ishlaydi
    popupDataGetAction(obj, isClose) {
      this.showHideRow = false
      // set data -----------
      this.tableList = [...this.tableList, obj]
      this.tableList.forEach((obj, i) => {
        this.setDefaultValues(i) // function
        this.conbinationsAction(i) // function
      })
      // set data -----------
      this.setTableBodyDataCount(this.tableList) // function
      this.requiredLookUpAndInputCheckerAction(this.tableList) // function
      this.closeAction(isClose) // function
    },
    // Modal uchun: Accept button bosilganda ishlaydi

    // get popUp data
    filterPopupSelectedTableDataGetAction(data, isClose) {
      this.showHideRow = false
      // set data -----------
      if (
        this.tabName === 'iplikLotStavkaReserveTable' &&
        this.tableList?.length &&
        data?.length
      ) {
        this.tableList = this.findEntryRefValueAction(this.tableList, data) // function
      } else {
        this.tableList = [...this.tableList, ...data]
      }
      // set data -----------
      this.setTableBodyDataCount(this.tableList) // function
      this.closeAction(isClose) // function
    },

    // Backend'ga yuboriladigan Array'ni filter qiladi
    resArrFilteredAction(bodyData, headData, tabName) {
      const list = bodyData.map((obj) => {
        const newObj = {}
        headData.forEach(({ param, resultType, name }) => {
          if (
            (!param ||
              param === 'noFormat' ||
              param === 'objectId' ||
              param === 'float' ||
              param === 'date') &&
            obj?.[name] !== '' &&
            obj?.[name] !== ' '
          ) {
            newObj[name] =
              resultType === 'object' && typeof obj[name] !== 'object'
                ? { id: obj[name] }
                : resultType === null && typeof obj[name] === 'object'
                ? obj[name]?.id
                : obj[name]
          }
          // Create Date formatted
          if (obj?.createdDate) {
            newObj.createdDate =
              isNaN(obj.createdDate) && obj.createdDate?.includes('-')
                ? obj.createdDate
                : this.$formatDate(obj?.createdDate, 'yyyy-mm-dd hh:mm:ss')
          } else {
            newObj.createdDate = isNaN(this.topStaticTableData?.date)
              ? this.$formatDate(
                  this.topStaticTableData?.date,
                  'dd/mm/yyyy hh:mm:ss'
                )
              : this.$formatDate(
                  this.topStaticTableData?.date,
                  'yyyy-mm-dd hh:mm:ss'
                )
          }
          // Create Date formatted
          // Invoice Date formatted
          if (obj?.invoiceDate) {
            newObj.invoiceDate =
              isNaN(obj.invoiceDate) && obj.invoiceDate?.includes('-')
                ? obj.invoiceDate
                : this.$formatDate(obj?.invoiceDate, 'yyyy-mm-dd hh:mm:ss')
          }
          // Update Date formatted
          if (obj?.updatedDate) {
            newObj.updatedDate =
              isNaN(obj.updatedDate) && obj.updatedDate?.includes('-')
                ? obj.updatedDate
                : this.$formatDate(obj?.updatedDate, 'yyyy-mm-dd hh:mm:ss')
          }
          // Date formatted
          if (obj?.date) {
            newObj.date =
              isNaN(obj.date) && obj.date?.includes('-')
                ? obj.date
                : this.$formatDate(obj?.date, 'yyyy-mm-dd hh:mm:ss')
          }

          // static set values --------------------------
          if (
            (tabName === 'iplikLotStavkaReserveTable' ||
              tabName === 'saleInvoiceItemTable') &&
            obj?.entryRef
          )
            newObj.entryRef = {
              id: obj?.entryRef,
            }
          // entryRef'ni static set qilindi
          else if (tabName === 'salesReturnItemTable' && obj?.returnRef)
            newObj.returnRef = {
              id: obj?.returnRef,
            }
          // returnRef'ni static set qilindi
          else if (
            tabName === 'expenseInvoiceItemTable' &&
            obj?.entryRef &&
            obj?.planningProduct?.id &&
            obj?.warehouse
          ) {
            newObj.entryRef = { id: obj?.entryRef } // entryRef'ni static set qilindi
            newObj.planningProduct = obj.planningProduct // planningProduct'ni static set qilindi
            newObj.warehouse = { id: obj?.warehouse } // warehouse'ni static set qilindi
          } else if (
            (tabName === 'sub_table' || tabName === 'sub_extra_table') &&
            obj?.companyRefId
          )
            // companyRefId'ni static set qilindi
            newObj.companyRefId = obj?.companyRefId
          else if (tabName === 'productionOrderItemTable' && obj?.planning) {
            // planning va active'ni static set qilindi
            newObj.planning = { id: obj.planning }
            newObj.active = obj?.active ?? false
          }
          // static set values --------------------------
        })
        return newObj
      })
      this.$emit('rowValues', list, this.helperShowHideRow)
    },
    // Backend'ga yuboriladigan Array'ni filter qiladi

    // Save button click qilganda ishlaydi
    getSaveRowAction() {
      this.showHideRow = this.tableShowHide
      this.helperShowHideRow = true
      this.resArrFilteredAction(
        this.tableList,
        this.filteredTableHeadData,
        this.tabName
      ) // function
    },

    // Edit button click qilganda ishlaydi
    getEditRowAction() {
      this.showHideRow = false
      this.helperShowHideRow = false
      if (this.isCanAdd) {
        if (this.responseData?.length) {
          this.setTableBodyDataCount(this.tableList) // function
        }
        this.isCanAdd = false
      }
    },

    // Total hisoblavchi function
    totalAction() {
      let total = 0
      const sumColumnArr = []
      this.filteredTableHeadData.forEach((obj) => {
        obj.sumColumn && sumColumnArr.push(obj.name)
      })
      sumColumnArr.forEach((name) => {
        this.sortedTableList.forEach((obj) => {
          if (typeof obj === 'object' && obj?.[name]) {
            total += isNaN(obj?.[name]) ? 0 : parseFloat(obj?.[name])
            this.$set(this.totalObj, name, total)
          }
        })
        total = 0
      })
    },
    // Total hisoblavchi function
  },
}
</script>
