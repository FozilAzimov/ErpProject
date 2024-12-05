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
          @click="$router.push('/inputFromProductionCompany.htm')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          {{
            pageID
              ? 'Edit Input From Production Company'
              : 'Add Input From Production Company'
          }}
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
            type="info"
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
              @click="discardSewModalOperationAction"
            />
          </span>
          <GenericButton
            v-else
            name="Edit"
            type="success"
            icon-name-attribute="edit"
            @click="editSewModalOperationAction"
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
          :action-url="actionUrl"
          tab-name="inputFromProductionCompanyItemTable"
          filter-type="min"
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
      elementData: [],
      editData: {},
      headData: [],
      bodyData: [],
      uiShowHide: false,
      isEdit: null,
      hideButton: null,
      allSelectAndInputValue: {},
      isAccept: false,
      saveBtnDisabled: false,
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
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
      if (pageID) body.id = pageID

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareInputFromProductionCompanyNew`, body)
        .then(({ data: { actionUrl, rightColumns, invoiceJson } }) => {
          this.actionUrl = actionUrl
          this.headData = rightColumns
          this.bodyData = invoiceJson?.invoiceItems
          this.editData = invoiceJson
          this.allSelectAndInputValue = invoiceJson
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // edit sewModelOperation
    editSewModalOperationAction() {
      this.hideButton = !this.hideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // discard sewModelOperation
    discardSewModalOperationAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.discardArrayFiltered()
      this.bodyData = this.bodyData.filter((obj) => obj?.id)
      this.hideButton = !this.hideButton
      this.uiShowHide = true
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
      if (tabName === 'outputToProductionCompanyItemTable')
        this.saveBtnDisabled = disabledVal
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
          driverName: this.allSelectAndInputValue?.driverName ?? '',
          invoiceNominal:
            this.allSelectAndInputValue?.currencyRate?.text ??
            this.allSelectAndInputValue?.currencyRate ??
            '',
        }
      } else {
        body.invoice = {
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
          department: {
            id:
              this.allSelectAndInputValue?.department?.id ??
              this.allSelectAndInputValue?.department ??
              '',
          },
          driverName: this.allSelectAndInputValue?.driverName ?? '',
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
          warehouse: {
            id:
              this.allSelectAndInputValue?.warehouse?.id ??
              this.allSelectAndInputValue?.warehouse ??
              '',
          },
        }
      }
      body.invoice.invoiceItems = this.bodyData // List set qilish
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/prepareCreateEditInputFromProductionCompany`, body)
        .then(({ data: { invoiceJson } }) => {
          this.editData = invoiceJson
          this.bodyData = invoiceJson?.invoiceItems
          if (!this.pageID) {
            this.$router.push(
              `prepareInputFromProductionCompanyNew.htm/${invoiceJson?.id}`
            )
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
            this.$router.push('/outputToProductionCompany.htm')
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
            type: 'text',
          },
          {
            width: '250',
            type: 'text',
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
            name: 'Customer',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'company',
            url: 'findAllCompanyForInvoice',
            param: {
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
            param: { branchcompany: 1 },
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
