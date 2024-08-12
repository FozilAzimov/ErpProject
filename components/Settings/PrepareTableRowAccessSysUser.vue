<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="rightData"
        :left="leftData"
        :url="actionUrl"
        :createedit="true"
        :autoheight="false"
        :openpopup="false"
        :editopen="false"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
    >
      <div class="flex items-center gap-[10px]">
        <generic-button
          name="Go Back"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('/tableRowAccessSysUser.htm')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          {{ `${pageID ? 'Edit' : 'Add'} Table Row AccessSysUser` }}
        </h1>
      </div>
    </div>

    <!-- Top static table -->
    <table class="w-full text-[13px] mt-2">
      <tbody>
        <tr
          v-for="(row, indexOne) in topStaticTableData"
          :key="indexOne"
          class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
        >
          <td
            v-for="(col, indexTwo) in row"
            :key="indexTwo"
            :style="`width: ${col?.width}`"
            class="border-[1px] border-solid border-[#778899] p-[2px]"
          >
            <template v-if="col?.type === 'label'">
              <span v-if="col?.required">
                <span>{{ col?.name }}</span>
                <span class="text-red-500">*</span>
              </span>
              <span v-else>{{ col?.name }} </span>
            </template>
            <template v-else-if="col?.type === 'date'">
              <generic-input-date-page
                :width="col?.width"
                type="datetime-local"
                :name="col?.subName"
                :disabled="col?.disabled"
                @customFunction="getLookUpAndInputsValueAction"
              />
            </template>
            <template v-else-if="col?.type === 'select'">
              <generic-look-up
                :dwidth="col?.width"
                :name="col?.subName"
                :durl="col?.url"
                :dparam="col?.params"
                :disabled="col?.disabled"
                @customFunction="getLookUpAndInputsValueAction"
              />
            </template>
            <template v-else-if="col?.type === 'number'">
              <generic-input
                :value="allLookUpAndInputsValue[col?.subName] || ''"
                :width="col?.width"
                type="number"
                :name="col?.subName"
                :disabled="col?.disabled"
                @customFunction="getLookUpAndInputsValueAction"
              />
            </template>
            <template v-else-if="col?.type === 'text'">
              <generic-input
                :value="allLookUpAndInputsValue[col?.subName] || ''"
                :width="col?.width"
                type="text"
                :name="col?.subName"
                :disabled="col?.disabled"
                @customFunction="getLookUpAndInputsValueAction"
              />
            </template>
          </td>
        </tr>
        <tr
          class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
        >
          <td
            class="border-[1px] border-solid border-[#778899] p-[2px]"
            colspan="2"
          >
            <span class="flex items-center gap-2">
              <generic-button v-if="!pageID" type="primary" name="Save" />
              <generic-button
                v-if="pageID"
                type="success"
                name="Edit"
                icon-name-attribute="edit"
              />
              <generic-button v-if="pageID" name="Plan" />
              <generic-button v-if="pageID" type="primary" name="Reserve" />
              <generic-button v-if="pageID" type="primary" name="Stage" />
              <generic-button
                v-if="pageID"
                type="danger"
                name="Delete"
                icon-name-attribute="delete"
              />
              <generic-button type="success" name="Open Or Close" />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Top static table -->

    <div
      class="w-full bg-[rgba(224,230,238,0.6)] overflow-hidden border-[1px] border-solid border-[#778899] mt-4"
      :class="true ? 'duration-[1s] h-fit' : 'duration-[1s] h-[0px]'"
    >
      <!-- --START-- Batch Details Table uchun -->
      <div v-if="true" class="m-2">
        <span class="text-[14px]"
          >Sale Order Item
          <strong v-if="pageID" class="text-[14px] text-[rgb(156,0,78)]"
            >Parent ID = {{ pageID }}</strong
          ></span
        >
        <div class="flex gap-1 flex-wrap">
          <generic-button
            name="Column Setting"
            type="warning"
            icon-name-attribute="setting"
            @click="openColumnConfig"
          />
          <generic-button
            v-if="isSaveEditDiscard"
            name="Edit"
            type="success"
            icon-name-attribute="edit"
            @click="editAction"
          />
          <template v-else>
            <generic-button
              name="Save"
              type="primary"
              :disabled="disabledButton"
              @click="saveAction"
              @customInputValueObj="getFilterData"
            />
            <generic-button
              v-if="pageID"
              name="Discard"
              @click="discardAction"
            />
          </template>
        </div>
        <generic-prepare-table-page
          ref="ordersRef"
          department-name="invoice"
          :addmodalorrow="false"
          :tablehead="tableData"
          :tableheadlength="tableData.length"
          :response-data="responseData"
          :ui-show-hide="uiShowHide"
          :isedit="isEdit"
          :height="450"
          :default-values="[]"
          class="bg-[rgba(255,255,255,0.5)] mt-1"
          @rowValues="getRowElements"
          @getNewList="getList"
          @requiredAction="getDisabledValue"
        />
      </div>
      <!-- --END-- Batch Details Table uchun -->
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    ColumnConfigPage,
    GenericInputDatePage,
    GenericLookUp,
    GenericInput,
    GenericPrepareTablePage,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      actionUrl: '',
      checkModal: false,
      pageID: null,
      topStaticTableData: [],
      allLookUpAndInputsValue: {},
      rightColumns: [],
      tableData: [],
      tableData2: [],
      rightMap: {},
      leftMap: {},
      rightData: {},
      leftData: {},
      isSaveEditDiscard: false,
      uiShowHide: false,
      isEdit: false,
      invoiceList: [],
      id: null,
      newListData: [],
      disabledButton: false,
      objData: {},
      responseData: [],
    }
  },

  // WATCH
  watch: {},

  // CREATED
  created() {
    this.pageID = this.$route.params?.id

    if (this.pageID) {
      this.isEdit = true
      this.isSaveEditDiscard = true
    }
  },

  // MOUNTED
  mounted() {
    // function
    this.getPageRequest()
    // function
    this.createdStaticTableDataAction()
  },

  // METHOD
  methods: {
    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },
    // Column Config function

    // created top static table data
    createdStaticTableDataAction() {
      const data = [
        [
          { name: 'Date', type: 'label', required: true, width: '20%' },
          {
            subName: 'dateFrom',
            type: 'date',
            disabled: !!this.pageID,
            width: '300',
          },
        ],
        [
          { name: 'Year', type: 'label', required: true, width: '20%' },
          {
            subName: 'year',
            type: 'number',
            disabled: !!this.pageID,
            width: '300',
          },
        ],
        [
          { name: 'Lot', type: 'label', required: true, width: '20%' },
          {
            subName: 'lot',
            type: 'number',
            disabled: !!this.pageID,
            width: '300',
          },
        ],
        [
          { name: 'Name', type: 'label', required: false, width: '20%' },
          {
            type: 'label',
          },
        ],
        [
          { name: 'Qty', type: 'label', required: true, width: '20%' },
          {
            subName: 'qty',
            type: 'number',
            disabled: !!this.pageID,
            width: '300',
          },
        ],
        [
          { name: 'Note', type: 'label', required: false, width: '20%' },
          {
            subName: 'note',
            type: 'text',
            disabled: !!this.pageID,
            width: '300',
          },
        ],
        [
          { name: 'Department', type: 'label', required: true, width: '20%' },
          {
            subName: 'departmentId',
            type: 'select',
            disabled: !!this.pageID,
            width: '300',
            url: 'findAllDepartmentLogic',
          },
        ],
        [
          {
            name: 'Product Production Type',
            type: 'label',
            required: true,
            width: '20%',
          },
          {
            subName: 'productId',
            type: 'select',
            disabled: !!this.pageID,
            width: '300',
            url: 'findAllProductProduction',
          },
        ],
        [
          {
            name: 'Status',
            type: 'label',
            width: '20%',
          },
          {
            name: 'Closed',
            type: 'label',
          },
        ],
      ]

      this.topStaticTableData = data
    },

    // set LOOK UP and INPUTS value
    getLookUpAndInputsValueAction(name, value) {
      if (name === 'dateFrom' || name === 'dueDate') {
        const dateVal = new Date(value)
          .toLocaleString('en-GB')
          .split(',')
          .join('')
        this.$set(this.allLookUpAndInputsValue, name, dateVal)
      } else if (name === 'departmentId') {
        this.$set(this.allLookUpAndInputsValue, name, value)
      } else {
        this.$set(this.allLookUpAndInputsValue, name, value)
        value
          ? this.setInputValueAction(name, value)
          : this.$set(this.allLookUpAndInputsValue, `sub_${name}`, '')
      }
    },

    // look up click action
    setInputValueAction(name, value) {
      const body = {
        settingsRateType: 'SALE',
        dateFrom: this.allLookUpAndInputsValue?.dateFrom,
      }
      name === 'currencyId'
        ? (body.currencyId = value)
        : (body.branchCompanyId = value)

      this.$axios
        .post(`/invoiceBase/getCurrentCurrencyRate`, body)
        .then(({ data: { paramsObject } }) => {
          this.$set(
            this.allLookUpAndInputsValue,
            `sub_${name}`,
            paramsObject?.value
          )
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // page request action
    getPageRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareExpenseInvoiceAjaxLoad`, {
          id: this.pageID ? this.pageID : null,
          saleToPerson: false,
        })
        .then(({ data }) => {
          this.isLoading = !this.isLoading
          this.actionUrl = data?.actionUrl
          this.rightColumns = data?.rightColumns
          this.objData = data?.invoiceJson
          // function
          this.leftRightDataFilter()
          // function
          this.getFilterData()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // EDIT Action
    editAction() {
      this.isSaveEditDiscard = false
      // GenericTablePage da ishlab beruvchi function
      this.$refs.invoiceRef.getEditRowAction(
        this.parentID ? this.parentID : this.userId
      )
      this.uiShowHide = false
    },

    // DISCARD Action
    discardAction() {
      this.isSaveEditDiscard = true
    },

    getRowElements(arr, hideBtn, id) {
      this.id = +id
      this.invoiceList = arr
      this.isSaveEditDiscard = !hideBtn
    },

    // new List olish
    getList(arr) {
      this.newListData = arr
    },

    // Save || Pay button'larni disabled qilish
    getDisabledValue(disabledVal, type) {
      if (type === 'top') this.disabledButton = disabledVal
      //   else if (type === 'bottom') this.subDisabledButton = disabledVal
      //   else if (type === 'subBottom') this.subTwoDisabledButton = disabledVal
    },

    // Filter Action
    leftRightDataFilter() {
      if (this.rightColumns.length) {
        this.tableData = this.rightColumns.filter((value) => {
          return value.showUI && value
        })
        this.tableData2 = this.rightColumns.filter((value) => {
          return !value.showUI && value
        })
      }
    },

    // Filter Action
    getFilterData() {
      this.tableData.forEach((obj) => {
        this.rightMap[obj.name] = obj
      })
      this.tableData2.forEach((obj) => {
        this.leftMap[obj.name] = obj
      })

      this.rightData = this.rightMap
      this.leftData = this.leftMap
    },

    // SAVE Action
    saveAction() {
      if (!this.disabledButton) {
        // GenericTablePage da ishlab beruvchi function
        this.$refs.ordersRef.getSaveRowAction()

        // GenericTablePage da subTable uchun
        this.subListShowHide = true
        this.subTable = true
        const inputValues = this.inputValues
        const lookupValues = this.lookUpValues
        const objData = this.objData

        let dateBack = null
        let sellDateBack = null

        if (this.pageID) {
          const [day, month, year, time] = objData?.date.split(/[\s/]+/)
          const formattedDateStr = `${year}-${month}-${day}T${time}`
          dateBack = formattedDateStr
          sellDateBack = formattedDateStr
        } else {
          dateBack = objData?.date
            ? new Date(objData?.date).toISOString().split('.')[0]
            : ''
          sellDateBack = objData?.date
            ? new Date(objData?.date).toISOString().split('.')[0]
            : ''
        }

        // input values
        const date = inputValues?.date ? inputValues?.date : dateBack
        const sellDate = inputValues?.sellDate
          ? inputValues?.sellDate
          : sellDateBack

        const currencyRate = this.propsValue?.supplare?.value
          ? this.propsValue?.supplare?.value
          : objData?.currencyRate?.text
          ? objData?.currencyRate?.text
          : objData?.currencyRate

        const driverName = inputValues?.driverName
          ? this.inputValues?.driverName
          : ''

        const companyRefCurrencyRate = inputValues?.companyRefCurrencyRate
          ? this.inputValues?.companyRefCurrencyRate
          : this.propsValue?.branch?.value
          ? this.propsValue?.branch?.value
          : objData?.companyRefCurrencyRate?.text
          ? objData?.companyRefCurrencyRate?.text
          : objData?.companyRefCurrencyRate

        const companyCurrencyRate = inputValues?.companyRefCurrencyRate
          ? this.inputValues?.companyCurrencyRate
          : this.propsValue?.supplare?.value
          ? this.propsValue?.supplare?.value
          : objData?.companyCurrencyRate?.text
          ? objData?.companyCurrencyRate?.text
          : objData?.companyCurrencyRate

        const invoiceNominal = this.inputValues?.invoiceNominal
          ? this.inputValues?.invoiceNominal
          : objData?.invoiceNominal?.text
          ? objData?.invoiceNominal?.text
          : objData?.invoiceNominal

        const systemNumber = inputValues?.systemNumber
          ? this.inputValues?.systemNumber
          : ''

        const invoiceStatus = inputValues?.invoiceStatus
          ? this.inputValues?.invoiceStatus
          : ''

        const invoiceBillStatus = inputValues?.invoiceBillStatus
          ? this.inputValues?.invoiceBillStatus
          : ''

        // lookup values
        const calcType = lookupValues?.calc_type
          ? lookupValues?.calc_type
          : objData?.calc_type?.id

        const order = lookupValues?.order
          ? lookupValues?.order
          : objData?.order?.id

        const branch = lookupValues?.branch
          ? lookupValues?.branch
          : objData.branch?.id

        const companyGroup = lookupValues?.companyGroup
          ? lookupValues?.companyGroup
          : objData?.companyGroup?.id

        const supplier = lookupValues?.supplier
          ? lookupValues?.supplier
          : objData?.supplier?.id

        const currency = lookupValues?.currency
          ? lookupValues?.currency
          : objData?.currency?.id

        const department = lookupValues?.department
          ? lookupValues?.department
          : objData?.department?.id

        const paymentType = lookupValues?.paymentType
          ? lookupValues?.paymentType
          : objData?.paymentType?.id

        const orderProductionType = lookupValues?.orderProductionType
          ? lookupValues?.orderProductionType
          : objData?.orderProductionType?.id

        const warehouse = lookupValues?.warehouse
          ? lookupValues?.warehouse
          : objData?.warehouse?.id

        const requestBody = {
          invoice: {
            branch: { id: Number(branch) },
            calc_type: calcType,
            company: { id: Number(supplier) },
            companyCurrencyRate,
            companyGroup: { id: Number(companyGroup) },
            companyRefCurrencyRate,
            currency: { id: Number(currency) },
            currencyRate,
            date,
            department: { id: Number(department) },
            driverName,
            id: this.isEdit ? this.id : this.parentID ? this.parentID : null,
            invoiceBillStatus,
            invoiceItems: this.invoiceList,
            invoiceNo: '',
            invoiceNominal,
            invoiceNumber: '',
            invoiceStatus,
            notes: '',
            order: { id: order },
            orderProductionType: { id: Number(orderProductionType) },
            paymentType: { id: Number(paymentType) },
            sellDate,
            sequenceNumber: '',
            systemNumber,
            warehouse: { id: Number(warehouse) },
          },
        }

        // Open qilib kirilganda jo'natiladigan 'request body'
        const editRequestBody = {
          invoice: {
            calc_type: calcType,
            companyCurrencyRate,
            companyRefCurrencyRate,
            currency: { id: Number(currency) },
            currencyRate,
            id: this.isEdit ? this.id : this.parentID ? this.parentID : null,
            invoiceItems: this.invoiceList,
            invoiceNominal,
            order: { id: order },
          },
        }

        this.$axios
          .post(
            `/invoices/prepareCreateEditSaleInvoice`,
            this.isEdit ? editRequestBody : requestBody
          )
          .then(({ data, status }) => {
            this.parentID = data?.id
            this.responseData = data?.invoiceItems
            this.subListData = data
            data?.invoiceItems.length && (this.uiShowHide = true)
            if (!this.isEdit && data?.paymentType?.text)
              this.makeAndUnBill = true
            else this.makeAndUnBill = false

            if ((this.userId || this.parentID) && status === 200) {
              this.$router.push(`/prepareSaleOrder.htm/${this.parentID}`)
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
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
