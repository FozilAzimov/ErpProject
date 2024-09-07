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
                ? 'View DESIGN VARIANT'
                : pageType === 'edit'
                ? 'Edit DESIGN VARIANT'
                : 'Add DESIGN VARIANT'
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
              v-if="element.type === 'select'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]"
                >{{ element.name }}
                <span v-if="element.required" class="text-[18px] text-red-600"
                  >*</span
                ></span
              >
              <generic-look-up
                dwidth="300"
                :name="element.subName"
                :defvalue="
                  vuewEditData?.[element.defValName]?.text
                    ? vuewEditData?.[element.defValName]?.text
                    : ''
                "
                :options-data="selectData"
                :disabled="element.disabled"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
            <span
              v-else-if="element.type === 'text'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]"
                >{{ element.name }}
                <span v-if="element.required" class="text-[18px] text-red-600"
                  >*</span
                >
              </span>
              <generic-input
                :value="
                  vuewEditData?.[element.defValName]
                    ? vuewEditData?.[element.defValName]
                    : ''
                "
                width="300"
                :type="element.type"
                :name="element.subName"
                :disabled="element.disabled"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
          </div>
        </div>

        <!-- Component Add table -->
        <production-addition-table
          v-if="pageType !== 'view'"
          ref="additionTableRef"
          class="p-2"
          :page-id="pageID"
          :data="rowData"
          :all-select-data="additionTabelSelectData"
          title="Design Variant"
          @getTableValue="getAdditionTableValueAction"
        />

        <div class="flex items-center gap-3 mt-3 p-2">
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="$router.push('/designVariants.htm')"
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
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import ProductionAdditionTable from '@components/Productions/ProductionAdditionTable.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    ProductionAdditionTable,
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
      vuewEditData: {},
      allInputAndLookUpValue: {},
      additionTableData: {},
      elementData: [],
      rowData: [],
      selectData: [],
      additionTabelSelectData: {
        colorDepth: [],
        productType: [],
        product: [],
        colorGroup: [],
        batchProcessStage: [],
        designVariantType: [],
      },
    }
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
    // page TYPE ni aniqlash
    this.pageType = this.$route?.query?.page_type
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
    // Table function
    this.getTableRequest()
  },

  // Methods
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
          name: 'Design Name',
          subName: 'name',
          defValName: 'designName',
          type: 'select',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Design Variant Name',
          subName: 'designVariantName',
          defValName: 'name',
          type: 'text',
          required: true,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data

      const rowData = [
        {
          name: 'Name',
          subName: 'name',
          width: '120',
          type: 'text',
          required: true,
        },
        {
          name: 'Color Depth',
          subName: 'colorDepth',
          width: '120',
          type: 'select',
          required: false,
        },
        {
          name: 'Product Type',
          subName: 'productType',
          width: '120',
          type: 'select',
          required: false,
        },
        {
          name: 'Product',
          subName: 'product',
          width: '120',
          type: 'select',
          required: false,
        },
        {
          name: 'Color Group',
          subName: 'colorGroup',
          width: '120',
          type: 'select',
          required: false,
        },
        {
          name: 'Batch Process Stage',
          subName: 'batchProcessStage',
          width: '120',
          type: 'select',
          required: true,
        },
        {
          name: 'Design Variant Type',
          subName: 'designVariantType',
          width: '120',
          type: 'select',
          required: true,
        },
        {
          name: 'Note',
          subName: 'note',
          width: '100',
          type: 'textarea',
          required: false,
        },
        {
          name: 'Delete',
          subName: 'delete',
          width: '120',
          type: 'del',
          required: false,
        },
      ]
      this.rowData = rowData
    },

    // Page request
    getTableRequest() {
      if (this.pageType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/designVariant/prepareDesignVariantViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { designVariant } }) => {
            this.isLoading = !this.isLoading
            this.vuewEditData = designVariant
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/designVariant/prepareDesignVariantAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                designList,
                colorDepthList,
                productTypeList,
                productList,
                colorGroupList,
                batchProcessStageList,
                colorVariantTypeList,
                designVariant,
              },
            }) => {
              this.selectData = designList
              this.additionTabelSelectData.colorDepth = colorDepthList
              this.additionTabelSelectData.productType = productTypeList
              this.additionTabelSelectData.productType = productTypeList
              this.additionTabelSelectData.product = productList
              this.additionTabelSelectData.colorGroup = colorGroupList
              this.additionTabelSelectData.batchProcessStage =
                batchProcessStageList
              this.additionTabelSelectData.designVariantType =
                colorVariantTypeList
              this.vuewEditData = designVariant
              this.isLoading = !this.isLoading
            }
          )
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/designVariant/prepareDesignVariantAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                designList,
                colorDepthList,
                productTypeList,
                productList,
                colorGroupList,
                batchProcessStageList,
                colorVariantTypeList,
              },
            }) => {
              this.selectData = designList
              this.additionTabelSelectData.colorDepth = colorDepthList
              this.additionTabelSelectData.productType = productTypeList
              this.additionTabelSelectData.productType = productTypeList
              this.additionTabelSelectData.product = productList
              this.additionTabelSelectData.colorGroup = colorGroupList
              this.additionTabelSelectData.batchProcessStage =
                batchProcessStageList
              this.additionTabelSelectData.designVariantType =
                colorVariantTypeList
              this.isLoading = !this.isLoading
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
      if (
        (this.allInputAndLookUpValue.name || this.vuewEditData?.name) &&
        (this.allInputAndLookUpValue.designVariantName ||
          this.vuewEditData?.designVariantName)
      ) {
        // Production Addition Table da ishliydi
        this.$refs.additionTableRef.additionTableValuesAction()

        if (
          this.additionTableData.name &&
          this.additionTableData.batchProcessStage &&
          this.additionTableData.designVariantType
        ) {
          const body = {}
          if (this.pageType === 'edit') {
            body.id = this.pageID || ''
            body.confirmed = this.allInputAndLookUpValue?.confirmed || ''
            body.name = this.allInputAndLookUpValue?.name || ''
            body.code = this.allInputAndLookUpValue?.code || ''
            body.planningTypeId =
              this.allInputAndLookUpValue?.planningTypeId || ''
          } else {
            const designVariant = {}
            const colorVariant = {}
            designVariant.design = {
              id: this.allInputAndLookUpValue?.name ?? '',
            }
            designVariant.name =
              this.allInputAndLookUpValue?.designVariantName ?? ''
            colorVariant.name = this.additionTableData?.name ?? ''
            colorVariant.colorDepth = {
              id: this.additionTableData?.colorDepth ?? '',
            }
            colorVariant.productType = {
              id: this.additionTableData?.productType ?? '',
            }
            colorVariant.product = {
              id: this.additionTableData?.product ?? '',
            }
            colorVariant.colorGroup = {
              id: this.additionTableData?.colorGroup ?? '',
            }
            colorVariant.batchProcessStage = {
              id: this.additionTableData?.batchProcessStage ?? '',
            }
            colorVariant.colorVariantType = {
              id: this.additionTableData?.designVariantType ?? '',
            }
            colorVariant.note = this.additionTableData?.note ?? ''
            body.designVariant = designVariant
            body.colorVariant = colorVariant
          }
          this.isLoading = !this.isLoading
          this.$axios[this.pageID ? 'put' : 'post'](
            `/designVariant/${
              this.pageID ? 'editDesignVariant' : 'addDesignVariant'
            }`,
            body
          )
            .then(() => {
              this.isLoading = !this.isLoading
              this.$router.push('/designVariants.htm')
            })
            .catch((error) => {
              this.isLoading = !this.isLoading
              // eslint-disable-next-line no-console
              console.log(error)
            })
        }
      }
    },

    // Production Addition Table value'sini olish
    getAdditionTableValueAction(tableValuesObject) {
      this.additionTableData = tableValuesObject
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
