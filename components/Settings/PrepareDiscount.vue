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
          @click="$router.push('/discounts.htm')"
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
              <span v-if="row?.name" class="font-semibold"
                >{{ row?.name }}
                <span v-if="row?.required" class="text-[16px] text-red-500"
                  >*</span
                >
              </span>
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
                  typeof discountJson?.[row?.subName] === 'object'
                    ? discountJson?.[row?.subName]?.text
                    : discountJson?.[row?.subName]
                    ? discountJson?.[row?.subName]
                    : ''
                }}
              </template>
              <template
                v-else-if="
                  row?.type === 'inputText' ||
                  row?.type === 'number' ||
                  row?.type === 'textarea'
                "
              >
                <template v-if="pageID && !hideButton">{{
                  typeof discountJson?.[row?.subName] === 'object'
                    ? discountJson?.[row?.subName]?.text
                    : discountJson?.[row?.subName]
                }}</template>
                <generic-input
                  v-else
                  :name="row?.subName"
                  width="100"
                  widthtype="%"
                  :value="discountJson?.[row?.subName]"
                  :type="row?.type"
                  :required="
                    !row?.required ||
                    allSelectAndInputValue?.[row?.subName] ||
                    discountJson?.[row?.subName]
                      ? true
                      : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <template v-else-if="row?.type === 'select'">
                <template v-if="pageID && !hideButton">{{
                  typeof discountJson?.[row?.subName] === 'object'
                    ? discountJson?.[row?.subName]?.text
                    : discountJson?.[row?.subName]
                }}</template>
                <generic-look-up
                  v-else
                  :name="row?.subName"
                  dwidth="100"
                  widthtype="%"
                  :defvalue="discountJson?.[row?.subName]?.text"
                  durl="findAllAccessTypes"
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <span
                v-else-if="row?.type === 'radio'"
                class="text-green-500 font-medium"
              >
                <template v-if="pageID && !hideButton">{{
                  allSelectAndInputValue?.active ||
                  Boolean(discountJson?.active)
                    ? 'Enabled'
                    : 'Disabled'
                }}</template>
                <template v-else>
                  <el-radio
                    v-for="(elem, inx) in row?.list"
                    :key="inx"
                    v-model="radio"
                    :label="elem?.subName"
                  ></el-radio>
                </template>
              </span>
            </td>
          </tr>
          <tr
            v-if="!pageID"
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td colspan="9" class="border-[1px] border-solid border-[#778899]">
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
          >Discount Item.
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
            v-if="pageID"
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
          delete-url-row="discount/prepareDeleteDiscountItemUrl"
          class="bg-[rgba(255,255,255,0.5)] mt-1"
          @rowValues="getRowElements"
        />
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
import GenericInput from '@generics/GenericInput.vue'
export default {
  components: {
    GenericButton,
    LoadingPage,
    MessageBox,
    GenericPrepareTablePage,
    ColumnConfigPage,
    GenericLookUp,
    GenericInput,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      pageID: null,
      elementData: [],
      headData: [],
      bodyData: [],
      discountJson: {},
      uiShowHide: false,
      isEdit: null,
      hideButton: null,
      allSelectAndInputValue: {},
      isAccept: false,
      radio: 'Enabled',
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

  computed: {
    headDataFiltered() {
      return this.headData.filter((item) => item.showUI)
    },
  },

  // WATCH
  watch: {
    radio(newVal) {
      if (newVal === 'Enabled') this.allSelectAndInputValue.active = true
      else if (newVal === 'Disabled') this.allSelectAndInputValue.active = false
      else this.allSelectAndInputValue.active = false
    },
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
    this.allSelectAndInputValue.active = true
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
      if (this.allSelectAndInputValue.name && this.allSelectAndInputValue.code)
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
        .post(`/discount/prepareDiscount`, body)
        .then(({ data: { discountItemColumns, discountJson } }) => {
          this.actionUrl = 'productionOrderItemTable'
          this.discountJson = discountJson
          this.headData = discountItemColumns
          this.bodyData = discountJson?.productItems
          if (pageID) {
            this.radio = discountJson.active ? 'Enabled' : 'Disabled'
          }
          this.isLoading = !this.isLoading
        })
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
      let newArr = []
      this.headDataFiltered.forEach((obj) => {
        if (!obj?.param) {
          newArr = resArray
            .map((innerObj) => {
              if (obj?.name in innerObj) {
                const newObj = { [obj?.name]: innerObj?.[obj?.name] }
                return newObj
              }
              return null
            })
            .filter((item) => item !== null)
        }
      })
      return newArr
    },
    // Response dan qaytgan data ni filter qilish

    // EMIT action
    getRowElements(arr, hideBtn) {
      // function
      const newResArr = this.responseArrayFilteredAction(arr)
      this.hideButton = !hideBtn
      // Start Request body
      const discount = {}
      if (this.pageID) {
        discount.id = this.pageID
        discount.active =
          this.allSelectAndInputValue?.active ??
          this.discountJson?.active ??
          false
        discount.branchCompany = {
          id:
            this.allSelectAndInputValue?.branchCompany ??
            this.discountJson?.branchCompany?.id ??
            '',
        }
        discount.code =
          this.allSelectAndInputValue?.code ?? this.discountJson?.code ?? ''
        discount.description =
          this.allSelectAndInputValue?.description ??
          this.discountJson?.description ??
          ''
        discount.fixedAmount =
          this.allSelectAndInputValue?.fixedAmount ??
          this.discountJson?.fixedAmount ??
          ''
        discount.maxAmount =
          this.allSelectAndInputValue?.maxAmount ??
          this.discountJson?.maxAmount ??
          ''
        discount.name =
          this.allSelectAndInputValue?.name ?? this.discountJson?.name ?? ''
        discount.percentage =
          this.allSelectAndInputValue?.percentage ??
          this.discountJson?.percentage ??
          ''
      } else {
        discount.active = this.allSelectAndInputValue?.active ?? false
        discount.branchCompany = {
          id: this.allSelectAndInputValue?.branchCompany ?? '',
        }
        discount.code = this.allSelectAndInputValue?.code ?? ''
        discount.description = this.allSelectAndInputValue?.description ?? ''
        discount.fixedAmount = this.allSelectAndInputValue?.fixedAmount ?? ''
        discount.maxAmount = this.allSelectAndInputValue?.maxAmount ?? ''
        discount.name = this.allSelectAndInputValue?.name ?? ''
        discount.percentage = this.allSelectAndInputValue?.percentage ?? ''
      }
      // List set qilish
      discount.productItems = newResArr
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/discount/prepareCreateEditDiscount`, {
          discount,
        })
        .then(
          ({
            data: {
              discountItemColumns: { id, productItems },
            },
          }) => {
            this.uiShowHide = true
            if (!this.pageID) {
              this.$router.push(`prepareDiscount.htm/${id}`)
            } else this.pageRequestAction(this.pageID)
            this.bodyData = productItems
            this.isLoading = !this.isLoading
            this.$notification(`Ma'lumot saqlandi!`, 'Success', 'success')
          }
        )
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
    getEmitProp(propMessage, id, index, actionName) {
      // Delete Action
      if (actionName === 'delete') {
        this.isLoading = !this.isLoading
        if (propMessage === 'confirm') {
          this.$axios
            .delete(`/discount/prepareDeleteDiscountItemUrl`, {
              data: {
                deleteItemId: id,
              },
            })
            .then(({ status }) => {
              this.$notification('Successfully Deleted', 'Deleted', 'success')
              if (status < 300) this.$router.push('/discounts.htm')
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

    // Data created
    dataCreatedAction() {
      const data = [
        {
          width: '200',
          name: 'Name',
          subName: 'name',
          required: true,
          type: 'inputText',
        },
        {
          width: '200',
          name: 'Code',
          subName: 'code',
          required: true,
          type: 'inputText',
        },
        {
          width: '200',
          name: 'Company Branch',
          subName: 'branchCompany',
          type: 'select',
        },
        {
          width: '200',
          name: 'Description',
          subName: 'description',
          type: 'textarea',
        },
        {
          width: '200',
          name: 'Status',
          type: 'radio',
          list: [{ subName: 'Enabled' }, { subName: 'Disabled' }],
        },
        {
          width: '200',
          name: 'Date',
          subName: 'date',
          type: 'text',
        },
        {
          width: '150',
          name: 'Percentage',
          subName: 'percentage',
          type: 'number',
        },
        {
          width: '150',
          name: 'Fixed Amount',
          subName: 'fixedAmount',
          type: 'number',
        },
        {
          width: '150',
          name: 'Max Amount',
          subName: 'maxAmount',
          type: 'number',
        },
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
