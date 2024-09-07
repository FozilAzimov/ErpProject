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
              pageType === 'view'
                ? 'View Packaging'
                : pageType === 'edit'
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
        <div class="w-fit flex flex-col items-start m-2 gap-1">
          <div v-for="(element, index) in elementData" :key="index">
            <span
              v-if="element.type === 'text'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]"
                >{{ element.name }}
                <span v-if="element.required" class="text-[18px] text-red-600"
                  >*</span
                ></span
              >
              <generic-input
                :value="
                  viewEditData?.[element?.subName]
                    ? viewEditData?.[element?.subName]
                    : ''
                "
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
                :value="
                  viewEditData?.[element?.subName]
                    ? viewEditData?.[element?.subName]
                    : ''
                "
                width="300"
                type="number"
                :name="element.subName"
                :disabled="element.disabled"
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
                :default-value="
                  viewEditData?.[element?.subName]
                    ? viewEditData?.[element?.subName]
                    : false
                "
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
                  label="enabled"
                  border
                  size="mini"
                  :disabled="element.disabled"
                  @change="getInputAndLookUpValueAction"
                  >Enabled</el-radio
                >
                <el-radio
                  v-model="radio"
                  label="disabled"
                  border
                  size="mini"
                  :disabled="element.disabled"
                  @change="getInputAndLookUpValueAction"
                  >Disabled</el-radio
                >
              </span>
            </span>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/planningTypes.htm')"
            />
            <generic-button
              v-if="pageType !== 'view'"
              :name="pageType === 'edit' ? 'Save changes' : 'Save'"
              :type="pageType === 'edit' ? 'success' : 'primary'"
              :icon-name-attribute="pageType && 'edit'"
              @click="saveAction"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
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
      pageType: null,
      pageID: null,
      viewEditData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      selectDefaultData: [],
      radio: 'enabled',
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      this.allInputAndLookUpValue.active = newVal
    },
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
    // page TYPE ni aniqlash
    this.pageType = this.$route?.query?.page_type
    this.allInputAndLookUpValue.active = 'enabled'
  },

  // MOUNTED
  mounted() {
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

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Planning Type Name',
          subName: 'name',
          type: 'text',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Use Qty2',
          subName: 'useQty2',
          type: 'checkbox',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Planning Type Param',
          subName: 'planningTypeParam',
          type: 'checkbox',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Use Recipe is Reserve',
          subName: 'useRecipeReserve',
          type: 'checkbox',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Report Sequence',
          subName: 'reportSequence',
          type: 'number',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Simple Production Invoice',
          subName: 'simpleProductionInvoice',
          type: 'checkbox',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Free Production Param',
          subName: 'freeProductionParam',
          type: 'checkbox',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          subName: 'status',
          type: 'radio',
          required: false,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.pageID && this.pageType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/planningType/preparePlanningTypeViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { planningType } }) => {
            this.viewEditData = planningType
            this.radio = planningType?.active ? 'enabled' : 'disabled'
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageID && this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/planningType/preparePlanningTypeAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { planningType } }) => {
            this.viewEditData = planningType
            this.radio = planningType?.active ? 'enabled' : 'disabled'
            this.isLoading = !this.isLoading
          })
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

    // SAVE and Changes action
    saveAction() {
      if (this.allInputAndLookUpValue?.name || this.viewEditData?.name) {
        const body = {}
        if (this.pageType === 'edit') {
          const planningType = {}
          planningType.id = this.pageID || ''
          planningType.name =
            this.allInputAndLookUpValue?.name ?? this.viewEditData?.name ?? ''
          planningType.useQty2 =
            this.allInputAndLookUpValue?.useQty2 ??
            this.viewEditData?.useQty2 ??
            false
          planningType.planningTypeParam =
            this.allInputAndLookUpValue?.planningTypeParam ??
            this.viewEditData?.planningTypeParam ??
            false
          planningType.useRecipeReserve =
            this.allInputAndLookUpValue?.useRecipeReserve ??
            this.viewEditData?.useRecipeReserve ??
            false
          planningType.reportSequence =
            this.allInputAndLookUpValue?.reportSequence ??
            this.viewEditData?.reportSequence ??
            ''
          planningType.active =
            this.allInputAndLookUpValue?.active === 'enabled' ??
            this.viewEditData?.active ??
            false
          planningType.simpleProductionInvoice =
            this.allInputAndLookUpValue?.simpleProductionInvoice ??
            this.viewEditData?.simpleProductionInvoice ??
            false
          planningType.freeProductionParam =
            this.allInputAndLookUpValue?.freeProductionParam ??
            this.viewEditData?.freeProductionParam ??
            false
          body.planningType = planningType
        } else {
          const planningType = {}
          planningType.name = this.allInputAndLookUpValue?.name ?? ''
          planningType.useQty2 = this.allInputAndLookUpValue?.useQty2 ?? false
          planningType.planningTypeParam =
            this.allInputAndLookUpValue?.planningTypeParam ?? false
          planningType.useRecipeReserve =
            this.allInputAndLookUpValue?.useRecipeReserve ?? false
          planningType.reportSequence =
            this.allInputAndLookUpValue?.reportSequence ?? ''
          planningType.active =
            this.allInputAndLookUpValue?.active === 'enabled'
          planningType.simpleProductionInvoice =
            this.allInputAndLookUpValue?.simpleProductionInvoice ?? false
          planningType.freeProductionParam =
            this.allInputAndLookUpValue?.freeProductionParam ?? false
          body.planningType = planningType
        }
        this.isLoading = !this.isLoading
        this.$axios[this.pageID ? 'put' : 'post'](
          `/planningType/${
            this.pageID ? 'editPlanningType' : 'addPlanningType'
          }`,
          body
        )
          .then(() => {
            this.isLoading = !this.isLoading
            this.$router.push('/planningTypes.htm')
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
