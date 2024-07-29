<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
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
            {{
              btnType === 'view'
                ? 'View Packaging'
                : btnType === 'edit'
                ? 'Edit Packaging'
                : 'Packaging Create'
            }}
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
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
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
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
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div
          class="w-fit h-[500px] gap-x-20 gap-y-1 flex flex-col flex-wrap items-start m-2"
        >
          <div v-for="(element, index) in elementData" :key="index">
            <span
              v-if="element.type === 'text'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]">{{ element.name }}</span>
              <generic-input
                :value="''"
                width="300"
                type="text"
                :name="element.subName"
                :disabled="element.disabled"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span
              v-if="element.type === 'number'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]">{{ element.name }}</span>
              <generic-input
                :value="''"
                width="300"
                type="number"
                :name="element.subName"
                :disabled="element.disabled"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span
              v-else-if="element.type === 'select'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]">{{ element.name }}</span>
              <generic-look-up
                dwidth="300"
                :name="element.subName"
                :defvalue="''"
                :disabled="element.disabled"
                :options-data="selectData[element?.selectedName]"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span
              v-else-if="element.type === 'checkbox'"
              class="flex flex-col items-start mb-1"
            >
              <generic-check-box
                :text="element.name"
                :name="element.subName"
                :border="true"
                :disabled="element.disabled"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span
              v-else-if="element.type === 'radio'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]">{{ element.name }}</span>
              <span class="flex items-center">
                <el-radio
                  v-model="radio"
                  :disabled="element.disabled"
                  label="enabled"
                  border
                  size="mini"
                  >Enabled</el-radio
                >
                <el-radio
                  v-model="radio"
                  :disabled="element.disabled"
                  label="disabled"
                  border
                  size="mini"
                  >Disabled</el-radio
                >
              </span>
            </span>
          </div>
        </div>
        <div class="flex items-center gap-3 mt-3">
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="goBackAction"
          />
          <generic-button
            v-if="btnType !== 'view'"
            :name="btnType === 'edit' ? 'Save changes' : 'Save'"
            :type="btnType === 'edit' ? 'success' : 'primary'"
            :icon-name-attribute="btnType && 'edit'"
            @click="saveAction(btnType)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericCheckBox,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      btnType: '',
      pageID: null,
      editData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      radio: null,
      // all select data
      selectData: {
        batchProcessStage: [],
        currencyList: [],
        departmentList: [],
        warehouseList: [],
      },
    }
  },

  // WATCH
  watch: {
    pageID(newVal) {
      this.btnTypeSpecifyingAction()
    },
    radio(newVal) {
      this.allInputAndLookUpValue.active = newVal === 'enabled'
    },
  },

  // CREATED
  created() {
    this.btnType = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.type
    // page ID sini olish
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    this.allInputAndLookUpValue.active = true
    this.radio = 'enabled'
    // function
    this.dataCreatedAction()

    // Table function
    this.getTableRequest()
  },

  // METHODS
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
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
      localStorage.removeItem('allTrueAndFalseData')
      this.$router.push('/batchProcessStages.htm')
    },

    // Specifying the buttun type action
    btnTypeSpecifyingAction() {
      if (!this.pageID) {
        localStorage.removeItem('allTrueAndFalseData')
      }
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Batch Process Stage Name',
          subName: 'name',
          type: 'text',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Department',
          subName: 'departmentId',
          selectedName: 'departmentList',
          type: 'select',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Warehouse',
          subName: 'warehouseId',
          selectedName: 'warehouseList',
          type: 'select',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Currency',
          subName: 'currencyId',
          selectedName: 'currencyList',
          type: 'select',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Process Status',
          subName: 'processStatusId',
          selectedName: 'batchProcessStage',
          type: 'select',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Check Previous Stage End Status',
          subName: 'checkPreviousStageEndStatus',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Use Equipment',
          subName: 'useEquipment',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Auto Start Stop Before',
          subName: 'autoStartStopBefore',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'create Expense Entry Or Exite Status',
          subName: 'createExpenseEntryOrExiteStatus',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'WasteCalcType',
          subName: 'wasteCalcType',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Waste%',
          subName: 'waste',
          type: 'number',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Price',
          subName: 'price',
          type: 'number',
          disabled: this.btnType === 'view',
        },
        {
          name: 'only Once In Color Variant',
          subName: 'onlyOnceInColorVariant',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'auto Save',
          subName: 'autoSave',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Information about the party',
          subName: 'saleInfoParam',
          type: 'checkbox',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Ratio',
          subName: 'ratio',
          type: 'number',
          disabled: this.btnType === 'view',
        },
        {
          name: 'DefaultElapsedMinutes',
          subName: 'defaultElapsedMinutes',
          type: 'number',
          disabled: this.btnType === 'view',
        },
        {
          name: 'SortOrder',
          subName: 'report_sort',
          type: 'number',
          disabled: this.btnType === 'view',
        },
        {
          name: 'EntryExitLogic',
          subName: 'entryExitLogic',
          type: 'number',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Status',
          subName: 'status',
          type: 'radio',
          disabled: this.btnType === 'view',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.pageID && this.btnType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/batchProcessStage/prepareBatchProcessStageViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { design } }) => {
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageID && this.btnType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/batchProcessStage/prepareBatchProcessStageAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { designJson } }) => {
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/batchProcessStage/prepareBatchProcessStageAjaxLoad`, {
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                batchProcessStage,
                currencyList,
                departmentList,
                warehouseList,
              },
            }) => {
              this.isLoading = !this.isLoading
              this.selectData.batchProcessStage = batchProcessStage
              this.selectData.currencyList = currencyList
              this.selectData.departmentList = departmentList
              this.selectData.warehouseList = warehouseList
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

    // Save Changes action
    saveAction() {
      if (this.allInputAndLookUpValue.name) {
        const batchProcessStage = {}
        if (this.btnType === 'edit') {
          batchProcessStage.id = this.pageID || ''
          batchProcessStage.confirmed =
            this.allInputAndLookUpValue?.confirmed || ''
          batchProcessStage.name = this.allInputAndLookUpValue?.name || ''
          batchProcessStage.code = this.allInputAndLookUpValue?.code || ''
          batchProcessStage.planningTypeId =
            this.allInputAndLookUpValue?.planningTypeId || ''
        } else {
          batchProcessStage.name = this.allInputAndLookUpValue?.name || ''
          batchProcessStage.department = {
            id: this.allInputAndLookUpValue?.departmentId || '',
          }
          batchProcessStage.warehouse = {
            id: this.allInputAndLookUpValue?.warehouseId || '',
          }
          batchProcessStage.currency = {
            id: this.allInputAndLookUpValue?.currencyId || '',
          }
          batchProcessStage.processStatus =
            this.allInputAndLookUpValue?.processStatusId || ''
          batchProcessStage.checkPreviousStageEndStatus =
            this.allInputAndLookUpValue?.checkPreviousStageEndStatus || false
          batchProcessStage.useEquipment =
            this.allInputAndLookUpValue?.useEquipment || false
          batchProcessStage.autoStartStopBefore =
            this.allInputAndLookUpValue?.autoStartStopBefore || false
          batchProcessStage.createExpenseEntryOrExiteStatus =
            this.allInputAndLookUpValue?.createExpenseEntryOrExiteStatus ||
            false
          batchProcessStage.waste = this.allInputAndLookUpValue?.waste || ''
          batchProcessStage.calcWaste =
            this.allInputAndLookUpValue?.wasteCalcType || false
          batchProcessStage.price = this.allInputAndLookUpValue?.price || ''
          batchProcessStage.onlyOnceInColorVariant =
            this.allInputAndLookUpValue?.onlyOnceInColorVariant || false
          batchProcessStage.autoSave =
            this.allInputAndLookUpValue?.autoSave || false
          batchProcessStage.saleInfoParam =
            this.allInputAndLookUpValue?.saleInfoParam || false
          batchProcessStage.ratio = this.allInputAndLookUpValue?.ratio || ''
          batchProcessStage.defaultElapsedMinutes =
            this.allInputAndLookUpValue?.defaultElapsedMinutes || ''
          batchProcessStage.report_sort =
            this.allInputAndLookUpValue?.report_sort || ''
          batchProcessStage.entryExitLogic =
            this.allInputAndLookUpValue?.entryExitLogic || ''
          batchProcessStage.active = this.allInputAndLookUpValue?.active || ''
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/batchProcessStage/addBatchProcessStage`, {
            batchProcessStage,
          })
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            this.$router.push('/batchProcessStages.htm')
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
