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
          :name="GET_CORE_STRING?.allBack"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('/salesorder.htm')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          {{
            pageID
              ? GET_CORE_STRING?.['salesOrder.edit']
              : GET_CORE_STRING?.['salesOrder.add']
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
              <!-- Text -->
              <template v-if="obj?.type === 'text'">
                <span v-if="obj?.name" class="font-medium">{{
                  obj?.name
                }}</span>
                <span v-else-if="obj?.subName">{{
                  allSelectAndInputValue?.[obj?.subName] ??
                  editData?.[obj?.subName] ??
                  ''
                }}</span>
                <span v-if="obj?.required" class="text-red-600 text-[16px]"
                  >*</span
                >
              </template>
              <!-- Date -->
              <template v-else-if="obj?.type === 'date'">
                <template v-if="pageID">{{
                  editData?.[obj?.subName]
                    ? new Date(editData?.[obj?.subName])
                        .toLocaleString('en-GB')
                        .split(',')
                        .join('')
                    : ''
                }}</template>
                <generic-input-date-page
                  v-else
                  :value="allSelectAndInputValue?.[obj?.subName]"
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
              <!-- Number -->
              <template v-else-if="obj?.type === 'number'">
                <template v-if="pageID">{{
                  editData?.[obj?.subName]
                }}</template>
                <generic-input
                  v-else
                  :value="
                    allSelectAndInputValue?.[obj?.subName] ??
                    editData?.[obj?.subName] ??
                    ''
                  "
                  :name="obj?.subName"
                  type="number"
                  :width="obj?.width"
                  :required="
                    !obj?.required || allSelectAndInputValue?.[obj?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <!-- Look Up -->
              <template v-else-if="obj?.type === 'select'">
                <template v-if="pageID">{{
                  typeof editData?.[obj?.subName] === 'object'
                    ? editData?.[obj?.subName]?.text
                    : editData?.[obj?.subName]
                }}</template>
                <generic-look-up
                  v-else
                  :name="obj?.subName"
                  :dwidth="obj?.width"
                  :durl="obj?.url"
                  :dparam="obj?.param"
                  :disabled="obj?.disabled"
                  :required="
                    !obj?.required || allSelectAndInputValue?.[obj?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <!-- Input Text -->
              <template v-else-if="obj?.type === 'inputText'">
                <template v-if="pageID">{{
                  editData?.[obj?.subName]
                }}</template>
                <generic-input
                  v-else
                  :name="obj?.subName"
                  :width="obj?.width"
                  :required="
                    !obj?.required || allSelectAndInputValue?.[obj?.subName]
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
                :name="GET_CORE_STRING?.accept || 'Accept'"
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
          >Sale Order Item.
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
          <!-- create -->
          <template v-if="!pageID && !isSubBodyDataLength">
            <span v-if="hideButton" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="saveAction('topTable')"
              />
              <GenericButton
                v-if="pageID"
                name="Discard"
                @click="discardSewModalOperationAction('topTable')"
              />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="editSewModalOperationAction('topTable')"
            />
          </template>
          <!-- create -->
          <!-- edit -->
          <template
            v-else-if="pageID && !editData?.status && !isSubBodyDataLength"
          >
            <span v-if="hideButton" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="saveAction('topTable')"
              />
              <GenericButton
                v-if="pageID"
                name="Discard"
                @click="discardSewModalOperationAction('topTable')"
              />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="editSewModalOperationAction('topTable')"
            />
          </template>
          <!-- edit -->
          <GenericButton
            v-if="pageID && editData?.status !== 'CREDIT_CANCELLED'"
            name="makeCreditUndo"
            type="primary"
            @click="makeCreditUndoAction"
          />
          <GenericButton
            v-if="pageID && editData?.oderPaymentStatus !== 'CREDIT_CANCELLED'"
            :name="
              editData?.status === 'BILLED' ||
              editData?.status === 'CREDIT_CANCELLED'
                ? 'Un bill'
                : 'Make Bill'
            "
            :type="
              editData?.status === 'BILLED' ||
              editData?.status === 'CREDIT_CANCELLED'
                ? 'info'
                : 'primary'
            "
            @click="makeBillAction"
          />
          <GenericButton
            v-if="pageID"
            name="Print Preview"
            type="success"
            icon-name-attribute="printer"
            @click="''"
          />
          <GenericButton
            v-if="
              pageID &&
              editData?.status !== 'BILLED' &&
              editData?.status !== 'CREDIT_CANCELLED'
            "
            name="Delete"
            type="danger"
            icon-name-attribute="delete"
            @click="$refs.messageBoxRef.open(pageID)"
          />
        </div>
        <GenericPrepareTablePage
          ref="customTableRef"
          department-name="production"
          :addmodalorrow="false"
          :tablehead="headData"
          :tableheadlength="headData?.length"
          :response-data="bodyData"
          :ui-show-hide="uiShowHide"
          :is-edit="isEdit"
          :height="450"
          delete-url-row="saleOrder/prepareDeleteSaleOrderItemUrl"
          class="bg-[rgba(255,255,255,0.5)] mt-1"
          @rowValues="getRowElements"
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
              @click="saveAction('subTable')"
            />
            <GenericButton
              v-if="pageID"
              name="Discard"
              @click="discardSewModalOperationAction('subTable')"
            />
          </span>
          <GenericButton
            v-else-if="
              isSubBodyDataLength &&
              editData?.status === 'CREDIT_CANCELLED' &&
              editData?.oderPaymentStatus === 'CREDIT_CANCELLED'
            "
            name="Undo Payment"
            type="info"
            @click="undoPaymentAction"
          />
          <GenericButton
            v-else
            name="Edit"
            type="success"
            icon-name-attribute="edit"
            @click="editSewModalOperationAction('subTable')"
          />
        </div>
        <GenericPrepareTablePage
          ref="subCustomTableRef"
          department-name="production"
          :addmodalorrow="false"
          :tablehead="getFilterSubTableHeadData"
          :tableheadlength="getFilterSubTableHeadData?.length"
          :response-data="subBodyData"
          :ui-show-hide="subUiShowHide"
          :is-edit="subIsEdit"
          :height="450"
          delete-url-row="saleOrder/payUnPaySaleOrder"
          class="bg-[rgba(255,255,255,0.5)] mt-1"
          @rowValues="getSubRowElements"
        />
      </div>
      <!-- --END-- Sub Custom Table -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      // column config uchun
      checkModal: false,
      actionUrl: null,
      rightMap: {},
      leftMap: {},
      rightData: {},
      leftData: {},
      // column config uchun
      // sub Table uchun
      subHeadData: [],
      subBodyData: [],
      subEditData: {},
      subUiShowHide: false,
      subIsEdit: null,
      subHideButton: null,
      isSubBodyDataLength: false,
      // sub Table uchun
    }
  },

  // COMPUTED
  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),
    // sub table head data filtered
    getFilterSubTableHeadData() {
      return this.subHeadData.filter((obj) => obj?.showUI && obj)
    },
  },

  // WATCH
  watch: {
    // start CoreString action
    GET_CORE_STRING: {
      handler(newVal) {
        // function
        this.dataCreatedAction(newVal)
      },
      deep: true,
    },
    // end CoreString action
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
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
    this.dataCreatedAction(this.GET_CORE_STRING)
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
            ? 'systemCurrencySymbol'
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
        this.allSelectAndInputValue.sellDate &&
        this.allSelectAndInputValue.branch &&
        this.allSelectAndInputValue.department &&
        this.allSelectAndInputValue.currency &&
        this.allSelectAndInputValue.companyCurrencyRate &&
        this.allSelectAndInputValue.companyRefCurrencyRate &&
        this.allSelectAndInputValue.currencyRate
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
        .post(`/saleOrder/prepareSaleOrderAjaxLoad`, body)
        .then(
          ({
            data: { saleOrderItemColumns, saleOrderJson, transactionsColumns },
          }) => {
            this.actionUrl = 'saleOrderItemTable'
            this.headData = saleOrderItemColumns
            this.bodyData = saleOrderJson?.orderItems
            this.editData = saleOrderJson
            this.subHeadData = transactionsColumns
            this.subBodyData = saleOrderJson?.transactionsList
            saleOrderJson?.transactionsList.length
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
      if (propName === 'topTable') {
        this.hideButton = !this.hideButton
        // GenericTablePage da ishlab beruvchi function
        this.$refs.customTableRef.getEditRowAction(this.pageID)
        this.uiShowHide = false
      } else if (propName === 'subTable') {
        this.subHideButton = !this.subHideButton
        // GenericTablePage da ishlab beruvchi function
        this.$refs.subCustomTableRef.getEditRowAction(this.pageID)
        this.subUiShowHide = false
      }
    },

    // discard sewModelOperation
    discardSewModalOperationAction(propName) {
      if (propName === 'topTable') {
        // GenericTablePage da ishlab beruvchi function
        this.$refs.customTableRef.arrayFiltered()
        this.hideButton = !this.hideButton
        this.uiShowHide = true
      } else if (propName === 'subTable') {
        // GenericTablePage da ishlab beruvchi function
        this.$refs.subCustomTableRef.arrayFiltered()
        this.subHideButton = !this.subHideButton
        this.subUiShowHide = true
      }
    },

    // Response dan qaytgan data ni filter qilish
    responseArrayFilteredAction(resArray, propName) {
      if (propName === 'topTable') {
        this.bodyData = resArray.map((obj) => {
          if (!isNaN(obj?.order)) {
            obj.order = { id: obj?.order }
          }
          return obj
        })
      } else if (propName === 'subTable') {
        // sub table ni filter qilib olish uchun ishliydi
        this.subBodyData = resArray.map((obj) => {
          if (!isNaN(obj?.order)) obj.order = { id: obj?.order }
          if (!isNaN(obj?.user)) obj.user = { id: obj?.user }
          if (!isNaN(obj?.paymentTypesId?.id))
            obj.paymentTypesId = obj?.paymentTypesId?.id
          if (!isNaN(obj?.date))
            obj.date = new Date(obj?.date).toISOString().split('.')[0]
          if (!isNaN(obj?.valueDate))
            obj.valueDate = new Date(obj?.valueDate).toISOString().split('.')[0]
          return obj
        })
        // sub table ni filter qilib olish uchun ishliydi
      }
    },
    // Response dan qaytgan data ni filter qilish

    // EMIT action
    getRowElements(arr, hideBtn) {
      // function
      this.responseArrayFilteredAction(arr, 'topTable')
      this.hideButton = !hideBtn

      // Start Request body
      const saleOrder = {}
      if (this.pageID) {
        saleOrder.id = this.pageID
        saleOrder.branch = {
          id:
            this.allSelectAndInputValue?.branch ??
            this.editData?.branch?.id ??
            '',
        }
        saleOrder.company = {
          id:
            this.allSelectAndInputValue?.company ??
            this.editData?.company?.id ??
            '',
        }
        saleOrder.companyCurrencyRate =
          this.allSelectAndInputValue?.companyCurrencyRate ??
          this.editData?.companyCurrencyRate ??
          ''
        saleOrder.companyRefCurrencyRate =
          this.allSelectAndInputValue?.companyRefCurrencyRate ??
          this.editData?.companyRefCurrencyRate ??
          ''
        saleOrder.currency = {
          id:
            this.allSelectAndInputValue?.currency ??
            this.editData?.currency?.id ??
            '',
        }
        saleOrder.currencyRate =
          this.allSelectAndInputValue?.currencyRate ??
          this.editData?.currencyRate ??
          ''
        saleOrder.date =
          this.allSelectAndInputValue?.date ??
          (this.editData?.date &&
            new Date(this.editData?.date)?.toISOString().split('.')[0]) ??
          ''
        saleOrder.sellDate =
          this.allSelectAndInputValue?.sellDate ??
          (this.editData?.sellDate &&
            new Date(this.editData?.sellDate)?.toISOString().split('.')[0]) ??
          ''
        saleOrder.department = {
          id:
            this.allSelectAndInputValue?.department ??
            this.editData?.department?.id ??
            '',
        }
        saleOrder.notes =
          this.allSelectAndInputValue?.notes ?? this.editData?.notes ?? ''
      } else {
        saleOrder.branch = { id: this.allSelectAndInputValue?.branch ?? '' }
        saleOrder.company = { id: this.allSelectAndInputValue?.company ?? '' }
        saleOrder.companyCurrencyRate =
          this.allSelectAndInputValue?.companyCurrencyRate ?? ''
        saleOrder.companyRefCurrencyRate =
          this.allSelectAndInputValue?.companyRefCurrencyRate ?? ''
        saleOrder.currency = { id: this.allSelectAndInputValue?.currency ?? '' }
        saleOrder.currencyRate = this.allSelectAndInputValue?.currencyRate ?? ''
        saleOrder.date = this.allSelectAndInputValue?.date ?? ''
        saleOrder.sellDate = this.allSelectAndInputValue?.sellDate ?? ''
        saleOrder.department = {
          id: this.allSelectAndInputValue?.department ?? '',
        }
        saleOrder.notes = this.allSelectAndInputValue?.notes ?? ''
      }
      // List set qilish
      saleOrder.orderItems = this.bodyData
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/saleOrder/prepareCreateEditSaleOrder`, {
          saleOrder,
        })
        .then(({ data }) => {
          this.editData = data
          this.bodyData = data?.orderItems
          this.uiShowHide = true
          if (!this.pageID) {
            this.$router.push(`prepareSaleOrder.htm/${data?.id}`)
          }
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
      this.responseArrayFilteredAction(arr, 'subTable')
      this.subHideButton = !hideBtn

      // Start Request body
      const body = {}
      body.id = this.pageID
      body.transactionsList = this.subBodyData
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/saleOrder/payUnPaySaleOrder`, body)
        .then(({ data }) => {
          this.subEditData = data
          this.subBodyData = data?.orderItems
          this.subUiShowHide = true
          this.isLoading = !this.isLoading
          this.$notification(`Ma'lumot saqlandi!`, 'Success', 'success')
          // function
          this.getTableRequest(this.pageID)
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
      if (propName === 'topTable') {
        this.$refs.customTableRef.getSaveRowAction()
      } else if (propName === 'subTable') {
        this.$refs.subCustomTableRef.getSaveRowAction()
      }
    },

    // Data created
    dataCreatedAction(getText) {
      const data = [
        [
          {
            width: '250',
            name: getText?.date || 'date',
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
            name: getText?.['company.address'] || 'company.address',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: 'address',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            name: getText?.['Order year'] || 'Order year',
            type: 'text',
            required: false,
          },
          {
            subName: 'years',
            type: 'text',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: getText?.dueDate || 'Due Date',
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
            name: '',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: '',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            name: getText?.['PAY Status'] || 'PAY Status',
            type: 'text',
            required: false,
          },
          {
            subName: 'oderPaymentStatus',
            type: 'text',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: getText?.customer || 'Customer',
            type: 'text',
            required: false,
          },
          {
            width: '300',
            subName: 'company',
            url: 'findAllCompanyForInvoice',
            param: { branchcompany: false, companyType: 'client' },
            type: 'select',
            required: false,
          },
          {
            width: '250',
            subName: 'supplierRefCurSymbol',
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
            name: getText?.['Order Status'] || 'Order Status',
            type: 'text',
            required: false,
          },
          {
            subName: 'status',
            type: 'text',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: getText?.branch || 'Branch',
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
            subName: 'systemCurrencySymbol',
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
            name: getText?.order || 'Order',
            type: 'text',
            required: false,
          },
          {
            subName: 'orderNumber',
            type: 'text',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: getText?.department || 'Department',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'department',
            url: 'findAllDepartmentLogic',
            param: { branchcompany: null },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            name: getText?.note || 'Note',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            subName: 'notes',
            type: 'inputText',
            required: false,
          },
          {
            width: '250',
            name: '',
            type: 'text',
            required: false,
          },
          {
            subName: '',
            type: 'text',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: getText?.currency || 'Currency',
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
            name: '',
            type: 'text',
            required: false,
          },
          {
            subName: '',
            type: 'text',
            required: false,
          },
        ],
      ]
      this.elementData = data
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
          .delete(`/saleOrder/prepareDeleteSaleOrderUrl`, {
            data: {
              id,
            },
          })
          .then(({ status }) => {
            this.$notification('Successfully Deleted', 'Deleted', 'success')
            if (status < 300) this.$router.push('/salesorder.htm')
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

    // makeCreditUndo action
    makeCreditUndoAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/saleOrder/makeUndoCreditSaleOrderUrl`, { id: this.pageID })
        .then(() => {
          this.isLoading = !this.isLoading
          this.$notification(
            `Successfully updated an Order!`,
            'Success',
            'success'
          )
          // function
          this.getTableRequest(this.pageID)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Error`, 'Error', 'error')
        })
    },

    // makeCreditUndo action
    makeBillAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/saleOrder/makeBillSaleOrderUrl`, { id: this.pageID })
        .then(() => {
          this.isLoading = !this.isLoading
          this.$notification(
            `Successfully updated an Order!`,
            'Success',
            'success'
          )
          // function
          this.getTableRequest(this.pageID)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Error`, 'Error', 'error')
        })
    },

    // makeCreditUndo action
    undoPaymentAction() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/saleOrder/payUnPaySaleOrder`, { id: this.pageID })
        .then(() => {
          this.isLoading = !this.isLoading
          this.$notification(
            `Successfully updated an Order!`,
            'Success',
            'success'
          )
          // function
          this.getTableRequest(this.pageID)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Error`, 'Error', 'error')
        })
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
