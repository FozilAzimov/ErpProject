<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />

    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="columnConfigBtnClickType ? rightDataDetails : rightDataStages"
        :left="columnConfigBtnClickType ? leftDataDetails : leftDataStages"
        :url="columnConfigBtnClickType ? 'batchDetailTable' : 'batchStageTable'"
        :createedit="true"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{ isNaN(pageID) ? 'Add' : 'Edit' }} Batch
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
        <div class="m-2 flex items-center gap-2">
          <generic-input
            :value="defaultValues?.years"
            type="number"
            name="goToBatch"
            placeholder="Go To Batch"
            @customFunction="getInputAndLookUpValueAction"
          />
          <generic-input
            value=""
            type="number"
            name="batchNum"
            placeholder="Batch number"
            @enter="topBatchNumberEnterAction"
            @customFunction="getInputAndLookUpValueAction"
          />
        </div>
        <div class="flex flex-col items-start m-2 gap-2">
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="$router.push('/batches.htm')"
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
                </td>

                <td
                  v-if="saveEditBtnShowHide"
                  class="border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  <look-up
                    v-if="element.type === 'select'"
                    :durl="
                      element.subName === 'equipments'
                        ? `productionReports/${element?.url}`
                        : `invoiceBase/${element?.url}`
                    "
                    :dparam="element.param"
                    dwidth="220"
                    :defvalue="''"
                    :name="element?.subName"
                    :popper-append-to-body="true"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <template
                    v-else-if="
                      element.type === 'number' || element.type === 'textarea'
                    "
                  >
                    <span
                      v-if="element.multiple"
                      class="flex items-center gap-1"
                    >
                      <generic-input
                        :width="element?.width"
                        :value="
                          defaultValues?.[element?.subName]
                            ? `${defaultValues?.[element?.subName]}`
                            : ''
                        "
                        :type="element.type"
                        :name="element?.subName"
                        @customFunction="getInputAndLookUpValueAction"
                      />
                      <generic-button type="primary" :name="element?.name2" />
                    </span>
                    <generic-input
                      v-else
                      :width="element?.width"
                      :value="''"
                      :type="element.type"
                      :name="element?.subName"
                      @customFunction="getInputAndLookUpValueAction"
                    />
                  </template>
                  <template v-else>{{
                    defaultValues[element?.subName]
                  }}</template>
                </td>

                <td
                  v-else
                  class="border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  <template v-if="element.subName === 'date'">{{
                    new Date().toLocaleString('en-GB').split(',').join('')
                  }}</template>
                  <template v-else></template>
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
                      v-if="saveEditBtnShowHide"
                      type="primary"
                      name="Save"
                      @click="saveAction()"
                    />
                    <generic-button
                      v-else
                      type="success"
                      name="Edit"
                      icon-name-attribute="edit"
                      @click="editAction()"
                    />
                    <generic-button
                      v-if="pageID && saveEditBtnShowHide"
                      name="Cancel"
                      @click="cancelAction()"
                    />
                    <span v-for="(elem, inx) in allBtnName" :key="inx">
                      <span v-if="elem?.type === 'checkbox'" class="ml-5">
                        <generic-check-box
                          :text="elem?.name"
                          :name="elem?.subName"
                          @customFunction="getInputAndLookUpValueAction"
                        />
                      </span>
                      <span v-else>
                        <generic-button
                          :name="elem?.name"
                          :type="elem?.type"
                          :icon-name-attribute="elem?.iconName"
                          @click="allBtnAction(elem.clickType)"
                        />
                      </span>
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Tarozi uchun -->
          <scale-box :default-data="scalesData" />
        </div>

        <!-- --START-- Batch Details Table uchun -->
        <div class="m-2">
          <span class="text-[14px]"
            >Batch Details.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <generic-button
              name="Column Setting"
              type="warning"
              icon-name-attribute="setting"
              @click="openColumnConfig('details')"
            />
            <generic-button
              name="Show Batch Stages"
              type="info"
              @click="showBatchStagesAction"
            />
          </div>
          <generic-prepare-table-page
            ref="batchDetailsRef"
            department-name="production"
            :addmodalorrow="false"
            :tablehead="batchDetailHead"
            :tableheadlength="batchDetailHead.length"
            :response-data="batchDetailBody"
            :ui-show-hide="true"
            :isedit="true"
            :height="450"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
          />
        </div>
        <!-- --END-- Batch Details Table uchun -->

        <!-- --START-- Batch Stages Table uchun -->
        <div v-if="showHideTable" class="m-2">
          <span class="text-[14px]"
            >Batch Stages.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <generic-button
              name="Column Setting"
              type="warning"
              icon-name-attribute="setting"
              @click="openColumnConfig('stages')"
            />
            <span v-if="hideButton" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="saveBatchStagesAction"
              />
              <GenericButton name="Discard" @click="discardBatchStagesAction" />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="editBatchStagesAction"
            />
          </div>
          <generic-prepare-table-page
            ref="batchStagesRef"
            department-name="production"
            :addmodalorrow="false"
            :tablehead="batchStagesHead"
            :tableheadlength="batchStagesHead.length"
            :response-data="batchStagesBody"
            :ui-show-hide="uiShowHide"
            :isedit="true"
            :height="450"
            delete-url-row="sewModel/prepareCreateEditSewModelOperation"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="getRowElements"
          />
        </div>
        <!-- --END-- Batch Stages Table uchun -->
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import LookUp from '@generics/GenericLookUp.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import ScaleBox from '@components/Invoices/ScaleBoxs/ScaleBox.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    LoadingPage,
    LookUp,
    ColumnConfigPage,
    GenericCheckBox,
    ScaleBox,
    GenericPrepareTablePage,
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
      defaultValues: {},
      allInputAndLookUpValue: {},
      elementData: [],
      allBtnName: [],
      saveEditBtnShowHide: true,
      scalesData: {},

      // start batchDetail table uchun
      batchDetailHead: [],
      batchDetailBody: [],
      tableDataDetails: [],
      tableDataDetails2: [],
      rightMapDetails: {},
      leftMapDetails: {},
      rightDataDetails: {},
      leftDataDetails: {},
      // end batchDetail table uchun

      // end batchStages table uchun
      batchStagesHead: [],
      batchStagesBody: [],
      showHideTable: false,
      uiShowHide: false,
      isEdit: false,
      hideButton: false,
      batchStageList: [],
      tableDataStages: [],
      tableDataStages2: [],
      rightMapStages: {},
      leftMapStages: {},
      rightDataStages: {},
      leftDataStages: {},
      // end batchStages table uchun

      columnConfigBtnClickType: true,
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    if (this.pageID) {
      this.isEdit = true
      this.hideButton = false
    }
    // function
    this.dataCreatedAction()
    // function
    this.getTableRequest()
  },

  mounted() {
    this.pageID && (this.saveEditBtnShowHide = false)
  },

  // METHODS
  methods: {
    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig(btnClickType) {
      this.checkModal = true

      btnClickType === 'details'
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

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Batch',
          name2: 'Set Batch Sequence',
          subName: 'batchNumber',
          type: 'number',
          multiple: true,
          width: '80',
        },
        {
          name: 'Year',
          subName: 'years',
        },
        {
          name: 'Color',
          subName: 'color',
          value: '',
        },
        {
          name: 'Color Variant',
          subName: 'colorVariant',
          type: 'select',
          url: 'findAllColorVariant',
        },
        {
          name: 'Design Variant',
          subName: 'designVariant',
          type: 'select',
          url: 'findAllDesignVariant',
        },
        {
          name: 'Equipments',
          subName: 'equipments',
          type: 'select',
          url: 'findAllEquipments',
        },
        {
          name: 'Notes',
          subName: 'notes',
          type: 'textarea',
          width: '220',
        },
      ]
      this.elementData = data

      const btnData = [
        {
          name: 'Print Preview',
          type: 'success',
          clickType: 'printPreview',
          showIcon: 'printer',
        },
        {
          name: 'byPackCount',
          type: 'success',
          clickType: 'byPackCount',
        },
        {
          name: 'Batch Details',
          type: 'info',
          clickType: 'batchDetails',
        },
        {
          name: 'isTwinsBatchDetail',
          subName: 'firstCheckbox',
          type: 'checkbox',
          clickType: 'isTwinsBatchDetail',
        },
        {
          name: 'isTripleBatchDetail',
          subName: 'lastCheckbox',
          type: 'checkbox',
        },
      ]
      this.allBtnName = btnData
    },

    // edit batchStages
    editBatchStagesAction() {
      this.hideButton = !this.hideButton

      // GenericTablePage da ishlab beruvchi function
      this.$refs.batchStagesRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // discard batchStages
    discardBatchStagesAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.batchStagesRef.arrayFiltered()

      this.hideButton = !this.hideButton
      this.uiShowHide = true
    },

    // Filter Action Details
    responseDataFilterDetails(headData) {
      this.batchStagesHead = headData.filter((value) => {
        return value.showUI && value
      })

      // Column config Stages uchun
      this.tableDataDetails = this.batchStagesHead
      this.tableDataDetails2 = headData.filter((value) => {
        return !value.showUI && value
      })
      return 'Assalom'
    },
    // Filter Action Stages
    responseDataFilterStages(headData) {
      this.batchStagesHead = headData.filter((value) => {
        return value.showUI && value
      })

      // Column config Stages uchun
      this.tableDataStages = this.batchStagesHead
      this.tableDataStages2 = headData.filter((value) => {
        return !value.showUI && value
      })
    },

    // Filter Action Details
    getFilterDataDetails() {
      this.tableDataDetails.forEach((obj) => {
        this.rightMapDetails[obj.name] = obj
      })
      this.tableDataDetails2.forEach((obj) => {
        this.leftMapDetails[obj.name] = obj
      })

      this.rightDataDetails = this.rightMapDetails
      this.leftDataDetails = this.leftMapDetails
    },
    // Filter Action Stages
    getFilterDataStages() {
      this.tableDataStages.forEach((obj) => {
        this.rightMapStages[obj.name] = obj
      })
      this.tableDataStages2.forEach((obj) => {
        this.leftMapStages[obj.name] = obj
      })

      this.rightDataStages = this.rightMapStages
      this.leftDataStages = this.leftMapStages
    },

    // Batch Stages
    getRowElements(arr, hideBtn) {
      this.batchStageList = arr
      this.hideButton = !hideBtn
    },

    // Save btn action STAGES
    saveBatchStagesAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.batchStagesRef.getSaveRowAction()

      const body = {}
      body.id = this.pageID
      body.batchStageList = this.batchStageList

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batch/prepareCreateEditBatchStage`, body)
        .then(({ data }) => {
          this.isLoading = !this.isLoading
          this.batchStagesBody = data?.sewModelSizeItem
          this.uiShowHide = true
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Show Batch Stages Action
    showBatchStagesAction() {
      this.showHideTable = true
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batch/showCreateBatchStageUrl`, {
          id: this.pageID,
          planBatchStages: false,
        })
        .then(({ data: { linkedHashMaps, batchStageListJson } }) => {
          this.isLoading = !this.isLoading
          this.batchStagesHead = linkedHashMaps
          this.batchStagesBody = batchStageListJson

          // function
          this.responseDataFilterStages(linkedHashMaps)
          // function
          this.getFilterDataStages()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Page Table datasini olish
    getPageTableData() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batch/prepareCreateEditBatchDetail`, {
          id: this.pageID,
        })
        .then(({ data: { batchDetailColumns, batchDetailListJson } }) => {
          this.isLoading = !this.isLoading
          this.batchDetailHead = batchDetailColumns
          this.batchDetailBody = batchDetailListJson
          // function
          this.responseDataFilterDetails(batchDetailColumns)
          // function
          this.getFilterDataDetails()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Page request
    getTableRequest() {
      this.isLoading = !this.isLoading
      if (this.pageID) {
        this.$axios
          .post(`/batch/prepareBatchNewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: { batchJson, defaultWeighBaudRate, defaultWeighType },
            }) => {
              this.isLoading = !this.isLoading
              this.scalesData = { defaultWeighBaudRate, defaultWeighType }
            }
          )
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })

        // function
        this.getPageTableData()
      } else {
        this.$axios
          .post(`/batch/prepareBatchNew`, {
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                batchJson: { batchNumber, years },
              },
            }) => {
              this.isLoading = !this.isLoading
              this.$set(this.defaultValues, 'batchNumber', batchNumber)
              this.$set(this.defaultValues, 'years', years)
            }
          )
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // SAVE action top BTN
    saveAction() {
      const body = {
        batch: {
          id: this.pageID || null,
          batchNumber:
            this.allInputAndLookUpValue?.batchNumber ||
            this.defaultValues?.batchNumber ||
            '',
          colorVariant: { id: this.allInputAndLookUpValue?.colorVariant || '' },
          designVariant: {
            id: this.allInputAndLookUpValue?.designVariant || '',
          },
          equipment: { id: this.allInputAndLookUpValue?.equipment || '' },
          notes: { id: this.allInputAndLookUpValue?.notes || '' },
        },
      }
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/batch/prepareCreateEditBatch`, body)
        .then((data) => {
          this.isLoading = !this.isLoading
          this.$router.push('/batches.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    editAction() {
      this.saveEditBtnShowHide = true
    },
    cancelAction() {
      this.saveEditBtnShowHide = false
    },

    // ALl buttons action
    allBtnAction(btnTypeProp) {},

    topBatchNumberEnterAction(value) {
      console.log(value)
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
