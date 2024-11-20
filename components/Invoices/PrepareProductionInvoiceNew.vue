<template>
  <div class="w-full p-[0px_10px_0px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="rightData"
        :left="leftData"
        :url="actionUrl"
        :openpopup="openPopup"
        :create-edit="true"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
    >
      <div class="flex items-center gap-[10px]">
        <generic-button
          name="Back"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('/productioninvoice.htm')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          {{ pageID ? 'Edit Production Invoice' : 'Add Production Invoice' }}
        </h1>
      </div>
    </div>
    <div class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] mb-10">
      <!-- Top static table -->
      <table class="w-full text-[13px] mt-1">
        <tbody>
          <tr
            v-for="(row, index) in elementData"
            :key="index"
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td
              v-for="(obj, innerIndex) in row"
              :key="innerIndex"
              class="border-[1px] border-solid border-[#778899] p-[2px]"
              :style="{ width: `${obj?.width}px !important` }"
            >
              <template v-if="obj?.type === 'text'">
                <span v-if="obj?.name" class="font-medium whitespace-nowrap">{{
                  obj?.name
                }}</span>
                <span v-else-if="obj?.subName" class="whitespace-nowrap">{{
                  allSelectAndInputValue?.[obj?.subName] ??
                  editData?.[obj?.subName] ??
                  ''
                }}</span>
                <span v-if="obj?.required" class="text-red-600 text-[16px]"
                  >*</span
                >
              </template>
              <template v-else-if="obj?.type === 'date'">
                <template v-if="pageID">{{
                  editData?.[obj?.subName] ? editData[obj.subName] : ''
                }}</template>
                <generic-input-date-page
                  v-else
                  :value="
                    editData?.[obj?.subName]
                      ? $formatDate(
                          editData?.[obj?.subName],
                          'yyyy-mm-dd hh:mm:ss'
                        )
                      : ''
                  "
                  :width="obj?.width"
                  :name="obj.subName"
                  :required="
                    !obj?.required ||
                    allSelectAndInputValue?.[obj?.subName] ||
                    editData?.[obj?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <template
                v-else-if="obj?.type === 'number' || obj?.type === 'inputText'"
              >
                <template v-if="pageID">{{
                  editData?.[obj?.subName]
                }}</template>
                <generic-input
                  v-else
                  :value="`${
                    (typeof editData?.[obj?.subName] === 'object'
                      ? editData?.[obj?.subName]?.text
                      : editData?.[obj?.subName]) ?? ''
                  }`"
                  :name="obj?.subName"
                  :type="obj?.type"
                  :width="obj?.width"
                  :required="
                    !obj?.required ||
                    allSelectAndInputValue?.[obj?.subName] ||
                    editData?.[obj?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <template v-else-if="obj?.type === 'select'">
                <template v-if="pageID">{{
                  typeof editData?.[obj?.subName] === 'object'
                    ? editData?.[obj?.subName]?.text
                    : editData?.[obj?.subName]
                }}</template>
                <template
                  v-else-if="
                    (internalStatus || internalStatus === null) &&
                    (obj.subName === 'branch' || obj.subName === 'company')
                  "
                  >{{
                    typeof editData?.[obj?.subName] === 'object'
                      ? editData?.[obj?.subName]?.text
                      : editData?.[obj?.subName]
                  }}</template
                >
                <generic-look-up
                  v-else
                  :defvalue="
                    typeof editData?.[obj?.subName] === 'object'
                      ? editData?.[obj?.subName]?.text
                      : editData?.[obj?.subName]
                  "
                  :name="obj?.subName"
                  :dwidth="obj?.width"
                  :durl="obj?.url"
                  :dparam="obj?.param"
                  :disabled="obj?.disabled"
                  :required="
                    !obj?.required ||
                    allSelectAndInputValue?.[obj?.subName] ||
                    editData?.[obj?.subName]?.text ||
                    editData?.[obj?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
            </td>
          </tr>
          <tr
            v-if="!pageID"
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td colspan="6" class="border-[1px] border-solid border-[#778899]">
              <generic-button
                name="Accept"
                type="primary"
                @click="acceptAction"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Top static table -->

      <!-- --START-- Custom Table -->
      <div v-if="isAccept || pageID" class="m-1">
        <span class="text-[14px]"
          >Invoice Item.
          <strong v-if="pageID" class="text-[14px] text-[rgb(156,0,78)]"
            >Parent ID = {{ pageID }}</strong
          ></span
        >
        <div class="flex gap-1 flex-wrap">
          <GenericButton
            name="Column Setting"
            type="warning"
            icon-name-attribute="setting"
            @click="openColumnConfig"
          />
          <span v-if="hideButton" class="flex gap-1 flex-wrap">
            <GenericButton
              name="Save"
              type="primary"
              :disabled="saveBtnDisabled"
              @click="saveAction"
            />
            <GenericButton
              v-if="pageID"
              name="Discard"
              @click="discardAction"
            />
          </span>
          <GenericButton
            v-else
            name="Edit"
            type="success"
            icon-name-attribute="edit"
            @click="editAction"
          />
          <GenericButton
            v-if="pageID"
            name="Print Preview"
            type="success"
            icon-name-attribute="printer"
            @click="''"
          />
          <GenericButton
            v-if="pageID"
            name="Delete"
            type="danger"
            icon-name-attribute="delete"
            @click="$refs.messageBoxRef.open(pageID)"
          />
        </div>
        <GenericPrepareTablePage
          ref="customTableRef"
          :filter-type="internalStatus || internalStatus === false ? 'min' : ''"
          :action-url="actionUrl"
          tab-name="productionInvoiceItemTable"
          :top-static-table-data="allSelectAndInputValue"
          :addmodalorrow="
            internalStatus || internalStatus === false ? true : false
          "
          :tablehead="headData"
          :tableheadlength="headData?.length"
          :response-data="bodyData"
          :ui-show-hide="uiShowHide"
          :is-edit="isEdit"
          :height="450"
          delete-url-row=""
          class="bg-[rgba(255,255,255,0.5)] mt-1"
          @rowValues="getRowElements"
          @requiredAction="getDisabledValue"
        />
      </div>
      <!-- --END-- Custom Table -->
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
export default {
  components: {
    GenericButton,
    LoadingPage,
    MessageBox,
    GenericPrepareTablePage,
    ColumnConfigPage,
    GenericInput,
    GenericLookUp,
    GenericInputDatePage,
  },

  // DATA
  data() {
    return {
      // column config uchun
      rightMap: {},
      leftMap: {},
      rightData: {},
      leftData: {},
      checkModal: false,
      actionUrl: null,
      openPopup: false,
      // column config uchun
      pageSize_value: 25,
      editData: {},
      allSelectAndInputValue: {},
      headData: [],
      bodyData: [],
      elementData: [],
      isLoading: false,
      isAccept: false,
      uiShowHide: false,
      saveBtnDisabled: false,
      pageID: null,
      isEdit: null,
      hideButton: null,
      internalStatus: null,
      productionInvoiceType: null,
      productionInvoiceTypeWoven: null,
    }
  },

  // COMPUTED
  computed: {
    // sub table head data filtered
    getFilterSubAndExtraSubTableHeadData() {
      return this.subAndExtraSubHeadData.filter((obj) => obj?.showUI && obj)
    },
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    const query = this.$route.query
    if (query?.internalStatus)
      this.internalStatus = JSON.parse(query?.internalStatus)
    else if (query?.productionInvoiceType)
      this.productionInvoiceType = JSON.parse(query?.productionInvoiceType)
    else if (query?.productionInvoiceTypeWoven)
      this.productionInvoiceTypeWoven = JSON.parse(
        query?.productionInvoiceTypeWoven
      )
    this.isEdit = !!this.pageID
    this.hideButton = !this.pageID
    this.uiShowHide = !!this.pageID
  },

  // MOUNTED
  mounted() {
    // function
    this.getTableRequest(this.pageID)
    // function
    this.dataCreatedAction()
  },

  // METHODS
  methods: {
    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    // Bu page da Column config ishlatilmagan
    openColumnConfig() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/base/columnsConfigU`, {
          actionUrl: this.actionUrl,
        })
        .then(({ data: { leftColumns, rightColumns } }) => {
          // function
          this.getFilterData(leftColumns, rightColumns)
          this.checkModal = true
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Required Input clear value
    requiredClearInputAction(propName, name, value) {
      this.$set(
        this.allSelectAndInputValue,
        `${
          propName === 'company'
            ? 'supplierRefCurSymbol'
            : propName === 'branch'
            ? 'supplierCurSymbol'
            : 'currencySymbol'
        }`,
        value ? name : ''
      )
      this.$set(
        this.allSelectAndInputValue,
        `${
          propName === 'company'
            ? 'companyRefCurrencyRate'
            : propName === 'branch'
            ? 'companyCurrencyRate'
            : 'currencyRate'
        }`,
        value ?? ''
      )
    },

    // Look Up selected qilganda ishliydi
    getCurrentCurrencyRate(propName, propValue) {
      const body = {}
      body[`${propName === 'currency' ? 'currencyId' : 'branchCompanyId'}`] =
        propValue
      body.settingsRateType = 'SALE'

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoiceBase/getCurrentCurrencyRate`, body)
        .then(
          ({
            data: {
              paramsObject: { name, value },
            },
          }) => {
            this.requiredClearInputAction(propName, name, value)
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // get LookUps and Inputs value
    getSelectAndInputsValueAction(name, value) {
      if (name === 'company' || name === 'branch' || name === 'currency') {
        if (value) this.getCurrentCurrencyRate(name, value)
        else this.requiredClearInputAction(name)
      }
      // all select and input values
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Accept action
    acceptAction() {
      if (
        this.allSelectAndInputValue.date &&
        this.allSelectAndInputValue.company &&
        this.allSelectAndInputValue.sellDate &&
        this.allSelectAndInputValue.branch &&
        this.allSelectAndInputValue.department &&
        this.allSelectAndInputValue.currency &&
        this.allSelectAndInputValue.orderProductionType &&
        this.allSelectAndInputValue.calc_type &&
        this.allSelectAndInputValue.companyCurrencyRate &&
        this.allSelectAndInputValue.currencyRate &&
        this.allSelectAndInputValue.invoiceNominal
      )
        this.isAccept = true
      else {
        this.$notification(`Ma'lumotni to'liq kiriting!`)
        this.isAccept = false
      }
    },

    // PAGE request
    getTableRequest(pageID) {
      const body = {}
      body.page_current = 1
      body.page_size = this.pageSize_value
      if (this.productionInvoiceType)
        body.productionInvoiceType = this.productionInvoiceType
      else if (this.productionInvoiceTypeWoven)
        body.productionInvoiceTypeWoven = this.productionInvoiceTypeWoven
      else if (this.internalStatus) body.internalStatus = this.internalStatus
      else body.internalStatus = false
      if (pageID) body.id = pageID

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareProductionInvoiceNew`, body)
        .then(
          ({ data: { actionUrl, openPopup, rightColumns, invoiceJson } }) => {
            this.actionUrl = actionUrl
            this.openPopup = openPopup
            this.headData = rightColumns
            this.bodyData = invoiceJson?.invoiceItems
            this.editData = invoiceJson
            this.allSelectAndInputValue = invoiceJson
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // edit sewModelOperation
    editAction() {
      this.hideButton = !this.hideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // discard sewModelOperation
    discardAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.discardArrayFiltered()
      this.bodyData = this.bodyData.filter((obj) => obj?.id)
      this.hideButton = !this.hideButton
      this.uiShowHide = true
    },

    // Response dan qaytgan data'ga static data set qilish
    staticSetDataAction(resArray) {
      return resArray.map((obj) => {
        if (obj?.id) {
          obj = { ...obj, invoice: { id: this.pageID } }
        }
        // planningProduct set object type
        typeof obj?.planningProduct !== 'object' &&
          (obj.planningProduct = { id: obj?.planningProduct })
        // bu tekshiruv vaqtincha bo'lishi mumkin | tavsiya etilmaydi
        for (const key in obj) {
          if (typeof obj[key] === 'object' && !obj[key]?.id) {
            delete obj[key]
          }
        }
        // bu tekshiruv vaqtincha bo'lishi mumkin | tavsiya etilmaydi
        return obj
      })
    },
    // Response dan qaytgan data'ga static data set qilish

    // Save button'ni disabled qilish
    getDisabledValue(disabledVal, tabName) {
      if (tabName === 'invoiceItemTable') this.saveBtnDisabled = disabledVal
    },

    // EMIT action
    getRowElements(arr, hideBtn) {
      // list set qilish
      this.bodyData = this.staticSetDataAction(arr)

      // Start Request body
      const body = {}
      if (this.pageID) {
        const invoice = {
          id: this.pageID,
          calc_type:
            this.allSelectAndInputValue?.calc_type?.id ??
            this.allSelectAndInputValue?.calc_type ??
            '',
          companyCurrencyRate:
            this.allSelectAndInputValue?.companyCurrencyRate?.text ??
            this.allSelectAndInputValue?.companyCurrencyRate ??
            '',
          companyRefCurrencyRate:
            this.allSelectAndInputValue?.companyRefCurrencyRate?.text ??
            this.allSelectAndInputValue?.companyRefCurrencyRate ??
            '',
          currency: {
            id:
              this.allSelectAndInputValue?.currency?.id ??
              this.allSelectAndInputValue?.currency ??
              '',
          },
          currencyRate:
            this.allSelectAndInputValue?.currencyRate?.text ??
            this.allSelectAndInputValue?.currencyRate ??
            '',
          driverName: '',
          invoiceNominal: 1,
        }
        body.invoice = invoice
      } else {
        const invoice = {
          branch: {
            id:
              this.allSelectAndInputValue?.branch?.id ??
              this.allSelectAndInputValue?.branch ??
              '',
          },
          calc_type:
            this.allSelectAndInputValue?.calc_type?.id ??
            this.allSelectAndInputValue?.calc_type ??
            '',
          company: {
            id:
              this.allSelectAndInputValue?.company?.id ??
              this.allSelectAndInputValue?.company ??
              '',
          },
          companyCurrencyRate:
            this.allSelectAndInputValue?.companyCurrencyRate?.text ??
            this.allSelectAndInputValue?.companyCurrencyRate ??
            '',
          companyRefCurrencyRate:
            this.allSelectAndInputValue?.companyRefCurrencyRate?.text ??
            this.allSelectAndInputValue?.companyRefCurrencyRate ??
            '',
          currency: {
            id:
              this.allSelectAndInputValue?.currency?.id ??
              this.allSelectAndInputValue?.currency ??
              '',
          },
          currencyRate:
            this.allSelectAndInputValue?.currencyRate?.text ??
            this.allSelectAndInputValue?.currencyRate ??
            '',
          date: this.allSelectAndInputValue?.date
            ? this.$formatDate(
                this.allSelectAndInputValue?.date,
                'yyyy-mm-dd hh:mm:ss'
              )
            : '',
          sellDate: this.allSelectAndInputValue?.sellDate
            ? this.$formatDate(
                this.allSelectAndInputValue?.sellDate,
                'yyyy-mm-dd hh:mm:ss'
              )
            : '',
          department: {
            id:
              this.allSelectAndInputValue?.department?.id ??
              this.allSelectAndInputValue?.department ??
              '',
          },
          driverName: '',
          invoiceBillStatus: '',
          invoiceNo: '',
          invoiceNominal: 1,
          invoiceStatus: '',
          notes: this.allSelectAndInputValue?.note ?? '',
          orderProductionType: {
            id:
              this.allSelectAndInputValue?.orderProductionType?.id ??
              this.allSelectAndInputValue?.orderProductionType ??
              '',
          },
          systemNumber: '',
          shiftDayInterval: this.allSelectAndInputValue?.shiftDayInterval ?? '',
          warehouse: {
            id:
              this.allSelectAndInputValue?.warehouse?.id ??
              this.allSelectAndInputValue?.warehouse ??
              '',
          },
        }
        body.invoice = invoice
        if (this.productionInvoiceType) {
          body.invoice.invoiceType = 'IPLIK'
          body.productionInvoiceType = this.productionInvoiceType
        } else if (this.productionInvoiceTypeWoven) {
          body.invoice.invoiceType = 'WOVEN'
          body.productionInvoiceTypeWoven = this.productionInvoiceTypeWoven
        } else if (this.internalStatus)
          body.internalStatus = this.internalStatus
        else body.internalStatus = false
      }
      // List set qilish
      body.invoice.invoiceItems = this.bodyData
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareCreateEditProductionInvoice`, body)
        .then(({ data: { invoiceJson } }) => {
          const res = JSON.parse(invoiceJson)
          this.editData = res
          this.bodyData = res?.invoiceItems
          if (!this.pageID && res?.id) {
            if (this.productionInvoiceType)
              this.$router.push({
                path: `prepareProductionInvoiceNew.htm/${res?.id}`,
                query: { productionInvoiceType: true },
              })
            else if (this.productionInvoiceTypeWoven)
              this.$router.push({
                path: `prepareProductionInvoiceNew.htm/${res?.id}`,
                query: { productionInvoiceTypeWoven: true },
              })
            else if (this.internalStatus)
              this.$router.push({
                path: `prepareProductionInvoiceNew.htm/${res?.id}`,
                query: { internalStatus: true },
              })
            else
              this.$router.push({
                path: `prepareProductionInvoiceNew.htm/${res?.id}`,
                query: { internalStatus: false },
              })
          }
          this.hideButton = !hideBtn
          this.uiShowHide = true
          this.isLoading = !this.isLoading
          this.$notification(`Ma'lumot saqlandi!`, 'Success', 'success')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Ma'lumot saqlanmadi!`, 'Error', 'error')
        })
    },

    // Save btn action
    saveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getSaveRowAction()
    },

    // Filter Action
    getFilterData(leftColumns, rightColumns) {
      rightColumns.forEach((obj) => {
        this.rightMap[obj.name] = obj
      })
      leftColumns.forEach((obj) => {
        this.leftMap[obj.name] = obj
      })

      this.rightData = this.rightMap
      this.leftData = this.leftMap
    },

    // Message box action
    getEmitProp(propMessage, id) {
      this.isLoading = !this.isLoading
      if (propMessage === 'confirm') {
        this.$axios
          .delete(`/invoices/prepareDeleteInvoiceUrl`, {
            data: {
              id,
            },
          })
          .then(() => {
            this.$notification('Successfully Deleted', 'Deleted', 'success')
            this.$router.push('/productioninvoice.htm')
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.$notification('Error Deleted', 'Not Deleted', 'error')
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else this.isLoading = !this.isLoading
    },

    // Data created
    dataCreatedAction() {
      const data = [
        [
          {
            width: '250',
            name: 'Date',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'date',
            type: 'date',
            required: true,
          },
          {
            width: '250',
            name: 'Payment Type',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: 'paymentTypeName',
            url: 'findAllPaymentType',
            type: 'select',
            required: false,
          },
          {
            width: '250',
            name: 'System Number',
            type: 'text',
            required: false,
          },
          {
            subName: 'systemNumber',
            type: 'number',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Value Date',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'sellDate',
            type: 'date',
            required: true,
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            name: 'InvoiceStatus',
            type: 'text',
            required: false,
          },
          {
            subName: 'invoiceStatus',
            type: 'number',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Branch',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'branch',
            url: 'findAllCompanyLogic',
            param: {
              branchcompany: true,
            },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            subName: 'supplierRefCurSymbol',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: 'companyRefCurrencyRate',
            type: 'number',
            required: true,
          },
          {
            width: '250',
            name: 'Invoice №',
            type: 'text',
            required: false,
          },
          {
            subName: 'invoiceNo',
            type: 'number',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Department',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'department',
            url: 'findAllDepartmentLogic',
            param: {
              branchCompanyId: this.allSelectAndInputValue?.branch ?? null,
            },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            name: 'Shift',
            type: 'text',
            required: false,
          },
          {
            subName: 'shiftDayInterval',
            type: 'number',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Warehouse',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'warehouse',
            url: 'findAllWarehouseLogic',
            param: {
              departmentId: this.allSelectAndInputValue?.department ?? null,
            },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            name: 'Note',
            type: 'text',
          },
          {
            subName: 'note',
            type: 'inputText',
          },
        ],
        [
          {
            width: '250',
            name: 'CompanyRefProduction',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'company',
            url: 'findAllCompanyForInvoice',
            param: {
              branchcompany: false,
            },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            subName: 'supplierRefCurSymbol',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: 'companyRefCurrencyRate',
            type: 'number',
            required: true,
          },
          {
            width: '250',
            type: 'text',
          },
          {
            type: 'text',
          },
        ],
        [
          {
            width: '250',
            name: 'Currency',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'currency',
            url: 'findAllCurrency',
            type: 'select',
            required: true,
          },
          {
            width: '250',
            subName: 'currencySymbol',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: 'currencyRate',
            type: 'number',
            required: true,
          },
          {
            width: '250',
            type: 'text',
          },
          {
            type: 'text',
          },
        ],
        [
          {
            width: '250',
            name: 'Order Production Type',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'orderProductionType',
            url: 'findAllOrderProductionType',
            param: {
              tabName: 'purchaseInvoice',
            },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
          },
          {
            type: 'text',
          },
        ],
        [
          {
            width: '250',
            name: 'Calculation Type',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'calc_type',
            url: 'findAllInvoiceCalc_type',
            type: 'select',
            required: true,
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
          },
          {
            type: 'text',
          },
        ],
      ]
      this.elementData = data
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
