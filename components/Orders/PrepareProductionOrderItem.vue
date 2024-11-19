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
        :openpopup="openPopup"
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
          name="Go Back"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('/productionorder.htm')"
        />
        <generic-button
          name="Copy"
          type="info"
          icon-name-attribute="copy-document"
          @click="$refs.messageBoxRef.open(pageID, 'index', 'copy')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Add Production Order
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
                }}</template>
                <generic-input-date-page
                  v-else
                  :value="
                    allSelectAndInputValue?.[obj?.subName]
                      ? new Date(allSelectAndInputValue?.[obj?.subName])
                          ?.toISOString()
                          ?.split('.')?.[0]
                      : ''
                  "
                  width="100"
                  widthtype="%"
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
                  dwidth="100"
                  widthtype="%"
                  :defvalue="
                    allSelectAndInputValue?.[obj?.subName]?.text ??
                    allSelectAndInputValue?.[obj?.subName]
                  "
                  :durl="obj?.url"
                  :dparam="obj?.param"
                  :disabled="obj?.disabled"
                  :required="
                    !obj?.required ||
                    allSelectAndInputValue?.[obj?.subName] ||
                    allSelectAndInputValue?.[obj?.subName]?.text
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
                  :value="allSelectAndInputValue?.[obj?.subName] ?? ''"
                  :required="
                    !obj?.required || allSelectAndInputValue?.[obj?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <!-- Button -->
              <template v-else-if="obj?.type === 'button'">
                <generic-button
                  :name="productionOrderStatus ? 'Open Item' : 'Close Item'"
                  :type="obj?.bgColor"
                  @click="
                    $refs.messageBoxRef.open(pageID, 'index', 'openClose')
                  "
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
          >Sale Order Item.
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
            <GenericButton name="Save" type="primary" @click="saveAction" />
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
            @click="editAction"
          />
          <GenericButton
            name="Delete"
            type="danger"
            icon-name-attribute="delete"
            @click="$refs.messageBoxRef.open(pageID, 'index', 'delete')"
          />
        </div>
        <div class="flex gap-1 flex-wrap mt-1">
          <span v-for="(element, index) in allBtnData" :key="index">
            <template v-if="element?.type === 'number'">
              <generic-input
                type="number"
                width="120"
                :name="element?.subName"
                :placeholder="element?.name"
              />
            </template>
            <generic-button
              v-else
              :name="element?.name"
              :type="element?.type"
              :icon-name-attribute="element?.icon"
              @click="allButtonClickAction(pageID, element?.subName)"
            />
          </span>
        </div>
        <GenericPrepareTablePage
          ref="customTableRef"
          department-name="production"
          :addmodalorrow="openPopup"
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
      isLoading: false,
      pageSize_value: 25,
      pageID: null,
      elementData: [],
      allBtnData: [],
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
      openPopup: null,
      actionUrl: null,
      rightMap: {},
      leftMap: {},
      rightData: {},
      leftData: {},
      // column config uchun
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.uiShowHide = !!this.pageID
    this.isEdit = !!this.pageID
    this.hideButton = !this.pageID
  },

  // MOUNTED
  mounted() {
    // function
    this.pageRequestAction(this.pageID)
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
        .then(({ data: { leftColumns, rightColumns, openPopup } }) => {
          // function
          this.getFilterData(leftColumns, rightColumns)
          this.checkModal = true
          this.openPopup = openPopup
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
        `${propName === 'supplier' ? 'companyCurrencyRate' : 'currencyRate'}`,
        value ?? ''
      )
    },

    // Look Up selected qilganda ishliydi
    getCurrentCurrencyRate(propName, propValue) {
      const body = {}
      body[`${propName === 'currency' ? 'currencyId' : 'branchCompanyId'}`] =
        propValue
      body.settingsRateType = 'PURCHASE'

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
      if (name === 'supplier' || name === 'currency') {
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
        this.allSelectAndInputValue.dueDate &&
        this.allSelectAndInputValue.company &&
        this.allSelectAndInputValue.supplier &&
        this.allSelectAndInputValue.currency
      )
        this.isAccept = true
      else {
        this.$notification(`Ma'lumotni to'liq kiriting!`)
        this.isAccept = false
      }
    },

    // PAGE request
    pageRequestAction(pageID) {
      const body = {}
      body.page_current = 1
      body.page_size = this.pageSize_value
      if (pageID) body.id = pageID

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/productionOrder/prepareProductionOrderItemAjaxLoad`, body)
        .then(
          ({
            data: {
              openPopup,
              productionOrderItemColumns,
              productionOrderJson,
            },
          }) => {
            this.actionUrl = 'productionOrderItemTable'
            this.openPopup = openPopup
            this.editData = productionOrderJson
            this.allSelectAndInputValue = productionOrderJson
            this.headData = productionOrderItemColumns
            this.bodyData = productionOrderJson?.productionOrderItems

            productionOrderJson?.productionOrderStatus === 'CLOSED'
              ? (this.productionOrderStatus = true)
              : (this.productionOrderStatus = false)
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // edit action
    editAction() {
      this.hideButton = !this.hideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // discard action
    discardSewModalOperationAction() {
      this.hideButton = !this.hideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.arrayFiltered()
      this.uiShowHide = true
    },

    // Response dan qaytgan data ni filter qilish
    // tekshiruv xato bo'lgan. Head data siga qarab filterlanishi kerak
    responseArrayFilteredAction(resArray) {
      this.bodyData = resArray.map((obj) => {
        if (!isNaN(obj?.order)) {
          obj.order = { id: obj?.order }
        }
        return obj
      })
    },
    // Response dan qaytgan data ni filter qilish

    // EMIT action
    getRowElements(arr, hideBtn) {
      // function
      this.responseArrayFilteredAction(arr)
      this.hideButton = !hideBtn

      // Start Request body
      const productionOrder = {}
      if (this.pageID) {
        productionOrder.id = this.pageID
        productionOrder.clientOrder = ''
        productionOrder.company = {
          id:
            this.allSelectAndInputValue?.company?.id ??
            this.allSelectAndInputValue?.company ??
            '',
        }
        productionOrder.companyCurrencyRate =
          this.allSelectAndInputValue?.companyCurrencyRate ?? ''
        productionOrder.currency = {
          id:
            this.allSelectAndInputValue?.currency?.id ??
            this.allSelectAndInputValue?.currency ??
            '',
        }
        productionOrder.currencyRate =
          this.allSelectAndInputValue?.currencyRate ?? ''
        productionOrder.date = this.allSelectAndInputValue?.date || ''
        productionOrder.dueDate = this.allSelectAndInputValue?.dueDate || ''
        productionOrder.department = {
          id:
            this.allSelectAndInputValue?.department?.id ??
            this.allSelectAndInputValue?.department ??
            '',
        }
        productionOrder.notes = this.allSelectAndInputValue?.notes ?? ''
        productionOrder.orderNumber =
          this.allSelectAndInputValue?.orderNumberPo ?? ''
        productionOrder.orderNumberPo =
          this.allSelectAndInputValue?.orderNumberPo ?? ''
        productionOrder.supplier = {
          id:
            this.allSelectAndInputValue?.supplier?.id ??
            this.allSelectAndInputValue?.supplier ??
            '',
        }
      } else {
        productionOrder.clientOrder = ''
        productionOrder.company = {
          id:
            this.allSelectAndInputValue?.company?.id ??
            this.allSelectAndInputValue?.company ??
            '',
        }
        productionOrder.companyCurrencyRate =
          this.allSelectAndInputValue?.companyCurrencyRate ?? ''
        productionOrder.currency = {
          id:
            this.allSelectAndInputValue?.currency?.id ??
            this.allSelectAndInputValue?.currency ??
            '',
        }
        productionOrder.currencyRate =
          this.allSelectAndInputValue?.currencyRate ?? ''
        productionOrder.date = this.allSelectAndInputValue?.date
          ? new Date(this.allSelectAndInputValue?.date)
              .toISOString()
              .split('.')[0]
          : ''
        productionOrder.dueDate = this.allSelectAndInputValue?.dueDate
          ? new Date(this.allSelectAndInputValue?.dueDate)
              .toISOString()
              .split('.')[0]
          : ''
        productionOrder.department = {
          id:
            this.allSelectAndInputValue?.department?.id ??
            this.allSelectAndInputValue?.department ??
            '',
        }
        productionOrder.notes = this.allSelectAndInputValue?.notes ?? ''
        productionOrder.orderNumber =
          this.allSelectAndInputValue?.orderNumberPo ?? ''
        productionOrder.orderNumberPo =
          this.allSelectAndInputValue?.orderNumberPo ?? ''
        productionOrder.supplier = {
          id:
            this.allSelectAndInputValue?.supplier?.id ??
            this.allSelectAndInputValue?.supplier ??
            '',
        }
      }
      // List set qilish
      productionOrder.productionOrderItems = this.bodyData
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/productionOrder/prepareCreateEditProductionOrder`, {
          productionOrder,
        })
        .then(({ data: { productionOrderJson } }) => {
          this.editData = productionOrderJson
          this.bodyData = productionOrderJson?.productionOrderItems
          this.uiShowHide = true
          if (!this.pageID) {
            this.$router.push(
              `prepareProductionOrderItem.htm/${productionOrderJson?.id}`
            )
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

    // Save btn action
    saveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getSaveRowAction()
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
            name: 'Order Sequence number',
            type: 'text',
            required: false,
          },
          {
            subName: 'orderNumberPo',
            type: 'inputText',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Due Date',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'dueDate',
            type: 'date',
            required: true,
          },
          {
            width: '250',
            name: 'Year',
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
            name: 'Customer',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'company',
            url: 'findAllCompanyForInvoice',
            param: { branchcompany: false, companyType: 'prOrderClient' },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            name: 'Sequence No',
            type: 'text',
            required: false,
          },
          {
            subName: 'orderNoSequenceValue',
            type: 'text',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Performer',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'supplier',
            url: 'findAllCompanyForInvoice',
            param: { branchcompany: true },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            type: 'text',
            required: false,
          },
          {
            type: 'button',
            bgColor: 'success',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Custom Order №',
            type: 'text',
            required: false,
          },
          {
            width: '300',
            type: 'text',
            required: false,
          },
          {
            width: '250',
            type: 'text',
            required: false,
          },
          {
            type: 'text',
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
            type: 'text',
            required: false,
          },
          {
            type: 'text',
            required: false,
          },
        ],
        [
          {
            width: '250',
            name: 'Notes',
            type: 'text',
            required: false,
          },
          {
            width: '300',
            subName: 'notes',
            type: 'inputText',
            required: false,
          },
          {
            width: '250',
            type: 'text',
            required: false,
          },
          {
            type: 'text',
            required: false,
          },
        ],
      ]
      this.elementData = data
      const btnData = [
        { name: 'Copy Item Id', type: 'number', subName: 'copyItemId' },
        { name: 'Copy Qty', type: 'number', subName: 'copyQty' },
        { name: 'AddKroy', type: 'info', subName: 'addKroy' },
        { name: 'ConfirmItems', type: 'info', subName: 'confirmItems' },
        { name: 'UnConfirm Items', type: 'info', subName: 'unConfirmItems' },
        { name: 'Confirm all', type: 'success', subName: 'confirmAll' },
        { name: 'CreateItems', type: 'info', subName: 'createItems' },
        {
          name: 'Print Preview',
          type: 'success',
          subName: 'printer',
          icon: 'printer',
        },
        {
          name: 'Print all plannings',
          type: 'primary',
          subName: 'printAllPlannings',
        },
        {
          name: 'Create production order by plan',
          type: 'primary',
          subName: 'orderByPlan',
        },
      ]
      this.allBtnData = btnData
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
    getEmitProp(propMessage, id, index, actionName) {
      // Delete Action
      if (actionName === 'delete') {
        this.isLoading = !this.isLoading
        if (propMessage === 'confirm') {
          this.$axios
            .delete(`/productionOrder/prepareProductionOrderDelete`, {
              data: {
                deleteItemId: id,
              },
            })
            .then(({ status }) => {
              this.$notification('Successfully Deleted', 'Deleted', 'success')
              if (status < 300) this.$router.push('/productionorder.htm')
              this.isLoading = !this.isLoading
            })
            .catch((error) => {
              this.$notification('Error Deleted', 'Not Deleted', 'error')
              this.isLoading = !this.isLoading
              // eslint-disable-next-line no-console
              console.log(error)
            })
        } else this.isLoading = !this.isLoading
      }
      // Copy Action
      else if (actionName === 'copy') {
        if (propMessage === 'confirm') {
          this.$axios
            .post(`/productionOrder/copyProductionOrderUrl`, { id })
            .then(({ data: { id: newID } }) => {
              window.open(`/prepareProductionOrderItem.htm/${newID}`, '_blank')
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error)
              this.$notification(`Error!`, 'Error', 'error')
            })
        }
      }
      // Close Item Action
      else if (actionName === 'openClose') {
        const body = {
          actionName: this.productionOrderStatus ? 'SAVE' : 'CLOSED',
          prOrderId: id,
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productionOrder/openCloseProductionOrder`, body)
          .then(() => {
            this.isLoading = !this.isLoading
            // function
            this.pageRequestAction(id)
            // notification
            this.$notification(`Success!`, 'Success', 'success')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
            // notification
            this.$notification(`Error!`, 'Error', 'error')
          })
      }
    },

    // all Button Action
    allButtonClickAction(id, type) {
      if (type === 'addKroy') {
        window.open(`/kroy.htm/${id}`, '_blank')
      } else if (
        type === 'confirmItems' ||
        type === 'unConfirmItems' ||
        type === 'confirmAll'
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productionOrder/prOrderAllItemConfirmStatus`, {
            id,
            confirm:
              type === 'confirmItems'
                ? 'CONFIRM'
                : type === 'unConfirmItems'
                ? 'SAVE'
                : type === 'confirmAll'
                ? 'CONFIRMALL'
                : '',
          })
          .then(() => {
            this.isLoading = !this.isLoading
            // function
            this.pageRequestAction(id)
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (
        type === 'createItems' ||
        type === 'printer' ||
        type === 'printAllPlannings'
      ) {
        console.log(type)
      } else if (type === 'orderByPlan') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/productionOrder/prepareCreateEditOrderItemAndPlanningByPlanningType`,
            {
              id,
            }
          )
          .then(() => {
            this.isLoading = !this.isLoading
            // function
            this.pageRequestAction(id)
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
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
