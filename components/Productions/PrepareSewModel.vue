<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="columnConfigBtnClickType ? rightDataOperation : rightDataRecipe"
        :left="columnConfigBtnClickType ? leftDataOperation : leftDataRecipe"
        :url="
          columnConfigBtnClickType
            ? 'sewModelOperationTable'
            : 'sewModelItemRecipeTable'
        "
        :createedit="true"
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
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{ pageID ? 'Edit' : 'Add' }} Sew Model
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
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="goBackAction"
          />
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
              <tr
                class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
              >
                <td
                  colspan="2"
                  class="w-[150px] border-[1px] border-solid border-[#778899] p-[3px_0_3px_10px]"
                >
                  <span class="flex items-center gap-1">
                    <generic-button
                      v-if="saveEditBtnType"
                      type="primary"
                      name="Save"
                      @click="saveAction"
                    />
                    <generic-button
                      v-else
                      type="success"
                      name="Edit"
                      icon-name-attribute="edit"
                      @click="editAction"
                    />
                    <generic-button
                      v-if="pageID && saveEditBtnType"
                      name="Cancel"
                      icon-name-attribute="cencel"
                      @click="cancelAction"
                    />
                    <template v-if="!isNaN($route.path.split('/').at(-1))">
                      <generic-button
                        v-for="(elem, inx) in allBtnName"
                        :key="inx"
                        :name="elem?.name"
                        :type="elem?.type"
                        :icon-name-attribute="elem?.iconName"
                        @click="allBtnAction(elem.clickType)"
                      />
                    </template>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="sewModelImageShowHide"
            class="w-full h-fit border-[1px] border-solid border-[#778899] shadow-lg p-2 flex flex-col items-start gap-2"
          >
            <span class="text-[18px] text-[#317EAC] font-semibold"
              >Upload And Save</span
            >
            <generic-image-upload />
            <generic-button name="Save" type="primary" />
          </div>

          <!-- --START-- Sew Model Variant Size BTN click -->
          <div v-if="sewModelVariantSizeShowHide" class="m-2">
            <span class="text-[14px]"
              >Operation.
              <strong class="text-[14px] text-[rgb(156,0,78)]"
                >Parent ID = {{ pageID }}</strong
              ></span
            >
            <div class="flex gap-1 flex-wrap">
              <span v-if="hideButton" class="flex gap-1 flex-wrap">
                <GenericButton
                  name="Save"
                  type="primary"
                  @click="saveSewModelVariantSizeAction"
                />
                <GenericButton
                  name="Discard"
                  @click="discardSewModalVariantSizeAction"
                />
              </span>
              <GenericButton
                v-else
                name="Edit"
                type="success"
                icon-name-attribute="edit"
                @click="editSewModalVariantSizeAction"
              />
            </div>
            <GenericPrepareTablePage
              ref="sewModelVariantSizeRef"
              department-name="production"
              :addmodalorrow="false"
              :tablehead="sewModelVariantSizeHead"
              :tableheadlength="sewModelVariantSizeHead.length"
              :response-data="sewModelVariantSizeBody"
              :ui-show-hide="uiShowHide"
              :isedit="isEdit"
              :height="450"
              delete-url-row="sewModel/prepareCreateEditSewModelSize"
              class="bg-[rgba(255,255,255,0.5)] mt-1"
              @rowValues="getRowElements"
            />
          </div>
          <!-- --END-- Sew Model Variant Size BTN click -->
        </div>

        <!-- --START-- Sew Operation BTN click -->
        <div v-if="sewModelOperationShowHide" class="m-2">
          <span class="text-[14px]"
            >Operation.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <GenericButton
              name="Column Setting"
              type="info"
              icon-name-attribute="setting"
              @click="openColumnConfig('operation')"
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
            ref="sewModelOperationRef"
            department-name="production"
            :addmodalorrow="false"
            :tablehead="sewModelOperationHead"
            :tableheadlength="sewModelOperationHead.length"
            :response-data="sewModelOperationBody"
            :ui-show-hide="uiShowHideOperation"
            :isedit="isEditOperation"
            :height="450"
            delete-url-row="sewModel/prepareCreateEditSewModelOperation"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="getRowElementsOperation"
          />
        </div>
        <!-- --END-- Sew Operation BTN click -->

        <!-- --START-- Sew Model Recipe BTN click -->
        <div v-if="sewModelRecipeShowHide" class="m-2">
          <span class="text-[14px]"
            >sewModelRecipe.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <GenericButton
              name="Column Setting"
              type="info"
              icon-name-attribute="setting"
              @click="openColumnConfig('recipe')"
            />
            <span v-if="hideButtonRecipe" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="saveSewModelRecipeAction"
              />
              <GenericButton
                name="Discard"
                @click="discardSewModalRecipeAction"
              />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="editSewModalRecipeAction"
            />
          </div>
          <GenericPrepareTablePage
            ref="sewModelRecipeRef"
            department-name="production"
            :addmodalorrow="false"
            :tablehead="sewModelRecipeHead"
            :tableheadlength="sewModelRecipeHead.length"
            :response-data="sewModelRecipeBody"
            :ui-show-hide="uiShowHideRecipe"
            :isedit="isEditRecipe"
            :height="450"
            delete-url-row="sewModel/prepareCreateEditSewModelRecipe"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="getRowElementsRecipe"
          />
        </div>
        <!-- --EDN-- Sew Model Recipe BTN click -->
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
import GenericImageUpload from '@generics/GenericImageUpload.vue'
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
    GenericImageUpload,
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
      // column config recipe uchun
      tableDataRecipe: [],
      tableDataRecipe2: [],
      rightMapRecipe: {},
      leftMapRecipe: {},
      rightDataRecipe: {},
      leftDataRecipe: {},
      // column config recipe uchun
      dateDefValue: null,
      allInputAndLookUpValue: {},
      elementData: [],
      allBtnName: [],
      saveEditBtnType: false,
      editData: {},
      sewModelVariantSizeHead: [],
      sewModelVariantSizeBody: [],
      sewModelOperationHead: [],
      sewModelOperationBody: [],
      sewModelRecipeHead: [],
      sewModelRecipeBody: [],
      uiShowHide: false,
      uiShowHideOperation: false,
      uiShowHideRecipe: false,
      isEdit: false,
      isEditOperation: false,
      isEditRecipe: false,
      hideButton: false,
      hideButtonOperation: false,
      hideButtonRecipe: false,
      sewModelVariantSizeShowHide: false,
      sewModelOperationShowHide: false,
      sewModelRecipeShowHide: false,
      sewModelImageShowHide: false,
      sewModelSizeItemList: [],
      sewModelOperationList: [],
      sewModelRecipeItemList: [],
      columnConfigBtnClickType: true,
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.pageID ? (this.saveEditBtnType = false) : (this.saveEditBtnType = true)
    if (this.pageID) {
      this.getTableRequest(this.pageID)
      this.isEdit = true
      this.isEditOperation = true
      this.isEditRecipe = true
      this.hideButton = false
      this.hideButtonOperation = false
      this.hideButtonRecipe = false
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
    openColumnConfig(btnClickType) {
      this.checkModal = true

      btnClickType === 'operation'
        ? (this.columnConfigBtnClickType = true)
        : (this.columnConfigBtnClickType = false)
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // go back action
    goBackAction() {
      this.$router.push('/sewmodel.htm')
    },

    // edit sewModelVarintSize
    editSewModalVariantSizeAction() {
      this.hideButton = !this.hideButton

      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelVariantSizeRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // edit sewModelOperation
    editSewModalOperationAction() {
      this.hideButtonOperation = !this.hideButtonOperation

      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelOperationRef.getEditRowAction(this.pageID)
      this.uiShowHideOperation = false
    },

    // edit sewModelRecipe
    editSewModalRecipeAction() {
      this.hideButtonRecipe = !this.hideButtonRecipe

      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelRecipeRef.getEditRowAction(this.pageID)
      this.uiShowHideRecipe = false
    },

    // discard sewModelVarintSize
    discardSewModalVariantSizeAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelVariantSizeRef.arrayFiltered()

      this.hideButton = !this.hideButton
      this.uiShowHide = true
    },

    // discard sewModelOperation
    discardSewModalOperationAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelOperationRef.arrayFiltered()

      this.hideButtonOperation = !this.hideButtonOperation
      this.uiShowHideOperation = true
    },

    // discard sewModelOperation
    discardSewModalRecipeAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelRecipeRef.arrayFiltered()

      this.hideButtonRecipe = !this.hideButtonRecipe
      this.uiShowHideRecipe = true
    },

    // Filter Action
    responseDataFilter(headData) {
      this.sewModelVariantSizeHead = headData.filter((value) => {
        return value.showUI && value
      })
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

    // Filter Action
    responseDataFilterRecipe(headData) {
      this.sewModelRecipeHead = headData.filter((value) => {
        return value.showUI && value
      })

      // Column config Recipe uchun
      this.tableDataRecipe = this.sewModelRecipeHead
      this.tableDataRecipe2 = headData.filter((value) => {
        return !value.showUI && value
      })
    },

    getRowElements(arr, hideBtn) {
      this.sewModelSizeItemList = arr
      this.sewModelSizeItemList = this.sewModelSizeItemList.map((obj) => {
        if (obj.sewModel) {
          obj.sewModel = { id: obj.sewModel }
        }
        return obj
      })
      this.hideButton = !hideBtn
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

    getRowElementsRecipe(arr, hideBtn) {
      this.sewModelRecipeItemList = arr
      this.sewModelRecipeItemList = this.sewModelRecipeItemList.map((obj) => {
        if (obj.sewModel) {
          obj.sewModel = { id: obj.sewModel }
        }
        delete obj.objectId
        return obj
      })
      this.hideButtonRecipe = !hideBtn
    },

    // Save btn action
    saveSewModelVariantSizeAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelVariantSizeRef.getSaveRowAction()

      const body = {}
      body.id = this.pageID
      body.sewModelSizeItemList = this.sewModelSizeItemList

      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelSize`, body)
        .then(({ data }) => {
          this.sewModelVariantSizeBody = data?.sewModelSizeItem
          this.uiShowHide = true
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Save btn action
    saveSewModelOperationAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelOperationRef.getSaveRowAction()

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

    // Save btn action
    saveSewModelRecipeAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelRecipeRef.getSaveRowAction()

      const body = {}
      body.id = this.pageID
      body.sewModelRecipeItemList = this.sewModelRecipeItemList

      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelRecipe`, body)
        .then(({ data: { sewModelRecipeItemListJson } }) => {
          this.sewModelRecipeBody = sewModelRecipeItemListJson
          this.uiShowHideRecipe = true
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

      const btnData = [
        {
          name: 'Sew Model Variant Size',
          type: 'info',
          clickType: 'sewModelVariantSize',
        },
        {
          name: 'sewOperation',
          type: 'info',
          clickType: 'sewOperation',
        },
        {
          name: 'Delete',
          type: 'danger',
          clickType: 'delete',
          iconName: 'delete',
        },
        {
          name: 'Clone',
          clickType: 'clone',
          iconName: 'document-copy',
        },
        {
          name: 'Add Image',
          type: 'info',
          clickType: 'addImage',
        },
        {
          name: 'Change Price',
          type: 'danger',
          clickType: 'changePrice',
          iconName: 'delete',
        },
        {
          name: 'sewModelRecipe',
          type: 'info',
          clickType: 'sewModelRecipe',
        },
      ]
      this.allBtnName = btnData
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

    // Filter Action
    getFilterDataRecipe() {
      this.tableDataRecipe.forEach((obj) => {
        this.rightMapRecipe[obj.name] = obj
      })
      this.tableDataRecipe2.forEach((obj) => {
        this.leftMapRecipe[obj.name] = obj
      })

      this.rightDataRecipe = this.rightMapRecipe
      this.leftDataRecipe = this.leftMapRecipe
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
          // planningType: {
          //   id: parseFloat(this.allInputAndLookUpValue?.planningType),
          // },
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
            if (status === 200) this.$router.push('/sewmodel.htm')
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

    // sewModelVariantSize Btn Action
    sewModelVariantSizeBtnAction(id) {
      this.sewModelVariantSizeShowHide = true
      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelSize`, {
          id,
        })
        .then(({ data: { sewModelSizeItem, sewModelItemSizeTable } }) => {
          this.sewModelVariantSizeBody = sewModelSizeItem

          // function
          this.responseDataFilter(sewModelItemSizeTable)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
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

    // sewOperation Btn Action
    addImageBtnAction(id) {
      this.sewModelImageShowHide = true
      this.$axios
        .post(`/sewModel/sewModelimageList`, {
          id,
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // sewModelRecipe Btn Action
    sewModelRecipeBtnAction(id) {
      this.sewModelRecipeShowHide = true
      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelRecipe`, {
          id,
        })
        .then(({ data: { sewModelRecipeItemColumns, recipes } }) => {
          this.sewModelRecipeHead = sewModelRecipeItemColumns
          this.sewModelRecipeBody = recipes
          // function
          this.responseDataFilterRecipe(sewModelRecipeItemColumns)
          // function
          this.getFilterDataRecipe()
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // ALl buttons action
    allBtnAction(btnTypeProp) {
      if (btnTypeProp === 'sewModelVariantSize')
        this.pageID && this.sewModelVariantSizeBtnAction(this.pageID)
      else if (btnTypeProp === 'sewOperation')
        this.pageID && this.sewOperationBtnAction(this.pageID)
      else if (btnTypeProp === 'delete')
        this.$refs.messageBoxRef.open(this.pageID, btnTypeProp)
      else if (btnTypeProp === 'clone')
        this.$refs.messageBoxRef.open(this.pageID, btnTypeProp)
      else if (btnTypeProp === 'addImage')
        this.pageID && this.addImageBtnAction(this.pageID)
      else if (btnTypeProp === 'changePrice')
        this.$refs.messageBoxRef.open(this.pageID, btnTypeProp)
      else if (btnTypeProp === 'sewModelRecipe')
        this.pageID && this.sewModelRecipeBtnAction(this.pageID)
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
