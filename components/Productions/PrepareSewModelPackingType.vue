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
          name="Go Back"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('/sewModelPackingType.htm')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Sew Model Packing Type
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
              class="border-[1px] border-solid border-[#778899] p-1 font-medium"
              :style="{ width: `${row?.width}px !important` }"
            >
              {{ row?.name }}
              <span v-if="row?.required" class="text-red-600 text-[16px]"
                >*</span
              >
            </td>
            <td class="border-[1px] border-solid border-[#778899] p-1">
              <template v-if="row?.type === 'text'">
                <template v-if="row?.disabled">{{
                  editData?.[row?.subName]
                }}</template>
                <generic-input
                  v-else
                  :name="row?.subName"
                  :width="row?.width"
                  :disabled="row?.disabled"
                  :required="
                    allSelectAndInputValue?.[row?.subName] ? true : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <template v-else-if="row?.type === 'select'">
                <template v-if="row?.disabled">{{
                  editData?.[row?.subName]?.text
                }}</template>
                <generic-look-up
                  v-else
                  :name="row?.subName"
                  :dwidth="row?.width"
                  durl="findAllSewModel"
                  :disabled="row?.disabled"
                  :required="
                    allSelectAndInputValue?.[row?.subName] ? true : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <template v-else-if="row?.type === 'number'">
                <template v-if="row?.disabled">{{
                  editData?.[row?.subName]
                }}</template>
                <generic-input
                  v-else
                  :name="row?.subName"
                  type="number"
                  :width="row?.width"
                  :disabled="row?.disabled"
                  :required="
                    allSelectAndInputValue?.[row?.subName] ? true : false
                  "
                  @customFunction="getSelectAndInputsValueAction"
                />
              </template>
              <template v-else-if="row?.type === 'label'">
                <template v-if="row?.disabled">{{
                  editData?.[row?.subName]
                }}</template>
              </template>
            </td>
          </tr>
          <tr
            v-if="!pageID"
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td
              colspan="2"
              class="border-[1px] border-solid border-[#778899] p-1"
            >
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
          >Sew Model Packing Type Items
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
            @click="editSewModalOperationAction"
          />
          <GenericButton
            name="Delete"
            type="danger"
            icon-name-attribute="delete"
            @click="deleteAction"
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
          delete-url-row="sewModelPackingTypes/prepareSewModelPackingTypeDeleteItem"
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
export default {
  components: {
    GenericButton,
    LoadingPage,
    MessageBox,
    GenericPrepareTablePage,
    ColumnConfigPage,
    GenericInput,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      pageID: null,
      // column config uchun
      tableData: [],
      tableData2: [],
      rightMap: {},
      leftMap: {},
      rightData: {},
      leftData: {},
      // column config uchun
      elementData: [],
      editData: {},
      headData: [],
      bodyData: [],
      uiShowHide: false,
      isEdit: null,
      hideButton: null,
      actionUrl: null,
      allSelectAndInputValue: {},
      isAccept: false,
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

    // get LookUps and Inputs value
    getSelectAndInputsValueAction(name, value) {
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Accept action
    acceptAction() {
      if (
        this.allSelectAndInputValue.name &&
        this.allSelectAndInputValue.sewModel &&
        this.allSelectAndInputValue.miniPackQty
      )
        this.isAccept = true
      else this.isAccept = false
    },

    // PAGE request
    getTableRequest(pageID) {
      const body = {}
      body.page_current = 1
      body.page_size = this.pageSize_value
      if (pageID) body.id = pageID

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sewModelPackingTypes/prepareSewModelPackingTypeAjaxLoad`, body)
        .then(
          ({
            data: { sewModelPackingTypeItemColumns, sewModelPackingTypeJson },
          }) => {
            this.actionUrl = ''
            this.headData = sewModelPackingTypeItemColumns
            this.bodyData = sewModelPackingTypeJson?.sewModelPackingTypeItems
            this.editData = sewModelPackingTypeJson
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
    editSewModalOperationAction() {
      this.hideButton = !this.hideButton

      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // discard sewModelOperation
    discardSewModalOperationAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.arrayFiltered()

      this.hideButton = !this.hideButton
      this.uiShowHide = true
    },

    // object value filtered action
    responseArrayFilteredAction(resArray) {
      // bu loop ichidagi shart custom table to'g'rilansa olib tashlanadi
      this.bodyData = resArray.map((obj) => {
        if (obj?.sewModelPackingType) {
          obj.sewModelPackingType = { id: obj?.sewModelPackingType }
        }
        return obj
      })
      // bu loop ichidagi shart custom table to'g'rilansa olib tashlanadi
    },

    // EMIT action
    getRowElements(arr, hideBtn) {
      // function
      this.responseArrayFilteredAction(arr)
      this.hideButton = !hideBtn

      const sewModelPackingType = {}
      if (this.pageID) {
        sewModelPackingType.id = this.pageID
        sewModelPackingType.miniPackQty =
          this.allSelectAndInputValue?.miniPackQty ?? this.editData?.miniPackQty
        sewModelPackingType.name =
          this.allSelectAndInputValue?.name || this.editData?.name
        sewModelPackingType.sewModel = {
          id:
            this.allSelectAndInputValue?.sewModel ??
            this.editData?.sewModel?.id,
        }
        sewModelPackingType.sewModelPackingTypeItems = this.bodyData
      } else {
        sewModelPackingType.miniPackQty =
          this.allSelectAndInputValue?.miniPackQty
        sewModelPackingType.name = this.allSelectAndInputValue?.name
        sewModelPackingType.sewModel = {
          id: this.allSelectAndInputValue?.sewModel,
        }
        sewModelPackingType.sewModelPackingTypeItems = this.bodyData
      }

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sewModelPackingTypes/prepareCreateEditSewmodelPackingType`, {
          sewModelPackingType,
        })
        .then(({ data: { sewModelPackingTypeList } }) => {
          this.editData = sewModelPackingTypeList
          this.bodyData = sewModelPackingTypeList?.sewModelPackingTypeItems
          this.uiShowHide = true
          if (!this.pageID) {
            this.$router.push(
              `prepareSewModelPackingType.htm/${sewModelPackingTypeList?.id}`
            )
          }
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          width: '300',
          name: 'Name',
          subName: 'name',
          type: 'text',
          required: true,
          disabled: !!this.pageID,
        },
        {
          width: '300',
          name: 'Sew Model',
          subName: 'sewModel',
          type: 'select',
          required: true,
          disabled: !!this.pageID,
        },
        {
          width: '300',
          name: 'Qty',
          subName: 'miniPackQty',
          type: 'number',
          required: true,
          disabled: !!this.pageID,
        },
        {
          width: '300',
          name: 'Total pack item qty',
          subName: 'totalPackItemQty',
          type: 'label',
          required: false,
          disabled: !!this.pageID,
        },
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
          .delete(`/sewModelPackingTypes/prepareSewModelPackingTypeDelete`, {
            data: {
              deleteItemId: id,
            },
          })
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            if (status < 300) this.$router.push('/sewModelPackingType.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Save btn action
    saveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getSaveRowAction()
    },

    // Delete action
    deleteAction() {
      this.$refs.messageBoxRef.open(this.pageID)
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
