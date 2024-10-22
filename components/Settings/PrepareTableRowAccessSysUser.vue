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
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td
              v-for="(row, index) in elementData"
              :key="index"
              class="border-[1px] border-solid border-[#778899] p-[5px]"
              :style="{ width: `${row?.width}px !important` }"
            >
              <span v-if="row?.name" class="font-semibold">{{
                row?.name
              }}</span>
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td
              v-for="(row, index) in elementData"
              :key="index"
              class="border-[1px] border-solid border-[#778899] p-[2px]"
              :style="{ width: `${row?.width}px !important` }"
            >
              <template v-if="row?.type === 'text'">
                {{
                  typeof tableRowAccessSysUserItemColumns?.[row?.subName] ===
                  'object'
                    ? tableRowAccessSysUserItemColumns?.[row?.subName]?.text
                    : tableRowAccessSysUserItemColumns?.[row?.subName]
                    ? tableRowAccessSysUserItemColumns?.[row?.subName]
                    : row?.subName
                }}
              </template>
              <template v-else>
                <template v-if="pageID && !hideButton">{{
                  typeof tableRowAccessSysUserItemColumns?.[row?.subName] ===
                  'object'
                    ? tableRowAccessSysUserItemColumns?.[row?.subName]?.text
                    : tableRowAccessSysUserItemColumns?.[row?.subName]
                }}</template>
                <generic-look-up
                  v-else
                  :name="row?.subName"
                  dwidth="100"
                  widthtype="%"
                  :defvalue="
                    tableRowAccessSysUserItemColumns?.[row?.subName]?.text
                  "
                  durl="findAllAccessTypes"
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
      <div class="w-full flex flex-col items-center justify-start p-1">
        <div
          v-for="(row, index) in sysUserElementData"
          :key="index"
          class="w-full flex mb-2"
        >
          <span
            v-for="(obj, innerIndex) in row"
            :key="innerIndex"
            class="w-1/3"
          >
            <template v-if="obj?.type === 'checkbox'">
              <generic-check-box
                :text="obj?.name"
                :name="obj?.subName"
                :border="true"
                :disabled="hideButton ? false : true"
                @customFunction="getSelectAndInputsValueAction"
              />
            </template>
            <span v-else class="flex items-center gap-2">
              <generic-input
                width="150"
                type="number"
                :name="obj?.subName"
                :disabled="hideButton ? false : true"
                @customFunction="getSelectAndInputsValueAction"
              />
              <span class="text-[12px]">{{ obj?.name }}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  components: {
    GenericButton,
    LoadingPage,
    MessageBox,
    GenericPrepareTablePage,
    ColumnConfigPage,
    GenericLookUp,
    GenericCheckBox,
    GenericInput,
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
      tableRowAccessSysUserItemColumns: [],
      uiShowHide: false,
      isEdit: null,
      hideButton: null,
      allSelectAndInputValue: {},
      isAccept: false,
      sysUserElementData: [],
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

    // get LookUps and Inputs value
    getSelectAndInputsValueAction(name, value) {
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
        .post(`/tableRowAccessSysUser/prepareTableRowAccessSysUser`, body)
        .then(
          ({
            data: {
              tableRowAccessSysUserItemColumns,
              tableRowAccessSysUserJson,
            },
          }) => {
            this.actionUrl = 'productionOrderItemTable'
            this.tableRowAccessSysUserItemColumns =
              tableRowAccessSysUserItemColumns
            this.headData = tableRowAccessSysUserJson
            this.bodyData = tableRowAccessSysUserItemColumns?.tableRowAccess
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
        for (const key in obj) {
          if (
            key !== 'id' &&
            key !== 'index' &&
            typeof obj?.[key] !== 'object'
          ) {
            obj[key] = { id: obj?.[key] }
          }
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
      const tableRowAccessSysUser = {}
      if (this.pageID) {
        tableRowAccessSysUser.id = this.pageID
        tableRowAccessSysUser.accessType = this.allSelectAndInputValue
          ?.accessType
          ? {
              id: this.allSelectAndInputValue?.accessType ?? '',
            }
          : this.tableRowAccessSysUserItemColumns?.accessType
        tableRowAccessSysUser.branchReportAccessType = this
          .allSelectAndInputValue?.branchReportAccessType
          ? {
              id: this.allSelectAndInputValue?.branchReportAccessType ?? '',
            }
          : this.tableRowAccessSysUserItemColumns?.branchReportAccessType
        tableRowAccessSysUser.gpsAccessType = this.allSelectAndInputValue
          ?.gpsAccessType
          ? {
              id: this.allSelectAndInputValue?.gpsAccessType ?? '',
            }
          : this.tableRowAccessSysUserItemColumns?.gpsAccessType
        tableRowAccessSysUser.hrmsAccessType = this.allSelectAndInputValue
          ?.hrmsAccessType
          ? {
              id: this.allSelectAndInputValue?.hrmsAccessType ?? '',
            }
          : this.tableRowAccessSysUserItemColumns?.hrmsAccessType
        tableRowAccessSysUser.iplikLotAccessType = this.allSelectAndInputValue
          ?.iplikLotAccessType
          ? {
              id: this.allSelectAndInputValue?.iplikLotAccessType ?? '',
            }
          : this.tableRowAccessSysUserItemColumns?.iplikLotAccessType
        tableRowAccessSysUser.prOrderAccessType = this.allSelectAndInputValue
          ?.prOrderAccessType
          ? {
              id: this.allSelectAndInputValue?.prOrderAccessType ?? '',
            }
          : this.tableRowAccessSysUserItemColumns?.prOrderAccessType
        tableRowAccessSysUser.requestPermissionType = this
          .allSelectAndInputValue?.requestPermissionType
          ? {
              id: this.allSelectAndInputValue?.requestPermissionType ?? '',
            }
          : this.tableRowAccessSysUserItemColumns?.requestPermissionType
        tableRowAccessSysUser.transactionBranchPermissionType = this
          .allSelectAndInputValue?.transactionBranchPermissionType
          ? {
              id:
                this.allSelectAndInputValue?.transactionBranchPermissionType ??
                '',
            }
          : this.tableRowAccessSysUserItemColumns
              ?.transactionBranchPermissionType
      } else {
        tableRowAccessSysUser.accessType = {
          id: this.allSelectAndInputValue?.accessType ?? '',
        }
        tableRowAccessSysUser.branchReportAccessType = {
          id: this.allSelectAndInputValue?.branchReportAccessType ?? '',
        }
        tableRowAccessSysUser.gpsAccessType = {
          id: this.allSelectAndInputValue?.gpsAccessType ?? '',
        }
        tableRowAccessSysUser.hrmsAccessType = {
          id: this.allSelectAndInputValue?.hrmsAccessType ?? '',
        }
        tableRowAccessSysUser.iplikLotAccessType = {
          id: this.allSelectAndInputValue?.iplikLotAccessType ?? '',
        }
        tableRowAccessSysUser.prOrderAccessType = {
          id: this.allSelectAndInputValue?.prOrderAccessType ?? '',
        }
        tableRowAccessSysUser.requestPermissionType = {
          id: this.allSelectAndInputValue?.requestPermissionType ?? '',
        }
        tableRowAccessSysUser.transactionBranchPermissionType = {
          id:
            this.allSelectAndInputValue?.transactionBranchPermissionType ?? '',
        }
      }
      // List set qilish
      tableRowAccessSysUser.sysUser =
        this.tableRowAccessSysUserItemColumns?.sysUserMap
      tableRowAccessSysUser.sysUser.id =
        this.tableRowAccessSysUserItemColumns?.sysUser?.id
      tableRowAccessSysUser.tableRowAccess = this.bodyData
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/tableRowAccessSysUser/prepareCreateEdittableRowAccessSysUser`, {
          tableRowAccessSysUser,
        })
        .then(() => {
          this.uiShowHide = true
          if (!this.pageID) {
            this.$router.push(`prepareTableRowAccessSysUser.htm/${this.pageID}`)
          } else this.pageRequestAction(this.pageID)
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
        {
          width: '100',
          name: 'Person',
          subName: 'Person',
          type: 'text',
        },
        {
          width: '200',
          name: 'sysUser',
          subName: 'sysUser',
          type: 'text',
        },
        {
          width: '200',
          name: 'accessType',
          subName: 'accessType',
          type: 'select',
        },
        {
          width: '200',
          name: 'transactionBranchPermissionType',
          subName: 'transactionBranchPermissionType',
          type: 'select',
        },
        {
          width: '200',
          name: 'branchReportAccessType',
          subName: 'branchReportAccessType',
          type: 'select',
        },
        {
          width: '200',
          name: 'hrmsAccessType',
          subName: 'hrmsAccessType',
          type: 'select',
        },
        {
          width: '200',
          name: 'gpsAccessType',
          subName: 'gpsAccessType',
          type: 'select',
        },
        {
          width: '200',
          name: 'prOrderAccessType',
          subName: 'prOrderAccessType',
          type: 'select',
        },
        {
          width: '200',
          name: 'iplikLotAccessType',
          subName: 'iplikLotAccessType',
          type: 'select',
        },
        {
          width: '200',
          name: 'requestPermissionType',
          subName: 'requestPermissionType',
          type: 'select',
        },
      ]
      this.elementData = data

      const subData = [
        [
          {
            name: 'batchStartEndFinishStage',
            subName: 'batchStartEndFinishStage',
            type: 'checkbox',
          },
          {
            name: 'gpsMapClusterAcces',
            subName: 'gpsMapClusterAcces',
            type: 'checkbox',
          },
          {
            name: 'changeInvoiceCompanyAccess',
            subName: 'changeInvoiceCompanyAccess',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'physicalControlAccess',
            subName: 'physicalControlAccess',
            type: 'checkbox',
          },
          {
            name: 'qualityControlAccess',
            subName: 'qualityControlAccess',
            type: 'checkbox',
          },
          {
            name: 'deleteControlAccess',
            subName: 'deleteControlAccess',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'canSendIntviaInvoice',
            subName: 'canSendIntviaInvoice',
            type: 'checkbox',
          },
          {
            name: 'Confirm purchase Invoice forMakeBill',
            subName: 'confirmPurchaseInvoiceForMakeBill',
            type: 'checkbox',
          },
          {
            name: 'canReceiveIntviaInvoice',
            subName: 'canReceiveIntviaInvoice',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Transactions Branch Access',
            subName: 'transactionsBranchAccess',
            type: 'checkbox',
          },
          {
            name: 'Confirm purchase Invoice forMakeBill',
            subName: 'confirmPurchaseInvoiceForMakeBill',
            type: 'checkbox',
          },
          {
            name: 'canReceiveIntviaInvoice',
            subName: 'canReceiveIntviaInvoice',
            type: 'number',
          },
        ],
        [
          {
            name: 'Transactions Cashbox Access',
            subName: 'transactionsCashboxAccess',
            type: 'checkbox',
          },
          {
            name: 'undoSendedInvoice',
            subName: 'undoSendedInvoice',
            type: 'checkbox',
          },
          {
            name: 'expenseInvoiceTimeoutHours',
            subName: 'expenseInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'Transactions bank Access',
            subName: 'transactionsBankAccess',
            type: 'checkbox',
          },
          {
            name: 'printPreviewAccess',
            subName: 'printPreviewAccess',
            type: 'checkbox',
          },
          {
            name: 'externalInvoiceTimeoutHours',
            subName: 'externalInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'Transactions Person Access',
            subName: 'transactionsPersonAccess',
            type: 'checkbox',
          },
          {
            name: 'requestServiceStatusAccepted',
            subName: 'requestServiceStatusAccepted',
            type: 'checkbox',
          },
          {
            name: 'internalInvoiceTimeoutHours',
            subName: 'internalInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'Transactions Company Access',
            subName: 'transactionsCompanyAccess',
            type: 'checkbox',
          },
          {
            name: 'requestServiceStatusCancelled',
            subName: 'requestServiceStatusCancelled',
            type: 'checkbox',
          },
          {
            name: 'purchaseInvoiceTimeoutHours',
            subName: 'purchaseInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'batch start finish param',
            subName: 'batchStartFinishParam',
            type: 'checkbox',
          },
          {
            name: 'requestServiceStatusDraft',
            subName: 'requestServiceStatusDraft',
            type: 'checkbox',
          },
          {
            name: 'purchasereturnInvoiceTimeoutHours',
            subName: 'purchasereturnInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'batch card param',
            subName: 'batchCardParam',
            type: 'checkbox',
          },
          {
            name: 'requestServiceStatusFinished',
            subName: 'requestServiceStatusFinished',
            type: 'checkbox',
          },
          {
            name: 'saleInvoiceTimeoutHours',
            subName: 'saleInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'batch Stage Alarm',
            subName: 'batchStageAlarm',
            type: 'checkbox',
          },
          {
            name: 'requestServiceStatusProcessing',
            subName: 'requestServiceStatusProcessing',
            type: 'checkbox',
          },
          {
            name: 'salereturnInvoiceTimeoutHours',
            subName: 'salereturnInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'order plan operation same quantity',
            subName: 'orderPlanOperationSameQuantity',
            type: 'checkbox',
          },
          {
            name: 'requestServiceStatusReady',
            subName: 'requestServiceStatusReady',
            type: 'checkbox',
          },
          {
            name: 'transactionEditParamhours',
            subName: 'transactionEditParamhours',
            type: 'number',
          },
        ],
        [
          {
            name: 'order plan operation update',
            subName: 'orderPlanOperationUpdate',
            type: 'checkbox',
          },
          {
            name: 'colorvariantconfirm',
            subName: 'colorvariantconfirm',
            type: 'checkbox',
          },
          {
            name: 'productionInternalInvoiceTimeoutHours',
            subName: 'productionInternalInvoiceTimeoutHours',
            type: 'number',
          },
        ],
        [
          {
            name: 'batch stage repair confirm',
            subName: 'batchStageRepairConfirm',
            type: 'checkbox',
          },
          {
            name: 'batchProductionInvoiceConfirm',
            subName: 'batchProductionInvoiceConfirm',
            type: 'checkbox',
          },
          {
            name: 'canSetCurrentQtyForSewBarcode',
            subName: 'canSetCurrentQtyForSewBarcode',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'hr Resend Btn',
            subName: 'hrResendBtn',
            type: 'checkbox',
          },
          {
            name: 'planning_batch',
            subName: 'planningBatch',
            type: 'checkbox',
          },
          {
            name: 'canExpenseBatchColorVariant',
            subName: 'canExpenseBatchColorVariant',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'e repair status',
            subName: 'eRepairStatus',
            type: 'checkbox',
          },
          {
            name: 'batchNumberAccess',
            subName: 'batchNumberAccess',
            type: 'checkbox',
          },
          {
            name: 'iplikLotStavkaEdit',
            subName: 'iplikLotStavkaEdit',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'I repair status',
            subName: 'iRepairStatus',
            type: 'checkbox',
          },
          {
            name: 'batchNumberSequenceAccess',
            subName: 'batchNumberSequenceAccess',
            type: 'checkbox',
          },
          {
            name: 'iplikLotStavkaPlan',
            subName: 'iplikLotStavkaPlan',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'market Discount',
            subName: 'marketDiscount',
            type: 'checkbox',
          },
          {
            name: 'batchProductionExtraItem',
            subName: 'batchProductionExtraItem',
            type: 'checkbox',
          },
          {
            name: 'iplikLotStavkaRezerv',
            subName: 'iplikLotStavkaRezerv',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'delete Design',
            subName: 'deleteDesign',
            type: 'checkbox',
          },
          {
            name: 'batchProductionAutoConfirm',
            subName: 'batchProductionAutoConfirm',
            type: 'checkbox',
          },
          {
            name: 'iplikLotStavkaStage',
            subName: 'iplikLotStavkaStage',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'copy Design',
            subName: 'copyDesign',
            type: 'checkbox',
          },
          {
            name: 'importTransactionsFromExcel',
            subName: 'importTransactionsFromExcel',
            type: 'checkbox',
          },
          {
            name: 'iplikLotStavkaDelete',
            subName: 'iplikLotStavkaDelete',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'make Design',
            subName: 'makeDesign',
            type: 'checkbox',
          },
          {
            name: 'changeUsedItemsPriceAccess',
            subName: 'changeUsedItemsPriceAccess',
            type: 'checkbox',
          },
          {
            name: 'iplikLotStavkaOpenCloseStatus',
            subName: 'iplikLotStavkaOpenCloseStatus',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'plan Access',
            subName: 'planAccess',
            type: 'checkbox',
          },
          {
            name: 'planConfirmAccess',
            subName: 'planConfirmAccess',
            type: 'checkbox',
          },
          {
            name: 'systemUserEdit',
            subName: 'systemUserEdit',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'recipe access',
            subName: 'recipeAccess',
            type: 'checkbox',
          },
          {
            name: 'allCompaniesAccessForReserv',
            subName: 'allCompaniesAccessForReserv',
            type: 'checkbox',
          },
          {
            name: 'sewModelOperationBarcodeDelete',
            subName: 'sewModelOperationBarcodeDelete',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'stage Access',
            subName: 'stageAccess',
            type: 'checkbox',
          },
          {
            name: 'canEditBatch',
            subName: 'canEditBatch',
            type: 'checkbox',
          },
          {
            name: 'sendPopupMessage',
            subName: 'sendPopupMessage',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'check Session',
            subName: 'checkSession',
            type: 'checkbox',
          },
          {
            name: 'canEditBatchDetails',
            subName: 'canEditBatchDetails',
            type: 'checkbox',
          },
          {
            name: 'checkInvoiceSaveImage',
            subName: 'checkInvoiceSaveImage',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'hr_access',
            subName: 'hrAccess',
            type: 'checkbox',
          },
          {
            name: 'canEditBatchStages',
            subName: 'canEditBatchStages',
            type: 'checkbox',
          },
          {
            name: 'checkInvoiceManuallyUploadImage',
            subName: 'checkInvoiceManuallyUploadImage',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'orderPaymentAccess',
            subName: 'orderPaymentAccess',
            type: 'checkbox',
          },
          {
            name: 'canEditBatchStageDetails',
            subName: 'canEditBatchStageDetails',
            type: 'checkbox',
          },
          {
            name: 'accessToDuedateProductionorder',
            subName: 'accessToDuedateProductionOrder',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'pay_invoice_access',
            subName: 'payInvoiceAccess',
            type: 'checkbox',
          },
          {
            name: 'canPrintBatch',
            subName: 'canPrintBatch',
            type: 'checkbox',
          },
          {
            name: 'Recive message on create order',
            subName: 'receiveMessageOnCreateOrder',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'make_bill_invoice_access',
            subName: 'makeBillInvoiceAccess',
            type: 'checkbox',
          },
          {
            name: 'canPrintBatchColorRecipe',
            subName: 'canPrintBatchColorRecipe',
            type: 'checkbox',
          },
          {
            name: 'canRemoveBatchColorVariant',
            subName: 'canRemoveBatchColorVariant',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Access Price',
            subName: 'accessPrice',
            type: 'checkbox',
          },
          {
            name: 'Product price change access',
            subName: 'productPriceChangeAccess',
            type: 'checkbox',
          },
          {
            name: 'startBatchStageWithAutostartPreviouses',
            subName: 'startBatchStageWithAutostartPreviouses',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'productionOrderConfirm',
            subName: 'productionOrderConfirm',
            type: 'checkbox',
          },
          {
            name: 'changeWeighDefaultParams',
            subName: 'changeWeighDefaultParams',
            type: 'checkbox',
          },
          {
            name: 'planConfirmedUndoAccess',
            subName: 'planConfirmedUndoAccess',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'market_invoice_delete',
            subName: 'marketInvoiceDelete',
            type: 'checkbox',
          },
          {
            name: 'invoiceItemCheckRealCountAccess',
            subName: 'invoiceItemCheckRealCountAccess',
            type: 'checkbox',
          },
          {
            name: 'accessToInvoiceHeader',
            subName: 'accessToInvoiceHeader',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'sale_price_view',
            subName: 'salePriceView',
            type: 'checkbox',
          },
          {
            name: 'prOrderHeaderCurrenyHideParam',
            subName: 'prOrderHeaderCurrencyHideParam',
            type: 'checkbox',
          },
          {
            name: 'accessChangeDateAsToday',
            subName: 'accessChangeDateAsToday',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'sale_qty3_access',
            subName: 'saleQty3Access',
            type: 'checkbox',
          },
          {
            name: 'telegramBotAccess',
            subName: 'telegramBotAccess',
            type: 'checkbox',
          },
          {
            name: 'sendInvoiceWithQrCode',
            subName: 'sendInvoiceWithQrCode',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'transaction_ref_saldo_view',
            subName: 'transactionRefSaldoView',
            type: 'checkbox',
          },
          {
            name: 'planChangeAccess',
            subName: 'planChangeAccess',
            type: 'checkbox',
          },
          {
            name: 'receiveInvoiceWithQrCode',
            subName: 'receiveInvoiceWithQrCode',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'canMakeTransactionsCredit',
            subName: 'canMakeTransactionsCredit',
            type: 'checkbox',
          },
          {
            name: 'canMakeTransactionsDebit',
            subName: 'canMakeTransactionsDebit',
            type: 'checkbox',
          },
          {
            name: 'batchCancelEndStage',
            subName: 'batchCancelEndStage',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Drilling confirm access',
            subName: 'drillingConfirmAccess',
            type: 'checkbox',
          },
          {
            name: 'Explosion confirm access',
            subName: 'explosionConfirmAccess',
            type: 'checkbox',
          },
          {
            name: 'canCreateBatchStages',
            subName: 'canCreateBatchStages',
            type: 'number',
          },
        ],
        [
          {
            name: 'canCloneTransactionAccess',
            subName: 'canCloneTransactionAccess',
            type: 'checkbox',
          },
          {
            name: 'Can Remove Invoice Item',
            subName: 'canRemoveInvoiceItem',
            type: 'checkbox',
          },
          {
            name: 'Sale To Person Access',
            subName: 'saleToPersonAccess',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Access To Price Changes',
            subName: 'accessToPriceChanges',
            type: 'checkbox',
          },
          {
            name: 'Create Company With Special Access',
            subName: 'createCompanyWithSpecialAccess',
            type: 'checkbox',
          },
          {
            name: 'Access for Return Barcode',
            subName: 'accessForReturnBarcode',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Access for knittingSewModelBarcodeReaderQty2',
            subName: 'accessForKnittingSewModelBarcodeReaderQty2',
            type: 'checkbox',
          },
          {
            name: 'Access for Batch Detail Priority',
            subName: 'accessForBatchDetailPriority',
            type: 'checkbox',
          },
          {
            name: 'Access To Open Plannings By Production Order',
            subName: 'accessToOpenPlanningsByProductionOrder',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'clientOrderProductionOrderAccess',
            subName: 'clientOrderProductionOrderAccess',
            type: 'checkbox',
          },
          {
            name: 'canDeleteProductionItemByEquipment',
            subName: 'canDeleteProductionItemByEquipment',
            type: 'checkbox',
          },
          {
            name: 'saveAndCreateAllSewModelBarcode',
            subName: 'saveAndCreateAllSewModelBarcode',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Change FaceId Camera Ids',
            subName: 'changeFaceIdCameraIds',
            type: 'checkbox',
          },
          {
            name: 'Change Camera Rotation',
            subName: 'changeCameraRotation',
            type: 'checkbox',
          },
        ],
      ]
      this.sysUserElementData = subData
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
