<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="rightDataOperation"
        :left="leftDataOperation"
        url="sewModelOperationTable"
        :create-edit="true"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="$router.push('/designVariants.htm')"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Design Variant
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="@assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="@assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex flex-col items-start m-2 gap-2">
          <table class="w-full text-[13px]">
            <tbody>
              <tr
                v-for="(element, index) in elementData"
                :key="index"
                class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
              >
                <td
                  class="w-[150px] border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  {{ element?.name }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  >
                </td>
                <td
                  v-if="saveEditBtnType"
                  class="border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  <generic-look-up
                    v-if="element.type === 'select'"
                    :durl="element?.url"
                    :dparam="element.param"
                    dwidth="220"
                    :defvalue="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : ''
                    "
                    :name="element?.subName"
                    :popper-append-to-body="true"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input
                    v-else-if="element.type === 'text'"
                    width="220"
                    :value="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : ''
                    "
                    :type="element.type"
                    :name="element?.subName"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input
                    v-else-if="element.type === 'number'"
                    width="220"
                    :value="`${
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : ''
                    }`"
                    :type="element.type"
                    :name="element?.subName"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input-date-page
                    v-else-if="element.type === 'date'"
                    :value="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : dateDefValue
                        ? dateDefValue
                        : ''
                    "
                    width="220"
                    height="28"
                    pl="12"
                    pr="12"
                    pt="1"
                    pb="1"
                    textsize="13"
                    type="datetime-local"
                    valuecolor="rgba(0,0,0,0.7)"
                    :name="element.subName"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </td>
                <td
                  v-else
                  class="border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  <template v-if="element.subName === 'date'">{{
                    new Date(editData?.[element.subName])
                      .toLocaleString('en-GB')
                      .split(',')
                      .join('')
                  }}</template>
                  <template v-else>{{ editData?.[element.subName] }}</template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- --START-- Custom Table -->
        <div class="m-2">
          <span class="text-[14px]"
            >Color Variant Item.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
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
            <span v-if="hideButtonOperation" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="saveSewModelOperationAction"
              />
              <GenericButton
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
          </div>
          <GenericPrepareTablePage
            ref="customTableRef"
            department-name="production"
            :addmodalorrow="false"
            :tablehead="sewModelOperationHead"
            :tableheadlength="sewModelOperationHead.length"
            :response-data="sewModelOperationBody"
            :ui-show-hide="uiShowHideOperation"
            :is-edit="isEditOperation"
            :height="450"
            delete-url-row="sewModel/prepareCreateEditSewModelOperation"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="getRowElementsOperation"
          />
        </div>
        <!-- --END-- Custom Table -->
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    GenericInputDatePage,
    LoadingPage,
    GenericLookUp,
    MessageBox,
    GenericPrepareTablePage,
    ColumnConfigPage,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      pageID: null,
      // column config operation uchun
      tableDataOperation: [],
      tableDataOperation2: [],
      rightMapOperation: {},
      leftMapOperation: {},
      rightDataOperation: {},
      leftDataOperation: {},
      // column config operation uchun
      dateDefValue: null,
      allInputAndLookUpValue: {},
      elementData: [],
      saveEditBtnType: false,
      editData: {},
      sewModelOperationHead: [],
      sewModelOperationBody: [],
      uiShowHideOperation: false,
      isEditOperation: false,
      hideButtonOperation: false,
      sewModelOperationShowHide: false,
      sewModelOperationList: [],
      columnConfigBtnClickType: true,
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.pageID ? (this.saveEditBtnType = false) : (this.saveEditBtnType = true)
    if (this.pageID) {
      this.getTableRequest(this.pageID)
      this.isEditOperation = true
      this.hideButtonOperation = false
    }
  },

  // MOUNTED
  mounted() {
    this.dateDefValue = new Date().toISOString().split('.')[0]
    // function
    this.dataCreatedAction()
  },

  // METHODS
  methods: {
    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
      this.columnConfigBtnClickType = true
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // edit sewModelOperation
    editSewModalOperationAction() {
      this.hideButtonOperation = !this.hideButtonOperation

      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getEditRowAction(this.pageID)
      this.uiShowHideOperation = false
    },

    // discard sewModelOperation
    discardSewModalOperationAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.arrayFiltered()

      this.hideButtonOperation = !this.hideButtonOperation
      this.uiShowHideOperation = true
    },

    // Filter Action
    responseDataFilterOperation(headData) {
      this.sewModelOperationHead = headData.filter((value) => {
        return value.showUI && value
      })

      // Column config Operation uchun
      this.tableDataOperation = this.sewModelOperationHead
      this.tableDataOperation2 = headData.filter((value) => {
        return !value.showUI && value
      })
    },

    getRowElementsOperation(arr, hideBtn) {
      this.sewModelOperationList = arr
      this.sewModelOperationList = this.sewModelOperationList.map((obj) => {
        if (obj.sewModel) {
          obj.sewModel = { id: obj.sewModel }
        }
        delete obj.objectId
        return obj
      })
      this.hideButtonOperation = !hideBtn
    },

    // Save btn action
    saveSewModelOperationAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getSaveRowAction()

      const body = {}
      body.id = this.pageID
      body.sewModelOperationList = this.sewModelOperationList

      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelOperation`, body)
        .then(({ data: { sewModelOperationListJson } }) => {
          this.sewModelOperationBody = sewModelOperationListJson
          this.uiShowHideOperation = true
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Date',
          subName: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'Sew Model Code',
          subName: 'code',
          type: 'text',
          required: true,
        },
        {
          name: 'Product',
          subName: 'product',
          type: 'select',
          url: 'searchProductList',
          param: { planningTypeTypeId: '4' },
          required: false,
        },
        {
          name: 'Name',
          subName: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'Variant',
          subName: 'variant',
          type: 'number',
          required: true,
        },
        {
          name: 'Description',
          subName: 'description',
          type: 'text',
          required: false,
        },

        {
          name: 'Style',
          subName: 'style',
          type: 'text',
          required: false,
        },
        {
          name: 'Company',
          subName: 'company',
          type: 'select',
          url: 'findAllCompany',
          param: { branchcompany: false },
          required: false,
        },
        {
          name: 'Planning type',
          subName: 'planningType',
          type: 'select',
          url: 'findAllPlanningType',
          param: { planningTypesStr: '14' },
          required: false,
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest(pageID) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sewModel/prepareSewModelAjaxLoad`, {
          id: pageID,
          page_current: 1,
          page_size: 25,
        })
        .then(({ data: { sewModelJson } }) => {
          this.isLoading = !this.isLoading
          if (pageID) {
            this.editData.date = new Date(sewModelJson?.date)
              .toISOString()
              .split('.')[0]
            this.editData.code = sewModelJson?.code
            this.editData.product = sewModelJson?.product?.text
            this.editData.productId = sewModelJson?.product?.id
            this.editData.name = sewModelJson?.name
            this.editData.variant = sewModelJson?.variant
            this.editData.description = sewModelJson?.description
            this.editData.style = sewModelJson?.style
            this.editData.company = sewModelJson?.company?.text
            this.editData.companyId = sewModelJson?.company?.id
            this.editData.planningType = sewModelJson?.planningType

            this.allInputAndLookUpValue.date = new Date(sewModelJson?.date)
              .toISOString()
              .split('.')[0]
            this.allInputAndLookUpValue.id = sewModelJson?.id
            this.allInputAndLookUpValue.code = sewModelJson?.code
            this.allInputAndLookUpValue.product = {
              id: sewModelJson?.product?.id,
            }
            this.allInputAndLookUpValue.name = sewModelJson?.name
            this.allInputAndLookUpValue.variant = sewModelJson?.variant
            this.allInputAndLookUpValue.description = sewModelJson?.description
            this.allInputAndLookUpValue.style = sewModelJson?.style
            this.allInputAndLookUpValue.company = {
              id: sewModelJson?.company?.id,
            }
          }
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Filter Action
    getFilterData() {
      this.tableDataOperation.forEach((obj) => {
        this.rightMapOperation[obj.name] = obj
      })
      this.tableDataOperation2.forEach((obj) => {
        this.leftMapOperation[obj.name] = obj
      })

      this.rightDataOperation = this.rightMapOperation
      this.leftDataOperation = this.leftMapOperation
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      if (name === 'company' || name === 'product') {
        this.$set(this.allInputAndLookUpValue, name, { id: value })
      } else {
        this.$set(this.allInputAndLookUpValue, name, value)
      }
    },

    cancelAction() {
      this.saveEditBtnType = false
    },

    // Save
    saveAction() {
      let sewModel = {}
      if (this.pageID) {
        sewModel = this.allInputAndLookUpValue
      } else {
        sewModel = {
          code: this.allInputAndLookUpValue?.code,
          company: this.allInputAndLookUpValue?.company,
          date:
            this.allInputAndLookUpValue?.date ||
            new Date().toISOString().split('.')[0],
          description: this.allInputAndLookUpValue?.description,
          name: this.allInputAndLookUpValue?.name,
          product: this.allInputAndLookUpValue?.product,
          style: this.allInputAndLookUpValue?.style,
          variant: this.allInputAndLookUpValue?.variant,
        }
      }

      if (
        sewModel?.date &&
        sewModel?.code &&
        sewModel?.name &&
        sewModel?.variant
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/sewModel/prepareCreateEditSewModel`, {
            sewModel,
          })
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            this.$router.push('/sewmodel.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Edit Action
    editAction() {
      this.saveEditBtnType = true
    },

    // Message box action
    getEmitProp(propMessage, id, btnTypeProp) {
      if (propMessage === 'confirm' && btnTypeProp === 'delete') {
        this.$axios
          .delete(`/sewModel/prepareSewmodelDelete`, {
            data: {
              deleteItemId: id,
            },
          })
          .then(({ status }) => {
            if (status < 300) this.$router.push('/sewmodel.htm')
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (propMessage === 'confirm' && btnTypeProp === 'clone') {
        this.$axios
          .post(`/sewModel/sewModelCloneUrl`, {
            id,
          })
          .then(({ data: { sewModelJson } }) => {
            const customSewModelJson = {}
            customSewModelJson.date = new Date(sewModelJson?.date)
              .toISOString()
              .split('.')[0]
            customSewModelJson.id = this.pageID
            customSewModelJson.code = sewModelJson?.code
            customSewModelJson.product = sewModelJson?.product?.text
            customSewModelJson.productId = sewModelJson?.product?.id
            customSewModelJson.name = sewModelJson?.name
            customSewModelJson.variant = sewModelJson?.variant
            customSewModelJson.description = sewModelJson?.description
            customSewModelJson.style = sewModelJson?.style
            customSewModelJson.company = sewModelJson?.company?.text
            customSewModelJson.companyId = sewModelJson?.company?.id
            customSewModelJson.planningType = sewModelJson?.planningType
            this.editData = customSewModelJson
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (propMessage === 'confirm' && btnTypeProp === 'changePrice') {
        this.$axios
          .put(`/sewModel/prepareSewModelChangePrice`, {
            id,
          })
          .then(({ data }) => {})
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // sewOperation Btn Action
    sewOperationBtnAction(id) {
      this.sewModelOperationShowHide = true
      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelOperation`, {
          id,
        })
        .then(
          ({
            data: { sewModelOperationColumns, sewModelOperationListJson },
          }) => {
            this.sewModelOperationHead = sewModelOperationColumns
            this.sewModelOperationBody = sewModelOperationListJson
            // function
            this.responseDataFilterOperation(sewModelOperationColumns)
            // function
            this.getFilterData()
          }
        )
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
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
