<template>
  <div class="w-full px-1">
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
          @click="$router.push('/saleinvoice.htm')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          {{ pageID ? 'Edit Sale Invoice' : 'Add Sale Invoice' }}
        </h1>
      </div>
    </div>
    <div class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]">
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
                  allSelectAndInputValue?.[obj?.subName] ?? ''
                }}</span>
                <span v-if="obj?.required" class="text-red-600 text-[16px]"
                  >*</span
                >
              </template>
              <template v-else-if="obj?.type === 'date'">
                <template v-if="pageID">{{
                  allSelectAndInputValue?.[obj?.subName] ?? ''
                }}</template>
                <generic-input-date-page
                  v-else
                  :value="
                    allSelectAndInputValue?.[obj?.subName]
                      ? $formatDate(
                          allSelectAndInputValue?.[obj?.subName],
                          'yyyy-mm-dd hh:mm:ss'
                        )
                      : ''
                  "
                  :width="obj?.width"
                  :name="obj.subName"
                  :required="
                    !obj?.required || allSelectAndInputValue?.[obj?.subName]
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
                  allSelectAndInputValue?.[obj?.subName] ?? ''
                }}</template>
                <generic-input
                  v-else
                  :value="`${
                    allSelectAndInputValue?.[obj?.subName]?.text ??
                    allSelectAndInputValue?.[obj?.subName] ??
                    ''
                  }`"
                  :name="obj?.subName"
                  :type="obj?.type"
                  :width="obj?.width"
                  :required="
                    !obj?.required || allSelectAndInputValue?.[obj?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <template v-else-if="obj?.type === 'select'">
                <template v-if="pageID">{{
                  allSelectAndInputValue?.[obj?.subName]?.text ??
                  (typeof allSelectAndInputValue?.[obj?.subName] === 'object'
                    ? ''
                    : allSelectAndInputValue?.[obj?.subName]) ??
                  ''
                }}</template>
                <generic-look-up
                  v-else
                  :defvalue="
                    allSelectAndInputValue?.[obj?.subName]?.text ??
                    (typeof allSelectAndInputValue?.[obj?.subName] === 'object'
                      ? ''
                      : allSelectAndInputValue?.[obj?.subName]) ??
                    ''
                  "
                  :name="obj?.subName"
                  :dwidth="obj?.width"
                  :durl="obj?.url"
                  :dparam="{
                    ...obj?.param,
                    ...allSelectAndInputPropsObj?.[obj.subName],
                  }"
                  :disabled="obj?.disabled"
                  :required="
                    !obj?.required ||
                    allSelectAndInputValue?.[obj?.subName]?.text ||
                    allSelectAndInputValue?.[obj?.subName]
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
              @click="saveAction('top_table')"
            />
            <GenericButton
              v-if="pageID"
              name="Discard"
              @click="discardSewModalOperationAction('top_table')"
            />
          </span>
          <GenericButton
            v-else-if="!hideButton && !isSubBodyDataLength"
            name="Edit"
            type="success"
            icon-name-attribute="edit"
            @click="editSewModalOperationAction('top_table')"
          />
          <GenericButton
            v-if="pageID"
            name="Print Preview"
            type="success"
            icon-name-attribute="printer"
            @click="''"
          />
          <GenericButton
            v-if="pageID && !isSubBodyDataLength"
            name="Delete"
            type="danger"
            icon-name-attribute="delete"
            @click="$refs.messageBoxRef.open(pageID)"
          />
        </div>
        <GenericPrepareTablePage
          ref="customTableRef"
          :action-url="actionUrl"
          tab-name="saleInvoiceItemTable"
          department-name="invoice"
          filter-type="max"
          :top-static-table-data="allSelectAndInputValue"
          :addmodalorrow="true"
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

      <!-- ========================================================================================================== -->

      <!-- --START-- Sub Custom Table -->
      <div v-if="pageID" class="m-1">
        <span class="text-[14px]"
          >Payment Details.
          <strong v-if="pageID" class="text-[14px] text-[rgb(156,0,78)]"
            >Parent ID = {{ pageID }}</strong
          ></span
        >
        <div class="flex gap-1 flex-wrap">
          <span v-if="subHideButton" class="flex gap-1 flex-wrap">
            <GenericButton
              name="Pay"
              type="primary"
              :disabled="subSaveBtnDisabled"
              @click="saveAction('sub_table')"
            />
            <GenericButton
              v-if="pageID"
              name="Discard"
              @click="discardSewModalOperationAction('sub_table')"
            />
          </span>
          <GenericButton
            v-else-if="!subHideButton && isSubBodyDataLength"
            type="info"
            name="Undo Payment"
            @click="undoPaymentAction"
          />
          <GenericButton
            v-else
            name="Edit"
            type="success"
            icon-name-attribute="edit"
            @click="editSewModalOperationAction('sub_table')"
          />
        </div>
        <GenericPrepareTablePage
          ref="subCustomTableRef"
          :addmodalorrow="false"
          :tablehead="getFilterSubTableHeadData"
          :tableheadlength="getFilterSubTableHeadData?.length"
          :response-data="subBodyData"
          :ui-show-hide="subUiShowHide"
          :is-edit="subIsEdit"
          :height="450"
          delete-url-row=""
          class="bg-[rgba(255,255,255,0.5)] mt-1"
          @rowValues="getSubRowElements"
          @requiredAction="getDisabledValue"
        />
      </div>
      <!-- --END-- Sub Custom Table -->
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
      checkModal: false,
      actionUrl: null,
      rightMap: {},
      leftMap: {},
      rightData: {},
      leftData: {},
      // column config uchun
      isLoading: false,
      pageSize_value: 25,
      pageID: null,
      saleToPerson: null,
      elementData: [],
      headData: [],
      bodyData: [],
      uiShowHide: false,
      isEdit: null,
      hideButton: null,
      allSelectAndInputValue: {},
      allSelectAndInputPropsObj: {},
      isAccept: false,
      saveBtnDisabled: false,
      // sub Table uchun
      subHeadData: [],
      subBodyData: [],
      subEditData: {},
      subUiShowHide: false,
      subIsEdit: null,
      subHideButton: null,
      isSubBodyDataLength: false,
      subSaveBtnDisabled: false,
      // sub Table uchun
    }
  },

  // COMPUTED
  computed: {
    // sub table head data filtered
    getFilterSubTableHeadData() {
      return this.subHeadData.filter((obj) => obj?.showUI && obj)
    },
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.saleToPerson =
      this.$route.query?.saleToPerson &&
      JSON.parse(this.$route.query.saleToPerson)
    this.isEdit = !!this.pageID
    this.hideButton = !this.pageID
    this.uiShowHide = !!this.pageID
    // sub table uchun
    this.subIsEdit = !!this.pageID
    this.subHideButton = !this.pageID
    this.subUiShowHide = !!this.pageID
    // sub table uchun
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
            ? 'supplierCurSymbol'
            : propName === 'branch'
            ? 'supplierRefCurSymbol'
            : 'currencySymbol'
        }`,
        value ? name : ''
      )
      this.$set(
        this.allSelectAndInputValue,
        `${
          propName === 'company'
            ? 'companyCurrencyRate'
            : propName === 'branch'
            ? 'companyRefCurrencyRate'
            : 'currencyRate'
        }`,
        value ?? ''
      )
    },

    // Look Up selected qilganda ishliydi
    getCurrentCurrencyRate(propName, propValue) {
      const body = {}
      if (this.saleToPerson) {
        body.branchCompanyId =
          this.allSelectAndInputValue?.branch?.id ??
          this.allSelectAndInputValue?.branch ??
          null
        body.currencyId =
          this.allSelectAndInputValue?.currency?.id ??
          this.allSelectAndInputValue?.currency ??
          null
        body.dateFrom = isNaN(this.allSelectAndInputValue?.date)
          ? this.allSelectAndInputValue?.date
          : this.$formatDate(this.allSelectAndInputValue?.date)
        body.employeeId = null
        body.settingsRateType = 'SALE'
      } else {
        body[`${propName === 'currency' ? 'currencyId' : 'branchCompanyId'}`] =
          propValue
        body.settingsRateType = 'SALE'
      }

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

    // set prop action
    setPropsAction(name, value) {
      if (name === 'branch') {
        this.$set(this, 'allSelectAndInputValue', {
          ...this.allSelectAndInputValue,
          department: '',
          warehouse: '',
        })
        this.$set(this.allSelectAndInputPropsObj, 'department', {
          branchCompanyId: value,
        }) // branch qiymati department'ga prop qilib berildi.
      } else if (name === 'department') {
        this.$set(this.allSelectAndInputValue, 'warehouse', '')
        this.$set(this.allSelectAndInputPropsObj, 'warehouse', {
          departmentId: value,
        }) // department qiymati warehouse'ga prop qilib berildi.
      }
    },

    // get LookUps and Inputs value
    getSelectAndInputsValueAction(name, value) {
      if (name === 'company' || name === 'branch' || name === 'currency') {
        if (value) this.getCurrentCurrencyRate(name, value)
        else this.requiredClearInputAction(name)
      }
      // all select and input values
      this.$set(this.allSelectAndInputValue, name, value)
      // set prop action
      if (name === 'branch' || name === 'department')
        this.setPropsAction(name, value)
    },

    // Accept action
    acceptAction() {
      if (
        this.allSelectAndInputValue.date &&
        this.allSelectAndInputValue.company &&
        this.allSelectAndInputValue.sellDate &&
        this.allSelectAndInputValue.branch &&
        this.allSelectAndInputValue.department &&
        this.allSelectAndInputValue.warehouse &&
        this.allSelectAndInputValue.currency &&
        this.allSelectAndInputValue.orderProductionType &&
        this.allSelectAndInputValue.calc_type &&
        this.allSelectAndInputValue.companyCurrencyRate &&
        this.allSelectAndInputValue.currencyRate &&
        this.allSelectAndInputValue.invoiceNominal &&
        this.allSelectAndInputValue.resellerPercent
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
      body.saleToPerson = this.saleToPerson
      if (pageID) body.id = pageID

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareSaleInvoiceNew`, body)
        .then(
          ({
            data: { actionUrl, rightColumns, invoiceJson, transactionsColumns },
          }) => {
            this.actionUrl = actionUrl
            this.headData = rightColumns
            this.bodyData = invoiceJson?.invoiceItems
            this.allSelectAndInputValue = invoiceJson
            this.subHeadData = transactionsColumns
            this.subBodyData = invoiceJson?.transactionsList
            invoiceJson?.transactionsList.length
              ? (this.isSubBodyDataLength = true)
              : (this.isSubBodyDataLength = false)
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
    editSewModalOperationAction(propName) {
      if (propName === 'top_table') {
        this.hideButton = !this.hideButton
        // GenericTablePage da ishlab beruvchi function
        this.$refs.customTableRef.getEditRowAction(this.pageID)
        this.uiShowHide = false
      } else if (propName === 'sub_table') {
        this.subHideButton = !this.subHideButton
        // GenericTablePage da ishlab beruvchi function
        this.$refs.subCustomTableRef.getEditRowAction(this.pageID)
        this.subUiShowHide = false
      }
    },

    // discard sewModelOperation
    discardSewModalOperationAction(propName) {
      if (propName === 'top_table') {
        // GenericTablePage da ishlab beruvchi function
        this.$refs.customTableRef.discardArrayFiltered()
        this.bodyData = this.bodyData.filter((obj) => obj?.id)
        this.hideButton = !this.hideButton
        this.uiShowHide = true
      } else if (propName === 'sub_table') {
        // GenericTablePage da ishlab beruvchi function
        this.$refs.subCustomTableRef.discardArrayFiltered()
        this.subBodyData = this.subBodyData.filter((obj) => obj?.id)
        this.subHideButton = !this.subHideButton
        this.subUiShowHide = true
      }
    },

    // Undo Payment Action
    undoPaymentAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/payUnPayUrl`, {
          id: this.pageID,
        })
        .then(() => {
          // function
          this.getTableRequest(this.pageID)
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Ma'lumot saqlanmadi!`, 'Error', 'error')
        })
    },

    // Response dan qaytgan data'ga static data set qilish
    staticSetDataAction(resArray) {
      return resArray.map((obj) => {
        if (obj?.id) {
          obj = { ...obj, invoice: { id: this.pageID } }
        }
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
      if (tabName === 'saleInvoiceItemTable') this.saveBtnDisabled = disabledVal
      else this.subSaveBtnDisabled = disabledVal
    },

    // EMIT action
    getRowElements(arr, hideBtn) {
      // list set qilish
      this.bodyData = this.staticSetDataAction(arr)

      // Start Request body
      const body = {}
      if (this.pageID) {
        body.invoice = {
          id: this.pageID,
          order:
            (this.allSelectAndInputValue?.order?.id
              ? this.allSelectAndInputValue?.order
              : this.allSelectAndInputValue?.order) ?? null,
          reseller:
            (this.allSelectAndInputValue?.reseller?.id
              ? this.allSelectAndInputValue?.reseller
              : this.allSelectAndInputValue?.reseller) ?? null,
          resellerPercent: this.allSelectAndInputValue?.resellerPercent ?? '',
        }
      } else {
        body.invoice = {
          branch: this.allSelectAndInputValue?.branch?.id
            ? this.allSelectAndInputValue?.branch
            : this.allSelectAndInputValue?.branch
            ? { id: this.allSelectAndInputValue?.branch }
            : null,
          company: this.allSelectAndInputValue?.company?.id
            ? this.allSelectAndInputValue?.company
            : this.allSelectAndInputValue?.company
            ? { id: this.allSelectAndInputValue?.company }
            : null,
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
          department: this.allSelectAndInputValue?.department?.id
            ? this.allSelectAndInputValue?.department
            : this.allSelectAndInputValue?.department
            ? { id: this.allSelectAndInputValue?.department }
            : null,
          orderProductionType: this.allSelectAndInputValue?.orderProductionType
            ?.id
            ? this.allSelectAndInputValue?.orderProductionType
            : this.allSelectAndInputValue?.orderProductionType
            ? { id: this.allSelectAndInputValue?.orderProductionType }
            : null,
          warehouse: this.allSelectAndInputValue?.warehouse?.id
            ? this.allSelectAndInputValue?.warehouse
            : this.allSelectAndInputValue?.warehouse
            ? { id: this.allSelectAndInputValue?.warehouse }
            : null,
          salesManager: this.allSelectAndInputValue?.salesManager?.id
            ? this.allSelectAndInputValue?.salesManager
            : this.allSelectAndInputValue?.salesManager
            ? { id: this.allSelectAndInputValue?.salesManager }
            : null,
          paymentType: this.allSelectAndInputValue?.paymentType?.id
            ? this.allSelectAndInputValue?.paymentType
            : this.allSelectAndInputValue?.paymentType
            ? { id: this.allSelectAndInputValue?.paymentType }
            : null,
          invoiceBillStatus: '',
          invoiceNo: '',
          invoiceStatus: '',
          systemNumber: '',
        }
      }
      body.invoice.companyRefCurrencyRate =
        this.allSelectAndInputValue?.companyRefCurrencyRate?.text ??
        this.allSelectAndInputValue?.companyRefCurrencyRate ??
        ''
      body.invoice.companyCurrencyRate =
        this.allSelectAndInputValue?.companyCurrencyRate?.text ??
        this.allSelectAndInputValue?.companyCurrencyRate ??
        ''
      body.invoice.currency = this.allSelectAndInputValue?.currency?.id
        ? this.allSelectAndInputValue?.currency
        : this.allSelectAndInputValue?.currency
        ? { id: this.allSelectAndInputValue?.currency }
        : null
      body.invoice.currencyRate =
        this.allSelectAndInputValue?.currencyRate?.text ??
        this.allSelectAndInputValue?.currencyRate ??
        ''
      body.invoice.calc_type =
        this.allSelectAndInputValue?.calc_type?.id ??
        this.allSelectAndInputValue?.calc_type ??
        ''
      body.invoice.driverName = ''
      body.invoice.invoiceNominal = 1
      body.invoice.notes = this.allSelectAndInputValue?.notes ?? ''

      body.invoice.invoiceItems = this.bodyData // List set qilish
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareCreateEditSaleInvoice`, body)
        .then(({ data }) => {
          this.allSelectAndInputValue = data
          this.bodyData = data?.invoiceItems
          if (!this.pageID) {
            this.$router.push(`prepareSaleInvoiceNew.htm/${data?.id}`)
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

    // EMIT action SUB_table
    getSubRowElements(arr, hideBtn) {
      // function
      this.subBodyData = this.staticSetDataAction(arr)

      // Start Request body
      const body = {}
      body.id = this.pageID
      body.transactionsList = this.subBodyData
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/payUnPayUrl`, body)
        .then(({ data }) => {
          this.subEditData = data
          this.subBodyData = data?.orderItems
          this.subUiShowHide = true
          this.subHideButton = !hideBtn
          // function
          this.getTableRequest(this.pageID)
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
    saveAction(propName) {
      // GenericTablePage da ishlab beruvchi function
      if (propName === 'top_table') {
        this.$refs.customTableRef.getSaveRowAction()
      } else if (propName === 'sub_table') {
        this.$refs.subCustomTableRef.getSaveRowAction()
      }
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
            this.$router.push('/salesReturn.htm')
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
            subName: 'paymentType',
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
            name: this.saleToPerson ? 'Customer (Person)' : 'Customer',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'company',
            url: this.saleToPerson
              ? 'findAllEmployeeLookUp'
              : 'findAllCompanyForInvoice',
            param: this.saleToPerson
              ? { activeCompany: 2 }
              : {
                  branchcompany: false,
                  companyType: 'client',
                },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            subName: 'supplierCurSymbol',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: 'companyCurrencyRate',
            type: 'number',
            required: true,
          },
          {
            width: '250',
            name: '',
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
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
            name: 'InvoiceBillStatus',
            type: 'text',
            required: false,
          },
          {
            subName: 'invoiceBillStatus',
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
            param: { branchcompany: true },
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
            name: 'Department',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'department',
            url: 'findAllDepartmentLogic',
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
            name: 'Warehouse',
            type: 'text',
            required: false,
          },
          {
            width: '300',
            subName: 'warehouse',
            url: 'findAllWarehouseLogic',
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
            required: false,
          },
          {
            subName: 'note',
            type: 'inputText',
            required: false,
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
            name: 'Nominal',
            type: 'text',
            required: true,
          },
          {
            subName: 'invoiceNominal',
            type: 'number',
            required: true,
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
            name: 'Contract',
            type: 'text',
          },
          {
            width: '250',
            subName: 'order',
            url: 'findAllContracts',
            type: 'select',
          },
          {
            width: '250',
            name: 'Reseller',
            type: 'text',
          },
          {
            subName: 'reseller',
            url: 'findAllCompanyForInvoice',
            type: 'select',
          },
        ],
        [
          {
            width: '250',
            name: 'Sales Manager',
            type: 'text',
          },
          {
            width: '300',
            subName: 'salesManager',
            url: 'findAllEmployee',
            type: 'select',
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
            name: 'Resellers Percent',
            type: 'text',
            required: true,
          },
          {
            subName: 'resellerPercent',
            type: 'number',
            required: true,
          },
        ],
        [
          {
            width: '250',
            name: 'Discount Card',
            type: 'text',
          },
          {
            width: '300',
            subName: 'discountCard',
            url: 'findAllDiscountCard',
            type: 'select',
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
            name: 'Driver name',
            type: 'text',
          },
          {
            width: '300',
            subName: 'driverName',
            type: 'inputText',
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
            name: 'Plate Number',
            type: 'text',
          },
          {
            width: '300',
            subName: 'plateNumber',
            url: 'findAllPlateNumber',
            type: 'select',
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
            name: 'Car',
            type: 'text',
          },
          {
            width: '300',
            subName: 'car',
            url: 'findAllCar',
            type: 'select',
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
